// seedファイルなのでPrismaClientのimportを許容
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()
