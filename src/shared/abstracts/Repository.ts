import { PrismaHelper } from "../helpers/PrismaHelper";

export abstract class Repository {
  /**
   * Executes a Prisma query and handles any errors that occur.
   *
   * @param prismaCall The Prisma query to execute.
   * @param errorMessage The error message to use if the query fails.
   * @returns The result of the query.
   */
  protected async executePrismaQuery<T>(
    prismaCall: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    return PrismaHelper.executePrismaQuery(prismaCall, errorMessage);
  }
}
