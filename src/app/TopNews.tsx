
import Image, { ImageProps } from "next/image"
import TextPopImg from "@/../public/top_text-pop.png"
import TopPanel1Img from "@/../public/top_panel_1.png"

import { FC } from "react"
import { css } from "styled-system/css"
import { center, flex } from "styled-system/patterns"
import { Button } from "@/components/Button"
import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"
import { login } from "@/auth/client/login"
import { LoginButton } from "@/components/LoginButton"

interface TopNewsProps {
}
export const TopNews: FC<TopNewsProps> = () => {
    return (
        <div
            className={flex({ flexDir: "column" })}
        >
            <Appeal />
        </div>
    )
}

interface AppealProps {
}
export const Appeal: FC<AppealProps> = async () => {
    const session = await getSession()
    return (
        <div className={flex({
            textAlign: "center",
            flexDir: "column",
            alignItems: "center",
            gap: { base: "lg", sm: "xl" },
            w: "full", px: "md", py: { base: "xl", sm: "10" },
            bgGradient: "to-br", gradientFrom: "primary.1", gradientTo: "primary.2",
            color: "white",
        })}>
            <div className={flex({ flexDir: "column", align: "center" })}>
                <div className={center({ w: "full", fontSize: { base: "2xl", sm: "5xl" }, fontWeight: "bold" })}>
                    作品をアピールしよう
                </div>
                <div className={css({ my: "2", position: "relative", w: "fit-content", px: "xl", fontSize: { base: "md", sm: "2xl" } })}>
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
        </div>
    )
}
