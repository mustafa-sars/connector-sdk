import { readFileSync } from "fs";

import { AbstractCommand } from "../Command"
import { ClientConfiguration, ClientInterface } from "../../Client"
import { CollectorLoader } from "../CollectorLoader"

export default class DiscoverStreams extends AbstractCommand {
  static help() {
    process.stdout.write(
      [
        "Code Climate Collector CLI",
        "",
        "Usage: codeclimate-collector discover-streams <collector> <config-path>",
        "",
        "Discovers available streams for a collector",
        "",
        "Arguments:",
        "\tcollector\tThe slug of the collector to run. E.g. if the collector is for PagerDuty and comes from the package codeclimate-collector-pagerduty, the slug is \"pagerduty\".",
        "\tconfig-path\tA path to a JSON file to parse and use as configuration for the collector.",
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

  run() {
    this.buildClient().discoverStreams().
      then(() => this.logger.info(`Done discovering streams.`)).
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
