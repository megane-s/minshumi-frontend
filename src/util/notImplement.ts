
export const notImplementWarn = (message: string = "⚠️ まだ実装されていない関数を呼び出しているため、挙動に注意してください。"): void => {
    console.warn(message)
}

export const notImplementError = (message: string = "まだ実装されていない関数を呼び出しました。"): never => {
    throw new Error(message)
}
