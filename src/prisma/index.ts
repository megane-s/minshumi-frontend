import "server-only"

// データ層のコードなのでデータ層のアクセスを許可
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
