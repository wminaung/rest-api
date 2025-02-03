import { FollowDTO } from "../../../src/dtos/FollowDTO";
import { FollowRepo } from "../../../src/core/repositories/implementations/FollowRepo";
import { FollowService } from "../../../src/core/services/FollowService";
import prisma from "./../../prisma";

describe("FollowService", () => {
  let followRepo: FollowRepo;
  let followService: FollowService;

  beforeAll(() => {
    followRepo = new FollowRepo(prisma);
    followService = new FollowService(followRepo);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should follow a user", async () => {
    const followData = { followerId: "1", followingId: "2" };
    const expectedFollow: FollowDTO = {
      id: "x1",
      ...followData,
      createdAt: new Date(),
    };
    prisma.follow.create.mockResolvedValue(expectedFollow);
    await expect(followService.followUser(followData)).resolves.toEqual(
      expectedFollow
    );
    expect(prisma.follow.create).toHaveBeenCalledWith({ data: followData });
  });

  it("should unfollow a user", async () => {
    const followData = { followerId: "1", followingId: "2" };
    const expectedFollow: FollowDTO = {
      id: "x1",
      followerId: followData.followerId,
      followingId: followData.followingId,
      createdAt: new Date(),
    };
    prisma.follow.findFirst.mockResolvedValue(expectedFollow);
    prisma.follow.delete.mockResolvedValue(expectedFollow);

    await expect(followService.unfollowUser(followData)).resolves.toEqual(
      expectedFollow
    );
    expect(prisma.follow.delete).toHaveBeenCalled();
  });

  it("should get a list of followers", async () => {
    const follows: FollowDTO[] = [
      { id: "x1", followerId: "1", followingId: "2", createdAt: new Date() },
      { id: "x2", followerId: "3", followingId: "2", createdAt: new Date() },
      { id: "x3", followerId: "4", followingId: "2", createdAt: new Date() },
      { id: "x4", followerId: "2", followingId: "1", createdAt: new Date() },
    ];

    const expectedValue = follows.filter(
      (follow) => follow.followingId === "2"
    );

    prisma.follow.findMany.mockResolvedValue(expectedValue);

    await expect(followService.getFollowers("2")).resolves.toEqual([
      ...expectedValue,
    ]);
    expect(prisma.follow.findMany).toHaveBeenCalledWith({
      where: { followingId: "2" },
    });
  });

  it("should get a list of following", async () => {
    const follows: FollowDTO[] = [
      { id: "x1", followerId: "2", followingId: "3", createdAt: new Date() },
      { id: "x2", followerId: "2", followingId: "4", createdAt: new Date() },
    ];

    prisma.follow.findMany.mockResolvedValue(follows);

    await expect(followService.getFollowing("2")).resolves.toEqual(follows);
    expect(prisma.follow.findMany).toHaveBeenCalledWith({
      where: { followerId: "2" },
    });
  });
});
