export enum Errors {
  CLASS_INITIALIZATION_ERROR = "InitializationError",
  INVALID_TYPE = "Invalid Type",
  MISSING_PARAMS = "Missing Parameters",
  INVALID_EVENT = "Invalid Event",
}

export class ErrosController extends Error {
  /**
   * The error message
   */

  message: string;

  /**
   * the error code for this error message
   */

  errorCode: Errors;

  constructor(
    message: string,
    code: Errors = Errors.CLASS_INITIALIZATION_ERROR
  ) {
    super();
    this.message = `${code} - ${message}`;
    this.errorCode = code;
    Error.captureStackTrace(this);
  }
}
