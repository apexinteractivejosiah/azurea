export type PortalId = 'home' | 'building' | 'guest' | 'owner' | 'concierge' | 'admin';

export type TowerId = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6';

export type PreferredView =
  | 'Direct Beachfront View'
  | 'Sunset Lagoon View'
  | 'Marina Yacht View'
  | 'Panoramic Penthouse Skyview';

export type GuestPartySize =
  | '2 Guests (1-Bed Sanctuary)'
  | '4 Guests (2-Bed Ocean Suite)'
  | '6 Guests (3-Bed Corner Residence)'
  | '8+ Guests (4-Bed Sky Villa)';

export type FloorTierId = 'tier-lanai' | 'tier-terrace' | 'tier-penthouse';

export type CheckInStage =
  | 'Reservation Confirmed'
  | 'Suite Inspected'
  | 'Digital Keycard Active'
  | 'VIP Airport Transfer Dispatched';

export const CHECK_IN_STAGES: CheckInStage[] = [
  'Reservation Confirmed',
  'Suite Inspected',
  'Digital Keycard Active',
  'VIP Airport Transfer Dispatched',
];

export const PREFERRED_VIEWS: PreferredView[] = [
  'Direct Beachfront View',
  'Sunset Lagoon View',
  'Marina Yacht View',
  'Panoramic Penthouse Skyview',
];

export const GUEST_PARTY_SIZES: GuestPartySize[] = [
  '2 Guests (1-Bed Sanctuary)',
  '4 Guests (2-Bed Ocean Suite)',
  '6 Guests (3-Bed Corner Residence)',
  '8+ Guests (4-Bed Sky Villa)',
];

export interface RealPropertyPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category:
    | 'Architecture & Aerials'
    | 'Lagoon & Beach Club'
    | 'Living & Kitchen Suites'
    | 'Bedrooms & En-Suite Bath';
  linkedTowerId: TowerId;
  roomTag: string;
}

// Complete catalog of all 20 real uploaded resort & condo photographs
export const REAL_PROPERTY_PHOTOS: RealPropertyPhoto[] = [
  {
    id: 'photo-01',
    src: '/assets/aistudio/593416631_d37cc984.jpg',
    title: 'Six-Tower Grand Masterplan & Central Paris Beach Club',
    subtitle:
      'Daytime symmetrical elevation of the iconic glass towers surrounding the central Paris Beach Club and baby-blue lagoon',
    category: 'Architecture & Aerials',
    linkedTowerId: 'T1',
    roomTag: 'Grand Masterplan',
  },
  {
    id: 'photo-02',
    src: '/assets/aistudio/445560482_2cd1ded4.jpg',
    title: 'Nocturnal Illuminated Lagoon & Multi-Tower Skyline',
    subtitle:
      'Nighttime aerial panorama showcasing the glowing wave pool, illuminated beach club pavilion, and white-sand water slide cove',
    category: 'Architecture & Aerials',
    linkedTowerId: 'T2',
    roomTag: 'Night Aerial View',
  },
  {
    id: 'photo-03',
    src: '/assets/aistudio/593416468_ccb578bb.jpg',
    title: 'High-Altitude Crescent Aerial & Sapphire Pool Basin',
    subtitle:
      'Bird’s-eye perspective of the resort crescent, multi-level clubhouse rotunda, and palm-lined beach promenade',
    category: 'Architecture & Aerials',
    linkedTowerId: 'T4',
    roomTag: 'Sky-POV Masterplan',
  },
  {
    id: 'photo-04',
    src: '/assets/aistudio/364700142_466c46c6.jpg',
    title: 'Architectural Amphitheater & Paris Beach Club Rotunda',
    subtitle:
      'Wide-angle architectural view of the residential towers overlooking the multi-story glass beach club and baby-blue pool',
    category: 'Architecture & Aerials',
    linkedTowerId: 'T5',
    roomTag: 'Resort Elevation',
  },
  {
    id: 'photo-05',
    src: '/assets/aistudio/572263772_bf2f8277.jpg',
    title: 'Upper-Floor Balcony Panorama Over White-Sand Cove',
    subtitle:
      'Direct view from the upper residential floors looking down onto the powdery man-made beach, sun loungers, and shaded pavilion',
    category: 'Architecture & Aerials',
    linkedTowerId: 'T6',
    roomTag: 'Upper-Deck Horizon',
  },
  {
    id: 'photo-06',
    src: '/assets/aistudio/567946822_483520ab.jpg',
    title: 'Cobalt-Blue Infinity Lap Pool & Glass Tower Facades',
    subtitle:
      'Waterside perspective of the shimmering resort pool framed by lush light-green palms and 62-story glass curtain walls',
    category: 'Lagoon & Beach Club',
    linkedTowerId: 'T1',
    roomTag: 'Infinity Wave Pool',
  },
  {
    id: 'photo-07',
    src: '/assets/aistudio/572265915_1e418ccd.jpg',
    title: 'White-Sand Beach Lagoon & Twin Aqua Water Slides',
    subtitle:
      'Overhead view of the powdery white-sand shore, baby-blue zero-entry lagoon, family water slides, and circular palm daybeds',
    category: 'Lagoon & Beach Club',
    linkedTowerId: 'T6',
    roomTag: 'Beach Lagoon & Slides',
  },
  {
    id: 'photo-08',
    src: '/assets/aistudio/445561674_11a3550f.jpg',
    title: 'Private Woven Daybed Pods & Palm Sanctuary Shore',
    subtitle:
      'Bespoke circular woven sunbeds and canopy loungers set directly on fine white sand beneath towering coconut palms',
    category: 'Lagoon & Beach Club',
    linkedTowerId: 'T3',
    roomTag: 'Private Daybed Cove',
  },
  {
    id: 'photo-09',
    src: '/assets/aistudio/572262525_564e26ca.jpg',
    title: 'Sunlit Cabana Umbrellas & Turquoise Wave Pool Shore',
    subtitle:
      'Beachfront parasol lounges and shallow turquoise lagoon waters with the residential glass towers rising above the palms',
    category: 'Lagoon & Beach Club',
    linkedTowerId: 'T5',
    roomTag: 'Cabana Shorefront',
  },
  {
    id: 'photo-10',
    src: '/assets/aistudio/567948126_9bfc0714.jpg',
    title: 'Emerald Lagoon Cove & Woven Lounge Sanctuary',
    subtitle:
      'Ground-level tropical perspective across the emerald beach lagoon toward the iconic curved clubhouse and towers',
    category: 'Lagoon & Beach Club',
    linkedTowerId: 'T4',
    roomTag: 'Emerald Lagoon Walk',
  },
  {
    id: 'photo-11',
    src: '/assets/aistudio/572262141_f2b05beb.jpg',
    title: 'Evening Palm Promenade & Illuminated Geodesic Lounge',
    subtitle:
      'Warmly lit nocturnal palm courtyard leading to the glowing beachfront cocktail dome and outdoor lounge seating',
    category: 'Lagoon & Beach Club',
    linkedTowerId: 'T2',
    roomTag: 'Night Beach Club Dome',
  },
  {
    id: 'photo-12',
    src: '/assets/aistudio/596399528_e4156b8f.jpg',
    title: 'Panoramic Glass-Walled Fitness & Wellness Pavilion',
    subtitle:
      'Full-floor cardio and strength training center featuring wrap-around floor-to-ceiling windows overlooking the lagoon',
    category: 'Lagoon & Beach Club',
    linkedTowerId: 'T4',
    roomTag: 'Lagoon-View Gym',
  },
  {
    id: 'photo-13',
    src: '/assets/aistudio/589295260_6fbb4fff.jpg',
    title: 'Signature Suite Living Room & Teak Wood-Slat Media Wall',
    subtitle:
      'Designer condo living space with warm vertical wood-slat entertainment wall, sectional L-sofa, botanical prints, and geometric rug',
    category: 'Living & Kitchen Suites',
    linkedTowerId: 'T1',
    roomTag: 'Wood-Slat Living Suite',
  },
  {
    id: 'photo-14',
    src: '/assets/aistudio/445559076_1cdf13e6.jpg',
    title: 'Sunlit Open-Plan Lounge & Quartz Kitchen Counter',
    subtitle:
      'Airy residence living area appointed with tropical accent cushions, curated framed art triad, and sleek kitchen breakfast bar',
    category: 'Living & Kitchen Suites',
    linkedTowerId: 'T2',
    roomTag: 'Open-Plan Residence',
  },
  {
    id: 'photo-15',
    src: '/assets/aistudio/589295308_3cc23a9c.jpg',
    title: 'Corner Suite Dining & Living Room Perspective',
    subtitle:
      'Indoor tropical greenery, dining table arrangement, marble-veined kitchen island, and custom slatted media console',
    category: 'Living & Kitchen Suites',
    linkedTowerId: 'T3',
    roomTag: 'Dining & Lounge Suite',
  },
  {
    id: 'photo-16',
    src: '/assets/aistudio/521417644_cf616928.jpg',
    title: 'Residence Foyer, Stainless Range Hood & Full Kitchen',
    subtitle:
      'Private suite entry foyer with direct house phone intercom, stainless steel range hood, modern cabinetry, and holiday decor',
    category: 'Living & Kitchen Suites',
    linkedTowerId: 'T5',
    roomTag: 'Kitchen & Entry Foyer',
  },
  {
    id: 'photo-17',
    src: '/assets/aistudio/521417488_3970f7e8.jpg',
    title: 'Terracotta Master Bedroom Suite with Tower Skyline View',
    subtitle:
      'Warm terracotta accent wall, white tufted headboard, split-system climate control, and floor-to-ceiling window overlooking the towers',
    category: 'Bedrooms & En-Suite Bath',
    linkedTowerId: 'T4',
    roomTag: 'Master Suite Bedroom',
  },
  {
    id: 'photo-18',
    src: '/assets/aistudio/445559541__1__8f7cb1de.jpg',
    title: 'Sunlit Queen Sanctuary Bedroom & Full-Height Drapery',
    subtitle:
      'Plush white quilted bedding, abstract gold-and-grey triptych canvas art, ocean-teal rug, and bright balcony window',
    category: 'Bedrooms & En-Suite Bath',
    linkedTowerId: 'T2',
    roomTag: 'Queen Sanctuary Room',
  },
  {
    id: 'photo-19',
    src: '/assets/aistudio/445560102_64b6dfb5.jpg',
    title: 'Family Bunk-Bed Guest Room with Panoramic Glass',
    subtitle:
      'Custom white twin-over-twin bunk bed, ultra-plush neutral area rug, indoor palm foliage, and full-height tower views',
    category: 'Bedrooms & En-Suite Bath',
    linkedTowerId: 'T6',
    roomTag: 'Family Bunk Bedroom',
  },
  {
    id: 'photo-20',
    src: '/assets/aistudio/445558076_37cfd8b5.jpg',
    title: 'Modern En-Suite Bathroom & Wide Vanity Mirror',
    subtitle:
      'Clean porcelain pedestal basin, chrome fixtures, wide vanity mirror, and tempered glass toiletries shelf with mini succulents',
    category: 'Bedrooms & En-Suite Bath',
    linkedTowerId: 'T4',
    roomTag: 'En-Suite Bathroom',
  },
];

