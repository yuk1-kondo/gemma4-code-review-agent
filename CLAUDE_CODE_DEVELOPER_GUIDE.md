# Claude Code 開発ガイド
## AI-Powered Code Review & Refactoring Agent

このガイドは、Claude Code（または他の開発者）がこのプロジェクトを継続開発するための完全な手順書です。

---

## 📋 プロジェクト概要

**プロジェクト名**: Gemma 4 Code Review & Refactoring Agent
**目的**: Google Cloud Next でのデモ発表向けに、Gemma 4 を使用した複数エージェント（セキュリティ、パフォーマンス、可読性、テスト生成）が協調してコード分析・改善提案を行うシステム

**リポジトリ**: https://github.com/yuk1-kondo/gemma4-code-review-agent

---

## 🚀 クイックスタート（5分）

### 1. リポジトリをクローン

```bash
git clone git@github.com:yuk1-kondo/gemma4-code-review-agent.git
cd gemma4-code-review-agent
```

### 2. 依存関係をインストール

```bash
# Node.js パッケージ
pnpm install

# Python パッケージ（ローカル開発用）
pip install google-cloud-aiplatform google-generativeai python-dotenv
```

### 3. 環境変数を設定

```bash
# .env.local ファイルを作成
cp .env.example.gcloud .env.local

# 以下の値を入力
# - GOOGLE_CLOUD_PROJECT
# - GOOGLE_APPLICATION_CREDENTIALS
# - GEMMA_API_KEY
```

### 4. 開発サーバーを起動

```bash
# フロントエンド
pnpm dev

# 別のターミナルでバックエンド（後で実装）
cd server
pnpm dev
```

---

## 📁 プロジェクト構造

```
gemma4-code-review-agent/
│
├── 📖 ドキュメント（必読）
│   ├── README.md                                    # プロジェクト概要
│   ├── GITHUB_SETUP_GUIDE.md                        # GitHub セットアップ
│   ├── GOOGLE_CLOUD_SETUP_GUIDE.md                  # Google Cloud セットアップ
│   ├── GOOGLE_CLOUD_IAM_ROLES_FIX.md               # IAM ロール トラブルシューティング
│   ├── GOOGLE_CLOUD_IAM_ROLES_2026_LATEST.md       # 2026年最新 IAM ロール情報
│   ├── code_review_agent_technical_design.md        # 技術設計書
│   ├── gemma4_technical_guide.md                    # Gemma 4 技術ガイド
│   └── CLAUDE_CODE_DEVELOPER_GUIDE.md              # このファイル
│
├── 🎨 フロントエンド（React 19 + Tailwind CSS 4）
│   ├── client/
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   └── __manus__/
│   │   │
│   │   └── src/
│   │       ├── pages/
│   │       │   ├── Home.tsx                        # ランディングページ
│   │       │   ├── Generator.tsx                   # コード分析ジェネレーター
│   │       │   └── NotFound.tsx
│   │       │
│   │       ├── components/
│   │       │   ├── ui/                             # shadcn/ui コンポーネント
│   │       │   ├── ErrorBoundary.tsx
│   │       │   └── ManusDialog.tsx
│   │       │
│   │       ├── contexts/
│   │       │   └── ThemeContext.tsx                # ダークモード管理
│   │       │
│   │       ├── hooks/
│   │       │   ├── useComposition.ts
│   │       │   ├── useMobile.tsx
│   │       │   └── usePersistFn.ts
│   │       │
│   │       ├── lib/
│   │       │   └── utils.ts
│   │       │
│   │       ├── App.tsx                             # ルーティング
│   │       ├── main.tsx                            # エントリーポイント
│   │       └── index.css                           # グローバルスタイル
│   │
│   └── index.html
│
├── 🚀 バックエンド（Node.js + Express）【次フェーズで実装】
│   ├── server/
│   │   ├── agents/
│   │   │   ├── security-agent.ts                   # セキュリティ分析エージェント
│   │   │   ├── performance-agent.ts                # パフォーマンス分析エージェント
│   │   │   ├── readability-agent.ts                # コード可読性分析エージェント
│   │   │   └── test-agent.ts                       # テスト生成エージェント
│   │   │
│   │   ├── services/
│   │   │   ├── gemma-service.ts                    # Gemma 4 API 統合
│   │   │   ├── agent-coordinator.ts                # エージェント調整
│   │   │   └── code-analyzer.ts                    # コード分析ロジック
│   │   │
│   │   ├── routes/
│   │   │   ├── analyze.ts                          # /api/analyze エンドポイント
│   │   │   └── status.ts                           # /api/status エンドポイント
│   │   │
│   │   └── index.ts                                # サーバーエントリーポイント
│   │
│   └── Dockerfile
│
├── ⚙️ 設定ファイル
│   ├── package.json                                # Node.js 依存関係
│   ├── pnpm-lock.yaml                              # pnpm ロックファイル
│   ├── tsconfig.json                               # TypeScript 設定
│   ├── vite.config.ts                              # Vite 設定
│   ├── .env.example.gcloud                         # 環境変数テンプレート
│   ├── .gitignore                                  # Git 無視ファイル
│   └── .prettierrc                                 # コードフォーマット設定
│
└── 📊 その他
    ├── .manus-logs/                                # ログファイル
    ├── .git/                                       # Git リポジトリ
    └── node_modules/                               # 依存関係（.gitignore に含まれる）
```

