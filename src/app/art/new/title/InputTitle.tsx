"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { TextInput } from "@/components/TextInput"
import { Box, Center, Text } from "@mantine/core"
import { FC } from "react"
import styles from "./styles.module.css"

interface InputTitleProps {
    title: string
    onChangeTitle: (title: string) => void
    autoFocus?: boolean
}
const InputTitle: FC<InputTitleProps> = ({ title, onChangeTitle, autoFocus = true }) => {
    return (
        <div>
            <Box my="lg">
                <TextInput
                    bg="background.2"
                    mx="lg"
                    classNames={{ input: styles.textAlignCenter }}
                    value={title} onChange={e => onChangeTitle(e.target.value)}
                    autoFocus={autoFocus}
                />
            </Box>

            <Center style={{ flexDirection: "column" }}>
                <Text my="sm">
                    もしかして...
                </Text>
                <Card variant="subtle" w="fit-content" miw="200px" maw="100%">
                    <Button variant={title === "鬼滅の刃" ? "light" : "subtle"} w="100%" onClick={() => onChangeTitle("鬼滅の刃")}>
                        鬼滅の刃
                    </Button>
                    <Button variant={title === "呪術廻戦" ? "light" : "subtle"} w="100%" onClick={() => onChangeTitle("呪術廻戦")}>
                        呪術廻戦
                    </Button>
                    <Button variant={title === "ずとまよ" ? "light" : "subtle"} w="100%" onClick={() => onChangeTitle("ずとまよ")}>
                        ずとまよ
                    </Button>
                </Card>
            </Center>

        </div>
    )
}

export default InputTitle
