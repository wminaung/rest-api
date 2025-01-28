import { PrismaClient } from "@prisma/client";
import { UserService } from "../../../src/core/services/UserService";
import { UserRepo } from "../../../src/core/repositories/implementations/UserRepo";
import { ZodError } from "zod";

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

  it("should return zod error when data is invalid", async () => {
    const data = {
      name: "", // invalid name
      email: "john@example.com",
      password: "ab", // invalid password
    };

    try {
      await userService.createUser(data);
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError);
      expect(err).toHaveProperty("issues");
    }
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

  it("should get user by id", async () => {
    const userFromDb = await prisma.user.create({
      data: {
        name: "John",
        email: "j@j.com",
        password: "password",
      },
    });
    const userById = await userService.getUserById(userFromDb.id);
    expect(userById).not.toBeNull();
    expect(userById).toHaveProperty("name");
    expect(userById).toHaveProperty("email");
    if (userById) {
      expect(userById.name).toBe("John");
      expect(userById.email).toBe("j@j.com");
      expect(userById).not.toHaveProperty("password");
    }
  });

  it("should update user when data is valid", async () => {
    const userFromDb = await prisma.user.create({
      data: {
        name: "John",
        email: "j@j.com",
        password: "password",
      },
    });
    const userUpdated = await userService.updateUser(userFromDb.id, {
      name: "John Doe",
    });
    expect(userUpdated).not.toBeNull();
    expect(userUpdated).toHaveProperty("name");
    expect(userUpdated).toHaveProperty("email");
    if (userUpdated) {
      expect(userUpdated.name).toBe("John Doe");
      expect(userUpdated.email).toBe("j@j.com");
      expect(userUpdated).not.toHaveProperty("password");
    }
  });

  it("should throw zod error when data is invalid", async () => {
    const userFromDb = await prisma.user.create({
      data: {
        name: "John",
        email: "j@j.com",
        password: "password",
      },
    });
    try {
      await userService.updateUser(userFromDb.id, {
        name: "J", // invalid data
      });
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError);
      expect(err).toHaveProperty("issues");
    }
  });

  it("should delete user when id is valid", async () => {
    const userFromDb = await prisma.user.create({
      data: {
        name: "John",
        email: "j@j.com",
        password: "password",
      },
    });
    const userDeleted = await userService.deleteUser(userFromDb.id);

    expect(userDeleted).not.toBeNull();
    expect(userDeleted).toHaveProperty("name");
    expect(userDeleted).toHaveProperty("email");
    if (userDeleted) {
      expect(userDeleted.name).toBe("John");
      expect(userDeleted.email).toBe("j@j.com");
      expect(userDeleted).not.toHaveProperty("password");
    }
  });
});
