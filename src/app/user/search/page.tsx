//ユーザー検索画面
import React, { Suspense } from 'react';


import { Loader } from '@/components/Loader';
import { Center } from '@mantine/core';
import SearchBar from './SearchBar';
import { SearchResultList } from './SearchResultList';
import { getUser } from '@/user/get';

interface PageProps {
    searchParams: {
        q?: string
    }
}


const UserSearchPage = async ({ searchParams }: PageProps) => {
    const query = searchParams.q ?? ""
    await getUser("")
    return (
        <div>
            <SearchBar defaultValue={query} />
            {query.length >= 1
                ? <Suspense key={query} fallback={
                    <Center>
                        <Loader />
                    </Center>
                } >
                    <SearchResultList query={query} />
                </Suspense>
                : <div>検索文字列を入れて下さい。</div>
            }
        </div>
    );
};

export default UserSearchPage;