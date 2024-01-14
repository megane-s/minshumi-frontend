import { selectFile, uploadFile } from "@/file-upload/client"
import { useMutate } from "@/util/client/useMutate"
import Image from "next/image"
import { css, cx } from "styled-system/css"
import { Loader } from "../Loader"
import { ImageInputProps } from "./type"
import { Indicator } from "@mantine/core"
import { MdOutlineEdit } from "react-icons/md"

export const BackgroundImageInput = ({
    className,
    onClick,
    imageProps: {
        className: imageClassName,
        ...imageProps
    } = {},
    src,
    alt,
    onUpload,
    withIndicator = false,
    ...props
}: ImageInputProps) => {
    const handleUploadImage = async () => {
        const file = await selectFile({ accept: "image/*" })
        await uploadImage.mutate(file)
        onClick?.()
    }
    const uploadImage = useMutate(async (file: File) => {
        const { publicUrl } = await uploadFile(file)
        onUpload(publicUrl)
    }, {
        loading: { toast: "アップロード中" },
        onSuccess: { toast: "アップロードしました" },
        onError: { toast: "アップロードできませんでした" },
    })
    const content = (
        <div
            className={cx(css({ position: "relative", overflow: "hidden", rounded: "md" }), className)}
            onClick={e => {
                if (withIndicator) {
                    e.stopPropagation()
                }
                void handleUploadImage()
            }}
            {...props}
        >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                src={src}
                alt={alt}
                className={cx(css({ w: "full", h: "full", objectFit: "cover" }), imageClassName)}
                unoptimized
                {...imageProps}
            />
            <div className={css({ position: "absolute", inset: 0, w: "full", h: "full", bg: "black", opacity: 0.3, transition: "opacity 0.2s", _hover: { opacity: 0.5, cursor: "pointer" } })} />
            {uploadImage.isLoading &&
                <Loader
                    className={css({ position: "absolute", right: 2, bottom: 2 })}
                />
            }
        </div>
    )
    if (withIndicator) {
        return (
            <Indicator
                inline
                label={<MdOutlineEdit />}
                size={24}
                position="bottom-end"
                h="fit-content"
                classNames={{ indicator: css({ right: "0px !important", bottom: "0px !important", cursor: "pointer" }) }}
                onClick={handleUploadImage}
            >
                {content}
            </Indicator>
        )
    }
    return content
}
