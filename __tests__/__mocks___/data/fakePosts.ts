import { Post } from "@prisma/client";

export const getFakePosts = () => [
  {
    id: "post1",
    title: "Post Title 1",
    content: "Content of Post 1",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
    categoryId: "category1",
  },
  {
    id: "post2",
    title: "Post Title 2",
    content: "Content of Post 2",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user2",
    categoryId: null,
  },
  {
    id: "post3",
    title: "Post Title 3",
    content: "Content of Post 3",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user3",
    categoryId: "category2",
  },
];
