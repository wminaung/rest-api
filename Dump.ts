// export interface IUserRepo {
//   createUser(data: {
//     name: string;
//     email: string;
//     password: string;
//     profilePicture?: string;
//     bio?: string;
//   }): Promise<User>;
//   getUserById(id: string): Promise<User | null>;
//   getAllUsers(): Promise<User[]>;
//   updateUser(
//     id: string,
//     data: Partial<{
//       name: string;
//       email: string;
//       password: string;
//       profilePicture?: string;
//       bio?: string;
//     }>
//   ): Promise<User | null>;
//   deleteUser(id: string): Promise<User | null>;
//   getUserPosts(userId: string): Promise<Post[]>;
//   getUserComments(userId: string): Promise<Comment[]>;
//   getUserLikes(userId: string): Promise<Like[]>;
//   getUserFollowers(userId: string): Promise<Follow[]>;
//   getUserFollowing(userId: string): Promise<Follow[]>;
//   getUserNotifications(userId: string): Promise<Notification[]>;
//   getUserMedia(userId: string): Promise<Media[]>;
// }

// export interface IPostRepo {
//   createPost(data: {
//     title: string;
//     content: string;
//     userId: string;
//     categoryId?: string;
//   }): Promise<Post>;
//   getPostById(id: string): Promise<Post | null>;
//   getAllPosts(): Promise<Post[]>;
//   updatePost(
//     id: string,
//     data: Partial<{ title: string; content: string; categoryId?: string }>
//   ): Promise<Post | null>;
//   deletePost(id: string): Promise<Post | null>;
//   getPostComments(postId: string): Promise<Comment[]>;
//   getPostLikes(postId: string): Promise<Like[]>;
//   getPostTags(postId: string): Promise<PostTag[]>;
//   getPostCategory(postId: string): Promise<Category | null>;
// }

// export interface ICommentRepo {
//   createComment(data: {
//     content: string;
//     userId: string;
//     postId: string;
//   }): Promise<Comment>;
//   getCommentById(id: string): Promise<Comment | null>;
//   getAllComments(): Promise<Comment[]>;
//   updateComment(id: string, data: { content: string }): Promise<Comment | null>;
//   deleteComment(id: string): Promise<Comment | null>;
//   getCommentLikes(commentId: string): Promise<Like[]>;
// }

// export interface ILikeRepo {
//   createLike(data: {
//     userId: string;
//     postId?: string;
//     commentId?: string;
//   }): Promise<Like>;
//   getLikeById(id: string): Promise<Like | null>;
//   getAllLikes(): Promise<Like[]>;
//   deleteLike(id: string): Promise<Like | null>;
// }

// export interface IFollowRepo {
//   followUser(data: {
//     followerId: string;
//     followingId: string;
//   }): Promise<Follow>;
//   getFollowById(id: string): Promise<Follow | null>;
//   getAllFollows(): Promise<Follow[]>;
//   unfollowUser(id: string): Promise<Follow | null>;
// }

// export interface INotificationRepo {
//   createNotification(data: {
//     message: string;
//     userId: string;
//   }): Promise<Notification>;
//   getNotificationById(id: string): Promise<Notification | null>;
//   getAllNotifications(): Promise<Notification[]>;
//   updateNotification(
//     id: string,
//     data: { isRead: boolean }
//   ): Promise<Notification | null>;
//   deleteNotification(id: string): Promise<Notification | null>;
// }

// export interface IMediaRepo {
//   uploadMedia(data: {
//     url: string;
//     type: MediaType;
//     userId: string;
//   }): Promise<Media>;
//   getMediaById(id: string): Promise<Media | null>;
//   getAllMedia(): Promise<Media[]>;
//   updateMedia(
//     id: string,
//     data: { url?: string; type?: MediaType }
//   ): Promise<Media | null>;
//   deleteMedia(id: string): Promise<Media | null>;
// }

// export interface ICategoryRepo {
//   createCategory(data: { name: string }): Promise<Category>;
//   getCategoryById(id: string): Promise<Category | null>;
//   getAllCategories(): Promise<Category[]>;
//   updateCategory(id: string, data: { name: string }): Promise<Category | null>;
//   deleteCategory(id: string): Promise<Category | null>;
//   getCategoryPosts(categoryId: string): Promise<Post[]>;
// }

// export interface ITagRepo {
//   createTag(data: { name: string }): Promise<Tag>;
//   getTagById(id: string): Promise<Tag | null>;
//   getAllTags(): Promise<Tag[]>;
//   updateTag(id: string, data: { name: string }): Promise<Tag | null>;
//   deleteTag(id: string): Promise<Tag | null>;
//   getTagPosts(tagId: string): Promise<Post[]>;
// }

// export interface IPostTagRepo {
//   addTagToPost(data: { postId: string; tagId: string }): Promise<PostTag>;
//   getPostTagById(id: string): Promise<PostTag | null>;
//   getAllPostTags(): Promise<PostTag[]>;
//   removeTagFromPost(id: string): Promise<PostTag | null>;
// }
