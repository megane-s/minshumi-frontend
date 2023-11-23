"use client"

import { Center, Flex, Image, Skeleton, Stack } from "@mantine/core"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import styles from "./NewArtRelatedForm.module.css"
import { IoMdAdd } from "react-icons/io";
import { ActionIcon } from "@/components/ActionIcon"
import FullWidth from "@/app/BaseLayout/FullWidth";
import AddArtDialog, { AddArtDialogProps } from "./AddArtDialog";
import { Art } from "@/art/type";

interface NewArtRelatedFormProps {
}
const NewArtRelatedForm: FC<NewArtRelatedFormProps> = () => {
    const [prepared, setPrepared] = useState(false)
    const centerRef = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        centerRef.current?.scrollIntoView({ block: "end", inline: "center", behavior: "instant" })
        setPrepared(true)
    }, [])
    const [addTarget, setAddTarget] = useState<null | "prev" | "next">(null)
    const openAddDialog = !!addTarget
    const onCloseAddDialog = useCallback(() => setAddTarget(null), [])
    const onConfirm: AddArtDialogProps["onConfirm"] = useCallback((art) => {
        console.log(addTarget, art)
        /* TODO titleを追加 */
        const setArts = addTarget === "prev" ? setPrevArts : setNextArts
        setArts(p => [...p, art])
        onCloseAddDialog()
    }, [addTarget, onCloseAddDialog])

    const [prevArts, setPrevArts] = useState<Art[]>([])
    const [nextArts, setNextArts] = useState<Art[]>([])

    return (
        <div>
            <FullWidth>
                <Center>
                    <Flex component={Skeleton} visible={!prepared} direction="row" align="center" gap="md" className={`${styles.arts} ${prepared ? styles.overflowXAuto : styles.overflowXHidden}`}>
                        <ActionIcon onClick={() => setAddTarget("prev")}>
                            <IoMdAdd />
                        </ActionIcon>
                        {prevArts.map(art =>
                            <Stack key={art.artId} align="center" gap="xs" ta="center">
                                <Image
                                    src={art.imageUrl}
                                    alt="テスト"
                                    width={150}
                                    height={100}
                                    style={{ width: 150, height: "auto" }}
                                />
                                {art.title}
                            </Stack>
                        )}
                        <Stack align="center" gap="xs" ta="center" ref={centerRef}>
                            <Image
                                src="/placeholder/300x200_red.png"
                                alt="テスト"
                                width={150 * 1.2}
                                height={100 * 1.2}
                                style={{ width: 150 * 1.2, height: "auto" }}
                            />
                            鬼滅の刃
                        </Stack>
                        {nextArts.map(art =>
                            <Stack key={art.artId} align="center" gap="xs" ta="center">
                                <Image
                                    src={art.imageUrl}
                                    alt="テスト"
                                    width={150}
                                    height={100}
                                    style={{ width: 150, height: "auto" }}
                                />
                                {art.title}
                            </Stack>
                        )}
                        <ActionIcon onClick={() => setAddTarget("next")}>
                            <IoMdAdd />
                        </ActionIcon>
                    </Flex>
                </Center>
            </FullWidth>

            <AddArtDialog
                key={addTarget}
                opened={openAddDialog} onClose={onCloseAddDialog}
                onConfirm={onConfirm}
            />
        </div>
    )
}

export default NewArtRelatedForm
