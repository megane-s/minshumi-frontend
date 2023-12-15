"use client"

import { Divider, Drawer, Flex, NavLink } from "@mantine/core"
import { FC } from "react"
import styles from "./Header.module.css"
import { useDisclosure } from '@mantine/hooks';
import Logo from "./Logo";
import Link from "next/link";
import { SlPencil } from "react-icons/sl"
import { BsBellFill } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"
import { Session } from "next-auth";
import { tags } from "../tags";
import { Burger } from '@mantine/core';
import { logout } from "@/auth/client/logout";

interface HeaderMenuProps {
    session: Session | null
}
const HeaderMenu: FC<HeaderMenuProps> = ({ session }) => {
    const [opened, { toggle, close }] = useDisclosure();
    return (
        <>
            <Flex className={styles.menu} align="center" onClick={toggle} >
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
                    />
                )}
                {session && <>
                    <Divider />
                    <NavLink
                        label="作品の登録"
                        rightSection={<SlPencil />}
                        component={Link}
                        href="/art/new"
                    />
                    <NavLink
                        label="通知"
                        rightSection={<BsBellFill />}
                        component={Link}
                        href="/notification"
                    />
                    <NavLink
                        label="設定"
                        rightSection={<FcSettings />}
                        component={Link}
                        href="/settings"
                    />
                    <NavLink
                        label="ログアウト"
                        onClick={() => void logout()}
                    />
                </>}
            </Drawer>
        </>
    )
}

export default HeaderMenu
