import {
  MetricStat,
  CoreValue,
  BrandItem,
  AdvantageItem,
  WorkflowStep,
  DepartmentItem,
  PortfolioSample,
  OfflineEvent,
  ClientPartnerGroup,
  PartnerBrandItem,
  TestimonialItem,
  OfficeLocation,
  ContactInfo,
  FaqItem
} from '../types/CompanyProfileTypes';

export const METRIC_STATS: MetricStat[] = [
  {
    id: 'stat-years',
    value: '7+ Tahun',
    label: 'Pengalaman Terpercaya',
    description: 'Dipercaya sebagai produsen tas & apparel lokal yang stylish dan adaptif.',
    iconName: 'calendar'
  },
  {
    id: 'stat-sales',
    value: '30.000+',
    label: 'Produk / Bulan',
    description: 'Rata-rata volume produksi & penjualan stabil di platform online dan offline.',
    iconName: 'shopping-bag'
  },
  {
    id: 'stat-followers',
    value: '500.000+',
    label: 'Pengikut Digital',
    description: 'Komunitas audiens aktif di berbagai platform digital dan media sosial.',
    iconName: 'users'
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    letter: 'S',
    name: 'Service Excellent',
    subtitle: 'Pelayanan Prima & Tulus',
    description: 'Memberikan pelayanan terbaik dengan sepenuh hati, profesional, cepat, dan berorientasi pada kepuasan pelanggan jangka panjang.'
  },
  {
    letter: 'V',
    name: 'Vision Achievement',
    subtitle: 'Pencapaian Visi Terarah',
    description: 'Memiliki visi yang jelas dan berkomitmen mengubahnya menjadi pencapaian nyata melalui kerja keras, disiplin, dan kolaborasi sinergis.'
  },
  {
    letter: 'N',
    name: 'Never Give Up',
    subtitle: 'Semangat Tangguh Berkelanjutan',
    description: 'Pantang menyerah dalam menghadapi tantangan pasar, terus berinovasi, mencari solusi kreatif, dan bangkit mencapai tujuan bersama.'
  }
];

export const VISION_DATA = {
  title: 'Visi Perusahaan',
  statement: 'Menjadi brand apparel dan lifestyle terpercaya serta adaptif di Indonesia, dengan pertumbuhan berkelanjutan melalui kanal digital, pasar korporasi, serta jaringan distributor dan reseller yang strategis.'
};

export const MISSION_LIST: string[] = [
  'Mengembangkan produk apparel dan lifestyle berkualitas tinggi yang relevan untuk pasar ritel, korporasi, dan distribusi.',
  'Mengoptimalkan kanal digital dan marketplace sebagai fondasi pertumbuhan penjualan ritel.',
  'Membangun lini korporasi yang berkelanjutan, termasuk produk custom dan merchandise resmi.',
  'Memperluas jaringan distributor dan reseller nasional yang kuat untuk memperluas jangkauan pasar.',
  'Membangun sumber daya manusia serta sistem operasional yang adaptif, efisien, dan profesional.',
  'Menjalin kemitraan jangka panjang yang saling menguntungkan dengan pelanggan, distributor, reseller, dan mitra produksi.'
];

