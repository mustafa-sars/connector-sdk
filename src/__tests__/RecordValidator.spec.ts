import { RecordValidator } from "../RecordValidator"

describe(RecordValidator, () => {
  describe("incident records", () => {
    test("is not valid with missing attrs", () => {
      const record = {
        type: "Incident",
        attributes: {
          id: "a1b2c3",
          title: "an incident"
        }
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
      expect(validator.errors.length).toBeGreaterThan(2)
      expect(validator.errors[0]).toMatch(/required attribute "html_url"/)
    })

    test("is not valid with incorrectly formatted attrs", () => {
      const record = {
        type: "Incident",
        attributes: {
          id: "a1b2c3",
          title: "an incident",
          html_url: "not-a-url",
          number: 42,
          status: "not-a-status",
          created_at: "not-a-time"
        }
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
      expect(validator.errors.length).toBe(3)
      expect(validator.errors[0]).toMatch(/html_url.*must match format/)
      expect(validator.errors[1]).toMatch(/status.*must be one of.*triggered/)
      expect(validator.errors[2]).toMatch(/created_at.*must match format/)
    })

    test("is valid", () => {
      const record = {
        type: "Incident",
        attributes: {
          id: "a1b2c3",
          title: "an incident",
          html_url: "http://example.com",
          number: 42,
          status: "acknowledged",
          created_at: "2020-02-21 12:00:00Z"
        }
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(true)
    })
  })

  describe("unknown record type", () => {
    test("is not valid", () => {
      const record = {
        type: "Foo",
        attributes: { }
      }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
    })
  })

  describe("object without type", () => {
    test("is not valid", () => {
      const record = { }
      const validator = new RecordValidator(record)

      expect(validator.isValid).toBe(false)
      expect(validator.errors[0]).toMatch(/required attribute "type"/)
    })
  })
})
