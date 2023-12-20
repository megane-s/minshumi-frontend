"use client"

import { FC } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Tabs } from "@/components/Tabs"
import Link from "next/link"
import { ArtId } from "@/art/type"

interface EditTabsProps {
    artId: ArtId
}
const EditTabs: FC<EditTabsProps> = ({ artId }) => {
    const segment = useSelectedLayoutSegment()
    return (
        <div>
            <Tabs value={segment}>
                <Tabs.List>
                    <Link href={`/art/${artId}/edit/detail`}>
                        <Tabs.Tab value="detail">
                            detail
                        </Tabs.Tab>
                    </Link>
                    <Link href={`/art/${artId}/edit/tag`}>
                        <Tabs.Tab value="tag">
                            tag
                        </Tabs.Tab>
                    </Link>
                    <Link href={`/art/${artId}/edit/appeal`}>
                        <Tabs.Tab value="appeal">
                            detail
                        </Tabs.Tab>
                    </Link>
                </Tabs.List>
            </Tabs>
        </div>
    )
}

export default EditTabs
