import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // 1. タイトル：検索されやすく、かつカッコいい響きに
  title: {
    default: "AI CINEMA HUB - 次世代AI映画・動画の投稿共有プラットフォーム",
    template: "%s | AI CINEMA HUB"
  },
  
  // 2. 説明文・キーワード
  description: "生成AI（Luma, Runway, Sora等）から生まれた最先端の映像作品が集まるハブ。クリエイターの情熱が交差する、AI映画の新しい表現の場です。",
  keywords: ["AI映画", "AI動画", "生成AI", "Luma", "Runway", "Sora", "AI CINEMA HUB"],
  
  // 3. SNS設定
  openGraph: {
    title: "AI CINEMA HUB",
    description: "次世代AI映画・動画の投稿共有プラットフォーム",
    url: "https://ai-cinema-hub-m53x.vercel.app/", // サイトのURL
    siteName: "AI CINEMA HUB",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // ★ publicに入れた画像名と一致させる
        width: 1200,
        height: 630,
        alt: "AI CINEMA HUB プレビュー画像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // ★ Xで画像を大きく表示させる設定
    title: "AI CINEMA HUB",
    description: "次世代AI映画・動画の投稿共有プラットフォーム",
    images: ["/opengraph-image.png"], // ★ ここにも画像を指定
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className="min-h-screen bg-[#020617] text-gray-100 antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}