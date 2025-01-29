import { PrismaClient } from "@prisma/client";
import { CategoryRepo } from "../../../src/core/repositories/implementations/CategoryRepo";
import { CategoryService } from "../../../src/core/services/CategoryService";
import { CreateCategorySchema } from "../../../src/core/schemas/categorySchema";
import { ZodError } from "zod";

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

  it("should create a category", async () => {
    const data: CreateCategorySchema = { name: "test" };
    const category = await categoryService.createCategory(data);

    expect(category.name).toBe("test");
  });

  it("should throw zod error if data is invalid", async () => {
    try {
      const data: CreateCategorySchema = { name: "" }; // invalid data
      await categoryService.createCategory(data);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
      expect(error).toHaveProperty("issues");
    }
  });

  it("should get all categories", async () => {
    const data: CreateCategorySchema[] = [{ name: "test1" }, { name: "test2" }];
    await prisma.category.createMany({ data });

    const allCategories = await categoryService.getAllCategories();

    expect(allCategories.length).toBe(2);
    expect(allCategories[0].name).toBe("test1");
    expect(allCategories[1].name).toBe("test2");
  });

  it("should get category by id", async () => {
    const data: CreateCategorySchema = { name: "test1" };
    const categoryFromDb = await prisma.category.create({ data });

    const category = await categoryService.getCategoryById(categoryFromDb.id);

    expect(category).not.toBeNull();
    expect(category?.name).toBe("test1");
  });

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

  it("should throw error if category is not found", async () => {
    try {
      await categoryService.updateCategory("hello", {
        name: "test2",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message");
    }
  });

  it("should delete category", async () => {
    const data: CreateCategorySchema = { name: "test1" };
    const categoryFromDb = await prisma.category.create({ data });

    const deletedCategory = await categoryService.deleteCategory(
      categoryFromDb.id
    );

    expect(deletedCategory).not.toBeNull();
    expect(deletedCategory?.name).toBe("test1");
  });

  it("should throw error if category is not found", async () => {
    try {
      await categoryService.deleteCategory("hello??hola");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message");
    }
  });

  it("should throw zod error if id invlaid", async () => {
    try {
      await categoryService.deleteCategory("");
    } catch (error: Error | unknown) {
      expect(error).toBeInstanceOf(ZodError);
      if (error instanceof ZodError) {
        expect(error.issues).toBeDefined();
      }
    }
  });

  //******** CategoryService *********/
});
