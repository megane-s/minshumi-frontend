
# ユーティリティ

## クライアント用

## サーバ用

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
