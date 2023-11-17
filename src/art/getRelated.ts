import { ArtSchema } from "@/prisma/generated";
import { notImplementWarn } from "@/util/notImplement";
import { Art } from "@prisma/client";
import "server-only";
import { z } from "zod";

export const GetRelatedArtsParamsSchema = z.object({
    artId: ArtSchema.shape.artId,
})
export type GetRelatedArtsParams = z.infer<typeof GetRelatedArtsParamsSchema>

export const getRelatedArts = async (params: GetRelatedArtsParams): Promise<Art[]> => {
    notImplementWarn("getRelatedArtsはまだ実装されていません。関連作品として空の配列がreturnされます。")
    return []
}
