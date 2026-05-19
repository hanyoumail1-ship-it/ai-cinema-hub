/** @type {import('next').Next.jsConfig} */
const nextConfig = {
    images: {
      // 外部サイトの画像を許可する設定
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'drive.google.com',
        },
        {
          protocol: 'https',
          hostname: 'img.youtube.com',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
      ],
    },
  };
  
  export default nextConfig;