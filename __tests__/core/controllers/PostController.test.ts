import { ZodError } from "zod";
import { PostController } from "../../../src/core/controllers/PostController";
import { IPostRepo } from "../../../src/core/repositories/interfaces/IPostRepo";
import { PostService } from "../../../src/core/services/PostService";
import { NotFoundError, ValidationError } from "../../../src/errors";
import { ErrorFormatter } from "../../../src/core/helpers/ErrorFormatter";
import {
  postMockRequest,
  postMockResponse,
} from "../../__mocks___/request-response/posts.mock";
import { Post } from "@prisma/client";
import { getFakePosts } from "../../__mocks___/data/fakePosts";
import { CategoryDTO } from "../../../src/core/dtos/CategoryDTO";

class MockPostRepo implements IPostRepo {
  getAll = jest.fn();
  get = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();
  getCategoryByPostId = jest.fn();
  getCommentsByPostId = jest.fn();
  getLikesByPostId = jest.fn();
  getTagsByPostId = jest.fn();
}

describe("PostController", () => {
  let postController: PostController;
  let postRepo: MockPostRepo;
  let postService: PostService;
  let fakePosts: Post[];

  beforeEach(() => {
    postRepo = new MockPostRepo();
    postService = new PostService(postRepo);
    postController = new PostController(postService);

    fakePosts = getFakePosts();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new post with status 201", async () => {
      const post = {
        id: "1",
        title: "Test Post",
        content: "Some content",
        userId: "123",
      };
      const createPostData = {
        title: "Test Post",
        content: "Some content",
        userId: "123",
      };
      const mockRequest = postMockRequest.create(createPostData);
      const mockResponse = postMockResponse.create();

      postRepo.create.mockResolvedValue(post);
      await postController.create(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(post);
    });

    it("should handle error status 400 when data is not valid", async () => {
      const createPostData = fakePosts[0];
      const mockZodError = new ZodError([]);
      const error = new ValidationError(mockZodError);
      postRepo.create.mockRejectedValue(error);

      const mockRequest = postMockRequest.create(createPostData);
      const mockResponse = postMockResponse.create();

      await postController.create(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });
  });

  describe("getAll", () => {
    it("should get all posts with status 200", async () => {
      const mockRequest = postMockRequest.getAll();
      const mockResponse = postMockResponse.getAll();
      const posts = [
        { id: "1", title: "Test Post", content: "Some content", userId: "123" },
      ];

      postRepo.getAll.mockResolvedValue(posts);
      await postController.getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(posts);
    });
  });

  describe("get", () => {
    it("should return a post with status 200 when valid id is provided", async () => {
      const post = fakePosts[0];
      const mockRequest = postMockRequest.getById(post.id);
      const mockResponse = postMockResponse.getById();

      postRepo.get.mockResolvedValue(post);
      await postController.get(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(post);
    });

    it("should handle error status 404 when post is not found", async () => {
      const error = new NotFoundError();
      postRepo.get.mockRejectedValue(error);
      const mockRequest = postMockRequest.getById("99");
      const mockResponse = postMockResponse.getById();

      await postController.get(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });
  });

  describe("delete", () => {
    it("should delete a post with status 200", async () => {
      const post = {
        id: "1",
        title: "Test Post",
        content: "Some content",
        userId: "123",
      };
      postRepo.delete.mockResolvedValue(post);

      const mockRequest = postMockRequest.delete(post.id);
      const mockResponse = postMockResponse.delete();

      await postController.delete(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(post);
    });
  });
});
