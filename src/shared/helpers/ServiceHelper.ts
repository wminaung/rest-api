import { z } from "zod";
import { UnauthorizedError, ValidationError } from "../errors";
import { checkIdSchema } from "../schemas/checkIdSchema";
import { JwtAuthPayload } from "../types/jwtAuthPayload";

export class ServiceHelper {
  protected getValidIdOrThrow(id: string): string {
    const { success, data, error } = checkIdSchema.safeParse({ id });

    if (error || !success) {
      throw new ValidationError(error);
    }
    return data.id;
  }

  protected hasAuthUserOrThrow(user?: JwtAuthPayload) {
    if (!user || !user.id || !user.email || !user.role) {
      throw new UnauthorizedError("need user jwt payload");
    }
    return user;
    //*** end of class */
  }

  protected validateOrThrow<T>(dataToValidate: T, schema: z.ZodType<T>): T {
    const { success, data, error } = schema.safeParse(dataToValidate);

    if (error || !success) {
      throw new ValidationError(error);
    }

    return data;
  }
  //*** end of class */
}
