// UserListItem.tsx
import React from 'react';
import { FC } from 'react';
import { Flex } from '@mantine/core';
import Link from 'next/link';
import styles from './UserListItem.module.css';
import { Avatar } from '@/components/Avatar';
import { User } from '@/user/type';


interface UserListItemProps {
    user: User
}

const UserListItem: FC<UserListItemProps> = ({ user }) => (
    <Link href={`/user/${user.id}`} className={styles.link}>
        <Flex key={user.id} p="sm" gap="md">
            <Avatar
                className={styles.listItemImage}
                src={user.image ?? "/placeholder/300x200_red.png"}
                alt={user.name ?? "名無し"}
                size="md"
            />
            {user.name}
        </Flex>
    </Link>
);

export default UserListItem;