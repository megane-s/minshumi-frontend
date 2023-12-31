import { notImplementError } from "@/util/notImplement";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
    const imageServerBaseUrl = z.string({ invalid_type_error: "invalid " }).parse(process.env.BUSINESS_CARD_IMAGE_SERVER)
    const imageServerUrl = `${imageServerBaseUrl}?${req.nextUrl.searchParams.toString()}`
    const image = await fetch(imageServerUrl)
    const contentType = image.headers.get("Content-Type")
    if (!contentType?.startsWith("image/")) throw notImplementError(`不正なcontent-type:${contentType}`)
    return new NextResponse(image.body, { headers: { "Content-Type": contentType } })
}
