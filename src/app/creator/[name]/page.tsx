import { movies } from "../../../data/movies";
import MovieCard from "../../../components/MovieCard"; 
import Link from "next/link";

// 1. 関数の前に「async」を付ける
export default async function CreatorPage({ 
  params 
}: { 
  params: Promise<{ name: string }> // 2. params の型を Promise にする
}) {
  // 3. params が届くのを待つ（await）
  const { name } = await params;
  
  // URLからクリエイター名を取得（日本語などのデコード処理）
  const creatorName = decodeURIComponent(name);

  // そのクリエイターの作品だけを抽出
  const creatorMovies = movies.filter((movie) => movie.creator === creatorName);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-6xl mx-auto mb-12">
        <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
          ← トップへ戻る
        </Link>
        <h1 className="text-4xl font-bold mt-4">
          <span className="text-gray-400 text-2xl block mb-2">Creator</span>
          {creatorName} <span className="text-xl font-normal text-gray-500">の作品一覧</span>
        </h1>
        <p className="text-gray-400 mt-2">{creatorMovies.length} 本の動画を掲載中</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creatorMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {creatorMovies.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          まだこのクリエイターの作品は登録されていません。
        </div>
      )}
    </div>
  );
}