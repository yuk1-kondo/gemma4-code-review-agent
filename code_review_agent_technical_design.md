# AI-Powered Code Review & Refactoring Agent
## 技術設計書 v1.0

---

## 📋 プロジェクト概要

**プロジェクト名**: AI-Powered Code Review & Refactoring Agent  
**目的**: Google Cloud Next 2026 デモ発表向けの、複数のGemma 4エージェントが協調してコード分析・改善提案を行うWebアプリケーション  
**対象**: 開発者向けAIツール  
**デモ環境**: Google Cloud（Gemini Enterprise Agent Platform）  
**開発環境**: M4 Pro 36GB（ローカル開発）

---

## 🏗️ システムアーキテクチャ

### **全体構成図**

```
┌─────────────────────────────────────────────────────────────┐
│                     ユーザーのブラウザ                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Frontend (React 19 + Tailwind CSS 4)                │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │ • Code Upload Component                         │ │  │
│  │  │ • Real-time Progress Display                    │ │  │
│  │  │ • Results Dashboard                             │ │  │
│  │  │ • Code Diff Viewer                              │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓ (HTTPS)                           │
├─────────────────────────────────────────────────────────────┤
│                    Google Cloud Platform                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  API Gateway / Cloud Run (Frontend Proxy)            │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Gemini Enterprise Agent Platform                    │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Agent Orchestrator                             │ │  │
│  │  │  • Request Routing                              │ │  │
│  │  │  • Result Aggregation                           │ │  │
│  │  │  • Context Management                           │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                      ↓                                │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │     Parallel Agent Execution                 │   │  │
│  │  ├──────────────────────────────────────────────┤   │  │
│  │  │ 🔒 Security Agent (Gemma 4 26B MoE)         │   │  │
│  │  │    • Vulnerability Detection                │   │  │
│  │  │    • Security Best Practices                │   │  │
│  │  ├──────────────────────────────────────────────┤   │  │
│  │  │ ⚡ Performance Agent (Gemma 4 26B MoE)      │   │  │
│  │  │    • Algorithm Analysis                     │   │  │
│  │  │    • Optimization Suggestions               │   │  │
│  │  ├──────────────────────────────────────────────┤   │  │
│  │  │ 📖 Readability Agent (Gemma 4 26B MoE)     │   │  │
│  │  │    • Code Style Improvement                 │   │  │
│  │  │    • Naming Convention                      │   │  │
│  │  ├──────────────────────────────────────────────┤   │  │
│  │  │ 🧪 Test Agent (Gemma 4 31B Dense)          │   │  │
│  │  │    • Unit Test Generation                   │   │  │
│  │  │    • Edge Case Detection                    │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                      ↓                                │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Result Aggregator                              │ │  │
│  │  │  • Merge Results                               │ │  │
│  │  │  • Generate Unified Report                     │ │  │
│  │  │  • Create Refactored Code                      │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Cloud Storage (GCS)                                │  │
│  │  • Uploaded Code Files                              │  │
│  │  • Analysis Results                                 │  │
│  │  • Generated Reports                                │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 技術スタック

### **フロントエンド**

| 技術 | バージョン | 用途 |
|------|-----------|------|
| React | 19.2.1 | UI フレームワーク |
| Tailwind CSS | 4.1.14 | スタイリング |
| shadcn/ui | Latest | UI コンポーネント |
| Framer Motion | 12.23.22 | アニメーション |
| Wouter | 3.3.5 | ルーティング |
| Recharts | 2.15.2 | データ可視化 |
| Lucide React | 0.453.0 | アイコン |

### **バックエンド（Google Cloud）**

| サービス | 用途 |
|---------|------|
| Gemini Enterprise Agent Platform | エージェント実行・オーケストレーション |
| Gemma 4 (26B MoE, 31B Dense) | LLM推論 |
| Cloud Run | API ホスティング |
| Cloud Storage (GCS) | ファイル保存 |
| Firestore | メタデータ・履歴保存 |
| Cloud Logging | 監視・デバッグ |
| Cloud Trace | パフォーマンス分析 |

### **開発ツール**

| ツール | 用途 |
|--------|------|
| Agent Development Kit (ADK) | エージェント開発・テスト |
| Ollama | ローカルGemma 4実行（開発用） |
| Docker | コンテナ化 |
| gcloud CLI | Google Cloud 管理 |
| Vite | フロントエンドビルド |

---

## 📊 データフロー

### **1. コードアップロード**

```
ユーザー
  ↓ (コードファイル)
Frontend (React)
  ↓ (FormData)
Cloud Run API
  ↓ (保存)
Cloud Storage (GCS)
  ↓ (参照)
