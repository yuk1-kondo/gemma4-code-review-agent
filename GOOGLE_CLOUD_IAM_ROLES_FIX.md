# Google Cloud IAM ロール修正ガイド

## 問題
セットアップガイドで指定した「Generative Language API User」ロールが見つからない場合があります。

---

## ✅ 正しい IAM ロール設定

### 推奨ロール構成（最小権限）

以下の **3つのロール** をサービスアカウントに割り当ててください：

| ロール名 | ロール ID | 説明 |
|---------|----------|------|
| **Vertex AI User** | `roles/aiplatform.user` | Vertex AI リソースへのアクセス |
| **AI Platform Developer** | `roles/ml.developer` | AI Platform 開発者権限 |
| **Service Account User** | `roles/iam.serviceAccountUser` | サービスアカウント利用権限 |

---

## 🔍 IAM ロールの検索方法

### 方法 1: Google Cloud Console で検索

1. **IAM & Admin** → **Roles** に移動
   ```
   https://console.cloud.google.com/iam-admin/roles
   ```

2. **検索ボックス** に以下を入力して検索：
   - `Vertex AI User`
   - `AI Platform Developer`
   - `Service Account User`

3. 各ロールをクリックして詳細を確認

### 方法 2: gcloud CLI で検索

```bash
# Vertex AI 関連のロールを一覧表示
gcloud iam roles list --filter="name:aiplatform"

# AI Platform 関連のロールを一覧表示
gcloud iam roles list --filter="name:ml"

# 特定のロールを検索
gcloud iam roles describe roles/aiplatform.user
```

### 方法 3: API リファレンスで確認

```
https://cloud.google.com/iam/docs/understanding-roles
```

上部の **検索ボックス** で「Vertex AI」または「AI Platform」を検索

---

## 🛠️ サービスアカウントにロールを割り当てる

### 方法 1: Google Cloud Console

1. **IAM & Admin** → **Service Accounts** に移動
   ```
   https://console.cloud.google.com/iam-admin/serviceaccounts
   ```

2. 作成したサービスアカウント（`gemma4-agent-service`）をクリック

3. **Permissions** タブをクリック

4. **Grant Access** をクリック

5. 以下のロールを追加：
   - `Vertex AI User` (roles/aiplatform.user)
   - `AI Platform Developer` (roles/ml.developer)
   - `Service Account User` (roles/iam.serviceAccountUser)

6. **Save** をクリック

### 方法 2: gcloud CLI

```bash
# プロジェクト ID を設定
export PROJECT_ID=gemma4-code-review-agent
export SERVICE_ACCOUNT=gemma4-agent-service@${PROJECT_ID}.iam.gserviceaccount.com

# ロールを割り当て
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

---

## 📋 API 別の必要なロール

### Vertex AI API
- `roles/aiplatform.user` - 基本的なアクセス
- `roles/aiplatform.admin` - 管理権限（不要な場合が多い）

### Generative Language API
- `roles/ml.developer` - 開発者権限
- または `roles/aiplatform.user` - Vertex AI 経由の場合

### Cloud Run API
- `roles/run.developer` - Cloud Run デプロイ権限

### Cloud Build API
- `roles/cloudbuild.builds.editor` - ビルド編集権限

---

## 🔐 セキュリティベストプラクティス

### ✅ 推奨
```bash
# 最小限のロールのみを割り当て
roles/aiplatform.user
roles/ml.developer
roles/iam.serviceAccountUser
```

### ❌ 避けるべき
```bash
# 過度な権限を避ける
roles/editor          # 全編集権限
roles/owner           # 全管理権限
roles/aiplatform.admin # 不要な管理権限
```

---

## 🧪 ロール割り当て後のテスト

### テスト 1: gcloud で認証確認
```bash
# サービスアカウントキーで認証
gcloud auth activate-service-account --key-file=/path/to/key.json

# 認証状態を確認
gcloud auth list

# プロジェクト情報を取得
gcloud projects describe gemma4-code-review-agent
```

### テスト 2: Vertex AI API へのアクセステスト
```bash
# Python でテスト
cat > test_vertex_ai.py << 'EOF'
from google.cloud import aiplatform
import os

# 認証情報を設定
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/path/to/key.json'

# Vertex AI を初期化
aiplatform.init(project='gemma4-code-review-agent', location='asia-northeast1')

# モデルリストを取得
models = aiplatform.Model.list()
print(f"✅ Vertex AI API アクセス成功！")
print(f"利用可能なモデル数: {len(list(models))}")
EOF

python test_vertex_ai.py
```

### テスト 3: Generative Language API へのアクセステスト
```bash
# Python でテスト
cat > test_gemma.py << 'EOF'
import google.generativeai as genai
import os

# API キーを設定
genai.configure(api_key=os.environ.get('GEMMA_API_KEY'))

# モデルをリスト
models = genai.list_models()
print("✅ Generative Language API アクセス成功！")
for model in models:
    print(f"  - {model.name}")
EOF

export GEMMA_API_KEY=your-api-key
python test_gemma.py
```

---

## 🆘 よくあるエラーと解決方法

### エラー: `Permission denied`
```
Error: (403) Forbidden
```
**原因**: ロールが割り当てられていない
**解決**:
```bash
# ロール割り当てを確認
gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:SERVICE_ACCOUNT"

# ロールを再割り当て
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=serviceAccount:SERVICE_ACCOUNT \
  --role=roles/aiplatform.user
```

### エラー: `Role not found`
```
Error: (400) Bad Request
```
**原因**: ロール名が誤っている
**解決**:
```bash
# 正しいロール名を検索
gcloud iam roles list --filter="name:aiplatform" --limit=20
```

### エラー: `Service account key not found`
```
Error: Could not load the default credentials
```
**原因**: `GOOGLE_APPLICATION_CREDENTIALS` が設定されていない
**解決**:
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
```

---

## 📚 参考リソース

- **IAM ロール一覧**: https://cloud.google.com/iam/docs/understanding-roles
- **Vertex AI IAM ロール**: https://cloud.google.com/iam/docs/roles-permissions/aiplatform
- **gcloud iam コマンド**: https://cloud.google.com/sdk/gcloud/reference/iam
- **サービスアカウント**: https://cloud.google.com/docs/authentication/getting-started

---

## ✅ チェックリスト

セットアップが完了したか確認：

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

全てチェックできたら、**バックエンド開発を開始できます！** 🚀

