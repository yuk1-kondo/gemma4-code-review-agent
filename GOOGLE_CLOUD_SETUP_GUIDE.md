# Google Cloud セットアップガイド
## AI-Powered Code Review & Refactoring Agent 向け

このガイドでは、Google Cloud で Gemma 4 を使用した複数エージェント実装をセットアップする手順を説明します。

---

## 📋 前提条件

- Google Cloud アカウント（無料トライアルまたは有料アカウント）
- `gcloud` CLI がインストール済み
- プロジェクトの基本的な理解

---

## 🎯 セットアップステップ

### ステップ 1: Google Cloud プロジェクトの作成

#### 1.1 Google Cloud Console にアクセス
```
https://console.cloud.google.com/
```

#### 1.2 新規プロジェクトを作成
1. ページ上部の **プロジェクト選択** をクリック
2. **新しいプロジェクト** をクリック
3. プロジェクト名を入力：`gemma4-code-review-agent`
4. **作成** をクリック

#### 1.3 プロジェクトが作成されるまで待機（1-2分）

---

### ステップ 2: 必要な API を有効化

#### 2.1 API ライブラリにアクセス
```
https://console.cloud.google.com/apis/library
```

#### 2.2 以下の API を有効化（各 API について以下の手順を繰り返す）

**必須 API：**
1. **Vertex AI API**
   - 検索: "Vertex AI API"
   - **有効にする** をクリック
   - 待機（2-3分）

2. **Generative Language API**
   - 検索: "Generative Language API"
   - **有効にする** をクリック
   - 待機（2-3分）

3. **Cloud Run API**
   - 検索: "Cloud Run API"
   - **有効にする** をクリック
   - 待機（1-2分）

4. **Cloud Build API**
   - 検索: "Cloud Build API"
   - **有効にする** をクリック
   - 待機（1-2分）

5. **Cloud Logging API**
   - 検索: "Cloud Logging API"
   - **有効にする** をクリック

#### 2.3 確認
```
https://console.cloud.google.com/apis/dashboard
```
上記 5 つの API が「有効」と表示されていることを確認

---

### ステップ 3: サービスアカウントの作成

#### 3.1 IAM & Admin にアクセス
```
https://console.cloud.google.com/iam-admin/serviceaccounts
```

#### 3.2 サービスアカウントを作成
1. **サービスアカウントを作成** をクリック
2. **サービスアカウント名**: `gemma4-agent-service`
3. **サービスアカウント ID**: 自動入力
4. **作成して続行** をクリック

#### 3.3 ロールを割り当て
以下のロールを追加：
- `Vertex AI User`
- `Generative Language API User`
- `Cloud Run Developer`
- `Cloud Build Editor`

1. **別のロールを追加** をクリック
2. 上記ロールを検索して選択
3. **続行** をクリック

#### 3.4 キーを作成
1. **キーを作成** をクリック
2. **キーのタイプ**: JSON を選択
3. **作成** をクリック
4. JSON ファイルが自動ダウンロード
5. **ファイルを安全に保管**（後で使用）

---

### ステップ 4: gcloud CLI の設定

#### 4.1 gcloud CLI をインストール
```bash
# macOS
brew install google-cloud-sdk

# Linux/Ubuntu
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

#### 4.2 gcloud を初期化
```bash
gcloud init
```

プロンプトに従う：
1. Google アカウントでログイン
2. プロジェクト選択: `gemma4-code-review-agent`
3. リージョン選択: `asia-northeast1`（東京）

#### 4.3 認証情報を設定
```bash
# サービスアカウントキーのパスを設定
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/downloaded-key.json"

# 確認
gcloud auth list
```

---

### ステップ 5: Gemma 4 API キーの取得

#### 5.1 Google AI Studio にアクセス
```
https://ai.google.dev/
```

#### 5.2 API キーを生成
1. **Get API Key** をクリック
2. **Create API key in new project** をクリック
3. API キーが生成される
4. **キーをコピー** して安全に保管

#### 5.3 環境変数に設定
```bash
export GEMMA_API_KEY="your-api-key-here"
```

---

### ステップ 6: プロジェクトの環境変数を設定

#### 6.1 `.env.local` ファイルを作成
```bash
cd /home/ubuntu/gemma4-weird-site-generator
cat > .env.local << EOF
# Google Cloud
GOOGLE_CLOUD_PROJECT=gemma4-code-review-agent
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
GOOGLE_CLOUD_REGION=asia-northeast1

# Gemma 4 API
GEMMA_API_KEY=your-api-key-here
GEMMA_MODEL=gemma-2-27b

# Agent Platform
AGENT_PLATFORM_ENDPOINT=https://asia-northeast1-aiplatform.googleapis.com

# Backend
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
EOF
```

#### 6.2 `.env.local` を `.gitignore` に追加
```bash
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "chore: add .env.local to gitignore"
git push origin main
```

---

### ステップ 7: バックエンド API の準備

#### 7.1 必要なパッケージをインストール
```bash
cd /home/ubuntu/gemma4-weird-site-generator

# Node.js パッケージ
pnpm add @google-cloud/aiplatform @google-cloud/vertexai axios ws

