export const site = {
  name: "Tintinkss",
  tagline: "by Jia",
  location: "Kottayam, Kerala",
  instagram: "https://www.instagram.com/tintinkss/",
  whatsapp: "919446000000", // Update with actual studio number
  whatsappDisplay: "+91 WhatsApp",
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
  {
    id: "speckled-mug",
    title: "Wheel-Thrown Speckled Mug",
    category: "Vases & Pots",
    categoryKey: "vases",
    tag: "Signature Drop",
    image: "", // Placeholder - drop image into public/gallery/vases-and-pots/
    description: "Comfortable thumb-rest handle with earthy iron flecks pulling through a soft milk glaze.",
    inquiryCategory: "Wheel-thrown Mug / Cup",
    aspectClass: "aspect-[3/4]",
    colorTheme: "from-rust/25 via-clay-200 to-clay-300",
    potteryType: "Wheel-Thrown Mug",
    dimensions: "320ml capacity",
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

export const footer = {
  cta: "Come find us on Instagram",
  handle: "@tintinkss",
};
