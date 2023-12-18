import { getArt } from "@/art/get";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { artId: string } },
) => {
    if (!params.artId) {
        return NextResponse.json({
            message: "invalid artId",
        })
    }
    const art = await getArt(params.artId)
    return NextResponse.json(art)
}