---

## 🎯 現在の進捗状況

### ✅ 完了した作業

1. **フロントエンド基本構造**
   - React 19 + Tailwind CSS 4 セットアップ
   - ホームページ（ランディング）実装
   - ジェネレーターページ（コード分析UI）実装
   - ダークモード対応
   - レスポンシブレイアウト

2. **ドキュメント作成**
   - 技術設計書
   - Google Cloud セットアップガイド
   - IAM ロール情報（2026年最新）
   - GitHub セットアップガイド

3. **GitHub リポジトリ管理**
   - リポジトリ初期化
   - SSH キー設定
   - 全ファイルをプッシュ

### ⏳ 次に実装する作業

1. **Google Cloud セットアップ**（開発者が実施）
   - プロジェクト作成
   - API 有効化
   - サービスアカウント作成
   - ロール割り当て

2. **バックエンド実装**（Claude Code が実施）
   - Gemma 4 API 統合
   - 複数エージェント実装
   - WebSocket/SSE でリアルタイム通信
   - エラーハンドリング

3. **デモ最適化**（最終段階）
   - パフォーマンスチューニング
   - デモシナリオ作成
   - Google Cloud Next 向け調整

---

## 🛠️ バックエンド開発タスク（Claude Code 向け）

### タスク 1: Gemma 4 API 統合（優先度: 🔴 高）

**ファイル**: `server/services/gemma-service.ts`

**実装内容**:
```typescript
// Gemma 4 API クライアント
// - API キー認証
// - リクエスト/レスポンス処理
// - エラーハンドリング
// - レート制限対応

export class GemmaService {
  async analyzeCode(code: string, language: string): Promise<string>
  async generatePrompt(analysisType: string): Promise<string>
  async parseResponse(response: string): Promise<AnalysisResult>
}
```

**参考資料**:
- `gemma4_technical_guide.md` - Gemma 4 技術詳細
- `code_review_agent_technical_design.md` - アーキテクチャ設計

---

### タスク 2: 複数エージェント実装（優先度: 🔴 高）

**ファイル**: 
- `server/agents/security-agent.ts`
- `server/agents/performance-agent.ts`
- `server/agents/readability-agent.ts`
- `server/agents/test-agent.ts`

