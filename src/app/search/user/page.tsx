//ユーザー検索画面
import React, { Suspense } from 'react';


import { Loader } from '@/components/Loader';
import { Center, Flex } from '@mantine/core';
import { SearchResultList } from './SearchResultList';
import { css } from 'styled-system/css';
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle';

interface PageProps {
    searchParams: {
        q?: string
    }
}


const UserSearchPage = async ({ searchParams }: PageProps) => {
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
                                検索文字列を入れて下さい。
                            </PageTitle>
                        </center>

                    </Flex>
                </div>
            }
        </div>
    );
};

export default UserSearchPage;