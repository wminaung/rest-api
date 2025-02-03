export interface PostDTO {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  categoryId?: string | null;
}
