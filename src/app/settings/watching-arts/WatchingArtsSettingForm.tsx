"use client"

import { WatchingArtImage } from "@/app/user/[user_id]/WatchingArtList/WatchingArtImage"
import { Art } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import LinkButton from "@/components/LinkButton"
import { AddIcon } from "@/components/icon/AddIcon"
import { Flex } from "@mantine/core"
import { FC } from "react"
import Image from "next/image"
import { flex } from "styled-system/patterns"
import { SectionTitle } from "@/components/SectionTitle"

interface WatchingArtsSettingFormProps {
    watchingArts: Art[]
}
const WatchingArtsSettingForm: FC<WatchingArtsSettingFormProps> = ({ watchingArts }) => {
    return (
        <div>
            <Carousel
                slideSize="fit-content"
                slideGap="sm"
                align="start"
                controlsOffset="0"
            >
                {watchingArts.map(art =>
                    <CarouselSlide key={art.artId}>
                        <WatchingArtImage
                            art={art}
                            editable

                        />
                    </CarouselSlide>

                )

                }




            </Carousel>

            {watchingArts.length === 0 &&
                <Flex p={1} justify={"center"} my="md">
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <SectionTitle my="md">
                            今見ている作品が無いようです....
                        </SectionTitle>

                    </center>
                </Flex>
            }
            <div className={flex({ w: "full", justify: "flex-end", my: "sm" })}>
                <LinkButton variant="outline" leftSection={<AddIcon />} href={`/settings/watching-arts/new`}>
                    作品を追加
                </LinkButton>
            </div>
        </div>
    )
}

export default WatchingArtsSettingForm
