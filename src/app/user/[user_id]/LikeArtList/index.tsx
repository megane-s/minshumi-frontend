import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { LikeArtImage } from "./LikeArtImage"
import { getArtAppealsByUser } from "@/art/appeal/getByUser"
import { UserId } from "@/user/type"
import { Flex } from "@mantine/core"
import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle"

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
                align="start"
                controlsOffset="0"
            >

                {arts.map(art =>
                    <CarouselSlide key={art.artId}>
                        <LikeArtImage
                            art={art}
                        />
                    </CarouselSlide>
                )}


            </Carousel>
            {arts.length === 0 &&
                <Flex p={1} justify={"space-evenly"} my="md">
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <SectionTitle my="md">
                            アピール作品が無いようです....
                        </SectionTitle>

                    </center>
                </Flex>
            }
        </div>
    )
}
