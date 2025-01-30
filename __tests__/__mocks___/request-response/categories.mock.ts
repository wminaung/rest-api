import { Request, Response } from "express";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../../src/core/schemas/categorySchema";

export const categoryMockRequest = {
  create: (body: CreateCategorySchema) => {
    return {
      body,
    } as unknown as Request<{}, {}, CreateCategorySchema>;
  },

  getAll: () => {
    return {} as unknown as Request;
  },

  getById: (id: string) => {
    return {
      params: { id },
    } as Request<{ id: string }, {}, {}>;
  },

  update: (id: string, data: UpdateCategorySchema) => {
    return {
      params: { id },
      body: data,
    } as unknown as Request<{ id: string }, {}, UpdateCategorySchema>;
  },

  delete: (id: string) => {
    return {
      params: { id },
    } as unknown as Request<{ id: string }, {}, {}>;
  },
};

const createMockResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response);

export const categoryMockResponse = {
  create: createMockResponse,
  getAll: createMockResponse,
  getById: createMockResponse,
  update: createMockResponse,
  delete: createMockResponse,
};
