"use client"

import { ArtTag } from "@/art/type"
import { useImageLoading } from "@/util/client/useImageLoading"
import Image from "next/image"
import { FC, useState } from "react"
import { useDebounce } from "react-use"
import { css, cx } from "styled-system/css"
import { colors } from "./colors"
import { Loader } from "@/components/Loader"

interface BusinessCardPreviewProps {
    name: string,
    icon: string,
    rank: string | null,
    interestTags: ArtTag[],
    arts: string[],
    backgroundImage: string,
    themeColor: string,
    className?: string
}
export const BusinessCardPreview: FC<BusinessCardPreviewProps> = (props) => {
    const previewImageUrl = usePreviewImageUrl(props)
    const previewImage = useImageLoading({ src: previewImageUrl })
    return (
        <div
            className={cx(
                css({
                    position: "relative",
                    w: "min(600px, 100%)",
                    aspectRatio: "1200 / 675",
                    borderRadius: "xl",
                    overflow: "hidden",
                    base: {
                        boxShadow: previewImage.isLoading
                            ? "0px 0px 40px rgba(0, 0, 0, 0.25)"
                            : "0px 10px 30px rgba(0, 0, 0, 0.25)",
                    },
                    md: {
                        borderTop: "solid rgba(255, 255, 255, 0.02)",
                        borderLeft: "solid rgba(255, 255, 255, 0.02)",
                        boxShadow: previewImage.isLoading
                            ? "5px 5px 10px rgba(0, 0, 0, 0.25)"
                            : "20px 20px 30px rgba(0, 0, 0, 0.25)",
                    },
                    transform: previewImage.isLoading ? "scale(0.95)" : "scale(1.0)",
                    transition: "all 0.3s",
                }),
                props.className,
            )}
        >
            <Image
                {...previewImage.props}
                alt={props.name}
                width={1200 / 2}
                height={675 / 2}
                className={css({
                    w: "fit-content",
                    maxW: "100%",
                    objectFit: "contain",
                    opacity: previewImage.isLoading ? 0.25 : 1.0,
                    transition: "opacity 0.3s",
                })}
                placeholder="blur"
                blurDataURL={colors[props.themeColor as keyof typeof colors]?.blurDataUrl}
                unoptimized
                priority
            />
            {previewImage.isLoading &&
                <Loader
                    className={css({ position: "absolute", inset: 0, margin: "auto" })}
                />
            }
        </div>
    )
}



export const usePreviewImageUrl = (input: BusinessCardPreviewProps) => {
    const params = input && new URLSearchParams({
        type: "1",
        username: input.name,
        icon: input.icon,
        interest_tags: input.interestTags.join(","),
        arts: input.arts.join(","),
        background_image: input.backgroundImage,
        theme_color: input.themeColor,
    })
    if (input.rank) params.append("rank", input.rank)

    const previewImageUrl = `/api/businesscard/image?${params.toString()}`
    const [debouncedPreviewImageUrl, setDebouncedPreviewImageUrl] = useState(previewImageUrl)
    useDebounce(() => {
        setDebouncedPreviewImageUrl(previewImageUrl)
    }, 250, [previewImageUrl])

    return debouncedPreviewImageUrl
}

