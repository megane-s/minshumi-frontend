import { FC, ReactNode } from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { Anchor, AnchorProps } from "@mantine/core"

type LinkProps = AnchorProps & NextLinkProps & {
  newTab?: boolean
  children: ReactNode
}
export const Link: FC<LinkProps> = ({ children, newTab, ...props }) => {
  return (
    <Anchor component={NextLink} {...(newTab ? { target: "_blank" } : {})} {...props}>
      {children}
    </Anchor>
  )
}
