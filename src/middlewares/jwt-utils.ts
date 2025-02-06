import { NextFunction, Request, Response } from "express";
import { JwtManager } from "../shared/helpers/JwtManager";
import { redis } from "../shared/lib/redis";

export const authenticationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }

  // Check if the access token is blacklisted
  const isBlacklisted = await redis.get(`blacklistedAccessToken:${token}`);
  console.log({ isBlacklisted });
  if (isBlacklisted) {
    res.status(401).json({ message: "Token has been revoked" });
    return;
  }

  // Decode token
  const decoded = JwtManager.verifyAccessToken(token);
  console.log({ decoded });
  if (!decoded || !decoded.id) {
    res.status(403).json({ message: "Invalid Token" });
    return;
  }

  req.user = decoded;
  next();
};

export const adminRoleCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ message: "Permission denied. Admins only." });
    return;
  }
  next();
};
