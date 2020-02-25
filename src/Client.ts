import { Logger } from "./Logger"
import { Manager } from "./Manager"

export type ClientConfiguration = Map<string, any>

export interface VerifyConfigurationResult {
  isValid: boolean
  errorMessages?: string[]
}

export interface ClientInterface {
  verifyConfiguration: () => Promise<VerifyConfigurationResult>
  discoverStreams?: () => Promise<void>
  syncStream: (streamId: string | null, earliestDataCutoff: Date) => Promise<void>
}

export abstract class AbstractClient {
  constructor(
    public configuration: ClientConfiguration,
    public manager: Manager,
    public logger: Logger
  ) {
  }
}
