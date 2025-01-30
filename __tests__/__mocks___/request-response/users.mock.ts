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
  create: (body: CreateUserSchema) => {
    return {
      body,
    } as unknown as Request<{}, {}, CreateUserSchema>;
  },

  /**
   * Creates a mock request for getting all users
   * @returns A mock request
   */
  getAll: () => {
    return {} as unknown as Request;
  },

  /**
   * Creates a mock request for getting a user by id
   * @param id The id of the user
   * @returns A mock request with the id in the params
   */
  getById: (id: string) => {
    return {
      params: { id },
    } as Request<{ id: string }, {}, {}>;
  },

  update: (id: string, data: UpdateUserSchema) => {
    return { params: { id }, body: data } as unknown as Request<
      { id: string },
      {},
      UpdateUserSchema
    >;
  },

  /**
   * Creates a mock request for deleting a user by id
   * @param id The id of the user to be deleted
   * @returns A mock request with the id in the params
   */
  delete: (id: string) => {
    return { params: { id } } as unknown as Request<{ id: string }, {}, {}>;
  },
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
