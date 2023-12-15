//ユーザー検索画面


// import { Center } from "@mantine/core"
// import { Suspense } from "react"
// import { Loader } from '@/components/Loader';
// import { SearchResultList } from "../SearchResuitList";
// import SearchBar from "./search";
// import { getArt } from "@/art/get";



// interface PageProps {
//     searchParams: {
//         q?: string
//     }
// }

// const UserSearchPage = async ({ searchParams }: PageProps) => {
//     const query = searchParams.q ?? ""
//     await getArt("")
//     return (
//         <div>searh user
//             <SearchBar defaultValue={query} />
//             {query.length >= 1
//                 ? <Suspense key={query} fallback={
//                     //mantineのCenterで中央揃えが可能
//                     <Center>
//                         <Loader />
//                     </Center>
//                 } >
//                     <SearchResultList query={query} />
//                 </Suspense>
//                 : <div>検索文字列を入れて下さい。</div>
//             }
//         </div>

//     )
// }
// export default UserSearchPage

//ユーザー検索画面
import React, { Suspense } from 'react';


import { Loader } from '@/components/Loader';
import { Center } from '@mantine/core';
import SearchBar from './search';
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
                    //mantineのCenterで中央揃えが可能
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