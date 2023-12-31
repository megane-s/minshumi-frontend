import "server-only"

import { FC } from "react"
import Logo from "./Logo"
import { AppShellHeader } from "./AppShell"
import { Flex, Space } from "@mantine/core"
import { Avatar } from "@/components/Avatar"
import { ActionIcon } from "@/components/ActionIcon"
import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"
import HeaderMenu from "./HeaderMenu"
import { InfoIcon } from "@/components/icon/Info"

interface HeaderProps {
}
const Header: FC<HeaderProps> = async () => {
    const session = await getSession()
    return (
        <AppShellHeader>

            <Flex justify="space-between" align="center" px="sm">
                <HeaderMenu session={session} />
                <Logo
                    imageProps={{ priority: true }}
                />
                <Flex align="center">
                    {session
                        ? <>
                            <ActionIcon
                                size="lg"
                                variant="outline"
                                radius="xl"
                                color="info.0"
                            >
                                <InfoIcon />
                            </ActionIcon>
                            <Space w="0.5em" />
                            <Avatar
                                src={session.user.image}
                                alt={session.user.name ?? "ユーザ"}
                            />
                        </>
                        : <LinkButton href="/login" variant="outline">
                            ログイン
                        </LinkButton>}
                </Flex>
            </Flex>

            {/* <HeaderMenu session={session} /> */}

        </AppShellHeader>
    )
}

export default Header
