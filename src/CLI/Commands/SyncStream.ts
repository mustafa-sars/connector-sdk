import { resolve } from "path";
import { cwd } from "process";
import { existsSync, readFileSync } from "fs";

import { AbstractCommand } from "../Command"
import { ClientConfiguration, ClientInterface } from "../../Client"
import { Manager } from "../../Manager"

export default class SyncStream extends AbstractCommand {
  static help() {
    process.stdout.write("TODO - show help contents\n")
  }

  get collectorSlug(): string {
    return this.yargs["_"][0] || ""
  }

  get configPath(): string {
    return this.yargs["_"][1] || ""
  }

  get clientConfiguration(): ClientConfiguration {
    return JSON.parse(readFileSync(this.configPath).toString())
  }

  get streamId(): string {
    return this.yargs["_"][2] || ""
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
    this.buildClient().syncStream(this.streamId, this.earliestDataCutoff)
  }

  private buildManager(): Manager {
    return new Manager(
      {
        sendMessage: (message) => {
          this.logger.info(JSON.stringify(message))
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
