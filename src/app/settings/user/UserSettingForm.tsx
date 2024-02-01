"use client"

import { BusinessCard, BusinessCardId } from "@/businessCard/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { ImageInput } from "@/components/ImageInput"
import { TextInput } from "@/components/TextInput"
import { User } from "next-auth"
import { InputWrapper, Space, Text } from "@mantine/core"
import { FC, useState } from "react"
import { css } from "styled-system/css"
import { center, flex } from "styled-system/patterns"
import Image from "next/image"
import { AddIcon } from "@/components/icon/AddIcon"
import LinkButton from "@/components/LinkButton"
import { useMutate } from "@/util/client/useMutate"
import MutateButton from "@/components/MutateButton"
import { handleSaveUserSettings } from "./actions"
import { CheckIcon } from "@/components/icon/Check"
import { SectionTitle } from "@/components/SectionTitle"
import { EditIcon } from "@/components/icon/Edit"

const imageSize = 80
interface UserSettingFormProps {
    user: User
    defaultPinnedBusinessCardId: BusinessCardId | null
    businessCards: BusinessCard[]
}
const UserSettingForm: FC<UserSettingFormProps> = ({ user, businessCards, defaultPinnedBusinessCardId }) => {
    const [name, setName] = useState(user.name ?? "")
    const [image, setImage] = useState(user.image ?? "")

    const [pinnedBusinessCardId, setPinnedBusinessCardId] = useState(defaultPinnedBusinessCardId)

    const save = useMutate(async () => {
        await handleSaveUserSettings({ name, image, pinnedBusinessCardId })
    }, {
        loading: { toast: "保存中" },
        onSuccess: { toast: "保存しました" },
        onError: { toast: "エラーが発生しました..." },
    })
    return (
        <div>
            <div className={flex({ flexDir: { base: "column", sm: "row" }, w: "full", gap: "md" })}>
                <div>
                    <ImageInput
                        className={css({ w: `${imageSize}px`, h: `${imageSize}px`, overflow: "hidden", borderRadius: "9999px" })}
                        src={image}
                        alt={name + "の画像"}
                        onUpload={(publicUrl) => setImage(publicUrl)}
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
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>

            <InputWrapper
                label={<>
                    <span>名刺</span>
                    <LinkButton leftSection={<AddIcon />} href={`/businesscard/new`} variant="outline" >
                        作成
                    </LinkButton>
                </>}
                className={css({ my: "md" })}
                classNames={{
                    label: flex({ display: "flex !important", justify: "space-between", w: "full", align: "center", mb: "xs" }),
                }}
            >
                <Space h="1rem" />
                <Carousel
                    slideSize="fit-content"
                    align={businessCards.length === 0 ? "center" : "start"}
                    slideGap="lg"
                >
                    {businessCards.map(businessCard =>
                        <CarouselSlide key={businessCard.businessCardId}>
                            <Image
                                src={`/api/businesscard/image?businesscard_id=${businessCard.businessCardId}`}
                                alt={businessCard.name}
                                width={1200 / 3}
                                height={675 / 3}
                                className={css(pinnedBusinessCardId === businessCard.businessCardId
                                    ? { borderColor: "primary.0" }
                                    : { borderColor: "transparent" },
                                    {
                                        borderRadius: "lg",
                                        borderStyle: "solid",
                                        borderWidth: "4px",
                                        cursor: "pointer",
                                    },
                                )}
                                onClick={() => setPinnedBusinessCardId(businessCard.businessCardId)}
                            />
                            {pinnedBusinessCardId === businessCard.businessCardId &&
                                <Text c="primary" className={flex({ my: "xs", gap: "xs", align: "center" })}>
                                    <CheckIcon />
                                    この名刺がプロフィールに表示されます
                                </Text>
                            }
                            <div className={flex({ w: "full", justify: "flex-end", my: "sm" })}>
                                <LinkButton leftSection={<EditIcon />} href={`/businesscard/${businessCard.businessCardId}/edit`}>
                                    名刺を編集
                                </LinkButton>
                            </div>
                        </CarouselSlide>
                    )}

                    {businessCards.length === 0 &&
                        <CarouselSlide className={flex({ flexDir: "column", w: "full", p: 1, justify: "center", align: "center" })}>
                            <Image
                                src="/cat.png"
                                alt='none'
                                width={200}
                                height={200}
                            />
                            <SectionTitle>
                                <div className={css({ my: "md" })}>
                                    名刺が無いようです....
                                </div>
                            </SectionTitle>
                            <LinkButton leftSection={<AddIcon />} href={`/businesscard/new`} variant="outline">
                                名刺を作成する
                            </LinkButton>

                            {businessCards.length > 0 &&
                                <div className={flex({ w: "full", justify: "flex-end", my: "sm" })}>
                                    <LinkButton leftSection={<AddIcon />} href={`/businesscard/new`}>
                                        名刺を作成
                                    </LinkButton>
                                </div>
                            }
                        </CarouselSlide>
                    }

                </Carousel>

            </InputWrapper >

            <div className={center({ w: "full", my: "xl" })}>
                <MutateButton mutation={save} variant="filled">
                    プロフィールを保存
                </MutateButton>
            </div>
        </div >
    )
}

export default UserSettingForm
