"use client"

import { Button } from "@/components/Button"
import { Link } from "@/components/Link"
import Image from "next/image"
import { FC } from "react"
import { DialogExample } from "./DialogExample"
import { Container, Stack, Grid, Title, Textarea, Slider, Switch, Checkbox, Text, Avatar } from "@mantine/core"
import { Card, CardSection } from "@/components/Card"
import { TextInput } from "@/components/TextInput"
import { PageTitle } from "@/components/PageTitle"
import { SectionTitle } from "@/components/SectionTitle"
import { ActionIcon } from "@/components/ActionIcon"
import { CiStar } from "react-icons/ci";

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
                            <CardSection>
                                <Image
                                    src="/placeholder/300x200_blue.png"
                                    alt="placeholder"
                                    width={300} height={200}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </CardSection>
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
                            <Stack>
                                my card example
                                <Button>
                                    ボタン default
                                </Button>
                                <Button variant="light">
                                    ボタン light
                                </Button>
                                <Button variant="filled">
                                    ボタン filled
                                </Button>
                                <Button variant="subtle">
                                    ボタン subtle
                                </Button>
                            </Stack>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <Link href="/">Top Page Link</Link>
                            <Link href="/" newTab>New Tab Top Page Link</Link>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <TextInput />
                            <TextInput label="ラベルの使用例" />
                            <TextInput description="descriptionの使用例" />
                            <TextInput placeholder="placeholderの使用例" />
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <DialogExample />
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <Textarea />
                            <Textarea label="ラベルの使用例" />
                            <Textarea description="descriptionの使用例" />
                            <Textarea placeholder="placeholderの使用例" />
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <PageTitle>作品登録</PageTitle>
                            <SectionTitle>
                                1. 作品名の入力
                            </SectionTitle>
                            これこれこうして
                            <SectionTitle>
                                2. 概要の入力
                            </SectionTitle>
                            これこれこうして
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            <ActionIcon size="xl" />
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Card>
                            {/* With image */}
                            <Avatar src="/placeholder/avatar.jpg" alt="it's me" />

                            {/* Default placeholder */}
                            <Avatar radius="xl" />

                            {/* Letters with xl radius */}
                            <Avatar color="error.1" radius="xl">MK</Avatar>

                            {/* Custom placeholder icon */}
                            <Avatar color="primary.0" radius="sm">
                                <CiStar size="1.5rem" />
                            </Avatar>
                        </Card>
                    </Grid.Col>

                </Grid >
            </Stack >
        </Container >
    )
}

export default Content
