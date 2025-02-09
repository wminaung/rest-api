import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../../shared/schemas/userSchema";
import { Repository } from "../../../shared/abstracts/Repository";
import {
  NotFoundError,
  ConflictError,
  InternalServerError,
} from "../../../shared/errors";
import { UserSelectQuery } from "../../../shared/types/userSelectQuery";
import { IUserRepo } from "../interfaces/IUserRepo";

export class UserRepo extends Repository implements IUserRepo {
  private static instance: UserRepo;

  static getInstance(prisma: PrismaClient): UserRepo {
    if (!UserRepo.instance) {
      UserRepo.instance = new UserRepo(prisma);
    }
    return UserRepo.instance;
  }

  constructor(private prisma: PrismaClient) {
    super();
  }

  private selectQuery: UserSelectQuery = {
    password: false,
    id: true,
    name: true,
    email: true,
    bio: true,
    profilePicture: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  };

  private async userExists(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return !!user;
  }

  async getAll(): Promise<UserDTO[]> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.user.findMany({ select: this.selectQuery }),
      "Error getting all users"
    );
  }

  async create(data: CreateUserSchema): Promise<UserDTO> {
    return this.executePrismaQueryOrThrow(
      () =>
        this.prisma.user.create({
          data,
          select: this.selectQuery,
        }),
      "error creating user"
    );
  }

  async get(id: string): Promise<UserDTO | null> {
    return this.executePrismaQueryOrThrow(
      () =>
        this.prisma.user.findUnique({
          where: { id },
          select: this.selectQuery,
        }),
      `Error getting user by id ${id}`
    );
  }

  async update(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    const userExists = await this.userExists(id);

    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    return this.executePrismaQueryOrThrow(
      () =>
        this.prisma.user.update({
          where: { id },
          data,
          select: this.selectQuery,
        }),
      `Error updating user by id ${id}`
    );
  }

  async delete(id: string): Promise<UserDTO> {
    const userExists = await this.userExists(id);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }

    return this.executePrismaQueryOrThrow(
      () =>
        this.prisma.user.delete({
          where: { id },
          select: this.selectQuery,
        }),
      `Error deleting user by id ${id}`
    );
  }

  //***** UserRepo ******/
}
