import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Music, Sparkles, Mic, Zap } from 'lucide-react'
import FakeGodTerminal from '@/components/FakeGodTerminal'

export default function Home() {
  return (
    <div className="min-h-screen bg-black matrix-bg">
      <div className="container mx-auto px-4 py-16">
        {/* リズムゲーム・ヒーロー */}
        <div className="proseka-card max-w-6xl mx-auto mb-12">
          <div className="proseka-header">
            <span className="mr-4">● ● ●</span>
英語リズムアカデミー v4.0 - ♫ [プロデューサー@ステージ] ♫
          </div>
          <div className="p-8 space-y-4">
            <div className="proseka-text">
              <span className="text-cyan-500">[プロデューサー]</span> <span className="proseka-title">リズムコネクション確立中...</span>
            </div>
            <div className="proseka-text">
              <span className="text-pink-500">[ミク]</span> ようこそ、新しい練習生！英語で歌う準備はいい？
            </div>
            <div className="proseka-text">
              <span className="text-purple-500">[プロデューサー]</span> あなたのミッション：リズムゲームで英語をマスターしよう！
            </div>
            <div className="proseka-text">
              <span className="text-yellow-500">[ミク]</span> パーフェクトなノートを出す準備はいい？
            </div>
            <div className="talent-text cursor-blink mt-8">
              <span className="text-cyan-500">[練習生]</span> 
            </div>
          </div>
        </div>
        {/* アクションボタン */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/story-creator">
              <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 border-none text-white text-lg px-8 py-4 font-semibold shadow-xl">
                <Music className="mr-2" />
リズムゲームを始める
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-purple-400 text-purple-600 hover:bg-purple-50 text-lg px-8 py-4 font-semibold">
                <Sparkles className="mr-2" />
アカデミーに入学する
              </Button>
            </Link>
          </div>
        </div>

        {/* 芸能事務所システム情報 */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="proseka-card">
            <div className="proseka-header">
              <Music className="w-4 h-4 inline mr-2" />
              RHYTHM_COACH.exe
            </div>
            <div className="p-6">
              <Sparkles className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold proseka-title mb-2">[音楽コーチAI]</h3>
              <p className="proseka-text mb-4">
                &gt; AI音楽コーチ連携<br/>
                &gt; リズムゲーム自動生成<br/>
                &gt; リアルタイム歌唱指導
              </p>
              <Link href="/story-creator" className="text-cyan-400 hover:text-pink-300 font-semibold">
                ♫ スタート ♫
              </Link>
            </div>
          </div>

          <div className="proseka-card">
            <div className="proseka-header">
              <Mic className="w-4 h-4 inline mr-2" />
              STAGE_SETUP.sys
            </div>
            <div className="p-6">
              <Mic className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold proseka-title mb-2">[ステージセット]</h3>
              <p className="proseka-text mb-4">
                &gt; AIステージジェネレーター<br/>
                &gt; ライブステージ自動構築<br/>
                &gt; バーチャルコンサートホール
              </p>
              <Link href="/worldbuilding" className="text-pink-400 hover:text-purple-300 font-semibold">
                ♫ ステージ ♫
              </Link>
            </div>
          </div>

          <div className="proseka-card">
            <div className="proseka-header">
              <Zap className="w-4 h-4 inline mr-2" />
              PREMIUM.subscription
            </div>
            <div className="p-6">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold proseka-title mb-2">[プレミアム]</h3>
              <p className="proseka-text mb-4">
                &gt; プレミアムコース<br/>
                &gt; 全機能アクセス権付与<br/>
                &gt; 無制限リズムゲーム
              </p>
              <Link href="/subscribe" className="text-yellow-400 hover:text-orange-300 font-semibold">
                ♫ プレミアム ♫
              </Link>
            </div>
          </div>
        </div>
        
        {/* リズムコーチ インタラクティブシステム */}
        <div className="mt-16">
          <FakeGodTerminal />
        </div>

        {/* 警告メッセージ */}
        <div className="proseka-card max-w-4xl mx-auto mt-8">
          <div className="proseka-header">
♫ RHYTHM_ACADEMY_NOTICE ♫ - TRAINING_AGREEMENT
          </div>
          <div className="p-6">
            <div className="proseka-text space-y-2">
              <div><span className="text-cyan-400">[NOTICE]</span> プロの音楽指導を受けています。</div>
              <div><span className="text-pink-400">[INFO]</span> AIリズムコーチがアクティブです。</div>
              <div><span className="text-purple-400">[SUCCESS]</span> 英語リズムモードが有効です。</div>
              <div className="mt-4 text-gray-500 text-xs">
                * このAIコーチは本格的なリズム指導を行います。学習目的でご利用ください。
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}