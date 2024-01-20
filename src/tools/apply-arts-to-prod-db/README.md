
# 準備

サービスアカウントを作成し、keyをbase64でエンコード
(`ENCODED_SERVICE_ACCOUNT_KEY_JSON` とします。)

```shell
cat 'service-account.json' | base64
```



# 作品のimport

```sql
use "minshumi-dev";

IMPORT INTO public."Art" ("artId", "title", "description", "imageUrl")
    CSV DATA (
        'gs://minshumi-art-data/Art.csv?AUTH=specified&CREDENTIALS=ENCODED_SERVICE_ACCOUNT_KEY_JSON'
    )
    WITH skip = '1';

```

# 作品タグのimport

```sql
use "minshumi-dev";

IMPORT INTO public."ArtTag" ("artId","tag","tagType")
    CSV DATA (
        'gs://minshumi-art-data/ArtTag.csv?AUTH=specified&CREDENTIALS=ENCODED_SERVICE_ACCOUNT_KEY_JSON'
    )
    WITH skip = '1';

```


