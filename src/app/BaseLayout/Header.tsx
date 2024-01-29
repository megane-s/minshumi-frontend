import "server-only"

import { FC } from "react"
import { AppShellHeader } from "./AppShell"
import { Flex, Space } from "@mantine/core"
import { getSession } from "@/auth/server/auth"
import HeaderDrawerMenu from "./HeaderDrawerMenu"
import { HeaderAvatar } from "./HeaderAvatar"
import { LoginButton } from "@/components/LoginButton"
import Image from "next/image"
import LogoImage from "@/../public/logo-rect.png"
import Link from "next/link"
import { NotificationIcon } from "@/components/icon/Notification"
import { ActionIcon } from "@/components/ActionIcon"

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
                {/* <Logo
                    imageProps={{
                        priority: true,
                    }}
                /> */}
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
                            <Link href={"/notification"}>
                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    radius="xl"
                                    color="info"

                                >
                                    <NotificationIcon />
                                </ActionIcon>
                            </Link>
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