export interface FloorTierSpec {
  id: FloorTierId;
  label: string;
  floorRange: string;
  minFloor: number;
  maxFloor: number;
  sqFt: number;
  bedrooms: number;
  bathrooms: number;
  balconyDimensions: string;
  ceilingHeight: string;
  privatePoolIncluded: boolean;
  baseNightlyMultiplier: number;
  interiorImageUrl: string;
  secondaryInteriorImageUrl: string;
  sampleUnits: Record<TowerId, string[]>;
}

export const FLOOR_TIERS: FloorTierSpec[] = [
  {
    id: 'tier-lanai',
    label: 'Floors 1–20: Ocean Lanai Suites • 1,150 SqFt',
    floorRange: 'Floors 1–20',
    minFloor: 1,
    maxFloor: 20,
    sqFt: 1150,
    bedrooms: 1,
    bathrooms: 2,
    balconyDimensions: '28 ft × 10 ft Deep-Set Travertine Lanai (280 SqFt)',
    ceilingHeight: '11.5 ft Floor-to-Ceiling Hurricane-Rated Starfire Glass',
    privatePoolIncluded: false,
    baseNightlyMultiplier: 1.0,
    interiorImageUrl: '/assets/aistudio/445559541__1__8f7cb1de.jpg',
    secondaryInteriorImageUrl: '/assets/aistudio/445559076_1cdf13e6.jpg',
    sampleUnits: {
      T1: ['#T1-108', '#T1-214', '#T1-419', '#T1-1204', '#T1-1806'],
      T2: ['#T2-112', '#T2-305', '#T2-418', '#T2-1402', '#T2-1908'],
      T3: ['#T3-104', '#T3-220', '#T3-316', '#T3-1105', '#T3-1710'],
      T4: ['#T4-110', '#T4-215', '#T4-402', '#T4-1503', '#T4-2001'],
      T5: ['#T5-106', '#T5-312', '#T5-809', '#T5-1411', '#T5-1904'],
      T6: ['#T6-102', '#T6-408', '#T6-915', '#T6-1602', '#T6-2008'],
    },
  },
  {
    id: 'tier-terrace',
    label: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    floorRange: 'Floors 21–45',
    minFloor: 21,
    maxFloor: 45,
    sqFt: 1850,
    bedrooms: 2,
    bathrooms: 3,
    balconyDimensions: '44 ft × 12 ft Wrap-Around Sunset Terrace (528 SqFt)',
    ceilingHeight: '13.0 ft Acoustic-Glazed Cantilevered Glass Facade',
    privatePoolIncluded: false,
    baseNightlyMultiplier: 1.45,
    interiorImageUrl: '/assets/aistudio/589295260_6fbb4fff.jpg',
    secondaryInteriorImageUrl: '/assets/aistudio/521417488_3970f7e8.jpg',
    sampleUnits: {
      T1: ['#T1-804', '#T1-2408', '#T1-320', '#T1-3812', '#T1-410'],
      T2: ['#T2-512', '#T2-280', '#T2-3406', '#T2-390', '#T2-4402'],
      T3: ['#T3-340', '#T3-2910', '#T3-412', '#T3-445', '#T3-4508'],
      T4: ['#T4-290', '#T4-365', '#T4-3804', '#T4-420', '#T4-4512'],
      T5: ['#T5-715', '#T5-2604', '#T5-3308', '#T5-3910', '#T5-4301'],
      T6: ['#T6-408', '#T6-2512', '#T6-3106', '#T6-3709', '#T6-4415'],
    },
  },
  {
    id: 'tier-penthouse',
    label: 'Floors 46–62: Duplex Sky Penthouses • 3,400 SqFt',
    floorRange: 'Floors 46–62',
    minFloor: 46,
    maxFloor: 62,
    sqFt: 3400,
    bedrooms: 4,
    bathrooms: 5,
    balconyDimensions: '68 ft × 16 ft Cantilevered Sky Deck + Plunge Pool (1,088 SqFt)',
    ceilingHeight: '22.0 ft Double-Height Great Room Atrium',
    privatePoolIncluded: true,
    baseNightlyMultiplier: 2.35,
    interiorImageUrl: '/assets/aistudio/589295308_3cc23a9c.jpg',
    secondaryInteriorImageUrl: '/assets/aistudio/445560102_64b6dfb5.jpg',
    sampleUnits: {
      T1: ['#T1-804', '#T1-5201', '#T1-580', '#T1-6004', '#T1-618'],
      T2: ['#T2-512', '#T2-5108', '#T2-560', '#T2-610', '#T2-6201'],
      T3: ['#T3-901', '#T3-4902', '#T3-590', '#T3-6104', '#T3-620'],
      T4: ['#T4-620', '#T4-5308', '#T4-595', '#T4-615', '#T4-6208'],
      T5: ['#T5-715', '#T5-4806', '#T5-5410', '#T5-5902', '#T5-6205'],
      T6: ['#T6-408', '#T6-5004', '#T6-5608', '#T6-6012', '#T6-6210'],
    },
  },
];

export interface SkyMapCoordinates {
  x: number; // SVG X (0-1000)
  y: number; // SVG Y (0-620)
  width: number;
  height: number;
  rotation: number;
  wingName: string;
  verifierStation: string;
  nearestGate: string;
  roofTint: string;
}

export interface TowerData {
  id: TowerId;
  romanNumeral: string;
  shortName: string;
  resortWingName: string;
  fullLabel: string;
  imageUrl: string;
  secondaryExteriorUrl: string;
  suiteInteriorImageUrls: string[];
  architecturalSubtitle: string;
  totalUnits: number;
  ownedUnits: number;
  availableUnits: number;
  buildingHeight: string;
  totalFootprint: string;
  unitFloorSpan: string;
  elevatorCores: string;
  baseNightlyRate: number;
  nightlyRateRange: string;
  occupancyRate: number;
  averageDailyRate: number;
  monthlyGrossRevenue: number;
  totalBookingsCount: number;
  primaryOrientation: PreferredView;
  signatureFeature: string;
  skyMap: SkyMapCoordinates;
}

export interface OwnerStayRecord {
  bookingRef: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  grossAmount: number;
  managementFee: number;
  netPayout: number;
  status: 'Completed Payout' | 'Active In-Residence' | 'Upcoming Confirmed';
}

export interface CondoOwnerProfile {
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  towerId: TowerId;
  towerName: string;
  unitNumber: string;
  registryCode: string;
  floorNumber: number;
  suiteSqFt: number;
  suiteTierLabel: string;
  deedStatus: 'Verified Private Owner';
  acquisitionYear: number;
  annualOccupancyRate: number;
  monthlyGrossRevenue: number;
  managementFeeRate: number;
  unitPhotoUrls: string[];
  activeBookingAlert: {
    hasActiveBooking: boolean;
    bookingRef: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    grossYield: number;
    netOwnerYield: number;
    timestampLabel: string;
  };
  stays: OwnerStayRecord[];
}

