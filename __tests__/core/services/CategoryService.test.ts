import { PrismaClient } from "@prisma/client";
import { CategoryRepo } from "../../../src/core/repositories/implementations/CategoryRepo";
import { CategoryService } from "../../../src/core/services/CategoryService";
import { CreateCategorySchema } from "../../../src/core/schemas/categorySchema";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../../../src/errors";

describe("CategoryService", () => {
  let prisma: PrismaClient;
  let categoryRepo: CategoryRepo;
  let categoryService: CategoryService;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    categoryRepo = new CategoryRepo(prisma);
    categoryService = new CategoryService(categoryRepo);
    await prisma.category.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  afterEach(async () => {
    await prisma.category.deleteMany();
  });

  describe("createCategory", () => {
    it("should create a category", async () => {
      const data: CreateCategorySchema = { name: "test" };
      const category = await categoryService.createCategory(data);

      expect(category.name).toBe("test");
    });

    it("should throw ValidationError when data is invalid", async () => {
      try {
        const data: CreateCategorySchema = { name: "" }; // invalid data
        await categoryService.createCategory(data);
      } catch (error: Error | any) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.code).toBeDefined();
        expect(error.status).toBeDefined();
      }
    });
  });

  describe("getAllCategories", () => {
    it("should get all categories", async () => {
      const data: CreateCategorySchema[] = [
        { name: "test1" },
        { name: "test2" },
      ];
      await prisma.category.createMany({ data });

      const allCategories = await categoryService.getAllCategories();

      expect(allCategories.length).toBe(2);
      expect(allCategories[0].name).toBe("test1");
      expect(allCategories[1].name).toBe("test2");
    });
  });

  describe("getCategoryById", () => {
    it("should get category by id", async () => {
      const data: CreateCategorySchema = { name: "test1" };
      const categoryFromDb = await prisma.category.create({ data });

      const category = await categoryService.getCategoryById(categoryFromDb.id);

      expect(category).not.toBeNull();
      expect(category?.name).toBe("test1");
    });
  });

  describe("updateCategory", () => {
    it("should update category", async () => {
      const data: CreateCategorySchema = { name: "test1" };
      const categoryFromDb = await prisma.category.create({ data });

      const updatedCategory = await categoryService.updateCategory(
        categoryFromDb.id,
        { name: "test2" }
      );

      expect(updatedCategory).not.toBeNull();
      expect(updatedCategory?.name).toBe("test2");
    });

    it("should throw NotFoundError when category is not found", async () => {
      try {
        await categoryService.updateCategory("hello", {
          name: "test2",
        });
      } catch (error: Error | any) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.code).toBeDefined();
        expect(error.status).toBeDefined();
      }
    });
  });

  describe("deleteCategory", () => {
    it("should delete category", async () => {
      const data: CreateCategorySchema = { name: "test1" };
      const categoryFromDb = await prisma.category.create({ data });

      const deletedCategory = await categoryService.deleteCategory(
        categoryFromDb.id
      );

      expect(deletedCategory).not.toBeNull();
      expect(deletedCategory?.name).toBe("test1");
    });

    it("should throw NotFoundError when category is not found", async () => {
      try {
        await categoryService.deleteCategory("hello??hola");
      } catch (error: Error | any) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.code).toBeDefined();
        expect(error.status).toBeDefined();
      }
    });

    it("should throw ValidationError when invalid provided", async () => {
      try {
        await categoryService.deleteCategory("");
      } catch (error: Error | any) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.code).toBeDefined();
        expect(error.status).toBeDefined();
      }
    });
  });

  //******** CategoryService *********/
});
