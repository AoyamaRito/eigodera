import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI英会話 Actor&Actress",
  description: "芸能事務所のカバーを持つスパイ組織で英語を学ぶAI英会話プラットフォーム。俳優・女優として様々な役柄を演じながら英語スキルを磨き上げましょう。",
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
          <main className="relative min-h-screen z-10">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}