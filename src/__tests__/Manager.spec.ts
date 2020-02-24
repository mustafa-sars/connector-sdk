import { Manager, InvalidMessageError } from "../Manager"

describe(Manager, () => {
  describe("message sending", () => {
    it("forwards a valid message to the message writer", () => {
      const message = {
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
      const mockWriter = jest.fn()
      const manager = new Manager({ sendMessage: mockWriter })

      manager.messages.sendMessage(message)

      expect(mockWriter.mock.calls.length).toBe(1)
      expect(mockWriter.mock.calls[0][0]).toBe(message)
    })

    it("raises on invalid message", () => {
      const message = {
        type: "Incident",
        attributes: {
          id: "a1b2c3",
          title: "an incident",
        }
      }
      const mockWriter = jest.fn()
      const manager = new Manager({ sendMessage: mockWriter })

      expect(
        () => { manager.messages.sendMessage(message) }
      ).toThrow(InvalidMessageError)

      expect(mockWriter.mock.calls.length).toBe(0)
    })
  })
})
