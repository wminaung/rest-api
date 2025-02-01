import { PostService } from "../../../src/core/services/PostService";
import { PostRepo } from "../../../src/core/repositories/implementations/PostRepo";
import prisma from "../../prisma";
import { getFakePosts } from "../../__mocks___/data/fakePosts"; // Fake post data

import { NotFoundError, ValidationError } from "../../../src/errors";
import { Post } from "@prisma/client";

describe("PostService", () => {
  let postRepo: PostRepo;
  let postService: PostService;
  let fakePosts: Post[];

  beforeAll(async () => {
    postRepo = new PostRepo(prisma);
    postService = new PostService(postRepo);
    fakePosts = getFakePosts();
  });

  describe("create", () => {
    it("should create a post when data is valid", async () => {
      const payload = fakePosts[0];
      const { ...resolveValue } = payload;
      prisma.post.create.mockResolvedValue(resolveValue);
      const post = await postService.create({
        title: payload.title,
        content: payload.content,
        userId: payload.userId,
      });

      expect(post.title).toBe(payload.title);
      expect(post.content).toBe(payload.content);
      expect(post.userId).toBe(payload.userId);
    });

    it("should throw ValidationError when data is invalid", async () => {
      const payload = { title: "", content: "", userId: "" };
      await expect(postService.create(payload)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe("getAll", () => {
    it("should get all posts", async () => {
      const resolvePosts = fakePosts;
      prisma.post.findMany.mockResolvedValue(resolvePosts);
      const allPosts = await postService.getAll();
      expect(allPosts[0].title).toBe(fakePosts[0].title);
      expect(allPosts[1].title).toBe(fakePosts[1].title);
    });
  });

  describe("get", () => {
    it("should return a post when id is valid", async () => {
      const payload = fakePosts[0];
      const { ...resolveValue } = payload;
      prisma.post.findUnique.mockResolvedValue(resolveValue);
      const post = await postService.get(payload.id);
      expect(post).toBeDefined();
      expect(post).not.toBeNull();
      expect(post?.title).toBe(payload.title);
      expect(post?.content).toBe(payload.content);
    });

    it("should throw NotFoundError when post not found in db", async () => {
      const id = "abcd-id";
      await expect(postService.get(id)).rejects.toThrow(NotFoundError);
    });
  });

  describe("update", () => {
    it("should update a post when data is valid", async () => {
      const payload = fakePosts[0];
      const updateResolveValue = {
        id: payload.id,
        userId: payload.userId,
        categoryId: payload.categoryId,
        title: "Updated Post Title",
        content: "Updated content of the post",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.post.update.mockResolvedValue(updateResolveValue);
      prisma.post.findUnique.mockResolvedValue(payload);

      const updatedPost = await postService.update(
        payload.id,
        updateResolveValue
      );
      expect(updatedPost).toBeDefined();
      expect(updatedPost).not.toBeNull();
      expect(updatedPost.title).toBe(updateResolveValue.title);
      expect(updatedPost.content).toBe(updateResolveValue.content);
    });

    it("should throw ValidationError when data is invalid", async () => {
      const payload = { id: fakePosts[0].id, title: "", content: "" };
      await expect(postService.update(payload.id, payload)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe("delete", () => {
    it("should delete a post when id is valid", async () => {
      const { ...resolveValue } = fakePosts[0];
      prisma.post.findUnique.mockResolvedValue(resolveValue);
      prisma.post.delete.mockResolvedValue(resolveValue);

      const deletedPost = await postService.delete(resolveValue.id);

      expect(deletedPost).toBeDefined();
      expect(deletedPost).not.toBeNull();
      expect(deletedPost.title).toBe(resolveValue.title);
      expect(deletedPost.content).toBe(resolveValue.content);
    });

    it("should throw NotFoundError when post not found in db", async () => {
      const id = "invalid-id";
      await expect(postService.delete(id)).rejects.toThrow(NotFoundError);
    });

    it("should throw ValidationError when invalid id provided", async () => {
      const id = {} as string;
      await expect(postService.delete(id)).rejects.toThrow(ValidationError);
    });
  });
});
