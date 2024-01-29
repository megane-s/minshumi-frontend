//作品の検索画面

import React, { Suspense } from 'react';
import { SearchResultList } from './SearchResultList';
import { Loader } from '@/components/Loader';
import { Center, Flex } from '@mantine/core';
import { css } from 'styled-system/css';
import { PageTitle } from '@/components/PageTitle';
import Image from 'next/image'

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
                : <div>
                    <Flex justify="center" align="center" p={50} my="md">
                        <center>
                            <Image
                                src="/cat.png"
                                alt='none'
                                width={200}
                                height={400}
                            />
                            <PageTitle my="md">
                                <div className={css({ display: { base: "block", sm: "inline" } })}>
                                    検索文字列を
                                </div>
                                入れて下さい。
                            </PageTitle>
                        </center>

                    </Flex>
                </div>
            }
        </div>
    );
};

export default ArtSearchPage;