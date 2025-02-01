import { BaseError, InternalServerError } from "../../errors";
import { logError } from "../utils/logError";

export class PrismaHelper {
  public async executePrismaQuery<T>(
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
