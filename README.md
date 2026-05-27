# オリパ比較ランキング LP（oripa-rank_2）

オンラインオリパの主要5サービスを実利用で比較したランキングLP。リスティング広告流入を想定した1ページ型LP。

## ページ構成
- `index.html` ── メインLP（FV → 筆者紹介 → 目次 → 悩み解消①② → 比較表 → 1〜5位詳細 → 結論 → FAQ → 注意事項 → exit-intent モーダル）
- `company.html` ── 運営者情報
- `privacy-policy.html` ── プライバシーポリシー
- `research.html` ── 調査概要（評価項目の定義）

## ディレクトリ
```
dist/
├── index.html
├── company.html
├── privacy-policy.html
├── research.html
├── css/
│   ├── style.css   (メインLP用)
│   └── sub.css     (付属ページ用)
├── js/
│   └── scripts.js  (UTM引き継ぎ／スクロール深度／exit-intent モーダル)
└── images/
    ├── fv/         (ファーストビュー)
    ├── logos/      (各サービスロゴ・透過)
    ├── title/      (各案件メインビジュアル)
    ├── rank-icons/ (1〜5位の王冠アイコン)
    ├── eval-icons/ (◎◯△評価アイコン)
    ├── medals/    (旧メダルSVG)
    ├── conditions/ (5条件の根拠画像)
    ├── orikuji/    (1位章のSNS・還元率画像)
    ├── winners/    (旧スライダー画像)
    └── author.png  (筆者アイコン)
```

## デプロイ
任意のWebサーバーへ `dist/` 配下を丸ごとアップロードしてください。
動作確認：
```bash
python3 -m http.server 8000 --directory .
```

## 関連
- アフィリエイトCTAのURL（`https://example.com/aff/{サービス名}`）は本番デプロイ時に各ASPのリンクへ差し替え必須
- お問い合わせは Google フォーム（`https://forms.gle/geRa4AJEPbZ3bQkk7`）に集約
