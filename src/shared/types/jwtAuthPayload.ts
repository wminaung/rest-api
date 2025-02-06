import { $Enums } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface JwtAuthPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: $Enums.Role;
  profilePicture?: string | null;
}
