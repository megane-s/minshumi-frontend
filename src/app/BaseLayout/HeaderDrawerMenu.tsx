"use client"

import { Divider, Drawer, Flex, Menu, NavLink } from "@mantine/core"
import { FC } from "react"
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";
import { tags } from "../tags";
import { Burger } from '@mantine/core';
import { css } from "styled-system/css";
import Image from "next/image";
import LogoImage from "@/../public/logo-rect.png"
import { logout } from "@/auth/client/logout";
import { EditIcon } from "@/components/icon/Edit";
import { ExitIcon } from "@/components/icon/Exit";
import { SettingsIcon } from "@/components/icon/Settings";
import { CgProfile } from "react-icons/cg";
import { IoMdMegaphone } from "react-icons/io";
import { TiBusinessCard } from "react-icons/ti";
import { Session } from "next-auth";

interface HeaderDrawerMenuProps {
    session: Session | null
}
const HeaderDrawerMenu: FC<HeaderDrawerMenuProps> = ({ session }) => {
    const [opened, { toggle, close }] = useDisclosure();
    return (
        <>
            <Flex
                className={css({ cursor: "pointer", position: "relative", width: "fit-content" })}
                align="center"
                onClick={toggle}
            >
                <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
            </Flex>
            <Drawer
                opened={opened}
                onClose={close}
                title={
                    <Link href={"/"} onClick={close}>
                        <Image
                            src={LogoImage}
                            alt="みんしゅみ"
                            width={150}
                            height={100}
                            style={{ objectFit: "contain" }}
                        />
                    </Link>

                }

            >
                {tags.map(tag =>
                    <NavLink
                        key={tag}
                        variant="light"
                        label={tag}
                        component={Link}
                        href={`/tag/${tag}`}
                        onClick={close}
                    />
                )}

                {session && <>
                    <Divider />
                    <NavLink
                        leftSection={<CgProfile />}
                        variant="light"
                        component={Link}
                        label="MYプロフィール"
                        href={`/user/${session.user.id}`}
                        onClick={close}
                    />

                    <NavLink
                        leftSection={<EditIcon />}
                        variant="light"
                        component={Link}
                        label="作品の登録"
                        href={`/art/new`}
                        onClick={close}
                    />

                    <NavLink
                        leftSection={<IoMdMegaphone />}
                        variant="light"
                        component={Link}
                        label="作品のアピール"
                        href="/art/appeal"
                        onClick={close}
                    />

                    <NavLink
                        leftSection={<TiBusinessCard />}
                        variant="light"
                        component={Link}
                        label="名刺の作成"
                        href="/businesscard/new"
                    />

                    <NavLink
                        leftSection={<SettingsIcon />}
                        variant="light"
                        component={Link}
                        label="プロフィールの編集"
                        href="/settings/user"
                    />


                    <NavLink
                        leftSection={<ExitIcon />}
                        variant="light"
                        label="ログアウト"
                        onClick={() => logout({ callbackUrl: "/" })}
                    />

                </>}
            </Drawer>
        </>
    )
}

export default HeaderDrawerMenu
