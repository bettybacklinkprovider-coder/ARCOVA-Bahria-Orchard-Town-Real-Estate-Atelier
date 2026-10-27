export interface ReviewItem {
  id: string;
  author: string;
  authorReviewCount: string;
  authorInitials: string;
  rating: number;
  timeAgo: string;
  text: string;
  topics: string[];
  likes: number;
  likedByMe?: boolean;
  ownerResponse?: {
    timeAgo: string;
    text: string;
  };
}

export interface PhotoSpecimen {
  id: string;
  title: string;
  subtitle: string;
  category: 'Inside' | 'Interior design' | 'By owner';
  date: string;
  dimensions: string;
  location: string;
  aspect: 'wide' | 'square' | 'tall';
  sceneType: 'atelier-lobby' | 'boardroom' | 'masterplan-table' | 'exterior-tower3' | 'villa-elevation' | 'lounge-detail' | 'pair-plot-site' | 'executive-suite';
  imageUrl?: string;
}

export interface PropertyPlot {
  id: string;
  code: string;
  title: string;
  district: string;
  category: 'Residential Plot' | 'Commercial Suite' | 'Built Residence';
  size: string;
  pricePkr: string;
  possession: 'Ready for Possession' | 'Immediate Transfer' | 'Grey Structure';
  frontage: string;
  orientation: string;
  advisor: string;
  description: string;
  coordinates: { x: number; y: number };
  blueprintSpecs: { label: string; value: string }[];
}

export interface CompetitorAgency {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  distance: string;
  specialty: string;
  address: string;
  phone: string;
  hours: string;
}

export interface WebResultItem {
  id: string;
  domain: string;
  breadcrumb: string;
  title: string;
  snippet: string;
  updatedDate: string;
  category: string;
  details: string[];
}

export const BUSINESS_PROFILE = {
  name: 'Real Estate In Bahria Town / Orchard Lahore',
  atelierTitle: 'ARCOVA — Real Estate In Bahria Town / Orchard Lahore',
  rating: 5.0,
  reviewCount: 80,
  category: 'Real estate agent',
  leadAdvisor: 'Mr. Shahbaz',
  address: 'Tower 3, Office # 17 Raiwind Rd, Bahria Orchard Eastern District Bahria Orchard, Lahore, 54000, Pakistan',
  shortAddress: 'Tower 3, Office # 17, Raiwind Rd, Eastern District, Bahria Orchard',
  hoursStatus: 'Open',
  closesAt: 'Closes 10 PM',
  phone: '+92 324 4101140',
  plusCode: '8689+FP Lahore, Pakistan',
  heroImageUrl: '/assets/aistudio/unnamed__3__731bcfc1.jpg',
  heroGalleryUrls: [
    '/assets/aistudio/unnamed__3__731bcfc1.jpg',
    '/assets/aistudio/unnamed__2__7c6abadb.jpg',
    '/assets/aistudio/unnamed__1__4a92375a.jpg',
    '/assets/aistudio/unnamed_74229433.jpg',
  ],
  coordinates: { lat: 31.316188, lng: 74.219312 },
  weeklyHours: [
    { day: 'Monday', hours: '9:00 AM – 10:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM – 10:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM – 10:00 PM' },
    { day: 'Thursday', hours: '9:00 AM – 10:00 PM' },
    { day: 'Friday', hours: '9:00 AM – 10:00 PM' },
    { day: 'Saturday', hours: '9:30 AM – 10:00 PM' },
    { day: 'Sunday', hours: '10:00 AM – 10:00 PM' },
  ],
  highlights: [
    'On-site plot verification & transfer desk at Tower 3, Office # 17',
    'Direct mandate advisory for Bahria Orchard Phase 1–4 & Eastern District',
    '5 Marla, 8 Marla, 10 Marla & 1 Kanal residential and pair plot acquisitions',
    'Private investor portfolio structuring led by Mr. Shahbaz',
  ],
};

