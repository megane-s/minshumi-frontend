import { ComponentProps, FC } from "react"
import { flex } from "styled-system/patterns"
import { Loader } from "./Loader"
import { cx } from "styled-system/css"

interface CenterLoaderProps extends ComponentProps<"div"> {
}
export const CenterLoader: FC<CenterLoaderProps> = ({ className, ...props }) => {
  return (
    <div className={cx(flex({ display: "flex", w: "full", flexDir: "column", justify: "center", alignItems: "center" }), className)} {...props}>
      <Loader />
    </div>
  )
}
