"use client"

import { Carousel, CarouselSlide } from "@/components/Carousel"
import Image from "next/image"
import { css } from "styled-system/css"
import { FC, useState } from "react"
import { useMutate } from "@/util/client/useMutate"
import { handleCreateBusinessCard } from "./actions"
import MutateButton from "@/components/MutateButton"
import { Center } from "@mantine/core"
import { CheckIcon } from "@/components/icon/Check"
import { useRouter } from "next/navigation"

const types = [1, 2, 3, 4]

interface SelectTypeProps {
}
export const SelectType: FC<SelectTypeProps> = () => {
    const [selectedType, setSelectedType] = useState<number | null>(null)
    const isValidSelectedType = selectedType !== null
    const router = useRouter()
    const handleCreate = useMutate(async (type: number) => {
        const newBusinessCard = await handleCreateBusinessCard(type)
        router.push(`/businesscard/${newBusinessCard.businessCardId}/edit`)
    })
    return (
        <div>
            <Carousel slideSize="min(600px, 60%)" slideGap="md">
                {types.map((type, index) =>
                    <CarouselSlide key={type}>
                        <Image
                            src={`/businesscard/example/type_${type}_placeholder.png`}
                            alt={`タイプ${type}`}
                            width={600}
                            height={300}
                            className={css({ w: "100%", h: "auto", borderStyle: "solid", borderWidth: "4px", borderColor: selectedType === type ? "primary.0" : "transparent" })}
                            priority={index <= 1}
                            onClick={() => setSelectedType(prev => prev === type ? null : type)}
                        />
                    </CarouselSlide>
                )}
            </Carousel>

            <Center>
                <MutateButton
                    mutation={handleCreate}
                    variant="gradient"
                    size="lg"
                    leftSection={<CheckIcon />}
                    disabled={!isValidSelectedType}
                    className={css({ my: "xl" })}
                >
                    決定
                </MutateButton>
            </Center>

        </div>
    )
}
