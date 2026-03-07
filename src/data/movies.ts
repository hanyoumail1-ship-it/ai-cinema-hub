export type VideoSource = "youtube" | "x";

export interface Movie {
  id: string;
  title: string;
  url: string;
  creator: string;
  tool: string;
  type: 'youtube' | 'tiktok';
  thumbnailUrl?: string;
  }

export const movies: Movie[] = [
  {
    id: "1",
    title: "【AI動画】自分がAIだと知った時の反応",
    url: "https://www.youtube.com/watch?v=3vxF2HpSM48",
    creator: "アイマイ",
    tool: "sora",    
    type: 'youtube'
  },
  {
    id: "2",
    title: "AIにドッキリ番組作らせたらすごいことになった",
    url: "https://www.youtube.com/watch?v=QxYiiQ0eZyM&t=2s",
    creator: "きびまら",
    tool: "Mixed AI",
    type: 'youtube'
  },
  {
    id: "3",
    title: "AIが考えた放送事故",
    url: "https://www.youtube.com/watch?v=YHsfqcVS76I&t=6s",
    creator: "パロディちゃん / Parody-chan",
    tool: "Mixed AI",
    type: 'youtube'
  },
  {
  id: "tk1",
    title: "AIで描く幻想的な世界観",
    url: "https://www.tiktok.com/@riotsukatsuki34/video/7611288886366506261",
    creator: "riotsukatsuki34",
    tool: "AI Video",
    type: 'tiktok'
    thumbnailUrl: "/thumbnails/tk1.jpg"       
  },
  {
    id: "tk2",
    title: "AI音楽と癒しの映像美",
    url: "https://www.tiktok.com/@music_chill.026/video/7611894434828963090",
    creator: "music_chill.026",
    tool: "AI Music",
    type: 'tiktok'
  },
  {
    id: "tk3",
    title: "次世代AIアニメーション・クリップ",
    url: "https://www.tiktok.com/@lios_secondacc/video/7612560997290740999",
    creator: "lios_secondacc",
    tool: "AI Animation",
    type: 'tiktok'
  }
];

