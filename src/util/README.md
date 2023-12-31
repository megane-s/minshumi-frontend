
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

### 認証ガード

認証が必須なページやサーバアクション向け。

- 認証が必須の **ページ** では `requireAuthPage()` を呼び出す。
- 認証が必須のServerActionは `routeHandler()` でサーバアクションをラップし、第2引数に `{ requireAuth: true }` を指定する

```tsx
// ページ向け
interface PageProps {
}
const ProfilePage = ({}:PageProps)=>{
    requireAuthPage() // { onNotLogin: { redirectTo: "/login"} } を指定してリダレクトさせることも可能
    return (
        ...
    )
}
export default ProfilePage

```

```ts
// Server Action向け
routeHandler(async ()=>{
  ...
}, {
  requireAuth: true,
})
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

### notImplementWarn notImplementError

```ts
// 実装されてない旨の警告を表示します。それ以外は何もしません。
notImplementWarn()

// メッセージを渡してデフォルトのメッセージを上書きできます。
notImplementWarn("xxx() はまだ実装されていません。")

// 実装されていない旨のエラーを発生させます。
notImplementError()

// メッセージを渡してデフォルトのメッセージを上書きできます。
notImplementError("xxx() はまだ実装されていません。")

```

