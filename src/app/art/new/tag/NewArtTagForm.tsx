"use client"
import { FC } from "react"
import { useState } from "react"
import TagSelect from "@/components/TagSelect"
import { ArtTag } from "@/art/type"
import { SectionTitle } from "@/components/SectionTitle"
import NewArtNavigation from "../Navigation"
import { Space } from "@mantine/core"

const medias = [
    "アニメ", "マンガ", "本", "映画", "ドラマ",
    "アーティスト", "Youtuber", "音楽", "ポッドキャスト", "ゲーム",
    "イラスト", "ボードゲーム",
]
const genres = [
    "アクション", "ロマンス", "ドラマ", "コメディ",
    "ファンタジー", "SF", "ホラー", "ミステリー", "スリラー",
    "スポーツ", "冒険", "歴史", "時代劇", "魔法", "恋愛",
    "学園", "青春", "ギャグ", "バトル", "萌え", "音楽",
    "ダンス", "アイドル", "グルメ", "超能力", "ダーク",
    "サスペンス", "ノンフィクション", "ファッション", "ミュージカル",
]
const others = [
    "感動", "クラシック", "インディーズ", "ヒット作", "定番",
    "ハイテク", "カラフル",
]

interface NewArtTagFormProps {
}
const NewArtTagForm: FC<NewArtTagFormProps> = () => {
    const [selectedMedias, setSelectedMedias] = useState<ArtTag[]>([])
    const [selectedGenres, setSelectedGenres] = useState<ArtTag[]>([])
    const [selectedOthers, setSelectedOthers] = useState<ArtTag[]>([])
    return (
        <div>
            <SectionTitle my="md">
                メディア
            </SectionTitle>

            <TagSelect
                tags={medias}
                selectedTags={selectedMedias}
                onChangeSelected={setSelectedMedias}
            />

            <SectionTitle my="md">
                ジャンル
            </SectionTitle>

            <TagSelect
                tags={genres}
                selectedTags={selectedGenres}
                onChangeSelected={setSelectedGenres}
            />

            <SectionTitle my="md">
                その他
            </SectionTitle>

            <TagSelect
                tags={others}
                selectedTags={selectedOthers}
                onChangeSelected={setSelectedOthers}
            />

            <Space h="50px" />

            <NewArtNavigation
                prevHref="/art/new/detail#"
                nextHref="/art/new/related#"
            />
        </div>
    )
}

export default NewArtTagForm
