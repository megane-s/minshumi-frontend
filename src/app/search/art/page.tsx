//作品の検索画面

import SearchBar from '@/app/search/art/SearchBar';
import React, { Suspense } from 'react';
import { SearchResultList } from './SearchResultList';
import { getArt } from '@/art/get';
import { Loader } from '@/components/Loader';
import { Center } from '@mantine/core';

interface PageProps {
    searchParams: {
        q?: string
    }
}


const ArtSearchPage = async ({ searchParams }: PageProps) => {
    const query = searchParams.q ?? ""
    await getArt("")
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

export default ArtSearchPage;