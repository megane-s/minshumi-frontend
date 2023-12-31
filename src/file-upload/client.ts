import { useMutate } from "@/util/client/useMutate"
import { useState } from "react"

const uploadServerUrl = "/api/upload"

export const uploadFile = async (file: File | "select" = "select") => {
    if (file === "select") file = await selectFile()
    const res = await fetch(uploadServerUrl).then(r => r.json()) as { uploadUrl: string, publicUrl: string }
    await fetch(res.uploadUrl, {
        method: "PUT",
        body: file,
    })
    return res
}

export const selectFile = ({ accept = "*/*", }: Partial<{ accept: string }> = {}): Promise<File> => new Promise((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.multiple = false
    input.addEventListener("change", () => {
        console.log(input.files)
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
        const res = await uploadFile(file)
        setUrl(res.publicUrl)
        return res
    }, {})
    return {
        upload: () => upload.mutate("select"),
        url,
        ...upload,
    }
}
