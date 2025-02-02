import { UserService } from "../../../src/core/services/UserService";
import { UserRepo } from "../../../src/core/repositories/implementations/UserRepo";
import { User } from "@prisma/client";
import prisma from "../../prisma";
import { getFakeUsers } from "../../__mocks___/data/fakeUsers";

import { NotFoundError, ValidationError } from "../../../src/errors";
import { PasswordHasher } from "../../../src/core/helpers/PasswordHasher";

describe("UserService", () => {
  let userRepo: UserRepo;
  let userService: UserService;
  let fakeUsers: User[];
  let passwordHasher: PasswordHasher;
  beforeAll(async () => {
    userRepo = new UserRepo(prisma);
    passwordHasher = new PasswordHasher(10);
    userService = new UserService(userRepo, passwordHasher);
    fakeUsers = getFakeUsers();
  });

  describe("createUser", () => {
    it("should create a user when data is valid", async () => {
      const payload = fakeUsers[0];
      const { password, ...resolveValue } = payload;
      prisma.user.create.mockResolvedValue(resolveValue as User);
      const user = await userService.createUser({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });

      expect(user.name).toBe(user.name);
      expect(user.email).toBe(user.email);
      expect(user).not.toHaveProperty("password");
    });

    it("should throw ValidationError an error when data is invalid", async () => {
      const payload = { name: "", email: "", password: "" };
      await expect(userService.createUser(payload)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe("getAllUsers", () => {
    it("should get all users", async () => {
      const resolveUsers = fakeUsers.map((user) => {
        const { password, ...resolveValue } = user;
        return resolveValue as User;
      });
      prisma.user.findMany.mockResolvedValue(resolveUsers);
      const allUsers = await userService.getAllUsers();
      expect(allUsers[0].name).toBe(fakeUsers[0].name);
      expect(allUsers[0]).not.toHaveProperty("password");
      expect(allUsers[1].name).toBe(fakeUsers[1].name);
      expect(allUsers[1]).not.toHaveProperty("password");
    });
  });

  describe("getUserById", () => {
    it("should return a user when id is valid", async () => {
      const payload = fakeUsers[0];
      const { password, ...resolveValue } = payload;
      prisma.user.findUnique.mockResolvedValue(resolveValue as User);
      const user = await userService.getUserById(payload.id);

      expect(user).toBeDefined();
      expect(user).not.toBeNull();
      expect(user?.name).toBe(payload.name);
      expect(user?.email).toBe(payload.email);
      expect(user).not.toHaveProperty("password");
    });

    it("should throw NotFoundError when user not found in db", async () => {
      const id = "abc invalid-id";
      await expect(userService.getUserById(id)).rejects.toThrow(NotFoundError);
    });
  });

  describe("updateUser", () => {
    it("should update user when data is valid", async () => {
      const payload = fakeUsers[0];
      const { password, ...findUniqueResolveValue } = payload;
      const updateResolveValue = {
        name: "Win Min Aung",
        email: "minwin243@gmail.com",
      };
      prisma.user.update.mockResolvedValue(updateResolveValue as User);
      prisma.user.findUnique.mockResolvedValue(findUniqueResolveValue as User);
      const user = await userService.updateUser(payload.id, updateResolveValue);
      expect(user).toBeDefined();
      expect(user).not.toBeNull();
      expect(user.name).toBe(updateResolveValue.name);
      expect(user.email).toBe(updateResolveValue.email);
    });

    it("should throw ValidationError when data is invalid", async () => {
      const payload = { id: fakeUsers[0].id, name: "", email: "" };
      await expect(userService.updateUser(payload.id, payload)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete a user when id is valid", async () => {
      const { password, ...resolveValue } = fakeUsers[0];
      prisma.user.findUnique.mockResolvedValue(resolveValue as User);
      prisma.user.delete.mockResolvedValue(resolveValue as User);

      const deletedUser = await userService.deleteUser(resolveValue.id);

      expect(deletedUser).toBeDefined();
      expect(deletedUser).not.toBeNull();
      expect(deletedUser.name).toBe(resolveValue.name);
      expect(deletedUser.email).toBe(resolveValue.email);
      expect(deletedUser).not.toHaveProperty("password");
    });
    it("should throw NotFoundError when user not found in db", async () => {
      const id = "invalid-id";
      await expect(userService.deleteUser(id)).rejects.toThrow(NotFoundError);
    });

    it("should throw ValidationError when invalid id provided", async () => {
      const id = {} as string;
      await expect(userService.deleteUser(id)).rejects.toThrow(ValidationError);
    });
  });
});