export const REVIEW_TOPICS = [
  { id: 'All', label: 'All', count: 80 },
  { id: 'fair dealing', label: 'fair dealing', count: 3 },
  { id: 'helpful team', label: 'helpful team', count: 3 },
  { id: 'buying property', label: 'buying property', count: 2 },
  { id: 'investors', label: 'investors', count: 2 },
  { id: '5 marla pair', label: '5 marla pair', count: 4 },
  { id: 'Mr Shahbaz', label: 'Mr Shahbaz', count: 6 },
  { id: 'Bahria Orchard', label: 'Bahria Orchard', count: 5 },
  { id: 'smooth process', label: 'smooth process', count: 4 },
  { id: 'commercial plots', label: 'commercial plots', count: 2 },
  { id: 'transfer verification', label: 'transfer verification', count: 3 },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Hassan Khan Sial',
    authorReviewCount: '3 reviews',
    authorInitials: 'HK',
    rating: 5,
    timeAgo: 'a month ago',
    text: 'I had a great experience working with them. Mr shahbaz helped me throughout the process and did an excellent job in selling my property. He was professional, helpful, and made the whole process smooth and straightforward. I really appreciate his hard work and would definitely recommend his services.',
    topics: ['helpful team', 'fair dealing', 'Mr Shahbaz', 'smooth process'],
    likes: 4,
    ownerResponse: {
      timeAgo: '3 days ago',
      text: 'Thank you for your wonderful feedback and 5-star rating! We truly appreciate your trust and kind words. It was our pleasure to assist you with your property sale. Your satisfaction means a lot to us.',
    },
  },
  {
    id: 'rev-2',
    author: 'Ahmad Lodhi',
    authorReviewCount: '2 reviews',
    authorInitials: 'AL',
    rating: 5,
    timeAgo: '6 months ago',
    text: "They've Best property options Glad to have a deal with them.",
    topics: ['fair dealing', 'buying property', 'investors', 'Bahria Orchard'],
    likes: 3,
    ownerResponse: {
      timeAgo: '3 days ago',
      text: 'Thank you so much! We truly appreciate your trust and confidence in us. It’s a pleasure working with you.',
    },
  },
  {
    id: 'rev-3',
    author: 'Haris Ishtiaq',
    authorReviewCount: '1 review',
    authorInitials: 'HI',
    rating: 5,
    timeAgo: 'a month ago',
    text: 'Purchased 5 marla pair plots nice experience 👍 …',
    topics: ['buying property', '5 marla pair', 'investors', 'Bahria Orchard'],
    likes: 5,
    ownerResponse: {
      timeAgo: '3 days ago',
      text: "Thank you for your kind feedback and for trusting us with your investment!  I'm glad you had a great experience purchasing your 5 Marla pair plot. Your satisfaction means a lot to us.",
    },
  },
  {
    id: 'rev-4',
    author: 'Usman Tariq Gondal',
    authorReviewCount: '7 reviews',
    authorInitials: 'UT',
    rating: 5,
    timeAgo: '2 months ago',
    text: 'Visited Office # 17 in Tower 3 on Raiwind Road for an Eastern District 10 Marla plot assessment. The documentation check, NDC verification, and final transfer at the Bahria office were handled with complete transparency and fair dealing.',
    topics: ['fair dealing', 'helpful team', 'Bahria Orchard', 'transfer verification'],
    likes: 6,
    ownerResponse: {
      timeAgo: '2 months ago',
      text: 'Thank you Usman sb for visiting our Tower 3 office. Ensuring clear NDC verification and smooth transfer is always our first priority.',
    },
  },
  {
    id: 'rev-5',
    author: 'Dr. Farhan Qureshi',
    authorReviewCount: '4 reviews',
    authorInitials: 'FQ',
    rating: 5,
    timeAgo: '3 months ago',
    text: 'As overseas investors looking for secure plot allocation in Bahria Town and Bahria Orchard Phase 2, Mr Shahbaz and his helpful team provided accurate market valuations without any exaggerated promises. Highly recommended for serious investors.',
    topics: ['helpful team', 'investors', 'Mr Shahbaz', 'smooth process'],
    likes: 8,
    ownerResponse: {
      timeAgo: '3 months ago',
      text: 'We are honored by your trust, Dr. Farhan! Guiding overseas investors with factual, on-ground market intelligence is core to our practice.',
    },
  },
  {
    id: 'rev-6',
    author: 'Zainab & Kamran Malik',
    authorReviewCount: '2 reviews',
    authorInitials: 'ZK',
    rating: 5,
    timeAgo: '4 months ago',
    text: 'Acquired a commercial unit in Bahria Orchard Eastern District and a 5 marla pair plot in Phase 4. Every step from token agreement to biometric transfer was executed on schedule.',
    topics: ['5 marla pair', 'commercial plots', 'smooth process', 'Mr Shahbaz'],
    likes: 4,
    ownerResponse: {
      timeAgo: '4 months ago',
      text: 'Thank you very much! Wishing you great returns on both your commercial suite and Phase 4 pair plots.',
    },
  },
];

