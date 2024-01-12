import { Button } from "@/components/Button"
import { Flex } from "@mantine/core"
import { ComponentProps, FC, ReactNode } from "react"
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import Link from "next/link"

interface NewArtNavigationProps extends ComponentProps<typeof Flex<"div">> {
    prev: ReactNode
    next: ReactNode
}
const NewArtNavigation: FC<NewArtNavigationProps> = ({ prev, next, ...props }) => {
    return (
        <Flex justify="space-between" my="md" w="100%" wrap="wrap" gap="sm" {...props}>
            <div>
                {prev}
            </div>
            <div>
                {next}
            </div>
        </Flex>
    )
}
export default NewArtNavigation

interface NewArtNavigationPrevButtonProps extends ComponentProps<typeof Button<typeof Link>> {
}
export const NewArtNavigationPrevButton: FC<NewArtNavigationPrevButtonProps> = (props) => {
    return (
        <Button variant="default" leftSection={<IoCaretBack />} component={Link} prefetch {...props}>
            {props?.children ?? "戻る"}
        </Button>
    )
}

interface NewArtNavigationNextButtonProps extends ComponentProps<typeof Button<typeof Link>> {
}
export const NewArtNavigationNextButton: FC<NewArtNavigationNextButtonProps> = (props) => {
    return (
        <Button variant="filled" rightSection={<IoCaretForward />} component={Link} prefetch {...props}>
            {props.children ?? "次へ"}
        </Button>
    )
}
