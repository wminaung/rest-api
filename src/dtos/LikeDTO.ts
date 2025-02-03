export interface LikeDTO {
  id: string;
  userId: string;
  postId?: string | null;
  commentId?: string | null;
  createdAt: Date;
}
