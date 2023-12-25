import { ArtTagSchema } from "@/art/type"
// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    User as GeneratedUser,
    UserRank as GeneratedUserRank,
    UserRankSchema as GeneratedUserRankSchema,
    UserSchema as GeneratedUserSchema,
} from "@/prisma/generated"
import { z } from "zod"

export const UserSchema = GeneratedUserSchema
export type User = GeneratedUser

export const UserIdSchema = GeneratedUserSchema.shape.id
export type UserId = GeneratedUser["id"]

export const UserRank = GeneratedUserRankSchema.shape.rank
export type UserRank = GeneratedUserRank["rank"]

export const FirstRegisterInputSchema = z.object({
    interestTags: ArtTagSchema.array(),
})
export type FirstRegisterInput = z.infer<typeof FirstRegisterInputSchema>
