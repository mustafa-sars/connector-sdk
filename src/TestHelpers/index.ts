import { Logger, LoggerConfig } from "../Logger"
import { Manager, MessagesFacade } from "../Manager"

export class FakeLoggerIO {
  messages: string[] = []

  public write(msg) {
    this.messages.push(msg)
  }
}

export class FakeMessageWriter {
  messages: object[] = []

  public sendMessage(msg) {
    this.messages.push(msg)
  }
}

export class FakeLogger extends Logger {
  constructor(config?: LoggerConfig) {
    super(new FakeLoggerIO(), config)
  }

  get messages() {
    return (this.io as FakeLoggerIO).messages
  }
}

export class FakeManager extends Manager  {
  constructor() {
    super(new FakeMessageWriter())
  }

  get sentMessages() {
    return ((this.messages as MessagesFacade).implementation as FakeMessageWriter).messages
  }
}

export function buildFakeLogger(): FakeLogger {
  return new FakeLogger()
}

export function buildFakeManager(): FakeManager {
  return new FakeManager()
}

