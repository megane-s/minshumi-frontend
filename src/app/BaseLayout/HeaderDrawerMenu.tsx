"use client"

import { Divider, Drawer, Flex, NavLink } from "@mantine/core"
import { FC } from "react"
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";
import { tags } from "../tags";
import { Burger } from '@mantine/core';
import { css } from "styled-system/css";
import Image from "next/image";
import LogoImage from "@/../public/logo-rect.png"
import { logout } from "@/auth/client/logout";
import { Session } from "next-auth";
import { menus } from "./menu";

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

                    {menus.map((menu, i) =>
                        "href" in menu
                            ? <NavLink
                                key={i}
                                leftSection={menu.icon}
                                variant="light"
                                component={Link}
                                label={menu.label}
                                href={menu.href.replaceAll("[session.user.id]", session.user.id)}
                                onClick={close}
                            />
                            : <NavLink
                                key={i}
                                leftSection={menu.icon}
                                variant="light"
                                label={menu.label}
                                onClick={() => menu.onClick === "logout" ? logout() : void 0}
                            />
                    )}

                </>}
            </Drawer>
        </>
    )
}

export default HeaderDrawerMenu
