//作品の検索画面

import React, { Suspense } from 'react';
import { SearchResultList } from './SearchResultList';
import { Loader } from '@/components/Loader';
import { Center } from '@mantine/core';
import { css } from 'styled-system/css';

interface PageProps {
    searchParams: {
        q?: string
    }
}


const ArtSearchPage = async ({ searchParams }: PageProps) => {
    const query = searchParams.q ?? ""
    return (
        <div className={css({ my: "md" })}>
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