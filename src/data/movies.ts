export type VideoSource = "youtube" | "x";

export interface Movie {
  id: string;
  title: string;
  url: string;
  creator: string;
  description?: string;
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
    title: "【AI動画】存在しない観光地を歩いてみる",
    url: "https://www.youtube.com/watch?v=aCFzpUQUtxI&t=55s",
    creator: "アイマイ",
    description: "実写と見紛うほどの圧倒的な密度で描かれた、架空の日本の商店街。軒を連ねる屋台の灯りや店先のディテールが驚くほどリアルで、AIが生み出したとは思えないほどの活気と没入感を楽しめる一作です。まるで異世界の観光地に迷い込んだかのような不思議な感覚を味わえます。",
    tool: "Mixed AI",    
    type: 'youtube',
    tags: ["実写",],
    category: 'movie',
    likes: 0
  },
  {
    id: "2",
    title: "AIにドッキリ番組作らせたらすごいことになった",
    url: "https://www.youtube.com/watch?v=QxYiiQ0eZyM&t=2s",
    creator: "きびまら",
    description: "かつてのテレビ黄金時代を彷彿とさせるドッキリ番組のフォーマットを、最新AIでアップデートした意欲作。一見すると実写のバラエティ映像ですが、仕掛けられるドッキリはどれも物理法則や常識を無視した『現実ではあり得ない』ものばかりです。AI特有のシュールなユーモアと、懐かしい演出のギャップに思わず笑ってしまう、エンタメ性の高い一本です。",
    tool: "Mixed AI",
    type: 'youtube',
    tags: ["実写","ネタ", ],
    category: 'movie',
    likes: 0
  },
  {
    id: "3",
    title: "AIが考えた放送事故",
    url: "https://www.youtube.com/watch?v=YHsfqcVS76I&t=6s",
    creator: "パロディちゃん / Parody-chan",
    description: "日本のバラエティ番組やワイドショーの『生放送ハプニング』という、誰もが一度は目にしたことのある形式をAIで完全再現。テロップの出し方から現場の空気感まで驚くほどリアルですが、そこで起こる事故はAIならではの予測不能でシュールなものばかり。懐かしさと違和感が混ざり合う、中毒性の高いパロディ集です。",
    tool: "sora",
    type: 'youtube',
    tags: ["実写", "ネタ", ],
    category: 'movie',
    likes: 0
  },
  {
  id: "4",
    title: "カップシャッフル",
    url: "https://www.tiktok.com/@riotsukatsuki34/video/7611288886366506261",
    creator: "riotsukatsuki34",
    description: "『ぐぐががちゃん』が、カップシャッフルの手品に挑む愛くるしいショートアニメーション。手品の行方に一喜一憂する表情の変化が非常に豊かで、AI特有の滑らかな動きとキャラクターの生命感が絶妙に融合しています。ぐぐががちゃんの無邪気な反応に、見ているこちらも思わず笑顔になってしまう、癒やし効果抜群の一本です。",
    tool: "AI Animation",
    type: 'tiktok',
    thumbnailUrl: "/thumbnails/tk1.jpg",
    tags: ["アニメ", "ぐぐががちゃん",],
    category: 'movie',
    likes: 0 
  },
  {
    id: "5",
    title: "たこやき",
    url: "https://www.tiktok.com/@brunoguguga/video/7617604101475454229",
    creator: "Bruno Banana",
    description: "お馴染みの人気キャラクター『ぐぐががちゃん』が、今度はたこ焼き屋さんの店主に!? 小さな手（ヒレ）を器用に使って、一生懸命にたこ焼きを焼く姿がたまらなくキュートな作品です。屋台の熱気まで伝わってくるような活き活きとしたアニメーションと、ぐぐががちゃんのひたむきな表情に、思わずお腹が空いて心が温まる一本です。",
    tool: "AI Animation",
    type: 'tiktok',
    thumbnailUrl: "/thumbnails/tk2.jpg",
    tags: ["アニメ", "ぐぐががちゃん", ],
    category: 'movie',
    likes: 0 
  },
  {
    id: "6",
    title: "ぐぐががちゃんポテチを食べる",
    url: "https://www.tiktok.com/@lios_secondacc/video/7612560997290740999",
    creator: "lios_secondacc",
    description: "手のひらに乗ってしまうほど小さな『ぐぐががちゃん』が、自分と同じくらいの大きさのポテトチップスを貰って幸せそうに食べる癒やし動画。小さな口でパリパリと音を立てて食べる健気な姿は、見ているだけで日々の疲れが吹き飛ぶほどの破壊力があります。妖精のようなサイズ感と、ぐぐががちゃんの愛くるしさが完璧にマッチした一本です。",
    tool: "AI Animation",
    type: 'tiktok',    
    thumbnailUrl: "/thumbnails/tk3.jpg",
    tags: ["アニメ", "ぐぐががちゃん",],
    category: 'movie',
    likes: 0
  },
  {
    id: "7",
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
    id: "8",
    title: "初心者必見!AI実写動画の作り方をわかりやすく紹介します(Pollo AI)",
    url: "https://www.youtube.com/watch?v=rj8RGyU4_QU",
    creator: "とうや【AIイラストLab.】",
    tool: "another",
    type: 'youtube',
    tags: ["解説",],
    category: 'tutorial',
    likes: 0
  },
  {
    id: "9",
    title: "遂に人間不要!動画生成AI PIKAを使い倒すぞ!",
    url: "https://www.youtube.com/watch?v=z0lI-Do62rY",
    creator: "Hack Maaa",
    tool: "another",
    type: 'youtube',
    tags: ["解説","Pika"],
    category: 'tutorial',
    likes: 0
  },
  {
    id: "10",
    title: "You Won’t Believe What These Sora Kitty Cats Do Internet Breaking Moments!",
    url: "https://www.youtube.com/watch?v=3Q2Vr2vRThA",
    creator: "AI Universe",
    description: "料理に重量挙げ、果ては車の運転まで。AI『Sora』が描き出す、人間味溢れる猫たちの驚愕の日常を詰め込んだ作品集です。一つひとつのシーンがネットを騒がせるほど衝撃的で、AI特有のユーモアと、細部まで作り込まれた圧倒的なリアリティの融合が楽しめます。次はどんな猫が現れるのか、一時も目が離せないエンタメ性の高い一本です。",
    tool: "sora",
    type: 'youtube',
    tags: ["実写", "動物", "猫"],
    category: 'movie',
    likes: 0
  },
  {
    id: "11",
    title: "You Won’t Believe What These Sora Kitty Cats Do Absolutely Insane Moments!",
    url: "https://www.youtube.com/watch?v=u7DcOEnqdfA",
    creator: "AI Universe",
    description: "動画生成AI『Sora』の実力を存分に味わえる一作。猫のふわふわとした毛並みの質感や、複雑な調理器具の扱い、重いバーベルを持ち上げる際の筋肉の連動など、物理法則を理解したかのような滑らかな動きが圧巻です。『現実にありそうで、絶対にあり得ない』という不思議な光景を、最高レベルの映像美で堪能できます。",
    tool: "sora",
    type: 'youtube',
    tags: ["実写", "動物", "猫"],
    category: 'movie',
    likes: 0
  },
  {
    id: "12",
    title: "AIが作った映画予告『きのこたけのこWAR』",
    url: "https://www.youtube.com/watch?v=YoKp3gVlll0",
    creator: "きびまら",
    description: "長年続く『きのこ派』と『たけのこ派』の争いが、ついに映画化!? そんな空想を、AI技術によって圧倒的なリアリティで映像化した衝撃作です。ミリタリー装備に身を包んだ兵士たちのディテールや、炎に包まれる森の描写など、無駄に（褒め言葉）ハイクオリティな映像美が笑いと感動を誘います。パロディの域を超えた、手に汗握る1分間をぜひ体感してください。",
    tool: "Mixed AI",
    type: 'youtube',
    tags: ["実写", "シネマティック"],
    category: 'movie',
    likes: 0
  },
  {
    id: "13",
    title: "AIがバグってる教育番組",
    url: "https://www.youtube.com/watch?v=zkr42G_lPn4",
    creator: "パロディちゃん / Parody-chan",
    tool: "Mixed AI",
    type: 'youtube',
    tags: ["実写", "ネタ", ],
    category: 'movie',
    likes: 0
  },
  {
    id: "14",
    title: "Gugugaga: The Movie (Last Waddle)",
    url: "https://www.youtube.com/watch?v=A36-EkXwsrw",
    creator: "GUGUGAGA Daily",
    description: "群れを離れ、食べ物も水もない極寒の山奥へと、一人静かに歩みを進めるぐぐががちゃん。その『確実な死』への行進を、ただ見守ることしかできない観察者の苦悩と葛藤が描かれています。いつもの愛くるしい姿からは想像もつかない、あまりに切なく、そして神々しいまでの最期の足取り。生と死の境界線を美しく描き出した、心揺さぶられる短編映画です。",
    tool: "AI Animation",
    type: 'youtube',
    tags: ["アニメ", "シネマティック", "ぐぐががちゃん",],
    category: 'movie',
    likes: 0
  },
  {
    id: "15",
    title: "【2025年版】初心者向けRunway完全ガイド イラスト生成・動画生成・うまく作るコツまで",
    url: "https://www.youtube.com/watch?v=1q0LOyUHwYA",
    creator: "AI たろう",
    tool: "another",
    type: 'youtube',
    tags: ["解説", "Runway",],
    category: 'tutorial',
    likes: 0
  },
  {
    id: "16",
    title: "Dream Machine使い方解説 初心者でも簡単AI動画制作",
    url: "https://www.youtube.com/watch?v=HsDzpFTaZGE",
    creator: "HARUTA",
    tool: "another",
    type: 'youtube',
    tags: ["解説", "luma",],
    category: 'tutorial',
    likes: 0
  },
  {
    id: "17",
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
    id: "18",
    title: "Kling AIの使い方を完全解説!プロンプトのコツ&チュートリアルあり",
    url: "https://www.youtube.com/watch?v=MU8HFoxyQ6g",
    creator: "NOMAN AI",
    tool: "another",
    type: 'youtube',
    tags: ["解説", "Kling AI",],
    category: 'tutorial',
    likes: 0
  },  
  {
    id: "19",
    title: "【AI架空アニメ『高速乗ったらワシ以外逆走しとる件』OP",
    url: "https://www.youtube.com/watch?v=Ob5oyRsKcQc&list=RDOb5oyRsKcQc&start_radio=1",
    creator: "ぽめきちAI",
    description: "高速道路を逆走しているのは、果たして自分か、それとも周りか――。SNSで話題の『勘違いおじいちゃん』の物語が、架空のアニメOPとして登場！キャッチーな楽曲に合わせて描かれる、確信に満ちたおじいちゃんのキレキレな動きと、周囲のパニックとの温度差がクセになります。AIが生み出した、現代社会のシュールな縮図とも言える爆笑必至の一本です。",
    tool: "runway",    
    type: 'youtube',
    tags: ["アニメ",],
    category: 'movie',
    likes: 0
  },
  {
  id: "20",
    title: "わがししょくにん",
    url: "https://www.tiktok.com/@pontan.tan.ai/video/7476856198755519752",
    creator: "pontan.tan.ai",
    description: "もふもふのトイプードルが、職人のような手つきで繊細な和菓子を仕上げていく姿に、思わず見入ってしまう癒やし動画です。小さな前足で丁寧に細工を施す仕草や、完成した菓子を見つめる職人らしい凛とした佇まいが絶妙。可愛さと日本の伝統美が融合した、見ているだけで心がほっこりする一本です。",
    tool: "AI Animation",
    type: 'tiktok',    
    thumbnailUrl: "/thumbnails/tk4.jpg",
    tags: ["実写", "動物", "犬"],
    category: 'movie',
    likes: 0
  },
  {
    id: "21",
    title: "AIが考えたアニメ『魔王、コンビニでバイトする』OP",
    url: "https://www.youtube.com/watch?v=-kyf2wjMm2s",
    creator: "かみかぜ",
    description: "もしも魔王が現代のコンビニで働いていたら……という空想を、AI技術が最高にクールなアニメーションへと昇華。ラップ調の楽曲に乗せたスピード感あふれるカット割りと、細部まで作り込まれたコンビニの背景やキャラクターの表情が、本物の新作アニメの始まりを予感させます。AIによるストーリーテリングの進化を感じさせる一本です。",
    tool: "Mixed AI",    
    type: 'youtube',
    tags: ["アニメ",],
    category: 'movie',
    likes: 0
  }
];

