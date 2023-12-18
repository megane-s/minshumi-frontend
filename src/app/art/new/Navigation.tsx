import { Button } from "@/components/Button"
import { Flex } from "@mantine/core"
import { ComponentProps, FC } from "react"
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import Link from "next/link"

interface NewArtNavigationProps {
    prevHref: string
    nextHref: string
    prevButtonProps?: Partial<ComponentProps<typeof Button<typeof Link>>>
    nextButtonProps?: Partial<ComponentProps<typeof Button<typeof Link>>>
    flexProps?: Partial<ComponentProps<typeof Flex<"div">>>
    disabledPrev?: boolean
    disabledNext?: boolean
}
const NewArtNavigation: FC<NewArtNavigationProps> = ({
    prevHref, nextHref,
    prevButtonProps, nextButtonProps,
    flexProps = {},
}) => {
    return (
        <Flex justify="space-between" my="md" w="100%" wrap="wrap" gap="sm" {...flexProps}>
            <Button variant="default" leftSection={<IoCaretBack />} component={Link} href={prevHref} prefetch {...prevButtonProps}>
                {prevButtonProps?.children ?? "戻る"}
            </Button>
            <Button variant="filled" rightSection={<IoCaretForward />} component={Link} href={nextHref} prefetch {...nextButtonProps}>
                {nextButtonProps?.children ?? "次へ"}
            </Button>
        </Flex>
    )
}

export default NewArtNavigation
