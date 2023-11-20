import "server-only"

import { FC } from "react"
import Logo from "./Logo"
import { AppShellHeader } from "./AppShell"
import { Flex, Space } from "@mantine/core"
import { Avatar } from "@/components/Avatar"
import { ActionIcon } from "@/components/ActionIcon"
import { IoMdInformation } from "react-icons/io"
import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"

interface HeaderProps {
}
const Header: FC<HeaderProps> = async () => {
    const session = await getSession()
    return (
        <AppShellHeader>
            <Flex justify="space-between" align="center" px="sm">
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
                                <IoMdInformation />
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
        </AppShellHeader>
    )
}

export default Header
