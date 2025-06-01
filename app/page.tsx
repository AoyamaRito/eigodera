import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Camera, Star, Mic, Zap } from 'lucide-react'
import FakeGodTerminal from '@/components/FakeGodTerminal'

export default function Home() {
  return (
    <div className="min-h-screen bg-black matrix-bg">
      <div className="container mx-auto px-4 py-16">
        {/* スター・ヒーロー */}
        <div className="talent-card max-w-6xl mx-auto mb-12">
          <div className="talent-header">
            <span className="mr-4">● ● ●</span>
STAR_TALENT_AGENCY_v3.0 - [DIRECTOR@STUDIO:~]$
          </div>
          <div className="p-8 space-y-4">
            <div className="talent-text">
              <span className="text-yellow-500">[AGENCY]</span> <span className="golden-text">TALENT SCOUT CONNECTION...</span>
            </div>
            <div className="talent-text">
              <span className="text-yellow-500">[DIRECTOR]</span> Welcome, new talent. Ready for your big break?
            </div>
            <div className="talent-text">
              <span className="text-yellow-500">[DIRECTOR]</span> Your role: Master English through acting scenarios.
            </div>
            <div className="talent-text">
              <span className="text-yellow-500">[DIRECTOR]</span> Are you ready to step into the spotlight?
            </div>
            <div className="talent-text cursor-blink mt-8">
              <span className="text-yellow-500">[TALENT]</span> 
            </div>
          </div>
        </div>
        {/* アクションボタン */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/story-creator">
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 border-yellow-400 text-black text-lg px-8 py-4 font-semibold">
                <Camera className="mr-2" />
                オーディション開始
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-900/20 text-lg px-8 py-4 font-semibold">
                <Star className="mr-2" />
                事務所登録
              </Button>
            </Link>
          </div>
        </div>

        {/* 芸能事務所システム情報 */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="terminal-window">
            <div className="talent-header">
              <Camera className="w-4 h-4 inline mr-2" />
              ACTING_COACH.exe
            </div>
            <div className="p-6">
              <Star className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold neon-text mb-2">[演技指導AI]</h3>
              <p className="terminal-text mb-4">
                &gt; AI演技コーチ連携<br/>
                &gt; 映画シナリオ自動生成<br/>
                &gt; リアルタイム発音矯正
              </p>
              <Link href="/story-creator" className="text-green-400 hover:text-green-300 font-mono">
                ./execute →
              </Link>
            </div>
          </div>

          <div className="terminal-window">
            <div className="talent-header">
              <Mic className="w-4 h-4 inline mr-2" />
              STUDIO_SETUP.sys
            </div>
            <div className="p-6">
              <Mic className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold neon-text mb-2">[スタジオセット]</h3>
              <p className="terminal-text mb-4">
                &gt; AIイメージジェネレーター<br/>
                &gt; 映画セット自動構築<br/>
                &gt; バーチャル撮影スタジオ
              </p>
              <Link href="/worldbuilding" className="text-green-400 hover:text-green-300 font-mono">
                ./render →
              </Link>
            </div>
          </div>

          <div className="terminal-window">
            <div className="talent-header">
              <Zap className="w-4 h-4 inline mr-2" />
              CONTRACT.blockchain
            </div>
            <div className="p-6">
              <Zap className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold neon-text mb-2">[プロ契約]</h3>
              <p className="terminal-text mb-4">
                &gt; プロフェッショナルコース<br/>
                &gt; 全機能アクセス権付与<br/>
                &gt; 無制限オーディション
              </p>
              <Link href="/subscribe" className="text-green-400 hover:text-green-300 font-mono">
                ./subscribe →
              </Link>
            </div>
          </div>
        </div>
        
        {/* 演技監督 インタラクティブターミナル */}
        <div className="mt-16">
          <FakeGodTerminal />
        </div>

        {/* 警告メッセージ */}
        <div className="terminal-window max-w-4xl mx-auto mt-8">
          <div className="talent-header">
            <span className="glitch-effect" data-text="[AGENCY_NOTICE]">[AGENCY_NOTICE]</span> - TALENT_AGREEMENT
          </div>
          <div className="p-6">
            <div className="terminal-text space-y-2">
              <div><span className="text-red-400">[NOTICE]</span> プロの演技指導を受けています。</div>
              <div><span className="text-yellow-400">[INFO]</span> AI監督システムがアクティブです。</div>
              <div><span className="text-green-400">[SUCCESS]</span> 英語学習モードが有効です。</div>
              <div className="mt-4 text-gray-500 text-xs">
                * このAI監督は本格的な演技指導を行います。学習目的でご利用ください。
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}