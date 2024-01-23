// UserListItem.tsx
import React from 'react';
import { FC } from 'react';
import { Flex } from '@mantine/core';
import Link from 'next/link';
import { Avatar } from '@/components/Avatar';
import { User } from '@/user/type';
import { css } from 'styled-system/css';


interface UserListItemProps {
    user: User
}

const UserListItem: FC<UserListItemProps> = ({ user }) => (
    <Link
        href={`/user/${user.id}`}
        className={css({ color: "inherit", textDecoration: "inherit" })}
    >
        <Flex key={user.id} p="sm" gap="md">
            <Avatar
                className={css({ height: "fit-content", aspectRatio: "1 / 1", objectFit: "cover" })}
                src={user.image ?? "https://storage.googleapis.com/minshumi-user-content/logo-square-1080x1080.png"}
                alt={user.name ?? "名無し"}
                size="md"
            />
            {user.name}
        </Flex>
    </Link>
);

export default UserListItem
