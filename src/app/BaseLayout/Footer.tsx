"use client"
import { Container, Divider, Flex, Stack } from "@mantine/core"
import { FC } from "react"
import { Link } from "@/components/Link"
import { css } from "styled-system/css"
import Image from "next/image"
import LogoImage from "@/../public/logo-rect.png"

interface FooterProps {
}
const Footer: FC<FooterProps> = () => {
    return (
        <footer
            className={css({
                borderTop: "1px solid",
                borderTopColor: "gray.300",
                bg: "background.0",
                pt: "md", pb: "xl",
            })}
        >
            <Flex justify="space-between" component={Container}>
                <div>
                    <Link href={"/"}>
                        <Image
                            src={LogoImage}
                            alt="みんしゅみ"
                            width={150}
                            height={100}
                            style={{ objectFit: "contain", width: 120, height: "auto" }}

                        />
                    </Link>
                </div>
                <div>
                    <Stack align="flex-end" ta="end">
                        <Link href="/search/art" c="backgroundText.0">
                            作品の検索
                        </Link>
                        <Link href="/search/user" c="backgroundText.0">
                            ユーザの検索
                        </Link>
                        <div className={css({ flexGrow: 1, flexShrink: 1, width: "100%" })}>
                            <Divider />
                        </div>
                        <Link href="https://github.com/megane-s" newTab c="backgroundText.0">
                            Github
                        </Link>
                        <Link href="https://zenn.dev/p/megane_s" newTab c="backgroundText.0">
                            Zenn
                        </Link>
                    </Stack>
                </div>
            </Flex>
        </footer>
    )
}

export default Footer
