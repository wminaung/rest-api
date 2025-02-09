import { PrismaClient } from "@prisma/client";
import { PrismaHelper } from "../helpers/PrismaHelper";

export abstract class Repository extends PrismaHelper {}
