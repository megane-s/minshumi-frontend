"use client"
import { createContext } from "react";

export interface NewArtProgress {
    now: number
    total: number
    setNow: (now: number) => void
}
export const NewArtProgressContext = createContext<null | NewArtProgress>(null)
