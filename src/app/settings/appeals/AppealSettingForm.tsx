import { LikeArtImage } from "@/app/user/[user_id]/LikeArtList/LikeArtImage"
import { ArtAppeal } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import Image from "next/image"
import { Flex } from "@mantine/core"
import { SectionTitle } from "@/components/SectionTitle"
import LinkButton from "@/components/LinkButton"
import { AddIcon } from "@/components/icon/AddIcon"
import { flex } from "styled-system/patterns"

interface AppealSettingFormProps {
    appeals: ArtAppeal[]
}
const AppealSettingForm: FC<AppealSettingFormProps> = ({ appeals }) => {
    return (
        <div>
            <Carousel
                slideSize="fit-content"
                slideGap="sm"
                align="start"
                controlsOffset="0"
            >
                {appeals.map(art =>
                    <CarouselSlide key={art.artId}>
                        <LikeArtImage
                            art={art}
                            editable
                        />
                    </CarouselSlide>
                )}

            </Carousel>

            {appeals.length === 0 &&
                <Flex p={1} justify={"center"} my="md">
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <SectionTitle my="md">
                            アピール作品がまだ無いようです....
                        </SectionTitle>

                    </center>
                </Flex>
            }
            <div className={flex({ w: "full", justify: "flex-end", my: "sm" })}>
                <LinkButton variant="outline" leftSection={<AddIcon />} href={`/AppealSelect`}>
                    アピール作品を探す
                </LinkButton>
            </div>
        </div>
    )
}

export default AppealSettingForm
