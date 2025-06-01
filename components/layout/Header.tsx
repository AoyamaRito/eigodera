'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { Music, User, Sparkles, Menu, X, Power, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        setUserId(user?.id || null);
      }
    };
    
    checkAuth();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-4 border-gradient-to-r from-cyan-400 to-pink-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover:opacity-80 transition-opacity"
          >
            <span className="proseka-title text-3xl">🎵 英語リズムアカデミー 🎵</span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-cyan-500 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">ホーム</span>
            </Link>
            <Link 
              href="/story-creator" 
              className="text-gray-600 hover:text-cyan-500 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <Music className="h-4 w-4" />
              <span className="font-semibold">リズムゲーム</span>
            </Link>
            {userId ? (
              <>
                <Link 
                  href="/billing" 
                  className="text-gray-600 hover:text-cyan-500 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="font-semibold">契約管理</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-cyan-500 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                >
                  <Power className="h-4 w-4" />
                  <span className="font-semibold">ログアウト</span>
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-cyan-500 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
              >
                <User className="h-4 w-4" />
                <span className="font-semibold">ログイン</span>
              </Link>
            )}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors flex items-center space-x-2 px-2 py-1"
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">ホーム</span>
            </Link>
            <Link 
              href="/story-creator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors flex items-center space-x-2 px-2 py-1"
            >
              <Music className="h-4 w-4" />
              <span className="font-semibold">リズムゲーム</span>
            </Link>
            {userId ? (
              <>
                <Link 
                  href="/billing" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors flex items-center space-x-2 px-2 py-1"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="font-semibold">契約管理</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left text-gray-300 hover:text-white transition-colors flex items-center space-x-2 px-2 py-1"
                >
                  <Power className="h-4 w-4" />
                  <span className="font-semibold">ログアウト</span>
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors flex items-center space-x-2 px-2 py-1"
              >
                <User className="h-4 w-4" />
                <span className="font-semibold">ログイン</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}