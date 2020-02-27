import { RecordValidator } from "./RecordValidator"

export interface RecordProducer {
  produce: (object) => void
}

export class InvalidRecordError extends Error {
  constructor(message: string) {
    super(message)
    this.name = InvalidRecordError.name
    Object.setPrototypeOf(this, InvalidRecordError.prototype)
  }

  public toString() {
    return `${this.name} ${this.message}`
  }
}

// A wrapper for a RecordProducer that does validation & throws on invalid
// records.
//
// Connector Client's should generally be given an instance of this class
// powered by an appropriate implementation (e.g. the implemenation might log to
// stdout or forward to Kinesis, etc.)
export class RecordProducerFacade implements RecordProducer {
  constructor(public implementation: RecordProducer) {
  }

  produce(record: object) {
    const validator = new RecordValidator(record)

    if (!validator.isValid) {
      throw new InvalidRecordError(validator.errors.join(", "))
    }

    this.implementation.produce(record)
  }
}
