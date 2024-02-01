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
import { center, flex } from "styled-system/patterns"
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
import { getDefaultBusinessCard } from "@/businessCard/defaults"
import { User } from "next-auth"
import LinkButton from "@/components/LinkButton"
import { buildImageUrlParams } from "@/businessCard/buildImageUrlParams"
import { businessCardTypes } from "../../new/SelectType"
import { BusinessCardDelete } from "./BusinessCardDelete"

const defaultBusinessCard = getDefaultBusinessCard()

interface BusinessCardEditorProps {
    user: User | null
    ranks: UserRank[] | null
    tags: ArtTag[]
    defaultValues: Partial<(BusinessCard) & { tags: ArtTag[], arts: Art["title"][] }>
    businessCardId: BusinessCardId | null // nullの場合は保存できない
}
export const BusinessCardEditor: FC<BusinessCardEditorProps> = ({ defaultValues, user, ranks, tags, businessCardId }) => {
    const isInstant = businessCardId === null

    const [type, setType] = useState<string | null>(defaultValues.type ?? "1")
    const isValidType = type && businessCardTypes.includes(type)

    // ビジネスカードのタイプが3の場合、肩書きとタグの選択を無効にする
    const isBusinessCard3 = type === "3";
    const [name, setName] = useState(defaultValues.name ?? user?.name ?? "名前")

    const [icon, setIcon] = useState(defaultValues.imageUrl ?? defaultBusinessCard.imageUrl)

    const [rank, setRank] = useState<UserRank | null>(defaultValues.rank ?? defaultBusinessCard.rank)

    const [interestTags, setInterestTags] = useState(defaultValues.tags ?? [])

    const [arts, setArts] = useState(() => defaultValues.arts?.length === 3 ? defaultValues.arts : ["", "", ""])
    const isValidArts = arts.length === 3

    const [backgroundImage, setBackgroundImage] = useState(defaultValues.backgroundImageUrl ?? defaultBusinessCard.backgroundImageUrl)

    const [themeColor, setThemeColor] = useState<string | null>(defaultValues.themeColor ?? defaultBusinessCard.themeColor)
    const isValidThemeColor = themeColor !== null

    const isValid = isValidType && isValidArts && isValidThemeColor

    const save = useMutate(async () => {
        if (!isValid) throw new Error(`入力値が不正です`)
        if (isInstant) throw new Error(`ログインしていない状態での名刺は保存できません。`)
        await handleSaveBusinessCard(businessCardId, {
            type,
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
            type,
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
                        type={type ?? "1"}
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
                    overflowY: "auto",
                },
                p: "sm",
                bg: "background.2",
                flexShrink: 0,
            })}>
                <div className={css({ my: "md" })}>
                    <Select
                        value={type}
                        onChange={(type) => type && setType(type)}
                        label="名刺タイプ"
                        data={businessCardTypes}
                        error={!isValidType && "選択してください"}
                    />
                </div>
                <div className={css({ my: "md" })}>
                    <InputImages
                        onChangeBackgroundImage={setBackgroundImage}
                        onChangeIcon={setIcon}
                    />
                </div>
                <div className={css({ my: "md" })}>
                    <TextInput
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="名前"
                        className={css({ my: "md" })}
                        maxLength={15}
                    />
                </div>
                {ranks &&
                    <div className={css({ my: "md" })}>
                        <Select
                            label="肩書き"
                            data={[{ label: "肩書きなし", value: "" }, ...ranks]}
                            value={rank}
                            onChange={rank => setRank(rank ?? "")}
                        />
                    </div>
                }
                <div className={css({ my: "md" })}>
                    <Select
                        label="テーマカラー"
                        data={Object.keys(colors).map((color) => ({
                            value: colors[color as keyof typeof colors].id,
                            label: colors[color as keyof typeof colors].label,
                        }))}
                        value={themeColor}
                        onChange={color => setThemeColor(color)}
                        placeholder="テーマカラーを選択してください"
                    />
                </div>
                <div className={css({ my: "md" })}>
                    {!isBusinessCard3 && (
                        <InputWrapper
                            label="興味のあるタグ"
                        >
                            <TagSelect
                                tags={tags}
                                selectedTags={interestTags}
                                onChangeSelected={setInterestTags}
                            />
                        </InputWrapper>
                    )}
                </div>
                <div className={css({ my: "md" })}>
                    <InputWrapper
                        label="好きな作品"
                    >
                        {Array(3).fill("").map((_, i) =>
                            <div key={i} className={css({ my: "xs" })}>
                                <InputArtTitle
                                    title={arts[i] ?? ""}
                                    onChangeTitle={title => {
                                        setArts(p => {
                                            const newArts = [...p]
                                            newArts[i] = title
                                            return newArts
                                        })
                                    }}
                                    error={!isValidArts && "作品を入力してください"}
                                />
                            </div>
                        )}
                    </InputWrapper>
                </div>
                <div>
                    {businessCardId &&
                        <BusinessCardDelete businessCardId={businessCardId}></BusinessCardDelete>
                    }
                </div>
            </div>

            <div className={flex({
                position: "fixed !important", bottom: 2, right: 4, zIndex: 1,
                gap: "sm",
                base: { flexDir: "column", alignItems: "flex-end" },
                sm: { flexDir: "row" },
            })}>
                {isInstant
                    ?
                    <DownloadButton
                        {...isValid
                            ? {
                                type,
                                name,
                                icon,
                                rank,
                                interestTags,
                                arts,
                                backgroundImage,
                                themeColor,
                                isValid: true,
                            }
                            : {
                                type: type ?? undefined,
                                name,
                                icon,
                                rank: rank ?? undefined,
                                interestTags,
                                arts,
                                backgroundImage,
                                themeColor: themeColor ?? undefined,
                                isValid: false,
                            }
                        }
                    />
                    : <>
                        <MutateButton
                            mutation={save}
                            className={buttonShadow}
                            size="md"
                            variant="default"
                        >
                            保存
                        </MutateButton>
                        <MutateButton
                            className={buttonShadow}
                            size="md"
                            variant="filled"
                            mutation={gotoSettings}
                        >
                            公開設定
                        </MutateButton>
                    </>
                }
            </div>

        </FullWidth >
    )
}

const buttonShadow = css({ shadow: { base: "md", _active: "xs" }, transition: "box-shadow 0.3s" })

type DownloadButtonProps =
    | (
        {
            type: string
            name: string
            icon: string
            rank: string | null
            interestTags: ArtTag[]
            arts: string[]
            backgroundImage: string
            themeColor: string
            isValid: true
        }
    )
    | (
        Partial<{
            type: string
            name: string
            icon: string
            rank: string | null
            interestTags: ArtTag[]
            arts: string[]
            backgroundImage: string
            themeColor: string
        }> & {
            isValid: false
        }
    )
const DownloadButton: FC<DownloadButtonProps> = (props) => {
    const params = props.isValid && new URLSearchParams(buildImageUrlParams({
        type: props.type,
        username: props.name,
        icon: props.icon,
        interestTags: props.interestTags,
        arts: props.arts,
        backgroundImage: props.backgroundImage,
        themeColor: props.themeColor,
        rank: props.rank ?? "",
    }))

    const imageUrl = `/api/businesscard/preview?${params.toString()}`

    return (
        <LinkButton
            className={buttonShadow}
            size="md"
            variant="filled"
            href={imageUrl}
            download={props.name ? `${props.name}の名刺` : "名刺"}
            target="_blank"
        >
            画像ダウンロード
        </LinkButton>
    )
}

export default DownloadButton
