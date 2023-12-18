import { getArtSuggestions } from "@/art/getSuggestions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const searchParams = new URL(req.url).searchParams
    const q = searchParams.get("q")
    if (!q) {
        return NextResponse.json(await getArtSuggestions(""))
    }
    const suggestions = await getArtSuggestions(q)
    return NextResponse.json(suggestions)
}

