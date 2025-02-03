import { $Enums } from "@prisma/client";

export interface AuthDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: $Enums.Role;
  profilePicture?: string | null;
}
