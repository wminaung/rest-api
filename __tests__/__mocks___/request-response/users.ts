import { Request, Response } from "express";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../../src/core/schemas/userSchema";

export const userMockRequest = {
  /**
   * Creates a mock request for creating a user
   * @param body The body of the request
   * @returns A mock request with the body
   */
  create: (body: CreateUserSchema) =>
    ({
      body,
    } as unknown as Request<{}, {}, CreateUserSchema>),

  getAll: () => ({} as unknown as Request),

  /**
   * Creates a mock request for getting a user by id
   * @param id The id of the user
   * @returns A mock request with the id in the params
   */
  getById: (id: string) =>
    ({
      params: { id },
    } as Request<{ id: string }, {}, {}>),

  update: (id: string, data: UpdateUserSchema) =>
    ({ params: { id }, body: data } as unknown as Request<
      { id: string },
      {},
      UpdateUserSchema
    >),
};

const createMockResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response);

export const userMockResponse = {
  create: createMockResponse,
  getAll: createMockResponse,
  getById: createMockResponse,
  update: createMockResponse,
  delete: createMockResponse,
};
