import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI英会話エージェント",
  description: "スパイ映画の世界観で英語を学ぶAI英会話プラットフォーム。秘密エージェントとして様々なミッションを通じて英語スキルを磨き上げましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen bg-black">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}