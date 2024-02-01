import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { LikeArtImage } from "./LikeArtImage"
import { getArtAppealsByUser } from "@/art/appeal/getByUser"
import { UserId } from "@/user/type"
import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle"
import { flex } from "styled-system/patterns"

interface LikeArtListProps {
    userId: UserId
}
export const LikeArtList: FC<LikeArtListProps> = async ({ userId }) => {
    const arts = await getArtAppealsByUser(userId)
    return (
        <div>
            <Carousel
                slideSize="fit-content"
                slideGap="sm"
                align={arts.length === 0 ? "center" : "start"}
                controlsOffset="0"
            >

                {arts.map(art =>
                    <CarouselSlide key={art.artId}>
                        <LikeArtImage
                            art={art}
                        />
                    </CarouselSlide>
                )}

                {arts.length === 0 &&
                    <CarouselSlide className={flex({ flexDir: "column", w: "full", p: 1, justify: "space-evenly", align: "center", my: "md" })}>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <SectionTitle my="md">
                            アピール作品が無いようです....
                        </SectionTitle>
                    </CarouselSlide>
                }

            </Carousel>
        </div>
    )
}
