import * as express from "express";
import { JwtAuthPayload } from "./jwtAuthPayload";

declare module "express" {
  interface Request {
    user?: JwtAuthPayload;
  }
}