export const BRAND_ITEMS: BrandItem[] = [
  {
    id: 'sevine',
    name: 'SEVINE',
    category: 'bag',
    tagline: 'Tas Stylish & Fungsional',
    description: 'Tas stylish dan fungsional yang dirancang khusus untuk menemani mobilitas harian dengan tampilan youthful dan material pilihan.',
    highlightPoints: ['Waterproof Fabric', 'Multi-compartment Kompartemen', 'Jahitan Bar-tack Kuat'],
    badgeColor: 'bg-doff-navy text-white',
    targetMarket: 'Aktivitas kampus, kerja harian, dan gaya kasual modern',
    imageUrl: '/assets/brands/logo-sevine-1.webp',
    imageAlt: 'Logo brand SEVINE — Tas harian tahan air produksi CV. Sevine Indonesia'
  },
  {
    id: 'klou',
    name: 'klou',
    category: 'apparel',
    tagline: 'Pakaian Basic & Timeless',
    description: 'Pakaian basic yang nyaman dengan siluet timeless untuk gaya sehari-hari yang effortless, sejuk, dan mudah dipadupadankan.',
    highlightPoints: ['Katun Premium Breathable', 'Jahitan Rantai Standar Ekspor', 'Warna Muted Earth Tone'],
    badgeColor: 'bg-[#5B6B58] text-white',
    targetMarket: 'Pencinta busana kasual minimalis & santai',
    imageUrl: '/assets/brands/logo-brand-klou.webp',
    imageAlt: 'Logo brand klou — Pakaian basic katun breathable produksi CV. Sevine Indonesia'
  },
  {
    id: 'laluna',
    name: 'LALUNA INDONESIA',
    category: 'bag',
    tagline: 'Tas Elegan & Praktis',
    description: 'Koleksi tas elegan dan praktis yang diciptakan untuk menyempurnakan gaya hidup modern wanita dengan sentuhan anggun nan mewah.',
    highlightPoints: ['Tekstur Kulit Sintetis Lembut', 'Aksen Hardware Gold Redup', 'Desain Ergonomis Ringan'],
    badgeColor: 'bg-[#8F3B4A] text-white',
    targetMarket: 'Wanita karier, acara semi-formal, dan gaya feminin berkelas',
    imageUrl: '/assets/brands/logo-brand-laluna.webp',
    imageAlt: 'Logo brand LALUNA INDONESIA — Koleksi tas wanita elegan kulit sintetis lembut'
  },
  {
    id: 'assaif',
    name: 'ASSAIF MUSLIM MENSWEAR',
    category: 'muslim-wear',
    tagline: 'Busana Muslim Pria Modern',
    description: 'Busana muslim pria modern berkarakter maskulin, rapi, dan nyaman untuk ibadah harian maupun momen perayaan istimewa.',
    highlightPoints: ['Material Ringan Tidak Gerah', 'Potongan Modern Regular-Fit', 'Detail Kerah Shanghai Presisi'],
    badgeColor: 'bg-[#8A5B38] text-white',
    targetMarket: 'Pria modern untuk ibadah, kerja santun, dan busana hari raya',
    imageUrl: '/assets/brands/logo-brand-assaif.webp',
    imageAlt: 'Logo brand ASSAIF MUSLIM MENSWEAR — Busana muslim pria modern dan koko kurta'
  },
  {
    id: 'nabira',
    name: 'NABIRA',
    category: 'muslim-wear',
    tagline: 'Busana Muslim Perempuan Kontemporer',
    description: 'Busana muslim perempuan yang memadukan keanggunan siluet, kenyamanan bahan flowy, dan sentuhan motif kontemporer yang sopan.',
    highlightPoints: ['Kain Lembut Jatuh Sempurna', 'Wudhu-friendly Sleeve', 'Motif Eksklusif Sevine Lab'],
    badgeColor: 'bg-[#8B6E8C] text-white',
    targetMarket: 'Muslimah aktif yang mengutamakan kenyamanan dan keanggunan',
    imageUrl: '/assets/brands/logo-brand-nabira.webp',
    imageAlt: 'Logo brand NABIRA — Busana muslimah kontemporer wudhu-friendly'
  }
];

export const ADVANTAGES_LIST: AdvantageItem[] = [
  {
    id: 1,
    title: 'Tenaga Ahli Berpengalaman',
    description: 'Didukung tim penjahit, desainer pola, dan operator mesin terampil yang berpengalaman panjang di industri apparel dan lifestyle.',
    iconKey: 'expert'
  },
  {
    id: 2,
    title: 'Proses Produksi Mandiri',
    description: 'Fasilitas manufaktur dikelola langsung secara in-house untuk memastikan efisiensi biaya, kontrol bahan baku, dan konsistensi mutu produk.',
    iconKey: 'factory'
  },
  {
    id: 3,
    title: 'Inovasi Sesuai Tren Pasar',
    description: 'Riset desain berkelanjutan menjamin setiap rilisan produk selalu relevan dengan preferensi gaya terkini konsumen muda dan korporasi.',
    iconKey: 'trend'
  },
  {
    id: 4,
    title: 'Komunikasi Transparan',
    description: 'Memberikan transparansi informasi dan alur kerja sama yang jelas mulai dari tahap konsultasi sampel hingga kesepakatan final.',
    iconKey: 'transparent'
  },
  {
    id: 5,
    title: 'Komitmen Ketepatan Waktu',
    description: 'Dedikasi tinggi terhadap pemenuhan jadwal produksi dan ketepatan tenggat waktu pengiriman tanpa kompromi pada kualitas.',
    iconKey: 'ontime'
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Market Analysis',
    description: 'Mengidentifikasi tren pasar fashion terkini, preferensi pelanggan, dan peluang produk baru yang potensial.',
    category: 'Riset & Data',
    iconKey: 'analysis'
  },
  {
    step: 2,
    title: 'Concept Planning',
    description: 'Mengembangkan moodboard, eksplorasi desain, pemilihan palet warna estetis, serta seleksi material berkualitas tinggi.',
    category: 'Kreatif',
    iconKey: 'concept'
  },
  {
    step: 3,
    title: 'Product Development',
    description: 'Membuat sampel prototipe (sampling) serta menguji dan menyempurnakan detail ergonomi sebelum proses jahit massal.',
    category: 'R&D',
    iconKey: 'dev'
  },
  {
    step: 4,
    title: 'Production',
    description: 'Memproduksi secara massal di fasilitas mandiri berdasarkan pola yang telah disetujui dan parameter mutu presisi.',
    category: 'Manufaktur',
    iconKey: 'production'
  },
  {
    step: 5,
    title: 'Evaluation & Revision',
    description: 'Proses Quality Control (QC) menyeluruh untuk mengecek ketahanan jahitan, resleting, dan kerapian akhir setiap produk.',
    category: 'Kendali Mutu',
    iconKey: 'evaluation'
  },
  {
    step: 6,
    title: 'Product Release',
    description: 'Meluncurkan produk jadi ke pasar melalui katalog digital, kampanye media sosial, dan etalase toko resmi.',
    category: 'Peluncuran',
    iconKey: 'release'
  },
  {
    step: 7,
    title: 'Delivery',
    description: 'Pengemasan rapi dan aman dengan pengiriman terjadwal ke mitra distributor, klien korporat, atau pembeli ritel.',
    category: 'Logistik',
    iconKey: 'delivery'
  }
];

