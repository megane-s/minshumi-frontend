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

export const revalidate = 12 * 3600 // キャッシュの有効期間を12時間とする

const TopPage = async () => {
  const tagArts = await Promise.all(
    tags.map(async tag => {
      const arts = await getArtsWithTag(tag, { limit: 7 })
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

      {tagArts.map(({ tag, arts }, index) => (
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
            imagePriority={index <= 2}
          />
        </div>
      ))}
    </div >
  );
};

export default TopPage
