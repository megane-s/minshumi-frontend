
import { AppShell, Container } from "@mantine/core"
import { FC, ReactNode } from "react"
import Header from "./Header"
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
            <AppShellMain style={{ paddingBottom: "100px" }}>
                <Container className={css({ w: "full", minH: "full" })}>
                    {children}
                </Container>
            </AppShellMain>
        </AppShell>
    )
}

export default BaseLayout
