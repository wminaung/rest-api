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
import { ErrorHandler } from "../../../src/core/utils/ErrorHandler";
import { ErrorFormatter } from "../../../src/core/helpers/ErrorFormatter";

describe("ErrorHandler", () => {
  let formatter: ErrorFormatter;
  let handler: ErrorHandler;
  beforeAll(() => {
    formatter = new ErrorFormatter();
    handler = new ErrorHandler(formatter);
  });

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
      handler.handleError(error, res);
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
      handler.handleError(error, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: { message: error.message, code: error.code, status: 400 },
      });
    });

    it("should handle UnauthorizedError", () => {
      const error = new UnauthorizedError();
      handler.handleError(error, res);
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
      handler.handleError(error, res);
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
      handler.handleError(error, res);
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
      handler.handleError(error, res);
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
      handler.handleError(error, res);
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
      handler.handleError(error, res);
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
      handler.handleError(error, res);
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
      handler.handleError(error, res);
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
      expect(formatter.formatErrorResponse(error)).toEqual(expectedResponse);
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
      expect(formatter.formatErrorResponse(error)).toEqual(expectedResponse);
    });
  });
});
