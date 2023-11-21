import { getSession } from "@/auth/server/auth"
import { InfoIcon } from "@/components/Alert"
import { Alert } from "@mantine/core"
import { FC, Suspense } from "react"

interface AlreadyLoginedAlertProps {
}
const AlreadyLoginedAlert: FC<AlreadyLoginedAlertProps> = () => {
    return (
        <Suspense>
            <Content />
        </Suspense>
    )
}

export default AlreadyLoginedAlert

interface ContentProps {
}
const Content: FC<ContentProps> = async () => {
    const session = await getSession()
    return (
        session &&
        <Alert
            color="info"
            title="既にログインしています。"
            icon={<InfoIcon />}
        />
    )
}
