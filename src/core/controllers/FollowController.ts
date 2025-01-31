import { Request, Response } from "express";
import { FollowService } from "../services/FollowService";
import { Controller } from "./Controller";

export class FollowController extends Controller {
  constructor(private followService: FollowService) {
    super();
  }

  // async followUser(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { followerId, followingId } = req.body;
  //     const follow = await this.followService.followUser(
  //       followerId,
  //       followingId
  //     );
  //     this.ok(res, follow);
  //   } catch (error) {
  //     this.handleError(res, error);
  //   }
  // }

  // async unfollowUser(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { followerId, followingId } = req.body;
  //     const unfollow = await this.followService.unfollowUser(
  //       followerId,
  //       followingId
  //     );
  //     this.ok(res, unfollow);
  //   } catch (error) {
  //     this.handleError(res, error);
  //   }
  // }

  // async getFollowers(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { userId } = req.params;
  //     const followers = await this.followService.getFollowers(userId);
  //     this.ok(res, followers);
  //   } catch (error) {
  //     this.handleError(res, error);
  //   }
  // }

  // async getFollowing(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { userId } = req.params;
  //     const following = await this.followService.getFollowing(userId);
  //     this.ok(res, following);
  //   } catch (error) {
  //     this.handleError(res, error);
  //   }
  // }
  //* end
}
