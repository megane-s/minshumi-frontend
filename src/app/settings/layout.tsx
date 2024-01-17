"use client"

import { Space, Tabs } from "@mantine/core"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import { MdStarBorder } from "react-icons/md";
import { LiaGrinStarsSolid } from "react-icons/lia";
import { css } from "styled-system/css"
import { PageTitle } from "@/components/PageTitle"

interface PageProps {
    children: ReactNode
}
const SaearchLayout = ({ children }: PageProps) => {
    const segment = useSelectedLayoutSegment()
    return (
        <div>
            <PageTitle my="md">
                設定
            </PageTitle>
            <Tabs variant="default" radius="md" value={segment}>
                <Tabs.List className={css({ mb: "4 !important", w: "full", overflowX: "auto", flexWrap: "nowrap !important" })}>
                    <Link href="/settings/user">
                        <Tabs.Tab value="user" leftSection={<MdStarBorder />} className={css({ fontSize: "16px" })}>
                            ユーザー
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/interest-tags">
                        <Tabs.Tab value="interest-tags" leftSection={<LiaGrinStarsSolid />} className={css({ fontSize: "16px" })}>
                            興味タグ
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/appeals">
                        <Tabs.Tab value="appeals" leftSection={<LiaGrinStarsSolid />} className={css({ fontSize: "16px" })}>
                            アピール作品
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/watching-arts">
                        <Tabs.Tab value="watching-arts" leftSection={<LiaGrinStarsSolid />} className={css({ fontSize: "16px" })}>
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