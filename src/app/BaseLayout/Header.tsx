import "server-only"

import { FC } from "react"
import Logo from "./Logo"
import { AppShellHeader } from "./AppShell"
import { Flex, Space } from "@mantine/core"
import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"
import HeaderDrawerMenu from "./HeaderDrawerMenu"
import { HeaderAvatar } from "./HeaderAvatar"
import { ActionIcon } from "@/components/ActionIcon"
import { NotificationIcon } from "@/components/icon/Notification"

interface HeaderProps {
}
const Header: FC<HeaderProps> = async () => {
    const session = await getSession()
    return (
        <AppShellHeader>

            <Flex justify="space-between" align="center" px="sm">
                <HeaderDrawerMenu />
                <Logo
                    imageProps={{ priority: true }}
                />
                <Flex align="center">
                    {session
                        ? <>
                            <ActionIcon
                                size="lg"
                                variant="subtle"
                                radius="xl"
                                color="info"
                            >
                                <NotificationIcon />
                            </ActionIcon>
                            <Space w="0.5em" />
                            <HeaderAvatar
                                session={session}
                            />
                        </>
                        : <LinkButton href="/login" variant="outline">
                            ログイン
                        </LinkButton>}
                </Flex>
            </Flex>

        </AppShellHeader>
    )
}

export default Header
