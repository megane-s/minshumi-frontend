import { CenterLoader } from "@/components/CenterLoader"
import { FC } from "react"
import { css } from "styled-system/css"

interface NotificationLoadingProps {
}
const NotificationLoading: FC<NotificationLoadingProps> = () => {
  return (
    <CenterLoader
      className={css({ my: "lg" })}
    />
  )
}
export default NotificationLoading
