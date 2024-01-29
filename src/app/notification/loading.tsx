import { CenterLoader } from "@/components/CenterLoader"
import { Loader } from "@/components/Loader"
import { FC } from "react"

interface NotificationLoadingProps {
}
const NotificationLoading: FC<NotificationLoadingProps> = () => {
  return (
    <CenterLoader />
  )
}
export default NotificationLoading