export interface UnitRegistryItem {
  unitCode: string;
  displayUnitNumber: string;
  towerId: TowerId;
  floor: number;
  sqFt: number;
  tierLabel: string;
  viewType: PreferredView;
  ownershipStatus: 'Privately Owned' | 'Available Inventory';
  ownerName: string | null;
  ownerId: string | null;
  nightlyRate: number;
  currentBookingRef: string | null;
  previewImageUrl: string;
}

export interface GuestReservation {
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  towerId: TowerId;
  towerLabel: string;
  unitNumber: string;
  floorTierLabel: string;
  sqFt: number;
  preferredView: PreferredView;
  guestPartySize: GuestPartySize;
  checkIn: string;
  checkOut: string;
  nights: number;
  nightlyRate: number;
  totalPrice: number;
  status: CheckInStage;
  ownerIdLinked: string | null;
  specialRequests: string;
  createdAt: string;
  digitalKeyCode: string;
  transferFlightCode: string;
  suitePhotoUrl: string;
}

export interface ConciergeMessage {
  id: string;
  senderRole: 'Guest' | 'Condo Owner' | 'Prospective Buyer' | 'Master Admin';
  senderName: string;
  senderEmail: string;
  referenceId: string;
  towerId: TowerId;
  category:
    | 'Suite Reservation Inquiry'
    | 'Condo Ownership Deed Inquiry'
    | 'VIP Butler & Yacht Charter'
    | 'Owner Payout & Ledger';
  subject: string;
  body: string;
  timestamp: string;
  status: 'Unread' | 'Responded' | 'Resolved';
  adminReply?: string;
}

export interface ResortState {
  towers: TowerData[];
  owners: CondoOwnerProfile[];
  reservations: GuestReservation[];
  unitRegistry: UnitRegistryItem[];
  messages: ConciergeMessage[];
}

export const INITIAL_TOWERS: TowerData[] = [
  {
    id: 'T1',
    romanNumeral: 'Tower I',
    shortName: 'Tower I: Coral Solis (Santorini)',
    resortWingName: 'SANTORINI',
    fullLabel: 'Tower I: Coral Solis — Direct Oceanfront Glass Tower (1,000 Units)',
    imageUrl: '/assets/aistudio/567946822_483520ab.jpg',
    secondaryExteriorUrl: '/assets/aistudio/593416631_d37cc984.jpg',
    suiteInteriorImageUrls: [
      '/assets/aistudio/589295260_6fbb4fff.jpg',
      '/assets/aistudio/521417488_3970f7e8.jpg',
      '/assets/aistudio/521417644_cf616928.jpg',
      '/assets/aistudio/445558076_37cfd8b5.jpg',
    ],
    architecturalSubtitle: 'East Lagoon Promenade & Direct Cobalt Wave Pool Tower',
    totalUnits: 1000,
    ownedUnits: 742,
    availableUnits: 258,
    buildingHeight: '62 Floors / 740 Feet',
    totalFootprint: '480,000 Sq. Ft.',
    unitFloorSpan: '1,000 Residences — Floors 1 to 62',
    elevatorCores: '12 High-Speed Private Lifts',
    baseNightlyRate: 920,
    nightlyRateRange: '$920 – $3,150 / night',
    occupancyRate: 94.2,
    averageDailyRate: 1480,
    monthlyGrossRevenue: 4185000,
    totalBookingsCount: 1412,
    primaryOrientation: 'Direct Beachfront View',
    signatureFeature: 'Cobalt-Blue Infinity Wave Pool & Guest Verifier Station 1 Access',
    skyMap: {
      x: 595,
      y: 165,
      width: 128,
      height: 64,
      rotation: 18,
      wingName: 'SANTORINI • TOWER I',
      verifierStation: 'Guest Verifier 1 (East Wing)',
      nearestGate: 'East Promenade Entrance',
      roofTint: '#BAE6FD',
    },
  },
  {
    id: 'T2',
    romanNumeral: 'Tower II',
    shortName: 'Tower II: Marina Breeze (St. Tropez)',
    resortWingName: 'ST TROPEZ',
    fullLabel: 'Tower II: Marina Breeze — Superyacht Harbor & Lagoon Tower (1,000 Units)',
    imageUrl: '/assets/aistudio/445560482_2cd1ded4.jpg',
    secondaryExteriorUrl: '/assets/aistudio/572262141_f2b05beb.jpg',
    suiteInteriorImageUrls: [
      '/assets/aistudio/445559076_1cdf13e6.jpg',
      '/assets/aistudio/445559541__1__8f7cb1de.jpg',
      '/assets/aistudio/589295308_3cc23a9c.jpg',
      '/assets/aistudio/445558076_37cfd8b5.jpg',
    ],
    architecturalSubtitle: 'Central Paris Beach Club & Illuminated Nocturnal Lagoon Tower',
    totalUnits: 1000,
    ownedUnits: 688,
    availableUnits: 312,
    buildingHeight: '62 Floors / 740 Feet',
    totalFootprint: '480,000 Sq. Ft.',
    unitFloorSpan: '1,000 Residences — Floors 1 to 62',
    elevatorCores: '12 High-Speed Private Lifts',
    baseNightlyRate: 860,
    nightlyRateRange: '$860 – $2,890 / night',
    occupancyRate: 89.6,
    averageDailyRate: 1320,
    monthlyGrossRevenue: 3548000,
    totalBookingsCount: 1265,
    primaryOrientation: 'Marina Yacht View',
    signatureFeature: 'Direct Bridge to Paris Beach Club Rotunda & Geodesic Night Dome',
    skyMap: {
      x: 560,
      y: 315,
      width: 126,
      height: 64,
      rotation: 12,
      wingName: 'ST. TROPEZ • TOWER II',
      verifierStation: 'Guest Verifier 1 (Central Club)',
      nearestGate: 'Parking Attendant Plaza',
      roofTint: '#A7F3D0',
    },
  },
  {
    id: 'T3',
    romanNumeral: 'Tower III',
    shortName: 'Tower III: Palm Sanctuary (Maldives)',
    resortWingName: 'MALDIVES',
    fullLabel: 'Tower III: Palm Sanctuary — Private Beachfront Cabana Tower (1,000 Units)',
    imageUrl: '/assets/aistudio/572265915_1e418ccd.jpg',
    secondaryExteriorUrl: '/assets/aistudio/445561674_11a3550f.jpg',
    suiteInteriorImageUrls: [
      '/assets/aistudio/589295308_3cc23a9c.jpg',
      '/assets/aistudio/445560102_64b6dfb5.jpg',
      '/assets/aistudio/445559076_1cdf13e6.jpg',
      '/assets/aistudio/521417644_cf616928.jpg',
    ],
    architecturalSubtitle: 'West Lagoon Cove & Private Woven Beach Daybed Sanctuary',
    totalUnits: 1000,
    ownedUnits: 715,
    availableUnits: 285,
    buildingHeight: '62 Floors / 740 Feet',
    totalFootprint: '480,000 Sq. Ft.',
    unitFloorSpan: '1,000 Residences — Floors 1 to 62',
    elevatorCores: '12 High-Speed Private Lifts',
    baseNightlyRate: 890,
    nightlyRateRange: '$890 – $2,950 / night',
    occupancyRate: 90.4,
    averageDailyRate: 1390,
    monthlyGrossRevenue: 3769000,
    totalBookingsCount: 1318,
    primaryOrientation: 'Sunset Lagoon View',
    signatureFeature: 'Powdery White-Sand Beach Cove, Woven Daybeds & STL Entrance Access',
    skyMap: {
      x: 245,
      y: 285,
      width: 132,
      height: 64,
      rotation: -22,
      wingName: 'MALDIVES • TOWER III',
      verifierStation: 'Guest Verifier 2 (West Lagoon)',
      nearestGate: 'Gate 1 & Short-Term Lease Entrance',
      roofTint: '#BAE6FD',
    },
  },
  {
    id: 'T4',
    romanNumeral: 'Tower IV',
    shortName: 'Tower IV: Horizon Suites (Positano)',
    resortWingName: 'POSITANO',
    fullLabel: 'Tower IV: Horizon Suites — Skybridge Penthouse Collection (1,000 Units)',
    imageUrl: '/assets/aistudio/521417488_3970f7e8.jpg',
    secondaryExteriorUrl: '/assets/aistudio/593416468_ccb578bb.jpg',
    suiteInteriorImageUrls: [
      '/assets/aistudio/521417488_3970f7e8.jpg',
      '/assets/aistudio/589295260_6fbb4fff.jpg',
      '/assets/aistudio/445559541__1__8f7cb1de.jpg',
      '/assets/aistudio/445558076_37cfd8b5.jpg',
    ],
    architecturalSubtitle: 'North Lagoon Crown & Panoramic Fitness Penthouse Collection',
    totalUnits: 1000,
    ownedUnits: 810,
    availableUnits: 190,
    buildingHeight: '62 Floors / 740 Feet',
    totalFootprint: '480,000 Sq. Ft.',
    unitFloorSpan: '1,000 Residences — Floors 1 to 62',
    elevatorCores: '12 High-Speed Private Lifts',
    baseNightlyRate: 1180,
    nightlyRateRange: '$1,180 – $4,400 / night',
    occupancyRate: 91.4,
    averageDailyRate: 1790,
    monthlyGrossRevenue: 4908000,
    totalBookingsCount: 1495,
    primaryOrientation: 'Panoramic Penthouse Skyview',
    signatureFeature: 'North Sapphire Wave Basin & 360° Glass-Walled Lagoon Fitness Center',
    skyMap: {
      x: 385,
      y: 78,
      width: 134,
      height: 62,
      rotation: -14,
      wingName: 'POSITANO • TOWER IV',
      verifierStation: 'Guest Verifier 2 (North Crown)',
      nearestGate: 'North Gardens Promenade',
      roofTint: '#A7F3D0',
    },
  },
  {
    id: 'T5',
    romanNumeral: 'Tower V',
    shortName: 'Tower V: Azure Oasis (Miami)',
    resortWingName: 'MIAMI',
    fullLabel: 'Tower V: Azure Oasis — Tropical Palm & Waterfall Lagoon Tower (1,000 Units)',
    imageUrl: '/assets/aistudio/364700142_466c46c6.jpg',
    secondaryExteriorUrl: '/assets/aistudio/572262525_564e26ca.jpg',
    suiteInteriorImageUrls: [
      '/assets/aistudio/521417644_cf616928.jpg',
      '/assets/aistudio/589295260_6fbb4fff.jpg',
      '/assets/aistudio/445559541__1__8f7cb1de.jpg',
      '/assets/aistudio/445558076_37cfd8b5.jpg',
    ],
    architecturalSubtitle: 'Northwest Tropical Oasis & Cascading Lagoon Pool Wing',
    totalUnits: 1000,
    ownedUnits: 704,
    availableUnits: 296,
    buildingHeight: '62 Floors / 740 Feet',
    totalFootprint: '480,000 Sq. Ft.',
    unitFloorSpan: '1,000 Residences — Floors 1 to 62',
    elevatorCores: '12 High-Speed Private Lifts',
    baseNightlyRate: 910,
    nightlyRateRange: '$910 – $3,080 / night',
    occupancyRate: 92.1,
    averageDailyRate: 1420,
    monthlyGrossRevenue: 3912000,
    totalBookingsCount: 1340,
    primaryOrientation: 'Sunset Lagoon View',
    signatureFeature: 'Private Oasis Grotto Pool, Sunlit Cabana Umbrellas & Gate 2 Arrival',
    skyMap: {
      x: 195,
      y: 148,
      width: 130,
      height: 62,
      rotation: -18,
      wingName: 'MIAMI • TOWER V',
      verifierStation: 'Guest Verifier 2 (Northwest Wing)',
      nearestGate: 'Gate 2 Main Boulevard',
      roofTint: '#BAE6FD',
    },
  },
  {
    id: 'T6',
    romanNumeral: 'Tower VI',
    shortName: 'Tower VI: Sunlit Cove (Boracay)',
    resortWingName: 'BORACAY',
    fullLabel: 'Tower VI: Sunlit Cove — White-Sand Beach & Aqua Slide Tower (1,000 Units)',
    imageUrl: '/assets/aistudio/572263772_bf2f8277.jpg',
    secondaryExteriorUrl: '/assets/aistudio/567948126_9bfc0714.jpg',
    suiteInteriorImageUrls: [
      '/assets/aistudio/445560102_64b6dfb5.jpg',
      '/assets/aistudio/589295308_3cc23a9c.jpg',
      '/assets/aistudio/521417488_3970f7e8.jpg',
      '/assets/aistudio/521417644_cf616928.jpg',
    ],
    architecturalSubtitle: 'South White-Sand Shore, Twin Aqua Slides & Family Cove Wing',
    totalUnits: 1000,
    ownedUnits: 736,
    availableUnits: 264,
    buildingHeight: '62 Floors / 740 Feet',
    totalFootprint: '480,000 Sq. Ft.',
    unitFloorSpan: '1,000 Residences — Floors 1 to 62',
    elevatorCores: '12 High-Speed Private Lifts',
    baseNightlyRate: 940,
    nightlyRateRange: '$940 – $3,220 / night',
    occupancyRate: 93.0,
    averageDailyRate: 1490,
    monthlyGrossRevenue: 4110000,
    totalBookingsCount: 1388,
    primaryOrientation: 'Direct Beachfront View',
    signatureFeature: 'Direct Step-Out to White-Sand Lagoon Slides & Guest Verifier 3',
    skyMap: {
      x: 410,
      y: 445,
      width: 134,
      height: 64,
      rotation: 24,
      wingName: 'BORACAY • TOWER VI',
      verifierStation: 'Guest Verifier 3 (South Beach)',
      nearestGate: 'Gate 3 Beachfront Drive',
      roofTint: '#A7F3D0',
    },
  },
];

