/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Compass,
  KeyRound,
  Crown,
  ConciergeBell,
  SlidersHorizontal,
  Waves,
  Sun,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Clock,
  ArrowRight,
  Camera,
  Map,
} from 'lucide-react';

import {
  PortalId,
  TowerId,
  FloorTierId,
  PreferredView,
  GuestPartySize,
  CHECK_IN_STAGES,
  PREFERRED_VIEWS,
  GUEST_PARTY_SIZES,
  REAL_PROPERTY_PHOTOS,
  FLOOR_TIERS,
  ConciergeMessage,
  createInitialResortState,
  calculateOwnerFinancials,
  calculateNightsBetween,
  calculateSuiteNightlyRate,
  createSuiteReservation,
  toggleUnitOwnership,
  advanceBookingStatus,
  getTowerLeaderboard,
  getUnitsForTowerFloor,
} from './utils/resortEngine';

function formatCurrency(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}

const HERO_GALLERY_SLIDES = [
  {
    id: 'hero-01',
    src: '/assets/aistudio/hd_hero_infinity.jpg',
    badge: 'Angle 01 • Cobalt Infinity Wave Pool',
    title: 'Shimmering Baby-Blue Lap Pool & 62-Story Glass Facades',
  },
  {
    id: 'hero-02',
    src: '/assets/aistudio/hd_hero_beach.jpg',
    badge: 'Angle 02 • White-Sand Beach & Slides',
    title: 'Powdery White-Sand Lagoon Shore & Family Waterslide Cove',
  },
  {
    id: 'hero-03',
    src: '/assets/aistudio/hd_hero_night.jpg',
    badge: 'Angle 03 • Nocturnal Illuminated Lagoon',
    title: 'Glowing Multi-Lobe Wave Pool & Evening Beach Club Rotunda',
  },
];

const BEACH_CLUB_GALLERY = [
  {
    src: '/assets/aistudio/572265915_1e418ccd.jpg',
    metric: 'White-Sand Beach & Twin Slides',
    title: 'Zero-Entry Man-Made White Sand Lagoon',
    subtitle:
      'Powdery white sand, baby-blue wave pool lobes, twin aqua slides, and circular woven palm daybeds.',
  },
  {
    src: '/assets/aistudio/572262141_f2b05beb.jpg',
    metric: 'Nocturnal Geodesic Beach Dome',
    title: 'Paris Beach Club & Evening Palm Promenade',
    subtitle:
      'Multi-level glass clubhouse rotunda, illuminated cocktail dome, and private sommelier dining.',
  },
  {
    src: '/assets/aistudio/596399528_e4156b8f.jpg',
    metric: '360° Lagoon-View Wellness',
    title: 'Panoramic Glass-Walled Fitness Sanctuary',
    subtitle:
      'Full-floor cardio and strength pavilion wrapped in floor-to-ceiling glass overlooking the wave pool.',
  },
];

const PHOTO_CATEGORIES: Array<{
  id:
    | 'all'
    | 'Architecture & Aerials'
    | 'Lagoon & Beach Club'
    | 'Living & Kitchen Suites'
    | 'Bedrooms & En-Suite Bath';
  label: string;
}> = [
  { id: 'all', label: 'All 20 Real Photos' },
  { id: 'Architecture & Aerials', label: 'Towers & Aerials (5)' },
  { id: 'Lagoon & Beach Club', label: 'Lagoon & Beach Club (7)' },
  { id: 'Living & Kitchen Suites', label: 'Living & Kitchen Suites (4)' },
  { id: 'Bedrooms & En-Suite Bath', label: 'Bedrooms & Baths (4)' },
];

const QUICK_FLOOR_PICKS = [6, 14, 24, 35, 48, 58];

