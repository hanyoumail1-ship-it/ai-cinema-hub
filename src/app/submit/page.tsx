"use client";
import { useState } from "react";
import Link from "next/link";

export default function SubmitPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await fetch("https://script.google.com/macros/s/AKfycbx3GJdKHb12S9E-gy5fYgyVdS82AdjqHyrMZyrfM0eZgw31L6BSlMiHp3VLYS5hzkIFGg/exec", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setStatus("success");
    } catch (error) {
      alert("送信に失敗しました");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">投稿ありがとうございます！</h1>
        <p className="text-gray-400 mb-8">内容を確認し、順次掲載させていただきます。</p>
        <Link href="/" className="bg-blue-600 px-6 py-2 rounded-lg">トップに戻る</Link>
      </div>
    );
  }
  
  return (    
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-xl mx-auto">
      <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block text-sm">
          ← トップページに戻る
        </Link>
        <h1 className="text-3xl font-bold mb-8">おすすめ動画を投稿する</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">YouTube動画のURL</label>
            <input name="url" required className="w-full bg-slate-900 border border-slate-800 p-3 rounded" placeholder="https://www.youtube.com/watch?v=..." />
          </div>
          <div>
            <label className="block mb-2">タイトル</label>
            <input name="title" required className="w-full bg-slate-900 border border-slate-800 p-3 rounded" />
          </div>
          <div>
            <label className="block mb-2">クリエイター名</label>
            <input name="creator" required className="w-full bg-slate-900 border border-slate-800 p-3 rounded" />
          </div>
          <div>
            <label className="block mb-2">使用ツール</label>
            <input name="tool" className="w-full bg-slate-900 border border-slate-800 p-3 rounded" placeholder="Luma AI, Kling AIなど" />
          </div>
          <div>
            <label className="block mb-2">推しポイント（紹介文）</label>
            <textarea name="description" rows={4} className="w-full bg-slate-900 border border-slate-800 p-3 rounded" />
          </div>
          <button 
            type="submit" 
            disabled={status === "sending"}
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-lg font-bold transition-colors disabled:bg-gray-600"
          >
            {status === "sending" ? "送信中..." : "この内容で投稿する"}
          </button>
        </form>
      </div>
    </div>
  );
}