export const INITIAL_OWNERS: CondoOwnerProfile[] = [
  {
    ownerId: '#OWN-T1-804',
    ownerName: 'Victoria Vance-Sterling',
    ownerEmail: 'v.sterling@vancecapital.com',
    towerId: 'T1',
    towerName: 'Tower I: Coral Solis (Santorini)',
    unitNumber: '#T1-804',
    registryCode: '#0804',
    floorNumber: 38,
    suiteSqFt: 1850,
    suiteTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    deedStatus: 'Verified Private Owner',
    acquisitionYear: 2023,
    annualOccupancyRate: 93.8,
    monthlyGrossRevenue: 38400,
    managementFeeRate: 0.15,
    unitPhotoUrls: [
      '/assets/aistudio/589295260_6fbb4fff.jpg',
      '/assets/aistudio/521417488_3970f7e8.jpg',
      '/assets/aistudio/521417644_cf616928.jpg',
      '/assets/aistudio/567946822_483520ab.jpg',
    ],
    activeBookingAlert: {
      hasActiveBooking: true,
      bookingRef: 'AZR-9012',
      guestName: 'Ambassador Julian Thorne',
      checkIn: '2026-11-18',
      checkOut: '2026-11-24',
      nights: 6,
      grossYield: 9480,
      netOwnerYield: 8058,
      timestampLabel: 'Verified Live Stay • Checked In / Keycard Active',
    },
    stays: [
      {
        bookingRef: 'AZR-9012',
        guestName: 'Ambassador Julian Thorne',
        checkIn: '2026-11-18',
        checkOut: '2026-11-24',
        nights: 6,
        grossAmount: 9480,
        managementFee: 1422,
        netPayout: 8058,
        status: 'Active In-Residence',
      },
      {
        bookingRef: 'AZR-8104',
        guestName: 'Dr. Camille Laurent',
        checkIn: '2026-11-04',
        checkOut: '2026-11-12',
        nights: 8,
        grossAmount: 12640,
        managementFee: 1896,
        netPayout: 10744,
        status: 'Completed Payout',
      },
      {
        bookingRef: 'AZR-7619',
        guestName: 'Marcus & Sofia Sterling',
        checkIn: '2026-10-19',
        checkOut: '2026-10-29',
        nights: 10,
        grossAmount: 16280,
        managementFee: 2442,
        netPayout: 13838,
        status: 'Completed Payout',
      },
    ],
  },
  {
    ownerId: '#OWN-T2-512',
    ownerName: 'Henrik Lindqvist',
    ownerEmail: 'hlindqvist@nordicmaritime.se',
    towerId: 'T2',
    towerName: 'Tower II: Marina Breeze (St. Tropez)',
    unitNumber: '#T2-512',
    registryCode: '#0512',
    floorNumber: 31,
    suiteSqFt: 1850,
    suiteTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    deedStatus: 'Verified Private Owner',
    acquisitionYear: 2024,
    annualOccupancyRate: 90.2,
    monthlyGrossRevenue: 34200,
    managementFeeRate: 0.15,
    unitPhotoUrls: [
      '/assets/aistudio/445559076_1cdf13e6.jpg',
      '/assets/aistudio/445559541__1__8f7cb1de.jpg',
      '/assets/aistudio/445560482_2cd1ded4.jpg',
      '/assets/aistudio/572262141_f2b05beb.jpg',
    ],
    activeBookingAlert: {
      hasActiveBooking: true,
      bookingRef: 'AZR-7420',
      guestName: 'Lady Clara Kensington',
      checkIn: '2026-11-20',
      checkOut: '2026-11-27',
      nights: 7,
      grossYield: 10360,
      netOwnerYield: 8806,
      timestampLabel: 'Confirmed Upcoming Arrival • Lagoon Club Access Linked',
    },
    stays: [
      {
        bookingRef: 'AZR-7420',
        guestName: 'Lady Clara Kensington',
        checkIn: '2026-11-20',
        checkOut: '2026-11-27',
        nights: 7,
        grossAmount: 10360,
        managementFee: 1554,
        netPayout: 8806,
        status: 'Upcoming Confirmed',
      },
      {
        bookingRef: 'AZR-6940',
        guestName: 'Soren & Freja Lindholm',
        checkIn: '2026-11-02',
        checkOut: '2026-11-11',
        nights: 9,
        grossAmount: 13320,
        managementFee: 1998,
        netPayout: 11322,
        status: 'Completed Payout',
      },
    ],
  },
  {
    ownerId: '#OWN-T3-901',
    ownerName: 'Elena Rostova-Chen',
    ownerEmail: 'elena@pacificartfoundation.org',
    towerId: 'T3',
    towerName: 'Tower III: Palm Sanctuary (Maldives)',
    unitNumber: '#T3-901',
    registryCode: '#0901',
    floorNumber: 54,
    suiteSqFt: 3400,
    suiteTierLabel: 'Floors 46–62: Duplex Sky Penthouses • 3,400 SqFt',
    deedStatus: 'Verified Private Owner',
    acquisitionYear: 2022,
    annualOccupancyRate: 91.6,
    monthlyGrossRevenue: 46800,
    managementFeeRate: 0.15,
    unitPhotoUrls: [
      '/assets/aistudio/589295308_3cc23a9c.jpg',
      '/assets/aistudio/445560102_64b6dfb5.jpg',
      '/assets/aistudio/572265915_1e418ccd.jpg',
      '/assets/aistudio/445561674_11a3550f.jpg',
    ],
    activeBookingAlert: {
      hasActiveBooking: true,
      bookingRef: 'AZR-6185',
      guestName: 'Mateo & Isabella Rossi',
      checkIn: '2026-11-19',
      checkOut: '2026-11-25',
      nights: 6,
      grossYield: 14100,
      netOwnerYield: 11985,
      timestampLabel: 'Suite Inspected • Private Woven Daybed #08 Reserved',
    },
    stays: [
      {
        bookingRef: 'AZR-6185',
        guestName: 'Mateo & Isabella Rossi',
        checkIn: '2026-11-19',
        checkOut: '2026-11-25',
        nights: 6,
        grossAmount: 14100,
        managementFee: 2115,
        netPayout: 11985,
        status: 'Active In-Residence',
      },
    ],
  },
  {
    ownerId: '#OWN-T4-620',
    ownerName: 'Lord Julian Mercer',
    ownerEmail: 'jmercer@mercerholdings.co.uk',
    towerId: 'T4',
    towerName: 'Tower IV: Horizon Suites (Positano)',
    unitNumber: '#T4-620',
    registryCode: '#0620',
    floorNumber: 60,
    suiteSqFt: 3400,
    suiteTierLabel: 'Floors 46–62: Duplex Sky Penthouses • 3,400 SqFt',
    deedStatus: 'Verified Private Owner',
    acquisitionYear: 2023,
    annualOccupancyRate: 95.1,
    monthlyGrossRevenue: 58900,
    managementFeeRate: 0.15,
    unitPhotoUrls: [
      '/assets/aistudio/521417488_3970f7e8.jpg',
      '/assets/aistudio/589295260_6fbb4fff.jpg',
      '/assets/aistudio/445558076_37cfd8b5.jpg',
      '/assets/aistudio/593416468_ccb578bb.jpg',
    ],
    activeBookingAlert: {
      hasActiveBooking: true,
      bookingRef: 'AZR-5304',
      guestName: 'Sovereign Family Delegation — Al-Mansoor',
      checkIn: '2026-11-17',
      checkOut: '2026-11-26',
      nights: 9,
      grossYield: 26100,
      netOwnerYield: 22185,
      timestampLabel: 'VIP Airport Transfer Dispatched • Skybridge Penthouse Ready',
    },
    stays: [
      {
        bookingRef: 'AZR-5304',
        guestName: 'Sovereign Family Delegation — Al-Mansoor',
        checkIn: '2026-11-17',
        checkOut: '2026-11-26',
        nights: 9,
        grossAmount: 26100,
        managementFee: 3915,
        netPayout: 22185,
        status: 'Active In-Residence',
      },
    ],
  },
  {
    ownerId: '#OWN-T5-715',
    ownerName: 'duchess Isabelle De La Fontaine',
    ownerEmail: 'isabelle@delafontaine-paris.fr',
    towerId: 'T5',
    towerName: 'Tower V: Azure Oasis (Miami)',
    unitNumber: '#T5-715',
    registryCode: '#0715',
    floorNumber: 35,
    suiteSqFt: 1850,
    suiteTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    deedStatus: 'Verified Private Owner',
    acquisitionYear: 2024,
    annualOccupancyRate: 92.4,
    monthlyGrossRevenue: 36900,
    managementFeeRate: 0.15,
    unitPhotoUrls: [
      '/assets/aistudio/521417644_cf616928.jpg',
      '/assets/aistudio/589295260_6fbb4fff.jpg',
      '/assets/aistudio/572262525_564e26ca.jpg',
      '/assets/aistudio/364700142_466c46c6.jpg',
    ],
    activeBookingAlert: {
      hasActiveBooking: true,
      bookingRef: 'AZR-4810',
      guestName: 'Chancellor Lukas Von Habsburg',
      checkIn: '2026-11-21',
      checkOut: '2026-11-28',
      nights: 7,
      grossYield: 11200,
      netOwnerYield: 9520,
      timestampLabel: 'Confirmed Upcoming Stay • Gate 2 VIP Arrival Registered',
    },
    stays: [
      {
        bookingRef: 'AZR-4810',
        guestName: 'Chancellor Lukas Von Habsburg',
        checkIn: '2026-11-21',
        checkOut: '2026-11-28',
        nights: 7,
        grossAmount: 11200,
        managementFee: 1680,
        netPayout: 9520,
        status: 'Upcoming Confirmed',
      },
    ],
  },
  {
    ownerId: '#OWN-T6-408',
    ownerName: 'Chairman Kenjiro & Mei Sato',
    ownerEmail: 'ksato@sato-pacific-trust.jp',
    towerId: 'T6',
    towerName: 'Tower VI: Sunlit Cove (Boracay)',
    unitNumber: '#T6-408',
    registryCode: '#0408',
    floorNumber: 28,
    suiteSqFt: 1850,
    suiteTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    deedStatus: 'Verified Private Owner',
    acquisitionYear: 2024,
    annualOccupancyRate: 93.1,
    monthlyGrossRevenue: 39100,
    managementFeeRate: 0.15,
    unitPhotoUrls: [
      '/assets/aistudio/445560102_64b6dfb5.jpg',
      '/assets/aistudio/589295308_3cc23a9c.jpg',
      '/assets/aistudio/572263772_bf2f8277.jpg',
      '/assets/aistudio/567948126_9bfc0714.jpg',
    ],
    activeBookingAlert: {
      hasActiveBooking: true,
      bookingRef: 'AZR-4205',
      guestName: 'Archduke Henrik & Family',
      checkIn: '2026-11-19',
      checkOut: '2026-11-26',
      nights: 7,
      grossYield: 11900,
      netOwnerYield: 10115,
      timestampLabel: 'Active In-Residence • White-Sand Aqua Slide Cabana Linked',
    },
    stays: [
      {
        bookingRef: 'AZR-4205',
        guestName: 'Archduke Henrik & Family',
        checkIn: '2026-11-19',
        checkOut: '2026-11-26',
        nights: 7,
        grossAmount: 11900,
        managementFee: 1785,
        netPayout: 10115,
        status: 'Active In-Residence',
      },
    ],
  },
];