export default function App() {
  // Master 6,000-unit (6-Tower) Resort State
  const [resortState, setResortState] = useState(() => createInitialResortState());

  // Active Portal Navigation (6 Portals)
  const [activePortal, setActivePortal] = useState<PortalId>('home');

  // Hero Showcase Carousel on Portal 1 (Full-Screen Image Background)
  const [heroSlideIndex, setHeroSlideIndex] = useState<number>(0);

  // Real Property Photo Archive Filter & Lightbox on Portal 1
  const [photoFilter, setPhotoFilter] = useState<
    | 'all'
    | 'Architecture & Aerials'
    | 'Lagoon & Beach Club'
    | 'Living & Kitchen Suites'
    | 'Bedrooms & En-Suite Bath'
  >('all');
  const [selectedArchivePhotoId, setSelectedArchivePhotoId] = useState<string>('photo-01');

  // Active Thumbnail Index per Tower Card (Portal 1 - 6 Towers)
  const [towerCardThumbIndex, setTowerCardThumbIndex] = useState<Record<TowerId, number>>({
    T1: 0,
    T2: 0,
    T3: 0,
    T4: 0,
    T5: 0,
    T6: 0,
  });

  // Portal 2: 6-Tower Building Explorer, 2D Sky-POV Map & Choose-Your-Own-Unit State
  const [selectedTowerId, setSelectedTowerId] = useState<TowerId>('T1');
  const [selectedFloorTierId, setSelectedFloorTierId] = useState<FloorTierId>('tier-terrace');
  const [selectedFloorNumber, setSelectedFloorNumber] = useState<number>(24);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string>('#T1-804');
  const [customUnitInput, setCustomUnitInput] = useState<string>('');
  const [activeSuitePhotoIdx, setActiveSuitePhotoIdx] = useState<number>(0);
  const [skyMapMode, setSkyMapMode] = useState<'vector-2d' | 'official-plan' | 'aerial-photo'>(
    'vector-2d'
  );

  // Booking Form State
  const [bookingGuestName, setBookingGuestName] = useState<string>('Victoria & Julian Vance');
  const [bookingGuestEmail, setBookingGuestEmail] = useState<string>(
    'victoria.vance@azurea-vip.com'
  );
  const [bookingView, setBookingView] = useState<PreferredView>('Direct Beachfront View');
  const [bookingPartySize, setBookingPartySize] = useState<GuestPartySize>(
    '4 Guests (2-Bed Ocean Suite)'
  );
  const [bookingCheckIn, setBookingCheckIn] = useState<string>('2026-06-15');
  const [bookingCheckOut, setBookingCheckOut] = useState<string>('2026-06-20');
  const [lastBookingConfirmation, setLastBookingConfirmation] = useState<{
    bookingRef: string;
    syncedOwnerId: string | null;
    totalPrice: number;
    unitNumber: string;
    towerName: string;
  } | null>(null);

  // Portal 3: Guest Reservation Tracker State
  const [activeBookingRef, setActiveBookingRef] = useState<string>('AZR-7420');
  const [guestSearchQuery, setGuestSearchQuery] = useState<string>('');

  // Portal 4: Unit Owner ID Portal State
  const [activeOwnerId, setActiveOwnerId] = useState<string>('#OWN-T1-804');
  const [ownerSearchInput, setOwnerSearchInput] = useState<string>('');
  const [payoutAccountMode, setPayoutAccountMode] = useState<'wire' | 'escrow' | 'reinvest'>('wire');
  const [ownerMaintenanceReservePct, setOwnerMaintenanceReservePct] = useState<number>(5);

  // Portal 5: Concierge Desk State
  const [conciergeCategory, setConciergeCategory] = useState<ConciergeMessage['category']>(
    'VIP Butler & Yacht Charter'
  );
  const [conciergeUnit, setConciergeUnit] = useState<string>('#T1-804');
  const [conciergeGuestName, setConciergeGuestName] = useState<string>('Lady Genevieve Laurent');
  const [conciergeSubject, setConciergeSubject] = useState<string>(
    'Sunset Yacht Charter & Woven Daybed Pod Reservation'
  );
  const [conciergeNotes, setConciergeNotes] = useState<string>(
    'Dom Pérignon Vintage chilled on aft deck, private marine biologist guide for coral reef cove.'
  );

  // Portal 6: 6,000-Unit Master Admin ERP State
  const [adminTowerFilter, setAdminTowerFilter] = useState<TowerId | 'ALL'>('ALL');
  const [adminOwnershipFilter, setAdminOwnershipFilter] = useState<
    'ALL' | 'Privately Owned' | 'Available Inventory'
  >('ALL');
  const [adminNewOwnerName, setAdminNewOwnerName] = useState<string>('Marquess Henrik Lindqvist');

  // Derived objects
  const selectedTower = useMemo(
    () => resortState.towers.find((t) => t.id === selectedTowerId) || resortState.towers[0],
    [resortState.towers, selectedTowerId]
  );

  const selectedFloorTier = useMemo(
    () => FLOOR_TIERS.find((tier) => tier.id === selectedFloorTierId) || FLOOR_TIERS[1],
    [selectedFloorTierId]
  );

  // Floor units (12 units on the currently chosen floor of the selected tower)
  const currentFloorUnits = useMemo(
    () =>
      getUnitsForTowerFloor(
        selectedTower.id,
        selectedFloorNumber,
        resortState.reservations,
        resortState.owners
      ),
    [selectedTower.id, selectedFloorNumber, resortState.reservations, resortState.owners]
  );

  const selectedNightlyRate = useMemo(
    () =>
      calculateSuiteNightlyRate(
        selectedTower.id,
        selectedFloorTier.id,
        bookingPartySize,
        bookingView
      ),
    [selectedTower.id, selectedFloorTier.id, bookingPartySize, bookingView]
  );

  const stayNights = useMemo(
    () => calculateNightsBetween(bookingCheckIn, bookingCheckOut),
    [bookingCheckIn, bookingCheckOut]
  );

  const estimatedStayTotal = useMemo(
    () => stayNights * selectedNightlyRate,
    [stayNights, selectedNightlyRate]
  );

  const estimatedStayFinancials = useMemo(
    () => calculateOwnerFinancials(estimatedStayTotal, 0.15),
    [estimatedStayTotal]
  );

  const activeReservation = useMemo(() => {
    const found = resortState.reservations.find((r) => r.bookingRef === activeBookingRef);
    return found || resortState.reservations[0];
  }, [resortState.reservations, activeBookingRef]);

  const activeOwner = useMemo(() => {
    const found = resortState.owners.find((o) => o.ownerId === activeOwnerId);
    return found || resortState.owners[0];
  }, [resortState.owners, activeOwnerId]);

  const activeOwnerFinancials = useMemo(
    () => calculateOwnerFinancials(activeOwner.monthlyGrossRevenue, activeOwner.managementFeeRate),
    [activeOwner]
  );

  const leaderboard = useMemo(
    () => getTowerLeaderboard(resortState.towers),
    [resortState.towers]
  );

  const filteredRegistryUnits = useMemo(() => {
    return resortState.unitRegistry.filter((u) => {
      const matchesTower = adminTowerFilter === 'ALL' || u.towerId === adminTowerFilter;
      const matchesStatus =
        adminOwnershipFilter === 'ALL' || u.ownershipStatus === adminOwnershipFilter;
      return matchesTower && matchesStatus;
    });
  }, [resortState.unitRegistry, adminTowerFilter, adminOwnershipFilter]);

  const filteredArchivePhotos = useMemo(() => {
    if (photoFilter === 'all') return REAL_PROPERTY_PHOTOS;
    return REAL_PROPERTY_PHOTOS.filter((p) => p.category === photoFilter);
  }, [photoFilter]);

  const selectedArchivePhoto = useMemo(
    () =>
      REAL_PROPERTY_PHOTOS.find((p) => p.id === selectedArchivePhotoId) ||
      REAL_PROPERTY_PHOTOS[0],
    [selectedArchivePhotoId]
  );

  const activeHeroSlide = HERO_GALLERY_SLIDES[heroSlideIndex] || HERO_GALLERY_SLIDES[0];

  // Handlers
  const handleSelectTowerAndNavigate = (towerId: TowerId, goToBooking = true) => {
    setSelectedTowerId(towerId);
    const defaultTier = FLOOR_TIERS[1];
    setSelectedFloorTierId(defaultTier.id);
    setSelectedFloorNumber(24);
    setSelectedUnitNumber(defaultTier.sampleUnits[towerId][0]);
    setActiveSuitePhotoIdx(0);
    if (goToBooking) {
      setActivePortal('building');
    }
  };

  const handleFloorChange = (newFloor: number) => {
    const clamped = Math.max(1, Math.min(62, newFloor));
    setSelectedFloorNumber(clamped);
    const tierId: FloorTierId =
      clamped <= 20 ? 'tier-lanai' : clamped <= 45 ? 'tier-terrace' : 'tier-penthouse';
    setSelectedFloorTierId(tierId);
    const paddedUnit = `${clamped}04`;
    setSelectedUnitNumber(`#${selectedTower.id}-${paddedUnit}`);
  };

  const handleApplyCustomUnit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customUnitInput.trim().toUpperCase();
    if (!cleaned) return;
    const formatted = cleaned.startsWith('#')
      ? cleaned
      : cleaned.startsWith('T')
      ? `#${cleaned}`
      : `#${selectedTower.id}-${cleaned}`;
    setSelectedUnitNumber(formatted);
    setCustomUnitInput('');
  };

  const handleCompleteSuiteReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingGuestName.trim()) return;

    const { nextState, createdReservation, syncedOwnerId } = createSuiteReservation(resortState, {
      guestName: bookingGuestName.trim(),
      guestEmail: bookingGuestEmail.trim() || 'vip@azurea-resort.com',
      towerId: selectedTower.id,
      floorTierId: selectedFloorTier.id,
      unitNumber: selectedUnitNumber,
      preferredView: bookingView,
      guestPartySize: bookingPartySize,
      checkIn: bookingCheckIn,
      checkOut: bookingCheckOut,
    });

    setResortState(nextState);
    setActiveBookingRef(createdReservation.bookingRef);
    if (syncedOwnerId) {
      setActiveOwnerId(syncedOwnerId);
    }
    setLastBookingConfirmation({
      bookingRef: createdReservation.bookingRef,
      syncedOwnerId,
      totalPrice: createdReservation.totalPrice,
      unitNumber: createdReservation.unitNumber,
      towerName: selectedTower.shortName,
    });
  };

  const handleLookupBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = guestSearchQuery.trim().toUpperCase();
    if (!cleaned) return;
    const matched = resortState.reservations.find(
      (r) =>
        r.bookingRef.toUpperCase() === cleaned ||
        r.unitNumber.toUpperCase() === cleaned ||
        r.guestName.toUpperCase().includes(cleaned)
    );
    if (matched) {
      setActiveBookingRef(matched.bookingRef);
    }
  };

  const handleLookupOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = ownerSearchInput.trim().toUpperCase();
    if (!cleaned) return;
    const matched = resortState.owners.find(
      (o) =>
        o.ownerId.toUpperCase().includes(cleaned) ||
        o.unitNumber.toUpperCase().includes(cleaned) ||
        o.ownerName.toUpperCase().includes(cleaned)
    );
    if (matched) {
      setActiveOwnerId(matched.ownerId);
    }
  };

  const handleCreateConciergeTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeGuestName.trim() || !conciergeNotes.trim()) return;
    const newMsg: ConciergeMessage = {
      id: `MSG-${100 + resortState.messages.length + 1}`,
      senderRole: 'Guest',
      senderName: conciergeGuestName.trim(),
      senderEmail: 'vip.guest@azurea-resort.com',
      referenceId: conciergeUnit.trim(),
      towerId: selectedTower.id,
      category: conciergeCategory,
      subject: conciergeSubject.trim() || 'VIP Resort Concierge Request',
      body: conciergeNotes.trim(),
      timestamp: 'Just now',
      status: 'Unread',
    };
    setResortState((prev) => ({
      ...prev,
      messages: [newMsg, ...prev.messages],
    }));
    setConciergeNotes('');
  };

  const handleAdminOwnershipUpdate = (
    towerId: TowerId,
    displayUnitNumber: string,
    ownerName?: string,
    ownerId?: string
  ) => {
    const next = toggleUnitOwnership(resortState, towerId, displayUnitNumber, ownerName, ownerId);
    setResortState(next);
  };

  // Sticky Navigation Items (compact single-row labels so zero horizontal scroll occurs)
  const navItems: {
    id: PortalId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', label: 'Resort & 6-Tower Home', icon: Compass },
    { id: 'building', label: '6-Tower Sky Map & Booking', icon: Map },
    { id: 'guest', label: 'Guest Reservation Tracker', icon: KeyRound },
    { id: 'owner', label: 'Unit Owner ID Portal', icon: Crown },
    { id: 'concierge', label: 'Resort Concierge Desk', icon: ConciergeBell },
    { id: 'admin', label: '6,000-Unit Master ERP', icon: SlidersHorizontal },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4FE] via-[#FFFFFF] to-[#E8FBF2] text-slate-900 font-sans selection:bg-sky-200 selection:text-sky-950 relative overflow-x-hidden tabular-nums">
      {/* Ambient Baby-Blue, Light-Green & Crisp White Coastal Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-28 -left-24 w-[680px] h-[680px] rounded-full blur-[150px] opacity-45 animate-pulse"
          style={{ backgroundColor: '#BAE6FD', animationDuration: '11s' }}
        />
        <div
          className="absolute top-[28%] -right-28 w-[640px] h-[640px] rounded-full blur-[150px] opacity-45 animate-pulse"
          style={{ backgroundColor: '#A7F3D0', animationDuration: '14s' }}
        />
        <div
          className="absolute -bottom-32 left-[22%] w-[720px] h-[720px] rounded-full blur-[160px] opacity-40 animate-pulse"
          style={{ backgroundColor: '#7DD3FC', animationDuration: '16s' }}
        />
      </div>

      {/* STICKY FROSTED GLASS NAVIGATION DOCK — Baby Blue, Light Green & White, Zero Horizontal Scrollbar */}
      <header className="fixed top-0 inset-x-0 z-[100] bg-white/95 backdrop-blur-3xl border-b border-sky-200/90 shadow-[0_8px_30px_rgba(14,116,144,0.07)]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-2">
          {/* Brand Crest */}
          <button
            type="button"
            onClick={() => setActivePortal('home')}
            className="flex items-center gap-2.5 text-left group shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Waves className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-semibold tracking-tight text-slate-900">
                  AZUREA
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300/80">
                  6 Towers • 6,000 Units
                </span>
              </div>
              <p className="text-[9.5px] text-sky-800/85 tracking-[0.1em] uppercase font-semibold">
                Beachfront Residences & Owner OS
              </p>
            </div>
          </button>

          {/* 6-Portal Navigation Switcher (Compact single row, no scrollbar, no clipping) */}
          <nav className="flex items-center justify-center gap-1 flex-wrap xl:flex-nowrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePortal === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePortal(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-sky-50/85 text-slate-700 hover:bg-sky-100 hover:text-sky-950 border border-sky-200/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Live Resort Gross Yield Pill */}
          <div className="hidden 2xl:flex items-center gap-2.5 pl-2.5 border-l border-sky-200/80 shrink-0">
            <div className="text-right">
              <div className="text-[9.5px] uppercase tracking-[0.12em] text-sky-700 font-bold">
                6-Tower Gross Yield
              </div>
              <div className="font-serif text-base font-semibold text-slate-900">
                {formatCompactCurrency(leaderboard.totalResortRevenue)} / mo
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* PORTAL 1: FULL-IMAGE BACKGROUND HERO & 6-TOWER RESORT SHOWCASE (home) */}
      {/* ===================================================================== */}
      {activePortal === 'home' && (
        <div className="relative z-10 pt-20">
          {/* SECTION 1: FULL-VIEWPORT FULL-IMAGE BACKGROUND FIRST PAGE HERO */}
          <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-sky-200/80">
            {/* Full-Bleed High-Resolution Crystal-Clear Resort Image Background */}
            <img
              src={activeHeroSlide.src}
              alt={activeHeroSlide.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
            />
            {/* Balanced Subtle Scrim so the High-Resolution Lagoon & Towers Remain Crystal Clear */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/15" />

            {/* Top Floating Bar inside Full-Image Hero: Camera Switcher & Live Verification Badge */}
            <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/92 backdrop-blur-2xl border border-sky-200 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <Camera className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-900">
                  Full-Screen Real Resort Showcase • 6 Iconic Towers • 6,000 Beachfront Units
                </span>
              </div>

              {/* 5-Angle 8K Full-Screen Background Switcher with Live Thumbnails */}
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-2xl p-1.5 rounded-2xl border border-sky-200 shadow-lg">
                {HERO_GALLERY_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setHeroSlideIndex(idx)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      heroSlideIndex === idx
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-sky-100'
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-6 h-4 rounded object-cover border border-white/60 shrink-0"
                    />
                    <span>Angle 0{idx + 1}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setHeroSlideIndex((prev) =>
                      prev === 0 ? HERO_GALLERY_SLIDES.length - 1 : prev - 1
                    )
                  }
                  className="p-1.5 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 cursor-pointer"
                  aria-label="Previous background photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHeroSlideIndex((prev) => (prev + 1) % HERO_GALLERY_SLIDES.length)
                  }
                  className="p-1.5 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 cursor-pointer"
                  aria-label="Next background photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Full-Screen Hero Content: Headline + Baby-Blue/Light-Green/White Glass Console */}
            <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/25 border border-emerald-300/60 backdrop-blur-md text-emerald-100 text-xs font-bold tracking-wide">
                  <Waves className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{activeHeroSlide.badge}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03] text-white drop-shadow-md">
                  Six Iconic Towers.{' '}
                  <span className="italic font-normal text-sky-200 block mt-1">
                    Baby-Blue Lagoon & Emerald Palms.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-sky-50/95 leading-relaxed max-w-2xl font-normal drop-shadow">
                  Welcome to <strong className="font-semibold text-white">Azurea Six-Towers Beach Resort</strong>—6,000 turnkey oceanfront residences surrounding our multi-lobe wave lagoon and Paris Beach Club. Click any of our 6 towers on the 2D Sky-POV map and choose the exact condo unit of your choice.
                </p>

                {/* Primary CTA Buttons in Baby Blue, Light Green & Crisp White */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePortal('building')}
                    className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-emerald-500 text-white text-sm font-bold shadow-xl shadow-sky-500/30 hover:brightness-105 transition-all cursor-pointer"
                  >
                    <Map className="w-4 h-4" />
                    <span>Open 6-Tower 2D Sky-POV Map & Choose Your Unit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePortal('owner')}
                    className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/95 hover:bg-white text-slate-900 border border-sky-200 text-sm font-bold shadow-lg transition-all cursor-pointer"
                  >
                    <Crown className="w-4 h-4 text-emerald-600" />
                    <span>Condo Owner ID Revenue Portal</span>
                  </button>
                </div>

                {/* Live 6-Tower Key Metrics Strip in Frosted White/Baby-Blue/Light-Green Glass */}
                <div className="grid grid-cols-3 gap-3 max-w-xl pt-2">
                  <div className="rounded-2xl bg-white/92 backdrop-blur-2xl border border-sky-200 p-3.5 shadow-lg">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-sky-700 font-bold">
                      Total Inventory
                    </div>
                    <div className="font-serif text-2xl font-semibold text-slate-900 mt-0.5">
                      6,000 Units
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      6 Towers × 1,000 Units
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/92 backdrop-blur-2xl border border-emerald-200 p-3.5 shadow-lg">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-emerald-700 font-bold">
                      Investor Deeded
                    </div>
                    <div className="font-serif text-2xl font-semibold text-emerald-800 mt-0.5">
                      {leaderboard.totalOwnedUnits.toLocaleString()} Owned
                    </div>
                    <div className="text-[11px] text-sky-800 font-semibold">
                      {leaderboard.totalAvailableUnits.toLocaleString()} Resort Direct
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/92 backdrop-blur-2xl border border-sky-200 p-3.5 shadow-lg">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-sky-700 font-bold">
                      Net Owner Split
                    </div>
                    <div className="font-serif text-2xl font-semibold text-sky-900 mt-0.5">
                      85% Payout
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      Instant Owner ID Sync
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Floating Crisp White, Baby-Blue & Light-Green Quick Tower & Unit Booking Console */}
              <div className="lg:col-span-5">
                <div className="bg-white/95 backdrop-blur-3xl border-2 border-sky-200/90 rounded-3xl p-6 shadow-[0_24px_60px_rgba(2,132,199,0.22)] space-y-5">
                  <div className="flex items-center justify-between gap-2 border-b border-sky-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                        Instant 6-Tower Unit Selector
                      </span>
                      <h2 className="font-serif text-2xl font-semibold text-slate-900 mt-2">
                        Pick a Tower & Choose Your Unit
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-sky-700 font-bold">From Nightly</div>
                      <div className="font-serif text-2xl font-semibold text-sky-700">
                        {formatCurrency(selectedTower.baseNightlyRate)}
                      </div>
                    </div>
                  </div>

                  {/* 6-Tower Mini Grid Selector inside Hero Console */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 mb-2">
                      1. Click Any of Our 6 Beachfront Towers:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {resortState.towers.map((t) => {
                        const active = t.id === selectedTower.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleSelectTowerAndNavigate(t.id, false)}
                            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                              active
                                ? 'bg-gradient-to-br from-sky-500 to-emerald-500 text-white border-sky-400 shadow-md'
                                : 'bg-sky-50/80 hover:bg-sky-100 text-slate-800 border-sky-200/80'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span>
                                {t.id} • {t.resortWingName}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  active
                                    ? 'bg-white/25 text-white'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {t.occupancyRate}%
                              </span>
                            </div>
                            <div
                              className={`text-[11px] truncate mt-0.5 ${
                                active ? 'text-sky-50' : 'text-slate-500'
                              }`}
                            >
                              {t.shortName.replace(/^Tower [IVX]+:\s*/, '')}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Floor & Unit Picker Preview */}
                  <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-4 rounded-2xl border border-sky-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        2. Pick a Unit in {selectedTower.resortWingName} ({selectedTower.id}):
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        Unit {selectedUnitNumber}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {FLOOR_TIERS.flatMap((tier) => tier.sampleUnits[selectedTower.id])
                        .slice(0, 6)
                        .map((uCode) => (
                          <button
                            key={uCode}
                            type="button"
                            onClick={() => setSelectedUnitNumber(uCode)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedUnitNumber === uCode
                                ? 'bg-sky-600 text-white shadow-sm'
                                : 'bg-white text-slate-700 border border-sky-200 hover:bg-sky-100'
                            }`}
                          >
                            {uCode}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Interior Preview Thumbs of Selected Tower */}
                  <div className="grid grid-cols-3 gap-2">
                    {selectedTower.suiteInteriorImageUrls.slice(0, 3).map((imgSrc, i) => (
                      <div
                        key={imgSrc}
                        className="relative h-20 rounded-xl overflow-hidden border border-sky-200"
                      >
                        <img
                          src={imgSrc}
                          alt={`${selectedTower.shortName} interior ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePortal('building')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch 2D Sky-POV Map & Pick Exact Unit</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Full-Width Glass Thumbnail Ribbon inside Hero */}
            <div className="relative z-10 bg-white/90 backdrop-blur-2xl border-t border-sky-200/80 py-3 px-4 sm:px-8">
              <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
                  <Sun className="w-4 h-4 text-emerald-600" />
                  <span>Active Full-Screen View:</span>
                  <span className="text-sky-700">{activeHeroSlide.title}</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {HERO_GALLERY_SLIDES.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setHeroSlideIndex(index)}
                      className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        heroSlideIndex === index
                          ? 'bg-sky-100 border-sky-400 text-sky-950 shadow-sm'
                          : 'bg-white/80 border-sky-200/70 text-slate-600 hover:bg-sky-50'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.badge}
                        className="w-8 h-6 rounded object-cover shrink-0"
                      />
                      <span className="truncate max-w-[140px]">{slide.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Main Container for Remaining Sections on Portal 1 */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
            {/* SECTION 2: ALL 6 ICONIC TOWERS SHOWCASE GRID (1,000 UNITS PER TOWER = 6,000 TOTAL UNITS) */}
            <section className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-sky-700 font-bold">
                    Six Architectural Residential Towers • 1,000 Units Per Tower
                  </div>
                  <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-slate-900 mt-1">
                    Explore All Six Resort Towers
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePortal('building')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:brightness-105 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Map className="w-4 h-4" />
                  <span>Open 6-Tower 2D Up Sky-POV Map</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resortState.towers.map((tower) => {
                  const ownedPercent = Math.round((tower.ownedUnits / tower.totalUnits) * 100);
                  const activeThumbIdx = towerCardThumbIndex[tower.id] ?? 0;
                  const displayImage =
                    activeThumbIdx === 0
                      ? tower.imageUrl
                      : tower.suiteInteriorImageUrls[
                          (activeThumbIdx - 1) % tower.suiteInteriorImageUrls.length
                        ];

                  return (
                    <div
                      key={tower.id}
                      className="bg-white/92 backdrop-blur-3xl border border-sky-200/90 shadow-[0_12px_36px_rgba(14,116,144,0.07)] rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-sky-400 transition-all"
                    >
                      <div>
                        {/* Real Photograph Container */}
                        <div className="relative h-60 overflow-hidden bg-sky-100">
                          <img
                            src={displayImage}
                            alt={tower.fullLabel}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-sky-900 text-xs font-bold border border-sky-200 shadow-sm">
                              {tower.id} • {tower.resortWingName}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm">
                              {tower.occupancyRate}% Occupancy
                            </span>
                          </div>

                          <div className="absolute bottom-3.5 left-3.5 right-3.5">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-300 font-bold">
                              {tower.architecturalSubtitle}
                            </p>
                            <h3 className="font-serif text-xl font-semibold text-white mt-0.5 leading-snug">
                              {tower.fullLabel}
                            </h3>
                          </div>
                        </div>

                        {/* Interactive 5-Photo Real Interior Filmstrip Switcher */}
                        <div className="px-5 pt-3.5 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700">
                            Real Unit Photos:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {[tower.imageUrl, ...tower.suiteInteriorImageUrls.slice(0, 4)].map(
                              (thumbUrl, tIdx) => (
                                <button
                                  key={`${tower.id}-thumb-${tIdx}`}
                                  type="button"
                                  onClick={() =>
                                    setTowerCardThumbIndex((prev) => ({
                                      ...prev,
                                      [tower.id]: tIdx,
                                    }))
                                  }
                                  className={`w-9 h-6 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                    activeThumbIdx === tIdx
                                      ? 'border-sky-500 scale-105 shadow-sm'
                                      : 'border-transparent opacity-70 hover:opacity-100'
                                  }`}
                                >
                                  <img
                                    src={thumbUrl}
                                    alt={`${tower.shortName} view ${tIdx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        {/* Body Details */}
                        <div className="p-5 space-y-4">
                          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-gradient-to-r from-sky-50/90 to-emerald-50/90 border border-sky-200/70">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                Owned
                              </div>
                              <div className="font-serif text-lg font-semibold text-slate-900">
                                {tower.ownedUnits}
                              </div>
                            </div>
                            <div className="border-x border-sky-200/70 px-2">
                              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                Available
                              </div>
                              <div className="font-serif text-lg font-semibold text-emerald-700">
                                {tower.availableUnits}
                              </div>
                            </div>
                            <div className="pl-1">
                              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                From Rate
                              </div>
                              <div className="font-serif text-lg font-semibold text-sky-700">
                                {formatCurrency(tower.baseNightlyRate)}
                              </div>
                            </div>
                          </div>

                          {/* Ownership Bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-semibold">
                              <span className="text-sky-800">
                                Deeded Owners ({ownedPercent}%)
                              </span>
                              <span className="text-emerald-700">
                                {100 - ownedPercent}% Open Booking
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-sky-100 overflow-hidden flex">
                              <div
                                className="h-full bg-sky-500"
                                style={{ width: `${ownedPercent}%` }}
                              />
                              <div
                                className="h-full bg-emerald-400"
                                style={{ width: `${100 - ownedPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer CTA */}
                      <div className="px-5 pb-5 pt-3 border-t border-sky-100 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                            Monthly Yield
                          </div>
                          <div className="font-serif text-lg font-semibold text-slate-900">
                            {formatCompactCurrency(tower.monthlyGrossRevenue)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectTowerAndNavigate(tower.id, true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs font-bold hover:brightness-105 transition-all cursor-pointer shadow-sm"
                        >
                          <span>Choose Unit in {tower.id}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: VERIFIED 20-PHOTO REAL PROPERTY & RESIDENCE GALLERY */}
            <section className="bg-white/92 backdrop-blur-3xl border border-sky-200/90 shadow-[0_12px_40px_rgba(14,116,144,0.06)] rounded-3xl p-6 sm:p-10 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-sky-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-emerald-700 font-bold">
                    <Camera className="w-4 h-4" />
                    <span>100% Authentic Uploaded Resort & Condo Photography</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 mt-1">
                    Inside Our Lagoon, Beach Club & Furnished Residences
                  </h2>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {PHOTO_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setPhotoFilter(cat.id);
                        const firstMatch =
                          cat.id === 'all'
                            ? REAL_PROPERTY_PHOTOS[0]
                            : REAL_PROPERTY_PHOTOS.find((p) => p.category === cat.id);
                        if (firstMatch) setSelectedArchivePhotoId(firstMatch.id);
                      }}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        photoFilter === cat.id
                          ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                          : 'bg-sky-50/80 text-slate-700 border border-sky-200 hover:bg-sky-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Selected Photo + 20-Photo Thumbnail Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6">
                  <div className="rounded-3xl overflow-hidden border-2 border-sky-200 bg-slate-900 shadow-lg">
                    <div className="relative h-[380px] sm:h-[430px] bg-slate-950 flex items-center justify-center overflow-hidden">
                      <img
                        src={selectedArchivePhoto.src}
                        alt={selectedArchivePhoto.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/95 text-sky-900 text-xs font-bold">
                          Tower {selectedArchivePhoto.linkedTowerId}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                          {selectedArchivePhoto.roomTag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-sky-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-serif text-2xl font-semibold text-white">
                          {selectedArchivePhoto.title}
                        </h3>
                        <p className="text-xs text-sky-100/90 leading-relaxed max-w-xl">
                          {selectedArchivePhoto.subtitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectTowerAndNavigate(selectedArchivePhoto.linkedTowerId, true)
                        }
                        className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
                      >
                        <span>Book {selectedArchivePhoto.linkedTowerId}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800">
                      Click Any Property Photograph ({filteredArchivePhotos.length} Shown)
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold">
                      Verified Residence & Lagoon Views
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[470px] overflow-y-auto pr-1">
                    {filteredArchivePhotos.map((photo) => {
                      const isSelected = photo.id === selectedArchivePhoto.id;
                      return (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => setSelectedArchivePhotoId(photo.id)}
                          className={`group relative rounded-2xl overflow-hidden border-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-sky-500 ring-2 ring-sky-400/40 shadow-md'
                              : 'border-sky-200/80 opacity-85 hover:opacity-100'
                          }`}
                        >
                          <div className="h-24 sm:h-28 w-full overflow-hidden bg-sky-100">
                            <img
                              src={photo.src}
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-2 bg-white">
                            <div className="text-[10px] font-bold text-sky-700 truncate">
                              {photo.roomTag}
                            </div>
                            <div className="text-[11px] font-semibold text-slate-800 truncate">
                              {photo.title}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: PARIS BEACH CLUB & WAVE LAGOON BENTO SHOWCASE */}
            <section className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-emerald-700 font-bold">
                  Resort-Wide Amenities • Included with Every Suite & Condo Stay
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 mt-1">
                  Paris Beach Club, Wave Pool & White-Sand Cove
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BEACH_CLUB_GALLERY.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white/92 backdrop-blur-3xl border border-sky-200/90 shadow-md rounded-3xl overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-white/95 text-sky-900 text-[11px] font-bold border border-sky-200 shadow-sm">
                          {item.metric}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-serif text-2xl font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PORTAL 2: 6-TOWER 2D SKY-POV MAP & CHOOSE-YOUR-OWN-UNIT BOOKING       */}
      {/* ===================================================================== */}
      {activePortal === 'building' && (
        <main className="relative z-10 pt-24 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header & 6-Tower Quick Bar */}
          <section className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-emerald-700 font-bold">
                  <Map className="w-4 h-4 text-sky-600" />
                  <span>
                    6 Iconic Beachfront Towers • Interactive 2D Up Sky-POV Map & Custom Unit Picker
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-slate-900 mt-1">
                  Click Your Tower & Choose Any Unit of Your Choice
                </h1>
              </div>

              {/* 3-Mode Map Skin Switcher */}
              <div className="flex items-center gap-1.5 bg-white/95 p-1.5 rounded-2xl border border-sky-200 shadow-sm">
                <button
                  type="button"
                  onClick={() => setSkyMapMode('vector-2d')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    skyMapMode === 'vector-2d'
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-sky-50'
                  }`}
                >
                  2D Up Sky-POV Realistic Aerial Map
                </button>
                <button
                  type="button"
                  onClick={() => setSkyMapMode('official-plan')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    skyMapMode === 'official-plan'
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-sky-50'
                  }`}
                >
                  2D Roof-Truss CAD Vector Plan
                </button>
                <button
                  type="button"
                  onClick={() => setSkyMapMode('aerial-photo')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    skyMapMode === 'aerial-photo'
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-sky-50'
                  }`}
                >
                  Lagoon & Beach Club Sky View
                </button>
              </div>
            </div>

            {/* 6-Tower Selection Pills */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {resortState.towers.map((tower) => {
                const isSelected = tower.id === selectedTower.id;
                return (
                  <button
                    key={tower.id}
                    type="button"
                    onClick={() => handleSelectTowerAndNavigate(tower.id, false)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-sky-500 to-emerald-500 text-white border-sky-400 shadow-lg shadow-sky-500/20 scale-[1.01]'
                        : 'bg-white/92 text-slate-900 border-sky-200 hover:border-sky-400 hover:bg-sky-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/25 text-white' : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {tower.id} • {tower.resortWingName}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-emerald-100' : 'text-emerald-700'
                        }`}
                      >
                        {tower.availableUnits} Open
                      </span>
                    </div>
                    <div className="font-serif text-lg font-semibold mt-1.5 truncate">
                      {tower.shortName.replace(/^Tower [IVX]+:\s*/, '')}
                    </div>
                    <div
                      className={`text-[11px] mt-0.5 flex items-center justify-between ${
                        isSelected ? 'text-sky-100' : 'text-slate-500'
                      }`}
                    >
                      <span className="truncate">{tower.skyMap.verifierStation.split(' (')[0]}</span>
                      <span className="font-bold">{formatCurrency(tower.baseNightlyRate)}/nt</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SECTION 1: ACCURATE INTERACTIVE 2D UP SKY-POV 6-TOWER MASTERPLAN MAP WITH REALISTIC SKIN & COLORS */}
          <section className="bg-white/95 backdrop-blur-3xl border-2 border-sky-200/90 shadow-[0_18px_50px_rgba(14,116,144,0.09)] rounded-3xl p-5 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                    Accurate 2D Up Sky-POV Masterplan
                  </span>
                  <span className="text-xs text-sky-700 font-semibold">
                    Click any of the 6 green-turf & white-truss towers around the Paris Beach Club & Wave Lagoon
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                  Azurea 6-Tower Masterplan — Realistic Roof Skin, Paris Beach Club & Verifier Stations
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 border border-sky-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Selected Tower: {selectedTower.id} ({selectedTower.resortWingName})
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Selected Unit: {selectedUnitNumber} (Floor {selectedFloorNumber})
                </span>
              </div>
            </div>

            {/* MODE 1 (DEFAULT): ACCURATE HIGH-RES 2D UP SKY-POV MASTERPLAN WITH CLICKABLE 6-TOWER HOTSPOTS + AZURE DIRECTORY PANEL */}
            {skyMapMode === 'vector-2d' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border-2 border-sky-300 shadow-xl bg-[#0B3B68]">
                  {/* Left 9 Columns: High-Resolution Accurate 2D Sky-POV Aerial Map + Interactive 6-Tower Hotspots */}
                  <div className="lg:col-span-9 relative bg-[#1E3A2F] flex flex-col justify-between overflow-hidden">
                    <div className="relative w-full">
                      <img
                        src="/assets/aistudio/hd_sky_pov_map.jpg"
                        alt="Accurate 2D Up Sky-POV Masterplan of Azure Urban Resort Residences"
                        className="w-full h-auto block select-none"
                      />

                      {/* Top-Left Azure Urban Resort Residences Brand Crest Overlay */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-sky-200 shadow-lg pointer-events-none">
                        <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0B3B68] leading-none">
                          azurea
                        </div>
                        <div className="text-[8.5px] font-extrabold uppercase tracking-[0.16em] text-sky-700 mt-0.5">
                          URBAN RESORT RESIDENCES
                        </div>
                      </div>

                      {/* Guest Verifier Station Callouts on the Map matching the Official Layout */}
                      <div className="hidden sm:block absolute top-3 left-[31%] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-sky-300 shadow-md text-[9px] font-extrabold text-slate-900 uppercase tracking-wider pointer-events-none">
                        Guest Verifier 2 (Positano • Miami • Maui)
                      </div>
                      <div className="hidden sm:block absolute top-[58%] right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-sky-300 shadow-md text-[9px] font-extrabold text-slate-900 uppercase tracking-wider pointer-events-none">
                        Guest Verifier 3 (Boracay)
                      </div>

                      {/* Interactive Clickable Hotspots Positioned at the Exact Coordinates of the 6 Towers */}
                      {[
                        {
                          id: 'T1' as TowerId,
                          name: 'SANTORINI',
                          left: '70.8%',
                          top: '35.6%',
                        },
                        {
                          id: 'T2' as TowerId,
                          name: 'ST. TROPEZ',
                          left: '65.4%',
                          top: '57.4%',
                        },
                        {
                          id: 'T3' as TowerId,
                          name: 'MALDIVES',
                          left: '39.5%',
                          top: '53.2%',
                        },
                        {
                          id: 'T4' as TowerId,
                          name: 'POSITANO',
                          left: '53.8%',
                          top: '23.2%',
                        },
                        {
                          id: 'T5' as TowerId,
                          name: 'MIAMI',
                          left: '33.8%',
                          top: '33.0%',
                        },
                        {
                          id: 'T6' as TowerId,
                          name: 'BORACAY',
                          left: '56.8%',
                          top: '69.2%',
                        },
                      ].map((hotspot) => {
                        const towerObj =
                          resortState.towers.find((t) => t.id === hotspot.id) ||
                          resortState.towers[0];
                        const isSelected = selectedTower.id === hotspot.id;

                        return (
                          <button
                            key={hotspot.id}
                            type="button"
                            style={{ left: hotspot.left, top: hotspot.top }}
                            onClick={() => handleSelectTowerAndNavigate(hotspot.id, false)}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                              isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                            }`}
                          >
                            {/* Glowing Pulse Ring on Active Tower */}
                            {isSelected && (
                              <span className="absolute -inset-3 rounded-2xl border-2 border-emerald-300 bg-emerald-400/20 animate-pulse pointer-events-none" />
                            )}

                            <div
                              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl border-2 shadow-xl backdrop-blur-md transition-all flex flex-col items-center min-w-[108px] sm:min-w-[126px] ${
                                isSelected
                                  ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white border-white ring-4 ring-sky-300/60'
                                  : 'bg-[#0F294A]/92 text-white border-sky-300/90 hover:bg-sky-600 hover:border-white'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    isSelected ? 'bg-white animate-ping' : 'bg-emerald-400'
                                  }`}
                                />
                                <span>
                                  {hotspot.id} • {hotspot.name}
                                </span>
                              </div>
                              <div
                                className={`text-[9px] font-bold mt-0.5 ${
                                  isSelected ? 'text-emerald-50' : 'text-emerald-300'
                                }`}
                              >
                                {towerObj.availableUnits} Open • {formatCurrency(towerObj.baseNightlyRate)}/nt
                              </div>
                            </div>
                          </button>
                        );
                      })}

                      {/* Central Paris Beach Club Landmark Badge */}
                      <div
                        style={{ left: '49.2%', top: '41.5%' }}
                        className="hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-md border border-emerald-400 shadow-md items-center gap-1.5 pointer-events-none"
                      >
                        <Waves className="w-3 h-3 text-sky-600" />
                        <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-900">
                          Paris Beach Club & Wave Lagoon
                        </span>
                      </div>
                    </div>

                    {/* Bottom Guest Verifier Locations Bar (Matching the Official Azure Site Plan Footer) */}
                    <div className="bg-white/98 border-t-2 border-sky-200 px-4 py-3.5 grid grid-cols-1 sm:grid-cols-4 gap-3 text-slate-800">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0B3B68] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          V1
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B3B68]">
                            Guest Verifier 1
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium">
                            • T1 Santorini • T2 St. Tropez
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0B3B68] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          V2
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B3B68]">
                            Guest Verifier 2
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium">
                            • T4 Positano • T5 Miami • T3 Maldives
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0B3B68] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          V3
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B3B68]">
                            Guest Verifier 3
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium">
                            • T6 Boracay • South Beach Wing
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          P
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                            Parking & STL Gates 1–3
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium">
                            Short-Term Lease VIP Check-In
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right 3 Columns: Official Azure Policies, Guidelines & Active Tower Inspector Panel */}
                  <div className="lg:col-span-3 bg-gradient-to-b from-[#092C52] via-[#0B3B68] to-[#082644] text-white p-5 sm:p-6 flex flex-col justify-between space-y-5 border-t lg:border-t-0 lg:border-l border-sky-400/30">
                    <div className="space-y-4">
                      <div className="text-center border-b border-sky-400/30 pb-3">
                        <div className="font-serif text-3xl font-semibold tracking-wider text-white">
                          azurea
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-sky-200 font-bold mt-0.5">
                          URBAN RESORT RESIDENCES
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-emerald-300 font-bold mt-2">
                          POLICIES & TOWER DIRECTORY
                        </div>
                      </div>

                      {/* Active Tower & Chosen Unit Live Status Box */}
                      <div className="rounded-2xl bg-white/10 border border-sky-300/40 p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                            Active Map Selection
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                            {selectedTower.availableUnits} Units Open
                          </span>
                        </div>
                        <div className="font-serif text-xl font-semibold text-white">
                          {selectedTower.id}: {selectedTower.resortWingName} Tower
                        </div>
                        <div className="text-xs text-sky-100 font-medium">
                          Chosen Condo Unit:{' '}
                          <span className="font-bold text-emerald-300">
                            {selectedUnitNumber} (Floor {selectedFloorNumber})
                          </span>
                        </div>
                        <div className="text-[11px] text-sky-200/90 pt-1 border-t border-white/10 flex items-center justify-between">
                          <span>{selectedTower.skyMap.verifierStation.split(' (')[0]}</span>
                          <span>{selectedTower.skyMap.nearestGate}</span>
                        </div>
                      </div>

                      {/* Beachfront Living Description */}
                      <div className="text-center space-y-1.5 px-1">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-sky-200">
                          BEACHFRONT LIVING IN THE HEART OF THE CITY
                        </div>
                        <p className="text-[11px] text-sky-100/85 leading-relaxed">
                          Featuring the iconic man-made white-sand beach lagoon, multi-level Paris
                          Beach Club, and 6 resort residential towers (1,000 units per building).
                        </p>
                      </div>

                      {/* Important Reminders Box */}
                      <div className="rounded-2xl bg-[#061F38]/90 border border-sky-300/40 p-3.5 space-y-2">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
                          IMPORTANT REMINDERS
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-sky-100/95 leading-snug">
                          <li>
                            • Register at the Guest Verifier station of your respective tower before
                            using the wave pool & beach club.
                          </li>
                          <li>
                            • Digital wristband & unit keycard activate automatically upon suite
                            booking confirmation.
                          </li>
                          <li>
                            • Click any of the 6 towers on the map, then choose your exact floor &
                            unit number below.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-sky-400/25 text-center">
                      <div className="font-serif italic text-lg text-emerald-300">Thank you!</div>
                      <div className="text-[10.5px] text-sky-200">
                        Let&apos;s keep Azurea a safe and relaxing paradise for all.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: 2D ARCHITECTURAL ROOF-TRUSS CAD VECTOR BLUEPRINT */}
            {skyMapMode === 'official-plan' && (
              <div className="relative w-full rounded-3xl overflow-hidden border-2 border-sky-300/80 shadow-inner bg-[#2F5233]">
                <svg
                  viewBox="0 0 1100 660"
                  className="w-full h-auto block select-none"
                  role="img"
                  aria-label="2D Architectural Roof-Truss CAD Vector Plan of all 6 Towers"
                >
                  <defs>
                    <linearGradient id="coastalTurf" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B6E38" />
                      <stop offset="50%" stopColor="#2F5D31" />
                      <stop offset="100%" stopColor="#254B27" />
                    </linearGradient>
                    <radialGradient id="babyBlueLagoon" cx="50%" cy="48%" r="55%">
                      <stop offset="0%" stopColor="#7DD3FC" />
                      <stop offset="55%" stopColor="#38BDF8" />
                      <stop offset="90%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </radialGradient>
                    <linearGradient id="whiteSandBeach" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F5F3EB" />
                      <stop offset="65%" stopColor="#EAE6D7" />
                      <stop offset="100%" stopColor="#D8D2BD" />
                    </linearGradient>
                    <filter id="towerDropShadow" x="-20%" y="-20%" width="150%" height="150%">
                      <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="7"
                        floodColor="#091E12"
                        floodOpacity="0.45"
                      />
                    </filter>
                  </defs>

                  {/* 1. Lush Forest Canopy Perimeter */}
                  <rect x="0" y="0" width="1100" height="660" fill="url(#coastalTurf)" />

                  {/* Resort Inner Courtyard Deck */}
                  <path
                    d="M 155,180 Q 335,45 645,55 Q 785,65 765,230 Q 750,400 685,570 Q 520,635 340,515 Q 180,385 155,180 Z"
                    fill="#D9E2DC"
                    stroke="#A7F3D0"
                    strokeWidth="3"
                  />

                  {/* Divided Highway on Bottom-Left with Gates 2, STL Entrance, Gate 1, Gate 3 */}
                  <path
                    d="M -20,215 L 545,670 L 435,670 L -20,305 Z"
                    fill="#64748B"
                    stroke="#CBD5E1"
                    strokeWidth="3"
                  />
                  <line
                    x1="-10"
                    y1="260"
                    x2="490"
                    y2="665"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <line
                    x1="5"
                    y1="248"
                    x2="510"
                    y2="655"
                    stroke="#F8FAFC"
                    strokeWidth="1.5"
                    strokeDasharray="10,8"
                  />

                  {/* GATE 2, GATE 1, GATE 3 Badges */}
                  <g transform="translate(68, 305) rotate(39)">
                    <rect x="-36" y="-12" width="72" height="24" rx="5" fill="#0F294A" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">GATE 2</text>
                  </g>
                  <g transform="translate(310, 502) rotate(39)">
                    <rect x="-36" y="-12" width="72" height="24" rx="5" fill="#0F294A" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">GATE 1</text>
                  </g>
                  <g transform="translate(392, 570) rotate(39)">
                    <rect x="-36" y="-12" width="72" height="24" rx="5" fill="#0F294A" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">GATE 3</text>
                  </g>

                  {/* Sand Beach & Multi-Lobe Turquoise Wave Pool */}
                  <ellipse cx="475" cy="255" rx="145" ry="120" fill="url(#whiteSandBeach)" />
                  <path
                    d="M 465,125 C 535,115 580,155 565,210 C 550,255 530,280 545,325 C 560,365 510,400 465,385 C 425,372 415,325 430,275 C 445,225 405,135 465,125 Z"
                    fill="url(#babyBlueLagoon)"
                    stroke="#BAE6FD"
                    strokeWidth="4"
                  />

                  {/* Western Lagoon Pool + Blue Basketball Sports Court */}
                  <ellipse cx="290" cy="235" rx="44" ry="26" fill="url(#babyBlueLagoon)" stroke="#BAE6FD" strokeWidth="3" />
                  <rect x="338" y="232" width="28" height="48" rx="3" fill="#0284C7" stroke="#BAE6FD" strokeWidth="2" transform="rotate(14 352 256)" />

                  {/* White Oval Paris Beach Club in the Center */}
                  <g transform="translate(398, 252) rotate(6)">
                    <rect x="-26" y="-54" width="52" height="108" rx="26" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" filter="url(#towerDropShadow)" />
                    <rect x="-12" y="-36" width="24" height="72" rx="12" fill="#4D7C5D" stroke="#A7F3D0" strokeWidth="2" />
                    <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800">PARIS</text>
                    <text x="0" y="8" textAnchor="middle" fill="#A7F3D0" fontSize="6.5" fontWeight="800">CLUB</text>
                  </g>

                  {/* All 6 Clickable Towers with Green Rooftop Turf & White Diagonal Roof Trusses */}
                  {resortState.towers.map((tower) => {
                    const isSelected = tower.id === selectedTower.id;
                    const { x, y, rotation } = tower.skyMap;

                    return (
                      <g
                        key={tower.id}
                        transform={`translate(${x}, ${y})`}
                        onClick={() => handleSelectTowerAndNavigate(tower.id, false)}
                        className="cursor-pointer group"
                      >
                        {isSelected && (
                          <circle
                            cx="0"
                            cy="0"
                            r="76"
                            fill="none"
                            stroke="#38BDF8"
                            strokeWidth="4"
                            strokeDasharray="8,6"
                          />
                        )}

                        {/* Realistic Green Turf Roof + White Diagonal Structural Trusses */}
                        <g transform={`rotate(${rotation})`} filter="url(#towerDropShadow)">
                          <rect
                            x="-64"
                            y="-28"
                            width="128"
                            height="56"
                            rx="6"
                            fill="#FFFFFF"
                            stroke={isSelected ? '#38BDF8' : '#E2E8F0'}
                            strokeWidth={isSelected ? '4' : '2.5'}
                          />
                          {/* Left & Right Green Grass Roof Decks */}
                          <rect x="-56" y="-21" width="50" height="42" rx="3" fill="#4D8B31" />
                          <rect x="6" y="-21" width="50" height="42" rx="3" fill="#4D8B31" />
                          {/* White Diagonal Roof Trusses */}
                          <line x1="-56" y1="-21" x2="-6" y2="21" stroke="#FFFFFF" strokeWidth="4" />
                          <line x1="-56" y1="21" x2="-6" y2="-21" stroke="#FFFFFF" strokeWidth="3" />
                          <line x1="6" y1="-21" x2="56" y2="21" stroke="#FFFFFF" strokeWidth="4" />
                          <line x1="6" y1="21" x2="56" y2="-21" stroke="#FFFFFF" strokeWidth="3" />
                          <line x1="0" y1="-26" x2="0" y2="26" stroke="#FFFFFF" strokeWidth="5" />
                        </g>

                        {/* Navy/Sky Tower Label Callout */}
                        <g transform="translate(0, 4)">
                          <rect
                            x="-60"
                            y="-15"
                            width="120"
                            height="30"
                            rx="6"
                            fill={isSelected ? '#0284C7' : '#0F294A'}
                            stroke={isSelected ? '#A7F3D0' : '#38BDF8'}
                            strokeWidth="2"
                          />
                          <text x="0" y="-1" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="800">
                            {tower.resortWingName} ({tower.id})
                          </text>
                          <text x="0" y="10" textAnchor="middle" fill="#6EE7B7" fontSize="8.5" fontWeight="700">
                            {tower.availableUnits} Units Open
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Right-Side Summary Panel */}
                  <g transform="translate(835, 22)">
                    <rect x="0" y="0" width="245" height="615" rx="20" fill="#092C52" stroke="#38BDF8" strokeWidth="2.5" />
                    <text x="122" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="800" letterSpacing="0.08em">
                      AZUREA
                    </text>
                    <text x="122" y="60" textAnchor="middle" fill="#A7F3D0" fontSize="9.5" fontWeight="700" letterSpacing="0.14em">
                      2D CAD ROOF-TRUSS PLAN
                    </text>
                    <line x1="22" y1="76" x2="223" y2="76" stroke="#38BDF8" strokeWidth="1.5" />
                    <text x="122" y="108" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800">
                      {selectedTower.id}: {selectedTower.resortWingName}
                    </text>
                    <text x="122" y="130" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="700">
                      Unit {selectedUnitNumber} • Floor {selectedFloorNumber}
                    </text>
                    <text x="122" y="152" textAnchor="middle" fill="#BAE6FD" fontSize="10" fontWeight="600">
                      {selectedTower.skyMap.verifierStation}
                    </text>
                  </g>
                </svg>
              </div>
            )}

            {/* MODE 3: REAL SKY LAGOON & BEACH CLUB AERIAL PHOTOGRAPH */}
            {skyMapMode === 'aerial-photo' && (
              <div className="relative h-[540px] rounded-3xl overflow-hidden border-2 border-sky-300 shadow-lg">
                <img
                  src="/assets/aistudio/593416468_ccb578bb.jpg"
                  alt="Real Sky Aerial Photograph of Beach & Lagoon"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />
                <div className="absolute bottom-6 inset-x-6 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-2xl p-4 rounded-2xl border border-sky-200">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      Real Sky-POV Lagoon & Paris Beach Club Photograph
                    </div>
                    <div className="font-serif text-xl font-semibold text-slate-900">
                      Select any of our 6 Towers surrounding the white-sand cove:
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resortState.towers.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSelectTowerAndNavigate(t.id, false)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedTower.id === t.id
                            ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                            : 'bg-sky-50 text-slate-800 border border-sky-200 hover:bg-sky-100'
                        }`}
                      >
                        {t.id} • {t.resortWingName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 2: CHOOSE A UNIT OF YOUR OWN CHOICE — INTERACTIVE FLOOR (1–62) & 12-UNIT FLOOR PLATE PICKER */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Interactive Floor Slider, 12-Unit Floor Plate & Real Suite Photo Walkthrough */}
            <div className="lg:col-span-7 space-y-6">
              {/* Interactive Floor & Unit Picker Card */}
              <div className="bg-white/95 backdrop-blur-3xl border-2 border-sky-200/90 shadow-lg rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-100 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      Step 2 • Choose Any Unit of Your Own Choice
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 mt-2">
                      {selectedTower.shortName}
                    </h2>
                  </div>
                  <div className="text-right bg-sky-50 px-4 py-2.5 rounded-2xl border border-sky-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                      Your Chosen Unit
                    </div>
                    <div className="font-serif text-2xl font-semibold text-sky-900">
                      {selectedUnitNumber}
                    </div>
                  </div>
                </div>

                {/* Floor Tier Selector Pills (Floors 1-20, 21-45, 46-62) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FLOOR_TIERS.map((tier) => {
                    const active = tier.id === selectedFloorTier.id;
                    const rateForTier = calculateSuiteNightlyRate(
                      selectedTower.id,
                      tier.id,
                      bookingPartySize,
                      bookingView
                    );
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => {
                          setSelectedFloorTierId(tier.id);
                          const defaultFl =
                            tier.id === 'tier-lanai' ? 12 : tier.id === 'tier-terrace' ? 28 : 52;
                          setSelectedFloorNumber(defaultFl);
                          setSelectedUnitNumber(tier.sampleUnits[selectedTower.id][0]);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-gradient-to-br from-sky-500 to-emerald-500 text-white border-sky-400 shadow-md'
                            : 'bg-sky-50/60 text-slate-800 border-sky-200 hover:bg-sky-100/70'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{tier.floorRange}</span>
                          <span>{formatCurrency(rateForTier)}/nt</span>
                        </div>
                        <div className="font-serif text-base font-semibold mt-1 truncate">
                          {tier.label.split(':')[1] || tier.label}
                        </div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            active ? 'text-sky-100' : 'text-slate-500'
                          }`}
                        >
                          {tier.sqFt.toLocaleString()} Sq. Ft.
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Floor Slider (Floor 1 to Floor 62) + Quick Floor Buttons */}
                <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-5 rounded-2xl border border-sky-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="floor-range-slider"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700"
                    >
                      Select Floor Level (Floor {selectedFloorNumber} of 62):
                    </label>
                    <div className="flex items-center gap-1.5">
                      {QUICK_FLOOR_PICKS.map((fl) => (
                        <button
                          key={fl}
                          type="button"
                          onClick={() => handleFloorChange(fl)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedFloorNumber === fl
                              ? 'bg-sky-600 text-white'
                              : 'bg-white text-slate-700 border border-sky-200 hover:bg-sky-100'
                          }`}
                        >
                          Fl {fl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    id="floor-range-slider"
                    type="range"
                    min={1}
                    max={62}
                    value={selectedFloorNumber}
                    onChange={(e) => handleFloorChange(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer h-2 bg-sky-200 rounded-lg"
                  />

                  <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Floor 1 (Ocean Lanai)</span>
                    <span>Floor 25 (Panoramic Terrace)</span>
                    <span>Floor 62 (Sky Penthouse Crown)</span>
                  </div>
                </div>

                {/* 12-Unit Interactive Floor Plate Grid for Selected Tower & Floor */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700">
                      Click Any Residence on Floor {selectedFloorNumber} ({selectedTower.id}):
                    </span>
                    <div className="flex items-center gap-3 text-[11px] font-semibold">
                      <span className="inline-flex items-center gap-1 text-emerald-800">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />
                        Available to Book
                      </span>
                      <span className="inline-flex items-center gap-1 text-sky-800">
                        <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block" />
                        Your Selection
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" />
                        Reserved
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {currentFloorUnits.map((unitItem) => {
                      const isPicked = selectedUnitNumber === unitItem.unitNumber;
                      const isOccupied = unitItem.status === 'Reserved';
                      return (
                        <button
                          key={unitItem.unitNumber}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => setSelectedUnitNumber(unitItem.unitNumber)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isOccupied
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                              : isPicked
                              ? 'bg-gradient-to-br from-sky-500 to-emerald-500 text-white border-sky-400 shadow-md scale-[1.02] cursor-pointer'
                              : 'bg-emerald-50/75 hover:bg-emerald-100 text-slate-900 border-emerald-300/80 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{unitItem.unitNumber}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                isOccupied
                                  ? 'bg-slate-200 text-slate-500'
                                  : isPicked
                                  ? 'bg-white/25 text-white'
                                  : 'bg-white text-emerald-800'
                              }`}
                            >
                              {isOccupied ? 'Booked' : 'Open'}
                            </span>
                          </div>
                          <div
                            className={`text-[10px] mt-1 truncate ${
                              isPicked ? 'text-sky-50' : 'text-slate-600'
                            }`}
                          >
                            {unitItem.orientation}
                          </div>
                          <div
                            className={`text-[11px] font-bold mt-0.5 ${
                              isPicked ? 'text-white' : 'text-sky-700'
                            }`}
                          >
                            {unitItem.sqFt.toLocaleString()} SqFt
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Unit Number Input Box + Featured Investor Units */}
                <div className="pt-2 border-t border-sky-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-600 mr-1">
                      Featured VIP Units in {selectedTower.id}:
                    </span>
                    {selectedFloorTier.sampleUnits[selectedTower.id].map((sampleCode) => (
                      <button
                        key={sampleCode}
                        type="button"
                        onClick={() => setSelectedUnitNumber(sampleCode)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedUnitNumber === sampleCode
                            ? 'bg-sky-600 text-white'
                            : 'bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100'
                        }`}
                      >
                        {sampleCode}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleApplyCustomUnit} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customUnitInput}
                      onChange={(e) => setCustomUnitInput(e.target.value)}
                      placeholder={`Or type unit (e.g. #${selectedTower.id}-3508)`}
                      className="px-3 py-2 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500 w-48"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      Set Unit
                    </button>
                  </form>
                </div>
              </div>

              {/* Real Suite Interior Photo Walkthrough Card */}
              <div className="bg-white/95 backdrop-blur-3xl border border-sky-200/90 shadow-md rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                      Real Residence Interior Walkthrough • {selectedUnitNumber}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-slate-900">
                      {selectedFloorTier.label}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    {selectedFloorTier.sqFt.toLocaleString()} Sq. Ft.
                  </span>
                </div>

                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-sky-200">
                  <img
                    src={
                      selectedTower.suiteInteriorImageUrls[
                        activeSuitePhotoIdx % selectedTower.suiteInteriorImageUrls.length
                      ]
                    }
                    alt={`${selectedTower.shortName} suite interior`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {selectedTower.suiteInteriorImageUrls.map((imgUrl, idx) => (
                    <button
                      key={imgUrl}
                      type="button"
                      onClick={() => setActiveSuitePhotoIdx(idx)}
                      className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeSuitePhotoIdx === idx
                          ? 'border-sky-500 scale-105 shadow-sm'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Angle ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Instant Reservation Checkout & Owner Revenue Sync Engine */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-3xl border-2 border-sky-200/90 shadow-[0_18px_50px_rgba(14,116,144,0.09)] rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
                <div className="border-b border-sky-100 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold border border-sky-200">
                      Direct Condo & Suite Reservation
                    </span>
                    <span className="font-serif text-2xl font-semibold text-emerald-700">
                      {formatCurrency(selectedNightlyRate)} / night
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl font-semibold text-slate-900 mt-2">
                    Reserve Unit {selectedUnitNumber}
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {selectedTower.fullLabel} • {selectedFloorTier.floorRange}
                  </p>
                </div>

                <form onSubmit={handleCompleteSuiteReservation} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Primary Guest Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingGuestName}
                        onChange={(e) => setBookingGuestName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        VIP Confirmation Email
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingGuestEmail}
                        onChange={(e) => setBookingGuestEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        value={bookingCheckIn}
                        onChange={(e) => setBookingCheckIn(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-xs font-semibold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        value={bookingCheckOut}
                        onChange={(e) => setBookingCheckOut(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-xs font-semibold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Preferred Exposure
                      </label>
                      <select
                        value={bookingView}
                        onChange={(e) => setBookingView(e.target.value as PreferredView)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-xs font-semibold text-slate-900"
                      >
                        {PREFERRED_VIEWS.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Party Size
                      </label>
                      <select
                        value={bookingPartySize}
                        onChange={(e) => setBookingPartySize(e.target.value as GuestPartySize)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50/60 border border-sky-200 text-xs font-semibold text-slate-900"
                      >
                        {GUEST_PARTY_SIZES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Financial Breakdown Box in Baby Blue & Light Green */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 border border-sky-200 space-y-2.5">
                    <div className="flex justify-between text-xs text-slate-700">
                      <span>
                        Tower & Unit ({selectedTower.id} • {selectedUnitNumber})
                      </span>
                      <span className="font-bold text-sky-900">
                        {stayNights} Nights × {formatCurrency(selectedNightlyRate)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Condo Owner Net Credit (85% Split)</span>
                      <span className="font-bold text-emerald-700">
                        {formatCurrency(estimatedStayFinancials.netOwnerPayout)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Resort Management & Lagoon Fee (15%)</span>
                      <span className="font-semibold">
                        {formatCurrency(estimatedStayFinancials.managementFee)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-sky-200 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Total Reservation Price
                      </span>
                      <span className="font-serif text-2xl font-semibold text-sky-900">
                        {formatCurrency(estimatedStayTotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:brightness-105 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      Confirm Unit {selectedUnitNumber} ({formatCurrency(estimatedStayTotal)})
                    </span>
                  </button>
                </form>

                {/* Live Confirmation Banner when Booked */}
                {lastBookingConfirmation && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                        Booking Confirmed • {lastBookingConfirmation.bookingRef}
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {formatCurrency(lastBookingConfirmation.totalPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900">
                      Unit <strong>{lastBookingConfirmation.unitNumber}</strong> in{' '}
                      <strong>{lastBookingConfirmation.towerName}</strong> is reserved.
                      {lastBookingConfirmation.syncedOwnerId && (
                        <>
                          {' '}
                          Owner Ledger <strong>{lastBookingConfirmation.syncedOwnerId}</strong> has
                          been credited in real time!
                        </>
                      )}
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setActivePortal('guest')}
                        className="px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer"
                      >
                        Open Guest Keycard ({lastBookingConfirmation.bookingRef})
                      </button>
                      {lastBookingConfirmation.syncedOwnerId && (
                        <button
                          type="button"
                          onClick={() => setActivePortal('owner')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Inspect Owner Payout
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ===================================================================== */}
      {/* PORTAL 3: GUEST RESERVATION TRACKER (guest)                           */}
      {/* ===================================================================== */}
      {activePortal === 'guest' && (
        <main className="relative z-10 pt-24 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-white/95 backdrop-blur-3xl border border-sky-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-sky-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  Live Guest Arrival & Digital Keycard Tracker
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-slate-900 mt-1">
                  Reservation {activeReservation.bookingRef} • Unit {activeReservation.unitNumber}
                </h1>
              </div>

              <form onSubmit={handleLookupBooking} className="flex items-center gap-2">
                <input
                  type="text"
                  value={guestSearchQuery}
                  onChange={(e) => setGuestSearchQuery(e.target.value)}
                  placeholder="Search AZR-7420 or #T1-804..."
                  className="px-4 py-2.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-semibold text-slate-900 w-64"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs font-bold cursor-pointer"
                >
                  Find Booking
                </button>
              </form>
            </div>

            {/* Quick Switch Pills for All Active 6-Tower Reservations */}
            <div className="flex flex-wrap items-center gap-2">
              {resortState.reservations.map((res) => (
                <button
                  key={res.bookingRef}
                  type="button"
                  onClick={() => setActiveBookingRef(res.bookingRef)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    res.bookingRef === activeReservation.bookingRef
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                      : 'bg-sky-50 text-slate-700 border border-sky-200 hover:bg-sky-100'
                  }`}
                >
                  {res.bookingRef} • {res.unitNumber} ({res.guestName.split(' ')[0]})
                </button>
              ))}
            </div>

            {/* 4-Stage Digital Check-In Progression */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {CHECK_IN_STAGES.map((stage, idx) => {
                const currentIdx = CHECK_IN_STAGES.indexOf(activeReservation.status);
                const isDone = idx <= currentIdx;
                return (
                  <div
                    key={stage}
                    className={`p-4 rounded-2xl border ${
                      isDone
                        ? 'bg-gradient-to-br from-sky-50 to-emerald-50 border-emerald-300 text-slate-900'
                        : 'bg-white border-sky-100 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Stage 0{idx + 1}</span>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <div className="font-serif text-lg font-semibold mt-1">{stage}</div>
                  </div>
                );
              })}
            </div>

            {/* Reservation Details + Real Suite Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative h-72 rounded-3xl overflow-hidden border-2 border-sky-200">
                <img
                  src={activeReservation.suitePhotoUrl}
                  alt={activeReservation.unitNumber}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200">
                    <div className="text-[10px] font-bold uppercase text-sky-700">Guest</div>
                    <div className="font-serif text-xl font-semibold text-slate-900 mt-0.5">
                      {activeReservation.guestName}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                    <div className="text-[10px] font-bold uppercase text-emerald-700">
                      Tower & Unit
                    </div>
                    <div className="font-serif text-xl font-semibold text-slate-900 mt-0.5">
                      {activeReservation.towerId} • {activeReservation.unitNumber}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200">
                    <div className="text-[10px] font-bold uppercase text-sky-700">Total Paid</div>
                    <div className="font-serif text-xl font-semibold text-emerald-700 mt-0.5">
                      {formatCurrency(activeReservation.totalPrice)} ({activeReservation.nights} nts)
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-sky-200">
                  <div className="text-xs text-slate-700">
                    <strong>Check-In:</strong> {activeReservation.checkIn} •{' '}
                    <strong>Check-Out:</strong> {activeReservation.checkOut} •{' '}
                    <strong>View:</strong> {activeReservation.preferredView}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setResortState((prev) =>
                        advanceBookingStatus(prev, activeReservation.bookingRef)
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs font-bold cursor-pointer"
                  >
                    Advance Check-In Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ===================================================================== */}
      {/* PORTAL 4: UNIT OWNER ID PORTAL (owner)                                */}
      {/* ===================================================================== */}
      {activePortal === 'owner' && (
        <main className="relative z-10 pt-24 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-white/95 backdrop-blur-3xl border border-sky-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-sky-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  Private Condo Owner Revenue OS • 6 Towers (T1–T6)
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-slate-900 mt-1">
                  {activeOwner.ownerId} — {activeOwner.ownerName}
                </h1>
                <p className="text-xs text-sky-800 font-semibold mt-1">
                  {activeOwner.towerName} • Deeded Residence {activeOwner.unitNumber} (Floor{' '}
                  {activeOwner.floorNumber} • {activeOwner.suiteTierLabel})
                </p>
              </div>

              <form onSubmit={handleLookupOwner} className="flex items-center gap-2">
                <input
                  type="text"
                  value={ownerSearchInput}
                  onChange={(e) => setOwnerSearchInput(e.target.value)}
                  placeholder="Enter Owner ID (#OWN-T1-804)..."
                  className="px-4 py-2.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-semibold text-slate-900 w-64"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs font-bold cursor-pointer"
                >
                  Load Owner Ledger
                </button>
              </form>
            </div>

            {/* 6-Tower Owner Quick Switcher */}
            <div className="flex flex-wrap gap-2">
              {resortState.owners.map((o) => (
                <button
                  key={o.ownerId}
                  type="button"
                  onClick={() => setActiveOwnerId(o.ownerId)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    o.ownerId === activeOwner.ownerId
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sm'
                      : 'bg-sky-50 text-slate-700 border border-sky-200 hover:bg-sky-100'
                  }`}
                >
                  {o.ownerId} ({o.towerId})
                </button>
              ))}
            </div>

            {/* Owner Financial Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-sky-50/90 border border-sky-200">
                <div className="text-[11px] font-bold uppercase text-sky-700">
                  Monthly Gross Revenue
                </div>
                <div className="font-serif text-3xl font-semibold text-slate-900 mt-1">
                  {formatCurrency(activeOwnerFinancials.grossRevenue)}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-sky-200">
                <div className="text-[11px] font-bold uppercase text-slate-500">
                  Resort Management Fee (15%)
                </div>
                <div className="font-serif text-3xl font-semibold text-slate-700 mt-1">
                  -{formatCurrency(activeOwnerFinancials.managementFee)}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-300">
                <div className="text-[11px] font-bold uppercase text-emerald-800">
                  Net Owner Payout (85%)
                </div>
                <div className="font-serif text-3xl font-semibold text-emerald-800 mt-1">
                  {formatCurrency(activeOwnerFinancials.netOwnerPayout)}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-sky-50/90 border border-sky-200">
                <div className="text-[11px] font-bold uppercase text-sky-700">
                  Annual Occupancy Rate
                </div>
                <div className="font-serif text-3xl font-semibold text-sky-900 mt-1">
                  {activeOwner.annualOccupancyRate}%
                </div>
              </div>
            </div>

            {/* Payout Settings & Stay Ledger Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-200 space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-slate-900">
                  Disbursement Preferences
                </h3>
                <div className="flex gap-2">
                  {(['wire', 'escrow', 'reinvest'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPayoutAccountMode(mode)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize cursor-pointer ${
                        payoutAccountMode === mode
                          ? 'bg-sky-600 text-white'
                          : 'bg-white text-slate-700 border border-sky-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Maintenance Reserve Holdback: {ownerMaintenanceReservePct}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={ownerMaintenanceReservePct}
                    onChange={(e) => setOwnerMaintenanceReservePct(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-sky-200 text-[11px] uppercase tracking-wider text-sky-800">
                      <th className="py-3 px-3">Booking Ref</th>
                      <th className="py-3 px-3">Guest</th>
                      <th className="py-3 px-3">Dates</th>
                      <th className="py-3 px-3">Gross</th>
                      <th className="py-3 px-3">Net Payout (85%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100 text-xs">
                    {activeOwner.stays.map((stay) => (
                      <tr key={stay.bookingRef} className="hover:bg-sky-50/60">
                        <td className="py-3 px-3 font-bold text-sky-800">{stay.bookingRef}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900">{stay.guestName}</td>
                        <td className="py-3 px-3 text-slate-600">
                          {stay.checkIn} → {stay.checkOut} ({stay.nights}n)
                        </td>
                        <td className="py-3 px-3 font-semibold">
                          {formatCurrency(stay.grossAmount)}
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-700">
                          {formatCurrency(stay.netPayout)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ===================================================================== */}
      {/* PORTAL 5: RESORT CONCIERGE DESK (concierge)                           */}
      {/* ===================================================================== */}
      {activePortal === 'concierge' && (
        <main className="relative z-10 pt-24 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white/95 backdrop-blur-3xl border border-sky-200 rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                VIP Bespoke Provisioning • 6 Towers
              </span>
              <h1 className="font-serif text-3xl font-semibold text-slate-900">
                Dispatch Resort Concierge
              </h1>
              <form onSubmit={handleCreateConciergeTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service Category
                  </label>
                  <select
                    value={conciergeCategory}
                    onChange={(e) =>
                      setConciergeCategory(e.target.value as ConciergeMessage['category'])
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-semibold"
                  >
                    <option value="VIP Butler & Yacht Charter">VIP Butler & Yacht Charter</option>
                    <option value="Suite Reservation Inquiry">Suite Reservation Inquiry</option>
                    <option value="Condo Ownership Deed Inquiry">
                      Condo Ownership Deed Inquiry
                    </option>
                    <option value="Owner Payout & Ledger">Owner Payout & Ledger</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Unit Number
                    </label>
                    <input
                      type="text"
                      value={conciergeUnit}
                      onChange={(e) => setConciergeUnit(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      value={conciergeGuestName}
                      onChange={(e) => setConciergeGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={conciergeSubject}
                    onChange={(e) => setConciergeSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={conciergeNotes}
                    onChange={(e) => setConciergeNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Dispatch Concierge Request
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white/95 backdrop-blur-3xl border border-sky-200 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-slate-900">
                Active 6-Tower Concierge Dispatch Queue
              </h2>
              <div className="space-y-3">
                {resortState.messages.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-sky-50/80 to-emerald-50/80 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold">
                          {ticket.category}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {ticket.referenceId} • {ticket.senderName}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-sky-900">{ticket.subject}</div>
                      <p className="text-xs text-slate-600">{ticket.body}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 shrink-0">
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ===================================================================== */}
      {/* PORTAL 6: 6,000-UNIT MASTER ADMIN ERP (admin)                         */}
      {/* ===================================================================== */}
      {activePortal === 'admin' && (
        <main className="relative z-10 pt-24 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-white/95 backdrop-blur-3xl border border-sky-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-sky-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  Master Resort Inventory & Deeded Ownership ERP
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-slate-900 mt-1">
                  6,000-Unit Master Tower Registry
                </h1>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['ALL', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6'] as const).map((tid) => (
                  <button
                    key={tid}
                    type="button"
                    onClick={() => setAdminTowerFilter(tid)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      adminTowerFilter === tid
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white'
                        : 'bg-sky-50 text-slate-700 border border-sky-200'
                    }`}
                  >
                    {tid === 'ALL' ? 'All 6 Towers (6,000)' : tid}
                  </button>
                ))}
                {(['ALL', 'Privately Owned', 'Available Inventory'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setAdminOwnershipFilter(st)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      adminOwnershipFilter === st
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredRegistryUnits.map((u) => {
                const isOwned = u.ownershipStatus === 'Privately Owned';
                return (
                  <div
                    key={u.displayUnitNumber}
                    className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                      isOwned
                        ? 'bg-sky-50/80 border-sky-200'
                        : 'bg-emerald-50/80 border-emerald-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>{u.displayUnitNumber}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            isOwned
                              ? 'bg-sky-200 text-sky-900'
                              : 'bg-emerald-200 text-emerald-900'
                          }`}
                        >
                          {isOwned ? 'Owned' : 'Open'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 truncate">
                        {u.ownerName || 'Resort Direct Pool'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleAdminOwnershipUpdate(
                          u.towerId,
                          u.displayUnitNumber,
                          adminNewOwnerName,
                          `#OWN-${u.displayUnitNumber.replace('#', '')}`
                        )
                      }
                      className="mt-3 w-full py-1.5 rounded-lg bg-white hover:bg-sky-100 text-sky-900 border border-sky-200 text-[11px] font-bold cursor-pointer"
                    >
                      Toggle Title
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
