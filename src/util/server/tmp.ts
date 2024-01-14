import * as fs from "fs"
import * as fsPromise from "fs/promises"
import { join } from "path"

const tmpDir = "./tmp"

export const createIfNotExistsTmpDir = async (label: string) => {
    const dirPath = join(tmpDir, label)
    if (fs.existsSync(dirPath)) {
        return dirPath
    }
    await fsPromise.mkdir(dirPath, { recursive: true })
    return dirPath
}
