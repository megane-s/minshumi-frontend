// トップ画面

import { SectionTitle } from '@/components/SectionTitle';
import React from 'react';
import { getArtsWithTag } from '@/art/tag/getArts';
import { tags } from './tags';
import SearchBar from './search';

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
        <TextInput
          placeholder="作品やユーザを検索"
          size='xs'
          classNames={{ input: styles.textInput }}
        />
        <ActionIcon className={styles.actionIcon}>
          <IoMdSearch />
        </ActionIcon>
      </Flex> */}
      <SearchBar />

      {/* ここに作品登録を促す画面やおすすめ作品を出す画面 */}

      {/* カルーセルここに入れる */}
      {/* <Flex justify="center">
        <Image
          src={art.imageUrl}
          alt={art.title}
          width={1200}
          height={500} />
      </Flex> */}

      {/* 下部の空白 */}
      <div style={{ marginBottom: '20px' }}>
      </div>

      {tagArts.map(({ tag, arts }) => (
        <div key={tag}>
          <SectionTitle>{tag}</SectionTitle>
          {arts.map((art) => (
            <div key={art.artId}>

              {/* カルーセルここに入れる */}
              {/* <Flex justify="space-between" gap="xs" py="x1" rowGap="100px" columnGap="sm" >
                <LinkButton href="/tag">全て見る</LinkButton>
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  width={200}
                  height={100}
                />
              </Flex> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TopPage;