export const INITIAL_RESERVATIONS: GuestReservation[] = [
  {
    bookingRef: 'AZR-9012',
    guestName: 'Ambassador Julian Thorne',
    guestEmail: 'j.thorne@diplomatic-corps.org',
    guestPhone: '+1 (305) 894-2910',
    towerId: 'T1',
    towerLabel: 'Tower I: Coral Solis — Direct Oceanfront Glass Tower (1,000 Units)',
    unitNumber: '#T1-804',
    floorTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    sqFt: 1850,
    preferredView: 'Direct Beachfront View',
    guestPartySize: '4 Guests (2-Bed Ocean Suite)',
    checkIn: '2026-11-18',
    checkOut: '2026-11-24',
    nights: 6,
    nightlyRate: 1580,
    totalPrice: 9480,
    status: 'Digital Keycard Active',
    ownerIdLinked: '#OWN-T1-804',
    specialRequests:
      'Chilled vintage Dom Pérignon on arrival, reserved woven beach daybed pod for 4 on Nov 20.',
    createdAt: '2026-11-14 09:42 EST',
    digitalKeyCode: 'KEY-T1-804-99A',
    transferFlightCode: 'G650-TAIL-N804V',
    suitePhotoUrl: '/assets/aistudio/589295260_6fbb4fff.jpg',
  },
  {
    bookingRef: 'AZR-7420',
    guestName: 'Lady Clara Kensington',
    guestEmail: 'clara@kensingtonestates.co.uk',
    guestPhone: '+44 20 7946 0821',
    towerId: 'T2',
    towerLabel: 'Tower II: Marina Breeze — Superyacht Harbor & Lagoon Tower (1,000 Units)',
    unitNumber: '#T2-512',
    floorTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    sqFt: 1850,
    preferredView: 'Marina Yacht View',
    guestPartySize: '4 Guests (2-Bed Ocean Suite)',
    checkIn: '2026-11-20',
    checkOut: '2026-11-27',
    nights: 7,
    nightlyRate: 1480,
    totalPrice: 10360,
    status: 'Suite Inspected',
    ownerIdLinked: '#OWN-T2-512',
    specialRequests: 'Evening table at the illuminated geodesic beach lounge dome and late check-out.',
    createdAt: '2026-11-15 14:15 EST',
    digitalKeyCode: 'KEY-T2-512-44B',
    transferFlightCode: 'BA-0209-FIRST',
    suitePhotoUrl: '/assets/aistudio/445559076_1cdf13e6.jpg',
  },
  {
    bookingRef: 'AZR-6185',
    guestName: 'Mateo & Isabella Rossi',
    guestEmail: 'm.rossi@milanoarchitects.it',
    guestPhone: '+39 02 9475 1120',
    towerId: 'T3',
    towerLabel: 'Tower III: Palm Sanctuary — Private Beachfront Cabana Tower (1,000 Units)',
    unitNumber: '#T3-901',
    floorTierLabel: 'Floors 46–62: Duplex Sky Penthouses • 3,400 SqFt',
    sqFt: 3400,
    preferredView: 'Sunset Lagoon View',
    guestPartySize: '6 Guests (3-Bed Corner Residence)',
    checkIn: '2026-11-19',
    checkOut: '2026-11-25',
    nights: 6,
    nightlyRate: 2350,
    totalPrice: 14100,
    status: 'Suite Inspected',
    ownerIdLinked: '#OWN-T3-901',
    specialRequests:
      'Private beachfront woven daybed #08 pre-stocked with cold-pressed juices and family bunk room prepared.',
    createdAt: '2026-11-16 11:08 EST',
    digitalKeyCode: 'KEY-T3-901-71C',
    transferFlightCode: 'AZ-610-VIP',
    suitePhotoUrl: '/assets/aistudio/589295308_3cc23a9c.jpg',
  },
  {
    bookingRef: 'AZR-5304',
    guestName: 'Sovereign Family Delegation — Al-Mansoor',
    guestEmail: 'protocol@almansoor-office.ae',
    guestPhone: '+971 4 312 8800',
    towerId: 'T4',
    towerLabel: 'Tower IV: Horizon Suites — Skybridge Penthouse Collection (1,000 Units)',
    unitNumber: '#T4-620',
    floorTierLabel: 'Floors 46–62: Duplex Sky Penthouses • 3,400 SqFt',
    sqFt: 3400,
    preferredView: 'Panoramic Penthouse Skyview',
    guestPartySize: '8+ Guests (4-Bed Sky Villa)',
    checkIn: '2026-11-17',
    checkOut: '2026-11-26',
    nights: 9,
    nightlyRate: 2900,
    totalPrice: 26100,
    status: 'VIP Airport Transfer Dispatched',
    ownerIdLinked: '#OWN-T4-620',
    specialRequests:
      'Direct VIP arrival to Tower IV Sky Penthouse, private chef dinner at Paris Beach Club Rotunda at 21:00.',
    createdAt: '2026-11-12 18:30 EST',
    digitalKeyCode: 'KEY-T4-620-01S',
    transferFlightCode: 'HELI-AW139-VIP',
    suitePhotoUrl: '/assets/aistudio/521417488_3970f7e8.jpg',
  },
  {
    bookingRef: 'AZR-4810',
    guestName: 'Chancellor Lukas Von Habsburg',
    guestEmail: 'l.habsburg@vienna-protocol.at',
    guestPhone: '+43 1 512 9001',
    towerId: 'T5',
    towerLabel: 'Tower V: Azure Oasis — Tropical Palm & Waterfall Lagoon Tower (1,000 Units)',
    unitNumber: '#T5-715',
    floorTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    sqFt: 1850,
    preferredView: 'Sunset Lagoon View',
    guestPartySize: '4 Guests (2-Bed Ocean Suite)',
    checkIn: '2026-11-21',
    checkOut: '2026-11-28',
    nights: 7,
    nightlyRate: 1600,
    totalPrice: 11200,
    status: 'Reservation Confirmed',
    ownerIdLinked: '#OWN-T5-715',
    specialRequests: 'Gate 2 limousine clearance and private cabana umbrella near Miami Wing pool.',
    createdAt: '2026-11-16 16:40 EST',
    digitalKeyCode: 'KEY-T5-715-55M',
    transferFlightCode: 'OS-088-VIP',
    suitePhotoUrl: '/assets/aistudio/521417644_cf616928.jpg',
  },
  {
    bookingRef: 'AZR-4205',
    guestName: 'Archduke Henrik & Family',
    guestEmail: 'henrik@royal-nordic.org',
    guestPhone: '+46 8 402 1190',
    towerId: 'T6',
    towerLabel: 'Tower VI: Sunlit Cove — White-Sand Beach & Aqua Slide Tower (1,000 Units)',
    unitNumber: '#T6-408',
    floorTierLabel: 'Floors 21–45: Panoramic Terrace Residences • 1,850 SqFt',
    sqFt: 1850,
    preferredView: 'Direct Beachfront View',
    guestPartySize: '6 Guests (3-Bed Corner Residence)',
    checkIn: '2026-11-19',
    checkOut: '2026-11-26',
    nights: 7,
    nightlyRate: 1700,
    totalPrice: 11900,
    status: 'Digital Keycard Active',
    ownerIdLinked: '#OWN-T6-408',
    specialRequests: 'Family bunk bedroom prepared for children and direct wristband access at Verifier 3.',
    createdAt: '2026-11-15 19:20 EST',
    digitalKeyCode: 'KEY-T6-408-88B',
    transferFlightCode: 'SK-901-FIRST',
    suitePhotoUrl: '/assets/aistudio/445560102_64b6dfb5.jpg',
  },
];

