# dotenv読み込み
eval "$(cat .env <(echo) <(declare -x))"

# openapi.jsonをダウンロード

OPEN_API_JSON="$SEARCH_SERVER/openapi.json"

echo ":: download openapi.json from $OPEN_API_JSON"

if [ ! -e some_directory ]; then mkdir search-client ; fi
curl $OPEN_API_JSON -o ./search-client/openapi.json

# openapi.jsonからtsclientを生成

yarn run openapi-typescript ./search-client/openapi.json --output ./src/search/generated/search.ts
