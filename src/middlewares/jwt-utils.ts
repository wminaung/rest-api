import { NextFunction, Request, Response } from "express";
import { JwtManager } from "../helpers/JwtManager";

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
  const decoded = JwtManager.verifyAccessToken(token);

  if (!decoded || !decoded.email || !decoded.id) {
    res.status(403).json({ message: "Invalid Token" });
    return;
  }
  console.log(`valid token`);

  req.user = decoded;

  next();
};
