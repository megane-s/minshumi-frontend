import { notImplementWarn } from "@/util/notImplement"
import { User } from "@prisma/client"
import "server-only"

export const searchUser = async (query: string): Promise<User[]> => {
    notImplementWarn(`searchUser(${query}) はまだ実装されていません。現状はからの配列を返します。`)
    return []
}
