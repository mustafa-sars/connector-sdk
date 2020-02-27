import { AbstractCommand } from "../Command"

export default class Help extends AbstractCommand {
  run() {
    Help.help()
  }

  static help() {
    process.stdout.write(
      [
        "Code Climate Collector CLI",
        "",
        "Usage: codeclimate-collector COMMAND ...",
        "",
        "Available commands:",
        "\thelp\tShow this message",
        "\tverify-configuration <collector> <config-path>\tVerify a collector's configuration",
        "\tsync-stream <collector> <config-path> <stream-id> <earliest-data-cutoff>\tRun a sync-stream process for a collector",
        "",
        "Run `codeclimate-collector COMMAND --help` for command-specific help.",
        "",
        "Globally recognized flags:",
        "\t-v, --verbose\tMore verbose logging",
      ].join("\n") + "\n"
    )
  }
}

