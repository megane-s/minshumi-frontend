"use client"

import { ImageInput } from "@/components/ImageInput"
import MutateButton from "@/components/MutateButton"
import { selectFile, uploadFile } from "@/file-upload/client"
import { useMutate } from "@/util/client/useMutate"
import { InputWrapper } from "@mantine/core"
import { FC } from "react"
import { css } from "styled-system/css"
import { circle, flex } from "styled-system/patterns"

interface InputImagesProps {
    backgroundImage: string
    onChangeBackgroundImage: (backgroundImage: string) => void
    icon: string
    onChangeIcon: (icon: string) => void
}
export const InputImages: FC<InputImagesProps> = ({ backgroundImage, onChangeBackgroundImage, icon, onChangeIcon }) => {
    const handleChangeIcon = useMutate(async () => {
        const file = await selectFile({ accept: "image/*" })
        const { publicUrl } = await uploadFile(file)
        onChangeIcon(publicUrl)
    }, {
        loading: { toast: "背景画像をアップロード中" },
        onSuccess: { toast: "背景画像をアップロードしました" },
    })
    const handleChangeBackgroundImage = useMutate(async () => {
        const file = await selectFile({ accept: "image/*" })
        const { publicUrl } = await uploadFile(file)
        onChangeBackgroundImage(publicUrl)
    }, {
        loading: { toast: "背景画像をアップロード中" },
        onSuccess: { toast: "背景画像をアップロードしました" },
    })
    return (
        <InputWrapper
            label="アイコンと背景"
        >
            <div className={flex({ w: "full", mt: "xs", gap: 1, flexWrap: "wrap" })}>
                <MutateButton
                    variant="outline"
                    size="xs"
                    className={css({ flexGrow: 1, flexShrink: 1, w: "full !important" })}
                    mutation={handleChangeIcon}
                >
                    アイコンを変更
                </MutateButton>
                <MutateButton
                    variant="outline"
                    size="xs"
                    className={css({ flexGrow: 1, flexShrink: 1, w: "full !important" })}
                    mutation={handleChangeBackgroundImage}
                >
                    背景を変更
                </MutateButton>
            </div>
        </InputWrapper>

    )
}
