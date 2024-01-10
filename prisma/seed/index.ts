import { seedArt } from "./art"
import { seedArtAppeal } from "./artAppeal"
import { prisma } from "./client"
import { seedUser } from "./user"
import { seedWatchingArt } from "./watchingArt"

const main = async () => {
    try {
        console.log("🔵 seed script start .")
        await seedArt()
        await seedUser()
        await Promise.all([
            seedArtAppeal(),
            seedWatchingArt(),
        ])
        console.log("✅ seed script finished ! check on prisma studio (`yarn prisma studio`)")
    } catch (e) {
        console.log("❌ seed script failure ...")
        throw e
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
