import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class PrismaError extends BaseError {
  constructor(message: string = "Prisma error occurred") {
    super(message, 500, ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
