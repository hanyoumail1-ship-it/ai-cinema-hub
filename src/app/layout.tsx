import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // 1. タイトル：検索されやすく、かつカッコいい響きに
  title: {
    default: "AI CINEMA HUB - 次世代AI映画・動画の投稿共有プラットフォーム",
    template: "%s | AI CINEMA HUB"
  },
  // 2. 説明文：コンセプト（映画版PIXIV）を意識した魅力的な文章
  description: "生成AI（Luma, Runway, Sora等）から生まれた最先端の映像作品が集まるハブ。クリエイターの情熱が交差する、AI映画の新しい表現の場です。",
  keywords: ["AI映画", "AI動画", "生成AI", "Luma", "Runway", "Sora", "AI CINEMA HUB"],
  
  // 3. SNS設定（XやLINEでシェアした時に表示される内容）
  openGraph: {
    title: "AI CINEMA HUB",
    description: "次世代AI映画・動画の投稿共有プラットフォーム",
    siteName: "AI CINEMA HUB",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI CINEMA HUB",
    description: "次世代AI映画・動画の投稿共有プラットフォーム",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      {/* 背景色を、より映画館らしい深い濃紺（#020617）に変更しました */}
      <body className="min-h-screen bg-[#020617] text-gray-100 antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}

