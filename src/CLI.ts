import * as YargsParser from "yargs-parser"

import { Logger, LoggerLevel } from "./Logger"

import { AbstractCommand } from "./CLI/Command"
import SyncStream from "./CLI/Commands/SyncStream"
import Help from "./CLI/Commands/Help"

const availableCommands = [SyncStream, Help]

export default class CLI {
  logger: Logger

  constructor(public argv: string[]) {
    let logLevel = LoggerLevel.INFO
    if (YargsParser(this.args.slice(1), CLI.globalYargsYargsOpts())["verbose"]) {
      logLevel = LoggerLevel.DEBUG
    }
    this.logger = new Logger(process.stdout, { level: logLevel })
  }

  get args() {
    return this.argv.slice(2)
  }

  get commandName() {
    return this.args[0]
  }

  run() {
    this.findCommand().run()
  }

  private findCommand(): AbstractCommand {
    const cmdKlass = availableCommands.find(
      (c) => c.commandName() === this.commandName
    ) || Help
    const parsedArgs = YargsParser(
      this.args.slice(1),
      this.mergedYargsParserOpts(cmdKlass.yargsParserOpts()),
    )

    return new cmdKlass(parsedArgs, this.logger)
  }

  private static globalYargsYargsOpts() {
    return {
      alias: { verbose: "v" },
      boolean: ["verbose"],
    }
  }

  private mergedYargsParserOpts(opts: object) {
    return {
      ...opts,
      alias: { ...CLI.globalYargsYargsOpts()["alias"], ...opts["alias"] },
      boolean: CLI.globalYargsYargsOpts()["boolean"].concat(opts["boolean"] || []),
    }
  }
}
