
# みんしゅみ

## インストール方法

1. git, nodejs, yarnをインストールする
2. 以下コマンドを実行

```shell

git clone https://github.com/megane-s/minshumi-frontend.git
cd minshumi-frontend

yarn
```

3. .envファイルを整理

データベースの接続情報などをリーダから取得し、`.envファイル`に登録します。

4. 各種拡張機能のインストール

VSCodeの推奨されている拡張機能がいくつかあります。

サイドバーの四角4つのマーク → サイドバー下の 推奨 に提示されているものすべてをインストールしてください。

## データ取得・更新に関するルール

![アーキテクチャ](./doc/image/アーキテクチャ.png)

- データの取得、更新などのサーバサイドロジック(model)を `/src/機能名/` ディレクトリ配下におき共通化する。 (サーバチームが担当)
- **データ取得**は基本的にサーバコンポーネントで行う。サーバコンポーネントから直接modelを呼ぶ。
- **データ更新時**はクライアントコンポーネントからサーバアクション経由でmodelを呼び出す。

詳しくは [データの取得と更新](./doc/データの取得と更新.md) を参照

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



