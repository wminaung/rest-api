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
  UnexpectedError,
  BaseError,
} from "../../../src/errors";
import { ZodError } from "zod";
import { ErrorCode } from "../../../src/enums/ErrorCode";
import { ErrorHandler } from "../../../src/core/utils/errorHandler";
import { ErrorFormatter } from "../../../src/core/helpers/ErrorFormatter";

describe("ErrorHandler", () => {
  const errorFormatter = new ErrorFormatter();
  const { formatErrorResponse } = errorFormatter;
  const { handleError } = new ErrorHandler(errorFormatter);

  describe("handleError", () => {
    let res: Response;
    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;
    });

    it("should handle NotFoundError", () => {
      const error = new NotFoundError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle ValidationError", () => {
      const zodError = new ZodError([]);
      const error = new ValidationError(zodError);
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: { message: error.message, code: error.code, status: 400 },
      });
    });

    it("should handle UnauthorizedError", () => {
      const error = new UnauthorizedError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle ForbiddenError", () => {
      const error = new ForbiddenError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle ConflictError", () => {
      const error = new ConflictError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle InternalServerError", () => {
      const error = new InternalServerError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle BadRequestError", () => {
      const error = new BadRequestError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle NotImplementedError", () => {
      const error = new NotImplementedError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle ServiceUnavailableError", () => {
      const error = new ServiceUnavailableError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(error.status);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      });
    });

    it("should handle unknown errors as UnexpectedError", () => {
      const error = new Error("Unknown error");
      const unexpectedError = new UnexpectedError();
      handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: unexpectedError.message,
          code: unexpectedError.code,
          status: unexpectedError.status,
        },
      });
    });
  });
  describe("formatErrorResponse", () => {
    it("should format a valid BaseError object", () => {
      const error = new BaseError(
        "Test error message",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
      const expectedResponse = {
        error: {
          message: "Test error message",
          code: error.code,
          status: 500,
        },
      };
      expect(formatErrorResponse(error)).toEqual(expectedResponse);
    });

    it("should format an Error object that extends BaseError", () => {
      const error = new ForbiddenError();

      const expectedResponse = {
        error: {
          message: error.message,
          code: error.code,
          status: error.status,
        },
      };
      expect(formatErrorResponse(error)).toEqual(expectedResponse);
    });
  });
});
