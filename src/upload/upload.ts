import { randomId } from "@/util/random";
import { Storage } from "@google-cloud/storage";
import { ReadableWebToNodeStream } from "readable-web-to-node-stream";
import { Readable, Writable } from "stream";
import { pipeline } from "stream/promises";

export const upload = async (stream: ReadableStream, options: {
    bucket?: string,
    dest?: string,
} = {}) => {
    const storage = new Storage()
    const bucket = storage.bucket(options.bucket ?? process.env.GCP_GCS_USER_CONTENT_BUCKET as string)
    const file = bucket.file(options.dest ?? randomId())
    const publicUrl = file.publicUrl()

    const readable: Readable = new ReadableWebToNodeStream(stream)
    const writable: Writable = file.createWriteStream()
    await pipeline(readable, writable)
    return publicUrl
}
