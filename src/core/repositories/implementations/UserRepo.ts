import { PrismaClient } from "@prisma/client";
import { IUserRepo } from "../interfaces/IUserRepo";
import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserSchema, UpdateUserSchema } from "../../schemas/userSchema";
import { UserSelectQuery } from "../../types/userSelectQuery";
import { NotFoundError } from "../../../errors/NotFoundError";
import { InternalServerError } from "../../../errors";

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
    try {
      return await this.prisma.user.findMany({ select: this.selectQuery });
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    try {
      return await this.prisma.user.create({
        data,
        select: this.selectQuery,
      });
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        select: this.selectQuery,
      });
    } catch (error) {
      throw new InternalServerError();
    }
  }
  async updateUser(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    const userFromDb = await this.getUserById(id);
    if (!userFromDb) {
      throw new NotFoundError();
    }
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: this.selectQuery,
      });
    } catch (error) {
      throw new InternalServerError();
    }
  }
  async deleteUser(id: string): Promise<UserDTO> {
    const userFromDb = await this.getUserById(id);
    if (!userFromDb) {
      throw new NotFoundError();
    }
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: this.selectQuery,
      });
    } catch (error) {
      throw new InternalServerError();
    }
  }
}
