import { CategoryRepo } from "../../../src/core/repositories/implementations/CategoryRepo";
import { CategoryService } from "../../../src/core/services/CategoryService";
import { CreateCategorySchema } from "../../../src/core/schemas/categorySchema";
import { NotFoundError, ValidationError } from "../../../src/errors";
import prisma from "../../prisma";
import { Category } from "@prisma/client";
import { getFakeCategories } from "../../__mocks___/data/fakeCategories";

describe("CategoryService", () => {
  let categoryRepo: CategoryRepo;
  let categoryService: CategoryService;
  let fakeCategories: Category[];

  beforeAll(() => {
    categoryRepo = new CategoryRepo(prisma);
    categoryService = new CategoryService(categoryRepo);
    fakeCategories = getFakeCategories();
  });

  describe("createCategory", () => {
    it("should create a category", async () => {
      const resolveValue = fakeCategories[0];
      prisma.category.create.mockResolvedValue(resolveValue);
      const category = await categoryService.createCategory({
        name: resolveValue.name,
      });
      expect(category).toBeDefined();
      expect(category).not.toBeNull();
      expect(category.name).toBe(resolveValue.name);
    });

    it("should throw ValidationError when data is invalid", async () => {
      const payload = { name: "" };
      await expect(categoryService.createCategory(payload)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe("getAllCategories", () => {
    it("should get all categories", async () => {
      prisma.category.findMany.mockResolvedValue(fakeCategories);
      const allCategories = await categoryService.getAllCategories();
      expect(allCategories[0].name).toBe(fakeCategories[0].name);
      expect(allCategories[1].name).toBe(fakeCategories[1].name);
    });
  });

  describe("getCategoryById", () => {
    it("should get category by id", async () => {
      const resolveValue = fakeCategories[0];
      prisma.category.findUnique.mockResolvedValue(resolveValue);
      const category = await categoryService.getCategoryById(resolveValue.id);
      expect(category).toBeDefined();
      expect(category).not.toBeNull();
      expect(category?.name).toBe(resolveValue.name);
    });
  });

  describe("updateCategory", () => {
    it("should update category", async () => {
      const resolveValue = { ...fakeCategories[0], name: "updatedTest" };
      prisma.category.findUnique.mockResolvedValue(fakeCategories[0]);
      prisma.category.update.mockResolvedValue(resolveValue);
      const category = await categoryService.updateCategory(
        resolveValue.id,
        resolveValue
      );
      expect(category).toBeDefined();
      expect(category).not.toBeNull();
      expect(category?.name).toBe(resolveValue.name);
    });

    it("should throw NotFoundError when category is not found", async () => {
      const id = "invalid-id";
      await expect(
        categoryService.updateCategory(id, { name: "test2" })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("deleteCategory", () => {
    it("should delete category", async () => {
      const resolveValue = fakeCategories[0];
      prisma.category.findUnique.mockResolvedValue(resolveValue);
      prisma.category.delete.mockResolvedValue(resolveValue);
      const category = await categoryService.deleteCategory(resolveValue.id);
      expect(category).toBeDefined();
      expect(category).not.toBeNull();
      expect(category?.name).toBe(resolveValue.name);
    });

    it("should throw NotFoundError when category is not found", async () => {
      const id = "invalid-id";
      await expect(categoryService.deleteCategory(id)).rejects.toThrow(
        NotFoundError
      );
    });

    it("should throw ValidationError when invalid provided", async () => {
      const id = {} as string;
      await expect(categoryService.deleteCategory(id)).rejects.toThrow(
        ValidationError
      );
    });
  });

  //******** CategoryService *********/
});
