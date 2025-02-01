import { PrismaHelper } from "../helpers/PrismaHelper";

export class Repository {
  private prismaHelper: PrismaHelper;
  constructor() {
    this.prismaHelper = new PrismaHelper();
  }

  protected async executePrismaQuery<T>(
    prismaCall: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    return this.prismaHelper.executePrismaQuery(prismaCall, errorMessage);
  }
}