export const PHOTO_SPECIMENS: PhotoSpecimen[] = [
  {
    id: 'ph-1',
    title: 'Executive Consultation Desk & Society Masterplan Maps',
    subtitle: 'Office # 17 Interior — Map Table & Client Seating',
    category: 'Inside',
    date: 'October 2026',
    dimensions: 'TOWER 3 · OFFICE # 17 / INSIDE VIEW',
    location: 'Tower 3, Office # 17, Raiwind Rd',
    aspect: 'wide',
    sceneType: 'atelier-lobby',
    imageUrl: '/assets/aistudio/unnamed__3__731bcfc1.jpg',
  },
  {
    id: 'ph-2',
    title: 'Main Advisory Hall & Panorama Window View',
    subtitle: 'Full Interior Perspective Looking Toward Eastern District Boulevard',
    category: 'Interior design',
    date: 'October 2026',
    dimensions: 'TOWER 3 · OFFICE # 17 / INTERIOR DESIGN',
    location: 'Eastern District, Bahria Orchard',
    aspect: 'wide',
    sceneType: 'masterplan-table',
    imageUrl: '/assets/aistudio/unnamed__2__7c6abadb.jpg',
  },
  {
    id: 'ph-3',
    title: 'Tower 3 Office # 17 Glass Frontage & Entrance',
    subtitle: 'Exterior Glass Facade with Calligraphy Header at Bahria Orchard',
    category: 'By owner',
    date: 'October 2026',
    dimensions: 'TOWER 3 COMMERCIAL CORRIDOR',
    location: '8689+FP Lahore, Pakistan',
    aspect: 'wide',
    sceneType: 'exterior-tower3',
    imageUrl: '/assets/aistudio/unnamed__1__4a92375a.jpg',
  },
  {
    id: 'ph-4',
    title: 'Client Reception Lounge & Map Advisory Table',
    subtitle: 'Leather Sofa Seating & Property Documentation Area',
    category: 'Inside',
    date: 'October 2026',
    dimensions: 'OFFICE # 17 RECEPTION SUITE',
    location: 'Tower 3, Office # 17, Raiwind Rd',
    aspect: 'wide',
    sceneType: 'boardroom',
    imageUrl: '/assets/aistudio/unnamed_74229433.jpg',
  },
  {
    id: 'ph-5',
    title: 'Real Estate In Bahria Town / Orchard Lahore — Featured Plate',
    subtitle: 'Verified Property Consultancy at Tower 3, Raiwind Rd',
    category: 'By owner',
    date: 'September 2026',
    dimensions: '50 FT FRONTAGE × 45 FT DEPTH (10 MARLA COMBINED)',
    location: 'Bahria Orchard Eastern District',
    aspect: 'wide',
    sceneType: 'pair-plot-site',
    imageUrl: 'https://res.cloudinary.com/k7og2ybq/image/upload/v1793104937/unnamed_4.jpg',
  },
  {
    id: 'ph-6',
    title: 'Bahria Orchard & Town Masterplan Cartography',
    subtitle: '5 Marla Pair Plot & Commercial Sector Allocation',
    category: 'Interior design',
    date: 'August 2026',
    dimensions: 'CADASTRE & MASTERPLAN MATRIX',
    location: 'Tower 3, Office # 17',
    aspect: 'square',
    sceneType: 'lounge-detail',
  },
];

