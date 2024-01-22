import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { LikeArtImage } from "./LikeArtImage"
import { getArtAppealsByUser } from "@/art/appeal/getByUser"
import { UserId } from "@/user/type"
import { Flex } from "@mantine/core"
import Image from "next/image";

interface LikeArtListProps {
    userId: UserId
}
export const LikeArtList: FC<LikeArtListProps> = async ({ userId }) => {
    const arts = await getArtAppealsByUser(userId)
    return (

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
            {arts.length === 0 &&
                <Flex p={1} justify={"space-evenly"}>
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <p >
                            アピール作品がまだ無いようです....
                        </p>

                    </center>
                </Flex>
            }

        </Carousel>

    )
}
