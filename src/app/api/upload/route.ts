import { getSession } from "@/auth/server/auth";
import { credentials } from "@/gcp/credentials";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export const GET = async () => {
    const session = await getSession()
    console.log(session)

    const storage = new Storage({
        credentials,
    })
    const bucket = storage.bucket(process.env.GCP_GCS_USER_CONTENT_BUCKET as string)
    const file = bucket.file("test-content")
    const publicUrl = file.publicUrl()
    const [uploadUrl] = await file.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 5 * 60 * 1000,
    })
    console.log({ uploadUrl, publicUrl });

    return NextResponse.json({
        uploadUrl,
        publicUrl,
    })
}
