"use client"

import { FC, useContext, useEffect } from "react"
import { NewArtProgressContext } from "./context"
import { notImplementError } from "@/util/notImplement"

interface NewArtProgressProps {
    now: number
}
const NewArtProgress: FC<NewArtProgressProps> = ({ now }) => {
    const context = useContext(NewArtProgressContext)
    if (!context) throw notImplementError()
    const setNow = context.setNow
    useEffect(() => {
        setNow(now)
    }, [setNow, now])
    return null
}

export default NewArtProgress
