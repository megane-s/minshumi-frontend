import { getServerSession } from "next-auth"

export const serverAction = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Args extends any[],
    Result,
>(
    action: (...args: Args) => Promise<Result>,
    options: Partial<{
        requireAuth: boolean
    }> = {},
) => {
    return async (...args: Args): Promise<Result> => {
        if (options.requireAuth) {
            // 認証必須時
            const session = await getServerSession()
            if (!session) {
                // 認証必須だが認証していない時
                throw new Error(`this server action required a session. please login .`)
            }
        }
        const result = await action(...args)
        return result
    }
}
