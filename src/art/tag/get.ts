import { prisma } from "@/prisma"

export const getAllTags = async ({ limit = 10_000 }: Partial<{ limit: number }> = {}) => {
  return await prisma.artTag.findMany({
    distinct: ["tag"],
    take: limit,
  }).then(rows => rows.map(({ tag }) => tag))
}
