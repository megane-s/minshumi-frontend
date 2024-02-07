import { z } from "zod"

export const RandomImageRequestSchema = z.object({
    title: z.string(),
})
export type RandomImageBody = z.infer<typeof RandomImageRequestSchema>

export const RandomImageResponseBodySchema = z.object({
    publicUrl: z.string(),
})
export type RandomImageResponseBody = z.infer<typeof RandomImageResponseBodySchema>
