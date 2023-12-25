"use client"
import { Box, Container, Divider, Flex, Stack } from "@mantine/core"
import { FC } from "react"
import Logo from "./Logo"
import { Link } from "@/components/Link"
import { css } from "styled-system/css"

interface FooterProps {
}
const Footer: FC<FooterProps> = () => {
    return (
        <Box
            component="footer"
            className={css({ borderTop: "1px solid var(--mantine-color-gray-3)" })}
            bg="background.0"
            pt="md" pb="xl"
        >
            <Flex justify="space-between" component={Container}>
                <div>
                    <Logo
                        size="sm"
                    />
                </div>
                <div>
                    <Stack align="flex-end" ta="end">
                        <Link href="/search/art" c="backgroundText.0">
                            作品の検索
                        </Link>
                        <Link href="/search/user" c="backgroundText.0">
                            ユーザの検索
                        </Link>
                        <Box style={{ flexGrow: 1, flexShrink: 1, width: "100%" }}>
                            <Divider />
                        </Box>
                        <Link href="https://github.com/megane-s" newTab c="backgroundText.0">
                            Github
                        </Link>
                        <Link href="https://zenn.dev/p/megane_s" newTab c="backgroundText.0">
                            Zenn
                        </Link>
                    </Stack>
                </div>
            </Flex>
        </Box>
    )
}

export default Footer
