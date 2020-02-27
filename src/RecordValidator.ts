import * as Ajv from "ajv";
import { resolve } from "path";
import { readFileSync } from "fs";

const schemaPath = resolve(__dirname, "../schemas/records.json")

export class RecordValidator {
  private _ajvValidator: Ajv.ValidateFunction | null = null
  private _isValid: boolean | null = null

  constructor(public record: object) {
  }

  get isValid(): boolean {
    this.validate()

    return this._isValid as boolean
  }

  get errors(): string[] {
    this.validate()

    let sourceErrs = this.ajvValidator.errors || []

    if (!sourceErrs.every((e) => e.dataPath === "")) {
      sourceErrs = sourceErrs.filter((e) => e.dataPath !== "")
    }

    return sourceErrs.map((e) => {
      let p = e.params

      if (p["missingProperty"]) {
        return `${e.dataPath} missing required attribute "${p["missingProperty"]}"`
      } else if (p["allowedValue"]) {
        return `${e.dataPath} must be "${p["allowedValue"]}"`
      } else if (p["allowedValues"]) {
        return `${e.dataPath} must be one of ${p["allowedValues"].map((o) => `"${o}"`).join(", ")}`
      } else if (p["format"]) {
        return `${e.dataPath} must match format "${p["format"]}"`
      } else {
        return `${e.dataPath} ${e.message}`
      }
    })
  }

  private get ajvValidator(): Ajv.ValidateFunction {
    if (!this._ajvValidator) {
      const ajv = new Ajv({ allErrors: true })
      this._ajvValidator = ajv.compile(JSON.parse(readFileSync(schemaPath).toString()))
    }

    return this._ajvValidator
  }

  private validate() {
    if (this._isValid === null) {
      this._isValid = this.ajvValidator(this.record) as boolean
    }
  }
}
