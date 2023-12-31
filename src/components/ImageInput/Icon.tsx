import { selectFile, uploadFile } from "@/file-upload/client"
import { useMutate } from "@/util/client/useMutate"
import Image from "next/image"
import { MouseEvent } from "react"
import { css, cx } from "styled-system/css"
import { Loader } from "../Loader"
import { ImageInputProps } from "./type"

export const IconImageInput = ({
    className,
    onClick,
    imageProps: {
        className: imageClassName,
        ...imageProps
    } = {},
    src,
    alt,
    onUpload,
    ...props
}: ImageInputProps) => {
    const handleUploadImage = async (e: MouseEvent<HTMLImageElement>) => {
        const file = await selectFile({ accept: "image/*" })
        await uploadImage.mutate(file)
        onClick?.(e)
    }
    const uploadImage = useMutate(async (file: File) => {
        const { publicUrl } = await uploadFile(file)
        onUpload(publicUrl)
    }, {
        loading: { toast: "アップロード中" },
        onSuccess: { toast: "アップロードしました" },
        onError: { toast: "アップロードできませんでした" },
    })
    return (
        <div className={cx(css({ position: "relative", overflow: "hidden", rounded: "md" }), className)} onClick={handleUploadImage} {...props}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                src={src}
                alt={alt}
                className={cx(css({ w: "full", h: "full", objectFit: "cover" }), imageClassName)}
                {...imageProps}
            />
            <div className={css({ position: "absolute", inset: 0, w: "full", h: "full", bg: "black", opacity: 0, transition: "opacity 0.2s", _hover: { opacity: 0.5, cursor: "pointer" } })} />
            {uploadImage.isLoading &&
                <Loader
                    className={css({ position: "absolute", right: 2, bottom: 2 })}
                />
            }
        </div>
    )
}