# Python パッケージ（ローカル開発用）
pip install google-cloud-aiplatform google-generativeai python-dotenv
```

#### 7.2 バックエンド構造を確認
```
server/
  ├── agents/
  │   ├── security-agent.ts
  │   ├── performance-agent.ts
  │   ├── readability-agent.ts
  │   └── test-agent.ts
  ├── services/
  │   ├── gemma-service.ts
  │   ├── agent-coordinator.ts
  │   └── code-analyzer.ts
  ├── routes/
  │   ├── analyze.ts
  │   └── status.ts
  └── index.ts
```

---

### ステップ 8: ローカル開発環境のテスト

#### 8.1 Gemma 4 API の接続テスト
```bash
cat > test-gemma.js << 'EOF'
const axios = require('axios');

const API_KEY = process.env.GEMMA_API_KEY;
const MODEL = 'gemma-2-27b';

async function testGemma() {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        contents: [{
          parts: [{
            text: "Hello, Gemma! What is your name?"
          }]
        }]
      },
      {
        headers: {
          'x-goog-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Gemma 4 API 接続成功！');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

testGemma();
EOF

node test-gemma.js
```

#### 8.2 Google Cloud 認証テスト
```bash
gcloud auth test
gcloud projects describe gemma4-code-review-agent
```

---

### ステップ 9: Cloud Run へのデプロイ準備

#### 9.1 Dockerfile を作成
```bash
cat > Dockerfile << 'EOF'
FROM node:22-alpine

WORKDIR /app

# パッケージをコピー
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

# ソースコードをコピー
COPY . .

# ビルド
RUN pnpm build

# ポート公開
EXPOSE 3000

# サーバー起動
CMD ["node", "dist/index.js"]
EOF
```

#### 9.2 `.dockerignore` を作成
```bash
cat > .dockerignore << 'EOF'
node_modules
npm-debug.log
.git
.gitignore
README.md
.env.local
.DS_Store
dist
EOF
```

---

### ステップ 10: 環境変数の確認チェックリスト

以下の情報が揃っていることを確認：

- [ ] Google Cloud プロジェクト ID: `gemma4-code-review-agent`
- [ ] サービスアカウントキー JSON ファイル
- [ ] Gemma 4 API キー
- [ ] gcloud CLI がインストール済み
- [ ] 必要な API が有効化済み
- [ ] `.env.local` ファイルが作成済み
- [ ] Node.js パッケージがインストール済み

---

## 🚀 次のステップ

### フェーズ 1: ローカル開発
```bash
# 環境変数を読み込む
source .env.local

# 開発サーバーを起動
pnpm dev

# 別のターミナルでバックエンド開発
cd server
pnpm dev
```

### フェーズ 2: Google Cloud へのデプロイ
```bash
# イメージをビルド
gcloud builds submit --tag gcr.io/gemma4-code-review-agent/code-review-agent

# Cloud Run にデプロイ
gcloud run deploy code-review-agent \
  --image gcr.io/gemma4-code-review-agent/code-review-agent \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --set-env-vars GEMMA_API_KEY=$GEMMA_API_KEY
```

### フェーズ 3: デモ最適化
- リアルタイムデータ表示の実装
- パフォーマンスチューニング
- エラーハンドリング

---

## 🔐 セキュリティベストプラクティス

### ✅ 推奨事項
- **API キーを `.env.local` に保管** - リポジトリにコミットしない
- **サービスアカウントキーを安全に保管** - 定期的にローテーション
- **最小限の権限を付与** - IAM ロールを必要最小限に
- **Cloud Audit Logs を有効化** - 全ての操作を記録

### ❌ 避けるべき事項
- **API キーをコードに埋め込む** - セキュリティリスク
- **本番環境で `.env.local` を使用** - Secret Manager を使用
- **サービスアカウントキーをリポジトリにコミット** - 絶対禁止

---

## 📊 コスト見積もり

| サービス | 無料枠 | 超過料金 |
|---------|--------|--------|
| Vertex AI | 100 万リクエスト/月 | $0.00025/リクエスト |
| Generative Language API | 60 リクエスト/分 | 従量課金 |
| Cloud Run | 200 万リクエスト/月 | $0.40/100 万リクエスト |
| Cloud Build | 120 分/日 | $0.0193/分 |

**推定月額コスト（デモ用）**: $5-20

---

## 🆘 トラブルシューティング

### エラー: `API not enabled`
```bash
# API を有効化
gcloud services enable aiplatform.googleapis.com
gcloud services enable generativelanguage.googleapis.com
```

### エラー: `Permission denied`
```bash
# サービスアカウントのロールを確認
gcloud projects get-iam-policy gemma4-code-review-agent
```

### エラー: `Invalid API key`
```bash
# API キーを再生成
# https://ai.google.dev/ にアクセス
# 新しいキーを生成して .env.local を更新
```

---

## 📚 参考リソース

- **Google Cloud Console**: https://console.cloud.google.com/
- **Vertex AI ドキュメント**: https://cloud.google.com/vertex-ai/docs
- **Gemma 4 ドキュメント**: https://ai.google.dev/gemma/docs
- **Cloud Run ドキュメント**: https://cloud.google.com/run/docs
- **gcloud CLI リファレンス**: https://cloud.google.com/sdk/gcloud

---

## ✅ セットアップ完了チェック

セットアップが完了したら、以下のコマンドで確認：

```bash
# Google Cloud プロジェクト確認
gcloud config get-value project

# API 有効化確認
gcloud services list --enabled

# サービスアカウント確認
gcloud iam service-accounts list

# Gemma 4 API テスト
node test-gemma.js
```

全て成功したら、**バックエンド開発を開始できます！** 🚀

