import React, { useState } from 'react';
import { Compass, MapPin, Navigation, Layers, Plus, Minus } from 'lucide-react';
import { BUSINESS_PROFILE, PROPERTY_PLOTS, PEOPLE_ALSO_SEARCH_FOR, PropertyPlot } from '../data/bahriaData';

interface InteractiveBahriaMapProps {
  selectedPlot: PropertyPlot;
  onSelectPlot: (plot: PropertyPlot) => void;
  onOpenDirections: () => void;
  nearbyFilter: 'all' | 'plots' | 'agencies' | 'landmarks';
  onChangeNearbyFilter: (filter: 'all' | 'plots' | 'agencies' | 'landmarks') => void;
}

export const InteractiveBahriaMap: React.FC<InteractiveBahriaMapProps> = ({
  selectedPlot,
  onSelectPlot,
  onOpenDirections,
  nearbyFilter,
  onChangeNearbyFilter,
}) => {
  const [zoom, setZoom] = useState<number>(15);
  const [activeLandmark, setActiveLandmark] = useState<string>('tower3');

  const landmarks = [
    { id: 'tower3', name: 'Tower 3, Office # 17 (HQ)', x: 48, y: 52, type: 'hq', subtitle: '8689+FP Lahore · Open · Closes 10 PM' },
    { id: 'gate1', name: 'Bahria Orchard Main Gate (Raiwind Rd)', x: 35, y: 66, type: 'landmark', subtitle: '0.3 km West · Primary Security Entry' },
    { id: 'hospital', name: 'Bahria Orchard Hospital & Medical Complex', x: 56, y: 62, type: 'landmark', subtitle: '0.6 km South-East · Central Boulevard' },
    { id: 'ringroad', name: 'Lahore Ring Road SL-3 Interchange', x: 20, y: 80, type: 'landmark', subtitle: '5.4 km North via Raiwind Road' },
  ];

  const agencyPins = [
    { id: 'comp-1', name: 'Bahria Town Property Dealers', rating: '4.8 (26)', x: 38, y: 40 },
    { id: 'comp-2', name: 'PROPERTY INN (PVT) LTD', rating: '4.9 (67)', x: 44, y: 60 },
    { id: 'comp-3', name: 'Greenz Realtors - Builder', rating: '4.8 (81)', x: 60, y: 49 },
    { id: 'comp-4', name: 'Athar Associates & Real Estate', rating: '4.2 (48)', x: 26, y: 72 },
    { id: 'comp-5', name: 'AL AREESH Marketing', rating: '5.0 (11)', x: 30, y: 24 },
  ];

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#0B0E13] border border-[#F4EFE8]/10 rounded-2xl overflow-hidden flex flex-col justify-between">
      {/* Map Controls Top Overlay */}
      <div className="relative z-10 p-4 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-[#0E1116]/95 via-[#0E1116]/75 to-transparent">
        <div className="flex items-center gap-1 p-1 bg-[#12151B]/95 border border-[#F4EFE8]/10 rounded-lg">
          {(
            [
              { id: 'all', label: 'All Layers' },
              { id: 'plots', label: 'Plots (4)' },
              { id: 'agencies', label: 'Nearby Agencies (5)' },
              { id: 'landmarks', label: 'Landmarks' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeNearbyFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                nearbyFilter === tab.id
                  ? 'bg-[#B8925A] text-[#0E1116] font-semibold'
                  : 'text-[#F4EFE8]/70 hover:text-[#F4EFE8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-tabular text-[#D2AE78] hidden sm:inline">
            PLUS CODE: {BUSINESS_PROFILE.plusCode}
          </span>
          <div className="flex items-center bg-[#12151B] border border-[#F4EFE8]/10 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(18, z + 1))}
              className="p-2 text-[#F4EFE8]/75 hover:text-[#D2AE78] transition-colors"
              aria-label="Zoom in map"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-mono-tabular text-[#F4EFE8]/60">{zoom}z</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(12, z - 1))}
              className="p-2 text-[#F4EFE8]/75 hover:text-[#D2AE78] transition-colors"
              aria-label="Zoom out map"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Cartographic Canvas */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1000 650"
          className="w-full h-full object-cover transition-transform duration-200"
          style={{ transform: `scale(${1 + (zoom - 15) * 0.08})` }}
        >
          <rect width="1000" height="650" fill="#0D1016" />
          {/* Topographic & Cadastre Grid */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`vg-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="650" stroke="#F4EFE8" strokeOpacity="0.035" strokeWidth="1" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="#F4EFE8" strokeOpacity="0.035" strokeWidth="1" />
          ))}

          {/* Green Belt / Golf & Park Reserves */}
          <polygon points="560,180 860,210 830,410 530,370" fill="#141C19" stroke="#B8925A" strokeOpacity="0.2" strokeWidth="1" />
          <polygon points="220,110 510,130 480,290 200,260" fill="#131720" stroke="#F4EFE8" strokeOpacity="0.08" strokeWidth="1" />

          {/* Raiwind Road Main Arterial Corridor */}
          <path d="M 80 580 Q 380 410 890 95" fill="none" stroke="#1E232E" strokeWidth="26" />
          <path d="M 80 580 Q 380 410 890 95" fill="none" stroke="#B8925A" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M 80 580 Q 380 410 890 95" fill="none" stroke="#D2AE78" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="10 8" />

          {/* Secondary Eastern District Boulevards */}
          <path d="M 350 430 L 760 520" fill="none" stroke="#F4EFE8" strokeOpacity="0.16" strokeWidth="8" />
          <path d="M 480 338 L 640 220" fill="none" stroke="#B8925A" strokeOpacity="0.3" strokeWidth="6" />
          <path d="M 480 338 L 310 170" fill="none" stroke="#F4EFE8" strokeOpacity="0.14" strokeWidth="6" />

          {/* Map District Labels */}
          <text x="585" y="235" fill="#D2AE78" fillOpacity="0.55" fontSize="12" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
            EASTERN DISTRICT · BAHRIA ORCHARD
          </text>
          <text x="245" y="155" fill="#F4EFE8" fillOpacity="0.4" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
            BAHRIA TOWN SECTOR F / G CORRIDOR
          </text>
          <text x="155" y="515" fill="#B8925A" fillOpacity="0.7" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="3" transform="rotate(-31 155,515)">
            RAIWIND ROAD (LAHORE 54000)
          </text>
        </svg>

        {/* Interactive HTML Overlay Pins */}
        {/* Property Plot Pins */}
        {(nearbyFilter === 'all' || nearbyFilter === 'plots') &&
          PROPERTY_PLOTS.map((plot) => {
            const isSelected = selectedPlot.id === plot.id;
            return (
              <button
                key={plot.id}
                type="button"
                onClick={() => onSelectPlot(plot)}
                style={{ left: `${plot.coordinates.x}%`, top: `${plot.coordinates.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform duration-150 focus:outline-none ${
                  isSelected ? 'z-30 scale-105' : 'z-20 hover:scale-105'
                }`}
              >
                <div
                  className={`px-2.5 py-1 rounded-md border text-xs font-mono-tabular flex items-center gap-1.5 shadow-lg whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#B8925A] text-[#0E1116] border-[#F4EFE8] font-semibold'
                      : 'bg-[#12151B]/95 text-[#F4EFE8] border-[#B8925A]/50 hover:border-[#D2AE78]'
                  }`}
                >
                  <Layers className="w-3 h-3 shrink-0" />
                  <span>{plot.code}</span>
                  <span className="opacity-75">·</span>
                  <span>{plot.pricePkr.replace('PKR ', '')}</span>
                </div>
              </button>
            );
          })}

        {/* Competitor Agency Pins ("People also search for") */}
        {(nearbyFilter === 'all' || nearbyFilter === 'agencies') &&
          agencyPins.map((ag) => (
            <button
              key={ag.id}
              type="button"
              onClick={() => setActiveLandmark(ag.id)}
              style={{ left: `${ag.x}%`, top: `${ag.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group focus:outline-none"
            >
              <div
                className={`px-2 py-1 rounded border text-[11px] transition-colors whitespace-nowrap ${
                  activeLandmark === ag.id
                    ? 'bg-[#F4EFE8] text-[#0E1116] border-[#B8925A] font-medium'
                    : 'bg-[#171B23]/90 text-[#F4EFE8]/75 border-[#F4EFE8]/15 hover:border-[#B8925A]/60'
                }`}
              >
                <span>{ag.name}</span>
                <span className="ml-1.5 font-mono-tabular text-[#D2AE78]">{ag.rating}</span>
              </div>
            </button>
          ))}

        {/* Primary HQ Pin: Tower 3, Office # 17 */}
        {landmarks
          .filter((l) => nearbyFilter === 'all' || nearbyFilter === 'landmarks' || l.id === 'tower3')
          .map((lm) => {
            const isHQ = lm.id === 'tower3';
            return (
              <button
                key={lm.id}
                type="button"
                onClick={() => setActiveLandmark(lm.id)}
                style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none ${
                  isHQ ? 'z-30' : 'z-10'
                }`}
              >
                {isHQ ? (
                  <div className="flex flex-col items-center">
                    <div className="px-3 py-1.5 rounded-lg bg-[#0E1116] border border-[#D2AE78] shadow-2xl flex items-center gap-2 whitespace-nowrap">
                      <MapPin className="w-4 h-4 text-[#D2AE78] shrink-0" />
                      <div className="text-left">
                        <div className="text-xs font-semibold text-[#F4EFE8] leading-tight">
                          Tower 3, Office # 17
                        </div>
                        <div className="text-[10px] font-mono-tabular text-[#D2AE78]">
                          5.0 ★ (80) · Eastern District
                        </div>
                      </div>
                    </div>
                    <div className="w-0.5 h-3 bg-[#D2AE78]" />
                  </div>
                ) : (
                  <div className="px-2 py-0.5 rounded bg-[#12151B]/90 border border-[#F4EFE8]/20 text-[11px] text-[#F4EFE8]/75 hover:text-[#F4EFE8] whitespace-nowrap">
                    {lm.name}
                  </div>
                )}
              </button>
            );
          })}
      </div>

      {/* Bottom Selected Location / Plot Summary Bar */}
      <div className="relative z-10 m-4 p-4 rounded-xl bg-[#12151B]/95 border border-[#F4EFE8]/12 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#D2AE78] font-mono-tabular">
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>{BUSINESS_PROFILE.plusCode}</span>
            <span>·</span>
            <span>31.3162° N, 74.2193° E</span>
          </div>
          <div className="text-sm font-medium text-[#F4EFE8]">
            {BUSINESS_PROFILE.address}
          </div>
          <div className="text-xs text-[#F4EFE8]/65 flex flex-wrap items-center gap-2">
            <span>Selected Plot Specimen: {selectedPlot.title}</span>
            <span>·</span>
            <span className="font-mono-tabular text-[#D2AE78]">{selectedPlot.pricePkr}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenDirections}
          className="px-4 py-2.5 rounded-lg bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Route to Office # 17</span>
        </button>
      </div>
    </div>
  );
};
