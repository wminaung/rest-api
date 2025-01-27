import { User } from "../entities/User";

// export type UserDTO = Omit<User, "password">;

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  profilePicture?: string | null;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
