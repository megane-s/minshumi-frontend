"use client"

import { BusinessCard } from "@/businessCard/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { ImageInput } from "@/components/ImageInput"
import { TextInput } from "@/components/TextInput"
import { User } from "next-auth"
import { InputWrapper } from "@mantine/core"
import { FC } from "react"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"
import Image from "next/image"
import { AddIcon } from "@/components/icon/AddIcon"
import LinkButton from "@/components/LinkButton"

const imageSize = 80
interface UserSettingFormProps {
    user: User
    businessCards: BusinessCard[]
}
const UserSettingForm: FC<UserSettingFormProps> = ({ user, businessCards }) => {
    return (
        <div>
            <div className={flex({ flexDir: { base: "column", sm: "row" }, w: "full", gap: "md" })}>
                <div>
                    <ImageInput
                        className={css({ w: `${imageSize}px`, h: `${imageSize}px`, overflow: "hidden", borderRadius: "9999px" })}
                        src="/placeholder/300x200_blue.png"
                        alt=""
                        onUpload={() => { }}
                        type="icon"
                        imageProps={{
                            className: css({ objectFit: "contain" }),
                            width: imageSize,
                            height: imageSize,
                        }}
                        withIndicator
                    />
                </div>
                <div className={css({ flexGrow: 1, flexShrink: 1 })}>
                    <TextInput
                        label="ユーザ名"
                        className={css({ maxW: { sm: "sm" } })}
                    />
                </div>
            </div>

            <InputWrapper
                label="名刺"
                className={css({ my: "md" })}
            >
                <Carousel slideSize="60%" align="start" slideGap="lg">
                    {/* TODO 0件表示 */}
                    {businessCards.map(businessCard =>
                        <CarouselSlide key={businessCard.businessCardId}>
                            <Image
                                src={`/api/businesscard/image?businesscard_id=${businessCard.businessCardId}`}
                                alt={businessCard.name}
                                width={1200 / 3}
                                height={675 / 3}
                                className={css({})}
                            />
                        </CarouselSlide>
                    )}
                </Carousel>
                <div className={flex({ w: "full", justify: "flex-end", my: "sm" })}>
                    <LinkButton leftSection={<AddIcon />} href={`/businesscard/new`}>
                        名刺を作成
                    </LinkButton>
                </div>
            </InputWrapper>
        </div>
    )
}

export default UserSettingForm
