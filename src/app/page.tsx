"use client";

import { useState, useEffect } from "react";
import { movies } from "../data/movies";
import { Box, User, Film, X, Heart, Search } from "lucide-react";
import { supabase } from "../lib/supabase";


export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<typeof movies[0] | null>(null);
  const [movieList, setMovieList] = useState(movies); 
  const [filter, setFilter] = useState<'all' | 'movie' | 'tutorial'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
    useEffect(() => {
      const fetchLikes = async () => {        
        const { data, error } = await supabase.from('movies').select('*');        
        if (data) { 
          const missingMovies = movies.filter(m => !data.find(d => d.id === m.id)); 
          if (missingMovies.length > 0) {
            const newRows = missingMovies.map(m => ({ id: m.id, likes: 0 }));
            await supabase.from('movies').insert(newRows);
            const { data: updatedData } = await supabase.from('movies').select('*');
        if (updatedData) updateState(updatedData);
      } else {
        updateState(data);
      }
    }
  };        
  const updateState = (dbData: any[]) => {
    const updatedList = movies.map(m => {
      const dbItem = dbData.find(d => d.id === m.id);
      return dbItem ? { ...m, likes: dbItem.likes } : m;
    });
    setMovieList(updatedList);
  };

  fetchLikes();
}, []);    

  // 1. YouTube IDを取得する最強の関数
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;      
  };
  const handleLike = async (id: string) => {
    setMovieList(prev => 
      prev.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m)
    );
    const { error } = await supabase.rpc('increment_likes', { row_id: id });
  
  if (error) {
    console.error("保存に失敗しました:", error);
  }
};

const filteredMovies = movieList.filter(movie => {
    // ① カテゴリが一致するか？
  const matchesCategory = filter === 'all' || movie.category === filter;
    // ② タイトルまたは作者名に検索ワードが含まれているか？（大文字小文字を区別しない）
  const matchesSearch = 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.creator.toLowerCase().includes(searchTerm.toLowerCase());
    // ③ ツールが一致するか？
  const matchesTool = selectedTool === 'all' || movie.tool === selectedTool;
  // ④ ジャンルタグが一致するか？（配列の中に含まれているかチェック）
  const matchesTag = selectedTag === 'all' || (movie.tags && movie.tags.includes(selectedTag));

  return matchesCategory && matchesSearch && matchesTool && matchesTag;    
});
const sortedMovies = [...filteredMovies].sort((a, b) => {
  if (sortBy === 'popular') {
    // いいね数で降順（大きい順）に並び替え
    return b.likes - a.likes;
  }
  // 'newest' の場合は元の順序（または日付があれば日付順）
  return 0; 
});

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

{/* --- 検索窓 --- */}
<div className="relative mb-8 mx-auto max-w-md">
  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
    <Search className="h-4 w-4 text-gray-400" />
  </div>
  <input
    type="text"
    placeholder="作品名やクリエイター名で検索..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} // 文字が入るたびに状態を更新
    className="w-full rounded-full bg-white/5 border border-white/10 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
  />
</div>
{/* --- 並び替えスイッチ --- */}
<div className="mb-6 flex justify-end px-4 max-w-6xl mx-auto">
  <div className="flex bg-white/5 rounded-lg p-1 p-1 border border-white/10">
    <button
      onClick={() => setSortBy('newest')}
      className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
        sortBy === 'newest' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      新着順
    </button>
    <button
      onClick={() => setSortBy('popular')}
      className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
        sortBy === 'popular' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      人気順
    </button>
  </div>
</div>

