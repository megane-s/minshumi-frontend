// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unique = <T>(arr: T[]): T[] =>
    Array.from(new Set(Object.values(arr)))
