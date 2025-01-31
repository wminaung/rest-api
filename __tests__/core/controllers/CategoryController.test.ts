import { ZodError } from "zod";
import { CategoryController } from "../../../src/core/controllers/CategoryController";
import { ICategoryRepo } from "../../../src/core/repositories/interfaces/ICategoryRepo";
import { CategoryService } from "../../../src/core/services/CategoryService";

import {
  InternalServerError,
  NotFoundError,
  UnexpectedError,
  ValidationError,
} from "../../../src/errors";
import { ErrorCode } from "../../../src/enums/ErrorCode";
import {
  categoryMockRequest,
  categoryMockResponse,
} from "../../__mocks___/request-response/categories.mock";
import { ErrorFormatter } from "../../../src/core/helpers/ErrorFormatter";

class MockCategoryRepo implements ICategoryRepo {
  getAllCategories = jest.fn();
  getCategoryById = jest.fn();
  createCategory = jest.fn();
  updateCategory = jest.fn();
  deleteCategory = jest.fn();
}

describe("CategoryController", () => {
  let categoryController: CategoryController;
  let categoryRepo: MockCategoryRepo;
  let categoryService: CategoryService;
  let errorFormatter: ErrorFormatter;
  beforeEach(() => {
    categoryRepo = new MockCategoryRepo();
    categoryService = new CategoryService(categoryRepo);
    categoryController = new CategoryController(categoryService);
    errorFormatter = new ErrorFormatter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCategory", () => {
    it("should create a new category with status 201", async () => {
      const category = {
        id: "1",
        name: "Electronics",
      };
      const createCategoryData = {
        name: "Electronics",
      };
      const mockRequest = categoryMockRequest.create(createCategoryData);
      const mockResponse = categoryMockResponse.create();

      categoryRepo.createCategory.mockResolvedValue(category);

      await categoryController.createCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ ...category });
    });

    it("should handle error status 400 when data is not valid", async () => {
      const createCategoryData = {
        name: "hello",
      };

      const mockZodError = new ZodError([]);
      const error = new ValidationError(mockZodError);
      categoryRepo.createCategory.mockRejectedValue(error);

      const mockRequest = categoryMockRequest.create(createCategoryData);
      const mockResponse = categoryMockResponse.create();

      await categoryController.createCategory(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });
  });

  describe("getAllCategories", () => {
    it("should get all categories with status 200", async () => {
      const mockRequest = categoryMockRequest.getAll();
      const mockResponse = categoryMockResponse.getAll();
      const categories = [
        {
          id: "1",
          name: "Electronics",
        },
        {
          id: "2",
          name: "Books",
        },
      ];

      categoryRepo.getAllCategories.mockResolvedValue(categories);

      await categoryController.getAllCategories(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(categories);
    });

    it("should handle error status 500 when something goes wrong in the database", async () => {
      const mockRequest = categoryMockRequest.getAll();
      const mockResponse = categoryMockResponse.getAll();
      const error = new InternalServerError();
      categoryRepo.getAllCategories.mockRejectedValue(error);

      await categoryController.getAllCategories(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });
  });

  describe("getCategoryById", () => {
    it("should return a category object with status 200 when valid id is provided", async () => {
      const category = {
        id: "1",
        name: "Electronics",
      };
      const mockRequest = categoryMockRequest.getById(category.id);
      const mockResponse = categoryMockResponse.getById();

      categoryRepo.getCategoryById.mockResolvedValue(category);
      await categoryController.getCategoryById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(category);
    });

    it("should handle error status 404 when category is not found", async () => {
      const categoryId = "1";
      const mockRequest = categoryMockRequest.getById(categoryId);
      const mockResponse = categoryMockResponse.getById();

      const error = new NotFoundError();
      categoryRepo.getCategoryById.mockRejectedValue(error);
      await categoryController.getCategoryById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });

    it("should handle error status 400 when invalid id is provided", async () => {
      const mockRequest = categoryMockRequest.getById("invalid-id");
      const mockResponse = categoryMockResponse.getById();
      const error = new ValidationError(new ZodError([]));

      categoryRepo.getCategoryById.mockRejectedValue(error);
      await categoryController.getCategoryById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });
  });

  describe("updateCategory", () => {
    it("should update a category with status 200", async () => {
      const expectedCategory = {
        id: "1",
        name: "Updated Electronics",
      };
      const { id, ...valueToUpdate } = expectedCategory;

      const mockRequest = categoryMockRequest.update(id, valueToUpdate);
      const mockResponse = categoryMockResponse.update();
      categoryRepo.updateCategory.mockResolvedValue(expectedCategory);

      await categoryController.updateCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedCategory);
    });

    it("should handle error status 404 when category is not found", async () => {
      const valueToUpdate = {
        name: "Updated Electronics",
      };
      const error = new NotFoundError();
      categoryRepo.updateCategory.mockRejectedValue(error);

      const mockRequest = categoryMockRequest.update("2", valueToUpdate);
      const mockResponse = categoryMockResponse.update();

      await categoryController.updateCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });

    it("should handle error status 400 when invalid data is provided", async () => {
      const expectedCategory = {
        id: "1",
        name: "hello",
      };
      const { id, ...valueToUpdate } = expectedCategory;
      const error = new ValidationError(new ZodError([]));

      categoryRepo.updateCategory.mockRejectedValue(error);

      const mockRequest = categoryMockRequest.update(id, valueToUpdate);
      const mockResponse = categoryMockResponse.update();

      await categoryController.updateCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category with status 200", async () => {
      const expectedCategory = {
        id: "1",
        name: "Electronics",
      };
      categoryRepo.deleteCategory.mockResolvedValue(expectedCategory);

      const mockRequest = categoryMockRequest.delete(expectedCategory.id);
      const mockResponse = categoryMockResponse.delete();

      await categoryController.deleteCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedCategory);
    });

    it("should handle error status 404 when category is not found", async () => {
      const error = new NotFoundError("Category Not found!");
      categoryRepo.deleteCategory.mockRejectedValue(error);

      const mockRequest = categoryMockRequest.delete("3");
      const mockResponse = categoryMockResponse.delete();

      await categoryController.deleteCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          message: `Category Not found!`,
          code: ErrorCode.NOT_FOUND,
          status: 404,
        },
      });
    });

    it("should handle error status 400 when invalid id is provided", async () => {
      const error = new ValidationError(new ZodError([]));
      categoryRepo.deleteCategory.mockRejectedValue(error);

      const mockRequest = categoryMockRequest.delete("invalid-id");
      const mockResponse = categoryMockResponse.delete();

      await categoryController.deleteCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });

    it("should handle error status 500 when something goes wrong in the database", async () => {
      const error = new UnexpectedError();
      categoryRepo.deleteCategory.mockRejectedValue(error);

      const mockRequest = categoryMockRequest.delete("1");
      const mockResponse = categoryMockResponse.delete();

      await categoryController.deleteCategory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(error.status);
      expect(mockResponse.json).toHaveBeenCalledWith(
        errorFormatter.formatErrorResponse(error)
      );
    });
  });
});
