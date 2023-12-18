//ユーザー検索画面
import React, { Suspense } from 'react';


import { Loader } from '@/components/Loader';
import { Box, Center } from '@mantine/core';
import { SearchResultList } from './SearchResultList';

interface PageProps {
    searchParams: {
        q?: string
    }
}


const UserSearchPage = async ({ searchParams }: PageProps) => {
    const query = searchParams.q ?? ""
    return (
        <Box my="md">
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
        </Box>
    );
};

export default UserSearchPage;