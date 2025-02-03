import { Request, Response } from "express";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "../../../src/schemas/postSchema";

export const postMockRequest = {
  create: (body: CreatePostSchema) => {
    return {
      body,
    } as unknown as Request<{}, {}, CreatePostSchema>;
  },

  getAll: () => {
    return {} as unknown as Request;
  },

  getById: (id: string) => {
    return {
      params: { id },
    } as Request<{ id: string }, {}, {}>;
  },

  update: (id: string, data: UpdatePostSchema) => {
    return {
      params: { id },
      body: data,
    } as unknown as Request<{ id: string }, {}, UpdatePostSchema>;
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

export const postMockResponse = {
  create: createMockResponse,
  getAll: createMockResponse,
  getById: createMockResponse,
  update: createMockResponse,
  delete: createMockResponse,
};
