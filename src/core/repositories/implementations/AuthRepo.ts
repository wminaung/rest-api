import { PrismaClient } from "@prisma/client";
import { IAuthRepo } from "../interfaces/IAuthRepo";
import { Role } from "../../../enums/Role";
import { Repository } from "../Repository";
import { AuthDTO } from "../../dtos/AuthDTO";
import { CreateUserSchema } from "../../../schemas/userSchema";
import { UserDTO } from "../../dtos/UserDTO";
import { InternalServerError } from "../../../errors";

export class AuthRepo extends Repository implements IAuthRepo {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private select = {
    id: true,
    name: true,
    email: true,
    password: true,
    role: true,
    profilePicture: true,
  };

  findByEmail(email: string): Promise<AuthDTO | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: this.select,
    });
  }

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: Role.USER,
        },
      });
      const { password, ...userDTO } = user;
      return userDTO;
    } catch {
      throw new InternalServerError("Error creating user");
    }
  }

  // end
}