**実装内容**:
```typescript
// 各エージェント
export class SecurityAgent {
  async analyze(code: string): Promise<SecurityAnalysis>
  // セキュリティ脆弱性検出
  // - SQL インジェクション
  // - XSS 脆弱性
  // - 認証・認可問題
}

export class PerformanceAgent {
  async analyze(code: string): Promise<PerformanceAnalysis>
  // パフォーマンス最適化提案
  // - アルゴリズム改善
  // - メモリ使用量最適化
  // - I/O 最適化
}

export class ReadabilityAgent {
  async analyze(code: string): Promise<ReadabilityAnalysis>
  // コード可読性改善
  // - 命名規則
  // - 関数分割
  // - ドキュメント
}

export class TestAgent {
  async generate(code: string): Promise<TestCode>
  // ユニットテスト自動生成
  // - テストケース作成
  // - エッジケース検出
}
```

**参考資料**:
- `code_review_agent_technical_design.md` - エージェント仕様

---

### タスク 3: エージェント調整（優先度: 🟡 中）

**ファイル**: `server/services/agent-coordinator.ts`

**実装内容**:
```typescript
// 複数エージェントの調整
export class AgentCoordinator {
  async executeAgents(code: string): Promise<CoordinatedAnalysis>
  // - 4つのエージェントを並列実行
  // - 結果を統合
  // - 優先度付け

  async streamResults(code: string): AsyncIterable<AgentResult>
  // - WebSocket/SSE でリアルタイム配信
  // - 進捗表示
}
```

---

### タスク 4: API エンドポイント実装（優先度: 🟡 中）

**ファイル**: `server/routes/analyze.ts`

**実装内容**:
```typescript
// POST /api/analyze
// リクエスト:
{
  code: string,
  language: string,
  options?: {
    enableSecurity: boolean,
    enablePerformance: boolean,
    enableReadability: boolean,
    enableTest: boolean
  }
}

// レスポンス:
{
  id: string,
  status: "processing" | "completed" | "error",
  results: {
    security: SecurityAnalysis,
    performance: PerformanceAnalysis,
    readability: ReadabilityAnalysis,
    tests: TestCode
  },
  timestamp: string
}
```

---

### タスク 5: リアルタイム通信実装（優先度: 🟡 中）

**ファイル**: `server/index.ts`

**実装内容**:
```typescript
// WebSocket または Server-Sent Events (SSE)
// - エージェント進捗のリアルタイム配信
// - フロントエンドで進捗バーを更新

// イベント例:
// - "agent_started": エージェント開始
// - "agent_progress": 進捗更新
// - "agent_completed": エージェント完了
// - "analysis_complete": 全分析完了
```

---

## 📝 開発ワークフロー

### ステップ 1: ブランチを作成

```bash
# メインブランチから新しいブランチを作成
git checkout -b feature/backend-agents

# または
git checkout -b fix/agent-coordinator
```

### ステップ 2: コードを実装

```bash
# ファイルを編集
# 例: server/agents/security-agent.ts

# コードをフォーマット
pnpm format

# TypeScript チェック
pnpm check
```

### ステップ 3: コミットしてプッシュ

```bash
# ステージングに追加
git add server/agents/security-agent.ts

# コミット（Conventional Commits 規則）
git commit -m "feat: implement security agent for code analysis"

# プッシュ
git push origin feature/backend-agents
```

### ステップ 4: Pull Request を作成

GitHub でプルリクエストを作成し、レビューを依頼

---

## 🔧 開発環境セットアップ

### 前提条件

- Node.js 22.x
- pnpm 10.x
- Python 3.11+
- Git
- Google Cloud アカウント

### セットアップコマンド

```bash
# 1. リポジトリをクローン
git clone git@github.com:yuk1-kondo/gemma4-code-review-agent.git
cd gemma4-code-review-agent

# 2. 依存関係をインストール
pnpm install

# 3. 環境変数を設定
cp .env.example.gcloud .env.local
# .env.local を編集して、Google Cloud 認証情報を入力

# 4. Google Cloud セットアップ（初回のみ）
# GOOGLE_CLOUD_SETUP_GUIDE.md を参照

# 5. 開発サーバーを起動
pnpm dev

# 6. 別のターミナルでバックエンド開発（後で）
cd server
pnpm dev
```