export const INITIAL_UNIT_REGISTRY: UnitRegistryItem[] = [
  {
    unitCode: '#0804',
    displayUnitNumber: '#T1-804',
    towerId: 'T1',
    floor: 38,
    sqFt: 1850,
    tierLabel: 'Panoramic Terrace Residence',
    viewType: 'Direct Beachfront View',
    ownershipStatus: 'Privately Owned',
    ownerName: 'Victoria Vance-Sterling',
    ownerId: '#OWN-T1-804',
    nightlyRate: 1580,
    currentBookingRef: 'AZR-9012',
    previewImageUrl: '/assets/aistudio/589295260_6fbb4fff.jpg',
  },
  {
    unitCode: '#0108',
    displayUnitNumber: '#T1-108',
    towerId: 'T1',
    floor: 10,
    sqFt: 1150,
    tierLabel: 'Ocean Lanai Suite',
    viewType: 'Direct Beachfront View',
    ownershipStatus: 'Available Inventory',
    ownerName: null,
    ownerId: null,
    nightlyRate: 960,
    currentBookingRef: null,
    previewImageUrl: '/assets/aistudio/521417644_cf616928.jpg',
  },
  {
    unitCode: '#0512',
    displayUnitNumber: '#T2-512',
    towerId: 'T2',
    floor: 31,
    sqFt: 1850,
    tierLabel: 'Panoramic Terrace Residence',
    viewType: 'Marina Yacht View',
    ownershipStatus: 'Privately Owned',
    ownerName: 'Henrik Lindqvist',
    ownerId: '#OWN-T2-512',
    nightlyRate: 1480,
    currentBookingRef: 'AZR-7420',
    previewImageUrl: '/assets/aistudio/445559076_1cdf13e6.jpg',
  },
  {
    unitCode: '#0112',
    displayUnitNumber: '#T2-112',
    towerId: 'T2',
    floor: 11,
    sqFt: 1150,
    tierLabel: 'Ocean Lanai Suite',
    viewType: 'Marina Yacht View',
    ownershipStatus: 'Available Inventory',
    ownerName: null,
    ownerId: null,
    nightlyRate: 890,
    currentBookingRef: null,
    previewImageUrl: '/assets/aistudio/445559541__1__8f7cb1de.jpg',
  },
  {
    unitCode: '#0901',
    displayUnitNumber: '#T3-901',
    towerId: 'T3',
    floor: 54,
    sqFt: 3400,
    tierLabel: 'Duplex Sky Penthouse',
    viewType: 'Sunset Lagoon View',
    ownershipStatus: 'Privately Owned',
    ownerName: 'Elena Rostova-Chen',
    ownerId: '#OWN-T3-901',
    nightlyRate: 2350,
    currentBookingRef: 'AZR-6185',
    previewImageUrl: '/assets/aistudio/589295308_3cc23a9c.jpg',
  },
  {
    unitCode: '#0220',
    displayUnitNumber: '#T3-220',
    towerId: 'T3',
    floor: 18,
    sqFt: 1150,
    tierLabel: 'Ocean Lanai Suite',
    viewType: 'Sunset Lagoon View',
    ownershipStatus: 'Available Inventory',
    ownerName: null,
    ownerId: null,
    nightlyRate: 920,
    currentBookingRef: null,
    previewImageUrl: '/assets/aistudio/445560102_64b6dfb5.jpg',
  },
  {
    unitCode: '#0620',
    displayUnitNumber: '#T4-620',
    towerId: 'T4',
    floor: 60,
    sqFt: 3400,
    tierLabel: 'Duplex Sky Penthouse',
    viewType: 'Panoramic Penthouse Skyview',
    ownershipStatus: 'Privately Owned',
    ownerName: 'Lord Julian Mercer',
    ownerId: '#OWN-T4-620',
    nightlyRate: 2900,
    currentBookingRef: 'AZR-5304',
    previewImageUrl: '/assets/aistudio/521417488_3970f7e8.jpg',
  },
  {
    unitCode: '#0365',
    displayUnitNumber: '#T4-365',
    towerId: 'T4',
    floor: 36,
    sqFt: 1850,
    tierLabel: 'Panoramic Terrace Residence',
    viewType: 'Panoramic Penthouse Skyview',
    ownershipStatus: 'Available Inventory',
    ownerName: null,
    ownerId: null,
    nightlyRate: 1740,
    currentBookingRef: null,
    previewImageUrl: '/assets/aistudio/445559541__1__8f7cb1de.jpg',
  },
  {
    unitCode: '#0715',
    displayUnitNumber: '#T5-715',
    towerId: 'T5',
    floor: 35,
    sqFt: 1850,
    tierLabel: 'Panoramic Terrace Residence',
    viewType: 'Sunset Lagoon View',
    ownershipStatus: 'Privately Owned',
    ownerName: 'Duchess Isabelle De La Fontaine',
    ownerId: '#OWN-T5-715',
    nightlyRate: 1600,
    currentBookingRef: 'AZR-4810',
    previewImageUrl: '/assets/aistudio/521417644_cf616928.jpg',
  },
  {
    unitCode: '#0106',
    displayUnitNumber: '#T5-106',
    towerId: 'T5',
    floor: 12,
    sqFt: 1150,
    tierLabel: 'Ocean Lanai Suite',
    viewType: 'Sunset Lagoon View',
    ownershipStatus: 'Available Inventory',
    ownerName: null,
    ownerId: null,
    nightlyRate: 940,
    currentBookingRef: null,
    previewImageUrl: '/assets/aistudio/589295260_6fbb4fff.jpg',
  },
  {
    unitCode: '#0408',
    displayUnitNumber: '#T6-408',
    towerId: 'T6',
    floor: 28,
    sqFt: 1850,
    tierLabel: 'Panoramic Terrace Residence',
    viewType: 'Direct Beachfront View',
    ownershipStatus: 'Privately Owned',
    ownerName: 'Chairman Kenjiro & Mei Sato',
    ownerId: '#OWN-T6-408',
    nightlyRate: 1700,
    currentBookingRef: 'AZR-4205',
    previewImageUrl: '/assets/aistudio/445560102_64b6dfb5.jpg',
  },
  {
    unitCode: '#0102',
    displayUnitNumber: '#T6-102',
    towerId: 'T6',
    floor: 8,
    sqFt: 1150,
    tierLabel: 'Ocean Lanai Suite',
    viewType: 'Direct Beachfront View',
    ownershipStatus: 'Available Inventory',
    ownerName: null,
    ownerId: null,
    nightlyRate: 970,
    currentBookingRef: null,
    previewImageUrl: '/assets/aistudio/572263772_bf2f8277.jpg',
  },
];

