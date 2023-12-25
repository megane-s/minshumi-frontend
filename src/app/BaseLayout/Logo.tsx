import Image, { ImageProps } from "next/image"
import Link from "next/link"
import { FC } from "react"
import LogoImage from "@/../public/placeholder/150x60_red.png"
import { css, cx } from "styled-system/css"

const logoSizes = {
    sm: { width: 100, height: 40 },
    md: { width: 150, height: 60 },
    lg: { width: 200, height: 80 },
} as const

export type LogoSize = keyof typeof logoSizes

interface LogoProps {
    size?: LogoSize
    imageProps?: Partial<ImageProps>
}
const Logo: FC<LogoProps> = ({ size = "md", imageProps = {} }) => {
    return (
        <Link href="/" className={css({})}>

            <Image
                {...imageProps}
                className={cx(css({ display: "block" }), imageProps.className)}
                src={LogoImage}
                alt="みんしゅみ"
                {...logoSizes[size]}
            />
        </Link>
    )
}

export default Logo
