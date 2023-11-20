"use client"

import { Badge } from "@/components/Badge"
import { Chip } from "@/components/Chip"
import { Loader } from "@/components/Loader"
import { TabsList, TabsTab, Tabs } from "@/components/Tabs"
import { TagsInput } from "@/components/TagsInput"
import { Container, Stack, Grid, Card, Title, Button, TextInput, Textarea, Slider, Switch, Checkbox, Text } from "@mantine/core"
import Image from "next/image"
import { FC } from "react"

interface ContentProps {
}
const Content: FC<ContentProps> = () => {
    return (
        <Container>
            <Stack p="lg" gap="lg">
                <Grid>

                    <Grid.Col span={12}>
                        <Card>
                            <Title mt="xl" mb="md">
                                デバッグメニュー
                            </Title>
                            開発時のみ閲覧できるメニューです。
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Card>
                            <Title order={2}>
                                カスタムテーマの確認
                            </Title>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Card>
                            <Stack gap="md">
                                <Title order={3}>ボタン</Title>
                                <Button>
                                    デフォルト
                                </Button>
                                <Button variant="light">
                                    {'variant="light"'}
                                </Button>
                                <Button variant="outline">
                                    {'variant="outline"'}
                                </Button>
                                <Button variant="gradient">
                                    {'variant="gradient"'}
                                </Button>
                            </Stack>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Card>
                            <Stack gap="md">
                                <Title order={3}>入力</Title>
                                <TextInput placeholder="TextInput" />
                                <Textarea rows={5} placeholder="Textarea" />
                                <Slider />
                                <Switch label="通知を受け取る" />
                                <Checkbox label="利用規約に同意してあげる" />
                            </Stack>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <Card.Section>
                                <Image
                                    src="/placeholder/300x200_blue.png"
                                    alt="placeholder"
                                    width={300} height={200}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </Card.Section>
                            <Text my="md">
                                カード
                            </Text>
                            <Button variant="outline" w="fit-content">
                                詳細
                            </Button>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <Chip>
                                default
                            </Chip>
                            <Chip checked>
                                checked
                            </Chip>
                            <Chip checked={false} >
                                not checked
                            </Chip>
                            <Chip variant="light" checked>
                                light checked
                            </Chip>
                            <Chip variant="light" checked={false}>
                                light not checked
                            </Chip>
                            <Chip variant="outline">
                                outline
                            </Chip>
                        </Card>
                    </Grid.Col>


                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <Tabs defaultValue="">
                                <TabsList>
                                    <TabsTab value="profile">
                                        プロフィール
                                    </TabsTab>
                                    <TabsTab value="通知">
                                        通知
                                    </TabsTab>
                                </TabsList>
                            </Tabs>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <Loader>

                            </Loader>
                        </Card>

                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <TagsInput defaultValue={['アニメ']} >

                            </TagsInput>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <Badge variant="filled">
                                filled
                            </Badge>
                            <Badge variant="light">
                                light
                            </Badge>
                            <Badge variant="outline">
                                outline
                            </Badge>
                            <Badge variant="dot">
                                dot
                            </Badge>
                            <Badge variant="transparent">
                                transparent
                            </Badge>
                            <Badge variant="default">
                                default
                            </Badge>
                        </Card>
                    </Grid.Col>

                </Grid>
            </Stack>
        </Container>
    )
}

export default Content
