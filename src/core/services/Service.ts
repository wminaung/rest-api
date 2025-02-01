import { ServiceHelper } from "../helpers/ServiceHelper";

export class Service {
  private serviceHelper: ServiceHelper;
  constructor() {
    this.serviceHelper = new ServiceHelper();
  }

  protected getValidId(id: string): string {
    return this.serviceHelper.getValidId(id);
  }
}
