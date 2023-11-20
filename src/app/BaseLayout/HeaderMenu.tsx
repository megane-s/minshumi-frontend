"use client"

import { Button, Drawer, Flex, NavLink } from "@mantine/core"
import { FC } from "react"
import styles from "./Header.module.css"
import { useDisclosure } from '@mantine/hooks';
import Logo from "./Logo";
import Link from "next/link";
import { SlPencil } from "react-icons/sl"
import { BsBellFill } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"

interface HeaderMenuProps {
}
const HeaderMenu: FC<HeaderMenuProps> = () => {
    const [opened, { toggle, close }] = useDisclosure();
    return (
        <>
            <Flex className={styles.menu} align="center" onClick={toggle} >
                {/* <Burger opened={opened} />
                すべて */}
                <Button onClick={toggle} variant="default">
                    メニュー
                </Button>
            </Flex>
            <Drawer
                opened={opened}
                onClose={close}
                title={<Logo />}
            >
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
            </Drawer>
        </>
    )
}

export default HeaderMenu
