import { Tabs as MTabs, TabsProps as MTabsProps } from "@mantine/core"

import { FC } from "react"

interface TabsProps extends MTabsProps {
}
export const Tabs: FC<TabsProps> = ({ ...props }) => {
    return (
        <MTabs {...props}></MTabs>
    )
}

export const TabsList = MTabs.List
export const TabsTab = MTabs.Tab
