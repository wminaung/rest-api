import { UnauthorizedError } from "../errors";
import { JwtAuthPayload } from "../types/jwtAuthPayload";

export class PermissionValidator {
  private throwUserPayloadNotExists(user?: JwtAuthPayload) {
    if (!user) {
      throw new UnauthorizedError("need user jwt payload");
    }
  }

  public authorizeAdminOrThrow(user?: JwtAuthPayload) {
    this.throwUserPayloadNotExists(user);
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError("Only admin can create User");
    }
  }
  public authorizeUserOrThrow(user?: JwtAuthPayload) {
    this.throwUserPayloadNotExists(user);
    if (user?.role !== "USER") {
      throw new UnauthorizedError("Only admin can create User");
    }
  }
}
