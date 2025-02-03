import { NextFunction, Request, Response } from "express";
import { JwtManager } from "../helpers/JwtManager";
import { redis } from "../lib/redis";

async function isTokenBlacklisted(token: string) {
  const decoded = JwtManager.verifyRefreshToken(token);
  if (!decoded) return false;

  const tokenId = decoded.jti;
  const isBlacklisted = await redis.get(`blacklist:${tokenId}`);

  return isBlacklisted === "blacklisted";
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }
  if (await isTokenBlacklisted(token)) {
    res.status(401).json({ message: "Token has been invalidated" });
    return;
  }
  next();
};
