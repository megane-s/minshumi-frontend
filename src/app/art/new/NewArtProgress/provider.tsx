"use client"

import { FC, ReactNode, useState } from "react"
import { NewArtProgressContext } from "./context"
import NewArtProgressContent from "./content"


interface NewArtProgressProviderProps {
    total?: number
    children: ReactNode
}
export const NewArtProgressProvider: FC<NewArtProgressProviderProps> = ({ total = 4, children }) => {
    const [now, setNow] = useState(0)
    return (
        <NewArtProgressContext.Provider value={{ now, total, setNow }}>
            {children}
            <NewArtProgressContent
                now={now}
                total={total}
            />
        </NewArtProgressContext.Provider>
    )
}

