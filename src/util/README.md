
# ユーティリティ

## クライアント用

### useMutate

```tsx

const save = useMutate(async ()=>{
  await handleSaveData() // Server Actionsの呼び出しなど
})

save.mutate // 引数に渡した関数を実行する
save.isLoading // ローディング中かどうか
save.isSuccess, // 成功したかどうか
save.isError, // エラーが発生したかどうか
save.error, // エラーが発生した時に発生したエラーが代入される

```

## サーバ用

### onlyDevelopPage

開発時(yarn dev実行時)のみ呼び出せるレイアウトやページを宣言する。
開発時以外はnotFoundを返す。

```ts

const DevelopPage = ()=>{
  onlyDevelopPage()
  return (
    ...
  )
}
export default DevelopPage

```

## 共通

### sleep

指定した秒数待機するasync関数。

```ts
import { sleep } from "@/util/sleep"


// async 関数内

console.log("start")
await sleep(3000)
console.log("end")
// endはstartが表示されてから3000ミリ秒後(3秒後)に表示される

```

### randomId

ランダムなIDを生成する関数。

```ts
import {} from "@/util/randomId"

const newRandomId = randomId()

```
