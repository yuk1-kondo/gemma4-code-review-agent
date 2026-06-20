# Google Cloud IAM ロール 2026年最新情報

**最終更新**: 2026年6月19日
**検証済み**: Google Cloud 公式ドキュメント（Gemini Enterprise Agent Platform）

---

## ✅ 確認済み：2026年の IAM ロール命名は変わっていません

Google Cloud の IAM ロール命名規則は **2026年でも同じ** です。以下の情報は最新の Google Cloud ドキュメントで確認されています。

---

## 🎯 Gemma 4 × Agent Platform 用の推奨ロール構成

### 最小権限（推奨）

以下の **3つのロール** をサービスアカウントに割り当ててください：

| ロール名 | ロール ID | 説明 | 権限範囲 |
|---------|----------|------|--------|
| **Vertex AI User** | `roles/aiplatform.user` | Vertex AI リソースへの基本アクセス | 予測、モデル利用 |
| **AI Platform Developer** | `roles/ml.developer` | AI Platform 開発者権限 | モデル作成、デプロイ |
| **Service Account User** | `roles/iam.serviceAccountUser` | サービスアカウント利用権限 | 他のサービスの実行 |

### 管理者権限（開発・テスト用）

開発環境では、以下のロールで十分です：

| ロール名 | ロール ID | 説明 |
|---------|----------|------|
| **Vertex AI Administrator** | `roles/aiplatform.admin` | Vertex AI 全リソースへの完全アクセス |
| **Agent Platform Administrator** | `roles/aiplatform.admin` | Agent Platform 全リソースへの完全アクセス |

---

## 📋 2026年の Gemini Enterprise Agent Platform IAM ロール一覧

### Agent Platform 専用ロール

| ロール | ロール ID | 説明 |
|------|----------|------|
| Agent Platform Administrator | `roles/aiplatform.admin` | Agent Platform 全リソースへの完全アクセス |
| Agent Platform Developer | `roles/aiplatform.developer` | Agent Platform 開発者権限 |
| Agent Platform User | `roles/aiplatform.user` | Agent Platform ユーザー権限 |
| Agent Platform Viewer | `roles/aiplatform.viewer` | Agent Platform 閲覧権限 |

### Vertex AI ロール（Agent Platform の基盤）

| ロール | ロール ID | 説明 |
|------|----------|------|
| Vertex AI Administrator | `roles/aiplatform.admin` | 全リソースへの完全アクセス |
| Vertex AI User | `roles/aiplatform.user` | 基本的なアクセス |
| Vertex AI Viewer | `roles/aiplatform.viewer` | 閲覧のみ |

### AI Platform（従来）ロール

| ロール | ロール ID | 説明 |
|------|----------|------|
| AI Platform Developer | `roles/ml.developer` | AI Platform 開発者権限 |
| AI Platform Admin | `roles/ml.admin` | AI Platform 管理者権限 |

---

## 🔍 2026年の API 別ロール要件

### Generative Language API（Gemma 4）

**必要なロール:**
- `roles/aiplatform.user` - Vertex AI 経由でのアクセス
- または `roles/ml.developer` - AI Platform 経由でのアクセス

**補足**: 「Generative Language API User」という独立したロールは存在しません。
代わりに、上記のロールで Gemma 4 API へのアクセスが可能です。

### Vertex AI API

**必要なロール:**
- `roles/aiplatform.user` - 基本的なアクセス
- `roles/aiplatform.developer` - 開発者権限
- `roles/aiplatform.admin` - 管理者権限

### Cloud Run API（デプロイ用）

**必要なロール:**
- `roles/run.developer` - Cloud Run デプロイ権限
- `roles/run.admin` - Cloud Run 管理者権限

### Cloud Build API（ビルド用）

**必要なロール:**
- `roles/cloudbuild.builds.editor` - ビルド編集権限
- `roles/cloudbuild.admin` - Cloud Build 管理者権限

---

## 🛠️ サービスアカウント設定（2026年推奨）

### ステップ 1: gcloud CLI で設定（最新方法）

```bash
# 環境変数を設定
export PROJECT_ID=gemma4-code-review-agent
export SERVICE_ACCOUNT=gemma4-agent-service@${PROJECT_ID}.iam.gserviceaccount.com

# ロールを割り当て（最小権限）
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$SERVICE_ACCOUNT \
  --role=roles/aiplatform.user

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$SERVICE_ACCOUNT \
  --role=roles/ml.developer

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$SERVICE_ACCOUNT \
  --role=roles/iam.serviceAccountUser

# 確認
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:$SERVICE_ACCOUNT"
```

### ステップ 2: Google Cloud Console で設定

1. **IAM & Admin** → **Service Accounts** に移動
   ```
   https://console.cloud.google.com/iam-admin/serviceaccounts
   ```

2. サービスアカウント（`gemma4-agent-service`）をクリック

3. **Permissions** タブ → **Grant Access** をクリック

4. 以下のロールを追加：
   - `roles/aiplatform.user`
   - `roles/ml.developer`
   - `roles/iam.serviceAccountUser`

5. **Save** をクリック

---

## 🧪 2026年の検証方法

### テスト 1: gcloud で認証確認

```bash
# サービスアカウントキーで認証
gcloud auth activate-service-account --key-file=/path/to/key.json

# 認証状態を確認
gcloud auth list

# プロジェクト情報を取得
gcloud projects describe gemma4-code-review-agent

# ロール割り当てを確認
gcloud projects get-iam-policy gemma4-code-review-agent \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:*"
```

