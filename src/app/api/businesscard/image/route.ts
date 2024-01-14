import { buildImageUrlParamsFromBusinessCard } from "@/businessCard/buildImageUrlParams";
import { getBusinessCardById } from "@/businessCard/getById";
import { getBusinessCardInterestTags } from "@/businessCard/getInterestTags";
import { getBusinessCardLikeArts } from "@/businessCard/getLikeArts";
import { notImplementError } from "@/util/notImplement";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
    const businessCardId = req.nextUrl.searchParams.get("businesscard_id")
    if (!businessCardId) {
        return NextResponse.json({
            msg: "invalid search params"
        }, { status: 400 })
    }
    const [businessCard, interestTags, likeArts] = await Promise.all([
        getBusinessCardById(businessCardId),
        getBusinessCardInterestTags(businessCardId),
        getBusinessCardLikeArts(businessCardId),
    ])
    if (!businessCard) {
        return NextResponse.json({
            msg: "not found",
            businessCard: businessCard ?? null,
            interestTags: interestTags ?? null,
            likeArts: likeArts ?? null,
        }, { status: 404 })
    }
    const params = buildImageUrlParamsFromBusinessCard(businessCard, interestTags, likeArts)

    const imageServerBaseUrl = z.string({ invalid_type_error: "invalid " }).parse(process.env.BUSINESS_CARD_IMAGE_SERVER)
    const imageServerUrl = `${imageServerBaseUrl}?${new URLSearchParams(params).toString()}`
    const image = await fetch(imageServerUrl)
    const contentType = image.headers.get("Content-Type")
    if (!contentType?.startsWith("image/")) {
        console.error(" * invalid businesscard image response")
        console.error(" * response", await image.text())
        console.error(" * request url", imageServerUrl)
        throw notImplementError(`不正なcontent-type:${contentType}`)
    }
    return new NextResponse(image.body, { headers: { "Content-Type": contentType } })
}
