import { User } from "@prisma/client";
import { getFakeUsers } from "./__mocks___/data/fakeUsers";
import prisma from "./prisma";

describe("prismaMock", () => {
  let fakeUsers: User[];
  beforeEach(() => {
    fakeUsers = getFakeUsers();
    prisma.user.findMany.mockResolvedValue(fakeUsers);
  });

  it("createUser", async () => {
    const newUser = {
      ...fakeUsers[0],
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password new",
    };
    prisma.user.create.mockResolvedValue(newUser);
    const user = await prisma.user.create({ data: newUser });
    expect(user).not.toBeNull();
    expect(user).toStrictEqual(newUser);
  });

  it("getAllUsers", async () => {
    const users = await prisma.user.findMany();
    expect(users).not.toBeNull();
    expect(users).toStrictEqual(fakeUsers);
  });

  it("getUserById", async () => {
    const userId = fakeUsers[0].id;
    prisma.user.findUnique.mockResolvedValue(fakeUsers[0]);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    expect(user).not.toBeNull();
    expect(user).toStrictEqual(fakeUsers[0]);
  });

  it("updateUser", async () => {
    const userId = fakeUsers[0].id;
    const updatedUser = {
      ...fakeUsers[0],
      name: "Jane Doe",
    };
    prisma.user.update.mockResolvedValue(updatedUser);
    const user = await prisma.user.update({
      where: { id: userId },
      data: updatedUser,
    });
    expect(user).not.toBeNull();
    expect(user).toStrictEqual(updatedUser);
  });

  it("deleteUser", async () => {
    const userId = fakeUsers[0].id;
    prisma.user.delete.mockResolvedValue(fakeUsers[0]);
    const user = await prisma.user.delete({ where: { id: userId } });
    expect(user).not.toBeNull();
    expect(user).toStrictEqual(fakeUsers[0]);
  });
});
