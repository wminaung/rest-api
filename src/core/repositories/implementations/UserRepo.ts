import { PrismaClient } from "@prisma/client";
import { IUserRepo } from "../interfaces/IUserRepo";
import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserSchema, UpdateUserSchema } from "../../schemas/userSchema";
import { UserSelectQuery } from "../../types/userSelectQuery";
import { NotFoundError } from "../../../errors/NotFoundError";
import { ConflictError, InternalServerError } from "../../../errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

  private async userExists(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return !!user;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    try {
      return await this.prisma.user.findMany({ select: this.selectQuery });
    } catch (error) {
      throw this.handlePrismaError(error, "Error fetching users");
    }
  }

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    try {
      return await this.prisma.user.create({
        data,
        select: this.selectQuery,
      });
    } catch (error) {
      throw this.handlePrismaError(error, "Error creating user");
    }
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: this.selectQuery,
      });
      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      throw this.handlePrismaError(error, "Error fetching user by ID");
    }
  }

  async updateUser(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    try {
      const userExists = await this.userExists(id);

      if (!userExists) {
        throw new NotFoundError("User not found");
      }

      return await this.prisma.user.update({
        where: { id },
        data,
        select: this.selectQuery,
      });
    } catch (error) {
      throw this.handlePrismaError(error, "Error updating user");
    }
  }

  async deleteUser(id: string): Promise<UserDTO> {
    try {
      const userExists = await this.userExists(id);
      if (!userExists) {
        throw new NotFoundError("User not found");
      }

      return await this.prisma.user.delete({
        where: { id },
        select: this.selectQuery,
      });
    } catch (error) {
      throw this.handlePrismaError(error, "Error deleting user");
    }
  }

  private handlePrismaError(error: any, message: string): Error {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return new ConflictError(message);
      }
    } else if (error instanceof NotFoundError) {
      throw error;
    }
    return new InternalServerError(message);
  }

  //***** UserRepo ******/
}
