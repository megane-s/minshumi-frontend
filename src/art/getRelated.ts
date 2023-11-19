import { notImplementWarn } from "@/util/notImplement";
import "server-only";
import { Art, ArtId } from "./type";

/**
 * 未実装。
 * 指定した作品に関連する作品を取得する。
 * @param artId 指定する作品のID。
 * @returns 関連する作品の一覧。
 */
// 未実装のためdisable。実装し次第外す。
// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
export const getRelatedArts = async (artId: ArtId): Promise<Art[]> => {
    notImplementWarn("getRelatedArtsはまだ実装されていません。関連作品として空の配列がreturnされます。")
    return []
}
