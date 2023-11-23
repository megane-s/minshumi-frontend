import { Button } from "@/components/Button"
import { Flex } from "@mantine/core"
import { FC } from "react"
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import Link from "next/link"

interface NewArtNavigationProps {
    prevHref: string
    nextHref: string
}
const NewArtNavigation: FC<NewArtNavigationProps> = ({ prevHref, nextHref }) => {
    return (
        <Flex justify="space-between" my="md" w="100%">
            <Button variant="default" leftSection={<IoCaretBack />} component={Link} href={prevHref}>
                戻る
            </Button>
            <Button variant="filled" rightSection={<IoCaretForward />} component={Link} href={nextHref}>
                次へ
            </Button>
        </Flex>
    )
}

export default NewArtNavigation