export const INITIAL_MESSAGES: ConciergeMessage[] = [
  {
    id: 'MSG-101',
    senderRole: 'Guest',
    senderName: 'Ambassador Julian Thorne',
    senderEmail: 'j.thorne@diplomatic-corps.org',
    referenceId: 'AZR-9012',
    towerId: 'T1',
    category: 'VIP Butler & Yacht Charter',
    subject: 'Private Woven Beach Daybed & Sommelier Pairing for Unit #T1-804',
    body: 'Please confirm if our beachfront woven daybed pod and Paris Beach Club sommelier service are scheduled for 17:00 this Friday.',
    timestamp: '14 mins ago',
    status: 'Responded',
    adminReply:
      'Confirmed, Ambassador Thorne. Beach Club Butler Marc has reserved Woven Daybed Pod #04 overlooking the cobalt lagoon for 16:45.',
  },
  {
    id: 'MSG-102',
    senderRole: 'Condo Owner',
    senderName: 'Victoria Vance-Sterling',
    senderEmail: 'v.sterling@vancecapital.com',
    referenceId: '#OWN-T1-804',
    towerId: 'T1',
    category: 'Owner Payout & Ledger',
    subject: 'Q4 Nightly Rate Optimization for Coral Solis Floor 38 (#T1-804)',
    body: 'With Tower I occupancy surpassing 94%, please authorize a 10% holiday ADR uplift for Unit #T1-804 between December 15 and January 5.',
    timestamp: '1 hour ago',
    status: 'Unread',
  },
  {
    id: 'MSG-103',
    senderRole: 'Prospective Buyer',
    senderName: 'Dr. Harrison & Evelyn Cho',
    senderEmail: 'hcho@stanfordmed-ventures.com',
    referenceId: 'DEED-INQ-408',
    towerId: 'T4',
    category: 'Condo Ownership Deed Inquiry',
    subject: 'Private Acquisition Dossier — Tower IV Duplex Sky Penthouse (#T4-615)',
    body: 'We wish to schedule a private viewing of the wood-slat living suites and terracotta master bedrooms in Tower IV and review the 85% net owner rental split prospectus.',
    timestamp: '3 hours ago',
    status: 'Unread',
  },
];

export interface FloorUnitCell {
  unitNumber: string;
  suiteNumberOnFloor: number;
  floor: number;
  towerId: TowerId;
  tierId: FloorTierId;
  sqFt: number;
  orientation: PreferredView;
  status: 'Available' | 'Owner Suite (Bookable)' | 'Reserved';
  ownerId: string | null;
}

// Generates a realistic 16-unit floor plate for any chosen Tower (T1-T6) and Floor (1-62)
export function getUnitsForTowerFloor(
  towerId: TowerId,
  floor: number,
  reservations: GuestReservation[],
  owners: CondoOwnerProfile[]
): FloorUnitCell[] {
  const tierId: FloorTierId =
    floor <= 20 ? 'tier-lanai' : floor <= 45 ? 'tier-terrace' : 'tier-penthouse';
  const sqFt = floor <= 20 ? 1150 : floor <= 45 ? 1850 : 3400;

  const views: PreferredView[] = [
    'Direct Beachfront View',
    'Sunset Lagoon View',
    'Marina Yacht View',
    'Panoramic Penthouse Skyview',
  ];

  const cells: FloorUnitCell[] = [];

  // Include any matching special owner units on this tower/floor first
  const matchingOwner = owners.find((o) => o.towerId === towerId);

  for (let i = 1; i <= 12; i++) {
    const paddedUnit = i < 10 ? `0${i}` : `${i}`;
    // Use canonical owner unit numbers on the first slot if floor matches or as quick-pick
    let unitNumber = `#${towerId}-${floor}${paddedUnit}`;
    if (i === 4 && matchingOwner && floor === matchingOwner.floorNumber) {
      unitNumber = matchingOwner.unitNumber;
    }

    const isReserved = reservations.some(
      (r) => r.unitNumber.toUpperCase() === unitNumber.toUpperCase()
    );
    const linkedOwner = owners.find(
      (o) => o.unitNumber.toUpperCase() === unitNumber.toUpperCase()
    );

    // Deterministic availability pattern
    const isPeriodicOccupied = (floor * 7 + i * 3) % 11 === 0;

    cells.push({
      unitNumber,
      suiteNumberOnFloor: i,
      floor,
      towerId,
      tierId,
      sqFt,
      orientation: views[(i + floor) % views.length],
      status: linkedOwner
        ? 'Owner Suite (Bookable)'
        : isReserved || isPeriodicOccupied
        ? 'Reserved'
        : 'Available',
      ownerId: linkedOwner ? linkedOwner.ownerId : null,
    });
  }

  return cells;
}

export function createInitialResortState(): ResortState {
  return {
    towers: structuredClone(INITIAL_TOWERS),
    owners: structuredClone(INITIAL_OWNERS),
    reservations: structuredClone(INITIAL_RESERVATIONS),
    unitRegistry: structuredClone(INITIAL_UNIT_REGISTRY),
    messages: structuredClone(INITIAL_MESSAGES),
  };
}

