import React, { useState } from 'react';
import { PhotoSpecimen, PropertyPlot } from '../data/bahriaData';

export const ArchitecturalPlate: React.FC<{
  sceneType: PhotoSpecimen['sceneType'];
  imageUrl?: string;
  alt?: string;
  className?: string;
}> = ({ sceneType, imageUrl, alt = 'Real Estate In Bahria Town / Orchard Lahore', className = '' }) => {
  const [imgError, setImgError] = useState(false);

  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  switch (sceneType) {
    case 'atelier-lobby':
      return (
        <svg viewBox="0 0 800 500" className={`w-full h-full object-cover ${className}`} role="img" aria-label="Tower 3 Executive Consultation Gallery">
          <defs>
            <linearGradient id="bg-lobby" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0E1116" />
              <stop offset="55%" stopColor="#161A23" />
              <stop offset="100%" stopColor="#1E222B" />
            </linearGradient>
            <linearGradient id="bronze-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D2AE78" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#B8925A" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="travertine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2B2722" />
              <stop offset="50%" stopColor="#3B352D" />
              <stop offset="100%" stopColor="#23201B" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#bg-lobby)" />
          {/* Perspective grid lines */}
          <line x1="0" y1="420" x2="800" y2="420" stroke="#B8925A" strokeOpacity="0.25" strokeWidth="1" />
          <line x1="120" y1="0" x2="120" y2="420" stroke="#F4EFE8" strokeOpacity="0.07" strokeWidth="1" />
          <line x1="680" y1="0" x2="680" y2="420" stroke="#F4EFE8" strokeOpacity="0.07" strokeWidth="1" />
          <line x1="0" y1="90" x2="800" y2="90" stroke="#F4EFE8" strokeOpacity="0.06" strokeWidth="1" />
          {/* Fluted limestone rear wall */}
          {Array.from({ length: 28 }).map((_, i) => (
            <line
              key={i}
              x1={140 + i * 19}
              y1="90"
              x2={140 + i * 19}
              y2="360"
              stroke="#D2AE78"
              strokeOpacity={i % 3 === 0 ? '0.22' : '0.09'}
              strokeWidth="1"
            />
          ))}
          {/* Illuminated architectural wall niche */}
          <rect x="230" y="130" width="340" height="175" fill="url(#bronze-glow)" stroke="#B8925A" strokeOpacity="0.55" strokeWidth="1" />
          <rect x="250" y="148" width="300" height="139" fill="#0E1116" fillOpacity="0.75" stroke="#D2AE78" strokeOpacity="0.3" strokeWidth="0.75" />
          {/* Bahria Orchard Masterplan Relief inside frame */}
          <path d="M 270 250 L 350 180 L 440 210 L 530 165" fill="none" stroke="#D2AE78" strokeWidth="1.5" strokeOpacity="0.8" />
          <circle cx="350" cy="180" r="4" fill="#D2AE78" />
          <circle cx="440" cy="210" r="4" fill="#B8925A" />
          <text x="275" y="175" fill="#F4EFE8" fillOpacity="0.75" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="3">
            TOWER 3 · OFFICE # 17
          </text>
          <text x="275" y="272" fill="#B8925A" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            EASTERN DISTRICT · 8689+FP LAHORE
          </text>
          {/* Cantilevered Travertine Consultation Table */}
          <polygon points="180,355 620,355 670,395 130,395" fill="url(#travertine)" stroke="#D2AE78" strokeOpacity="0.5" strokeWidth="1" />
          <rect x="230" y="395" width="36" height="55" fill="#14171F" stroke="#B8925A" strokeOpacity="0.35" strokeWidth="1" />
          <rect x="534" y="395" width="36" height="55" fill="#14171F" stroke="#B8925A" strokeOpacity="0.35" strokeWidth="1" />
          {/* Linear Brass Pendant Light */}
          <line x1="400" y1="0" x2="400" y2="78" stroke="#B8925A" strokeWidth="1" />
          <rect x="280" y="78" width="240" height="5" fill="#D2AE78" />
        </svg>
      );

    case 'masterplan-table':
      return (
        <svg viewBox="0 0 600 600" className={`w-full h-full object-cover ${className}`} role="img" aria-label="Bahria Orchard Eastern District Cartography Wall">
          <rect width="600" height="600" fill="#11141B" />
          {/* Fine blueprint grid */}
          {Array.from({ length: 12 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="#F4EFE8" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#F4EFE8" strokeOpacity="0.05" strokeWidth="1" />
            </React.Fragment>
          ))}
          {/* Raiwind Road Arterial */}
          <path d="M 60 540 L 540 60" stroke="#B8925A" strokeWidth="4" strokeOpacity="0.4" />
          <path d="M 60 540 L 540 60" stroke="#D2AE78" strokeWidth="1" strokeDasharray="8 6" />
          {/* Sector Blocks */}
          <rect x="130" y="130" width="150" height="110" fill="#171B23" stroke="#B8925A" strokeOpacity="0.5" strokeWidth="1.2" />
          <rect x="300" y="130" width="170" height="110" fill="#171B23" stroke="#D2AE78" strokeOpacity="0.8" strokeWidth="1.5" />
          <rect x="130" y="260" width="150" height="140" fill="#171B23" stroke="#B8925A" strokeOpacity="0.35" strokeWidth="1" />
          <rect x="300" y="260" width="170" height="140" fill="#B8925A" fillOpacity="0.14" stroke="#D2AE78" strokeWidth="1.5" />
          <circle cx="385" cy="330" r="9" fill="#D2AE78" fillOpacity="0.25" stroke="#D2AE78" strokeWidth="1.5" />
          <circle cx="385" cy="330" r="3" fill="#F4EFE8" />
          <text x="148" y="160" fill="#F4EFE8" fillOpacity="0.7" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            BLOCK A · ORCHARD
          </text>
          <text x="318" y="160" fill="#D2AE78" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            BLOCK C · 5M PAIRS
          </text>
          <text x="318" y="290" fill="#F4EFE8" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="2">
            TOWER 3 · OFFICE #17
          </text>
          <text x="75" y="515" fill="#B8925A" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
            RAIWIND ROAD CORRIDOR · LAHORE 54000
          </text>
        </svg>
      );

    case 'exterior-tower3':
      return (
        <svg viewBox="0 0 600 600" className={`w-full h-full object-cover ${className}`} role="img" aria-label="Tower 3 Facade at Dusk">
          <defs>
            <linearGradient id="dusk-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#090B0E" />
              <stop offset="65%" stopColor="#141821" />
              <stop offset="100%" stopColor="#231D16" />
            </linearGradient>
          </defs>
          <rect width="600" height="600" fill="url(#dusk-sky)" />
          {/* Architectural Monolith Tower 3 */}
          <rect x="150" y="95" width="300" height="415" fill="#12151B" stroke="#B8925A" strokeOpacity="0.55" strokeWidth="1.5" />
          {/* Mullions & Warm Illuminated Office # 17 Windows */}
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 4 }).map((__, col) => {
              const isOffice17 = row === 2 && (col === 1 || col === 2);
              return (
                <rect
                  key={`${row}-${col}`}
                  x={176 + col * 64}
                  y={125 + row * 60}
                  width="48"
                  height="42"
                  fill={isOffice17 ? '#D2AE78' : '#1B2029'}
                  fillOpacity={isOffice17 ? '0.38' : '0.8'}
                  stroke={isOffice17 ? '#D2AE78' : '#F4EFE8'}
                  strokeOpacity={isOffice17 ? '0.95' : '0.12'}
                  strokeWidth="1"
                />
              );
            })
          )}
          {/* Ground Forecourt */}
          <line x1="40" y1="510" x2="560" y2="510" stroke="#B8925A" strokeWidth="1.5" />
          <text x="180" y="80" fill="#D2AE78" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="4">
            TOWER 3 · EASTERN DISTRICT
          </text>
          <text x="176" y="545" fill="#F4EFE8" fillOpacity="0.7" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            OFFICE # 17 · RAIWIND RD · CLOSES 10 PM
          </text>
        </svg>
      );

    case 'boardroom':
      return (
        <svg viewBox="0 0 800 500" className={`w-full h-full object-cover ${className}`} role="img" aria-label="Private Transfer & Biometric Documentation Suite">
          <rect width="800" height="500" fill="#0F1218" />
          {/* Acoustic glass partition mullions */}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x={80 + i * 80}
              y="60"
              width="76"
              height="320"
              fill="#161A22"
              stroke="#B8925A"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
          ))}
          {/* Horizontal Bronze Transom */}
          <line x1="60" y1="220" x2="740" y2="220" stroke="#D2AE78" strokeOpacity="0.45" strokeWidth="1.5" />
          {/* Conference Table Foreground */}
          <polygon points="140,340 660,340 730,430 70,430" fill="#1D2026" stroke="#B8925A" strokeOpacity="0.6" strokeWidth="1.2" />
          {/* Portfolio Dossiers on Table */}
          <rect x="260" y="362" width="90" height="44" fill="#F4EFE8" fillOpacity="0.9" />
          <rect x="440" y="362" width="90" height="44" fill="#B8925A" fillOpacity="0.3" stroke="#D2AE78" strokeWidth="1" />
          <text x="95" y="470" fill="#D2AE78" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
            BIOMETRIC TRANSFER & NDC VERIFICATION SUITE · OFFICE # 17
          </text>
        </svg>
      );

    case 'pair-plot-site':
      return (
        <svg viewBox="0 0 800 500" className={`w-full h-full object-cover ${className}`} role="img" aria-label="5 Marla Pair Plot Specimen in Bahria Orchard">
          <rect width="800" height="500" fill="#101319" />
          {/* Isometric / Axonometric Pair Plot Cadastre */}
          <polygon points="400,95 670,220 400,355 130,220" fill="#171B23" stroke="#B8925A" strokeWidth="1.5" />
          {/* Center dividing line between the two 5 Marla plots */}
          <line x1="265" y1="157" x2="535" y2="287" stroke="#D2AE78" strokeWidth="1.5" strokeDasharray="6 4" />
          {/* Plot 214 Highlight */}
          <polygon points="400,110 520,166 395,230 275,172" fill="#B8925A" fillOpacity="0.18" stroke="#D2AE78" strokeWidth="1" />
          {/* Plot 215 Highlight */}
          <polygon points="530,171 650,226 525,290 405,235" fill="#B8925A" fillOpacity="0.28" stroke="#D2AE78" strokeWidth="1" />
          <text x="335" y="178" fill="#F4EFE8" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            5 MARLA #214
          </text>
          <text x="465" y="238" fill="#F4EFE8" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            5 MARLA #215
          </text>
          <text x="235" y="425" fill="#D2AE78" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="3">
            50 FT COMBINED FRONTAGE · EASTERN DISTRICT PAIR SPECIMEN
          </text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 600 600" className={`w-full h-full object-cover ${className}`} role="img" aria-label="Architectural Detail">
          <rect width="600" height="600" fill="#12151B" />
          <circle cx="300" cy="300" r="180" fill="none" stroke="#B8925A" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="300" cy="300" r="110" fill="#B8925A" fillOpacity="0.08" stroke="#D2AE78" strokeOpacity="0.65" strokeWidth="1.2" />
          <line x1="80" y1="300" x2="520" y2="300" stroke="#F4EFE8" strokeOpacity="0.12" strokeWidth="1" />
          <line x1="300" y1="80" x2="300" y2="520" stroke="#F4EFE8" strokeOpacity="0.12" strokeWidth="1" />
          <text x="175" y="540" fill="#D2AE78" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
            ARCOVA ATELIER · TOWER 3 SUITE 17
          </text>
        </svg>
      );
  }
};

