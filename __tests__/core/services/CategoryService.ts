import { PrismaClient } from "@prisma/client";

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
    await prisma.user.deleteMany();
  });

  it("should create a category", async () => {});

  it("should get all categories", async () => {});
});
