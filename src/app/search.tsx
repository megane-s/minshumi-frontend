//SearchBar
"use client"

import React, { useState } from 'react';
import { Flex, TextInput, ActionIcon } from '@mantine/core';
import styles from "./page.module.css"
import Link from 'next/link';
import { SearchIcon } from '@/components/icon/Search';

// onSearchの型を定義
interface SearchBarProps {
    defaultValue?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultValue = "" }) => {
    const [searchInput, setSearchInput] = useState(defaultValue);
    const isValidSearchInput = searchInput.trim().length !== 0

    return (
        <Flex justify="center" align="center" mt="xl" mb="xl">
            <TextInput
                placeholder="作品やユーザを検索"
                size='xs'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <Link href={`/art/search?q=${searchInput}`}>
                <ActionIcon className={styles.actionIcon} disabled={!isValidSearchInput}>
                    <SearchIcon />
                </ActionIcon>
            </Link>
        </Flex >
    );
};

export default SearchBar;