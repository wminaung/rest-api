import { Request, Response } from "express";
import { Controller } from "../../../shared/abstracts/Controller";
import {
  CreateFollowSchema,
  DeleteFollowSchema,
} from "../../../shared/schemas/followSchema";
import { IFollowService } from "../interfaces/IFollowService";

export class FollowController extends Controller {
  constructor(private followService: IFollowService) {
    super();
  }

  // Follow a user
  async followUser(
    req: Request<{}, {}, CreateFollowSchema>,
    res: Response
  ): Promise<void> {
    try {
      const { followerId, followingId } = req.body;
      const follow = await this.followService.followUser({
        followerId,
        followingId,
      });
      this.sendOk(res, follow);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // Unfollow a user
  async unfollowUser(
    req: Request<{}, {}, DeleteFollowSchema>,
    res: Response
  ): Promise<void> {
    try {
      const { followerId, followingId } = req.body;
      const unfollow = await this.followService.unfollowUser({
        followerId,
        followingId,
      });
      this.sendOk(res, unfollow);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getFollowers(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const followers = await this.followService.getFollowers(id);
      this.sendOk(res, followers);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // Get all users a user is following
  async getFollowing(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const following = await this.followService.getFollowing(id);
      this.sendOk(res, following);
    } catch (error) {
      this.handleError(error, res);
    }
  }
  //* end
}
