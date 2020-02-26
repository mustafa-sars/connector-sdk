import { resolve } from "path";
import { cwd } from "process";
import { existsSync, readFileSync } from "fs";

import { AbstractCommand } from "../Command"
import { ClientConfiguration, ClientInterface } from "../../Client"
import { Manager } from "../../Manager"

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

  get stream(): object | null {
    return JSON.parse(this.yargs["_"][2])
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

  private buildManager(): Manager {
    return new Manager(
      {
        sendMessage: (message) => {
          this.logger.info(`Received message: ${JSON.stringify(message, null, "  ")}`)
        }
      }
    )
  }

  private buildClient(): ClientInterface {
    const clientKlass = this.requiredClientLib().Client
    return new clientKlass(
      this.clientConfiguration,
      this.buildManager(),
      this.logger.taggedChild([this.collectorSlug]),
    )
  }

  // When you are *inside* a project directory for a package named "foo", you
  // cannot typically `require("foo")`.
  // So we naively try to require the given library (so this can be run from
  // like a global install), but for the case where this is being run within a
  // collector's project directory, we look for a `package.json`, resolve the
  // appropriate include to an absolute path, and require that.
  private requiredClientLib(): any {
    const packageName = `codeclimate-collector-${this.collectorSlug}`
    try {
      return require(packageName)
    } catch(ex) {
      if(ex.code === "MODULE_NOT_FOUND" && existsSync("package.json")) {
        const packageSpec = JSON.parse(readFileSync("package.json").toString())
        if (packageSpec["name"] === packageName) {
          let reqPath = resolve(
            cwd(),
            packageSpec["main"] || "index.js",
          )
          return require(reqPath)
        } else {
          throw ex
        }
      } else {
        throw ex
      }
    }
  }
}
