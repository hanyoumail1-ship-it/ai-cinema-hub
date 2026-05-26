import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-cinema-hub.com/"), // あなたのVercelのURL
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
    url: "https://ai-cinema-hub.com/", // サイトのURL
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
      <head>
      <meta name='impact-site-verification' content='a8a44c61-4c83-4fe4-b016-718327451f1d' />
      </head>
      <body className="min-h-screen bg-[#020617] text-gray-100 antialiased selection:bg-blue-500/30">
        {children}
      </body>      
      <GoogleAnalytics gaId="G-RM2S9DFNJS" />      
    </html>
  );
}