"use client"
import { ActionIcon, Affix } from "@mantine/core"
import { FC, ReactNode, useState } from "react"
import { handleCancelGood, handleGood } from "./actions";
import { ArtId } from "@/art/type";
import { Dialog, useDialog } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { login } from "@/auth/client/login";
import { GoodIcon } from "@/components/icon/Good";
import { AnimationControls, m, useAnimation } from "framer-motion";
import { css } from "styled-system/css";
import { useReward } from "react-rewards"

interface GoodButtonProps {
    artId: ArtId
    isGooded: boolean
    isLogined: boolean
}
export const GoodButton: FC<GoodButtonProps> = ({ artId, isGooded: propsIsGooded, isLogined }) => {
    const pleaseLoginDialog = useDialog()

    const [isGooded, setIsGooded] = useState(propsIsGooded)
    const goodRewards = useGoodAnimation()

    //いいねしたときにログインしてなかったらダイアログを表示
    const handleGoodClick = async () => {
        if (!isLogined) return pleaseLoginDialog.onOpen()

        try {
            if (!isGooded) {
                setIsGooded(true)
                await Promise.all([
                    goodRewards.animate(),
                    handleGood(artId),
                ])
            } else {
                setIsGooded(false)
                await handleCancelGood(artId);
            }
        } catch (e) {
            console.error(e)
            setIsGooded(isGooded)
        }
    }

    return (
        <Affix position={{ bottom: 8, right: 8 }}>
            <Dialog {...pleaseLoginDialog.dialogProps}>
                いいねするにはログインが必要です。
                <Button
                    variant="outline"
                    size="lg"
                    w="100%"
                    onClick={() => void login()}>ログイン</Button>
            </Dialog>

            <ActionIcon
                size="xl"
                variant={isGooded ? "filled" : "outline"}
                bg={isGooded ? "primary" : "background.2"}
                onClick={() => void handleGoodClick()}
                className={css({ position: "relative" })}
            >
                <GoodRewards {...goodRewards.props}>
                    <GoodIcon />
                </GoodRewards>
            </ActionIcon>

        </Affix>
    )
}

const useGoodAnimation = () => {
    const good = useAnimation()
    const rewardIds = {
        1: "good-reward-1",
    }
    const reward1 = useReward(rewardIds[1], "confetti", { angle: 110, startVelocity: 20 })
    const animate = async () => {
        reward1.reward()
    }
    return {
        animate,
        props: {
            good,
            reward1Id: rewardIds[1],
        },
    }
}

interface GoodRewardsProps {
    good: AnimationControls
    reward1Id: string
    children: ReactNode
}
export const GoodRewards: FC<GoodRewardsProps> = ({
    good,
    reward1Id,
    children,
}) => {
    return (
        <m.div animate={good}>
            <div id={reward1Id} className={css({ position: "absolute", bottom: 0, left: 0, right: 0, mx: "auto", overflow: "visible" })} />
            {children}
        </m.div>

    )
}
