import { Response } from "express";
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
import { UnexpectedError } from "../../errors/UnexpectedError";

/**
 * Formats a BaseError into an object that is suitable to be returned in a json
 * response. The returned object will have the following shape:
 * {
 *   error: {
 *     message: string,
 *     code: ErrorCode,
 *     status: number,
 *   },
 * }
 */
export const formatErrorResponse = (error: BaseError) => ({
  error: {
    message: error.message,
    code: error.code,
    status: error.status,
  },
});

/**
 * Handles an error by sending an appropriate response to the client.
 * This function takes an error and an Express Response object as arguments.
 * It will inspect the error and send a json response with the appropriate
 * status code and error message.
 *
 * If the error is an instance of BaseError, it will be formatted into a
 * json object with the shape of:
 * {
 *   error: {
 *     message: string,
 *     code: ErrorCode,
 *     status: number,
 *   },
 * }
 *
 * If the error is not an instance of BaseError, it will be wrapped in an
 * UnexpectedError, which will be formatted into the above shape.
 *
 * @param {unknown} err - The error to handle
 * @param {Response} res - The Express Response object to send the response with
 */
export const handleError = (err: unknown, res: Response): void => {
  switch (true) {
    case err instanceof NotFoundError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    case err instanceof ValidationError:
      res.status(400).json(formatErrorResponse(err));
      break;
    case err instanceof UnauthorizedError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    case err instanceof ForbiddenError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    case err instanceof ConflictError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    case err instanceof InternalServerError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    case err instanceof BadRequestError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    case err instanceof NotImplementedError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    case err instanceof ServiceUnavailableError:
      res.status(err.status).json(formatErrorResponse(err));
      break;
    default:
      const error = new UnexpectedError();
      res.status(error.status).json(formatErrorResponse(error));
  }
};
