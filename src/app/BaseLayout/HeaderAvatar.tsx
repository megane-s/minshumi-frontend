"use client"
import { logout } from "@/auth/client/logout"
import { Avatar } from "@/components/Avatar"
import { Menu } from "@mantine/core"
import { Session } from "next-auth"
import Link from "next/link"
import { FC } from "react"
import { css } from "styled-system/css"
import { menus } from "./menu"

interface HeaderAvatarProps {
  session: Session
}
export const HeaderAvatar: FC<HeaderAvatarProps> = ({ session }) => {
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar
            src={session.user.image}
            alt={session.user.name ?? "ユーザ"}
            className={css({ _hover: { cursor: "pointer" } })}
          />
        </Menu.Target>
        <Menu.Dropdown>
          {session.user.name &&
            <Menu.Label>
              {session.user.name}
            </Menu.Label>
          }

          {menus.map((menu, i) =>
            "href" in menu
              ? <Menu.Item
                key={i}
                leftSection={menu.icon}
                component={Link}
                href={menu.href.replaceAll("[session.user.id]", session.user.id)}
              >
                {menu.label}
              </Menu.Item>
              : <Menu.Item
                key={i}
                leftSection={menu.icon}
                onClick={() => menu.onClick === "logout" ? logout() : void 0}
              >
                {menu.label}
              </Menu.Item>
          )}

        </Menu.Dropdown>
      </Menu>
    </>
  )
}
