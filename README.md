# 🤖 AI-Powered Code Review & Refactoring Agent

**Powered by Gemma 4 × Google Cloud**

複数のAIエージェントが協調して、セキュリティ、パフォーマンス、可読性、テストの4つの視点からコードを自動分析し、プロフェッショナルな改善提案を生成するWebアプリケーション。

Google AI Dojo Japan 2026 での学習成果を活かし、**Google Cloud Next 2026 でのデモ発表**を目指しています。

---

## 🎯 プロジェクト概要

| 項目 | 説明 |
|------|------|
| **プロジェクト名** | AI-Powered Code Review & Refactoring Agent |
| **対象** | 開発者向けAIツール |
| **デモ環境** | Google Cloud（Gemini Enterprise Agent Platform） |
| **開発環境** | M4 Pro 36GB（ローカル開発） |
| **イベント** | Google Cloud Next 2026 |

---

## ✨ 主な機能

### 🔒 セキュリティ監査
- SQL インジェクション脆弱性検出
- XSS 脆弱性検出
- 認証・認可の問題検出
- 暗号化の不足検出
- 危険な関数の使用検出

### ⚡ パフォーマンス最適化
- アルゴリズムの時間計算量分析
- メモリ使用量の最適化提案
- 不要なループ・計算の検出
- キャッシング機会の提案
- 並列化可能な処理の提案

### 📖 可読性改善
- 変数命名規則の改善提案
- 関数の長さ・複雑度の評価
- コメント・ドキュメント品質の評価
- コード構造・レイアウトの改善提案
- デッドコード検出

### 🧪 テスト生成
- ユニットテストの自動生成
- エッジケースの検出
- モック・スタブの生成
- テストカバレッジ計画
- 統合テストシナリオの提案

---

## 🚀 クイックスタート

### 前提条件

- Node.js 22+
- Python 3.9+
- pnpm または npm
- Google Cloud プロジェクト（オプション）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/gemma4-code-review-agent.git
cd gemma4-code-review-agent

# 依存関係をインストール
pnpm install

# 環境変数を設定
cp .env.example .env
# .env ファイルを編集して、Google Cloud 認証情報を設定
```

### 開発サーバー起動

```bash
# フロントエンド開発サーバー起動
pnpm dev

# ブラウザで開く
# http://localhost:5173
```

### バックエンド起動（オプション）

```bash
# Python 仮想環境を作成
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# または
venv\Scripts\activate  # Windows

# 依存関係をインストール
pip install -r requirements.txt

# バックエンド起動
python backend/main.py
```

---

## 📁 プロジェクト構造

```
gemma4-code-review-agent/
├── client/                          # フロントエンド (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # ランディングページ
│   │   │   └── Generator.tsx       # コード分析ページ
│   │   ├── components/             # UI コンポーネント
│   │   ├── hooks/                  # React カスタムフック
│   │   ├── contexts/               # React コンテキスト
│   │   ├── lib/                    # ユーティリティ関数
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   └── index.html
│
├── backend/                         # バックエンド (Python)
│   ├── agents/
│   │   ├── security_agent.py       # セキュリティ監査エージェント
│   │   ├── performance_agent.py    # パフォーマンス最適化エージェント
│   │   ├── readability_agent.py    # 可読性改善エージェント
│   │   ├── test_agent.py           # テスト生成エージェント
│   │   └── orchestrator.py         # エージェントオーケストレーター
│   ├── tools/
│   ├── config/
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── docs/                            # ドキュメント
│   ├── TECHNICAL_DESIGN.md
│   ├── GITHUB_SETUP_GUIDE.md
│   ├── GOOGLE_CLOUD_SETUP.md
│   └── API_REFERENCE.md
│
├── .gitignore
├── .env.example
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ 技術スタック

### フロントエンド
- **React** 19.2.1 - UI フレームワーク
- **Tailwind CSS** 4.1.14 - スタイリング
- **shadcn/ui** - UI コンポーネント
- **Framer Motion** 12.23.22 - アニメーション
- **Wouter** 3.3.5 - ルーティング
- **Recharts** 2.15.2 - データ可視化

