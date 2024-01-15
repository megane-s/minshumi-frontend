"use client"

import { Space, Tabs } from "@mantine/core"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import { MdStarBorder } from "react-icons/md";
import { LiaGrinStarsSolid } from "react-icons/lia";
import { css } from "styled-system/css"

interface PageProps {
    children: ReactNode
}
const SaearchLayout = ({ children }: PageProps) => {
    const segment = useSelectedLayoutSegment() as "art" | "user"
    return (
        <div>
            <Tabs variant="default" radius="md" value={segment}>
                <Tabs.List justify="center" style={{ marginBottom: "10px" }}>
                    <Link href="/settings/user">
                        <Tabs.Tab value="user" leftSection={<MdStarBorder />} className={css({ fontSize: "16px" })} >
                            ユーザー
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/interesttag">
                        <Tabs.Tab value="interesttag" leftSection={<LiaGrinStarsSolid />} className={css({ fontSize: "16px" })}>
                            興味タグ
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/likeart">
                        <Tabs.Tab value="likeart" leftSection={<LiaGrinStarsSolid />} className={css({ fontSize: "16px" })}>
                            好きな作品
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/watchingart">
                        <Tabs.Tab value="watchingart" leftSection={<LiaGrinStarsSolid />} className={css({ fontSize: "16px" })}>
                            今見ている作品
                        </Tabs.Tab>
                    </Link>

                </Tabs.List>
            </Tabs>

            {children}
        </div>
    )
}
export default SaearchLayout