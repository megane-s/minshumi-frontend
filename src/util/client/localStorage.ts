import { ZodSchema } from "zod";

export const getLocalStorageItem = <T>(key: string, schema: ZodSchema<T>) => {
    const value = localStorage.getItem(key)
    if (!value) return null
    const parsedValue = schema.safeParse(JSON.parse(value))
    if (!parsedValue.success) return null
    return parsedValue.data
}
