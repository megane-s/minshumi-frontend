import { useQuery } from "@tanstack/react-query"
import { ZodSchema } from "zod"

export const useLocalStorage = <Value,>(
    key: string, schema: ZodSchema<Value>,
) => {
    const value = useQuery({
        queryKey: ["localStorage", key],
        queryFn: () => {
            const item = localStorage.getItem(key)
            if (!item) return null
            const parsedItem = schema.safeParse(JSON.parse(item))
            if (!parsedItem.success) return null
            return parsedItem.data
        },
    })
    const onChange = (value: Value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }
    return [value, onChange] as const
}
