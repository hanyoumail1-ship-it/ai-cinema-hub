export type VideoSource = "youtube" | "x";

export interface Movie {
  id: string;
  title: string;
  author: string;
  url: string;
  source: VideoSource;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "【AI動画】自分がAIだと知った時の反応",
    author: "アイマイ",
    url: "https://www.youtube.com/watch?v=3vxF2HpSM48",
    tool: "sora",
    source: "youtube",
  },
  {
    id: "2",
    title: "AIにドッキリ番組作らせたらすごいことになった",
    author: "きびまら",
    url: "https://www.youtube.com/watch?v=QxYiiQ0eZyM",
    tool: "Mixed AI",
    source: "youtube",
  },
  {
    id: "3",
    title: "AIが考えた放送事故",
    author: "パロディちゃん / Parody-chan",
    url: "https://www.youtube.com/watch?v=YHsfqcVS76I",
    tool: "Mixed AI",
    source: "youtube",
  },
];

