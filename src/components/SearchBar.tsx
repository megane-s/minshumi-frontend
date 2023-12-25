//SearchBar
"use client"

import React, { useState } from 'react';
import { Flex, TextInput, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { SearchIcon } from '@/components/icon/Search';
import { css } from 'styled-system/css';

// onSearchの型を定義
interface SearchBarProps {
    defaultValue?: string
    type: "art" | "user"
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultValue = "", type }) => {
    const [searchInput, setSearchInput] = useState(defaultValue);
    const isValidSearchInput = searchInput.trim().length !== 0

    return (
        <Flex justify="center" align="center" mt="xl" mb="xl">
            <TextInput
                placeholder="作品やユーザを検索"
                size='xs'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                classNames={{
                    root: css({ height: "full" }),
                    input: css({ height: "full" }),
                }}
                styles={{ input: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
            />
            <Link href={`/search/${type}?q=${searchInput}`}>
                <ActionIcon
                    disabled={!isValidSearchInput}
                    size="md"
                    styles={{
                        root: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                    }}
                >
                    <SearchIcon />
                </ActionIcon>
            </Link>
        </Flex >
    );
};

export default SearchBar;