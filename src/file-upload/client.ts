import { useMutate } from "@/util/client/useMutate"
import { useState } from "react"
import { z } from "zod"

const uploadServerUrl = "/api/upload"
const UploadResponseSchema = z.object({
    publicUrl: z.string(),
})

export const uploadFile = async (file: File | "select" = "select") => {
    if (file === "select") file = await selectFile()
    const res = await fetch(uploadServerUrl, {
        method: "PUT",
        body: file,
    })
        .then(r => r.json())
        .then(data => UploadResponseSchema.parse(data))
    return res
}

export const selectFile = ({ accept = "*/*", }: Partial<{ accept: string }> = {}): Promise<File> => new Promise((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.multiple = false
    input.addEventListener("change", () => {
        const file = input.files?.item(0)
        if (file) {
            resolve(file)
        } else {
            reject()
        }
    })
    input.addEventListener("cancel", () => {
        reject()
    })
    input.click()
})

export const useFileUpload = (selectParams: Parameters<typeof selectFile>[0] = {}) => {
    const [url, setUrl] = useState<string | null>(null)
    const upload = useMutate(async () => {
        const file = await selectFile(selectParams)
        const { publicUrl } = await uploadFile(file)
        setUrl(publicUrl)
        return publicUrl
    }, {})
    return {
        upload: () => upload.mutate("select"),
        url,
        ...upload,
    }
}
