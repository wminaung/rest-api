import { FollowDTO } from "../../../src/core/dtos/FollowDTO";
import { FollowRepo } from "../../../src/core/repositories/implementations/FollowRepo";
import { FollowService } from "../../../src/core/services/FollowService";
import prisma from "./../../prisma";

describe("FollowService", () => {
  let followRepo: FollowRepo;
  let followService: FollowService;
  //   let fakeUsers: User[];
  beforeAll(async () => {
    followRepo = new FollowRepo(prisma);
    followService = new FollowService(followRepo);
  });

  // it("should follow a user", () => {});

  // it("should unfollow a user", () => {});

  it("should get a list of followers", () => {
    const follows: FollowDTO[] = [
      { id: "x1", followerId: "1", followingId: "2", createdAt: new Date() },
      { id: "x2", followerId: "2", followingId: "1", createdAt: new Date() },
    ];

    prisma.follow.findMany.mockResolvedValue([follows[0]]);

    // Checking that user "2" has follower "1"
    expect(followService.getFollowers("2")).resolves.toEqual([follows[0]]);
  });

  // it("should get a list of following", () => {});
});