Agent Orchestrator
```

### **2. エージェント実行**

```
Agent Orchestrator
  ↓ (並列実行)
┌─────────────────────────────────────┐
│ Security Agent (Gemma 4 26B MoE)   │
│ Performance Agent (Gemma 4 26B MoE)│
│ Readability Agent (Gemma 4 26B MoE)│
│ Test Agent (Gemma 4 31B Dense)     │
└─────────────────────────────────────┘
  ↓ (各エージェントが分析)
  ↓ (結果を集約)
Result Aggregator
  ↓ (統合レポート生成)
Firestore (結果保存)
```

### **3. 結果表示**

```
Frontend (React)
  ↓ (WebSocket / Server-Sent Events)
Cloud Run API
  ↓ (リアルタイム更新)
Firestore
  ↓ (結果取得)
Frontend (React)
  ↓ (ダッシュボード表示)
ユーザー
```

---

## 🤖 複数エージェント設計

### **Agent 1: Security Auditor（セキュリティ監査エージェント）**

**目的**: コードのセキュリティ脆弱性を検出

**入力**: ソースコード  
**出力**: セキュリティ問題リスト（重要度付き）

**分析項目**:
- SQL インジェクション脆弱性
- クロスサイトスクリプティング (XSS)
- 認証・認可の問題
- 暗号化の不足
- 危険な関数の使用

**プロンプト例**:
```
You are a security expert. Analyze the following code for security vulnerabilities.
Focus on:
1. SQL Injection risks
2. XSS vulnerabilities
3. Authentication/Authorization issues
4. Cryptography problems
5. Dangerous function usage

Provide findings with severity levels (Critical, High, Medium, Low).
```

---

### **Agent 2: Performance Optimizer（パフォーマンス最適化エージェント）**

**目的**: コードのパフォーマンス問題を検出・改善提案

**入力**: ソースコード  
**出力**: パフォーマンス改善提案リスト

**分析項目**:
- アルゴリズムの時間計算量
- メモリ使用量の最適化
- 不要なループ・計算
- キャッシング機会
- 並列化可能な処理

**プロンプト例**:
```
You are a performance optimization expert. Analyze the following code for performance issues.
Focus on:
1. Time complexity analysis
2. Memory optimization
3. Unnecessary loops/computations
4. Caching opportunities
5. Parallelization possibilities

Provide specific optimization suggestions with estimated performance improvements.
```

---

### **Agent 3: Readability Improver（可読性改善エージェント）**

**目的**: コードの可読性・保守性を向上

**入力**: ソースコード  
**出力**: 可読性改善提案リスト

**分析項目**:
- 変数命名規則
- 関数の長さ・複雑度
- コメント・ドキュメント
- コード構造・レイアウト
- デッドコード検出

**プロンプト例**:
```
You are a code quality expert. Analyze the following code for readability issues.
Focus on:
1. Variable naming conventions
2. Function length and complexity
3. Comments and documentation
4. Code structure and layout
5. Dead code detection

Provide specific suggestions to improve code readability and maintainability.
```

---

### **Agent 4: Test Generator（テスト生成エージェント）**

**目的**: ユニットテストを自動生成

**入力**: ソースコード  
**出力**: ユニットテストコード

**分析項目**:
- テストケース設計
- エッジケース検出
- モック・スタブ生成
- テストカバレッジ計画
- 統合テストシナリオ

**プロンプト例**:
```
You are a test engineer. Generate comprehensive unit tests for the following code.
Focus on:
1. Normal cases
2. Edge cases and boundary conditions
3. Error handling
4. Mock/stub setup
5. Test coverage

Generate tests in [Python/JavaScript/etc] using [pytest/Jest/etc].
```

---

## 🔄 エージェント間通信プロトコル

### **ADK Graph-based Workflow**

```python
from google.adk import Agent, Graph

# グラフベースのワークフロー定義
graph = Graph(name="code_review_workflow")

# ノード1: コード入力
graph.add_node("input", input_code)

# ノード2-5: 並列エージェント実行
graph.add_node("security", security_agent)
graph.add_node("performance", performance_agent)
graph.add_node("readability", readability_agent)
graph.add_node("test", test_agent)

# ノード6: 結果集約
graph.add_node("aggregator", result_aggregator)

# エッジ: データフロー
graph.add_edge("input", "security")
graph.add_edge("input", "performance")
graph.add_edge("input", "readability")
graph.add_edge("input", "test")

graph.add_edge("security", "aggregator")
graph.add_edge("performance", "aggregator")
graph.add_edge("readability", "aggregator")
graph.add_edge("test", "aggregator")

