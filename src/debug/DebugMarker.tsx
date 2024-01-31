import { FC } from "react"
import { isDev } from "./isDebug"
import DebugMarkerContent from "./DebugMarkerContent"

interface DebugMarkerProps {
}
const DebugMarker: FC<DebugMarkerProps> = () => {
    console.log("isDev", isDev);

    if (!isDev) return null
    const isDevDb = !!process.env.COCKROACH_DATABASE_URL?.match(/-dev/)
    return <DebugMarkerContent
        isDev={isDev}
        isDevDb={isDevDb}
    />
}

export default DebugMarker
