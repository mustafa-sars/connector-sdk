import { Logger, LoggerLevel } from "../Logger"

describe(Logger, () => {
  class StubLoggerIo {
    messages: string[]

    constructor() {
      this.messages = []
    }

    public write(msg) {
      this.messages.push(msg)
    }
  }

  describe("writing messages with logger levels", () => {
    test("it writes a message with default INFO level", () => {
      const io = new StubLoggerIo()
      const logger = new Logger(io)

      logger.info("hi")
      expect(io.messages.length).toBe(1)
      expect(io.messages[0]).toBe("hi")
    })

    test("it doesn't write a message lower level", () => {
      const io = new StubLoggerIo()
      const logger = new Logger(io, { level: LoggerLevel.WARN })

      logger.info("hi")
      expect(io.messages.length).toBe(0)
    })
  })

  describe("tags", () => {
    test("includes tags in messages", () => {
      const io = new StubLoggerIo()
      const logger = new Logger(io, { tags: ["foo"] })

      logger.info("hi")
      expect(io.messages.length).toBe(1)
      expect(io.messages[0]).toBe("[foo] hi")
    })

    test("taggedChild builds a new logger with more tags", () => {
      const io = new StubLoggerIo()
      const logger = new Logger(io, { tags: ["foo"] })
      const logger2 = logger.taggedChild(["bar"])

      logger2.info("hi")
      expect(io.messages.length).toBe(1)
      expect(io.messages[0]).toBe("[foo] [bar] hi")
    })
  })
})
