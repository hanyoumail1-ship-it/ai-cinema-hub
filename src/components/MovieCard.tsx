import Link from "next/link";
import { Movie } from "../data/movies";
import { Heart, User, Play } from "lucide-react"; // アイコン用
import { useState, useEffect } from "react";

export default function MovieCard({ 
  movie, 
  handleLike 
}: { 
  movie: Movie; 
  handleLike?: (id: string) => void;
}) {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const localId = `liked_movie_${movie.id}`;
    if (localStorage.getItem(localId) === "true") {
      setHasLiked(true);
    }
  }, [movie.id]);
  return (
    <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all group">
      {/* サムネイル部分 */}
      <Link href={`/movie/${movie.id}`} className="relative block aspect-video">
        <img
          src={movie.thumbnailUrl || `https://img.youtube.com/vi/${movie.url.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
        </div>
      </Link>

      {/* テキスト部分 */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        
        <div className="flex items-center justify-between text-sm">
          <Link 
            href={`/creator/${movie.creator}`}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <User size={14} />
            <span>{movie.creator}</span>
          </Link>
          
          <div className="flex items-center gap-1 text-pink-500">
            <Heart size={14} fill="currentColor" />
            <span>{movie.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}