export function calculateSuiteNightlyRate(
  towerId: TowerId,
  floorTierId: FloorTierId,
  guestPartySize: GuestPartySize,
  preferredView: PreferredView
): number {
  const tower = INITIAL_TOWERS.find((t) => t.id === towerId) ?? INITIAL_TOWERS[0];
  const tier = FLOOR_TIERS.find((f) => f.id === floorTierId) ?? FLOOR_TIERS[0];

  const guestPartySurcharge: Record<GuestPartySize, number> = {
    '2 Guests (1-Bed Sanctuary)': 0,
    '4 Guests (2-Bed Ocean Suite)': 220,
    '6 Guests (3-Bed Corner Residence)': 480,
    '8+ Guests (4-Bed Sky Villa)': 840,
  };

  const viewPremium: Record<PreferredView, number> = {
    'Direct Beachfront View': 140,
    'Sunset Lagoon View': 90,
    'Marina Yacht View': 110,
    'Panoramic Penthouse Skyview': 260,
  };

  const raw =
    tower.baseNightlyRate * tier.baseNightlyMultiplier +
    guestPartySurcharge[guestPartySize] +
    viewPremium[preferredView];

  return Math.round(raw / 10) * 10;
}

export function calculateOwnerFinancials(grossRevenue: number, managementFeeRate = 0.15) {
  const managementFee = Math.round(grossRevenue * managementFeeRate);
  const netOwnerPayout = grossRevenue - managementFee;
  return {
    grossRevenue,
    managementFee,
    netOwnerPayout,
    managementFeePercent: Math.round(managementFeeRate * 100),
  };
}

export function calculateNightsBetween(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 5;
  }
  const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

export interface CreateBookingInput {
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  towerId: TowerId;
  floorTierId: FloorTierId;
  unitNumber: string;
  preferredView: PreferredView;
  guestPartySize: GuestPartySize;
  checkIn: string;
  checkOut: string;
  specialRequests?: string;
  customBookingRef?: string;
}

export function createSuiteReservation(
  state: ResortState,
  input: CreateBookingInput
): { nextState: ResortState; createdReservation: GuestReservation; syncedOwnerId: string | null } {
  const nextState = structuredClone(state);
  const tower = nextState.towers.find((t) => t.id === input.towerId) ?? nextState.towers[0];
  const tier = FLOOR_TIERS.find((f) => f.id === input.floorTierId) ?? FLOOR_TIERS[1];

  const nights = calculateNightsBetween(input.checkIn, input.checkOut);
  const nightlyRate = calculateSuiteNightlyRate(
    input.towerId,
    input.floorTierId,
    input.guestPartySize,
    input.preferredView
  );
  const totalPrice = nightlyRate * nights;

  const deterministicSuffix = 8410 + nextState.reservations.length * 17;
  const bookingRef = input.customBookingRef || `AZR-${deterministicSuffix}`;

  const matchedOwner = nextState.owners.find(
    (o) =>
      o.unitNumber.toUpperCase() === input.unitNumber.toUpperCase() ||
      (o.towerId === input.towerId && input.unitNumber.includes(o.registryCode.replace('#0', '')))
  );

  const syncedOwnerId = matchedOwner ? matchedOwner.ownerId : null;

  const createdReservation: GuestReservation = {
    bookingRef,
    guestName: input.guestName.trim(),
    guestEmail: input.guestEmail.trim(),
    guestPhone: input.guestPhone?.trim() || '+1 (305) 555-0199',
    towerId: tower.id,
    towerLabel: tower.fullLabel,
    unitNumber: input.unitNumber,
    floorTierLabel: tier.label,
    sqFt: tier.sqFt,
    preferredView: input.preferredView,
    guestPartySize: input.guestPartySize,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    nights,
    nightlyRate,
    totalPrice,
    status: 'Reservation Confirmed',
    ownerIdLinked: syncedOwnerId,
    specialRequests:
      input.specialRequests?.trim() ||
      'Complimentary chilled champagne, Beach Club woven daybeds, and biometric lift access.',
    createdAt: 'Just now • Live Sync',
    digitalKeyCode: `KEY-${input.unitNumber.replace('#', '')}-${deterministicSuffix}`,
    transferFlightCode: 'VIP-CHAUFFEUR-MAYBACH',
    suitePhotoUrl: tier.interiorImageUrl,
  };

  nextState.reservations.unshift(createdReservation);

  tower.monthlyGrossRevenue += totalPrice;
  tower.totalBookingsCount += 1;
  tower.occupancyRate = Number(Math.min(99.4, tower.occupancyRate + 0.3).toFixed(1));
  tower.averageDailyRate = Math.round(
    (tower.averageDailyRate * 12 + nightlyRate) / 13
  );

  const regItem = nextState.unitRegistry.find(
    (u) => u.displayUnitNumber.toUpperCase() === input.unitNumber.toUpperCase()
  );
  if (regItem) {
    regItem.currentBookingRef = bookingRef;
  }

  if (matchedOwner) {
    const { managementFee, netOwnerPayout } = calculateOwnerFinancials(
      totalPrice,
      matchedOwner.managementFeeRate
    );
    matchedOwner.monthlyGrossRevenue += totalPrice;
    matchedOwner.annualOccupancyRate = Number(
      Math.min(99.5, matchedOwner.annualOccupancyRate + 0.6).toFixed(1)
    );
    matchedOwner.activeBookingAlert = {
      hasActiveBooking: true,
      bookingRef,
      guestName: createdReservation.guestName,
      checkIn: createdReservation.checkIn,
      checkOut: createdReservation.checkOut,
      nights,
      grossYield: totalPrice,
      netOwnerYield: netOwnerPayout,
      timestampLabel: 'Instant Real-Time Booking Sync • Newly Reserved',
    };
    matchedOwner.stays.unshift({
      bookingRef,
      guestName: createdReservation.guestName,
      checkIn: createdReservation.checkIn,
      checkOut: createdReservation.checkOut,
      nights,
      grossAmount: totalPrice,
      managementFee,
      netPayout: netOwnerPayout,
      status: 'Upcoming Confirmed',
    });
  }

  return { nextState, createdReservation, syncedOwnerId };
}

export function toggleUnitOwnership(
  state: ResortState,
  towerId: TowerId,
  displayUnitNumber: string,
  ownerNameInput?: string,
  ownerIdInput?: string
): ResortState {
  const nextState = structuredClone(state);
  const unit = nextState.unitRegistry.find(
    (u) => u.towerId === towerId && u.displayUnitNumber === displayUnitNumber
  );
  const tower = nextState.towers.find((t) => t.id === towerId);

  if (!unit || !tower) {
    return nextState;
  }

  if (unit.ownershipStatus === 'Privately Owned') {
    unit.ownershipStatus = 'Available Inventory';
    unit.ownerName = null;
    unit.ownerId = null;
    tower.ownedUnits = Math.max(0, tower.ownedUnits - 1);
    tower.availableUnits = tower.totalUnits - tower.ownedUnits;
  } else {
    unit.ownershipStatus = 'Privately Owned';
    const numericPart = unit.unitCode.replace('#0', '').replace('#', '');
    unit.ownerName = ownerNameInput?.trim() || 'Private Sovereign Trust LLC';
    unit.ownerId = ownerIdInput?.trim() || `#OWN-${towerId}-${numericPart}`;
    tower.ownedUnits = Math.min(tower.totalUnits, tower.ownedUnits + 1);
    tower.availableUnits = tower.totalUnits - tower.ownedUnits;
  }

  return nextState;
}

export function advanceBookingStatus(state: ResortState, bookingRef: string): ResortState {
  const nextState = structuredClone(state);
  const booking = nextState.reservations.find(
    (b) => b.bookingRef.toUpperCase() === bookingRef.toUpperCase()
  );
  if (!booking) return nextState;

  const idx = CHECK_IN_STAGES.indexOf(booking.status);
  const nextIdx = (idx + 1) % CHECK_IN_STAGES.length;
  booking.status = CHECK_IN_STAGES[nextIdx];

  if (booking.ownerIdLinked) {
    const owner = nextState.owners.find((o) => o.ownerId === booking.ownerIdLinked);
    if (owner && owner.activeBookingAlert.bookingRef === booking.bookingRef) {
      owner.activeBookingAlert.timestampLabel = `Status Updated by Master Admin: ${booking.status}`;
    }
  }

  return nextState;
}

export function getTowerLeaderboard(towers: TowerData[]): {
  sortedTowers: TowerData[];
  highestRevenueTower: TowerData;
  totalResortRevenue: number;
  totalOwnedUnits: number;
  totalAvailableUnits: number;
} {
  const sortedTowers = [...towers].sort(
    (a, b) => b.monthlyGrossRevenue - a.monthlyGrossRevenue
  );
  const highestRevenueTower = sortedTowers[0];
  const totalResortRevenue = towers.reduce((sum, t) => sum + t.monthlyGrossRevenue, 0);
  const totalOwnedUnits = towers.reduce((sum, t) => sum + t.ownedUnits, 0);
  const totalAvailableUnits = towers.reduce((sum, t) => sum + t.availableUnits, 0);

  return {
    sortedTowers,
    highestRevenueTower,
    totalResortRevenue,
    totalOwnedUnits,
    totalAvailableUnits,
  };
}
