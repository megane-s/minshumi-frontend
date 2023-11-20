
import { AppShell } from "@mantine/core"
import { FC, ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { AppShellMain } from "./AppShell"

interface BaseLayoutProps {
    children: ReactNode
}
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
    return (
        <AppShell
            header={{ height: 60 }}
        >
            <Header />
            <AppShellMain>
                {children}
            </AppShellMain>
            <Footer />
        </AppShell>
    )
}

export default BaseLayout