export const DEPARTMENTS_LIST: DepartmentItem[] = [
  {
    id: 'creative',
    title: 'Creative & Digital Marketing',
    description: 'Mendorong pertumbuhan penjualan online, menganalisis performa analitik digital, serta memproduksi konten visual kreatif dan strategi pemasaran menarik.',
    scope: 'Konten, Sosial Media & Kampanye Iklan'
  },
  {
    id: 'sales',
    title: 'Sales & Partnership',
    description: 'Mendorong akselerasi omzet penjualan dan membina kemitraan bisnis strategis dengan klien B2B, reseller, dan mitra korporasi.',
    scope: 'B2B Corporate, Reseller, & Client Relations'
  },
  {
    id: 'prod-dev',
    title: 'Product Development',
    description: 'Mengembangkan prototipe produk inovatif berdasarkan tren pasar apparel terkini dan kebutuhan spesifik pelanggan.',
    scope: 'Riset Material, Pola & Desain Inovatif'
  },
  {
    id: 'production-qc',
    title: 'Production & Quality Control',
    description: 'Memastikan proses lini jahit dan perakitan berjalan efisien serta mengawal ketat konsistensi kualitas standar ekspor.',
    scope: 'Lini Manufaktur Mandiri & QC Bar-tack'
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    description: 'Mengelola tata kelola perencanaan finansial, alokasi anggaran operasional yang sehat, dan akuntabilitas transaksi perusahaan.',
    scope: 'Penganggaran, Pajak & Transaksi Bisnis'
  },
  {
    id: 'hr',
    title: 'Human Resources',
    description: 'Mendukung pengembangan kompetensi para tenaga kerja terampil dan memupuk lingkungan kerja kolaboratif yang positif.',
    scope: 'Pengembangan Talenta & Kesejahteraan Karyawan'
  }
];

export const PORTFOLIO_SAMPLES: PortfolioSample[] = [
  {
    id: 'sample-1',
    title: 'Sevine Daily Backpack Pro',
    brand: 'SEVINE',
    category: 'tas',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Sampel produksi tas ransel waterproof Sevine Daily Backpack Pro oleh pabrik CV. Sevine Indonesia',
    description: 'Tas ransel kompartemen ganda dengan material tahan air dan slot laptop busa peredam getaran.'
  },
  {
    id: 'sample-2',
    title: 'klou Everyday Boxy Tee',
    brand: 'klou',
    category: 'pakaian',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Sampel kaos basic katun combed 24s klou Everyday Boxy Tee warna earth tone',
    description: 'Kaos siluet santai berbahan combed 24s berpori sejuk dengan warna bumi matte.'
  },
  {
    id: 'sample-3',
    title: 'Laluna Crescent Baguette',
    brand: 'LALUNA INDONESIA',
    category: 'tas',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Tas bahu wanita kulit sintetis Laluna Crescent Baguette dengan buckle gold doff',
    description: 'Tas bahu elegan dengan aksen buckle emas doff dan kulit sintetis bertekstur halus.'
  },
  {
    id: 'sample-4',
    title: 'Assaif Kurta Modern Slim',
    brand: 'ASSAIF',
    category: 'muslim',
    image: 'https://images.unsplash.com/photo-1622445262464-84b14e4b7de7?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Baju koko kurta pria Assaif Kurta Modern Slim berbahan katun toyobo',
    description: 'Kemeja koko lengan panjang dengan kancing tersembunyi dan material katun toyobo premium.'
  },
  {
    id: 'sample-5',
    title: 'Nabira Pashmina & Abaya Set',
    brand: 'NABIRA',
    category: 'muslim',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Busana muslimah set gamis abaya dan pashmina flowy oleh brand Nabira',
    description: 'Set gamis flowy dengan detail lipit feminin dan bahan bertekstur dingin di kulit.'
  },
  {
    id: 'sample-6',
    title: 'Sevine Casual Crossbody Pouch',
    brand: 'SEVINE',
    category: 'tas',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Sling bag mini Sevine Casual Crossbody Pouch multi-kompartemen',
    description: 'Sling bag mini berkapasitas lega untuk membawa dompet, ponsel, dan kunci secara terorganisir.'
  }
];

