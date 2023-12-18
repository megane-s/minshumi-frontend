"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { TextInput } from "@/components/TextInput"
import { Center, Loader } from "@mantine/core"
import { FC, useState } from "react"
import styles from "./styles.module.css"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "react-use"
import { Art, ArtId, ArtSchema } from "@/art/type"

interface InputTitleProps {
    selectArtId: ArtId | null
    onSelectArt: (art: Art) => void
    autoFocus?: boolean
}
const SelectArt: FC<InputTitleProps> = ({ autoFocus = true, selectArtId, onSelectArt }) => {
    const [title, setTitle] = useState("")
    const [debouncedTitle, setDebouncedTitle] = useState(title)
    useDebounce(() => {
        setDebouncedTitle(title)
    }, 500, [title])

    const queryClient = useQueryClient()
    const suggestions = useQuery({
        queryKey: ["art", "suggestions", debouncedTitle],
        queryFn: async ({ signal }) => {
            const suggestions = await fetch(`/api/art/suggest?q=${title}`, { signal })
                .then(r => r.json())
                .then(r => ArtSchema.array().parse(r))
            suggestions.forEach(suggest => {
                queryClient.setQueryData(["art", suggest.artId], suggest)
            })
            return suggestions
        },
        placeholderData: keepPreviousData,
        throwOnError: true,
    })

    return (
        <div>
            <Center mb="lg" mx="xl">
                <TextInput
                    bg="background.2"
                    classNames={{ input: styles.textAlignCenter }}
                    value={title} onChange={e => setTitle(e.target.value)}
                    autoFocus={autoFocus}
                    w="300px"
                    maw="100%"
                    placeholder="タイトルを入力して作品を検索"
                />
            </Center>

            <Center style={{ flexDirection: "column" }}>
                {suggestions.data
                    ? suggestions.data.length !== 0 &&
                    <Card variant="subtle" w="100%" maw="600px">
                        {suggestions.data?.map(suggestion =>
                            <Button
                                key={suggestion.artId}
                                variant={selectArtId === suggestion.artId ? "filled" : "subtle"}
                                w="100%"
                                onClick={() => onSelectArt?.(suggestion)}
                            >
                                {suggestion.title}
                            </Button>
                        )}
                    </Card>
                    : <Loader />
                }
            </Center>

        </div>
    )
}

export default SelectArt
