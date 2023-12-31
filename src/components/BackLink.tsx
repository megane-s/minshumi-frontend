"use client"

import { useRouter } from "next/navigation"
import { FC, ReactNode } from "react"
import { css } from "styled-system/css"

interface BackButtonProps {
    children: ReactNode
}
export const BackButton: FC<BackButtonProps> = ({ children }) => {
    const router = useRouter()
    return (
        <button className={css({ w: "fit-content", h: "fit-content" })} onClick={() => router.back()}>
            {children}
        </button>
    )
}
