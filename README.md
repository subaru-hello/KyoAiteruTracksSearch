# 近くで走れる場所を検索できるアプリ

https://hurdle.biz
<img width="1481" alt="image" src="https://user-images.githubusercontent.com/79771445/206078471-461cf616-983d-4128-828f-639ea885cc33.png">

今日一般開放されている競技場を検索できるサービスです。　<br />
社会人アスリート（陸上競技を趣味としている方）向けに作成しました。 <br/>

### setup

```
yarn dev

cd functions
yarn serve
```

### 作成背景

川崎市中原区の等々力競技場で練習をしようと足を運んだ際、受付で「今日は個人向けに貸し出しはしていません」と言われて悔しい思いをしたことがきっかけです。<br />
また、他の都道府県へ遠征した時に、練習場所を探す時に苦労したこともあり、等々力競技場だけでなく全国の一般開放されている競技場情報が集約されていたら便利だな〜と思い全国版の作成を進めています。

### 機能概要

- 開放状況を一目で理解できるカレンダー機能
- マイページ機能 ※TODO
- ログイン・ログアウト機能
- ユーザー登録機能
- コメント追加機能 ※TODO
- 競技場検索機能
- 競技場一覧ページ
- 競技場詳細ページ
- よく行く競技場ボタン ※TODO

### 使用技術

- フロントエンド

```
React v18
Typescript
Vite
ChakraUI
```

- バックエンド

```
Firebase Storage
Firebase Cloud Firestore
Firebase Authentication
Firebase Functions
    typescript
    python
```

- インフラ

```
Firebase Hosting
```

- その他

```
Open API スキーマ駆動開発をした際に使用しました。
```

### テーブル設計

### データ収集方法

python を用いてデータを収集しました。<br/>
PDF で個人向けに開放されている日を管理している市区町村が多く存在していたため、サイトから PDF を取得し、CSV に書き起こす作業を python で実施しました。<br/>
方法を下記記事にまとめています。↓↓<br/>
https://zenn.dev/subaru_hello/articles/73253a46a76f7f <br/>

https://zenn.dev/subaru_hello/articles/570e9e990374a6 <br/>

https://zenn.dev/subaru_hello/articles/38624760719abf

`npx json-server --watch db.json --port 3100`
