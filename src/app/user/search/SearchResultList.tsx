//ユーザー検索結果画面
// SearchResultList.tsx
import { FC } from 'react';
import { searchUser } from '@/user/search';
import UserListItem from './UserListItem';


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
            {searchResult.length === 0 && <div>検索結果が0件です。</div>}
        </div>
    );
};


