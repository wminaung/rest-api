import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";
import "dotenv/config";
beforeEach(() => {
  mockReset(prisma);
});

const prisma = mockDeep<PrismaClient>();
export default prisma;
