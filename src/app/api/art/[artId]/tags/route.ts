import { getTags } from "@/art/tag/getTags";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params: { artId } }: { params: { artId: string } },
) => {
    const tags = await getTags(artId)
    return NextResponse.json(tags)
}
