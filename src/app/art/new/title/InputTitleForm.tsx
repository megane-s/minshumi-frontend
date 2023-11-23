"use client"

import { FC, useState } from "react"
import InputTitle from "./InputTitle"
import { Button } from "@/components/Button"
import { Center } from "@mantine/core"
import Link from "next/link"

interface InputTitleFormProps {
}
const InputTitleForm: FC<InputTitleFormProps> = () => {
    const [title, setTitle] = useState("")
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
