import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class NotImplementedError extends BaseError {
  constructor(message: string = "Not implemented") {
    super(message, 501, ErrorCode.NOT_IMPLEMENTED);
  }
}
