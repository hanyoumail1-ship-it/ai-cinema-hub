"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { Heart, User, ExternalLink, Film } from "lucide-react";
import MovieCard from "../../../components/MovieCard";
import { Movie } from "../../../data/movies";



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

  // 【修正】データを管理する「箱（State）」を定義
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [likes, setLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true); // 読み込み中フラグ

  // トップページと同じGASのURL
  const GAS_URL = "https://script.google.com/macros/s/AKfycbypovG7-jZfJlkzhtjkX68UIqcv5P6-W77fl7b3U_7tOorFujl23UEOItQVB5as1Zet8Q/exec";

  // 【修正】ページが開いた時（またはIDが変わった時）に、GASとSupabaseからデータを取ってくる
  useEffect(() => {
    if (!id) return;

    const initMovieDetail = async () => {
      try {
        setLoading(true);

        // ① GASから最新の全動画データを取得
        const response = await fetch(GAS_URL);
        const fetchedMovies: Movie[] = await response.json();

        // ② URLのIDと一致する動画を特定（型違い対策でStringに変換して比較）
        const foundMovie = fetchedMovies.find((m) => String(m.id) === String(id));

        if (foundMovie) {
          setMovie(foundMovie);

          // ③ 関連動画の抽出（GASから取った最新データベースで計算）
          if (foundMovie.tags && Array.isArray(foundMovie.tags)) {
            const allRelated = fetchedMovies
              .filter((m) => String(m.id) !== String(foundMovie.id))
              .filter((m) => m.tags && Array.isArray(m.tags) && m.tags.some((tag) => foundMovie.tags.includes(tag)));
            
            // ランダムに並び替えて3つ抽出
            const randomRelated = [...allRelated]
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            
            setRelatedMovies(randomRelated);
          }

          // ④ Supabaseから現在のいいね数を取得
          const numericId = Number(id);
          const { data, error: fetchError } = await supabase
  .from('movies')
  .select('likes')
  .eq('id', numericId) // 数値で検索
  .maybeSingle();
          
  if (data) {
    setLikes(data.likes);
  } 
  // ブラウザの記憶（LocalStorage）から「この動画IDにいいねしたか」を確認
const localId = `liked_movie_${id}`;
const alreadyLiked = localStorage.getItem(localId);

if (alreadyLiked === "true") {
  setHasLiked(true); // いいね済みなら、状態をtrueにする
}
else {
    // データがなかった場合、数値に直したIDでインサートを試みる
    const { error: insertError } = await supabase
      .from('movies')
      .insert({ id: numericId, likes: 0 });
      if (insertError) {
        console.error("【デバッグ】Supabaseへの自動登録に失敗しました:", insertError);
      } else {
        console.log("【デバッグ】Supabaseへの自動登録に成功しました");
      }
      
      setLikes(0);
    }
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("動画詳細データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    initMovieDetail();
  }, [id]);

  // 4. いいねボタンを押した時の処理
    const handleLike = async () => {
      if (!id || isLiking || hasLiked) return; // ★すでにいいね済み（hasLikedがtrue）ならここで終了！
    try {
      setIsLiking(true); // 処理開始（ボタンをロック）
    // データベースの数字を＋1する
    const { error } = await supabase.rpc('increment_likes', { row_id: id });
    
    if (!error) {
      setLikes(prev => prev + 1); // 成功したら画面の数字も増やす
      setHasLiked(true); // ★画面上の状態を「いいね済み」に変更
      localStorage.setItem(`liked_movie_${id}`, "true");// LocalStorageに「この動画はいいねした！」と保存する
    }
  } catch (error) {
    console.error("いいねの更新に失敗しました:", error);
  } finally {
    setIsLiking(false); // 処理終了（ボタンのロックを解除）
  }
};

  // 【追加】ローディング中の画面表示
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
        <div className="text-xl font-bold animate-pulse">動画データを読み込み中...</div>
      </div>
    );
  }

  // 【追加】動画が存在しなかった場合の画面表示
  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
        <div className="text-xl font-bold">動画が見つかりません</div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 以下略（これ以降のUIを描画する return 文は、
  // すべて Stateの `movie` と `relatedMovies` を参照するようになるため、
  // 元のコードのままでそのまま正常に動作します！）

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
               disabled={isLiking || hasLiked} // ★いいね済みの場合もボタンをクリック不可にする
               className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 text-sm font-bold border ${
                 hasLiked
                   ? "bg-rose-500 text-white border-rose-600 cursor-default" // ★いいね済みの色（ピンクに白文字など）
                   : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 disabled:opacity-50" // 通常時の色
               }`}
             >
               <Heart 
                 size={20} 
                 className={`${hasLiked ? "fill-white" : "fill-rose-500/20"}`} // ★いいね済みならハートを白塗りに
               />
               <span>{hasLiked ? "いいねしました" : "いいね！"}</span>
               <span className="ml-1 bg-black/20 px-2 py-0.5 rounded-full text-xs">
                 {likes}
               </span>
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