export const OFFLINE_EVENTS: OfflineEvent[] = [
  {
    id: 'event-hms-35',
    title: 'HELLO MARKET SOLO #35',
    location: 'Solo Paragon Mall, Surakarta',
    year: 'Official Exhibitor',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Dokumentasi booth pameran CV. Sevine Indonesia di Hello Market Solo #35 Solo Paragon Mall',
    description: 'Partisipasi booth eksklusif Sevine menampilkan rilisan tas terbaru dengan antusiasme ribuan pengunjung lokal.'
  },
  {
    id: 'event-project-x',
    title: 'PROJECT X MARKET',
    location: 'Atrium Exhibition Center',
    year: 'Featured Creative Brand',
    image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Aktivasi pop-up store CV. Sevine Indonesia di pameran kreatif Project X Market',
    description: 'Eksplorasi aktivasi pop-up store interaktif dan instalasi visual estetis menjangkau audiens muda kreatif.'
  },
  {
    id: 'event-hms-36',
    title: 'HELLO MARKET SOLO #36',
    location: 'Solo Square Convention',
    year: 'Prime Fashion Booth',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Peluncuran koleksi multi-brand Sevine Indonesia di pameran Hello Market Solo #36 Solo Square',
    description: 'Kolaborasi peluncuran koleksi spesial multi-brand Sevine bersama rekanan komunitas lokal.'
  }
];

