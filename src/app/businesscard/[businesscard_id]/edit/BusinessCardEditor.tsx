"use client"

import FullWidth from "@/app/BaseLayout/FullWidth"
import { BusinessCard, BusinessCardId } from "@/businessCard/type"
import { Alert } from "@/components/Alert"
import { TextInput } from "@/components/TextInput"
import { InfoIcon } from "@/components/icon/Info"
import { UserRank } from "@/user/type"
import { InputWrapper, Select } from "@mantine/core"
import { FC, useState } from "react"
import { css } from "styled-system/css"
import { center, container, flex } from "styled-system/patterns"
import { colors } from "./colors"
import { BusinessCardPreview } from "./BusinessCardPreview"
import { InputImages } from "./InputImages"
import TagSelect from "@/components/TagSelect"
import { Art, ArtTag } from "@/art/type"
import { InputArtTitle } from "./InputArtTitle"
import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { handleSaveBusinessCard } from "./actions"
import { useRouter } from "next/navigation"
import { defaultBusinessCard } from "@/businessCard/defaults"
import { User } from "next-auth"


interface BusinessCardEditorProps {
    user: User | null
    ranks: UserRank[] | null
    tags: ArtTag[]
    likeArts: Art["title"][]
    defaultValues: Partial<(BusinessCard) & { tags: ArtTag[], arts: Art["title"][] }>
    businessCardId: BusinessCardId | null // nullの場合は保存できない
}
export const BusinessCardEditor: FC<BusinessCardEditorProps> = ({ defaultValues, user, ranks, tags, businessCardId }) => {
    const isInstant = businessCardId === null
    const [name, setName] = useState(defaultValues.name ?? user?.name ?? "")

    const [icon, setIcon] = useState(defaultValues.imageUrl ?? defaultBusinessCard.imageUrl)

    const [rank, setRank] = useState<UserRank | null>(defaultValues.rank ?? defaultBusinessCard.rank)

    const [interestTags, setInterestTags] = useState(defaultValues.tags ?? [])

    const [arts, setArts] = useState(defaultValues.arts ?? [])
    const isValidArts = arts.length === 3

    const [backgroundImage, setBackgroundImage] = useState(defaultValues.backgroundImageUrl ?? defaultBusinessCard.backgroundImageUrl)

    const [themeColor, setThemeColor] = useState<string | null>(defaultValues.themeColor ?? defaultBusinessCard.themeColor)
    const isValidThemeColor = themeColor !== null

    const isValid = isValidArts && isValidThemeColor

    const save = useMutate(async () => {
        if (!isValid) throw new Error(`入力値が不正です`)
        if (isInstant) throw new Error(`ログインしていない状態での名刺は保存できません。`)
        await handleSaveBusinessCard(businessCardId, {
            name,
            imageUrl: icon,
            rank,
            interestTags,
            likeArts: arts,
            backgroundImageUrl: backgroundImage,
            themeColor,
        })
    }, {
        loading: { toast: "保存しています..." },
        onSuccess: { toast: "保存しました" },
        onError: { toast: "保存できませんでした" },
    })

    const router = useRouter()
    const gotoSettings = useMutate(async () => {
        if (!isValid) throw new Error(`入力値が不正です`)
        if (isInstant) throw new Error(`ログインしていない状態での名刺は公開設定はできません。`)
        await handleSaveBusinessCard(businessCardId, {
            name,
            imageUrl: icon,
            rank,
            interestTags,
            likeArts: arts,
            backgroundImageUrl: backgroundImage,
            themeColor,
        })
        router.push(`/businesscard/${businessCardId}/settings`)
    }, {
        loading: { toast: "保存しています..." },
        onSuccess: { toast: "保存しました" },
        onError: { toast: "保存できませんでした" },
    })

    return (
        <FullWidth className={flex({
            base: { flexDir: "column", alignItems: "stretch" },
            md: { flexDir: "row", justifyContent: "center" },
            height: "100%",
        })}>
            <div className={center({ flexGrow: 1, p: "xl" })}>
                {isValid
                    ? <BusinessCardPreview
                        name={name}
                        icon={icon}
                        rank={rank}
                        interestTags={interestTags}
                        arts={arts}
                        backgroundImage={backgroundImage}
                        themeColor={themeColor}
                    />
                    : <div className={center({ w: "full", h: "full" })}>
                        <Alert
                            variant="light"
                            color="error"
                            icon={<InfoIcon />}
                            title="入力に不備があります"
                        />
                    </div>
                }
            </div>

            <div className={css({
                base: {
                    w: "100%",
                },
                md: {
                    w: "300px",
                    h: "100dvh",
                    overflowY: "auto",
                },
                p: "sm",
                bg: "background.2",
                flexShrink: 0,
            })}>
                <div className={container({ px: "" })}>
                    <InputImages
                        backgroundImage={backgroundImage}
                        onChangeBackgroundImage={setBackgroundImage}
                        icon={icon}
                        onChangeIcon={setIcon}
                    />
                </div>
                <div>
                    <TextInput
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="名前"
                        className={css({ my: "md" })}
                        maxLength={15}
                    />
                </div>
                <div>
                    {ranks &&
                        <Select
                            label="称号"
                            data={[{ label: "称号なし", value: "" }, ...ranks]}
                            value={rank}
                            onChange={rank => setRank(rank ?? "")}
                            className={css({ my: "md" })}
                        />
                    }
                </div>
                <div>
                    <Select
                        label="テーマカラー"
                        data={Object.keys(colors).map((color) => ({
                            value: colors[color as keyof typeof colors].id,
                            label: colors[color as keyof typeof colors].label,
                        }))}
                        value={themeColor}
                        onChange={color => setThemeColor(color)}
                        placeholder="テーマカラーを選択してください"
                        className={css({ my: "md" })}
                    />
                </div>
                <div>
                    <InputWrapper
                        label="興味のあるタグ"
                    >
                        <TagSelect
                            tags={tags}
                            selectedTags={interestTags}
                            onChangeSelected={setInterestTags}
                        />
                    </InputWrapper>
                </div>
                <div>
                    <InputWrapper
                        label="好きな作品"
                        className={css({ my: "md" })}
                    >
                        {Array(3).fill("").map((_, i) =>
                            <InputArtTitle
                                key={i}
                                className={css({ my: "xs" })}
                                title={arts[i] ?? ""}
                                onChangeTitle={title => {
                                    setArts(p => {
                                        const newArts = [...p]
                                        newArts[i] = title
                                        return newArts
                                    })
                                }}
                            />
                        )}
                    </InputWrapper>
                </div>
            </div>

            {!isInstant &&
                <div className={flex({
                    position: "fixed !important", bottom: 2, right: 4, zIndex: 1,
                    gap: "sm",
                    base: { flexDir: "column", alignItems: "flex-end" },
                    sm: { flexDir: "row" },
                })}>
                    <MutateButton
                        mutation={save}
                        className={css({ shadow: { base: "md", _active: "xs" }, transition: "box-shadow 0.3s" })}
                        size="md"
                        variant="default"
                    >
                        保存
                    </MutateButton>
                    <MutateButton
                        className={css({ shadow: { base: "md", _active: "xs" }, transition: "box-shadow 0.3s" })}
                        size="md"
                        variant="filled"
                        mutation={gotoSettings}
                    >
                        公開設定
                    </MutateButton>
                </div>
            }

        </FullWidth >
    )
}
