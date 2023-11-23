
const uploadServerUrl = "/api/upload"

export const uploadFile = async (file: File | "select" = "select") => {
    console.log(file)
    if (file === "select") file = await selectFile()
    console.log(file)
    const res = await fetch(uploadServerUrl).then(r => r.json()) as { uploadUrl: string, publicUrl: string }
    console.log("urls", res)
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
    input.click()
})
