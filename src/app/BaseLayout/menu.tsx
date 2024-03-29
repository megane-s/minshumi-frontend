import { ExitIcon } from "@/components/icon/Exit";
import { MailIcon } from "@/components/icon/Mail";
import { SettingsIcon } from "@/components/icon/Settings";
import { ReactNode } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdMegaphone } from "react-icons/io";
import { TiBusinessCard } from "react-icons/ti";

export type MenuItem = {
    icon: ReactNode
    label: ReactNode
} & (
        | { href: string }
        | { onClick: "logout" }
    )

export const menus: MenuItem[] = [
    {
        icon: <CgProfile />,
        href: "/user/[session.user.id]",
        label: "MYプロフィール",
    },
    {
        icon: <IoMdMegaphone />,
        href: "/art/appeal",
        label: "作品のアピール",
    },
    {
        icon: <TiBusinessCard />,
        href: "/businesscard/new",
        label: "名刺の作成",
    },
    {
        icon: <SettingsIcon />,
        href: "/settings/user",
        label: "プロフィールの編集",
    },
    {
        icon: <ExitIcon />,
        onClick: "logout",
        label: "ログアウト",
    },
    {
        icon: <MailIcon />,
        href: "/form",
        label: "お問い合わせ",
    },
]

