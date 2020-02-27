import { Logger, LoggerConfig } from "../Logger"
import { RecordProducerFacade } from "../RecordProducer"

export class FakeLoggerIO {
  messages: string[] = []

  public write(msg) {
    this.messages.push(msg)
  }
}

export class FakeLogger extends Logger {
  constructor(config?: LoggerConfig) {
    super(new FakeLoggerIO(), config)
  }

  public get messages() {
    return (this.io as FakeLoggerIO).messages
  }
}

export class FakeRecordProducerFacade extends RecordProducerFacade  {
  private _records: object[] = []

  constructor() {
    super({
      produce: (record) => this._records.push(record)
    })
  }

  public get records() {
    return this._records
  }
}

export function buildFakeLogger(): FakeLogger {
  return new FakeLogger()
}

export function buildRecordProducer(): FakeRecordProducerFacade {
  return new FakeRecordProducerFacade()
}

