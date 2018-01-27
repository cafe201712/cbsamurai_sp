# cbsamurai

きゃばサムライのスマホアプリ

- キャバ嬢とメッセージのやり取りができる
- キャバ嬢とのメッセージが盛り上がることで、来店につなげる集客ツール

## 要求事項

- git, node, npm, vue-cli, monaca CLI  がインストール済であること

## インストール

```
git clone https://github.com/cafe201712/cbsamurai_sp
cd cbsamurai_app

npm install
```

## 環境設定

config/*.env.js ファイル内の `API_HOST` を変更して、APIを実行するサーバを指定する。

- config/prod.env.jp  本番環境 or monaca デバッガ実行環境
- config/dev.env.jp   開発環境
- config/test.env.jp  テスト環境（現在未使用）

```
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  // API_HOST: '"https://cbsamurai.jp"',
  // API_HOST: '"http://192.168.1.37:8765"',
  API_HOST: '"http://localhost:8765"',   // ここに API の接続先ホストを指定する
  API_PATH: '"/api/v1/"'
}
```

## 動作確認

```
npm run dev
```

※ 事前に API の接続先であるウェブ版（cakephp）の cbsamurai を実行しておくこと

## monaca

monaca デバッガでの実行や、monaca でのビルド方法は以下の URL を参照

http://docs.monaca.io/ja/monaca_cli/samples/vue_onsen/