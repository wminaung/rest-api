import { Response } from "express";
import { ZodError } from "zod";

export function handleError(err: unknown, res: Response): void {
  if (err instanceof ZodError) {
    res
      .status(400)
      .json({ message: err.errors.map((e) => e.message).join(", ") });
  } else if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
}
