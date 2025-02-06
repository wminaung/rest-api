import { Controller } from "../../../shared/abstracts/Controller";
import { ILikeService } from "../interfaces/ILikeService";

export class LikeController extends Controller {
  constructor(private readonly likeService: ILikeService) {
    super();
  }

  // ** End Of Class ** //
}
