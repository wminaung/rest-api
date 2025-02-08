import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import {
  BadRequestError,
  BaseError,
  InternalServerError,
  UnexpectedError,
} from "../errors";
import { logError } from "../utils/logError";

export class PrismaHelper {
  private static errorMessages = {
    P2000:
      "The provided value for the column is too long for the column's type.",
    P2001: "The record searched for in the where condition does not exist.",
    P2002: "Unique constraint failed.",
    P2003: "Foreign key constraint failed.",
    P2004: "Transaction failed.",
    P2005: "Query engine failed.",
    P2006: "Invalid input.",
    P2007: "Constraint validation error.",
    P2008: "Query syntax error.",
    P2014: "Query parsing error.",
    P2025: "Record not found.",
  };

  protected async executePrismaQueryOrThrow<T>(
    prismaCall: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    try {
      return await prismaCall();
    } catch (error) {
      this.handlePrismaError(error, errorMessage);
    }
  }
  private handlePrismaError(error: unknown | any, errorMessage: string): never {
    if (error instanceof PrismaClientKnownRequestError) {
      logError(error);

      const message =
        PrismaHelper.errorMessages[
          error.code as keyof typeof PrismaHelper.errorMessages
        ];
      if (message) {
        throw new InternalServerError(
          `${error.code} :Prisma Known Error: ${errorMessage}: ${message}`
        );
      }

      throw new InternalServerError(
        `${error.code} :Prisma Known Error: ${errorMessage} : ${error.message}`
      );
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      throw new InternalServerError(
        `Prisma Unknown Error: ${errorMessage} : ${error.message}`
      );
    }

    if (error instanceof PrismaClientRustPanicError) {
      throw new InternalServerError(
        `Prisma Engine Panic: ${errorMessage} : ${error.message}`
      );
    }

    if (error instanceof PrismaClientInitializationError) {
      throw new InternalServerError(
        `Prisma Initialization Failed: ${errorMessage} : ${error.message}`
      );
    }

    if (error instanceof PrismaClientValidationError) {
      throw new BadRequestError(
        `Prisma Validation Error: ${errorMessage} : ${error.message}`
      );
    }

    // If none of the above errors match, throw an unexpected error
    throw new UnexpectedError(
      `${errorMessage}: Something went wrong with Prisma`
    );
  }

  // *** End of Class ***
}
