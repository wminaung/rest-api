import { User } from "./User";

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  userId: string;
  user: User;
}
