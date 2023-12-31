import { ImageProps } from "next/image"
import { ComponentProps } from "react"

export interface ImageInputProps extends ComponentProps<"div"> {
    type: "background" | "icon"
    imageProps?: Omit<ImageProps, "src" | "alt">
    src: string
    alt: string
    onUpload: (src: string) => void
}