---

## 📚 ファイル別開発ガイド

### server/services/gemma-service.ts

**目的**: Gemma 4 API との通信

**実装ポイント**:
- API キー認証（環境変数から読み込み）
- リクエスト/レスポンス処理
- エラーハンドリング（API エラー、タイムアウト）
- レート制限対応（バックオフ戦略）

**テスト方法**:
```bash
# Gemma 4 API テスト
node test-gemma.js
```

---

### server/agents/security-agent.ts

**目的**: コードのセキュリティ脆弱性を検出

**実装ポイント**:
- Gemma 4 に「セキュリティ分析」プロンプトを送信
- 結果をパース
- 脆弱性を構造化データに変換

**プロンプト例**:
```
Analyze this code for security vulnerabilities:
- SQL injection risks
- XSS vulnerabilities
- Authentication/Authorization issues
- Sensitive data exposure
- Insecure dependencies

Code:
[USER_CODE]

Provide structured analysis with severity levels.
```

---

### server/routes/analyze.ts

**目的**: コード分析 API エンドポイント

**実装ポイント**:
- リクエスト検証
- エージェント調整を呼び出し
- レスポンスを返す

**エラーハンドリング**:
- 無効なコード → 400 Bad Request
- API エラー → 500 Internal Server Error
- タイムアウト → 504 Gateway Timeout

---

## 🧪 テスト方法

### ユニットテスト

```bash
# テスト実行
pnpm test

# 特定のファイルをテスト
pnpm test server/agents/security-agent.ts

# カバレッジを確認
pnpm test:coverage
```

### 統合テスト

```bash
# 開発サーバーを起動
pnpm dev

# 別のターミナルでテスト
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SELECT * FROM users WHERE id = 1",
    "language": "sql"
  }'
```

### デバッグ

```bash
# デバッグモードで起動
DEBUG=* pnpm dev

# Chrome DevTools で検査
# chrome://inspect
```

---

## 🚀 デプロイメント

### ローカル開発環境

```bash
pnpm dev
```

### Google Cloud Run へのデプロイ

```bash
# イメージをビルド
gcloud builds submit --tag gcr.io/gemma4-code-review-agent/code-review-agent

# Cloud Run にデプロイ
gcloud run deploy code-review-agent \
  --image gcr.io/gemma4-code-review-agent/code-review-agent \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated
```

---

## 📊 コード規則

### Conventional Commits

```bash
# フィーチャー追加
git commit -m "feat: add security agent implementation"

# バグ修正
git commit -m "fix: resolve agent timeout issue"

# ドキュメント
git commit -m "docs: update API documentation"

# スタイル
git commit -m "style: format code with prettier"

# リファクタリング
git commit -m "refactor: simplify agent coordinator logic"

# テスト
git commit -m "test: add unit tests for gemma service"
```

### TypeScript コード規則

```typescript
// ファイル名: kebab-case
// security-agent.ts

// クラス名: PascalCase
export class SecurityAgent {
  // メソッド名: camelCase
  async analyzeCode(code: string): Promise<SecurityAnalysis> {
    // 変数名: camelCase
    const vulnerabilities: Vulnerability[] = [];
    
    // 定数名: UPPER_SNAKE_CASE
    const MAX_CODE_SIZE = 100000;
  }
}

// インターフェース名: PascalCase with I prefix（オプション）
interface IAnalysisResult {
  id: string;
  results: AnalysisData;
}
```

---

## 🔐 セキュリティ

### API キー管理

```bash
# ❌ 絶対にしてはいけないこと
export GEMMA_API_KEY="sk-..." # コードに埋め込まない

# ✅ 正しい方法
# .env.local に設定
GEMMA_API_KEY=sk-...

# コードでは環境変数から読み込み
const apiKey = process.env.GEMMA_API_KEY;
```

