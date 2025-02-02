export interface NotificationDTO {
  id: string;
  message: string;
  isRead: boolean;
  userId: string;

  createdAt: Date;
}
