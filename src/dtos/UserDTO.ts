import { $Enums } from "@prisma/client";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: $Enums.Role;
  profilePicture?: string | null;
  bio?: string | null;

  createdAt: Date;
  updatedAt: Date;
}
