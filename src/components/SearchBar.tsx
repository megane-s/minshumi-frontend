//SearchBar
"use client"

import React, { useState } from 'react';
import { TextInput, ActionIcon } from '@mantine/core';
import { SearchIcon } from '@/components/icon/Search';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

// onSearchの型を定義
interface SearchBarProps {
    defaultValue?: string
    type: "art" | "user"
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultValue = "", type }) => {
    const [searchInput, setSearchInput] = useState(defaultValue);
    const isValidSearchInput = searchInput.trim().length !== 0

    return (
        <form
            className={flex({ justify: "center", align: "center", mt: "xl", mb: "xl" })}
            action={`/search/${type}`}
        >
            <TextInput
                placeholder="作品やユーザを検索"
                size='xs'
                name="q"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                classNames={{
                    root: css({ height: "full" }),
                    input: css({ height: "full" }),
                }}
                styles={{ input: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
            />
            <ActionIcon
                disabled={!isValidSearchInput}
                size="md"
                styles={{
                    root: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                }}
                type='submit'
            >
                <SearchIcon alt="検索" />
            </ActionIcon>
        </form>
    );
};

export default SearchBar;