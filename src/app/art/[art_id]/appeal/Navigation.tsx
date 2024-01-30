"use client"

import { FC, useCallback } from "react"
import { useMutate } from "@/util/client/useMutate"
import { flex } from "styled-system/patterns"
import { ArtId, InputRelatedArt } from "@/art/type"
import MutateButton from "@/components/MutateButton"
import Image from "next/image"
import BirdDown from "@/../public/right-latter-bird-down.png"
import BirdUp from "@/../public/right-latter-bird-up.png"
import { css, cx } from "styled-system/css"
import { sleep } from "@/util/sleep"
import { AnimationScope, useAnimate } from "framer-motion"
import { handleAppeal } from "./actions"
import { useRouter } from "next/navigation"

interface NavigationProps {
    artId: ArtId
    likePoint: string
    prevArts: InputRelatedArt[]
    nextArts: InputRelatedArt[]
    hasAppeal: boolean
}
const Navigation: FC<NavigationProps> = ({ artId, likePoint, prevArts, nextArts, hasAppeal }) => {
    const appealAnimation = useAppealAnimation()
    const router = useRouter()
    const handleSubmit = useMutate(async () => {
        if (!hasAppeal) {
            return;
        }
        await Promise.all([
            appealAnimation.animate(),
            handleAppeal(artId, {
                likePoint,
                prevArts,
                nextArts,
            }),
        ])
        router.push(`/art/${artId}`)
    }, {
        loading: { button: "アピールを登録しています..." },
        onSuccess: { toast: "アピールを登録しました！" },
    })
    return (
        <div
            className={flex({ w: "full", justifyContent: "center", my: "lg" })}
        >
            <MutateButton mutation={handleSubmit} variant="gradient" size="lg" disabled={!hasAppeal}>
                アピールを登録
            </MutateButton>

            <AppealAnimation
                {...appealAnimation.props}
            />
        </div>
    )
}

export default Navigation

interface AppealAnimationProps {
    containerRef: AnimationScope<HTMLDivElement>
    birdRef: AnimationScope<HTMLDivElement>
    upRef: AnimationScope<HTMLImageElement>
    downRef: AnimationScope<HTMLImageElement>
}
const AppealAnimation: FC<AppealAnimationProps> = ({
    containerRef, birdRef,
    downRef, upRef,
}) => {
    return (
        <div
            className={css({
                position: "fixed",
                bottom: 0,
                left: 0,
                w: "100vw",
                h: "100vh",
                backgroundColor: "rgba(0,0,0,0.3)",
                opacity: 0,
                display: "none",
                zIndex: 9999,
            })}
            ref={containerRef}
        >
            <div
                className={css({
                    position: "fixed",
                    bottom: "4",
                    left: "-150px",
                    overflow: "visible",
                    w: 0,
                    h: 0,
                })}
                ref={birdRef}
            >
                <Image
                    src={BirdDown}
                    alt=""
                    className={cx(
                        css({
                            position: "absolute",
                            w: "128px", maxW: "128px",
                            h: "128px",
                            display: "inline-block",
                            left: "0",
                            bottom: "0",
                            opacity: 1,
                        }),
                    )}
                    width={128}
                    height={128}
                    loading="eager"
                    ref={downRef}
                />
                <Image
                    src={BirdUp}
                    alt=""
                    className={cx(
                        css({
                            position: "absolute",
                            w: "128px", maxW: "128px",
                            h: "128px",
                            display: "inline-block",
                            left: "0",
                            bottom: "0",
                            opacity: 0,
                        }),
                    )}
                    width={128}
                    height={128}
                    loading="eager"
                    ref={upRef}
                />
            </div>
        </div>
    )
}

const useAppealAnimation = () => {
    const [containerRef, animateContainer] = useAnimate<HTMLDivElement>()
    const [birdRef, animateBird] = useAnimate<HTMLDivElement>()
    const [upRef] = useAnimate<HTMLImageElement>()
    const [downRef] = useAnimate<HTMLImageElement>()
    const animate = useCallback(async () => {
        const centerLeft = window.innerWidth / 2 - upRef.current.width / 2
        const [, stopUpDown,] = await Promise.all([
            // 背景を暗く
            animateContainer(containerRef.current, {
                display: "block",
                opacity: 1,
            }, { duration: 0.2 }),
            // 翼を羽ばたかせる
            upDownBird({
                up: upRef.current,
                down: downRef.current,
            }),
            (async () => {
                // 中央に移動
                await animateContainer(birdRef.current, {
                    left: `${centerLeft}px`,
                }, { duration: 1.8, ease: "circOut" })
                // 上昇
                await animateBird(birdRef.current, {
                    top: "-100%",
                    left: centerLeft * 1.1,
                }, { delay: 0.2, duration: 1.0, ease: "backIn" })
            })(),
        ])
        stopUpDown()
        await animateContainer(containerRef.current, {
            opacity: 0,
        }, { duration: 0.2 })
        // 直後にリセットするとなぜか上書きされるので少し待つ
        setTimeout(() => {
            containerRef.current.style.display = "none"
            birdRef.current.style.left = "-150px"
            birdRef.current.style.top = "0"
            birdRef.current.style.bottom = "4rem"
        }, 300)
    }, [animateBird, animateContainer, birdRef, containerRef, downRef, upRef])
    return {
        props: {
            containerRef,
            birdRef,
            upRef, downRef,
        },
        animate,
    }
}

const upDownBird = async ({
    up, onUp,
    down, onDown,
    base = 200,
}: {
    up: HTMLElement, onUp?: () => void,
    down: HTMLElement, onDown?: () => void,
    base?: number,
}) => {
    const moveUpDown = setInterval(async () => {
        // down
        up.style.opacity = "1"
        down.style.opacity = "0"
        onDown?.()
        await sleep(base)
        // up
        up.style.opacity = "0"
        down.style.opacity = "1"
        onUp?.()
        await sleep(base)
    }, base * 2)
    return () => {
        clearInterval(moveUpDown)
    }
}

