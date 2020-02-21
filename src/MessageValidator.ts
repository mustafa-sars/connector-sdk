import * as Ajv from "ajv";
import * as Path from "path";
import * as FS from "fs";

const schemaPath = Path.resolve(__dirname, "../schemas/messages.json")

export class MessageValidator {
  public message: object
  private _ajvValidator: Ajv.ValidateFunction | null = null
  private _isValid: boolean | null = null

  constructor(message: object) {
    this.message = message
  }

  get isValid(): boolean {
    this.validate()

    return this._isValid
  }

  get errors(): string[] {
    this.validate()

    return this.ajvValidator.errors.
      filter((e) => e.dataPath !== "").
      map((e) => {
        if (e.params.missingProperty) {
          return `${e.dataPath} missing required attribute "${e.params.missingProperty}"`
        } else if (e.params.allowedValue) {
          return `${e.dataPath} must be "${e.params.allowedValue}"`
        } else if (e.params.allowedValues) {
          return `${e.dataPath} must be one of ${e.params.allowedValues.map((o) => `"${o}"`).join(", ")}`
        } else if (e.params.format) {
          return `${e.dataPath} must match format "${e.params.format}"`
        } else {
          return `${e.dataPath} ${e.message}`
        }
      })

  }

  private get ajvValidator(): Ajv.ValidateFunction {
    if (!this._ajvValidator) {
      const ajv = new Ajv({ allErrors: true })
      this._ajvValidator = ajv.compile(JSON.parse(FS.readFileSync(schemaPath)))
    }

    return this._ajvValidator
  }

  private validate() {
    if (this._isValid === null) {
      this._isValid = this.ajvValidator(this.message)
    }
  }
}