export const PROPERTY_PLOTS: PropertyPlot[] = [
  {
    id: 'plot-1',
    code: 'BO-ED-5MP',
    title: '5 Marla Contiguous Pair Plots (10 Marla Combined)',
    district: 'Bahria Orchard · Eastern District Block C',
    category: 'Residential Plot',
    size: '5 + 5 Marla Pair (2,250 sq. ft.)',
    pricePkr: 'PKR 1.38 Crore (Pair)',
    possession: 'Ready for Possession',
    frontage: '50 ft Combined Frontage',
    orientation: 'North-East · Park Facing',
    advisor: 'Mr. Shahbaz',
    description: 'Rare contiguous 5 Marla pair plots allowing a wide 50-foot architectural elevation or dual independent rental residences. All development charges paid with immediate Bahria transfer.',
    coordinates: { x: 64, y: 42 },
    blueprintSpecs: [
      { label: 'GROSS PLOT AREA', value: '2,250 SQ. FT. (10 MARLA)' },
      { label: 'PLOT NUMBERS', value: 'PAIR #214 & #215 (CONTIGUOUS)' },
      { label: 'ROAD BOULEVARD', value: '40 FT CARPETED AVENUE' },
      { label: 'UTILITY INFRASTRUCTURE', value: 'UNDERGROUND ELECTRIFICATION' },
      { label: 'TRANSFER STATUS', value: 'NDC READY · CLEAR TITLE' },
    ],
  },
  {
    id: 'plot-2',
    code: 'BO-T3-COM',
    title: 'Tower 3 Commercial Boulevard Corner Suite',
    district: 'Bahria Orchard · Raiwind Rd Main Gate',
    category: 'Commercial Suite',
    size: '850 sq. ft. Net Floorplate',
    pricePkr: 'PKR 1.95 Crore',
    possession: 'Immediate Transfer',
    frontage: '28 ft Double-Glazed Corner',
    orientation: 'Main Raiwind Road Frontage',
    advisor: 'Mr. Shahbaz',
    description: 'High-visibility commercial office and showroom inventory in the prestigious Tower 3 enclave on Raiwind Road. High rental yield with established corporate footfall.',
    coordinates: { x: 28, y: 58 },
    blueprintSpecs: [
      { label: 'GROSS INTERNAL AREA', value: '850 SQ. FT. CORNER SUITE' },
      { label: 'ELEVATION LEVEL', value: 'FIRST FLOOR ATRIUM WING' },
      { label: 'CEILING CLEARANCE', value: '12 FT 6 IN STRUCTURAL SLAB' },
      { label: 'ANNUAL YIELD ESTIMATE', value: '8.4% VERIFIED RENTAL' },
      { label: 'PARKING ALLOCATION', value: 'DEDICATED FORECOURT BAYS' },
    ],
  },
  {
    id: 'plot-3',
    code: 'BT-SF-10M',
    title: '10 Marla Designer Limestone Residence',
    district: 'Bahria Town Lahore · Sector F (Ghazi Block)',
    category: 'Built Residence',
    size: '10 Marla (3,650 sq. ft. Covered)',
    pricePkr: 'PKR 4.45 Crore',
    possession: 'Ready for Possession',
    frontage: '35 ft × 65 ft Plot',
    orientation: 'South-Facing · Near Grand Mosque',
    advisor: 'Mr. Shahbaz',
    description: 'Architect-designed 5-bedroom modern residence clad in natural travertine and dark basalt steel framing. Double-height lobby, imported fittings, and servant quarters.',
    coordinates: { x: 46, y: 27 },
    blueprintSpecs: [
      { label: 'GROSS INTERNAL AREA', value: '3,650 SQ. FT. (DOUBLE STOREY)' },
      { label: 'ACCOMMODATION', value: '5 EN-SUITE BEDROOMS + STUDY' },
      { label: 'STRUCTURAL SPECIFICATION', value: 'A+ GRADE REINFORCED FRAME' },
      { label: 'EXTERIOR CLADDING', value: 'LIMESTONE & ANODIZED BRONZE' },
      { label: 'COMPLETION', value: 'OCTOBER 2026 (BRAND NEW)' },
    ],
  },
  {
    id: 'plot-4',
    code: 'BO-P2-8M',
    title: '8 Marla Boulevard Residential Plot',
    district: 'Bahria Orchard · Phase 2 (OLC Block)',
    category: 'Residential Plot',
    size: '8 Marla (1,800 sq. ft.)',
    pricePkr: 'PKR 92 Lakh',
    possession: 'Immediate Transfer',
    frontage: '30 ft × 60 ft',
    orientation: 'East-Facing · 60 ft Main Road',
    advisor: 'Mr. Shahbaz',
    description: 'Prime investor-grade 8 Marla residential plot situated on a 60-foot wide landscaped boulevard in Bahria Orchard Phase 2, surrounded by inhabited luxury homes.',
    coordinates: { x: 78, y: 69 },
    blueprintSpecs: [
      { label: 'GROSS PLOT AREA', value: '1,800 SQ. FT. (30 × 60 FT)' },
      { label: 'SECTOR / BLOCK', value: 'PHASE 2 · OLC OVERSEAS ENCLAVE' },
      { label: 'APPROACH ROAD', value: '60 FT MAIN LANDSCAPED BLVD' },
      { label: 'POSSESSION UTILITY', value: 'WATER, SEWERAGE & ELECTRICITY' },
      { label: 'TRANSFER TIMELINE', value: 'SAME-DAY BIOMETRIC TRANSFER' },
    ],
  },
];

