//ユーザー検索結果画面
// SearchResultList.tsx
import { FC } from 'react';
import { searchUser } from '@/user/search';
import UserListItem from './UserListItem';
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle';
import { SectionTitle } from '@/components/SectionTitle';
import { Flex } from '@mantine/core';

export const revalidate = 0;

interface SearchResultListProps {
    query: string;
}

export const SearchResultList: FC<SearchResultListProps> = async ({ query }) => {
    const searchResult = await searchUser(query);

    return (
        <div>
            {searchResult.map((user) => (
                <UserListItem
                    key={user.id}
                    user={user}
                />
            ))}
            {searchResult.length === 0 &&
                <Flex justify="center" align="center" p={50} my="md">
                    <center>
                        <Image
                            src="/404-notext.png"
                            alt='none'
                            width={200}
                            height={400}
                        />
                        <PageTitle my="md">
                            ユーザーの検索結果はありません
                        </PageTitle>
                        <SectionTitle my="md">
                            検索条件を変えて検索してみてください
                        </SectionTitle>
                    </center>

                </Flex>

            }
        </div>
    );
};


