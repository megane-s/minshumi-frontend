import { Affix, Box, Flex, Progress, Text } from "@mantine/core"
import { FC } from "react"
import { css } from "styled-system/css"

interface NewArtProgressContentProps {
    now: number
    total: number
}

const NewArtProgressContent: FC<NewArtProgressContentProps> = ({ now, total }) => {
    return (
        <Affix position={{ left: 0, right: 0, bottom: 0 }} w="100%">
            <Flex w="100%" h={0} align="flex-end">
                <Box p="md" className={css({ flexGrow: 1, flexShrink: 1 })} bg="background.2">
                    <Progress
                        value={now / total * 100}
                        classNames={{ section: css({ transition: "0.5s" }) }}
                    />
                </Box>
                <Box
                    className={css({
                        width: "fit-content",
                        height: "auto",
                        aspectRatio: "1 / 1",
                        fontSize: "16px",
                        borderTop: "solid 1px var(--mantine-color-gray-3)",
                        left: "solid 1px var(--mantine-color-gray-3)",
                    })}
                    bg="background.2"
                    p="sm"
                >
                    <Text
                        c="primary"
                        component="span"
                        className={css({ fontSize: "16px", fontWeight: "bold" })}
                    >
                        {now}
                    </Text>
                    {" "}
                    /
                    {" "}
                    {total}
                </Box>
            </Flex>
        </Affix>
    )
}

export default NewArtProgressContent
