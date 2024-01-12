import { DialogProps } from "@/components/Dialog"
import { uploadFile } from "@/file-upload/client"
import { useMutate } from "@/util/client/useMutate"
import { Center, Divider, Flex, Input, TextInput, Textarea } from "@mantine/core"
import { FC, useState } from "react"
import { EditArtDialogFooter } from "./Footer"
import Image from "next/image"
import { Button } from "@/components/Button"
import { InputRelatedArt } from "@/art/type"

interface InputNewRelatedArtProps {
    defaultArt: Partial<InputRelatedArt>
    onGotoSelect: () => void
    onEditConfirm: (input: InputRelatedArt) => void
    dialogProps: DialogProps
}
export const InputNewRelatedArt: FC<InputNewRelatedArtProps> = ({
    defaultArt: propsDefaultArt,
    onEditConfirm,
    dialogProps,
    onGotoSelect,
}) => {
    const defaultArt = {
        title: "",
        description: "",
        imageUrl: "/placeholder/300x200_red.png",
        ...propsDefaultArt,
    }
    const [inputNewArt, setInputNewArt] = useState<InputRelatedArt>(defaultArt)

    const upload = useMutate(async () => {
        const { publicUrl } = await uploadFile()
        setInputNewArt(p => ({ ...p, imageUrl: publicUrl }))
    }, {
        loading: { button: "アップロード中..." },
        onSuccess: { toast: "アップロードしました" },
        onError: { toast: "アップロードできませんでした" },
    })

    const handleConfirm = async () => {
        onEditConfirm(inputNewArt)
        setInputNewArt(defaultArt)
    }
    return (
        <Flex direction="column" gap="md">
            <TextInput
                value={inputNewArt.title}
                onChange={e => setInputNewArt(p => ({ ...p, title: e.target.value }))}
                label="1. タイトル"
                description="正式名称で入力することを推奨します。略称、愛称は概要に入力すると良いでしょう。"
                required
            />
            <Textarea
                value={inputNewArt.description}
                onChange={e => setInputNewArt(p => ({ ...p, description: e.target.value }))}
                label="2. 作品の概要 (省略可)"
                description="ネタバレ等は含めないでください。"
            />
            <Input.Wrapper
                label="3. 作品の画像"
                description="著作権法や各種ガイドライン等に従って、再配布等が許可されている画像をアップロードしてください。万が一トラブルが発生した時も、みんしゅみでは一切の責任を負わないことを承諾した上でアップロードしてください。"
            >
                <Image
                    src={inputNewArt.imageUrl}
                    alt="関連作品の画像"
                    width={300}
                    height={300}
                    style={{ maxWidth: "100%", height: "auto", display: "block" }}
                    onClick={() => void upload.mutate(null)}
                />
            </Input.Wrapper>
            <EditArtDialogFooter
                onClickOk={() => void handleConfirm()}
                {...dialogProps}
            />

            <Divider
                labelPosition="center"
                label="または"
            />

            <Center>
                <Button variant="subtle" onClick={onGotoSelect}>
                    既存の作品から選ぶ
                </Button>
            </Center>
        </Flex>
    )
}
