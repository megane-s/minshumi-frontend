import { useEffect, useState } from "react"

export const useClientRendered = () => {
    const [rendered, setRendered] = useState(false)
    useEffect(() => {
        setRendered(true)
    }, [])
    return rendered
}
