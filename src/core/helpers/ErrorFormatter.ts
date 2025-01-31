import { BaseError } from "./../../errors";

export class ErrorFormatter {
  formatErrorResponse(error: BaseError) {
    return {
      error: { message: error.message, code: error.code, status: error.status },
    };
  }
}
