import { getArtsWithTag } from "@/art/tag/getArts";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params: { tag } }: { params: { tag: string } },
) => {
    const params = new URL(req.nextUrl).searchParams
    const offset = await Promise.resolve(params.get("offset"))
        .then(offset => offset === null ? 0 : parseInt(offset))
    const limit = await Promise.resolve(params.get("limit"))
        .then(limit => limit === null ? 0 : parseInt(limit))

    const arts = await getArtsWithTag(tag, { limit, offset })
    return NextResponse.json(arts)
}
