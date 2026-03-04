export type VideoSource = "youtube" | "x";

export interface Movie {
  id: string;
  title: string;
  url: string;
  creator: string;
  tool: string;
  }

export const movies: Movie[] = [
  {
    id: "1",
    title: "【AI動画】自分がAIだと知った時の反応",
    url: "https://www.youtube.com/watch?v=3vxF2HpSM48",
    creator: "アイマイ",
    tool: "sora",    
  },
  {
    id: "2",
    title: "AIにドッキリ番組作らせたらすごいことになった",
    url: "https://www.youtube.com/watch?v=R_0e_u8Dqsc",
    creator: "きびまら",
    tool: "Mixed AI",
  },
  {
    id: "3",
    title: "AIが考えた放送事故",
    url: "https://www.youtube.com/watch?v=Cq3B5DqXW9A",
    creator: "パロディちゃん / Parody-chan",
    tool: "Mixed AI",
  },
];

