import { BaseError, InternalServerError } from "../errors";
import { logError } from "../utils/logError";

export class PrismaHelper {
  /**
   * Executes a Prisma query and handles any errors that occur.
   *
   * @param prismaCall The Prisma query to execute.
   * @param errorMessage The error message to use if the query fails.
   * @returns The result of the query.
   */
  static async executePrismaQuery<T>(
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
