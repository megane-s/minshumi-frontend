"use client"

import { Space, Tabs } from "@mantine/core"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import { css } from "styled-system/css"
import { PageTitle } from "@/components/PageTitle"
import { FaRegHeart } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

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
                        <Tabs.Tab value="user" leftSection={<FaRegUserCircle />} className={css({ fontSize: "16px" })}>
                            ユーザー
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/interest-tags">
                        <Tabs.Tab value="interest-tags" leftSection={<FaRegHeart />} className={css({ fontSize: "16px" })}>
                            興味タグ
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/appeals">
                        <Tabs.Tab value="appeals" leftSection={<FaRegLightbulb />} className={css({ fontSize: "16px" })}>
                            アピール作品
                        </Tabs.Tab>
                    </Link>
                    <Space w="1rem" />
                    <Link href="/settings/watching-arts">
                        <Tabs.Tab value="watching-arts" leftSection={<MdOutlineRemoveRedEye />} className={css({ fontSize: "16px" })}>
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