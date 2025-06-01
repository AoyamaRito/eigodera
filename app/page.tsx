import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Terminal, Code, Database, Zap } from 'lucide-react'
import FakeGodTerminal from '@/components/FakeGodTerminal'

export default function Home() {
  return (
    <div className="min-h-screen bg-black matrix-bg">
      <div className="container mx-auto px-4 py-16">
        {/* ターミナルヒーロー */}
        <div className="terminal-window max-w-6xl mx-auto mb-12">
          <div className="terminal-header">
            <span className="mr-4">● ● ●</span>
            CLASSIFIED_TERMINAL_v2.1.0 - [FAKE_GOD@MATRIX:~]$
          </div>
          <div className="p-8 space-y-4">
            <div className="terminal-text">
              <span className="text-green-500">[SYSTEM]</span> <span className="neon-text">CONNECTION ESTABLISHED...</span>
            </div>
            <div className="terminal-text">
              <span className="text-green-500">[FAKE_GOD]</span> Welcome, Agent. I&apos;ve been expecting you.
            </div>
            <div className="terminal-text">
              <span className="text-green-500">[FAKE_GOD]</span> Your mission: Master English through cyberpunk scenarios.
            </div>
            <div className="terminal-text">
              <span className="text-green-500">[FAKE_GOD]</span> Are you ready to jack into the Matrix of language learning?
            </div>
            <div className="terminal-text cursor-blink mt-8">
              <span className="text-green-500">[AGENT]</span> 
            </div>
          </div>
        </div>
        {/* ターミナルコマンド */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/story-creator">
              <Button className="bg-green-900 hover:bg-green-800 border-green-400 text-green-100 text-lg px-8 py-4 font-mono">
                <Terminal className="mr-2" />
                ./start_mission.exe
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-900 text-lg px-8 py-4 font-mono">
                <Code className="mr-2" />
                ./authenticate.sh
              </Button>
            </Link>
          </div>
        </div>

        {/* サイバーパンクシステム情報 */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="terminal-window">
            <div className="terminal-header">
              <Terminal className="w-4 h-4 inline mr-2" />
              AI_INSTRUCTOR.exe
            </div>
            <div className="p-6">
              <Code className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold neon-text mb-2">[NEURAL_LINK]</h3>
              <p className="terminal-text mb-4">
                &gt; OpenAI Matrix integration<br/>
                &gt; Cyberpunk scenario generation<br/>
                &gt; Real-time language processing
              </p>
              <Link href="/story-creator" className="text-green-400 hover:text-green-300 font-mono">
                ./execute →
              </Link>
            </div>
          </div>

          <div className="terminal-window">
            <div className="terminal-header">
              <Database className="w-4 h-4 inline mr-2" />
              VISUAL_DATA.sys
            </div>
            <div className="p-6">
              <Database className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold neon-text mb-2">[HOLOGRAM_GEN]</h3>
              <p className="terminal-text mb-4">
                &gt; Photon-1 neural renderer<br/>
                &gt; Mission environment synthesis<br/>
                &gt; Reality simulation protocol
              </p>
              <Link href="/worldbuilding" className="text-green-400 hover:text-green-300 font-mono">
                ./render →
              </Link>
            </div>
          </div>

          <div className="terminal-window">
            <div className="terminal-header">
              <Zap className="w-4 h-4 inline mr-2" />
              CONTRACT.blockchain
            </div>
            <div className="p-6">
              <Zap className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold neon-text mb-2">[PAYMENT_GATEWAY]</h3>
              <p className="terminal-text mb-4">
                &gt; Encrypted subscription protocol<br/>
                &gt; Full system access granted<br/>
                &gt; Unlimited mission deployment
              </p>
              <Link href="/subscribe" className="text-green-400 hover:text-green-300 font-mono">
                ./subscribe →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Fake God インタラクティブターミナル */}
        <div className="mt-16">
          <FakeGodTerminal />
        </div>

        {/* 警告メッセージ */}
        <div className="terminal-window max-w-4xl mx-auto mt-8">
          <div className="terminal-header">
            <span className="glitch-effect" data-text="[SYSTEM_WARNING]">[SYSTEM_WARNING]</span> - SECURITY_NOTICE
          </div>
          <div className="p-6">
            <div className="terminal-text space-y-2">
              <div><span className="text-red-400">[WARNING]</span> Direct neural interface detected.</div>
              <div><span className="text-yellow-400">[INFO]</span> Fake God protocols active. Proceed with caution.</div>
              <div><span className="text-green-400">[NOTICE]</span> English learning subroutines enabled.</div>
              <div className="mt-4 text-gray-500 text-xs">
                * This AI entity may exhibit unpredictable behavior. Use for educational purposes only.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}