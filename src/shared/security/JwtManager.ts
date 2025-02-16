import jwt from "jsonwebtoken";
import { JwtAuthPayload } from "../types/jwtAuthPayload";
import { StringValue } from "../types/ms.namespace.copy";
import configs from "../configs";

export class JwtManager {
  static generateAccessToken(
    payload: JwtAuthPayload,
    expiresIn: number | StringValue | undefined = "1H"
  ): string {
    return jwt.sign(payload, configs.jwtAccessTokenSecret, {
      expiresIn: expiresIn,
    });
  }

  static verifyAccessToken(token: string): JwtAuthPayload | null {
    try {
      return jwt.verify(token, configs.jwtAccessTokenSecret) as JwtAuthPayload;
    } catch {
      return null;
    }
  }

  static generateRefreshToken(
    payload: JwtAuthPayload,
    expiresIn: number | StringValue | undefined = "7d"
  ): string {
    return jwt.sign(payload, configs.jwtRefreshTokenSecret, {
      expiresIn: expiresIn,
    });
  }

  static verifyRefreshToken(token: string): JwtAuthPayload | null {
    try {
      return jwt.verify(token, configs.jwtRefreshTokenSecret) as JwtAuthPayload;
    } catch {
      return null;
    }
  }
}
