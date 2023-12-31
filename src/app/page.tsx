// トップ画面

import { SectionTitle } from '@/components/SectionTitle';
import React from 'react';
import { getArtsWithTag } from '@/art/tag/getArts';
import { tags } from './tags';
import SearchBar from '@/components/SearchBar';
import FullWidth from './BaseLayout/FullWidth';
import { TopNews } from "./TopNews"
import { css } from 'styled-system/css';
import { Link } from '@/components/Link';
import { ArtsList } from './ArtsList';

const TopPage = async () => {
  const tagArts = await Promise.all(
    tags.map(async tag => {
      const arts = await getArtsWithTag(tag)
      return { tag, arts }
    })
  )

  return (
    <div>
      {/* 検索バー */}
      <SearchBar type="art" />

      <FullWidth>
        <TopNews />
      </FullWidth>

      <div style={{ marginBottom: '20px' }} />

      {tagArts.map(({ tag, arts }) => (
        arts.length >= 1 &&
        <div key={tag} className={css({ my: "lg !important" })}>
          <SectionTitle className={css({ my: "md !important" })}>
            <Link href={`/tag/${tag}`}>
              {tag}
            </Link>
          </SectionTitle>
          <ArtsList
            tag={tag}
            arts={arts}
          />
        </div>
      ))}
    </div >
  );
};

export default TopPage;