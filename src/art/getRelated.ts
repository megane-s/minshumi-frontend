import { notImplementWarn } from "@/util/notImplement";
import { Art } from "@prisma/client";
import "server-only";

/**
 * 未実装。
 * 指定した作品に関連する作品を取得する。
 * @param artId 指定する作品のID。
 * @returns 関連する作品の一覧。
 */
export const getRelatedArts = async (artId: Art["artId"]): Promise<Art[]> => {
    notImplementWarn("getRelatedArtsはまだ実装されていません。関連作品として空の配列がreturnされます。")
    return []
}