export const ALL_PARTNER_BRANDS: PartnerBrandItem[] = [
  // Beauty & Skincare
  {
    id: 'wardah',
    name: 'Wardah Cosmetics',
    category: 'beauty',
    categoryLabel: 'Beauty & Skincare',
    logo: '/assets/brands/logo-wardah.webp',
    imageAlt: 'Logo Wardah Cosmetics — Mitra B2B pouch dan tas promosi CV. Sevine Indonesia',
    role: 'Leading Cosmetics GWP & Bags'
  },
  {
    id: 'emina',
    name: 'Emina Beauty',
    category: 'beauty',
    categoryLabel: 'Beauty & Skincare',
    logo: '/assets/brands/logo-emina.webp',
    imageAlt: 'Logo Emina Beauty — Klien produksi tas promosi kosmetik CV. Sevine Indonesia',
    role: 'Youth Skincare Promotional Bags'
  },
  {
    id: 'light-plus',
    name: 'Light+ by Wardah',
    category: 'beauty',
    categoryLabel: 'Beauty & Skincare',
    logo: '/assets/brands/logo-light-plus-wardah.webp',
    imageAlt: 'Logo Light+ by Wardah — Klien kolaborasi pouch eksklusif CV. Sevine Indonesia',
    role: 'Skincare Activation & Exclusive Pouch'
  },
  {
    id: 'paragon',
    name: 'PT Paragon Technology & Innovation',
    category: 'beauty',
    categoryLabel: 'Beauty & Skincare',
    logo: '/assets/brands/logo-paragon.webp',
    imageAlt: 'Logo PT Paragon Technology and Innovation — Mitra korporasi B2B CV. Sevine Indonesia',
    role: 'National Beauty FMCG Corporate Partner'
  },
  // Hospitality & F&B
  {
    id: 'tomoro-coffee',
    name: 'Tomoro Coffee',
    category: 'hospitality',
    categoryLabel: 'Hospitality & F&B',
    logo: '/assets/brands/logo-tomoro-coffee.webp',
    imageAlt: 'Logo Tomoro Coffee — Mitra produksi merchandise korporat CV. Sevine Indonesia',
    role: 'National Coffee Chain Merchandise'
  },
  {
    id: 'mooncha',
    name: 'Moon Cha',
    category: 'hospitality',
    categoryLabel: 'Hospitality & F&B',
    logo: '/assets/brands/logo-mooncha.webp',
    imageAlt: 'Logo Moon Cha — Mitra kolaborasi merchandise F&B CV. Sevine Indonesia',
    role: 'Artisanal Tea Lifestyle Collaboration'
  },
  {
    id: 'hella-coffee',
    name: 'Hella Coffee',
    category: 'hospitality',
    categoryLabel: 'Hospitality & F&B',
    logo: '/assets/brands/logo-hella-coffee.webp',
    imageAlt: 'Logo Hella Coffee — Mitra produksi merchandise coffee roastery CV. Sevine Indonesia',
    role: 'Specialty Coffee & Roastery Merchandise'
  },
  {
    id: 'pleasure-please',
    name: 'Pleasure Please',
    category: 'hospitality',
    categoryLabel: 'Hospitality & F&B',
    logo: '/assets/brands/logo-pleasure-please.webp',
    imageAlt: 'Logo Pleasure Please — Klien merchandise kreatif CV. Sevine Indonesia',
    role: 'Dining Space & Creative Merchandise'
  },
  // Retail & Company
  {
    id: 'yogya-heritage',
    name: 'Yogya Heritage',
    category: 'retail',
    categoryLabel: 'Retail & Korporasi',
    logo: '/assets/brands/logo-yogya-heritage.webp',
    imageAlt: 'Logo Yogya Heritage — Mitra ritel dan produk lifestyle CV. Sevine Indonesia',
    role: 'Retail & Lifestyle Cultural Concept'
  },
  {
    id: 'monic',
    name: 'MoNic Fashion',
    category: 'retail',
    categoryLabel: 'Retail & Korporasi',
    logo: '/assets/brands/logo-monic.webp',
    imageAlt: 'Logo MoNic Fashion — Mitra ritel butik apparel CV. Sevine Indonesia',
    role: 'Fashion Apparel & Boutique Network'
  },
  {
    id: 'callysta',
    name: 'Callysta',
    category: 'retail',
    categoryLabel: 'Retail & Korporasi',
    logo: '/assets/brands/logo-callysta.webp',
    imageAlt: 'Logo Callysta — Mitra koleksi apparel dan lifestyle CV. Sevine Indonesia',
    role: 'Exclusive Apparel & Lifestyle Partner'
  },
  // Creative Community & Events
  {
    id: 'hello-market',
    name: 'Hello Market Solo',
    category: 'community',
    categoryLabel: 'Komunitas & Event',
    logo: '/assets/brands/logo-hello-market-solo.webp',
    imageAlt: 'Logo Hello Market Solo — Mitra event pasar kreatif CV. Sevine Indonesia',
    role: 'Official Creative Market Partner'
  },
  {
    id: 'the-buddies',
    name: 'The Buddies in class',
    category: 'community',
    categoryLabel: 'Komunitas & Event',
    logo: '/assets/brands/logo-the-buddies-in-class.webp',
    imageAlt: 'Logo The Buddies in class — Kolaborasi apparel komunitas muda CV. Sevine Indonesia',
    role: 'Youth Community Collaborative Apparel'
  },
  {
    id: 'mula-mula',
    name: 'Mula Mula Florist',
    category: 'community',
    categoryLabel: 'Komunitas & Event',
    logo: '/assets/brands/logo-mula-mula-florist.webp',
    imageAlt: 'Logo Mula Mula Florist — Kolaborasi hampers dan tas florist CV. Sevine Indonesia',
    role: 'Floral Studio & Lifestyle Hampers'
  },
  {
    id: 'aranya-flow',
    name: 'Aranya Flow',
    category: 'community',
    categoryLabel: 'Komunitas & Event',
    logo: '/assets/brands/logo-aranya-flow.webp',
    imageAlt: 'Logo Aranya Flow — Kolaborasi tas komunitas wellness CV. Sevine Indonesia',
    role: 'Wellness & Creative Movement Bags'
  },
  {
    id: 'bynana-gift',
    name: 'Bynana Gift',
    category: 'community',
    categoryLabel: 'Komunitas & Event',
    logo: '/assets/brands/logo-bynana-gift.webp',
    imageAlt: 'Logo Bynana Gift — Mitra tas suvenir dan hampers CV. Sevine Indonesia',
    role: 'Curated Gift & Souvenir Bags'
  },
  {
    id: 'waktu-luang',
    name: 'Waktu Luang',
    category: 'community',
    categoryLabel: 'Komunitas & Event',
    logo: '/assets/brands/logo-waktu-luang.webp',
    imageAlt: 'Logo Waktu Luang — Mitra komunitas kreatif CV. Sevine Indonesia',
    role: 'Creative Platform & Community Space'
  }
];