export const PEOPLE_ALSO_SEARCH_FOR: CompetitorAgency[] = [
  {
    id: 'comp-1',
    name: 'Bahria Town Property Dealers',
    rating: 4.8,
    reviewCount: 26,
    category: 'Real estate consultant',
    distance: '1.2 km away · Bahria Orchard Phase 1',
    specialty: 'General residential resale & rental listings',
    address: 'Main Boulevard, Phase 1 Commercial, Bahria Orchard, Lahore',
    phone: '+92 300 4129801',
    hours: 'Open · Closes 9 PM',
  },
  {
    id: 'comp-2',
    name: 'PROPERTY INN (PVT) LTD',
    rating: 4.9,
    reviewCount: 67,
    category: 'Real estate agency',
    distance: '0.4 km away · Raiwind Rd Commercial',
    specialty: 'Commercial files & installment plans',
    address: 'Plaza # 42, Central Commercial, Bahria Orchard, Lahore',
    phone: '+92 321 8402190',
    hours: 'Open · Closes 10 PM',
  },
  {
    id: 'comp-3',
    name: 'Greenz Realtors - Builder',
    rating: 4.8,
    reviewCount: 81,
    category: 'Real estate agent',
    distance: '0.8 km away · Eastern District',
    specialty: 'Turnkey grey structure & residential construction',
    address: 'Eastern Commercial Block, Bahria Orchard, Lahore',
    phone: '+92 333 4981122',
    hours: 'Open · Closes 9:30 PM',
  },
  {
    id: 'comp-4',
    name: 'Athar Associates & Real Estate',
    rating: 4.2,
    reviewCount: 48,
    category: 'Real estate agency',
    distance: '2.1 km away · Raiwind Rd Corridor',
    specialty: 'Plot files & agricultural land brokerage',
    address: 'Gate 2 Approach Road, Bahria Orchard, Lahore',
    phone: '+92 301 4458900',
    hours: 'Open · Closes 8:30 PM',
  },
  {
    id: 'comp-5',
    name: 'AL AREESH Marketing | Real Estate Agency in Bahria Town',
    rating: 5.0,
    reviewCount: 11,
    category: 'Property management company',
    distance: '3.6 km away · Bahria Town Sector C',
    specialty: 'Property management & high-rise apartments',
    address: 'Commercial Zone Sector C, Bahria Town, Lahore',
    phone: '+92 345 4009871',
    hours: 'Open · Closes 9 PM',
  },
];

