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
});
