"use client"
import { logout } from "@/auth/client/logout"
import { Avatar } from "@/components/Avatar"
import { EditIcon } from "@/components/icon/Edit"
import { ExitIcon } from "@/components/icon/Exit"
import { NotificationIcon } from "@/components/icon/Notification"
import { SettingsIcon } from "@/components/icon/Settings"
import { Menu } from "@mantine/core"
import { Session } from "next-auth"
import Link from "next/link"
import { FC } from "react"
import { CgProfile } from "react-icons/cg"
import { css } from "styled-system/css"
import { TiBusinessCard } from "react-icons/ti"

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

          <Menu.Item
            leftSection={<CgProfile />}
            component={Link}
            href={`/user/${session.user.id}`}
          >
            MYプロフィール
          </Menu.Item>

          <Menu.Item
            leftSection={<EditIcon />}
            component={Link}
            href="/art/new"
          >
            作品の登録
          </Menu.Item>

          <Menu.Item
            leftSection={<TiBusinessCard />}
            component={Link}
            href="/businesscard/new"
          >
            名刺の作成
          </Menu.Item>

          <Menu.Item
            leftSection={<NotificationIcon />}
            component={Link}
            href="/notification"
          >
            通知
          </Menu.Item>

          <Menu.Item
            leftSection={<SettingsIcon />}
            component={Link}
            href="/settings"
          >
            設定
          </Menu.Item>

          <Menu.Item
            leftSection={<ExitIcon />}
            onClick={() => logout({ callbackUrl: "/" })}
          >
            ログアウト
          </Menu.Item>

        </Menu.Dropdown>
      </Menu>
    </>
  )
}
