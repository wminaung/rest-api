import { Request, Response } from "express";
import { FollowService } from "../services/FollowService";
import { Controller } from "./Controller";
import {
  CreateFollowSchema,
  DeleteFollowSchema,
} from "../../schemas/followSchema";

export class FollowController extends Controller {
  constructor(private followService: FollowService) {
    super();
  }
  private ok(res: Response, data: any) {
    res.status(200).json(data);
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
      this.ok(res, follow);
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
      this.ok(res, unfollow);
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
      this.ok(res, followers);
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
      this.ok(res, following);
    } catch (error) {
      this.handleError(error, res);
    }
  }
  //* end
}
