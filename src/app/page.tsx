"use client";

import { useState } from "react";
import { movies } from "../data/movies";
import { Box, User, Film, X } from "lucide-react";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<typeof movies[0] | null>(null);
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* --- ヘッダー（ロゴ） --- */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex flex-col items-start group cursor-pointer">
            <div className="flex items-center gap-2">
              <Box className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold tracking-tighter text-white">
                AI CINEMA HUB
              </span>
            </div>
            <div className="h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
          <button className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium hover:bg-blue-500 transition-colors">
            投稿する
          </button>
        </div>
      </header>

      {/* --- メインコンテンツ --- */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">最新のAI動画作品</h1>
          <p className="text-sm text-gray-400 mt-2">
            次世代のクリエイターによるAI映像のハブへようこそ
          </p>
        </div>

        {/* --- 動画グリッド（スマホ対応） --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => {
  const videoId = getYouTubeId(movie.url);
  // hqdefault よりも確実な mqdefault（中解像度）を使用します
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` 
    : "/api/placeholder/400/225"; // 万が一の時の予備画像

            return (
              <button
                key={movie.id}
                onClick={() => setSelectedVideo(movie)}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#0f172a] text-left transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* サムネイル画像エリア */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={thumbnailUrl}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] backdrop-blur-sm">
                    AI MOVIE
                  </div>
                </div>

                {/* 動画情報エリア */}
                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-blue-400 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <User className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[100px]">{movie.creator}</span>
                    </div>
                    <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                      {movie.tool}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- ポップアップ（モーダル） --- */}
      {selectedVideo && (
       <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
       <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#0f172a] shadow-2xl">
         {/* 閉じるボタン */}
         <button
           onClick={() => setSelectedVideo(null)}
           className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 transition-colors"
         >
           <X className="h-6 w-6" />
         </button>

         {/* 1. 動画プレイヤー部分 (復活！) */}
         <div className="aspect-video w-full bg-black">
           <iframe
             src={`https://www.youtube.com/embed/${selectedVideo.url.split("v=")[1]?.split("&")[0]}?autoplay=1`}
             className="h-full w-full"
             allow="autoplay; encrypted-media"
             allowFullScreen
           />
         </div>

         {/* 2. 情報とボタン部分 */}
         <div className="p-6">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
               <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
               <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                 <span className="flex items-center gap-1">
                   <User className="h-4 w-4" /> {selectedVideo.creator}
                 </span>
                 <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400 border border-blue-500/20">
                   {selectedVideo.tool}
                 </span>
               </div>
             </div>
             
             {/* YouTubeで見るボタン */}
             <a 
               href={selectedVideo.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20"
             >
               <Film className="h-4 w-4" />
               YouTubeで視聴する
             </a>
           </div>
         </div>
       </div>
     </div> 
      )}
    </main>
  );
}