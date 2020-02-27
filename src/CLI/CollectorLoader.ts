import { resolve } from "path";
import { cwd } from "process";
import { existsSync, readFileSync } from "fs";

import { ClientConfiguration } from "../Client"
import { Logger } from "../Logger"
import { RecordProducer, RecordProducerFacade } from "../RecordProducer"

export class CollectorLoader {
  constructor(public collectorSlug: string, public clientConfiguration: ClientConfiguration, public logger: Logger) {
  }

  public buildClient() {
    const clientKlass = this.requiredClientLib().Client

    return new clientKlass(
      this.clientConfiguration,
      this.buildRecordProducer(),
      this.logger.taggedChild([this.collectorSlug]),
    )
  }

  private buildRecordProducer(): RecordProducer {
    return new RecordProducerFacade(
      {
        produce: (record) => {
          this.logger.info(`Produced record: ${JSON.stringify(record, null, "  ")}`)
        }
      }
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
