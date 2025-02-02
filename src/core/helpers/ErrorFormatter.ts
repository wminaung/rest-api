import { BaseError } from "./../../errors";

export class ErrorFormatter {
  static formatErrorResponse(error: BaseError) {
    return {
      error: { message: error.message, code: error.code, status: error.status },
    };
  }
}
