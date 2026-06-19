import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Sparkles, 
  Shield, 
  Zap, 
  BookOpen, 
  TestTubes,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

interface AgentStatus {
  name: string;
  icon: React.ReactNode;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  findings?: number;
}

export default function Generator() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [agents, setAgents] = useState<AgentStatus[]>([
    { name: "Security Auditor", icon: <Shield className="w-4 h-4" />, status: "pending", progress: 0 },
    { name: "Performance Optimizer", icon: <Zap className="w-4 h-4" />, status: "pending", progress: 0 },
    { name: "Readability Improver", icon: <BookOpen className="w-4 h-4" />, status: "pending", progress: 0 },
    { name: "Test Generator", icon: <TestTubes className="w-4 h-4" />, status: "pending", progress: 0 },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("コードを入力してください");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // シミュレーション: エージェントが順番に処理を開始
    const agentNames = ["Security Auditor", "Performance Optimizer", "Readability Improver", "Test Generator"];
    
    for (let i = 0; i < agentNames.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAgents(prev => prev.map((agent, idx) => {
        if (idx === i) {
          return { ...agent, status: "processing", progress: 0 };
        }
        return agent;
      }));

      // プログレス更新
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setAgents(prev => prev.map((agent, idx) => {
          if (idx === i) {
            return { ...agent, progress: Math.min(progress, 100) };
          }
          return agent;
        }));
      }

      // 完了
      setAgents(prev => prev.map((agent, idx) => {
        if (idx === i) {
          return { 
            ...agent, 
            status: "completed", 
            progress: 100,
            findings: Math.floor(Math.random() * 10) + 3
          };
        }
        return agent;
      }));
    }

    setIsAnalyzing(false);
    setAnalysisComplete(true);
    toast.success("分析が完了しました！");
  };

  const overallScore = analysisComplete 
    ? Math.floor(Math.random() * 40 + 60) 
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Code Review AI</h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Upload & Code Input */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">コードをアップロード</h2>
              
              <div className="space-y-4">
                {/* Language Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">プログラミング言語</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="java">Java</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>

                {/* File Upload */}
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".py,.js,.ts,.java,.go,.rs,.cpp"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">ファイルをドラッグ&ドロップ</p>
                    <p className="text-xs text-muted-foreground">または クリックして選択</p>
                  </label>
                </div>

                {/* Code Textarea */}
                <div>
                  <label className="text-sm font-medium mb-2 block">またはコードを直接入力</label>
                  <textarea 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="コードをここに貼り付けてください..."
                    className="w-full h-48 px-3 py-2 rounded-lg border border-border bg-card text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Analyze Button */}
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !code.trim()}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isAnalyzing ? "分析中..." : "分析を開始"}
                </Button>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-4 bg-card/50">
              <h3 className="font-semibold text-sm mb-2">💡 ヒント</h3>
              <p className="text-xs text-muted-foreground">
                複数のエージェントが並列で実行され、セキュリティ、パフォーマンス、可読性、テストの4つの視点から分析します。
              </p>
            </Card>
          </div>

          {/* Right: Analysis Progress & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Status Cards */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">分析エージェント</h2>
              
              <div className="space-y-4">
                {agents.map((agent, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {agent.icon}
                        <span className="font-medium">{agent.name}</span>
                      </div>
                      {agent.status === "completed" && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          完了
                        </Badge>
                      )}
                      {agent.status === "processing" && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 animate-pulse">
                          <Sparkles className="w-3 h-3 mr-1" />
                          実行中
                        </Badge>
                      )}
                      {agent.status === "pending" && (
                        <Badge variant="outline">待機中</Badge>
                      )}
                    </div>
                    <Progress value={agent.progress} className="h-2" />
                    {agent.findings && (
                      <p className="text-xs text-muted-foreground">
                        {agent.findings} 件の指摘を検出
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Results */}
            {analysisComplete && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">分析結果</h2>
                
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="summary">概要</TabsTrigger>
                    <TabsTrigger value="security">セキュリティ</TabsTrigger>
                    <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
                    <TabsTrigger value="readability">可読性</TabsTrigger>
                    <TabsTrigger value="tests">テスト</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="space-y-4 mt-4">
                    <div className="text-center py-8">
                      <div className="text-6xl font-bold text-primary mb-2">{overallScore}</div>
                      <p className="text-muted-foreground">総合スコア</p>
                      <Progress value={overallScore} className="mt-4 h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 bg-card/50">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="font-semibold">重大</span>
                        </div>
                        <p className="text-2xl font-bold">2</p>
                      </Card>
                      <Card className="p-4 bg-card/50">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">警告</span>
                        </div>
                        <p className="text-2xl font-bold">5</p>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      {[
                        { severity: "critical", title: "SQL インジェクション脆弱性", line: 42 },
                        { severity: "high", title: "入力値の検証不足", line: 67 },
                      ].map((item, idx) => (
                        <Card key={idx} className="p-4 bg-card/50">
                          <div className="flex items-start gap-3">
                            <Badge className={item.severity === "critical" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}>
                              {item.severity === "critical" ? "重大" : "警告"}
                            </Badge>
                            <div>
                              <p className="font-semibold">{item.title}</p>
                              <p className="text-xs text-muted-foreground">Line {item.line}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-4 mt-4">
                    <Card className="p-4 bg-card/50">
                      <p className="font-semibold mb-2">ループの最適化提案</p>
                      <p className="text-sm text-muted-foreground">Line 23-31: O(n²) のループを O(n log n) に改善可能</p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="readability" className="space-y-4 mt-4">
                    <Card className="p-4 bg-card/50">
                      <p className="font-semibold mb-2">変数命名の改善</p>
                      <p className="text-sm text-muted-foreground">変数 'x' を 'user_id' に変更することを推奨</p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tests" className="space-y-4 mt-4">
                    <Card className="p-4 bg-card/50">
                      <p className="font-semibold mb-2">生成されたテストコード</p>
                      <pre className="text-xs bg-background p-3 rounded mt-2 overflow-auto max-h-48">
{`def test_user_validation():
    assert validate_user(None) == False
    assert validate_user("") == False
    assert validate_user("valid_user") == True`}
                      </pre>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Download Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                  <Button variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    コピー
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    PDF ダウンロード
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
