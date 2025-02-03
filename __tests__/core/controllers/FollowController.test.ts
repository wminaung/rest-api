import { FollowController } from "../../../src/core/controllers/FollowController";
import { FollowService } from "../../../src/core/services/FollowService";
import { IFollowRepo } from "../../../src/core/repositories/interfaces/IFollowRepo";
import { Request, Response } from "express";
import { UnauthorizedError, ValidationError } from "../../../src/errors";
import { ZodError } from "zod";
import { ErrorFormatter } from "../../../src/helpers/ErrorFormatter";

class MockFollowRepo implements IFollowRepo {
  createFollow = jest.fn();
  getFollowers = jest.fn();
  getFollowing = jest.fn();
  deleteFollow = jest.fn();
  getFollow = jest.fn();
}

describe("FollowController", () => {
  let followController: FollowController;
  let followRepo: MockFollowRepo;
  let followService: FollowService;

  beforeEach(() => {
    followRepo = new MockFollowRepo();
    followService = new FollowService(followRepo);
    followController = new FollowController(followService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createFollow", () => {
    it("should create a new follow with status 201", async () => {
      const follow = {
        followerId: "1",
        followingId: "2",
      };

      const mockRequest = {
        body: follow,
      } as unknown as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      followRepo.createFollow.mockResolvedValue(follow);

      await followController.followUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(follow);
    });

    it("should handle error status 400 when data is not valid", async () => {
      const follow = {
        followerId: "1",
        followingId: "2",
      };
      const error = new ValidationError(new ZodError([]));
      followRepo.createFollow.mockRejectedValue(error);

      const mockRequest = {
        body: follow,
      } as unknown as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await followController.followUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    it("should handle error status 401", async () => {
      const follow = {
        followerId: "1",
        followingId: "2",
      };
      const err = new UnauthorizedError("Error creating follow");
      followRepo.createFollow.mockRejectedValue(err);

      const mockRequest = {
        body: follow,
      } as unknown as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await followController.followUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(err)
      );
    });
  });

  describe("getFollowers", () => {
    it("should get followers with status 200", async () => {
      const followers = [
        { id: "1", name: "User 1" },
        { id: "2", name: "User 2" },
      ];
      const mockRequest = {
        params: { userId: "1" },
      } as any;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      followRepo.getFollowers.mockResolvedValue(followers);

      await followController.getFollowers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(followers);
    });
  });

  describe("getFollowing", () => {
    it("should get following with status 200", async () => {
      const following = [
        { id: "3", name: "User 3" },
        { id: "4", name: "User 4" },
      ];
      const mockRequest = {
        params: { userId: "1" },
      } as any;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      followRepo.getFollowing.mockResolvedValue(following);

      await followController.getFollowing(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(following);
    });
  });

  describe("deleteFollow", () => {
    it("should delete follow with status 200", async () => {
      const follow = { followerId: "1", followingId: "2" };
      const mockRequest = {
        body: { followerId: "1", followingId: "2" },
      } as any;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      followRepo.getFollow.mockResolvedValue(follow);
      followRepo.deleteFollow.mockResolvedValue(follow);

      await followController.unfollowUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(follow);
    });
  });
});
