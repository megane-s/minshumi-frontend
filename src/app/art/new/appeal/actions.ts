"use server"

import { getNewArtSession } from "@/art/newArtSession/cookies"
import { sleep } from "@/util/sleep"

export const handleCreateArt = async () => {
    await Promise.all([
        async () => {
            const newArtSession = await getNewArtSession()
        },
        sleep(3000),
    ])
}
