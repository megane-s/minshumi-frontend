// トップ画面

import { SectionTitle } from '@/components/SectionTitle';
import React from 'react';
import { getArtsWithTag } from '@/art/tag/getArts';
import { tags } from './tags';
import SearchBar from './search/art/SearchBar';

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
      <SearchBar />

      {/* ここに作品登録を促す画面やおすすめ作品を出す画面 */}

      {/* カルーセルここに入れる */}

      {/* 下部の空白 */}
      <div style={{ marginBottom: '20px' }}>
      </div>

      {tagArts.map(({ tag, arts }) => (
        <div key={tag}>
          <SectionTitle>{tag}</SectionTitle>
          {arts.map((art) => (
            <div key={art.artId}>

              {/* カルーセルここに入れる */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TopPage;