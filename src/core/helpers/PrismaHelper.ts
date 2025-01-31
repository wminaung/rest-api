// PrismaHelper.ts
import { PrismaClient } from "@prisma/client";
import { BaseError, InternalServerError } from "../../errors";
import { logError } from "../utils/logError"; // Assuming you have a logger utility

export class PrismaHelper {
  /**
   * Executes a Prisma query and handles any errors that occur during execution.
   *
   * @template T - The type of the result returned by the Prisma query.
   * @param prismaCall - A function that returns a promise to perform the Prisma query.
   * @param errorMessage - A custom error message to be used if an InternalServerError is thrown.
   * @returns A promise that resolves to the result of the Prisma query.
   * @throws {BaseError} - If a custom BaseError is encountered, it is rethrown.
   * @throws {InternalServerError} - If an error other than BaseError occurs, an InternalServerError is thrown with the provided errorMessage.
   */

  protected async executePrismaQuery<T>(
    prismaCall: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    try {
      return await prismaCall();
    } catch (error) {
      logError(error);
      if (error instanceof BaseError) {
        throw error;
      }
      throw new InternalServerError(errorMessage);
    }
  }
}
