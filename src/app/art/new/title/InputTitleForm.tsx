"use client"

import { FC } from "react"
import InputTitle from "./InputTitle"
import { Button } from "@/components/Button"
import { Center } from "@mantine/core"
import Link from "next/link"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"
import { NewArtSession } from "@/art/newArtSession/type"

interface InputTitleFormProps {
    defaultValues: Pick<NewArtSession, "title">
}
const InputTitleForm: FC<InputTitleFormProps> = ({ defaultValues }) => {
    const [title, setTitle] = useInputNewArtSessionField("title", defaultValues.title, "/art/new/title")
    return (
        <div>
            <InputTitle
                title={title}
                onChangeTitle={setTitle}
            />

            <Center my="lg">
                <Button variant="filled" size="md" component={Link} href={`/art/new/detail#`} prefetch>
                    次へ
                </Button>
            </Center>

        </div>
    )
}

export default InputTitleForm
