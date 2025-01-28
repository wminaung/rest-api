import { PrismaClient } from "@prisma/client";
import { IUserRepo } from "../interfaces/IUserRepo";
import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";

export class UserRepo implements IUserRepo {
  constructor(private prisma: PrismaClient) {}
  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.prisma.user.findMany();
    const userDTOs = users.map((user) => {
      const { password, ...userDTO } = user;
      return userDTO;
    });

    return userDTOs;
  }

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    const user = await this.prisma.user.create({ data });

    const { password, ...userDTO } = user;

    return userDTO;
  }

  getUserById(id: string): Promise<UserDTO | null> {
    throw new Error("Method not implemented.");
  }
  updateUser(
    id: string,
    data: Partial<{ name: string; profilePicture: string }>
  ): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: string): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
}
