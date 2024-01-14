import { credentials } from "@/gcp/credentials";
import { randomId } from "@/util/random";
import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";
import { ReadableWebToNodeStream } from "readable-web-to-node-stream";
import { Readable, Writable } from "stream";
import { pipeline } from "stream/promises";

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
    const storage = new Storage({
        credentials,
    })
    const bucket = storage.bucket(process.env.GCP_GCS_USER_CONTENT_BUCKET as string)
    const file = bucket.file(randomId())
    const publicUrl = file.publicUrl()

    const readable: Readable = new ReadableWebToNodeStream(req.body)
    const writable: Writable = file.createWriteStream()
    await pipeline(readable, writable)

    return NextResponse.json({
        publicUrl,
    })
}
