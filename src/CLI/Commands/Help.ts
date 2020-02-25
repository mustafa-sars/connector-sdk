import { AbstractCommand } from "../Command"

export default class Help extends AbstractCommand {
  run() {
    process.stdout.write("TODO - show help contents\n")
  }

  static help() {
    process.stdout.write("TODO - show help contents\n")
  }
}

