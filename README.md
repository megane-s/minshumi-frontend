
# みんしゅみ

## インストール方法

1. git, nodejs, yarnをインストールする
2. 以下コマンドを実行

```shell

git clone https://github.com/megane-s/minshumi-frontend.git
cd minshumi-frontend

yarn
```

## ユーティリティ

[こちらを参照](./src/util/README.md)

## スニペット(ショートカット)

### `.tsx` ファイル

[`.vscode/tsx.code-snippets`](./vscode/tsx.code-snippets) に登録してある。

#### ⭐ `component`, `fc`

Reactコンポーネントを定義する。

```tsx
import { FC } from "react"

interface ファイル名Prps{
}
export const ファイル名:FC<ファイル名Props> = ()=>{
    return (

    )
}

```

#### ⭐ `page`, `np`, `nextpage`

コンポーネントを定義する

```tsx
import { FC } from "react"

interface ファイル名Prps{
}
export const ファイル名:FC<ファイル名Props> = ()=>{
    return (

    )
}

```


#### ⭐ `useclient`, `uc`

`"use client"` のショートカット

```tsx
"use client"

```

#### ⭐ `useserver`, `us`

`"use server"` のショートカット

```tsx
"use server"

```


### `.ts` ファイル

[`.vscode/ts.code-snippets`](./vscode/ts.code-snippets) に登録してある。

#### ⭐ `useserver`, `us`

`"use server"` のショートカット

```ts
"use server"

```

#### ⭐ `serveronly`, `so`

```ts
import "server-only"

```



