import { Flex, FlexProps, Skeleton } from "@mantine/core"
import { ComponentProps, FC, MutableRefObject, ReactNode, createContext, useContext, useEffect, useRef, useState } from "react"
import styles from "./CenterizedScroll.module.css"
import { notImplementError } from "@/util/notImplement"

const centerTargetContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null)

type CenterizedScrollProps = FlexProps & {
    children?: ReactNode
}
const CenterizedScroll: FC<CenterizedScrollProps> = ({ children, className, ...props }) => {
    const [prepared, setPrepared] = useState(false)
    const centerRef = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        centerRef.current?.scrollIntoView({ block: "end", inline: "center", behavior: "instant" })
        setPrepared(true)
    }, [])
    return (
        <Flex
            component={Skeleton}
            visible={!prepared}
            direction="row"
            align="center"
            gap="md"
            className={`${styles.root} ${prepared ? styles.overflowXAuto : styles.overflowXHidden} ${className}`}
            {...props}
        >
            <centerTargetContext.Provider value={centerRef}>
                {children}
            </centerTargetContext.Provider>
        </Flex>
    )
}

export default CenterizedScroll

type CenterizedScrollTargetProps = ComponentProps<"div"> & {
    children: ReactNode
}
export const CenterizedScrollTarget: FC<CenterizedScrollTargetProps> = ({ children, ...props }) => {
    const ref = useContext(centerTargetContext)
    if (!ref) throw notImplementError("invalid context")
    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    )
}

