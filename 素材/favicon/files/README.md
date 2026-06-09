# favicon 一式（オリパ比較ナビ）

★評価をモチーフにした、紺地にゴールドの星のfaviconセットです。

## ファイル内容

| ファイル | 用途 |
|---|---|
| `favicon.ico` | 旧来のブラウザ用（16/32/48px を内包） |
| `favicon.svg` | モダンブラウザ用ベクター（どんな解像度でも鮮明） |
| `favicon-16x16.png` `favicon-32x32.png` `favicon-48x48.png` `favicon-96x96.png` | 各サイズPNG |
| `apple-touch-icon.png` | iOS（ホーム画面追加時）用 180×180 |
| `android-chrome-192x192.png` `android-chrome-512x512.png` | Android / PWA用 |
| `site.webmanifest` | PWA用マニフェスト |

## 設置手順

### 1. ファイルを配置

上記ファイルをサイトのルート（`https://lp1.oripa-rank.jp/` 直下）にアップロードします。

### 2. HTMLの `<head>` 内に以下を追加

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#1B2A4A">
```

## 補足

- ファイル名のサイズ（16x16 等）は実際の画像ピクセル数と一致しています。
- 反映されない場合はブラウザのキャッシュが原因のことが多いので、スーパーリロード（Ctrl/Cmd+Shift+R）やシークレットウィンドウで確認してください。
- 色を変えたい場合は `favicon.svg` 内の `fill`（紺=`#1B2A4A` / 星=`#F5B829` / 星の縁=`#C8860A`）を編集すれば、そこから全サイズを再書き出しできます。
