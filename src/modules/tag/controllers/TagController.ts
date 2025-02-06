import { Controller } from "../../../shared/abstracts/Controller";
import { ITagService } from "../interfaces/ITagService";

export class TagController extends Controller {
  constructor(private readonly tagService: ITagService) {
    super();
  }

  //** End Of Class **/
}
