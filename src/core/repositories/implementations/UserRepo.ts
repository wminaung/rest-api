import { PrismaClient } from "@prisma/client";
import { IUserRepo } from "../interfaces/IUserRepo";
import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserSchema, UpdateUserSchema } from "../../schemas/userSchema";
import { UserSelectQuery } from "../../types/userSelectQuery";
import { NotFoundError } from "../../errors/NotFoundError";

export class UserRepo implements IUserRepo {
  constructor(private prisma: PrismaClient) {}

  private selectQuery: UserSelectQuery = {
    password: false,
    id: true,
    name: true,
    email: true,
    bio: true,
    profilePicture: true,
    createdAt: true,
    updatedAt: true,
  };

  async getAllUsers(): Promise<UserDTO[]> {
    return await this.prisma.user.findMany({ select: this.selectQuery });
  }

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    return await this.prisma.user.create({
      data,
      select: this.selectQuery,
    });
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: this.selectQuery,
    });
  }
  async updateUser(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    const userFromDb = await this.getUserById(id);
    if (!userFromDb) {
      throw new Error("User not found to update");
    }
    return await this.prisma.user.update({
      where: { id },
      data,
      select: this.selectQuery,
    });
  }
  async deleteUser(id: string): Promise<UserDTO> {
    const userFromDb = await this.getUserById(id);
    if (!userFromDb) {
      throw new NotFoundError("User not found to delete");
    }
    return await this.prisma.user.delete({
      where: { id },
      select: this.selectQuery,
    });
  }
}
