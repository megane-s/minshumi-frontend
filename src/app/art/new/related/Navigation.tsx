"use client"

import { Button } from "@/components/Button"
import { Flex } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { IoCaretBack } from "react-icons/io5"

interface NavigationProps {
}
const Navigation: FC<NavigationProps> = () => {
    const handleSubmit = async () => {
        alert("submit")
    }
    return (
        <Flex justify="space-around" my="md" w="100%" wrap="wrap">
            <Button
                variant="default"
                leftSection={<IoCaretBack />}
                size="md"
                component={Link}
                href="/art/new/tag#"
            >
                戻る
            </Button>
            <Button
                variant="gradient"
                size="md"
                rightSection={<IoMdCheckmark />}
                onClick={() => void handleSubmit()}
            >
                登録
            </Button>
        </Flex>
    )
}

export default Navigation
