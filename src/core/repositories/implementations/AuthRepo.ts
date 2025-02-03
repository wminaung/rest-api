import { PrismaClient } from "@prisma/client";
import { IAuthRepo } from "../interfaces/IAuthRepo";
import { Repository } from "../Repository";
import { CreateUserSchema } from "../../../schemas/userSchema";
import { InternalServerError } from "../../../errors";
import { AuthDTO } from "../../../dtos/AuthDTO";
import { UserDTO } from "../../../dtos/UserDTO";

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
          role: data.role,
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
