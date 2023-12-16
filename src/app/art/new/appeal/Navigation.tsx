"use client"

import { Button } from "@/components/Button"
import { Flex } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { IoCaretBack } from "react-icons/io5"
import { handleCreateArt } from "./actions"
import { useMutate } from "@/util/client/useMutate"
import MutateButton from "@/components/MutateButton"
import { ArtId } from "@/art/type"

interface NavigationProps {
    artId: ArtId | null
}
const Navigation: FC<NavigationProps> = ({ artId }) => {
    const handleSubmit = useMutate(async () => {
        await handleCreateArt()
    }, {
        loading: "登録しています...",
        onSuccess: { toast: "好きな作品を登録しました！" },
    })
    return (
        <Flex justify="space-around" my="md" w="100%" wrap="wrap">
            <Button
                variant="default"
                leftSection={<IoCaretBack />}
                size="md"
                component={Link}
                href={artId ? "/art/new/title#" : "/art/new/tag#"}
            >
                戻る
            </Button>
            <MutateButton
                variant="gradient"
                size="md"
                rightSection={<IoMdCheckmark />}
                mutation={handleSubmit}
            >
                登録
            </MutateButton>
        </Flex>
    )
}

export default Navigation