### テスト 2: Vertex AI API へのアクセステスト（Python）

```python
# test_vertex_ai_2026.py
from google.cloud import aiplatform
import os

# 認証情報を設定
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/path/to/key.json'

# Vertex AI を初期化（2026年の方法）
aiplatform.init(
    project='gemma4-code-review-agent',
    location='asia-northeast1'
)

# Agent Platform にアクセス
try:
    # エージェント一覧を取得
    agents = aiplatform.Agent.list()
    print("✅ Agent Platform アクセス成功！")
    print(f"利用可能なエージェント数: {len(list(agents))}")
except Exception as e:
    print(f"❌ エラー: {e}")
```

### テスト 3: Generative Language API へのアクセステスト（Python）

```python
# test_gemma_2026.py
import google.generativeai as genai
import os

# API キーを設定
genai.configure(api_key=os.environ.get('GEMMA_API_KEY'))

try:
    # モデルをリスト
    models = genai.list_models()
    print("✅ Generative Language API アクセス成功！")
    
    # Gemma 4 モデルを確認
    gemma_models = [m for m in models if 'gemma' in m.name.lower()]
    print(f"利用可能な Gemma モデル数: {len(gemma_models)}")
    for model in gemma_models:
        print(f"  - {model.name}")
except Exception as e:
    print(f"❌ エラー: {e}")
```

### テスト 4: Cloud Run デプロイテスト

```bash
# Cloud Run にデプロイ可能か確認
gcloud run deploy test-agent \
  --image gcr.io/gemma4-code-review-agent/test:latest \
  --platform managed \
  --region asia-northeast1 \
  --dry-run
```

---

## 📊 2026年の IAM ロール権限マッピング

### Gemma 4 コード分析エージェント用

```
┌─────────────────────────────────────────────────────┐
│ Service Account: gemma4-agent-service               │
├─────────────────────────────────────────────────────┤
│ Roles:                                              │
│ ├─ roles/aiplatform.user                            │
│ │  └─ Vertex AI リソースアクセス                     │
│ │     ├─ エージェント実行                           │
│ │     ├─ モデル推論                                 │
│ │     └─ 結果取得                                   │
│ │                                                   │
│ ├─ roles/ml.developer                               │
│ │  └─ AI Platform 開発権限                          │
│ │     ├─ モデル作成                                 │
│ │     ├─ デプロイ                                   │
│ │     └─ ジョブ実行                                 │
│ │                                                   │
│ └─ roles/iam.serviceAccountUser                     │
│    └─ サービスアカウント利用                        │
│       └─ 他のサービス実行                           │
└─────────────────────────────────────────────────────┘
```

---

## 🔐 2026年のセキュリティベストプラクティス

### ✅ 推奨事項

```bash
# 最小限のロールのみを割り当て
roles/aiplatform.user
roles/ml.developer
roles/iam.serviceAccountUser

# 定期的にロール割り当てを監査
gcloud projects get-iam-policy PROJECT_ID --format=json

# 不要なロールを削除
gcloud projects remove-iam-policy-binding PROJECT_ID \
  --member=serviceAccount:SERVICE_ACCOUNT \
  --role=OLD_ROLE
```

### ❌ 避けるべき事項

```bash
# 過度な権限を避ける
roles/editor          # 全編集権限
roles/owner           # 全管理権限
roles/aiplatform.admin # 本番環境では不要

# API キーをコードに埋め込まない
# サービスアカウントキーをリポジトリにコミットしない
```

---

## 📚 2026年の参考リソース

### 公式ドキュメント
- **Gemini Enterprise Agent Platform IAM**: https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control
- **Vertex AI IAM ロール**: https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform
- **AI Platform ロール**: https://docs.cloud.google.com/iam/docs/roles-permissions/ml
- **gcloud iam コマンド**: https://cloud.google.com/sdk/gcloud/reference/iam

### ブログ・記事
- **How to Secure Vertex AI in 2026**: https://medium.com/google-cloud/how-to-secure-vertex-ai-in-2026-the-minimum-security-baseline-for-generative-ai-on-google-cloud-cf7982b9ed7a
- **Deploy Gemma with Google Cloud**: https://ai.google.dev/gemma/docs/integrations/google-cloud

---

## ✅ 2026年チェックリスト

セットアップが完了したか確認：

- [ ] Google Cloud プロジェクトが作成済み
- [ ] 必要な API が有効化済み
- [ ] サービスアカウントが作成済み
- [ ] 以下のロールが割り当てられている：
  - [ ] `roles/aiplatform.user`
  - [ ] `roles/ml.developer`
  - [ ] `roles/iam.serviceAccountUser`
- [ ] サービスアカウントキー（JSON）がダウンロード済み
- [ ] `GOOGLE_APPLICATION_CREDENTIALS` が設定済み
- [ ] `gcloud auth list` で認証状態が確認できる
- [ ] Vertex AI API テストが成功
- [ ] Generative Language API テストが成功
- [ ] Cloud Run デプロイテストが成功

全てチェックできたら、**バックエンド開発を開始できます！** 🚀

---

## 🎯 結論

**2026年の Google Cloud IAM ロール命名は変わっていません。**

推奨ロール構成：
- `roles/aiplatform.user`
- `roles/ml.developer`
- `roles/iam.serviceAccountUser`

これらのロールで、Gemma 4 × Agent Platform を使用したコード分析エージェントを問題なく実行できます。

