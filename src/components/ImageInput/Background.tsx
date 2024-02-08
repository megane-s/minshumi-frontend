import { selectFile, uploadFile } from "@/file-upload/client"
import { useMutate } from "@/util/client/useMutate"
import Image from "next/image"
import { css, cx } from "styled-system/css"
import { Loader } from "../Loader"
import { ImageInputProps } from "./type"
import { Indicator, Menu } from "@mantine/core"
import { MdOutlineEdit } from "react-icons/md"
import { RiSparkling2Line } from "react-icons/ri"
import { IoMdCloudUpload } from "react-icons/io";
import { notImplementError } from "@/util/notImplement"
import { RandomImageResponseBodySchema } from "@/app/api/art/image/random/type"

export const BackgroundImageInput = ({
    className,
    imageProps: {
        className: imageClassName,
        ...imageProps
    } = {},
    src,
    alt,
    onUpload,
    withIndicator = false,
    autoGenerateArtImage,
    ...props
}: ImageInputProps) => {

    const handleUploadImage = async () => {
        const file = await selectFile({ accept: "image/*" })
        await uploadImage.mutate(file)
    }
    const uploadImage = useMutate(async (file: File) => {
        const { publicUrl } = await uploadFile(file)
        onUpload(publicUrl)
    }, {
        loading: { toast: "アップロード中" },
        onSuccess: { toast: "アップロードしました" },
        onError: { toast: "アップロードできませんでした" },
    })

    const autoGenerate = useMutate(async () => {
        if (!autoGenerateArtImage) {
            throw notImplementError("タイトルが不正です")
        }
        const { publicUrl } = await fetch("/api/art/image/random", {
            method: "POST",
            body: JSON.stringify({
                title: autoGenerateArtImage.title,
            }),
        }).then(r => r.json()).then(r => RandomImageResponseBodySchema.parse(r))
        onUpload(publicUrl)
    }, {
        loading: { toast: "自動生成中" },
        onSuccess: { toast: autoGenerateArtImage && `${autoGenerateArtImage.title}の画像を自動生成しました` || "" },
        onError: { toast: autoGenerateArtImage && `エラー` || "" },
    })

    let content = (
        <div
            className={cx(css({ position: "relative", overflow: "hidden", rounded: "md" }), className)}
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
        content = (
            <Indicator
                inline
                label={<MdOutlineEdit />}
                size={24}
                position="bottom-end"
                h="fit-content"
                classNames={{ indicator: css({ right: "0px !important", bottom: "0px !important", cursor: "pointer" }) }}
            >
                {content}
            </Indicator>
        )
    }
    return <>
        <Menu shadow="md" classNames={{ dropdown: css({ bg: "background.2 !important" }) }}>
            <Menu.Target>
                {content}
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IoMdCloudUpload />}
                    onClick={() => void handleUploadImage()}
                >
                    アップロード
                </Menu.Item>
                {autoGenerateArtImage &&
                    <Menu.Item
                        leftSection={<RiSparkling2Line />}
                        onClick={() => void autoGenerate.mutate(null)}
                    >
                        タイトルから自動生成
                    </Menu.Item>
                }
            </Menu.Dropdown>
        </Menu>
    </>
}
