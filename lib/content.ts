export const site = {
  name: "Tintinkss",
  tagline: "by Jia",
  location: "Kottayam, Kerala",
  instagram: "https://www.instagram.com/tintinkss/",
  whatsapp: "917947138846",
  whatsappDisplay: "+91 7947138846",
  phone: "+91 7947138846",
  phoneDisplay: "+91 7947138846",
  email: "jia@tintinkss.com",
  founder: "Jia Susan Joseph",
};

export const nav = [
  { label: "Studio", href: "#studio" },
  { label: "Gallery", href: "#gallery" },
  { label: "Collection", href: "#collection" },
  { label: "Commissions", href: "#commissions" },
  { label: "Visit", href: "#visit" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "Kottayam, Kerala",
  headline: "Everything here\nwas mud once.",
  sub: "Tintinkss is a one-woman pottery studio where clay is thrown, glazed, and fired into pieces you'll actually reach for — bowls, cups, postcards, and calendar cards made slowly, by hand, one at a time.",
  cta: "See the collection",
};

export const artistStory = {
  kicker: "Meet the artist",
  name: "Jia Susan Joseph",
  image: "/founder.jpg",
  imageAlt: "Jia Susan Joseph throwing pottery at the wheel in Tintinkss studio",
  paragraphs: [
    "Jia started Tintinkss the way most good habits start — by accident. A wheel-throwing class turned into a Sunday ritual, and the Sunday ritual turned into a studio full of half-finished bowls that refused to stay a hobby.",
    "Every piece that leaves the studio has gone through her hands at least four times: thrown, trimmed, glazed, and packed. Nothing is slip-cast, nothing is mass-produced — if a mug looks slightly different from the one next to it, that's not a flaw, that's proof someone made it.",
    "When she's not at the wheel, she's usually answering DMs about custom orders, chasing good light for product photos, or convincing herself that one more glaze test batch is a reasonable use of a Tuesday.",
  ],
  signoff: "— Jia",
};

export const galleryCategories = [
  { key: "all", label: "All Works" },
  { key: "vases", label: "Vases & Pots" },
  { key: "favors", label: "Postcards & Favors" },
  { key: "collectibles", label: "Collectibles & Gifts" },
] as const;

export type GalleryCategoryKey = (typeof galleryCategories)[number]["key"];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Vases & Pots" | "Postcards & Favors" | "Collectibles & Gifts";
  categoryKey: "vases" | "favors" | "collectibles";
  tag: string;
  image?: string; // Optional image URL (e.g. "/gallery/my-image.jpg")
  description: string;
  inquiryCategory: string;
  aspectClass: string;
  colorTheme: string;
  potteryType: string;
  dimensions?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "terracotta-vase",
    title: "Ceramic Terracotta Vase",
    category: "Vases & Pots",
    categoryKey: "vases",
    tag: "One-of-a-Kind",
    image: "/gallery/vases-and-pots/terracotta-vase.jpg",
    description: "Wheel-thrown speckled terracotta vase with an organic rustic glaze finish, holding fresh blooms on a console.",
    inquiryCategory: "Vase / Planter",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-rust/35 via-clay-200 to-clay-300",
    potteryType: "Wheel-Thrown Vase",
    dimensions: "Approx. 14cm x 9cm",
  },
  {
    id: "studio-collection-display",
    title: "Studio Pottery Table Collection",
    category: "Vases & Pots",
    categoryKey: "vases",
    tag: "Studio Showcase",
    image: "/gallery/vases-and-pots/studio-collection-display.jpg",
    description: "Curated display of handcrafted cups, bud vases, planters, and candle holders fresh from the Kottayam kiln firing.",
    inquiryCategory: "Vase / Planter",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-clay-300 via-rust/25 to-clay-200",
    potteryType: "Ceramic Collection",
    dimensions: "Assorted Studio Pieces",
  },
  {
    id: "striped-ceramic-tumbler",
    title: "Cobalt Striped Ceramic Tumbler",
    category: "Vases & Pots",
    categoryKey: "vases",
    tag: "Hand-Painted",
    image: "/gallery/vases-and-pots/striped-ceramic-tumbler.jpg",
    description: "Wheel-thrown ceramic tumbler with bold cobalt blue vertical brushstrokes and a built-in angled rim rest.",
    inquiryCategory: "Wheel-thrown Mug / Cup",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-blue-900/20 via-porcelain to-clay-200",
    potteryType: "Ceramic Tumbler",
    dimensions: "300ml capacity",
  },
  {
    id: "floral-ceramic-tumbler",
    title: "Wildflower Ceramic Tumbler",
    category: "Vases & Pots",
    categoryKey: "vases",
    tag: "Small Batch",
    image: "/gallery/vases-and-pots/floral-ceramic-tumbler.jpg",
    description: "Tactile glazed tumbler with delicate hand-painted wildflower florals and an ergonomic angled drinking rim.",
    inquiryCategory: "Wheel-thrown Mug / Cup",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-sage/30 via-porcelain to-clay-200",
    potteryType: "Floral Tumbler",
    dimensions: "300ml capacity",
  },
  {
    id: "flower-pot",
    title: "Bedside Ceramic Flower Pot",
    category: "Vases & Pots",
    categoryKey: "vases",
    tag: "Studio Made",
    image: "/gallery/vases-and-pots/flower-pot.jpg",
    description: "Warm earthenware pot thrown on the wheel, made to bring a touch of living botanical warmth to your nightstand or desk.",
    inquiryCategory: "Vase / Planter",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-sage/35 via-clay-200 to-clay-300",
    potteryType: "Wheel-Thrown Pot",
    dimensions: "Approx. 10cm x 10cm",
  },
  {
    id: "ceramic-magnets",
    title: "Handmade Ceramic Fridge Magnets",
    category: "Collectibles & Gifts",
    categoryKey: "collectibles",
    tag: "Small Batch",
    image: "/gallery/collectibles-and-gifts/ceramic-magnets.jpg",
    description: "Individually shaped and glazed ceramic fridge magnets featuring smileys, 'GOD IS LOVE', and 'HOME' on bespoke illustrated cards.",
    inquiryCategory: "Custom Story Piece",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-clay-200 via-bisque to-sage/30",
    potteryType: "Ceramic Magnets",
    dimensions: "Set of 3 pieces",
  },
  {
    id: "ceramic-pebble-pins",
    title: "Botanical Ceramic Pebble Rests",
    category: "Collectibles & Gifts",
    categoryKey: "collectibles",
    tag: "Handmade Detail",
    image: "/gallery/collectibles-and-gifts/ceramic-pebble-pins.jpg",
    description: "Delicate glazed ceramic pebble discs with hand-painted tulips, blossoms, and fruits — perfect as chopstick rests, brooches, or desk accents.",
    inquiryCategory: "Custom Story Piece",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-porcelain via-sage/20 to-clay-200",
    potteryType: "Ceramic Pebble Accents",
    dimensions: "Set of assorted mini pieces",
  },
  {
    id: "custom-name-hangings",
    title: "Personalized Ceramic Name Keepsake",
    category: "Collectibles & Gifts",
    categoryKey: "collectibles",
    tag: "Custom Commission",
    image: "/gallery/collectibles-and-gifts/custom-name-hangings.jpg",
    description: "Custom hand-cut and glazed ceramic alphabet charms and floral ornaments tied with rustic jute twine for personalized room & nursery decor.",
    inquiryCategory: "Custom Story Piece",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-rust/25 via-porcelain to-sage/30",
    potteryType: "Custom Name Charms",
    dimensions: "Customized letters & ornaments",
  },
  {
    id: "angel-keepsakes",
    title: "Ceramic Angel Keepsake Favors",
    category: "Postcards & Favors",
    categoryKey: "favors",
    tag: "Custom Commission",
    image: "/gallery/postcards-and-favors/angel-keepsakes.jpg",
    description: "Handcrafted ceramic angel keepsakes adorned with delicate hand-painted pink floral motifs, tied with natural jute onto personalized Holy Communion cards.",
    inquiryCategory: "Illustrated Ceramic Postcard",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-rust/20 via-porcelain to-clay-200",
    potteryType: "Ceramic Ornament",
    dimensions: "8cm x 7cm on A6 card",
  },
  {
    id: "communion-favors",
    title: "Holy Communion Angel & Cross Favors",
    category: "Postcards & Favors",
    categoryKey: "favors",
    tag: "Custom Order Drop",
    image: "/gallery/postcards-and-favors/communion-favors.jpg",
    description: "Custom celebratory sets featuring handmade glazed ceramic angels and cross pendants with rustic jute cords and personalized event cards.",
    inquiryCategory: "Custom Story Piece",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-clay-300 via-clay-200 to-sage/25",
    potteryType: "Ceramic Favors Set",
    dimensions: "Custom batch production",
  },
];