export const CLIENT_PARTNER_GROUPS: ClientPartnerGroup[] = [
  {
    category: 'Beauty & Skincare',
    subtitle: 'Kolaborasi Brand Kecantikan',
    clients: ['Wardah Cosmetics', 'Emina Beauty', 'Light+ by Wardah', 'Paragon Group'],
    partnerItems: [
      {
        id: 'wardah',
        name: 'Wardah Cosmetics',
        logo: '/assets/brands/logo-wardah.webp',
        imageAlt: 'Logo mitra Wardah Cosmetics',
        role: 'Cosmetics GWP & Pouches'
      },
      {
        id: 'emina',
        name: 'Emina Beauty',
        logo: '/assets/brands/logo-emina.webp',
        imageAlt: 'Logo mitra Emina Beauty',
        role: 'Youth Skincare Bags'
      },
      {
        id: 'light-plus',
        name: 'Light+ by Wardah',
        logo: '/assets/brands/logo-light-plus-wardah.webp',
        imageAlt: 'Logo mitra Light+ by Wardah',
        role: 'Campaign Activation Pouch'
      },
      {
        id: 'paragon',
        name: 'Paragon Group',
        logo: '/assets/brands/logo-paragon.webp',
        imageAlt: 'Logo mitra PT Paragon Technology & Innovation',
        role: 'Beauty Holding Partner'
      }
    ]
  },
  {
    category: 'Retail & Company',
    subtitle: 'Mitra Ritel & Korporasi',
    clients: ['Yogya Heritage', 'MoNic Fashion', 'Callysta', 'Paragon Technology'],
    partnerItems: [
      {
        id: 'yogya-heritage',
        name: 'Yogya Heritage',
        logo: '/assets/brands/logo-yogya-heritage.webp',
        imageAlt: 'Logo mitra Yogya Heritage',
        role: 'Retail & Cultural Merchandise'
      },
      {
        id: 'monic',
        name: 'MoNic Fashion',
        logo: '/assets/brands/logo-monic.webp',
        imageAlt: 'Logo mitra MoNic Fashion',
        role: 'Fashion Boutique Partner'
      },
      {
        id: 'callysta',
        name: 'Callysta',
        logo: '/assets/brands/logo-callysta.webp',
        imageAlt: 'Logo mitra Callysta',
        role: 'Apparel & Lifestyle Collection'
      },
      {
        id: 'paragon-corp',
        name: 'PT Paragon Technology',
        logo: '/assets/brands/logo-paragon.webp',
        imageAlt: 'Logo mitra PT Paragon Technology',
        role: 'Corporate Event & B2B GWP'
      }
    ]
  },
  {
    category: 'Restaurant & Cafe',
    subtitle: 'Hospitality & F&B Merchandise',
    clients: ['Tomoro Coffee', 'Moon Cha', 'Hella Coffee', 'Pleasure Please'],
    partnerItems: [
      {
        id: 'tomoro-coffee',
        name: 'Tomoro Coffee',
        logo: '/assets/brands/logo-tomoro-coffee.webp',
        imageAlt: 'Logo mitra Tomoro Coffee',
        role: 'Coffee Chain Merchandise'
      },
      {
        id: 'mooncha',
        name: 'Moon Cha',
        logo: '/assets/brands/logo-mooncha.webp',
        imageAlt: 'Logo mitra Moon Cha',
        role: 'Artisanal Tea Collab'
      },
      {
        id: 'hella-coffee',
        name: 'Hella Coffee',
        logo: '/assets/brands/logo-hella-coffee.webp',
        imageAlt: 'Logo mitra Hella Coffee',
        role: 'Specialty Coffee Roastery'
      },
      {
        id: 'pleasure-please',
        name: 'Pleasure Please',
        logo: '/assets/brands/logo-pleasure-please.webp',
        imageAlt: 'Logo mitra Pleasure Please',
        role: 'Lifestyle Dining Concept'
      }
    ]
  },
  {
    category: 'Creative Community',
    subtitle: 'Komunitas Kreatif & Event',
    clients: ['Hello Market Solo', 'The Buddies in class', 'Mula Mula Florist', 'Aranya Flow', 'Bynana Gift', 'Waktu Luang'],
    partnerItems: [
      {
        id: 'hello-market',
        name: 'Hello Market Solo',
        logo: '/assets/brands/logo-hello-market-solo.webp',
        imageAlt: 'Logo mitra Hello Market Solo',
        role: 'Prime Creative Market'
      },
      {
        id: 'the-buddies',
        name: 'The Buddies in class',
        logo: '/assets/brands/logo-the-buddies-in-class.webp',
        imageAlt: 'Logo mitra The Buddies in class',
        role: 'Youth Community Apparel'
      },
      {
        id: 'mula-mula',
        name: 'Mula Mula Florist',
        logo: '/assets/brands/logo-mula-mula-florist.webp',
        imageAlt: 'Logo mitra Mula Mula Florist',
        role: 'Floral Studio & Hampers'
      },
      {
        id: 'aranya-flow',
        name: 'Aranya Flow',
        logo: '/assets/brands/logo-aranya-flow.webp',
        imageAlt: 'Logo mitra Aranya Flow',
        role: 'Wellness Movement Bag'
      },
      {
        id: 'bynana-gift',
        name: 'Bynana Gift',
        logo: '/assets/brands/logo-bynana-gift.webp',
        imageAlt: 'Logo mitra Bynana Gift',
        role: 'Curated Souvenirs'
      },
      {
        id: 'waktu-luang',
        name: 'Waktu Luang',
        logo: '/assets/brands/logo-waktu-luang.webp',
        imageAlt: 'Logo mitra Waktu Luang',
        role: 'Creative Space Project'
      }
    ]
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'testi-1',
    author: 'Vina Pratiwi',
    date: '14/09/2026',
    rating: 5,
    highlightAspect: 'Kapasitas Lega & Fleksibel',
    content: 'Kapasitas tas minimalis, tapi setelah diisi muat hp, make up pouch, dan dompet tebal. Nyaman dipakai, bahannya tebal fleksibel, jahitan rapi banget tanpa benang sisa.',
    screenshotImage: '/assets/testimonials/customer-testimonial-1.webp',
    imageAlt: 'Tangkapan layar ulasan bintang 5 Shopee Official Shop oleh Vina Pratiwi untuk tas Sevine',
    buyerPhotos: [
      '/assets/testimonials/testi-1-buyer-photo-1.webp',
      '/assets/testimonials/testi-1-buyer-photo-2.webp',
      '/assets/testimonials/testi-1-buyer-photo-3.webp'
    ],
    platform: 'Shopee Official Shop'
  },
  {
    id: 'testi-2',
    author: 'Dinda Rahmadani',
    date: '14/09/2026',
    rating: 5,
    highlightAspect: 'Desain Imut & Material Tebal',
    content: 'Muat banyak loo walaupun ukurannya tampak mini dari luar. Desainnya lucu banget cantiikkk! Bahannya kokoh dan tidak mudah kusut.',
    screenshotImage: '/assets/testimonials/customer-testimonial-2.webp',
    imageAlt: 'Tangkapan layar ulasan bintang 5 Shopee Official Shop oleh Dinda Rahmadani untuk tas Sevine',
    buyerPhotos: [
      '/assets/testimonials/testi-2-buyer-photo-1.webp',
      '/assets/testimonials/testi-2-buyer-photo-2.webp',
      '/assets/testimonials/testi-2-buyer-photo-3.webp',
      '/assets/testimonials/testi-2-buyer-photo-4.webp',
      '/assets/testimonials/testi-2-buyer-photo-5.webp'
    ],
    platform: 'Shopee Official Shop'
  },
  {
    id: 'testi-3',
    author: 'Sarah Amanda',
    date: '13/09/2026',
    rating: 5,
    highlightAspect: 'Sudah Repeat Order 2 Model',
    content: 'Bagusss pol, suka banget sama tasnya! Ini udah koleksi ke-2 dari toko ini dan tidak pernah mengecewakan. Dipakai kuliah dan nongkrong selalu ada yang nanya beli di mana.',
    screenshotImage: '/assets/testimonials/customer-testimonial-3.webp',
    imageAlt: 'Tangkapan layar ulasan bintang 5 repeat order pelanggan Sarah Amanda di Shopee Sevine',
    platform: 'Shopee Official Shop'
  },
  {
    id: 'testi-4',
    author: 'Bramantyo Wardhana',
    date: '13/09/2026',
    rating: 5,
    highlightAspect: 'Material Tahan Air (Waterproof)',
    content: 'Kapasitas muat banyak dan kuat. Bahannya oke banget, ringan dan sejauh ini sangat awet dipakai harian. Beneran kedap air waktu kehujanan gerimis dan mudah dilap bersih!',
    screenshotImage: '/assets/testimonials/customer-testimonial-4.webp',
    imageAlt: 'Tangkapan layar ulasan bintang 5 ketahanan bahan waterproof tas Sevine oleh Bramantyo Wardhana',
    platform: 'Shopee Official Shop'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'pusat',
    name: 'Kantor Pusat & Fasilitas Manufaktur',
    role: 'Pusat Riset Pola, Lini Jahit Massal & Operasional Gudang',
    address: 'Sambiroto, Kec. Padas, Kabupaten Ngawi',
    city: 'Ngawi, Jawa Timur',
    postalCode: '63281',
    mapsQuery: 'Sambiroto, Padas, Ngawi, Jawa Timur'
  },
  {
    id: 'cabang',
    name: 'Kantor Cabang Bisnis & Kreatif',
    role: 'Pusat Pemasaran Digital, Hub Partnership B2B & Showroom',
    address: 'Ruko Joyo Agung Greenland Kav. 2, Tlogomas, Kec. Lowokwaru',
    city: 'Kota Malang, Jawa Timur',
    postalCode: '61544',
    mapsQuery: 'Ruko Joyo Agung Greenland, Malang, Jawa Timur'
  }
];

