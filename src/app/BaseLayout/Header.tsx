import "server-only"

import { FC } from "react"
import { AppShellHeader } from "./AppShell"
import { Flex, Space } from "@mantine/core"
import { getSession } from "@/auth/server/auth"
import HeaderDrawerMenu from "./HeaderDrawerMenu"
import { HeaderAvatar } from "./HeaderAvatar"
import { ActionIcon } from "@/components/ActionIcon"
import { NotificationIcon } from "@/components/icon/Notification"
import { LoginButton } from "@/components/LoginButton"
import Image from "next/image"
import LogoImage from "@/../public/logo-rect.png"

interface HeaderProps {
}
const Header: FC<HeaderProps> = async () => {
    const session = await getSession()
    return (
        <AppShellHeader>
            <Flex justify="space-between" align="center" px="sm" h="100%">
                <HeaderDrawerMenu />
                {/* <Logo
                    imageProps={{
                        priority: true,
                    }}
                /> */}
                <Image
                    src={LogoImage}
                    alt="みんしゅみ"
                    width={100}
                    height={50}
                    style={{ height: "100%" }}
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
                        : <LoginButton />
                    }
                </Flex>
            </Flex>

        </AppShellHeader>
    )
}

export default Header