export const collection = [
  {
    title: "Pottery",
    description: "Wheel-thrown bowls, cups, and vases — each one trimmed and glazed by hand, so no two are quite the same.",
    note: "small batches",
  },
  {
    title: "Postcards",
    description: "Illustrated ceramic postcards you can actually send, or keep pinned somewhere you'll see them daily.",
    note: "made to mail",
  },
  {
    title: "Calendar Cards",
    description: "Twelve months, twelve little reminders — a year of keepsakes instead of a year of grid squares.",
    note: "seasonal drop",
  },
  {
    title: "Custom Collectibles",
    description: "One-off pieces built around a story you bring — an anniversary, a house, a name that matters.",
    note: "made to order",
  },
];

export const gallery = [
  { caption: "Fresh off the wheel, still soft enough to reshape." },
  { caption: "Trimming day — the part nobody sees but every piece needs." },
  { caption: "Glaze testing: more failures than successes, always." },
  { caption: "Studio shelves, mid-firing chaos." },
  { caption: "Packed by hand, cushioned in shredded paper, not bubble wrap." },
  { caption: "The calendar cards, laid out to dry." },
];

export const commissions = {
  kicker: "Custom orders",
  headline: "Tell Jia the story.\nShe'll throw the piece.",
  steps: [
    {
      title: "Send the brief",
      description: "A message with the occasion, the person, or the idea — even a half-formed one works.",
    },
    {
      title: "Sketch & quote",
      description: "You'll get a rough sketch, a size/glaze recommendation, and a price before anything touches clay.",
    },
    {
      title: "Thrown & fired",
      description: "Each custom piece takes 2–3 weeks — thrown, bisque-fired, glazed, and fired again.",
    },
    {
      title: "Packed & shipped",
      description: "Wrapped by hand and shipped with enough padding to survive the trip from Kottayam to you.",
    },
  ],
  note: "Custom orders are currently paused for Jun–Aug. New commissions reopen September.",
};

