"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { TextInput } from "@/components/TextInput"
import { Box, Center, Text } from "@mantine/core"
import { FC } from "react"
import styles from "./styles.module.css"
import { useQuery } from "@tanstack/react-query"
import { getSuggestions } from "./actions"

interface InputTitleProps {
    title: string
    onChangeTitle: (title: string) => void
    autoFocus?: boolean
}
const InputTitle: FC<InputTitleProps> = ({ title, onChangeTitle, autoFocus = true }) => {
    const suggestions = useQuery({
        queryKey: ["art", "suggestions", title],
        queryFn: async () => {
            return await getSuggestions(title)
        },
    })
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
                {suggestions.data?.length === 0
                    ? <Text my="sm">
                        タイトルを入力してください
                    </Text>
                    : <>
                        <Text my="sm">
                            もしかして...
                        </Text>
                        <Card variant="subtle" w="fit-content" miw="200px" maw="100%">
                            {suggestions.data?.map(suggestion =>
                                <Button key={suggestion} variant={title === suggestion ? "light" : "subtle"} w="100%" onClick={() => onChangeTitle(suggestion)}>
                                    {suggestion}
                                </Button>
                            )}
                        </Card>
                    </>
                }
            </Center>

        </div>
    )
}

export default InputTitle