### バックエンド
- **Python** 3.11
- **Agent Development Kit (ADK)** - エージェント開発
- **FastAPI** - Web フレームワーク
- **Gemma 4** - LLM（26B MoE, 31B Dense）
- **Google Cloud** - クラウドインフラ

### インフラ
- **Google Cloud Run** - サーバーレス実行
- **Gemini Enterprise Agent Platform** - エージェント実行
- **Cloud Storage** - ファイル保存
- **Firestore** - データベース
- **Cloud Logging** - ログ管理
- **Cloud Trace** - パフォーマンス分析

---

## 📖 ドキュメント

- **[技術設計書](./docs/TECHNICAL_DESIGN.md)** - システムアーキテクチャ、データモデル、デプロイメント戦略
- **[GitHub セットアップガイド](./GITHUB_SETUP_GUIDE.md)** - 複数端末での開発方法
- **[Google Cloud セットアップガイド](./docs/GOOGLE_CLOUD_SETUP.md)** - バックエンド統合
- **[API リファレンス](./docs/API_REFERENCE.md)** - API エンドポイント仕様

---

## 🚀 デプロイメント

### Manus でのデプロイ

```bash
# チェックポイント作成
manus-webdev save-checkpoint --description "Production release v1.0"

# Management UI から「Publish」ボタンをクリック
```

### Google Cloud へのデプロイ

```bash
# Docker イメージをビルド
gcloud builds submit --tag gcr.io/$PROJECT_ID/code-review-agent

# Cloud Run にデプロイ
gcloud run deploy code-review-agent \
  --image gcr.io/$PROJECT_ID/code-review-agent \
  --platform managed \
  --region us-central1
```

---

## 🧪 テスト

### フロントエンドテスト

```bash
# ビルド確認
pnpm run build

# 型チェック
pnpm run check
```

### バックエンドテスト

```bash
# ユニットテスト実行
pytest backend/tests/

# カバレッジ確認
pytest --cov=backend backend/tests/
```

---

## 🔄 開発フロー

### ブランチ戦略

```
main                    # 本番環境対応版
├── develop            # 開発ブランチ
│   ├── feature/*      # 新機能開発
│   ├── bugfix/*       # バグ修正
│   └── hotfix/*       # 緊急修正
```

### コミットメッセージ規則

[Conventional Commits](https://www.conventionalcommits.org/) に従います：

```bash
# 新機能
git commit -m "feat(security-agent): Add SQL injection detection"

# バグ修正
git commit -m "fix(frontend): Fix code upload error handling"

# ドキュメント更新
git commit -m "docs: Update GitHub setup guide"
```

---

## 🤝 貢献

このプロジェクトへの貢献を歓迎します！

1. フォークしてブランチを作成
2. 変更をコミット
3. Pull Request を作成

詳細は [GitHub セットアップガイド](./GITHUB_SETUP_GUIDE.md) を参照してください。

---

## 📊 プロジェクト進捗

### ✅ 完了

- [x] 技術設計書作成
- [x] フロントエンド実装（ホームページ＆ジェネレーターページ）
- [x] GitHub リポジトリセットアップ
- [x] ドキュメント作成

### 🔄 進行中

- [ ] Google Cloud バックエンド実装
- [ ] Agent Platform × Gemma 4 エージェント実装
- [ ] リアルタイムデータ表示機能
- [ ] CI/CD パイプライン設定

### 📅 予定

- [ ] デモ最適化（Google Cloud Next 向け）
- [ ] パフォーマンスチューニング
- [ ] セキュリティ監査
- [ ] 本番デプロイ

---

## 📞 サポート

問題が発生した場合は、[GitHub Issues](https://github.com/YOUR_USERNAME/gemma4-code-review-agent/issues) で報告してください。

---

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](./LICENSE) を参照してください。

---

## 🎓 参考資料

- **Google AI Dojo Japan 2026**: https://rsvp.withgoogle.com/events/google-ai-dojo-japan
- **Google Cloud Next 2026**: https://cloud.google.com/next
- **Gemma 4 ドキュメント**: https://ai.google.dev/gemma/docs/core
- **Agent Development Kit**: https://adk.dev/

---

## 👨‍💻 開発者

**Manus AI** - Google Cloud Next デモ向けプロジェクト

---

**Happy Coding! 🚀**

