"use client"

import { Drawer, Flex, NavLink } from "@mantine/core"
import { FC } from "react"
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";
import { tags } from "../tags";
import { Burger } from '@mantine/core';
import { css } from "styled-system/css";
import Image from "next/image";
import LogoImage from "@/../public/logo-rect.png"

interface HeaderDrawerMenuProps {
}
const HeaderDrawerMenu: FC<HeaderDrawerMenuProps> = () => {
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
            </Drawer>
        </>
    )
}

export default HeaderDrawerMenu
