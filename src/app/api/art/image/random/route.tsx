import { upload } from "@/upload/upload";
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og"
import { notImplementError } from "@/util/notImplement";
import { getRandomArtImage } from "@/art/image";
import { RandomImageRequestSchema, RandomImageResponseBodySchema } from "./type";
import { extractColors } from "extract-colors"
import getPixels from "get-pixels"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json().then(r => RandomImageRequestSchema.safeParse(r))
    if (!body.success) {
        return NextResponse.json({
            msg: "invalid body",
            errors: body.error,
        })
    }

    const { title } = body.data
    const background = getRandomArtImage()
    const image = new ImageResponse(
        await ArtImage({
            title, background,
        }),
        {
            width: 1200,
            height: 675,
        },
    )
    if (!image.body) {
        throw notImplementError()
    }

    const publicUrl = await upload(image.body)
    return NextResponse.json(RandomImageResponseBodySchema.parse({
        publicUrl,
    }))
}


interface ArtImageProps {
    background: string
    title: string
}
const ArtImage = async ({
    background, title,
}: ArtImageProps) => {
    const { data, width, height } = await getPixelsAsync(background)
    const [{
        red: r,
        green: g,
        blue: b,
    }] = await extractColors({
        data, width, height,
    })
    const textColor = (255 - r + 255 - g + 255 - b) / 3
    return (
        <div style={{
            display: "flex",
            backgroundImage: `url(${background})`,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "180px",
            color: `rgb(${textColor}, ${textColor}, ${textColor})`,
            textAlign: "center",
            padding: "0.25em",
            wordBreak: "break-all",
        }}>
            {title.length >= 6 * 2 + 1
                ? title.substring(0, 6 * 2 - 1) + "..."
                : title
            }
        </div>
    )
}

const getPixelsAsync = (src: string) => new Promise<{
    data: number[]
    width: number
    height: number
}>((resolve, reject) => {
    getPixels(src, (err, pixels) => {
        if (!err) {
            const data = [...pixels.data]
            const width = Math.round(Math.sqrt(data.length / 4))
            resolve({
                data,
                width,
                height: width,
            })
        } else {
            reject(err)
        }
    })
})
