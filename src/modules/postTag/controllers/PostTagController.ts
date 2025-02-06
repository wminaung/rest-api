import { Controller } from "../../../shared/abstracts/Controller";
import { IPostTagService } from "../interfaces/IPostTagService";

export class PostTagController extends Controller {
  constructor(private readonly postTagService: IPostTagService) {
    super();
  }

  //** End Of Class **/
}
