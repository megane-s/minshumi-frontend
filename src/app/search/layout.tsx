"use client"

import SearchBar from "@/components/SearchBar"
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
            <SearchBar
                type={segment}
            />
            <Tabs variant="default" radius="md" value={segment}>
                <Tabs.List justify="center">
                    <Link href="/search/art">
                        <Tabs.Tab value="art" leftSection={<MdStarBorder />} className={css({ fontSize: "16px" })} >
                            作品
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/search/user">
                        <Tabs.Tab value="user" leftSection={<LiaGrinStarsSolid />} className={css({ fontSize: "16px" })}>
                            ユーザー
                        </Tabs.Tab>
                    </Link>
                </Tabs.List>
            </Tabs>

            {children}
        </div>
    )
}
export default SaearchLayout