export const WEB_RESULTS: WebResultItem[] = [
  {
    id: 'web-1',
    domain: 'bahriaorchard.lahore-registry.pk',
    breadcrumb: 'bahriaorchard.lahore-registry.pk › eastern-district › tower-3',
    title: 'Real Estate In Bahria Town / Orchard Lahore — Verified Dealers Directory (Tower 3)',
    snippet: 'Official directory entry for Office # 17, Tower 3, Raiwind Rd, Bahria Orchard Eastern District, Lahore 54000. Rated 5.0/5.0 across 80 verified client transactions including 5 Marla pair plots and commercial transfers.',
    updatedDate: 'October 2026',
    category: 'Registry Verification',
    details: [
      'Registered Office: Tower 3, Office # 17, Raiwind Rd, Bahria Orchard Eastern District',
      'Plus Code: 8689+FP Lahore, Pakistan',
      'Lead Principal: Mr. Shahbaz (+92 324 4101140)',
      'Specialization: Bahria Orchard Phase 1–4, Eastern District & Bahria Town Sectors A–G',
    ],
  },
  {
    id: 'web-2',
    domain: 'lahorepropertyindex.com',
    breadcrumb: 'lahorepropertyindex.com › reports › raiwind-road-corridor-2026',
    title: 'Eastern District Bahria Orchard & 5 Marla Pair Plot Market Report Q4 2026',
    snippet: 'Why contiguous 5 Marla pair plots in Bahria Orchard Eastern District and Phase 4 outperform standalone residential files by 18.4% in liquidity and rental yield.',
    updatedDate: 'October 2026',
    category: 'Market Analysis',
    details: [
      '5 Marla Contiguous Pair Valuation: PKR 1.32 Cr – 1.45 Cr depending on boulevard width',
      'Tower 3 Commercial Occupancy Rate: 94% across ground and first floor offices',
      'Average Transfer Turnaround at Bahria Orchard Office: 3–5 working days after NDC clearance',
    ],
  },
  {
    id: 'web-3',
    domain: 'pakistanhousingtransfer.org',
    breadcrumb: 'pakistanhousingtransfer.org › guides › bahria-town-lahore-ndc',
    title: 'Step-by-Step Biometric Plot Transfer & NDC Checklist for Bahria Orchard Lahore',
    snippet: 'Complete documentation requirements for buyers and overseas investors purchasing plots through authorized consultants at Tower 3, Raiwind Road, Lahore.',
    updatedDate: 'September 2026',
    category: 'Legal & Transfer Protocol',
    details: [
      'Step 1: On-ground plot demarcation & physical site inspection at Eastern District',
      'Step 2: Application for No Demand Certificate (NDC) & clearance of utility dues',
      'Step 3: Biometric verification of seller and purchaser with official allotment letter issuance',
    ],
  },
];

export const LAHORE_HUBS = [
  { id: 'thokar', name: 'Thokar Niaz Baig (Motorway M-2)', distance: '14.8 km', duration: '18 mins via Raiwind Rd', route: 'Direct South on Raiwind Rd → Bahria Orchard Main Gate → Tower 3' },
  { id: 'bahria-town', name: 'Bahria Town Grand Jamia Mosque', distance: '8.2 km', duration: '11 mins via Defence / Canal Link', route: 'Bahria Main Blvd → Sharif Medical City Rd → Raiwind Rd → Tower 3' },
  { id: 'ring-road', name: 'Lahore Ring Road (SL-3 Adda Plot Interchange)', distance: '5.4 km', duration: '7 mins via Raiwind Rd', route: 'Adda Plot Interchange → South on Raiwind Rd → Eastern District Tower 3' },
  { id: 'kalma', name: 'Kalma Chowk / Gulberg III', distance: '24.5 km', duration: '31 mins via Canal Bank & Raiwind Rd', route: 'Canal Bank Rd → Thokar Niaz Baig → Raiwind Rd → Tower 3, Office # 17' },
  { id: 'airport', name: 'Allama Iqbal International Airport (LHE)', distance: '32.0 km', duration: '28 mins via Lahore Ring Road (L-20)', route: 'Ring Road South Loop → Adda Plot Exit → Raiwind Rd → Bahria Orchard' },
];
