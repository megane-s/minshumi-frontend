"use client"

import { Divider, Drawer, Flex, NavLink } from "@mantine/core"
import { FC } from "react"
import { useDisclosure } from '@mantine/hooks';
import Logo from "./Logo";
import Link from "next/link";
import { Session } from "next-auth";
import { tags } from "../tags";
import { Burger } from '@mantine/core';
import { logout } from "@/auth/client/logout";
import { EditIcon } from "@/components/icon/Edit";
import { NotificationIcon } from "@/components/icon/Notification";
import { SettingsIcon } from "@/components/icon/Settings";
import { css } from "styled-system/css";
import { CgProfile } from "react-icons/cg";

interface HeaderMenuProps {
    session: Session | null
}
const HeaderMenu: FC<HeaderMenuProps> = ({ session }) => {
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
                title={<Logo />}
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
                        label="作品の登録"
                        rightSection={<EditIcon />}
                        component={Link}
                        href="/art/new"
                        onClick={close}
                    />
                    <NavLink
                        label="MYプロフィール"
                        rightSection={<CgProfile />}
                        component={Link}
                        href={`/user/${session.user.id}`}
                        onClick={close}
                    />
                    <NavLink
                        label="通知"
                        rightSection={<NotificationIcon />}
                        component={Link}
                        href="/notification"
                        onClick={close}
                    />
                    <NavLink
                        label="設定"
                        rightSection={<SettingsIcon />}
                        component={Link}
                        href="/settings"
                        onClick={close}
                    />
                    <NavLink
                        label="ログアウト"
                        onClick={() => logout()}
                    />
                </>}
            </Drawer>
        </>
    )
}

export default HeaderMenu
