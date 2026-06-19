import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  BookOpen, 
  TestTubes,
  ArrowRight,
  Github,
  Sparkles,
  Code2
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Code2 className="w-5 h-5 text-background" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CodeReview AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Docs</Button>
            <Button variant="ghost" size="sm">GitHub</Button>
            <Link href="/generator">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Try Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="mx-auto bg-accent/20 text-accent border-accent/50">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Gemma 4 × Google Cloud
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              AI-Powered
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Code Review & Refactoring
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              複数のAIエージェントが協調して、セキュリティ、パフォーマンス、可読性を同時に分析。
              わずか30秒で、プロフェッショナルなコード改善提案を生成します。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/generator">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Sparkles className={`w-5 h-5 mr-2 transition-transform ${isHovered ? 'scale-110' : ''}`} />
                  今すぐ試す
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Github className="w-5 h-5 mr-2" />
                GitHub で見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">4つの専門エージェント</h2>
            <p className="text-muted-foreground text-lg">
              それぞれが異なる視点からコードを分析し、改善提案を生成します
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Security Agent */}
            <Card className="p-6 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">セキュリティ監査</h3>
              <p className="text-sm text-muted-foreground">
                SQL インジェクション、XSS、認証の問題など、セキュリティ脆弱性を検出
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-accent font-semibold">Gemma 4 26B MoE</span>
              </div>
            </Card>

            {/* Performance Agent */}
            <Card className="p-6 hover:border-secondary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">パフォーマンス最適化</h3>
              <p className="text-sm text-muted-foreground">
                アルゴリズムの改善、メモリ最適化、キャッシング機会を提案
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-accent font-semibold">Gemma 4 26B MoE</span>
              </div>
            </Card>

            {/* Readability Agent */}
            <Card className="p-6 hover:border-accent/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">可読性改善</h3>
              <p className="text-sm text-muted-foreground">
                変数命名、関数の複雑度、ドキュメント品質を向上
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-accent font-semibold">Gemma 4 26B MoE</span>
              </div>
            </Card>

            {/* Test Agent */}
            <Card className="p-6 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <TestTubes className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">テスト生成</h3>
              <p className="text-sm text-muted-foreground">
                ユニットテストを自動生成、エッジケースをカバー
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-accent font-semibold">Gemma 4 31B Dense</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">どのように動作するか</h2>
            <p className="text-muted-foreground text-lg">
              シンプルな3ステップで、プロフェッショナルなコード分析を実現
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="step1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="step1">1. アップロード</TabsTrigger>
                <TabsTrigger value="step2">2. 分析</TabsTrigger>
                <TabsTrigger value="step3">3. 結果確認</TabsTrigger>
              </TabsList>

              <TabsContent value="step1" className="space-y-4">
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">コードをアップロード</h3>
                  <p className="text-muted-foreground">
                    Python、JavaScript、Java、Go、Rust など複数の言語に対応。
                    ファイルをドラッグ&ドロップするだけ。
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="step2" className="space-y-4">
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-secondary animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">複数エージェントが並列実行</h3>
                  <p className="text-muted-foreground">
                    4つの専門エージェントが同時にコードを分析。
                    わずか30秒で全分析が完了します。
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="step3" className="space-y-4">
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">詳細なレポートを確認</h3>
                  <p className="text-muted-foreground">
                    セキュリティ、パフォーマンス、可読性、テストの
                    4つの視点から改善提案を確認できます。
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Google Cloud Next でデモ発表予定</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            このプロジェクトは、Google AI Dojo Japan 2026 での学習成果を活かし、
            Google Cloud Next 2026 でのデモ発表を目指しています。
          </p>
          <Link href="/generator">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              デモを試す <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-semibold">CodeReview AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by Gemma 4 & Google Cloud | Google AI Dojo Japan 2026
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
