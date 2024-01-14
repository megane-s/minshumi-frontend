import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { ArtId } from "../type"

export const deleteArtAppeal = async (userId: UserId, artId: ArtId) => {
    await prisma.artAppeal.delete({
        where: { userId_artId: { userId, artId } },
    })
}
