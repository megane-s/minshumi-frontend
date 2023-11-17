import { notImplementWarn } from "@/util/notImplement"
import { Art } from "@prisma/client"
import "server-only"

export const searchArt = async (query: string): Promise<Art[]> => {
    notImplementWarn(`searchArt(${query}) はまだ実装されていません。現状はからの配列を返します。`)
    return []
}
