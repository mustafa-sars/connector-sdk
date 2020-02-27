import { readFileSync } from "fs";

import { AbstractCommand } from "../Command"
import { ClientConfiguration, ClientInterface } from "../../Client"
import { CollectorLoader } from "../CollectorLoader"
import { Stream } from "../../Stream"

export default class SyncStream extends AbstractCommand {
  static help() {
    process.stdout.write(
      [
        "Code Climate Collector CLI",
        "",
        "Usage: codeclimate-collector sync-stream <collector> <config-path> <stream> <earliest-data-cutoff>",
        "",
        "Runs a sync process in a collector for a given stream.",
        "",
        "Arguments:",
        "\tcollector\tThe slug of the collector to run. E.g. if the collector is for PagerDuty and comes from the package codeclimate-collector-pagerduty, the slug is \"pagerduty\".",
        "\tconfig-path\tA path to a JSON file to parse and use as configuration for the collector.",
        "\tstream\parseable JSON string representing the stream to sync. Some collectors may ignore this value, and in that case you can pass \"null\".",
        "\tearliest-data-cutoff\tHow far back in time the sync process should go. Should be iso8601 format.",
      ].join("\n") + "\n"
    )
  }

  get collectorSlug(): string {
    return this.yargs["_"][0] || ""
  }

  get configPath(): string {
    return this.yargs["_"][1] || ""
  }

  get clientConfiguration(): ClientConfiguration {
    const json = JSON.parse(readFileSync(this.configPath).toString())
    return new Map(
      Object.keys(json).map((key) => [key, json[key]])
    )
  }

  get stream(): Stream {
    return new Stream(JSON.parse(this.yargs["_"][2]))
  }

  get earliestDataStr(): string {
    return this.yargs["_"][3] || ""
  }

  get earliestDataCutoff(): Date {
    const d = new Date(this.earliestDataStr)

    if (isNaN(d.valueOf())) {
      throw `"${this.earliestDataStr}" cannot be parsed as a timestamp`
    }

    return d
  }

  run() {
    this.buildClient().syncStream(this.stream, this.earliestDataCutoff).
      then(() => this.logger.info(`Done syncing stream ${JSON.stringify(this.stream)}.`)).
      catch((err) => { throw err })
  }

  private buildClient(): ClientInterface {
    return new CollectorLoader(
      this.collectorSlug,
      this.clientConfiguration,
      this.logger,
    ).buildClient()
  }
}
