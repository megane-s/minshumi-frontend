"use client"

import { WatchingArtImage } from "@/app/user/[user_id]/WatchingArtList/WatchingArtImage"
import { Art } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import LinkButton from "@/components/LinkButton"
import { AddIcon } from "@/components/icon/AddIcon"
import { FC } from "react"
import { flex } from "styled-system/patterns"

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
                )}
                <CarouselSlide className={flex({ align: "center" })}>
                    <LinkButton variant="outline" leftSection={<AddIcon />} href="/settings/watching-arts/new">
                        追加
                    </LinkButton>
                </CarouselSlide>
                {/* TODO 0件表示 */}
            </Carousel>
        </div>
    )
}

export default WatchingArtsSettingForm
