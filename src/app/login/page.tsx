import { Card } from "@/components/Card"
import { List, ListItem } from "@/components/List"
import { PageTitle } from "@/components/PageTitle"
import { Center, Stack, Text } from "@mantine/core"
import LoginButton from "./LoginButton"
import AlreadyLoginedAlert from "./AlreadyLoginedAlert"
import { css } from "styled-system/css"

const LoginPage = async () => {
    return (
        <Center py="lg">
            <Stack>

                <AlreadyLoginedAlert />

                <Card miw="fit-content" w="250px" maw="100%">
                    <PageTitle ta="center" mt="md">
                        ログイン
                    </PageTitle>
                    <div className={css({ my: "md" })}>
                        ログインすると、
                        <List my="md">
                            <ListItem>
                                作品を
                                <Text component="span" fw="bold">
                                    登録・いいね
                                </Text>
                                する
                            </ListItem>
                            <ListItem>
                                <Text component="span" fw="bold">
                                    好きなもの名刺
                                </Text>
                                を作成する
                            </ListItem>
                        </List>
                        などの機能を利用できるようになります。
                    </div>
                    <LoginButton />
                </Card>

            </Stack>
        </Center>
    )
}
export default LoginPage
