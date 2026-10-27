import React, { useState } from 'react';
import { X, Navigation, Smartphone, Star, Upload, Check, Phone, MapPin, Edit3, Globe, Tag, History } from 'lucide-react';
import { BUSINESS_PROFILE, LAHORE_HUBS, REVIEW_TOPICS, PhotoSpecimen, ReviewItem } from '../data/bahriaData';

export type ActiveModalType =
  | null
  | 'directions'
  | 'send-to-phone'
  | 'write-review'
  | 'add-photo'
  | 'add-label'
  | 'suggest-edit'
  | 'add-website'
  | 'maps-history'
  | 'consultation';

interface ActionModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
  onAddReview: (review: ReviewItem) => void;
  onAddPhoto: (photo: PhotoSpecimen) => void;
  customLabel: string;
  onSaveLabel: (label: string) => void;
  customWebsite: string;
  onSaveWebsite: (website: string) => void;
  historyLog: { action: string; timestamp: string }[];
}

export const ActionModals: React.FC<ActionModalsProps> = ({
  activeModal,
  onClose,
  onAddReview,
  onAddPhoto,
  customLabel,
  onSaveLabel,
  customWebsite,
  onSaveWebsite,
  historyLog,
}) => {
  const [selectedHubId, setSelectedHubId] = useState<string>(LAHORE_HUBS[0].id);
  const [phoneInput, setPhoneInput] = useState<string>('+92 300 ');
  const [deliveryChannel, setDeliveryChannel] = useState<'sms' | 'whatsapp' | 'device'>('whatsapp');
  const [phoneSent, setPhoneSent] = useState<boolean>(false);

  // Review state
  const [reviewAuthor, setReviewAuthor] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [selectedReviewTopics, setSelectedReviewTopics] = useState<string[]>(['fair dealing', 'helpful team']);

  // Photo state
  const [photoTitle, setPhotoTitle] = useState<string>('');
  const [photoSubtitle, setPhotoSubtitle] = useState<string>('');
  const [photoCategory, setPhotoCategory] = useState<'Inside' | 'Interior design' | 'By owner'>('Inside');
  const [photoScene, setPhotoScene] = useState<PhotoSpecimen['sceneType']>('atelier-lobby');

  // Label & Website & Edit state
  const [labelDraft, setLabelDraft] = useState<string>(customLabel || 'Bahria Orchard Plot Consultant');
  const [websiteDraft, setWebsiteDraft] = useState<string>(customWebsite || 'https://arcova-bahriaorchard.pk');
  const [editNote, setEditNote] = useState<string>('');
  const [editSubmitted, setEditSubmitted] = useState<boolean>(false);

  // Consultation state
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [plotInterest, setPlotInterest] = useState<string>('5 Marla Contiguous Pair Plots (Eastern District)');
  const [visitDate, setVisitDate] = useState<string>('2026-10-29');
  const [consultationBooked, setConsultationBooked] = useState<boolean>(false);

  if (!activeModal) return null;

  const selectedHub = LAHORE_HUBS.find((h) => h.id === selectedHubId) || LAHORE_HUBS[0];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewText.trim()) return;
    const initials = reviewAuthor
      .trim()
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      authorReviewCount: '1 review',
      authorInitials: initials || 'CL',
      rating: reviewRating,
      timeAgo: 'Just now',
      text: reviewText.trim(),
      topics: selectedReviewTopics,
      likes: 1,
    };
    onAddReview(newReview);
    setReviewAuthor('');
    setReviewText('');
    onClose();
  };

  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle.trim()) return;
    const newSpecimen: PhotoSpecimen = {
      id: `ph-${Date.now()}`,
      title: photoTitle.trim(),
      subtitle: photoSubtitle.trim() || 'Uploaded Client Architectural Plate',
      category: photoCategory,
      date: 'October 2026',
      dimensions: 'VERIFIED CLIENT SUBMISSION',
      location: 'Tower 3, Office # 17, Raiwind Rd',
      aspect: 'square',
      sceneType: photoScene,
    };
    onAddPhoto(newSpecimen);
    setPhotoTitle('');
    setPhotoSubtitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#12151B] border border-[#B8925A]/40 rounded-2xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#F4EFE8]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {activeModal === 'directions' && <Navigation className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'send-to-phone' && <Smartphone className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'write-review' && <Star className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'add-photo' && <Upload className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'add-label' && <Tag className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'suggest-edit' && <Edit3 className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'add-website' && <Globe className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'maps-history' && <History className="w-4 h-4 text-[#D2AE78]" />}
            {activeModal === 'consultation' && <Phone className="w-4 h-4 text-[#D2AE78]" />}
            <h3 className="text-lg font-serif-editorial text-[#F4EFE8]">
              {activeModal === 'directions' && 'Directions to Tower 3, Office # 17'}
              {activeModal === 'send-to-phone' && 'Send Location & Dossier to Phone'}
              {activeModal === 'write-review' && 'Write a Verified Client Review'}
              {activeModal === 'add-photo' && 'Add Photos & Architectural Plates'}
              {activeModal === 'add-label' && 'Add Private Label to Place'}
              {activeModal === 'suggest-edit' && 'Suggest an Edit / Add Missing Information'}
              {activeModal === 'add-website' && 'Add Official Website URL'}
              {activeModal === 'maps-history' && 'Your Maps & Property Inspection History'}
              {activeModal === 'consultation' && 'Schedule Private Advisory with Mr. Shahbaz'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#F4EFE8]/60 hover:text-[#F4EFE8] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {activeModal === 'directions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0E1116] border border-[#F4EFE8]/10 space-y-1">
                <div className="text-xs text-[#D2AE78] font-mono-tabular">DESTINATION · {BUSINESS_PROFILE.plusCode}</div>
                <div className="text-sm font-medium text-[#F4EFE8]">{BUSINESS_PROFILE.address}</div>
                <div className="text-xs text-[#F4EFE8]/60">
                  {BUSINESS_PROFILE.hoursStatus} · {BUSINESS_PROFILE.closesAt} · {BUSINESS_PROFILE.phone}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-[#F4EFE8]/70">
                  Select Departure Point in Lahore
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {LAHORE_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => setSelectedHubId(hub.id)}
                      className={`p-3 rounded-lg border text-left transition-colors flex items-center justify-between ${
                        selectedHubId === hub.id
                          ? 'bg-[#B8925A]/15 border-[#D2AE78] text-[#F4EFE8]'
                          : 'bg-[#0E1116] border-[#F4EFE8]/10 text-[#F4EFE8]/75 hover:border-[#F4EFE8]/25'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium">{hub.name}</div>
                        <div className="text-xs text-[#F4EFE8]/60 mt-0.5">{hub.route}</div>
                      </div>
                      <div className="text-right font-mono-tabular shrink-0 ml-4">
                        <div className="text-xs font-semibold text-[#D2AE78]">{hub.duration}</div>
                        <div className="text-[11px] text-[#F4EFE8]/50">{hub.distance}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#171B23] border border-[#B8925A]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#D2AE78] uppercase tracking-wider">Selected Route Summary</div>
                  <div className="text-sm font-medium text-[#F4EFE8] mt-0.5">
                    {selectedHub.duration} ({selectedHub.distance})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {activeModal === 'send-to-phone' && (
            <div className="space-y-4">
              <p className="text-sm text-[#F4EFE8]/75 leading-relaxed">
                Dispatch the verified location pin ({BUSINESS_PROFILE.plusCode}), Tower 3 Office # 17 address, and Mr. Shahbaz’s direct contact ({BUSINESS_PROFILE.phone}) to your mobile device.
              </p>

              <div className="flex items-center gap-2 p-1 bg-[#0E1116] border border-[#F4EFE8]/10 rounded-lg">
                {(
                  [
                    { id: 'whatsapp', label: 'WhatsApp Dossier' },
                    { id: 'sms', label: 'SMS Text' },
                    { id: 'device', label: 'Signed-in Phone' },
                  ] as const
                ).map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      setDeliveryChannel(ch.id);
                      setPhoneSent(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                      deliveryChannel === ch.id
                        ? 'bg-[#B8925A] text-[#0E1116] font-semibold'
                        : 'text-[#F4EFE8]/70 hover:text-[#F4EFE8]'
                    }`}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Recipient Mobile Number</label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                    setPhoneSent(false);
                  }}
                  placeholder="+92 300 1234567"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm font-mono-tabular text-[#F4EFE8]"
                />
              </div>

              {phoneSent ? (
                <div className="p-3.5 rounded-lg bg-[#B8925A]/15 border border-[#D2AE78] flex items-center gap-2.5 text-xs text-[#F4EFE8]">
                  <Check className="w-4 h-4 text-[#D2AE78] shrink-0" />
                  <span>
                    Dispatched Tower 3, Office # 17 coordinates and contact card to <strong className="font-mono-tabular">{phoneInput}</strong>.
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhoneSent(true)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Send to Phone Now
                </button>
              )}
            </div>
          )}

          {activeModal === 'write-review' && (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/10">
                <span className="text-xs uppercase tracking-wider text-[#F4EFE8]/70">Your Rating</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating ? 'fill-[#D2AE78] text-[#D2AE78]' : 'text-[#F4EFE8]/25'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="e.g., Bilal Ahmed"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm text-[#F4EFE8]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Select Experience Highlights</label>
                <div className="flex flex-wrap gap-1.5">
                  {REVIEW_TOPICS.filter((t) => t.id !== 'All').map((topic) => {
                    const active = selectedReviewTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() =>
                          setSelectedReviewTopics((prev) =>
                            prev.includes(topic.id) ? prev.filter((x) => x !== topic.id) : [...prev, topic.id]
                          )
                        }
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          active
                            ? 'bg-[#B8925A] text-[#0E1116] font-medium'
                            : 'bg-[#0E1116] border border-[#F4EFE8]/15 text-[#F4EFE8]/70 hover:text-[#F4EFE8]'
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Your Review</label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share details of your experience purchasing or selling plots in Bahria Orchard / Bahria Town with Mr. Shahbaz and team..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm text-[#F4EFE8]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[#F4EFE8]/20 text-xs text-[#F4EFE8]/80 hover:text-[#F4EFE8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider"
                >
                  Post Review
                </button>
              </div>
            </form>
          )}

          {activeModal === 'add-photo' && (
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Photo / Specimen Title</label>
                <input
                  type="text"
                  required
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="e.g., Eastern District Block D 10 Marla Corner Site"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm text-[#F4EFE8]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Architectural Caption / Subtitle</label>
                <input
                  type="text"
                  value={photoSubtitle}
                  onChange={(e) => setPhotoSubtitle(e.target.value)}
                  placeholder="e.g., 40 ft Carpeted Boulevard View"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm text-[#F4EFE8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Category Tab</label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as PhotoSpecimen['category'])}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 text-sm text-[#F4EFE8]"
                  >
                    <option value="Inside">Inside</option>
                    <option value="Interior design">Interior design</option>
                    <option value="By owner">By owner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#F4EFE8]/70 mb-1.5">Architectural Plate Style</label>
                  <select
                    value={photoScene}
                    onChange={(e) => setPhotoScene(e.target.value as PhotoSpecimen['sceneType'])}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 text-sm text-[#F4EFE8]"
                  >
                    <option value="pair-plot-site">Plot Cadastre Isometric</option>
                    <option value="atelier-lobby">Tower 3 Consultation Suite</option>
                    <option value="exterior-tower3">Tower 3 Dusk Facade</option>
                    <option value="masterplan-table">Eastern District Cartography</option>
                    <option value="boardroom">Biometric Transfer Suite</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[#F4EFE8]/20 text-xs text-[#F4EFE8]/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          )}

          {activeModal === 'add-label' && (
            <div className="space-y-4">
              <p className="text-sm text-[#F4EFE8]/75">
                Assign a private label to <strong>{BUSINESS_PROFILE.name}</strong> so it appears in your saved Maps directory and search bar.
              </p>
              <input
                type="text"
                value={labelDraft}
                onChange={(e) => setLabelDraft(e.target.value)}
                placeholder="e.g., Mr. Shahbaz — Bahria Orchard Office # 17"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm text-[#F4EFE8]"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSaveLabel(labelDraft.trim());
                    onClose();
                  }}
                  className="px-5 py-2 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider"
                >
                  Save Label
                </button>
              </div>
            </div>
          )}

          {activeModal === 'add-website' && (
            <div className="space-y-4">
              <p className="text-sm text-[#F4EFE8]/75">
                Link the official domain for <strong>{BUSINESS_PROFILE.name}</strong> (`Tower 3, Office # 17 Raiwind Rd`).
              </p>
              <input
                type="url"
                value={websiteDraft}
                onChange={(e) => setWebsiteDraft(e.target.value)}
                placeholder="https://arcova-bahriaorchard.pk"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm font-mono-tabular text-[#F4EFE8]"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSaveWebsite(websiteDraft.trim());
                    onClose();
                  }}
                  className="px-5 py-2 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider"
                >
                  Update Website
                </button>
              </div>
            </div>
          )}

          {activeModal === 'suggest-edit' && (
            <div className="space-y-4">
              <p className="text-sm text-[#F4EFE8]/75">
                Suggest an update to business hours, suite number (`Tower 3, Office # 17`), or phone number (`{BUSINESS_PROFILE.phone}`).
              </p>
              <textarea
                rows={3}
                value={editNote}
                onChange={(e) => {
                  setEditNote(e.target.value);
                  setEditSubmitted(false);
                }}
                placeholder="Describe the updated detail or missing landmark information..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 focus:border-[#B8925A] focus:outline-none text-sm text-[#F4EFE8]"
              />
              {editSubmitted ? (
                <div className="p-3 rounded-lg bg-[#B8925A]/15 border border-[#D2AE78] text-xs text-[#F4EFE8] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D2AE78]" />
                  <span>Thank you. Your edit suggestion has been logged for verification.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditSubmitted(true)}
                  className="px-5 py-2 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider"
                >
                  Submit Edit Suggestion
                </button>
              )}
            </div>
          )}

          {activeModal === 'maps-history' && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-[#D2AE78]">
                Recent Activity for 8689+FP Lahore, Pakistan
              </p>
              <div className="divide-y divide-[#F4EFE8]/10 border border-[#F4EFE8]/10 rounded-xl bg-[#0E1116] overflow-hidden">
                {historyLog.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 text-[#F4EFE8]">
                      <MapPin className="w-3.5 h-3.5 text-[#D2AE78] shrink-0" />
                      <span>{item.action}</span>
                    </div>
                    <span className="font-mono-tabular text-[#F4EFE8]/50">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeModal === 'consultation' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#0E1116] border border-[#F4EFE8]/10 text-xs space-y-1">
                <div className="text-[#D2AE78] font-mono-tabular">DIRECT MANDATE ADVISORY · {BUSINESS_PROFILE.phone}</div>
                <div className="text-[#F4EFE8] font-medium">Lead Advisor: Mr. Shahbaz · Tower 3, Office # 17, Raiwind Rd</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#F4EFE8]/70 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      setConsultationBooked(false);
                    }}
                    placeholder="e.g., Tariq Mahmood"
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 text-sm text-[#F4EFE8]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#F4EFE8]/70 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      setConsultationBooked(false);
                    }}
                    placeholder="+92 321 0000000"
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 text-sm font-mono-tabular text-[#F4EFE8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#F4EFE8]/70 mb-1">Acquisition Mandate</label>
                  <select
                    value={plotInterest}
                    onChange={(e) => setPlotInterest(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 text-sm text-[#F4EFE8]"
                  >
                    <option value="5 Marla Contiguous Pair Plots (Eastern District)">5 Marla Pair Plots (Eastern District)</option>
                    <option value="Tower 3 Commercial Boulevard Suite">Tower 3 Commercial Suite</option>
                    <option value="10 Marla Designer Residence (Sector F)">10 Marla Sector F Residence</option>
                    <option value="8 Marla Phase 2 Boulevard Plot">8 Marla Phase 2 Plot</option>
                    <option value="Property Sale Valuation & Mandate">Sell Existing Bahria Property</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#F4EFE8]/70 mb-1">Preferred Visit Date</label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1116] border border-[#F4EFE8]/15 text-sm font-mono-tabular text-[#F4EFE8]"
                  />
                </div>
              </div>

              {consultationBooked ? (
                <div className="p-3.5 rounded-lg bg-[#B8925A]/15 border border-[#D2AE78] text-xs text-[#F4EFE8] flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#D2AE78] shrink-0" />
                  <span>
                    Appointment confirmed at <strong>Tower 3, Office # 17</strong> for <strong>{plotInterest}</strong> on <span className="font-mono-tabular">{visitDate}</span>.
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConsultationBooked(true)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Confirm Office # 17 Consultation
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
