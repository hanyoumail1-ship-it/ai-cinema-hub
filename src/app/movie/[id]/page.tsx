"use client";

import { useState, useEffect, use } from "react";
import { movies } from "../../../data/movies";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Heart, User, ExternalLink, Film } from "lucide-react";
import MovieCard from "../../../components/MovieCard";

// --- 補助関数 ---
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getTikTokId = (url: string) => {
  const match = url.match(/\/video\/(\d+)/) || url.match(/\/v\/(\d+)/);
  return match ? match[1] : null;
};

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. URLのIDを受け取る（Next.js 15 のルール）
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const movie = movies.find((m) => m.id === id);
  if (!movie) return <div>動画が見つかりません</div>;
  // 関連動画の抽出
  const allRelated = movies
  .filter((m) => m.id !== movie.id)
  .filter((m) => m.tags.some((tag) => movie.tags.includes(tag)));
  const relatedMovies = [...allRelated]
  .sort(() => Math.random() - 0.5) // ランダムに並び替え
  .slice(0, 3); // 3つだけ取得
  
  // 2. いいね数を管理する「箱」
  const [likes, setLikes] = useState(0);

  // 3. ページが開いた時にデータベースから現在のいいね数を取ってくる
  useEffect(() => {
    const fetchLikes = async () => {
      const { data } = await supabase
        .from('movies')
        .select('likes')
        .eq('id', id)
        .single();
      
      if (data) {
        setLikes(data.likes);
      }
    };
    fetchLikes();
  }, [id]);

  if (!movie) {
    notFound();
  }

  // 4. いいねボタンを押した時の処理
  const handleLike = async () => {
    // データベースの数字を＋1する
    const { error } = await supabase.rpc('increment_likes', { row_id: id });
    
    if (!error) {
      setLikes(prev => prev + 1); // 成功したら画面の数字も増やす
    }
  };

  // 動画プレイヤーの設定
  let embedUrl = "";
  let playerClass = "";
  if (movie.type === 'youtube') {
    const videoId = getYouTubeId(movie.url);
    embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : movie.url;
    playerClass = "aspect-video w-full rounded-2xl"; 
  } else if (movie.type === 'tiktok') {
    const videoId = getTikTokId(movie.url);
    embedUrl = videoId ? `https://www.tiktok.com/embed/${videoId}` : movie.url;
    playerClass = "aspect-[9/16] w-full max-w-[360px] mx-auto rounded-2xl md:max-w-[400px]"; 
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block text-sm">
          ← ギャラリーに戻る
        </Link>

        {/* 動画プレイヤー */}
        <div className="mb-8">
          <div className={`${playerClass} overflow-hidden bg-black shadow-2xl border border-white/10`}>
            <iframe src={embedUrl} className="w-full h-full border-none" allowFullScreen />
          </div>
        </div>

        {/* 情報エリア */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link 
                href={`/creator/${movie.creator}`} 
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
               >
               <User size={16} /> {movie.creator}
              </Link>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                  {movie.tool}
                </span>
              </div>
            </div>

            {/* ボタンエリア */}
            <div className="flex items-center gap-3">
              {/* --- いいねボタン --- */}
              <button
                onClick={handleLike}
                className="flex items-center gap-2 rounded-full bg-pink-500/10 px-6 py-3 text-sm font-bold text-pink-500 transition-all hover:bg-pink-500/20 border border-pink-500/30 active:scale-95 shadow-lg shadow-pink-500/5"
              >
                <Heart className={`h-5 w-5 ${likes > 0 ? 'fill-pink-500' : ''}`} />
                <span>{likes}</span>
              </button>

              {/* --- 外部視聴ボタン --- */}
              <a
                href={movie.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 border border-white/10 active:scale-95"
              >
                <ExternalLink size={18} />
                {movie.type === 'youtube' ? 'YouTube' : 'TikTok'}
              </a>
            </div>
          </div>

          {/* 解説エリア */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 leading-relaxed text-gray-300">
            <h2 className="text-lg font-bold mb-4 text-blue-400 flex items-center gap-2">
              <Film size={20} /> 作品解説
            </h2>
            <p>{(movie as any).description || "現在、制作秘話を準備中です。最新のAI技術を駆使して制作されました。"}</p>
          </div>
          {/* 関連動画セクション */}
{relatedMovies.length > 0 && (
  <div className="mt-16 border-t border-slate-800 pt-12">
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
      <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
      こちらもおすすめ
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedMovies.map((related) => (
        <MovieCard key={related.id} movie={related} />
      ))}
    </div>
  </div>
)}

          {/* タグエリア */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {movie.tags?.map(tag => (
              <Link 
                key={tag} 
                href={`/?tag=${encodeURIComponent(tag)}`}
                className="text-xs bg-white/5 px-3 py-1.5 rounded-md text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}