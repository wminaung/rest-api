import { Response } from "express";
import { ZodError } from "zod";
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError,
  BadRequestError,
  NotImplementedError,
  ServiceUnavailableError,
  BaseError,
} from "../../errors";

export function handleError(err: unknown, res: Response): void {
  switch (true) {
    case err instanceof ZodError:
      res
        .status(400)
        .json({ message: err.errors.map((e) => e.message).join(", ") });
      break;
    case err instanceof NotFoundError:
      res.status(err.status).json({ message: err.message });
      break;
    case err instanceof ValidationError:
      res.status(400).json({ message: err.message });
      break;
    case err instanceof UnauthorizedError:
      res.status(err.status).json({ message: err.message });
      break;
    case err instanceof ForbiddenError:
      res.status(err.status).json({ message: err.message });
      break;
    case err instanceof ConflictError:
      res.status(err.status).json({ message: err.message });
      break;
    case err instanceof InternalServerError:
      res.status(err.status).json({ message: err.message });
      break;
    case err instanceof BadRequestError:
      res.status(err.status).json({ message: err.message });
      break;
    case err instanceof NotImplementedError:
      res.status(err.status).json({ message: err.message });
      break;
    case err instanceof ServiceUnavailableError:
      res.status(err.status).json({ message: err.message });
      break;
    default:
      const error = new BaseError();
      res.status(error.status).json({ message: error.message });
  }
}
