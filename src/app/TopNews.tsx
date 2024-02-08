
import Image from "next/image"
import TextPopImg from "@/../public/top_text-pop.png"
import TopPanel1Img from "@/../public/top_panel_1.png"
import TopPanel2BgImg from "@/../public/top_panel_2_bg.png"
import TopPanel2BusinessCardImg from "@/../public/top_panel_2_businesscard.png"
import { FC } from "react"
import { css } from "styled-system/css"
import { center, flex } from "styled-system/patterns"
import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"
import { LoginButton } from "@/components/LoginButton"

interface TopNewsProps {
}
export const TopNews: FC<TopNewsProps> = () => {
    return (
        <div
            className={flex({
                flexDir: "column",
                fontSize: { base: "md", sm: "2xl" },
            })}
        >
            <Appeal />
            <BusinessCard />
        </div>
    )
}

interface AppealProps {
}
export const Appeal: FC<AppealProps> = async () => {
    const session = await getSession()
    return (
        <section className={flex({
            textAlign: "center",
            flexDir: "column",
            alignItems: "center",
            gap: { base: "lg", sm: "xl" },
            w: "full", px: "md", py: { base: "xl", sm: "10" },
            bgGradient: "to-br", gradientFrom: "#FFD178", gradientTo: "primary.1",
            color: "white",
        })}>
            <div className={flex({ flexDir: "column", align: "center" })}>
                <h2 className={center({ w: "full", fontSize: { base: "2xl", sm: "5xl" }, fontWeight: "bold" })}>
                    作品をアピールしよう
                </h2>
                <div className={css({ my: "2", position: "relative", w: "fit-content", px: "xl" })}>
                    作品をアピールすると <br />
                    他の人に作品が届きます
                    <Image
                        src={TextPopImg}
                        alt=""
                        className={css({ position: "absolute", w: "full", height: "auto", bottom: "0", left: 0, right: 0, mx: "auto" })}
                    />
                </div>
                <div className={css({ mt: "xl" })}>
                    {session
                        ? <LinkButton
                            variant="white"
                            className={css({ borderRadius: "full !important" })}
                            size="xl"
                            href="/art/appeal"
                        >
                            作品をアピール
                        </LinkButton>
                        : <LoginButton
                            variant="white"
                            className={css({ borderRadius: "full !important" })}
                            size="xl"
                            callbackUrl="/art/appeal"
                        />
                    }
                </div>
            </div>
            <Image
                src={TopPanel1Img}
                alt=""
                width={300}
            />
        </section>
    )
}

interface BusinessCardProps {
}
export const BusinessCard: FC<BusinessCardProps> = () => {
    return (
        <section className={flex({
            textAlign: "center",
            flexDir: "column",
            alignItems: "center",
            w: "full", px: "md", py: { base: "xl", sm: "10" },
            position: "relative",
            overflow: "hidden",
            color: "white",
        })}>
            <Image
                src={TopPanel2BgImg}
                alt=""
                className={css({
                    position: "absolute",
                    zIndex: -1,
                    inset: 0, m: "auto",
                    w: "full", h: "full",
                    objectFit: "cover",
                })}
                quality={100}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAjSURBVHgB7coxAQAACAIwNJktrGszqcDBye7V3D4EDVGiJxLIxgJqeb12ZwAAAABJRU5ErkJggg=="
                width={400}
                height={200}
            />
            <div
                className={flex({
                    flexDir: { base: "column", sm: "row" },
                    gap: { base: "md", sm: "xl" },
                    justify: "center",
                    align: "center",
                })}
            >
                <Image
                    src={TopPanel2BusinessCardImg}
                    alt="好きなもの名刺を作ろう"
                    className={css({
                        my: { sm: "xl" },
                        w: "full",
                        h: "auto",
                        flexGrow: 1,
                        flexShrink: 1,
                        minW: 0,
                        aspectRatio: "222 / 126"
                    })}
                    quality={100}
                    placeholder="empty"
                />
                <div className={css({
                    textAlign: { base: "center", sm: "start" },
                    maxW: "400px",
                    flexShrink: 0,
                    flexGrow: 0,
                })}>
                    <h2 className={css({
                        fontSize: {
                            base: "2xl",
                            sm: "4xl",
                            md: "5xl",
                        },
                        fontWeight: "bold",
                        minW: "fit-content",
                    })}>
                        好きなもの名刺
                    </h2>
                    <div
                        className={css({
                            fontSize: {
                                base: "md",
                                sm: "xl",
                                md: "2xl",
                            },
                        })}
                    >
                        好きな作品を載せた名刺を作成できます！
                    </div>
                    <LinkButton
                        href="/businesscard/new"
                        variant="white"
                        className={css({ mt: { base: "lg", sm: "12" }, borderRadius: "full !important" })}
                        c="success.0"
                        size="xl"
                    >
                        名刺を作成
                    </LinkButton>
                </div>
            </div>
        </section>
    )
}

