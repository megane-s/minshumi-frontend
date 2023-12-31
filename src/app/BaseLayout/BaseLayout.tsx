
import { AppShell, Container } from "@mantine/core"
import { FC, ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { AppShellMain } from "./AppShell"
import { css } from "styled-system/css"

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
                <Container className={css({ w: "full", minH: "full" })}>
                    {children}
                </Container>
            </AppShellMain>
            <Footer />
        </AppShell>
    )
}

export default BaseLayout
