import Link from "next/link";
import { Info, ShieldAlert, Mail, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-3xl mx-auto py-12">
        {/* ヘッダー */}
        <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block">
          ← トップページに戻る
        </Link>
        
        <h1 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <Info className="text-blue-500" size={36} />
          About This Site
        </h1>

        <div className="space-y-16">
          {/* 1. コンセプト */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              サイトの目的
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                「AI CINEMA HUB」は、急速に進化する動画生成AIによって生み出された、素晴らしい映像作品をキュレーションして紹介するプラットフォームです。
              </p>
              <p>
                個人が技術的な知識なしに映画のような映像を作れる時代の幕開けを、クリエイターの皆様と共に盛り上げ、素晴らしい才能がより多くの人の目に触れる場を提供することを目指しています。
              </p>
            </div>
          </section>

          {/* 2. 著作権・免責事項 */}
          <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-yellow-500">
              <ShieldAlert size={24} />
              著作権と掲載について
            </h2>
            <div className="text-sm text-gray-400 leading-relaxed space-y-4">
              <p>
                当サイトに掲載されている動画の著作権は、各動画の制作者様に帰属します。当サイトはYouTubeやTikTokの公式埋め込み機能を利用して動画を紹介しており、コンテンツの再アップロードや転載は一切行っておりません。
              </p>
              <p>
                動画の掲載を希望されない制作者様、または内容に問題がある場合は、お手数ですが下記のお問い合わせ窓口までご連絡ください。ご本人様確認の後、速やかに削除等の対応を行わせていただきます。
              </p>
              <p>
                また、本サイトの利用によって生じた損害やトラブルについて、当サイトは一切の責任を負いかねますので、あらかじめご了承ください。
              </p>
            </div>
          </section>

          {/* 3. お問い合わせ */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Mail className="text-blue-400" size={24} />
              お問い合わせ
            </h2>
            <p className="text-gray-300 mb-4">
              削除依頼や掲載希望、その他ご意見がございましたら、以下の宛先までご連絡ください。
            </p>
            <div className="bg-slate-800/50 inline-block px-6 py-3 rounded-lg font-mono text-blue-300">
            aicinamahub.contact@gmail.com
            </div>
          </section>
        </div>
        <section className="text-center py-10">
  <p className="mb-4 text-gray-400">あなたの知っている素晴らしいAI動画を教えてください</p>
  <Link href="/submit" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95">
    動画を投稿・推薦する
  </Link>
</section>

        <div className="mt-20 text-center text-gray-600 text-sm italic">
          © 2026 AI CINEMA HUB. Curator: Your Name
        </div>
      </div>
    </div>
  );
}