export const visit = {
  kicker: "Visit the studio",
  headline: "The wheel lives in Kottayam.",
  address: "Kottayam, Kerala, India",
  description: "Studio visits are by appointment — message ahead and Jia will save you a stool by the wheel.",
  hours: [
    { day: "Mon – Fri", time: "10:00 AM – 5:00 PM" },
    { day: "Weekends", time: "By appointment only" },
  ],
};

export const faq = [
  {
    q: "Are you taking orders right now?",
    a: "Custom orders are paused for Jun–Aug and reopen from September. Ready-made pieces from the collection can still ship in the meantime.",
  },
  {
    q: "How long does shipping take?",
    a: "Ready-made pieces ship within 3–5 working days. Custom pieces ship after the full 2–3 week making process.",
  },
  {
    q: "Do you ship outside Kerala?",
    a: "Yes — pieces are shipped across India, packed by hand with extra padding since ceramics don't forgive rough handling.",
  },
  {
    q: "Can I request a specific glaze color?",
    a: "For custom orders, yes. For the ready-made collection, glaze colors are fixed per batch since each firing behaves a little differently.",
  },
  {
    q: "What if my piece arrives damaged?",
    a: "Message with a photo within 48 hours of delivery and it'll be sorted — replacement or refund, no argument.",
  },
];

export const instagramPhotos = [
  {
    image: "/instagram/ceramic-morning-cups.jpg",
    alt: "Handcrafted ceramic mugs and keepsake plaque on wooden tray in morning sun",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-01.jpg",
    alt: "Tintinkss studio ceramic creation",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/ruffled-candle-holders.jpg",
    alt: "Hand holding two ruffled floral ceramic candle stands",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-02.jpg",
    alt: "Tintinkss handmade ceramic drop",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/floral-blossom-mug.jpg",
    alt: "Hand holding a white ceramic mug painted with delicate floral blossoms",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-03.jpg",
    alt: "Handcrafted pottery details",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/candle-stands-spread.jpg",
    alt: "Spread of ruffled ceramic candle holders and mini bud vases",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-04.jpg",
    alt: "Clay studio process moment",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/ceramic-pebble-pins.jpg",
    alt: "Glazed botanical ceramic pebble accents and chopstick rests",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-05.jpg",
    alt: "Tintinkss handmade collection",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/custom-name-hangings.jpg",
    alt: "Personalized ceramic name charms with striped letters and jute cords",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-06.jpg",
    alt: "Ceramic keepsake details",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/striped-ceramic-tumbler.jpg",
    alt: "Hand-painted cobalt striped ceramic tumbler",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-07.jpg",
    alt: "Tintinkss pottery archive",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/studio-collection-display.jpg",
    alt: "Studio table display with cups, bud vases, and planters",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-08.jpg",
    alt: "Wheel-thrown glazed ceramics",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-09.jpg",
    alt: "Tintinkss ceramic craft",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-10.jpg",
    alt: "Handmade ceramic pottery drop",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-11.jpg",
    alt: "Tintinkss studio moments",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-12.jpg",
    alt: "Handmade ceramic keepsakes",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-13.jpg",
    alt: "Tintinkss glazed pottery",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-14.jpg",
    alt: "Wheel-thrown ceramics in Kottayam",
    tag: "@tintinkss",
  },
  {
    image: "/instagram/insta-shot-15.jpg",
    alt: "Tintinkss custom pottery works",
    tag: "@tintinkss",
  },
];

export const footer = {
  cta: "Come find us on Instagram",
  handle: "@tintinkss",
};
