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
            <div className={css({ position: "relative", px: "md" })}>
                <ImageInput
                    type="background"
                    src={backgroundImage}
                    alt="背景"
                    imageProps={{
                        width: 1200 / 4,
                        height: 675 / 4,
                    }}
                    className={css({ w: "full", aspectRatio: "1200 / 675" })}
                    onUpload={onChangeBackgroundImage}
                    onClick={e => e.stopPropagation()}
                />
                <ImageInput
                    type="icon"
                    src={icon}
                    alt="アイコン"
                    imageProps={{
                        width: 100,
                        height: 100,
                    }}
                    className={circle({ position: "absolute", inset: 0, m: "auto", w: 100, h: 100, objectFit: "cover", rounded: "full" })}
                    onUpload={onChangeIcon}
                    onClick={e => e.stopPropagation()}
                />
                {/* ランダムに画像を設置するボタン */}
            </div>
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