export const BlueprintPlotViewport: React.FC<{
  plot: PropertyPlot;
}> = ({ plot }) => {
  return (
    <div className="relative w-full h-64 bg-[#0E1116] border border-[#0E1116]/20 rounded-none overflow-hidden select-none">
      <svg viewBox="0 0 600 320" className="w-full h-full" role="img" aria-label={`Architectural Blueprint for ${plot.title}`}>
        <rect width="600" height="320" fill="#0E1116" />
        {/* Architectural CAD Grid */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="320" stroke="#F4EFE8" strokeOpacity="0.05" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} stroke="#F4EFE8" strokeOpacity="0.05" strokeWidth="1" />
        ))}

        {/* Outer Dimension Lines */}
        <line x1="90" y1="42" x2="510" y2="42" stroke="#B8925A" strokeOpacity="0.6" strokeWidth="1" />
        <line x1="90" y1="36" x2="90" y2="48" stroke="#B8925A" strokeWidth="1" />
        <line x1="510" y1="36" x2="510" y2="48" stroke="#B8925A" strokeWidth="1" />
        <text x="300" y="33" textAnchor="middle" fill="#D2AE78" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          {plot.frontage.toUpperCase()}
        </text>

        {/* CAD Plot Boundary */}
        <rect x="90" y="62" width="420" height="196" fill="#12151B" stroke="#D2AE78" strokeWidth="1.5" />
        {/* Setback Envelope */}
        <rect
          x="114"
          y="82"
          width="372"
          height="156"
          fill="#B8925A"
          fillOpacity="0.08"
          stroke="#F4EFE8"
          strokeOpacity="0.3"
          strokeDasharray="5 4"
          strokeWidth="1"
        />
        {/* Internal Structural Axis / Pair Division */}
        <line x1="300" y1="62" x2="300" y2="258" stroke="#B8925A" strokeOpacity="0.65" strokeWidth="1" strokeDasharray="6 4" />
        <line x1="114" y1="160" x2="486" y2="160" stroke="#F4EFE8" strokeOpacity="0.15" strokeWidth="1" />

        {/* Architectural Stamp */}
        <text x="128" y="110" fill="#F4EFE8" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
          REF: {plot.code}
        </text>
        <text x="128" y="130" fill="#B8925A" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="2">
          {plot.size.toUpperCase()}
        </text>
        <text x="128" y="224" fill="#F4EFE8" fillOpacity="0.6" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
          ORIENTATION: {plot.orientation.toUpperCase()}
        </text>
        <text x="300" y="294" textAnchor="middle" fill="#F4EFE8" fillOpacity="0.55" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2.5">
          APPROACH BOULEVARD · BAHRIA ORCHARD / TOWN CADASTRE
        </text>
      </svg>
    </div>
  );
};
