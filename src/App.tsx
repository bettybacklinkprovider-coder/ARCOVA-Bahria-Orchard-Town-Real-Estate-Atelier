/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Compass,
  Navigation,
  Bookmark,
  Share2,
  Smartphone,
  Star,
  ThumbsUp,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
  Search,
  ExternalLink,
  SlidersHorizontal,
  Camera,
  Eye,
  X,
} from 'lucide-react';
import {
  BUSINESS_PROFILE,
  INITIAL_REVIEWS,
  REVIEW_TOPICS,
  PHOTO_SPECIMENS,
  PROPERTY_PLOTS,
  PEOPLE_ALSO_SEARCH_FOR,
  WEB_RESULTS,
  ReviewItem,
  PhotoSpecimen,
  PropertyPlot,
  CompetitorAgency,
} from './data/bahriaData';
import { ArchitecturalPlate, BlueprintPlotViewport } from './components/ArchitecturalVisuals';
import { InteractiveBahriaMap } from './components/InteractiveBahriaMap';
import { ActionModals, ActiveModalType } from './components/ActionModals';

export default function App() {
  // Navigation & Profile Tab State
  const [profileTab, setProfileTab] = useState<'Overview' | 'Reviews' | 'About'>('Overview');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showAllHours, setShowAllHours] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Modals & User Customizations
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [customLabel, setCustomLabel] = useState<string>('');
  const [customWebsite, setCustomWebsite] = useState<string>('');
  const [historyLog, setHistoryLog] = useState<{ action: string; timestamp: string }[]>([
    { action: 'Viewed Tower 3, Office # 17 Raiwind Rd Profile', timestamp: 'Today, 5:06 AM' },
    { action: 'Inspected 5 Marla Pair Plots — Eastern District Block C', timestamp: '2 days ago' },
    { action: 'Checked route from Lahore Ring Road Adda Plot Interchange', timestamp: 'Last week' },
  ]);

  // Map & Nearby Filter State
  const [selectedPlot, setSelectedPlot] = useState<PropertyPlot>(PROPERTY_PLOTS[0]);
  const [nearbyFilter, setNearbyFilter] = useState<'all' | 'plots' | 'agencies' | 'landmarks'>('all');

  // Photos & Videos State
  const [photos, setPhotos] = useState<PhotoSpecimen[]>(PHOTO_SPECIMENS);
  const [photoFilter, setPhotoFilter] = useState<'All' | 'Inside' | 'Interior design' | 'By owner'>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoSpecimen | null>(null);

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [showMoreTopics, setShowMoreTopics] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'highest'>('relevant');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [reviewSearch, setReviewSearch] = useState<string>('');

  // People Also Search For & Web Results State
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorAgency | null>(null);
  const [expandedWebResultId, setExpandedWebResultId] = useState<string | null>(WEB_RESULTS[0].id);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const logHistory = (action: string) => {
    setHistoryLog((prev) => [{ action, timestamp: 'Just now' }, ...prev]);
  };

  // Filtered Photos
  const filteredPhotos = useMemo(() => {
    if (photoFilter === 'All') return photos;
    return photos.filter((p) => p.category === photoFilter);
  }, [photos, photoFilter]);

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    let list = [...reviews];
    if (selectedTopic !== 'All') {
      list = list.filter((r) => r.topics.includes(selectedTopic));
    }
    if (reviewSearch.trim()) {
      const q = reviewSearch.toLowerCase();
      list = list.filter(
        (r) =>
          r.author.toLowerCase().includes(q) ||
          r.text.toLowerCase().includes(q) ||
          (r.ownerResponse && r.ownerResponse.text.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'newest') {
      list = [...list].reverse();
    } else if (sortBy === 'highest') {
      list = [...list].sort((a, b) => b.likes - a.likes);
    }
    return list;
  }, [reviews, selectedTopic, reviewSearch, sortBy]);

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);
  const totalReviewCount = BUSINESS_PROFILE.reviewCount + (reviews.length - INITIAL_REVIEWS.length);

  const handleToggleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const nextLiked = !r.likedByMe;
        return {
          ...r,
          likedByMe: nextLiked,
          likes: nextLiked ? r.likes + 1 : Math.max(0, r.likes - 1),
        };
      })
    );
  };

  const handleShareReview = (review: ReviewItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Review by ${review.author} (5.0 ★) for ${BUSINESS_PROFILE.name}: "${review.text}"`
      );
    }
    showToast(`Copied link to ${review.author}'s review`);
  };

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${BUSINESS_PROFILE.name} — ${BUSINESS_PROFILE.address} (${BUSINESS_PROFILE.plusCode}) · Tel: ${BUSINESS_PROFILE.phone}`
      );
    }
    logHistory('Shared Tower 3, Office # 17 Profile Dossier');
    showToast('Copied business profile address, Plus Code & phone to clipboard');
  };

  const visibleTopics = showMoreTopics ? REVIEW_TOPICS : REVIEW_TOPICS.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0E1116] text-[#F4EFE8] flex flex-col">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#0E1116]/95 backdrop-blur-md border-b border-[#F4EFE8]/10 px-6 lg:px-20 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#overview"
          className="font-serif-editorial text-xl tracking-tight text-[#F4EFE8] whitespace-nowrap shrink-0"
        >
          ARCOVA BAHRIA
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.16em] text-[#F4EFE8]/70">
          <a
            href="#overview"
            onClick={() => setProfileTab('Overview')}
            className="hover:text-[#D2AE78] transition-colors whitespace-nowrap shrink-0"
          >
            Overview
          </a>
          <a
            href="#photos"
            className="hover:text-[#D2AE78] transition-colors whitespace-nowrap shrink-0"
          >
            Photos
          </a>
          <a
            href="#specimens"
            className="hover:text-[#D2AE78] transition-colors whitespace-nowrap shrink-0"
          >
            Specimens
          </a>
          <a
            href="#reviews"
            onClick={() => setProfileTab('Reviews')}
            className="hover:text-[#D2AE78] transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
          <a
            href="#directory"
            className="hover:text-[#D2AE78] transition-colors whitespace-nowrap shrink-0"
          >
            Directory
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveModal('consultation')}
            className="px-5 py-2.5 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0"
          >
            Schedule Consultation
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#171B23] border border-[#D2AE78] text-xs text-[#F4EFE8] shadow-2xl flex items-center gap-2.5">
          <Check className="w-4 h-4 text-[#D2AE78] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: HERO & GOOGLE MAPS BUSINESS PROFILE WORKSPACE (DARK BASALT VOID #0E1116) */}
      <section id="overview" className="w-full max-w-[1440px] mx-auto px-6 lg:px-20 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (5 cols): Complete Business Profile & Dossier Card */}
          <div className="lg:col-span-5 bg-[#12151B] border border-[#F4EFE8]/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Quiet Architectural Kicker (Unboxed text with · separators) */}
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#D2AE78]">
                <span>Bahria Orchard</span>
                <span aria-hidden="true">·</span>
                <span>Eastern District</span>
                <span aria-hidden="true">·</span>
                <span>Lahore 54000</span>
              </div>

              {/* Primary Business Title */}
              <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#F4EFE8] leading-tight text-balance">
                {BUSINESS_PROFILE.name}
              </h1>

              {/* Rating & Category Line (Unboxed metadata with · separators) */}
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-[#F4EFE8]/85">
                <span className="font-mono-tabular font-semibold text-[#F4EFE8]">
                  {BUSINESS_PROFILE.rating.toFixed(1)}
                </span>
                <div className="flex items-center gap-0.5 text-[#D2AE78]" aria-label="5.0 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#D2AE78] text-[#D2AE78]" />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProfileTab('Reviews');
                    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-mono-tabular text-[#F4EFE8]/70 hover:text-[#D2AE78] underline underline-offset-4 transition-colors"
                >
                  ({totalReviewCount})
                </button>
                <span aria-hidden="true" className="text-[#F4EFE8]/40">·</span>
                <span className="text-[#F4EFE8]/75">{BUSINESS_PROFILE.category}</span>
              </div>

              {/* Interactive Tabs: Overview | Reviews | About */}
              <div className="flex items-center border-b border-[#F4EFE8]/10 pt-1">
                {(['Overview', 'Reviews', 'About'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setProfileTab(tab);
                      if (tab === 'Reviews') {
                        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                      profileTab === tab
                        ? 'border-[#B8925A] text-[#D2AE78]'
                        : 'border-transparent text-[#F4EFE8]/60 hover:text-[#F4EFE8]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Action Bar: Directions | Save | Nearby | Send to phone | Share */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    logHistory('Opened Route & Directions to Tower 3, Office # 17');
                    setActiveModal('directions');
                  }}
                  className="p-2.5 rounded-xl bg-[#171B23] hover:bg-[#B8925A] text-[#F4EFE8] hover:text-[#0E1116] border border-[#B8925A]/35 transition-colors flex flex-col items-center justify-center gap-1.5 group"
                >
                  <Navigation className="w-4 h-4 text-[#D2AE78] group-hover:text-[#0E1116]" />
                  <span className="text-[11px] font-medium whitespace-nowrap">Directions</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const next = !isSaved;
                    setIsSaved(next);
                    logHistory(next ? 'Saved Place to Investment Shortlist' : 'Removed Place from Saved');
                    showToast(
                      next
                        ? 'Saved Real Estate In Bahria Town / Orchard Lahore to shortlist'
                        : 'Removed from saved places'
                    );
                  }}
                  className={`p-2.5 rounded-xl border transition-colors flex flex-col items-center justify-center gap-1.5 ${
                    isSaved
                      ? 'bg-[#B8925A] text-[#0E1116] border-[#D2AE78]'
                      : 'bg-[#171B23] hover:border-[#B8925A]/60 text-[#F4EFE8] border-[#F4EFE8]/10'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#0E1116] text-[#0E1116]' : 'text-[#D2AE78]'}`} />
                  <span className="text-[11px] font-medium whitespace-nowrap">{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNearbyFilter((prev) => (prev === 'agencies' ? 'all' : 'agencies'));
                    showToast('Highlighting nearby agencies & landmarks around Tower 3, Raiwind Rd');
                  }}
                  className={`p-2.5 rounded-xl border transition-colors flex flex-col items-center justify-center gap-1.5 ${
                    nearbyFilter === 'agencies'
                      ? 'bg-[#B8925A] text-[#0E1116] border-[#D2AE78]'
                      : 'bg-[#171B23] hover:border-[#B8925A]/60 text-[#F4EFE8] border-[#F4EFE8]/10'
                  }`}
                >
                  <Compass className={`w-4 h-4 ${nearbyFilter === 'agencies' ? 'text-[#0E1116]' : 'text-[#D2AE78]'}`} />
                  <span className="text-[11px] font-medium whitespace-nowrap">Nearby</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    logHistory('Opened Send to Phone Dossier');
                    setActiveModal('send-to-phone');
                  }}
                  className="p-2.5 rounded-xl bg-[#171B23] hover:border-[#B8925A]/60 text-[#F4EFE8] border border-[#F4EFE8]/10 transition-colors flex flex-col items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4 text-[#D2AE78]" />
                  <span className="text-[11px] font-medium whitespace-nowrap truncate max-w-full">Send to phone</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareProfile}
                  className="p-2.5 rounded-xl bg-[#171B23] hover:border-[#B8925A]/60 text-[#F4EFE8] border border-[#F4EFE8]/10 transition-colors flex flex-col items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4 text-[#D2AE78]" />
                  <span className="text-[11px] font-medium whitespace-nowrap">Share</span>
                </button>
              </div>

              {/* Conditional About View or Overview Metadata Rows */}
              {profileTab === 'About' ? (
                <div className="space-y-4 pt-2 border-t border-[#F4EFE8]/10">
                  <h2 className="font-serif-editorial text-xl text-[#F4EFE8]">
                    Architectural & Property Mandate Overview
                  </h2>
                  <p className="text-sm text-[#F4EFE8]/75 leading-relaxed">
                    Operating from <strong>Tower 3, Office # 17</strong> on Raiwind Road in the Eastern District of Bahria Orchard Lahore, our practice led by <strong>Mr. Shahbaz</strong> advises private homebuyers, builders, and overseas investors on verified residential plots, 5 Marla contiguous pair plots, and commercial assets across Bahria Orchard (Phases 1–4) and Bahria Town Lahore.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="text-xs uppercase tracking-[0.16em] text-[#D2AE78]">
                      Verified Service Capabilities
                    </div>
                    <ul className="space-y-2 text-xs text-[#F4EFE8]/80">
                      {BUSINESS_PROFILE.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D2AE78] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-[#F4EFE8]/10 border-t border-b border-[#F4EFE8]/10">
                  {/* Address Row */}
                  <div className="py-3.5 flex items-start gap-3.5">
                    <MapPin className="w-4 h-4 text-[#D2AE78] shrink-0 mt-1" />
                    <div className="text-sm text-[#F4EFE8]/90 leading-relaxed">
                      {BUSINESS_PROFILE.address}
                    </div>
                  </div>

                  {/* Hours Row */}
                  <div className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setShowAllHours((prev) => !prev)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3.5 text-sm">
                        <Clock className="w-4 h-4 text-[#D2AE78] shrink-0" />
                        <div>
                          <span className="font-medium text-[#D2AE78]">{BUSINESS_PROFILE.hoursStatus}</span>
                          <span className="mx-1.5 text-[#F4EFE8]/40">·</span>
                          <span className="text-[#F4EFE8]/85">{BUSINESS_PROFILE.closesAt}</span>
                        </div>
                      </div>
                      {showAllHours ? (
                        <ChevronUp className="w-4 h-4 text-[#F4EFE8]/50 group-hover:text-[#F4EFE8]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#F4EFE8]/50 group-hover:text-[#F4EFE8]" />
                      )}
                    </button>
                    {showAllHours && (
                      <div className="mt-3 pl-7 space-y-1.5 text-xs text-[#F4EFE8]/70 font-mono-tabular">
                        {BUSINESS_PROFILE.weeklyHours.map((wh) => (
                          <div key={wh.day} className="flex justify-between">
                            <span>{wh.day}</span>
                            <span>{wh.hours}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Phone Row */}
                  <div className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 text-sm">
                      <Phone className="w-4 h-4 text-[#D2AE78] shrink-0" />
                      <span className="font-mono-tabular text-[#F4EFE8]">{BUSINESS_PROFILE.phone}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(BUSINESS_PROFILE.phone);
                        }
                        showToast(`Copied phone number ${BUSINESS_PROFILE.phone}`);
                      }}
                      className="text-xs text-[#D2AE78] hover:underline whitespace-nowrap"
                    >
                      Copy number
                    </button>
                  </div>

                  {/* Plus Code Row */}
                  <div className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 text-sm">
                      <Compass className="w-4 h-4 text-[#D2AE78] shrink-0" />
                      <span className="font-mono-tabular text-[#F4EFE8]/90">{BUSINESS_PROFILE.plusCode}</span>
                    </div>
                    <span className="text-[11px] font-mono-tabular text-[#F4EFE8]/45">Plus Code</span>
                  </div>

                  {/* Your Maps history Row */}
                  <div className="py-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModal('maps-history')}
                      className="text-xs text-[#F4EFE8]/75 hover:text-[#D2AE78] transition-colors flex items-center gap-2"
                    >
                      <span>Your Maps history</span>
                      <span className="text-[#F4EFE8]/40">·</span>
                      <span className="font-mono-tabular text-[#D2AE78]">{historyLog.length} entries</span>
                    </button>
                  </div>

                  {/* Add a label Row */}
                  <div className="py-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveModal('add-label')}
                      className="text-xs text-[#F4EFE8]/75 hover:text-[#D2AE78] transition-colors"
                    >
                      {customLabel ? `Label: ${customLabel}` : 'Add a label'}
                    </button>
                    {customLabel && (
                      <button
                        type="button"
                        onClick={() => setActiveModal('add-label')}
                        className="text-[11px] text-[#D2AE78] hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Profile Utilities: Suggest an edit | Add missing information | Add website */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#F4EFE8]/65">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('suggest-edit')}
                  className="hover:text-[#D2AE78] underline underline-offset-4 transition-colors whitespace-nowrap"
                >
                  Suggest an edit
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => setActiveModal('suggest-edit')}
                  className="hover:text-[#D2AE78] underline underline-offset-4 transition-colors whitespace-nowrap"
                >
                  Add missing information
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('add-website')}
                className="text-[#D2AE78] hover:underline underline-offset-4 transition-colors whitespace-nowrap font-mono-tabular"
              >
                {customWebsite ? customWebsite.replace(/^https?:\/\//, '') : 'Add website'}
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Cartography & Plot Location Explorer */}
          <div className="lg:col-span-7 flex flex-col">
            <InteractiveBahriaMap
              selectedPlot={selectedPlot}
              onSelectPlot={(plot) => {
                setSelectedPlot(plot);
                logHistory(`Selected Plot ${plot.code}: ${plot.title}`);
              }}
              onOpenDirections={() => setActiveModal('directions')}
              nearbyFilter={nearbyFilter}
              onChangeNearbyFilter={setNearbyFilter}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: PHOTOS & VIDEOS MONOGRAPH GALLERY (DARK BASALT #12151B) */}
      <section id="photos" className="w-full bg-[#12151B] border-t border-b border-[#F4EFE8]/10 py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 space-y-8">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.18em] text-[#D2AE78]">
                Visual Monograph · Tower 3, Office # 17
              </div>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#F4EFE8]">
                Photos & videos
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Interactive Category Filter Buttons: All | Inside | Interior design | By owner */}
              <div className="flex items-center gap-1 p-1 bg-[#0E1116] border border-[#F4EFE8]/10 rounded-lg">
                {(['All', 'Inside', 'Interior design', 'By owner'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPhotoFilter(cat)}
                    className={`px-3.5 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      photoFilter === cat
                        ? 'bg-[#B8925A] text-[#0E1116] font-semibold'
                        : 'text-[#F4EFE8]/70 hover:text-[#F4EFE8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('add-photo')}
                className="px-4 py-2.5 rounded-lg border border-[#B8925A]/50 hover:border-[#D2AE78] text-xs font-semibold uppercase tracking-[0.14em] text-[#F4EFE8] hover:bg-[#B8925A]/10 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Camera className="w-3.5 h-3.5 text-[#D2AE78]" />
                <span>Add photos & videos</span>
              </button>
            </div>
          </div>

          {/* Monograph Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((specimen) => (
              <div
                key={specimen.id}
                onClick={() => setLightboxPhoto(specimen)}
                className="group cursor-pointer rounded-2xl bg-[#0E1116] border border-[#F4EFE8]/10 hover:border-[#B8925A]/50 overflow-hidden flex flex-col justify-between transition-colors"
              >
                <div className="relative h-60 overflow-hidden bg-[#0B0E13]">
                  <div className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                    <ArchitecturalPlate sceneType={specimen.sceneType} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F4EFE8]/85">
                    <span>{specimen.category}</span>
                    <span className="flex items-center gap-1 text-[#D2AE78] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Plate</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif-editorial text-lg text-[#F4EFE8] group-hover:text-[#D2AE78] transition-colors">
                    {specimen.title}
                  </h3>
                  <p className="text-xs text-[#F4EFE8]/65">{specimen.subtitle}</p>
                  {/* Unboxed Bronze Metadata Index Footer */}
                  <div className="pt-2 border-t border-[#F4EFE8]/10 flex flex-wrap items-center gap-2 text-[11px] font-mono-tabular uppercase tracking-wider text-[#B8925A]">
                    <span>{specimen.date}</span>
                    <span aria-hidden="true">/</span>
                    <span>{specimen.dimensions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ALTERNATING GALLERY CREAM LIMESTONE SECTION (#F4EFE8) — BAHRIA ORCHARD & TOWN SPECIMENS */}
      <section id="specimens" className="w-full bg-[#F4EFE8] text-[#0E1116] py-16 lg:py-24 border-b border-[#0E1116]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.18em] text-[#785926] font-semibold">
                01. Curated Mandate Portfolio · Eastern District & Bahria Town
              </div>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#0E1116] leading-tight text-balance">
                Verified Plot & Commercial Specimens
              </h2>
            </div>
            <p className="text-sm text-[#0E1116]/75 max-w-md leading-relaxed">
              Every plot and built property listed through Office # 17 undergoes physical boundary verification and No Demand Certificate (NDC) clearance prior to client presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Interactive Specimen Selector List */}
            <div className="lg:col-span-5 space-y-3">
              {PROPERTY_PLOTS.map((plot, idx) => {
                const active = selectedPlot.id === plot.id;
                return (
                  <button
                    key={plot.id}
                    type="button"
                    onClick={() => setSelectedPlot(plot)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      active
                        ? 'bg-[#0E1116] text-[#F4EFE8] border-[#0E1116] shadow-xl'
                        : 'bg-white/80 hover:bg-white text-[#0E1116] border-[#0E1116]/12'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular mb-1.5">
                      <span className={active ? 'text-[#D2AE78]' : 'text-[#785926]'}>
                        0{idx + 1}. {plot.code} · {plot.category}
                      </span>
                      <span className="font-semibold">{plot.pricePkr}</span>
                    </div>
                    <h3 className="font-serif-editorial text-xl leading-snug">{plot.title}</h3>
                    <div
                      className={`mt-2 flex flex-wrap items-center gap-2 text-xs ${
                        active ? 'text-[#F4EFE8]/70' : 'text-[#0E1116]/65'
                      }`}
                    >
                      <span>{plot.district}</span>
                      <span aria-hidden="true">·</span>
                      <span>{plot.size}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right 7 Cols: Selected Specimen CAD Blueprint & Technical Data Matrix */}
            <div className="lg:col-span-7 bg-white border border-[#0E1116]/12 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0E1116]/10 pb-5">
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#785926]">
                    {selectedPlot.district} · {selectedPlot.possession}
                  </div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#0E1116] mt-1">
                    {selectedPlot.title}
                  </h3>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <div className="text-xs uppercase tracking-widest text-[#0E1116]/55">Mandate Valuation</div>
                  <div className="text-xl font-mono-tabular font-semibold text-[#0E1116]">
                    {selectedPlot.pricePkr}
                  </div>
                </div>
              </div>

              {/* Architectural Exception: Floorplan viewport maintains crisp 0px corners */}
              <BlueprintPlotViewport plot={selectedPlot} />

              <p className="text-sm text-[#0E1116]/80 leading-relaxed">{selectedPlot.description}</p>

              {/* Blueprint & Plan Data List separated by 1px lines */}
              <div className="divide-y divide-[#0E1116]/10 border-t border-b border-[#0E1116]/10">
                {selectedPlot.blueprintSpecs.map((spec) => (
                  <div key={spec.label} className="py-3 flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-[#0E1116]/60 tracking-wider">{spec.label}</span>
                    <span className="font-semibold text-[#0E1116]">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-[#0E1116]/70">
                  Lead Advisor: <strong>{selectedPlot.advisor}</strong> · Office # 17, Tower 3 ({BUSINESS_PROFILE.phone})
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal('consultation')}
                  className="px-6 py-3 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-[0.15em] transition-colors whitespace-nowrap"
                >
                  Request Site Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REVIEW SUMMARY & VERIFIED CLIENT REVIEWS (DARK OBSIDIAN #0E1116) */}
      <section id="reviews" className="w-full max-w-[1440px] mx-auto px-6 lg:px-20 py-16 lg:py-24 space-y-12">
        {/* Top Row: Review Summary Card + Write a Review CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#12151B] border border-[#F4EFE8]/10 rounded-2xl p-6 sm:p-10">
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs uppercase tracking-[0.18em] text-[#D2AE78]">
              Verified Client Feedback
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#F4EFE8]">
              Review summary
            </h2>
            <p className="text-xs text-[#F4EFE8]/65 leading-relaxed">
              Based on {totalReviewCount} verified property sales, plot acquisitions, and consultations at Tower 3, Office # 17, Bahria Orchard Lahore.
            </p>
          </div>

          {/* 5-4-3-2-1 Rating Bars */}
          <div className="lg:col-span-5 space-y-2.5">
            {[
              { star: 5, pct: 100 },
              { star: 4, pct: 0 },
              { star: 3, pct: 0 },
              { star: 2, pct: 0 },
              { star: 1, pct: 0 },
            ].map((row) => (
              <div key={row.star} className="flex items-center gap-3 text-xs font-mono-tabular">
                <span className="w-3 text-[#F4EFE8]/80">{row.star}</span>
                <div className="flex-1 h-2 bg-[#0E1116] rounded-full overflow-hidden border border-[#F4EFE8]/10">
                  <div
                    className="h-full bg-[#B8925A] rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 5.0 Score & Write a review button */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l border-[#F4EFE8]/10 pt-4 lg:pt-0 lg:pl-8">
            <div className="text-left lg:text-right">
              <div className="font-serif-editorial text-5xl text-[#F4EFE8] font-mono-tabular">
                {BUSINESS_PROFILE.rating.toFixed(1)}
              </div>
              <div className="flex items-center lg:justify-end gap-1 text-[#D2AE78] my-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#D2AE78] text-[#D2AE78]" />
                ))}
              </div>
              <div className="text-xs font-mono-tabular text-[#F4EFE8]/70">
                {totalReviewCount} reviews
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal('write-review')}
              className="px-5 py-2.5 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0"
            >
              Write a review
            </button>
          </div>
        </div>

        {/* Reviews Filter, Search & Sort Controls */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-serif-editorial text-2xl text-[#F4EFE8]">Reviews</h3>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search within reviews */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#F4EFE8]/45 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  placeholder="Search reviews (e.g. Shahbaz, 5 marla)..."
                  className="pl-8 pr-3 py-2 rounded-lg bg-[#12151B] border border-[#F4EFE8]/12 focus:border-[#B8925A] focus:outline-none text-xs text-[#F4EFE8] w-60"
                />
              </div>

              {/* Sort Control */}
              <div className="flex items-center gap-2 bg-[#12151B] border border-[#F4EFE8]/12 rounded-lg px-3 py-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D2AE78]" />
                <span className="text-xs text-[#F4EFE8]/60">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'relevant' | 'newest' | 'highest')}
                  className="bg-transparent text-xs font-medium text-[#F4EFE8] focus:outline-none"
                >
                  <option value="relevant" className="bg-[#12151B]">Most relevant</option>
                  <option value="newest" className="bg-[#12151B]">Newest</option>
                  <option value="highest" className="bg-[#12151B]">Most helpful</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Topic Filter Buttons: All | fair dealing 3 | helpful team 3 | buying property 2 | investors 2 | +6 */}
          <div className="flex flex-wrap items-center gap-2">
            {visibleTopics.map((topic) => {
              const isSelected = selectedTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#B8925A] text-[#0E1116] font-semibold'
                      : 'bg-[#12151B] text-[#F4EFE8]/75 border border-[#F4EFE8]/10 hover:border-[#B8925A]/50 hover:text-[#F4EFE8]'
                  }`}
                >
                  <span>{topic.label}</span>
                  {topic.id !== 'All' && (
                    <span className={`font-mono-tabular ${isSelected ? 'text-[#0E1116]/80' : 'text-[#D2AE78]'}`}>
                      {topic.count}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setShowMoreTopics((prev) => !prev)}
              className="px-3.5 py-2 rounded-lg text-xs font-mono-tabular bg-[#171B23] text-[#D2AE78] border border-[#B8925A]/30 hover:border-[#D2AE78] transition-colors whitespace-nowrap shrink-0"
            >
              {showMoreTopics ? 'Show less' : '+6'}
            </button>
          </div>
        </div>

        {/* Review Cards List */}
        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <article
              key={review.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#12151B] border border-[#F4EFE8]/10 space-y-5"
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#171B23] border border-[#B8925A]/45 flex items-center justify-center font-serif-editorial text-base text-[#D2AE78] shrink-0">
                    {review.authorInitials}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-[#F4EFE8]">{review.author}</h4>
                    <div className="text-xs text-[#F4EFE8]/60 font-mono-tabular">
                      {review.authorReviewCount}
                    </div>
                  </div>
                </div>

                {/* Rating & Timestamp */}
                <div className="flex items-center gap-2 text-xs text-[#F4EFE8]/65">
                  <div className="flex items-center gap-0.5 text-[#D2AE78]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D2AE78] text-[#D2AE78]" />
                    ))}
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{review.timeAgo}</span>
                </div>
              </div>

              {/* Review Body Text */}
              <p className="text-sm sm:text-base text-[#F4EFE8]/90 leading-relaxed">
                {review.text}
              </p>

              {/* Review Actions: Like & Share */}
              <div className="flex items-center gap-5 pt-1">
                <button
                  type="button"
                  onClick={() => handleToggleLike(review.id)}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    review.likedByMe
                      ? 'text-[#D2AE78] font-semibold'
                      : 'text-[#F4EFE8]/65 hover:text-[#F4EFE8]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Like</span>
                  <span className="font-mono-tabular">({review.likes})</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareReview(review)}
                  className="flex items-center gap-2 text-xs text-[#F4EFE8]/65 hover:text-[#F4EFE8] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Response from the owner (No thick left accent border — uses subtle all-around hairline border & surface contrast) */}
              {review.ownerResponse && (
                <div className="p-5 rounded-xl bg-[#0E1116] border border-[#F4EFE8]/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[#D2AE78]">Response from the owner</span>
                    <span aria-hidden="true" className="text-[#F4EFE8]/40">·</span>
                    <span className="text-[#F4EFE8]/60">{review.ownerResponse.timeAgo}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F4EFE8]/80 leading-relaxed">
                    {review.ownerResponse.text}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* More reviews (77) Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllReviews((prev) => !prev)}
            className="px-6 py-3 rounded-lg border border-[#B8925A]/50 hover:border-[#D2AE78] text-xs font-semibold uppercase tracking-[0.16em] text-[#F4EFE8] hover:bg-[#B8925A]/10 transition-colors"
          >
            {showAllReviews ? 'Show fewer reviews' : `More reviews (${totalReviewCount - 3})`}
          </button>
        </div>
      </section>

      {/* SECTION 5: PEOPLE ALSO SEARCH FOR & WEB RESULTS DIRECTORY (ALTERNATING LIMESTONE #F4EFE8) */}
      <section id="directory" className="w-full bg-[#F4EFE8] text-[#0E1116] py-16 lg:py-24 border-t border-[#0E1116]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 space-y-16">
          {/* People also search for */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-xs uppercase tracking-[0.18em] text-[#785926] font-semibold">
                  Comparative Local Directory · Bahria Orchard & Bahria Town
                </div>
                <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#0E1116]">
                  People also search for
                </h2>
              </div>
              <p className="text-xs text-[#0E1116]/65">
                Select any neighboring agency to inspect comparative ratings, distance from Tower 3, and specialization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PEOPLE_ALSO_SEARCH_FOR.map((comp) => {
                const isSelected = selectedCompetitor?.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setSelectedCompetitor(isSelected ? null : comp)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#0E1116] text-[#F4EFE8] border-[#0E1116] shadow-xl'
                        : 'bg-white hover:bg-white/90 text-[#0E1116] border-[#0E1116]/12'
                    }`}
                  >
                    <div className="space-y-2">
                      <h3 className="font-serif-editorial text-lg leading-snug">{comp.name}</h3>
                      {/* Unboxed Rating & Review Count */}
                      <div className="flex items-center gap-1.5 text-xs font-mono-tabular">
                        <span className="font-semibold">{comp.rating.toFixed(1)}</span>
                        <Star className="w-3.5 h-3.5 fill-[#B8925A] text-[#B8925A]" />
                        <span className={isSelected ? 'text-[#F4EFE8]/70' : 'text-[#0E1116]/60'}>
                          ({comp.reviewCount})
                        </span>
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-[#D2AE78]' : 'text-[#785926]'}`}>
                        {comp.category}
                      </div>
                    </div>

                    <div
                      className={`pt-3 border-t text-[11px] ${
                        isSelected
                          ? 'border-[#F4EFE8]/15 text-[#F4EFE8]/70'
                          : 'border-[#0E1116]/10 text-[#0E1116]/60'
                      }`}
                    >
                      {comp.distance}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Competitor Comparison Drawer */}
            {selectedCompetitor && (
              <div className="p-6 rounded-2xl bg-[#0E1116] text-[#F4EFE8] border border-[#B8925A]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <div className="text-xs font-mono-tabular text-[#D2AE78]">
                    DIRECTORY COMPARISON · {selectedCompetitor.category.toUpperCase()}
                  </div>
                  <h4 className="font-serif-editorial text-2xl">{selectedCompetitor.name}</h4>
                  <div className="text-xs text-[#F4EFE8]/75 flex flex-wrap items-center gap-2">
                    <span>{selectedCompetitor.address}</span>
                    <span>·</span>
                    <span className="font-mono-tabular">{selectedCompetitor.phone}</span>
                    <span>·</span>
                    <span>{selectedCompetitor.hours}</span>
                  </div>
                  <p className="text-xs text-[#F4EFE8]/60 pt-1">
                    Primary Focus: {selectedCompetitor.specialty} (Compared with <strong>Real Estate In Bahria Town / Orchard Lahore</strong>: 5.0 ★ across {totalReviewCount} reviews at Tower 3, Office # 17).
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setNearbyFilter('agencies');
                      document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-lg bg-[#B8925A] text-[#0E1116] text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                  >
                    Show on Map
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCompetitor(null)}
                    className="p-2 text-[#F4EFE8]/60 hover:text-[#F4EFE8]"
                    aria-label="Close comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Web results */}
          <div className="space-y-6 pt-6 border-t border-[#0E1116]/12">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-[0.18em] text-[#785926] font-semibold">
                Verified Indexing & Registry Records
              </div>
              <h2 className="font-serif-editorial text-3xl text-[#0E1116]">Web results</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {WEB_RESULTS.map((item) => {
                const isExpanded = expandedWebResultId === item.id;
                return (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl bg-white border border-[#0E1116]/12 space-y-3 transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#0E1116]/60 font-mono-tabular">
                      <span>{item.breadcrumb}</span>
                      <span>{item.updatedDate} · {item.category}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpandedWebResultId(isExpanded ? null : item.id)}
                      className="text-left group flex items-center justify-between w-full gap-4"
                    >
                      <h3 className="font-serif-editorial text-xl text-[#0E1116] group-hover:text-[#785926] transition-colors">
                        {item.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-[#785926] shrink-0" />
                    </button>
                    <p className="text-sm text-[#0E1116]/75 leading-relaxed">{item.snippet}</p>

                    {isExpanded && (
                      <div className="pt-3 mt-3 border-t border-[#0E1116]/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#0E1116]/80 font-mono-tabular">
                        {item.details.map((detail, i) => (
                          <div key={i} className="p-2.5 rounded bg-[#F4EFE8] border border-[#0E1116]/10">
                            {detail}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Architectural Footer */}
      <footer className="bg-[#0E1116] border-t border-[#F4EFE8]/10 py-12 px-6 lg:px-20 text-xs text-[#F4EFE8]/60">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-serif-editorial text-base text-[#F4EFE8]">
              {BUSINESS_PROFILE.name}
            </div>
            <div>{BUSINESS_PROFILE.address}</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono-tabular">
            <span>{BUSINESS_PROFILE.plusCode}</span>
            <span>·</span>
            <span>{BUSINESS_PROFILE.phone}</span>
            <span>·</span>
            <span>{BUSINESS_PROFILE.hoursStatus} · {BUSINESS_PROFILE.closesAt}</span>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal for Inspecting Photos */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="max-w-3xl w-full bg-[#12151B] border border-[#B8925A]/50 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-80 sm:h-96 bg-[#0B0E13]">
              <ArchitecturalPlate sceneType={lightboxPhoto.sceneType} />
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono-tabular text-[#D2AE78]">
                  {lightboxPhoto.category.toUpperCase()} · {lightboxPhoto.dimensions}
                </div>
                <h3 className="font-serif-editorial text-2xl text-[#F4EFE8]">{lightboxPhoto.title}</h3>
                <p className="text-xs text-[#F4EFE8]/70">{lightboxPhoto.subtitle} — {lightboxPhoto.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="px-5 py-2.5 rounded-lg bg-[#B8925A] text-[#0E1116] text-xs font-semibold uppercase tracking-wider shrink-0"
              >
                Close Plate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modals */}
      <ActionModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onAddReview={(newReview) => {
          setReviews((prev) => [newReview, ...prev]);
          logHistory(`Posted 5-star review by ${newReview.author}`);
          showToast('Your verified review has been published');
        }}
        onAddPhoto={(newPhoto) => {
          setPhotos((prev) => [newPhoto, ...prev]);
          logHistory(`Uploaded photo plate: ${newPhoto.title}`);
          showToast('Added photo plate to gallery');
        }}
        customLabel={customLabel}
        onSaveLabel={(lbl) => {
          setCustomLabel(lbl);
          logHistory(`Added private label "${lbl}"`);
          showToast(`Saved label: ${lbl}`);
        }}
        customWebsite={customWebsite}
        onSaveWebsite={(url) => {
          setCustomWebsite(url);
          logHistory(`Updated website URL to ${url}`);
          showToast(`Updated website to ${url}`);
        }}
        historyLog={historyLog}
      />
    </div>
  );
}
