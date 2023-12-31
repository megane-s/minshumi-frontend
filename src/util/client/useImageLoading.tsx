import { ImageProps } from "next/image"
import { useCallback, useEffect, useState, useTransition } from "react"

export const useImageLoading = ({ src, }: {
    src: string,
    onLoad?: () => void,
    onError?: () => void,
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [, startTransition] = useTransition()
    useEffect(() => {
        startTransition(() => {
            setIsLoading(true)
        })
    }, [src])

    const [isError, setIsError] = useState(false)

    const handleLoad = useCallback(() => {
        setIsLoading(false)
    }, [])
    const handleError: ImageProps["onError"] = useCallback(() => {
        setIsLoading(false)
        setIsError(true)
    }, [])

    const props = {
        src,
        onLoad: handleLoad,
        onError: handleError,
    } satisfies Partial<ImageProps>

    return {
        props,
        isLoading,
        isError,
    }
}