export const CONTACT_INFO: ContactInfo = {
  instagram: '@SEVINE.ID',
  email: 'SEVINE.ID@GMAIL.COM',
  shopeeShop: 'SEVINE OFFICIAL SHOP',
  resellerHotline: '081398205665',
  collaborationHotline: '085194587737'
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-moq-maklon',
    category: 'maklon',
    question: 'Berapa jumlah pesanan minimum (MOQ) untuk produksi maklon tas atau pakaian custom B2B?',
    answer:
      'Untuk produksi maklon custom korporat, merchandise event, maupun GWP brand, MOQ mulai dari 100 pcs per desain/model. Untuk kebutuhan kuantitas besar hingga puluhan ribu pcs per bulan, pabrik in-house kami di Ngawi memiliki kapasitas produksi rata-rata 30.000+ produk per bulan.'
  },
  {
    id: 'faq-durasi-sampling',
    category: 'maklon',
    question: 'Berapa lama proses pembuatan sampel prototipe (sampling) dan produksi massal di CV. Sevine Indonesia?',
    answer:
      'Tahap pembuatan sampel (prototipe pola dan pemilihan material) rata-rata memakan waktu 7–14 hari kerja setelah spesifikasi desain disepakati. Setelah sampel fisik disetujui (approval), produksi massal dan Quality Control (QC) bar-tack memakan waktu sekitar 14–30 hari kerja tergantung kompleksitas dan volume pesanan.'
  },
  {
    id: 'faq-kustomisasi-material',
    category: 'maklon',
    question: 'Apakah klien korporat bisa memilih jenis bahan, warna, dan emboss/label brand sendiri?',
    answer:
      'Bisa. Layanan maklon dan custom order kami mencakup konsultasi pemilihan kain (waterproof fabric, kanvas, kulit sintetis, katun combed, maupun bahan flowy busana muslim), aksesoris hardware, sablon, bordir, woven label, hingga kemasan khusus sesuai identitas perusahaan Anda.'
  },
  {
    id: 'faq-syarat-reseller',
    category: 'reseller',
    question: 'Bagaimana syarat dan cara bergabung menjadi mitra Reseller atau Distributor resmi 5 brand Sevine?',
    answer:
      'Pendaftaran mitra Reseller dan Distributor dapat dilakukan langsung melalui formulir kemitraan di website ini atau menghubungi Hotline Reseller resmi (0813-9820-5665). Mitra mendapatkan akses katalog lengkap 5 brand (SEVINE, klou, LALUNA, ASSAIF, NABIRA), harga grosir tangan pertama langsung pabrik, serta materi foto katalog untuk pemasaran digital.'
  },
  {
    id: 'faq-lokasi-kunjungan',
    category: 'umum',
    question: 'Di mana lokasi pabrik produksi dan kantor cabang CV. Sevine Indonesia jika ingin berkunjung?',
    answer:
      'Fasilitas pabrik utama, riset pola, dan gudang pengiriman kami berlokasi di Sambiroto, Kec. Padas, Kabupaten Ngawi, Jawa Timur (63281). Untuk diskusi bisnis, kemitraan B2B, dan tim kreatif, Anda juga dapat mengunjungi Kantor Cabang kami di Ruko Joyo Agung Greenland Kav. 2, Tlogomas, Kec. Lowokwaru, Kota Malang (61544) dengan janji temu terlebih dahulu.'
  }
];
