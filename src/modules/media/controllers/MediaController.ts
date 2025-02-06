import { Controller } from "../../../shared/abstracts/Controller";
import { IMediaService } from "../interfaces/IMediaService";

export class MediaController extends Controller {
  constructor(private readonly mediaService: IMediaService) {
    super();
  }

  //** End Of Class **/
}