# 実行
results = graph.run()
```

---

## 💾 データモデル

### **Code Review Request**

```json
{
  "request_id": "uuid",
  "user_id": "user_123",
  "code_content": "string (source code)",
  "language": "python|javascript|java|go|rust",
  "file_name": "string",
  "timestamp": "ISO 8601",
  "status": "pending|processing|completed|failed"
}
```

### **Agent Analysis Result**

```json
{
  "agent_id": "security|performance|readability|test",
  "request_id": "uuid",
  "findings": [
    {
      "type": "string",
      "severity": "critical|high|medium|low",
      "description": "string",
      "line_number": "number",
      "suggestion": "string",
      "code_example": "string"
    }
  ],
  "execution_time_ms": "number",
  "model_used": "gemma-4-26b-moe|gemma-4-31b-dense"
}
```

### **Aggregated Report**

```json
{
  "request_id": "uuid",
  "summary": {
    "total_issues": "number",
    "critical_count": "number",
    "high_count": "number",
    "medium_count": "number",
    "low_count": "number"
  },
  "security_findings": [...],
  "performance_findings": [...],
  "readability_findings": [...],
  "test_suggestions": [...],
  "refactored_code": "string",
  "overall_score": "0-100",
  "generated_at": "ISO 8601"
}
```

---

## 🎨 フロントエンド ページ構成

### **Page 1: Upload Page**

- ファイルアップロード（ドラッグ&ドロップ対応）
- 言語選択
- 分析開始ボタン

### **Page 2: Processing Page**

- 複数エージェントの進捗表示（リアルタイム）
- 各エージェントのステータス（実行中/完了/エラー）
- 推定完了時間

### **Page 3: Results Dashboard**

- 総合スコア表示
- 問題の重要度別分類
- 各エージェントの結果タブ
- コード差分ビューア
- 生成されたテストコード表示

### **Page 4: Report Download**

- PDF レポート生成
- JSON エクスポート
- 改善されたコードのダウンロード
- シェアリンク生成

---

## 🚀 デプロイメント戦略

### **ローカル開発（M4 Pro 36GB）**

```bash
# 1. Gemma 4 26B MoE をダウンロード
ollama pull gemma4:26b-moe

# 2. ADK エージェント開発
adk agent build --name security-agent

# 3. ローカルテスト
adk agent run --local
```

### **Google Cloud デプロイ**

```bash
# 1. Google Cloud プロジェクト初期化
gcloud init
gcloud config set project YOUR_PROJECT_ID

# 2. Gemini Enterprise Agent Platform にデプロイ
adk agent deploy --project YOUR_PROJECT_ID --region us-central1

# 3. Cloud Run にフロントエンドをデプロイ
gcloud run deploy code-review-frontend \
  --source . \
  --platform managed \
  --region us-central1

# 4. API Gateway 設定
gcloud api-gateway apis create code-review-api
gcloud api-gateway api-configs create code-review-config \
  --api=code-review-api \
  --openapi-spec=openapi.yaml
```

---

## 📈 パフォーマンス目標

| メトリック | 目標 | 備考 |
|-----------|------|------|
| エージェント実行時間 | < 30秒 | 4エージェント並列実行 |
| API レスポンス時間 | < 5秒 | フロントエンド→バックエンド |
| ページロード時間 | < 2秒 | 初回ロード |
| 同時ユーザー数 | 100+ | Cloud Run オートスケール |

---

## 🔐 セキュリティ考慮事項

- **コード送信**: HTTPS 暗号化
- **データ保存**: GCS 暗号化（デフォルト）
- **認証**: Google OAuth 2.0
- **レート制限**: API Gateway で実装
- **ログ**: Cloud Logging で監視

---

## 📅 実装スケジュール

| フェーズ | 期間 | タスク |
|---------|------|-------|
| Phase 1 | Week 1 | フロントエンド基本構造 |
| Phase 2 | Week 1-2 | ローカルエージェント開発 |
| Phase 3 | Week 2-3 | Google Cloud 統合 |
| Phase 4 | Week 3-4 | デモ最適化・テスト |
| Phase 5 | Week 4 | Google Cloud Next デモ準備 |

---

## 🎯 成功指標

- ✅ 複数エージェントが並列実行される
- ✅ リアルタイムで進捗が表示される
- ✅ 30秒以内に分析結果が返される
- ✅ Google Cloud Next でデモが安定して動作する
- ✅ TOP 5 デモ発表に選ばれる

---

## 📚 参考リソース

- Agent Development Kit: https://adk.dev/
- Gemini Enterprise Agent Platform: https://cloud.google.com/products/gemini-enterprise-agent-platform
- Gemma 4 Documentation: https://ai.google.dev/gemma/docs/core
- Google Cloud Next 2026: https://cloud.google.com/next

