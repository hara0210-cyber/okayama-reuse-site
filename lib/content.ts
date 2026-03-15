export type Method = {
  slug: string;
  title: string;
  lead: string;
  description: string;
  points: string[];
};

export type Category = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  brands: string[];
  points: string[];
  tips: string[];
  excluded: string[];
  heroImage: string;
};

export type ResultItem = {
  slug: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  comment: string;
  date: string;
  image: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const methods: Method[] = [
  {
    slug: "store",
    title: "店頭買取",
    lead: "その場で査定、即日現金化にも対応",
    description: "岡山市内の拠点で受付。予約優先で待ち時間を減らし、対面で丁寧に査定します。",
    points: ["即日査定", "対面で相談可能", "法人運営で安心"]
  },
  {
    slug: "shipping",
    title: "宅配買取",
    lead: "全国から送るだけで査定完了",
    description: "梱包して送るだけ。遠方でも送料負担を抑えながら、スムーズに査定依頼ができます。",
    points: ["全国対応", "非対面で完結", "到着後すぐ査定"]
  },
  {
    slug: "visit",
    title: "出張買取",
    lead: "大量品や持ち運びが難しいお品物に",
    description: "岡山県内を中心に出張査定。大型品やまとめ売りでも負担なくご利用いただけます。",
    points: ["大型品対応", "まとめ売り歓迎", "訪問前に事前確認"]
  },
  {
    slug: "line",
    title: "LINE査定",
    lead: "写真を送るだけのかんたん事前査定",
    description: "スマホから写真と簡単な情報を送るだけで、概算査定をご案内します。",
    points: ["24時間受付", "スマホ完結", "問い合わせ前に相場感がわかる"]
  }
];

export const categories: Category[] = [
  {
    slug: "kids-clothes",
    name: "子供服買取",
    summary: "成長でサイズアウトした子供服を、まとめて丁寧に査定します。",
    description: "人気ブランドや状態の良い子供服は需要が高く、季節前のご依頼で査定額が伸びやすい傾向です。",
    brands: ["familiar", "Miki House", "PETIT BATEAU", "THE NORTH FACE"],
    points: ["サイズ表記が明確", "記名なし", "毛玉や色褪せが少ない"],
    tips: ["シーズン前に売る", "上下セットでまとめる", "タグ付きは別袋に分ける"],
    excluded: ["著しい汚れ", "破れ", "安全基準を満たさないもの"],
    heroImage: "/images/categories/kids-clothes.svg"
  },
  {
    slug: "baby-goods",
    name: "ベビー用品買取",
    summary: "ベビーカーやチャイルドシートなど使用期間の短い用品に対応。",
    description: "取扱説明書や付属品がそろっていると査定が安定しやすく、安全性確認もしやすくなります。",
    brands: ["Aprica", "Combi", "cybex", "Pigeon"],
    points: ["付属品完備", "安全基準ラベルあり", "動作確認済み"],
    tips: ["使用感を拭き取る", "箱があれば一緒に出す", "購入時期をメモする"],
    excluded: ["破損あり", "使用期限切れ", "衛生上再販できないもの"],
    heroImage: "/images/categories/baby-goods.svg"
  },
  {
    slug: "brand-apparel",
    name: "ブランド服買取",
    summary: "人気ブランドのアパレルやシーズン商材を適正に査定。",
    description: "トレンド性や状態、付属品の有無を見ながら販路に合わせた査定を行います。",
    brands: ["MONCLER", "BURBERRY", "MARNI", "Sacai"],
    points: ["人気シーズン", "正規タグあり", "クリーニング済み"],
    tips: ["購入証明があれば添付", "ハンガーやガーメントも一緒に", "保管臭を減らす"],
    excluded: ["コピー品", "大きな破れ", "カビ臭が強いもの"],
    heroImage: "/images/categories/brand-apparel.svg"
  },
  {
    slug: "sneakers",
    name: "スニーカー買取",
    summary: "限定モデルや人気コラボを中心に、相場を踏まえて査定。",
    description: "箱、替え紐、タグなどの付属品があると再販しやすく、査定にも反映しやすくなります。",
    brands: ["NIKE", "adidas", "New Balance", "ASICS"],
    points: ["人気モデル", "ソール減りが少ない", "箱付き"],
    tips: ["ソールの汚れを軽く落とす", "付属品をそろえる", "保管状態を整える"],
    excluded: ["加水分解", "大きなソール剥がれ", "真贋不明品"],
    heroImage: "/images/categories/sneakers.svg"
  },
  {
    slug: "watches",
    name: "時計買取",
    summary: "機械式からクォーツまで、ブランドと状態を見て査定。",
    description: "動作品はもちろん、不動品でもブランドやモデルによってはお値段が付く場合があります。",
    brands: ["ROLEX", "OMEGA", "SEIKO", "CASIO"],
    points: ["動作確認済み", "箱・保証書あり", "オーバーホール履歴あり"],
    tips: ["付属品をまとめる", "ベルト調整コマも保管", "不動でも捨てない"],
    excluded: ["コピー品", "著しい腐食", "修理不能品"],
    heroImage: "/images/categories/watches.svg"
  },
  {
    slug: "bags",
    name: "バッグ買取",
    summary: "ブランドバッグやレザーアイテムを幅広く査定。",
    description: "角スレや型崩れは査定に影響しますが、人気モデルなら使用感があってもご相談可能です。",
    brands: ["LOUIS VUITTON", "CHANEL", "GUCCI", "FENDI"],
    points: ["型番確認可能", "付属品あり", "内側のベタつきが少ない"],
    tips: ["詰め物で形を整える", "湿気対策をする", "購入時の袋や箱も一緒に"],
    excluded: ["コピー品", "ベタつきが重度", "再販困難な破損品"],
    heroImage: "/images/categories/bags.svg"
  },
  {
    slug: "precious-metals",
    name: "貴金属買取",
    summary: "金・プラチナ・ジュエリーを相場ベースで査定。",
    description: "刻印や重量、デザイン性を確認し、その日の相場に基づいて査定します。",
    brands: ["K18", "Pt900", "Tiffany & Co.", "Cartier"],
    points: ["刻印あり", "石の情報あり", "切れたチェーンも可"],
    tips: ["鑑定書や保証書があれば添付", "片方だけのピアスも捨てない", "複数まとめて依頼"],
    excluded: ["素材不明", "法令上取扱不可のもの", "盗品の疑いがあるもの"],
    heroImage: "/images/categories/precious-metals.svg"
  }
];

export const results: ResultItem[] = [
  {
    slug: "familiar-set",
    title: "familiar 子供服 12点セット",
    category: "子供服",
    condition: "A",
    price: 12000,
    comment: "人気ブランドでまとめ点数が多く、状態も良好だったため高評価。",
    date: "2026-02-18",
    image: "https://images.unsplash.com/photo-1549588974-98aae09c3845?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=1600"
  },
  {
    slug: "omega-speedmaster",
    title: "OMEGA Speedmaster",
    category: "時計",
    condition: "B",
    price: 210000,
    comment: "付属品完備で動作も安定しており、相場を踏まえて査定。",
    date: "2026-02-27",
    image: "https://images.unsplash.com/photo-1636639821444-479368c96514?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=1600"
  },
  {
    slug: "louis-vuitton-bag",
    title: "LOUIS VUITTON モノグラムバッグ",
    category: "バッグ",
    condition: "B",
    price: 48000,
    comment: "角スレはあるものの人気モデルのため価格を確保。",
    date: "2026-03-01",
    image: "https://images.unsplash.com/photo-1691480150204-66dd1eb77391?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=1600"
  }
];

export const news: NewsItem[] = [
  {
    slug: "spring-campaign",
    title: "春のまとめ売りキャンペーンを開始しました",
    excerpt: "子供服・ベビー用品のまとめ査定強化期間です。",
    body: "春の衣替えにあわせて、子供服・ベビー用品のまとめ査定を強化中です。点数が多いほど査定しやすく、LINE査定からの事前相談にも対応しています。",
    date: "2026-03-10"
  },
  {
    slug: "new-shipping-kit",
    title: "宅配買取キットの受付を開始しました",
    excerpt: "遠方からでも依頼しやすい宅配キットを導入しました。",
    body: "宅配買取をご利用いただきやすくするため、簡易梱包キットの受付を開始しました。申込後に必要資材を順次発送します。",
    date: "2026-02-20"
  }
];

export const faqs: FaqItem[] = [
  {
    question: "査定だけでもお願いできますか？",
    answer: "はい、査定のみでも歓迎です。概算はLINE、本査定は店頭・宅配・出張で承ります。"
  },
  {
    question: "本人確認書類は必要ですか？",
    answer: "古物営業法に基づき、成約時には本人確認書類の提示をお願いしています。"
  },
  {
    question: "壊れているものでも買取できますか？",
    answer: "カテゴリやブランドにより可能です。時計やバッグなどは状態によりご案内できますのでご相談ください。"
  },
  {
    question: "LINE査定の金額は確定ですか？",
    answer: "写真ベースの概算です。最終金額は実物確認後にご案内します。"
  }
];
