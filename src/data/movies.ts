export type VideoSource = "youtube" | "x";

export interface Movie {
  id: string;
  title: string;
  url: string;
  creator: string;
  tool: string;
  type: 'youtube' | 'tiktok';
  thumbnailUrl?: string;
  likes: number;
  category: 'movie' | 'tutorial';
  tags: string[];
  }

export const movies: Movie[] = [
  {
    id: "1",
    title: "【AI動画】自分がAIだと知った時の反応",
    url: "https://www.youtube.com/watch?v=3vxF2HpSM48",
    creator: "アイマイ",
    tool: "sora",    
    type: 'youtube',
    tags: ["実写","ネタ" ],
    category: 'movie',
    likes: 0
  },
  {
    id: "2",
    title: "AIにドッキリ番組作らせたらすごいことになった",
    url: "https://www.youtube.com/watch?v=QxYiiQ0eZyM&t=2s",
    creator: "きびまら",
    tool: "Mixed AI",
    type: 'youtube',
    tags: ["実写", "アニメ","ネタ", ],
    category: 'movie',
    likes: 0
  },
  {
    id: "3",
    title: "AIが考えた放送事故",
    url: "https://www.youtube.com/watch?v=YHsfqcVS76I&t=6s",
    creator: "パロディちゃん / Parody-chan",
    tool: "Mixed AI",
    type: 'youtube',
    tags: ["実写", "ネタ", ],
    category: 'movie',
    likes: 0
  },
  {
  id: "tk1",
    title: "AIアニメーション",
    url: "https://www.tiktok.com/@riotsukatsuki34/video/7611288886366506261",
    creator: "riotsukatsuki34",
    tool: "AI Video",
    type: 'tiktok',
    thumbnailUrl: "/thumbnails/tk1.jpg",
    tags: ["アニメ", "ぐぐがが",],
    category: 'movie',
    likes: 0 
  },
  {
    id: "tk2",
    title: "ぐぐががちゃんとカニ",
    url: "https://www.tiktok.com/@music_chill.026/video/7611894434828963090",
    creator: "music_chill.026",
    tool: "AI Music",
    type: 'tiktok',
    thumbnailUrl: "/thumbnails/tk2.jpg",
    tags: ["アニメ", "ぐぐがが", ],
    category: 'movie',
    likes: 0 
  },
  {
    id: "tk3",
    title: "ぐぐががちゃんポテチを食べる",
    url: "https://www.tiktok.com/@lios_secondacc/video/7612560997290740999",
    creator: "lios_secondacc",
    tool: "AI Animation",
    type: 'tiktok',    
    thumbnailUrl: "/thumbnails/tk3.jpg",
    tags: ["アニメ", "ぐぐがが",],
    category: 'movie',
    likes: 0
  },
  {
    id: "4",
    title: "今流行しているAI動画はコレ!『画像から動画生成』人気テンプレートランキング・TOP7",
    url: "https://www.youtube.com/watch?v=lI3rt9_L8WQ",
    creator: "Wondershare Filmora 動画編集",
    tool: "another",
    type: 'youtube',
    tags: ["解説",],
    category: 'tutorial',
    likes: 0
  },
  {
    id: "5",
    title: "初心者必見!AI実写動画の作り方をわかりやすく紹介します(Pollo AI)",
    url: "https://www.youtube.com/watch?v=rj8RGyU4_QU",
    creator: "とうや【AIイラストLab.】",
    tool: "another",
    type: 'youtube',
    tags: ["解説"],
    category: 'tutorial',
    likes: 0
  },
  {
    id: "6",
    title: "Sora2の能力を引き出すプロンプト術 1枚の画像からリール動画を生成する方法",
    url: "https://www.youtube.com/watch?v=m9PwlpHOvI0",
    creator: "Dr.slump-J / クリエイティブツール解説",
    tool: "another",
    type: 'youtube',
    tags: ["解説",],
    category: 'tutorial',
    likes: 0
  },
  {
    id: "7",
    title: "You Won’t Believe What These Sora Kitty Cats Do Internet Breaking Moments!",
    url: "https://www.youtube.com/watch?v=3Q2Vr2vRThA",
    creator: "AI Universe",
    tool: "sora",
    type: 'youtube',
    tags: ["実写", "動物", "猫"],
    category: 'movie',
    likes: 0
  },
  {
    id: "8",
    title: "You Won’t Believe What These Sora Kitty Cats Do Absolutely Insane Moments!",
    url: "https://www.youtube.com/watch?v=u7DcOEnqdfA",
    creator: "AI Universe",
    tool: "sora",
    type: 'youtube',
    tags: ["実写", "動物", "猫"],
    category: 'movie',
    likes: 0
  },
  {
    id: "9",
    title: "AIが作った映画予告『きのこたけのこWAR』",
    url: "https://www.youtube.com/watch?v=YoKp3gVlll0",
    creator: "きびまら",
    tool: "Mixed AI",
    type: 'youtube',
    tags: ["実写", "SF", "シネマティック"],
    category: 'movie',
    likes: 0
  },
];

