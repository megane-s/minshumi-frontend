import { upload } from "@/upload/upload";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

const allowedContentTypeMap = {
    "image/png": {
        type: "png",
    },
    "image/jpeg": {
        type: "jpeg",
    },
    "image/jpg": {
        type: "jpeg",
    },
    "image/gif": {
        type: "gif",
    },
    "image/webp": {
        type: "webp",
    },
} as const

export const PUT = async (req: NextRequest) => {
    if (!req.body) {
        return NextResponse.json({
            msg: `invalid body`,
        }, { status: 400 })
    }
    const contentType = req.headers.get("Content-Type")
    if (!contentType || !(contentType in allowedContentTypeMap)) {
        return NextResponse.json({
            msg: `invalid content type :${contentType}`,
        }, { status: 400 })
    }

    const publicUrl = await upload(req.body)

    return NextResponse.json({
        publicUrl,
    })
}
