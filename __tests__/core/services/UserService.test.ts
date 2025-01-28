import { PrismaClient } from "@prisma/client";
import { UserService } from "../../../src/core/services/UserService";
import { UserRepo } from "../../../src/core/repositories/implementations/UserRepo";

describe("UserService", () => {
  let prisma: PrismaClient;
  let userRepo: UserRepo;
  let userService: UserService;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    userRepo = new UserRepo(prisma);
    userService = new UserService(userRepo);
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should create a user", async () => {
    const user = await userService.createUser({
      name: "John",
      email: "j@j.com",
      password: "password",
    });

    expect(user.name).toBe("John");
    expect(user.email).toBe("j@j.com");
    expect(user).not.toHaveProperty("password");
  });

  it("should get all users", async () => {
    const users = [
      {
        name: "John",
        email: "j@j.com",
        password: "password",
      },
      {
        name: "Doe",
        email: "d@d.com",
        password: "password2",
      },
    ];

    const usersCreated = await prisma.user.createMany({ data: users });
    expect(usersCreated.count).toBe(2);

    const allUsers = await userService.getAllUsers();
    expect(allUsers[0].name).toBe("John");
    expect(allUsers[0]).not.toHaveProperty("password");
    expect(allUsers[1].name).toBe("Doe");
    expect(allUsers[1]).not.toHaveProperty("password");
  });
});