### サービスアカウント認証

```bash
# ❌ キーをリポジトリにコミットしない
git add service-account-key.json  # 絶対禁止

# ✅ .gitignore に追加
echo "service-account-key.json" >> .gitignore

# 環境変数で指定
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

---

## 📞 トラブルシューティング

### エラー: `GOOGLE_APPLICATION_CREDENTIALS not set`

```bash
# 環境変数を確認
echo $GOOGLE_APPLICATION_CREDENTIALS

# 設定
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

### エラー: `Permission denied` (IAM)

```bash
# IAM ロール割り当てを確認
gcloud projects get-iam-policy gemma4-code-review-agent \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:*"

# ロール割り当て
gcloud projects add-iam-policy-binding gemma4-code-review-agent \
  --member=serviceAccount:gemma4-agent-service@gemma4-code-review-agent.iam.gserviceaccount.com \
  --role=roles/aiplatform.user
```

### エラー: `Gemma 4 API timeout`

```bash
# タイムアウト値を増加
// server/services/gemma-service.ts
const TIMEOUT = 60000; // 60秒

// リトライロジック
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}
```

---

## 📚 参考資料

### プロジェクト内ドキュメント
- `README.md` - プロジェクト概要
- `code_review_agent_technical_design.md` - 技術設計書
- `gemma4_technical_guide.md` - Gemma 4 技術ガイド
- `GOOGLE_CLOUD_SETUP_GUIDE.md` - Google Cloud セットアップ
- `GOOGLE_CLOUD_IAM_ROLES_2026_LATEST.md` - IAM ロール情報

### 外部リソース
- **Gemma 4 ドキュメント**: https://ai.google.dev/gemma/docs
- **Vertex AI ドキュメント**: https://cloud.google.com/vertex-ai/docs
- **Google Cloud Run**: https://cloud.google.com/run/docs
- **Express.js**: https://expressjs.com/
- **TypeScript**: https://www.typescriptlang.org/

---

## ✅ 開発チェックリスト

バックエンド開発を開始する前に確認：

- [ ] リポジトリをクローン済み
- [ ] `pnpm install` で依存関係をインストール済み
- [ ] `.env.local` ファイルを作成済み
- [ ] Google Cloud セットアップが完了済み
- [ ] `gcloud auth activate-service-account` で認証済み
- [ ] Gemma 4 API テストが成功
- [ ] `pnpm dev` でフロントエンドが起動確認済み
- [ ] Git ブランチを作成済み

全てチェックできたら、**バックエンド開発を開始できます！** 🚀

---

## 🎯 開発優先度

### Phase 1: コア機能（Week 1-2）
1. ✅ Gemma 4 API 統合
2. ✅ セキュリティエージェント実装
3. ✅ パフォーマンスエージェント実装
4. ✅ 可読性エージェント実装
5. ✅ テスト生成エージェント実装

### Phase 2: 統合（Week 2-3）
1. エージェント調整実装
2. API エンドポイント実装
3. リアルタイム通信実装
4. エラーハンドリング

### Phase 3: デモ最適化（Week 3-4）
1. パフォーマンスチューニング
2. デモシナリオ作成
3. Google Cloud Next 向け調整
4. 最終テスト

---

## 💬 質問・問題がある場合

1. **ドキュメントを確認**
   - `code_review_agent_technical_design.md`
   - `GOOGLE_CLOUD_SETUP_GUIDE.md`

2. **GitHub Issues を作成**
   - 問題の詳細を記述
   - エラーログを添付

3. **Git ブランチで作業**
   - `feature/` プレフィックスで新機能
   - `fix/` プレフィックスでバグ修正

---

**Happy Coding! 🚀**

このガイドに従って、素晴らしいプロダクトを作成してください！
Google Cloud Next でのデモ発表を楽しみにしています！

