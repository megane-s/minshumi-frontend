"use client"

import { FC, useState } from "react"
import NewArtSectionTitle from "../NewArtSectionTitle"
import { Flex, Indicator, Stack, TextInput } from "@mantine/core"
import styles from "./styles.module.css"
import { Textarea } from "@/components/Textarea"
import Image from "next/image"
import { MdOutlineEdit } from "react-icons/md";

interface InputDetailFormProps {
    defaultValues: { title: string }
}
const InputDetailForm: FC<InputDetailFormProps> = ({ defaultValues }) => {
    const [title, setTitle] = useState(defaultValues.title)
    const [description, setDescription] = useState(defaultValues.title)
    return (
        <div>
            <NewArtSectionTitle>
                2. 作品の詳細を入力
            </NewArtSectionTitle>
            <Flex gap="sm" direction={{ base: "column", sm: "row" }}>

                <Flex justify="center" py="md">
                    <Indicator
                        inline
                        label={<MdOutlineEdit />}
                        size={24}
                        position="bottom-end"
                        h="fit-content"
                        classNames={{ indicator: styles.imageIndicator }}
                    >
                        <Image
                            src={`/placeholder/300x200_red.png`}
                            alt={title}
                            width={200}
                            height={200}
                            style={{ height: "auto" }}
                        />
                    </Indicator>
                </Flex>

                <Stack className={`${styles.flexGrow} ${styles.flexShrink}`}>
                    <TextInput
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        label="タイトル"
                    />
                    <Textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        label="作品の概要"
                        rows={5}
                    />
                    <Textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        label="好きなポイント"
                        rows={3}
                    />
                </Stack>

            </Flex>
        </div>
    )
}

export default InputDetailForm
