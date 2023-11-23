import { Affix, Box, Flex, Progress, Text } from "@mantine/core"
import styles from "./styles.module.css"
import { FC } from "react"

interface NewArtProgressContentProps {
    now: number
    total: number
}
const NewArtProgressContent: FC<NewArtProgressContentProps> = ({ now, total }) => {
    return (
        <Affix position={{ left: 0, right: 0, bottom: 0 }} w="100%">
            <Flex w="100%" h="fit-content" align="flex-end">
                <Box p="md" className={`${styles.flexGrow} ${styles.flexShrink}`} bg="background.2">
                    <Progress
                        value={now / total * 100}
                        classNames={{ section: styles.progressSection }}
                    />
                </Box>
                <Box className={`${styles.square} ${styles.progressText} ${styles.progressTextBorder}`} bg="background.2" p="sm">
                    <Text c="primary" component="span" fw="bold" className={styles.progressTextLg}>
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
