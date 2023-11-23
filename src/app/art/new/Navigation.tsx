import { Button } from "@/components/Button"
import { Flex } from "@mantine/core"
import { ComponentProps, FC } from "react"
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import Link from "next/link"

interface NewArtNavigationProps {
    prevHref: string
    nextHref: string
    prevButtonProps?: ComponentProps<typeof Button<typeof Link>>
    nextButtonProps?: ComponentProps<typeof Button<typeof Link>>
}
const NewArtNavigation: FC<NewArtNavigationProps> = ({ prevHref, nextHref, prevButtonProps, nextButtonProps }) => {
    return (
        <Flex justify="space-between" my="md" w="100%">
            <Button variant="default" leftSection={<IoCaretBack />} component={Link} href={prevHref} {...prevButtonProps}>
                {prevButtonProps?.children ?? "戻る"}
            </Button>
            <Button variant="filled" rightSection={<IoCaretForward />} component={Link} href={nextHref} {...nextButtonProps}>
                {nextButtonProps?.children ?? "次へ"}
            </Button>
        </Flex>
    )
}

export default NewArtNavigation
