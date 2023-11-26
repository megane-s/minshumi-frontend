"use server"

import { getTitleSuggestions } from "@/art/getTitleSuggestions"

export const getSuggestions = async (query: string) =>
    getTitleSuggestions(query)

