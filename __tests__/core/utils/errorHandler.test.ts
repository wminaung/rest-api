import { Response } from "express";
import { ZodError } from "zod";
import { handleError } from "../../../src/core/utils/errorHandler";
import { BaseError, NotFoundError } from "../../../src/errors";

describe("handleError", () => {
  let res: Response;

  beforeEach(() => {
    res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
  });

  it("should handle errors from zod : status 400", () => {
    const mockZodError = new ZodError([]);
    handleError(mockZodError, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: mockZodError.errors.map((e) => e.message).join(", "),
    });
  });

  it("should handle errors from other sources : status 500", () => {
    const mockError = new BaseError();
    handleError(mockError, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });

  it("should handle errors from NotFound error : status 404", () => {
    const mockError = new NotFoundError();
    handleError(mockError, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
