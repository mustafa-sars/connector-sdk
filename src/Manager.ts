import { MessageValidator } from "./MessageValidator"

export interface MessageWriter {
  sendMessage: (object) => void
}

export class InvalidMessageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = InvalidMessageError.name
    Object.setPrototypeOf(this, InvalidMessageError.prototype)
  } toString() {
    return `${this.name} ${this.message}`
  }
}

export class MessagesFacade {
  implementation: MessageWriter

  constructor(implementation: MessageWriter) {
    this.implementation = implementation
  }

  sendMessage(message: object) {
    const validator = new MessageValidator(message)

    if (!validator.isValid) {
      throw new InvalidMessageError(validator.errors.join(", "))
    }

    this.implementation.sendMessage(message)
  }
}

export class Manager {
  messages: MessageWriter

  constructor(messages: MessageWriter) {
    this.messages = new MessagesFacade(messages)
  }

  public sendMessage(message: object) {
    this.messages.sendMessage(message)
  }
}