{/* --- カテゴリフィルター --- */}
<div className="mb-8 flex justify-center gap-4">
  {(['all', 'movie', 'tutorial'] as const).map((cat) => (
    <button
      key={cat}
      onClick={() => setFilter(cat)}
      className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
        filter === cat
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
      }`}
    >
      {cat === 'all' ? 'すべて' : cat === 'movie' ? '作品' : '解説動画'}
    </button>
  ))}
</div>
{/* --- ツールタグ --- */}
<div className="mb-8 flex flex-wrap justify-center gap-2">
  
{/* フィルターリセットボタン */}
{(searchTerm || filter !== 'all' || selectedTool !== 'all') && (
  <button 
    onClick={() => {
      setSearchTerm('');
      setFilter('all');
      setSelectedTool('all');
    }}
    className="text-xs text-gray-500 hover:text-white underline underline-offset-4"
  >
    フィルターをリセット
  </button>
)}  
  {/* 「すべて」ボタン */}
  <button
    onClick={() => setSelectedTool('all')}
    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
      selectedTool === 'all'
        ? 'bg-gray-200 text-gray-900'
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
    }`}
  >
    All Tools
  </button>
  
  {/* データにあるツールを自動でボタンにする */}
  {Array.from(new Set(movieList.map(m => m.tool))).map((toolName) => (
    <button
      key={toolName}
      onClick={() => setSelectedTool(toolName)}
      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
        selectedTool === toolName
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
      }`}
    >
      #{toolName}
    </button>
  ))}
</div>

{/* --- ジャンルタグ（横並び） --- */}
<div className="mb-8 flex flex-wrap justify-center gap-2">
  <button
    onClick={() => setSelectedTag('all')}
    className={`px-3 py-1 rounded-md text-xs transition-all ${
      selectedTag === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
    }`}
  >
    #すべて
  </button>
  
  {/* 全データからタグを自動抽出して表示 */}
  {Array.from(new Set(movieList.flatMap(m => m.tags || []))).map(tag => {
  // 1. そのタグを持っているアイテムがリストにいくつあるか計算する
  const count = movieList.filter(m => m.tags?.includes(tag)).length;

  return (
    <button
      key={tag}
      onClick={() => setSelectedTag(tag)}
      className={`px-3 py-1 rounded-md text-xs transition-all ${
        selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
      }`}
    >
      #{tag} ({count}) {/* ← ここで件数を表示 */}
    </button>
  );
})}
</div>

        {/* --- 動画グリッド --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedMovies.map((movie) => {
    const videoId = getYouTubeId(movie.url);
    const thumbnailUrl = movie.thumbnailUrl || (videoId 
      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` 
      : "https://via.placeholder.com/480x270/0f172a/ffffff?text=No+Thumbnail");

    return (
      <div key={movie.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#0f172a] text-left transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* --- カテゴリバッジ --- */}
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <span className={`rounded px-2 py-0.5 text-[10px] font-bold text-white shadow-lg ${
          movie.category === 'tutorial' ? 'bg-green-600' : 'bg-blue-600'
        }`}>
          {movie.category === 'tutorial' ? 'TUTORIAL' : 'MOVIE'}
        </span>
      </div>
      
        {/* 動画サムネイル部分 */}
        <button 
          onClick={() => setSelectedVideo(movie)}
          className="relative aspect-video w-full overflow-hidden"
        >
          <img
            src={thumbnailUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] backdrop-blur-sm text-white">
            {movie.type === 'youtube' ? 'YOUTUBE' : 'TIKTOK'}
          </div>
        </button>

        {/* 情報エリア */}
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <User className="h-3.5 w-3.5" />
              <span className="truncate max-w-[80px]">{movie.creator}</span>
            </div>
            
            <div className="flex items-center gap-3">
            <div className="mt-2 flex flex-wrap gap-1">
  {movie.tags?.map(tag => (
    <span 
      key={tag}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedTag(tag);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="cursor-pointer text-[10px] text-gray-500 hover:text-blue-400"
    >
      #{tag}
    </span>
  ))}
</div>
              {/* いいねボタン */}
              <button
                 onClick={() => handleLike(movie.id)}
                 className="flex items-center gap-1 text-xs text-gray-400 hover:text-pink-500 transition-colors group/like">
                <Heart className="h-3.5 w-3.5 group-hover/like:fill-pink-500" />
                <span>{movie.likes}</span>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTool(movie.tool);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
              >
                  #{movie.tool}
              </button>
            </div>
          </div>
        </div>
      </div>
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

      {/* 動画プレイヤー：YouTubeかTikTokかで中身を切り替え */}
      <div className={`w-full bg-black flex items-center justify-center ${
        selectedVideo.type === 'tiktok' ? 'aspect-[9/16] max-h-[70vh]' : 'aspect-video'
      }`}>
        {selectedVideo.type === 'youtube' ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.url)}?autoplay=1`}
            className="h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${selectedVideo.url.split('/video/')[1]}`}
            className="h-full w-full"
            allow="fullscreen"
          />
        )}
      </div>

      {/* 情報とボタン */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {selectedVideo.creator}</span>
              <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400 border border-blue-500/20">{selectedVideo.tool}</span>
            </div>
          </div>
          
          {/* ボタンの文字と色を動的に変更 */}
          <a 
            href={selectedVideo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg ${
              selectedVideo.type === 'youtube' 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' 
                : 'bg-zinc-800 hover:bg-black shadow-zinc-900/40'
            }`}
          >
            <Film className="h-4 w-4" />
            {selectedVideo.type === 'youtube' ? 'YouTubeで視聴する' : 'TikTokで視聴する'}
          </a>
        </div>
      </div>
    </div>
  </div>
)}
    </main>
  );
}