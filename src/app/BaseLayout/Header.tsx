import "server-only"

import { FC } from "react"
import { AppShellHeader } from "./AppShell"
import { Flex, Indicator, Space } from "@mantine/core"
import { getSession } from "@/auth/server/auth"
import HeaderDrawerMenu from "./HeaderDrawerMenu"
import { HeaderAvatar } from "./HeaderAvatar"
import { LoginButton } from "@/components/LoginButton"
import Image from "next/image"
import LogoImage from "@/../public/logo-rect.png"
import Link from "next/link"
import { NotificationIcon } from "@/components/icon/Notification"
import { ActionIcon } from "@/components/ActionIcon"
import { getUnreadNotificationCount } from "@/notification/get"
import { UserId } from "@/user/type"
import { flex } from "styled-system/patterns"

interface HeaderProps {
}
const Header: FC<HeaderProps> = async () => {
    const session = await getSession()
    return (
        <AppShellHeader>
            <Flex justify="space-between" align="center" px="sm" h="100%">
                <HeaderDrawerMenu
                    session={session}
                />
                <Link href={"/"}>
                    <Image
                        src={LogoImage}
                        alt="みんしゅみ"
                        width={100}
                        height={50}
                        style={{ height: "100%" }}
                    />
                </Link>
                <Flex align="center">
                    {session
                        ? <>
                            <NotificationButton
                                userId={session.user.id}
                            />
                            <Space w="0.5em" />
                            <HeaderAvatar
                                session={session}
                            />
                        </>
                        : <LoginButton />
                    }
                </Flex>
            </Flex>

        </AppShellHeader>
    )
}

export default Header

interface NotificationButtonProps {
    userId: UserId
}
export const NotificationButton: FC<NotificationButtonProps> = async ({ userId }) => {
    const count = await getUnreadNotificationCount({ userId, max: 100 })
    return (
        <Indicator
            label={count >= 100 ? "99+" : count}
            size="16"
            offset={5}
            color="error"
            classNames={{ indicator: flex({ justify: "center", align: "center" }) }}
            disabled={count === 0}
            processing
        >
            <ActionIcon
                size="lg"
                variant="subtle"
                radius="xl"
                color="info"
                component={Link}
                href="/notification"
            >
                <NotificationIcon />
            </ActionIcon>
        </Indicator>
    )
}
