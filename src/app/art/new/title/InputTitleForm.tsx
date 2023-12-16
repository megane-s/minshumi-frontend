"use client"

import { FC } from "react"
import InputTitle from "./InputTitle"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"
import { NewArtSession } from "@/art/newArtSession/type"
import { Button } from "@/components/Button"
import { Center } from "@mantine/core"
import Link from "next/link"

interface InputTitleFormProps {
    defaultValues: Pick<NewArtSession, "artId">
}
const InputTitleForm: FC<InputTitleFormProps> = ({ defaultValues }) => {
    const [selectArtId, setSelectArtId] = useInputNewArtSessionField("artId", defaultValues.artId, "/art/new/title")
    return (
        <div>
            <InputTitle
                selectArtId={selectArtId}
                onSelectArt={({ artId }) => setSelectArtId(artId)}
            />

            {selectArtId !== null &&
                <Center>
                    <Button
                        variant="filled"
                        component={Link}
                        href="/art/new/appeal#"
                        my="sm"
                    >
                        次へ
                    </Button>
                </Center>
            }

            <Center>
                <Button
                    variant="subtle"
                    component={Link}
                    href="/art/new/detail"
                    my="sm"
                >
                    この中にない
                </Button>
            </Center>

        </div>
    )
}

export default InputTitleForm
