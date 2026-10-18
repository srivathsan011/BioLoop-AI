import type { PresetBenchmarkCase } from '../types/bioloop.ts';

// High-fidelity SVG biological renders as Data URLs for pristine visual pathology rendering
export const sampleLeafImages: Record<string, string> = {
  tomato_late_blight: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <radialGradient id="leafGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#4ade80" />
          <stop offset="40%" stop-color="#22c55e" />
          <stop offset="85%" stop-color="#15803d" />
          <stop offset="100%" stop-color="#14532d" />
        </radialGradient>
        <radialGradient id="blight1" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#1c1917" />
          <stop offset="45%" stop-color="#451a03" />
          <stop offset="70%" stop-color="#78350f" />
          <stop offset="90%" stop-color="#ca8a04" />
          <stop offset="100%" stop-color="#facc15" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="blight2" cx="30%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#292524" />
          <stop offset="50%" stop-color="#713f12" />
          <stop offset="85%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#fef08a" stop-opacity="0" />
        </radialGradient>
        <filter id="sporulationBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0.9  0 1 0 0 0.9  0 0 1 0 0.9  0 0 0 0.8 0" in="noise" result="coloredNoise"/>
          <feComposite operator="in" in2="SourceGraphic"/>
        </filter>
        <filter id="leafShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#022c22" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Background lab tile grid -->
      <rect width="600" height="600" fill="#0f172a" />
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.8"/>
      </pattern>
      <rect width="600" height="600" fill="url(#grid)" opacity="0.6"/>

      <!-- Leaf shadow and main lamina -->
      <g filter="url(#leafShadow)">
        <path d="M 300 45 C 380 90, 480 180, 490 320 C 495 400, 410 490, 310 520 C 290 525, 275 490, 260 480 C 180 430, 100 360, 110 240 C 120 140, 210 60, 300 45 Z" 
              fill="url(#leafGrad)" stroke="#166534" stroke-width="3" />
      </g>

      <!-- Central Petiole / Midrib vein -->
      <path d="M 300 45 Q 295 280 290 540" fill="none" stroke="#86efac" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 290 540 Q 288 565 285 585" fill="none" stroke="#a3e635" stroke-width="5" stroke-linecap="round"/>

      <!-- Lateral Leaf Veins -->
      <path d="M 298 120 Q 370 140 430 170" fill="none" stroke="#86efac" stroke-width="2.2" opacity="0.75"/>
      <path d="M 297 180 Q 210 210 150 250" fill="none" stroke="#86efac" stroke-width="2.2" opacity="0.75"/>
      <path d="M 295 240 Q 390 270 460 300" fill="none" stroke="#86efac" stroke-width="2" opacity="0.75"/>
      <path d="M 294 310 Q 200 330 135 370" fill="none" stroke="#86efac" stroke-width="2" opacity="0.75"/>
      <path d="M 292 380 Q 370 410 430 430" fill="none" stroke="#86efac" stroke-width="1.8" opacity="0.75"/>
      <path d="M 291 440 Q 220 460 170 470" fill="none" stroke="#86efac" stroke-width="1.8" opacity="0.75"/>

      <!-- Primary Late Blight Water-Soaked & Necrotic Lesion (Top-Right) -->
      <!-- Chlorotic border halo -->
      <ellipse cx="380" cy="220" rx="95" ry="75" fill="#eab308" opacity="0.45" />
      <ellipse cx="380" cy="220" rx="80" ry="60" fill="url(#blight1)" />
      <!-- Water-soaked edge -->
      <path d="M 330 190 Q 370 160 420 180 Q 450 220 420 260 Q 350 270 330 230 Z" fill="#362208" opacity="0.9" />
      <circle cx="390" cy="215" r="28" fill="#171109" />
      
      <!-- Fungal Sporulation (Downy White Mold Pustules) -->
      <g filter="url(#sporulationBlur)">
        <ellipse cx="410" cy="245" rx="35" ry="18" fill="#f8fafc" opacity="0.85"/>
        <circle cx="355" cy="200" r="10" fill="#f1f5f9" opacity="0.7"/>
        <circle cx="430" cy="220" r="12" fill="#f8fafc" opacity="0.8"/>
      </g>

      <!-- Secondary Lesion (Lower-Left Margin) -->
      <ellipse cx="200" cy="350" rx="75" ry="65" fill="#facc15" opacity="0.4" />
      <ellipse cx="200" cy="350" rx="60" ry="50" fill="url(#blight2)" />
      <circle cx="190" cy="345" r="30" fill="#1c1917" />
      <ellipse cx="225" cy="370" rx="22" ry="12" fill="#ffffff" opacity="0.75" filter="url(#sporulationBlur)" />

      <!-- Small Tertiary Pinpoint Lesion -->
      <circle cx="270" cy="160" r="14" fill="#854d0e" opacity="0.85"/>
      <circle cx="270" cy="160" r="7" fill="#1c1917" />

      <!-- Scale bar -->
      <g transform="translate(480, 550)">
        <rect width="90" height="26" rx="4" fill="#1e293b" opacity="0.85" />
        <line x1="10" y1="13" x2="80" y2="13" stroke="#f8fafc" stroke-width="2"/>
        <line x1="10" y1="9" x2="10" y2="17" stroke="#f8fafc" stroke-width="2"/>
        <line x1="80" y1="9" x2="80" y2="17" stroke="#f8fafc" stroke-width="2"/>
        <text x="45" y="22" fill="#94a3b8" font-size="9" font-family="sans-serif" text-anchor="middle">20 mm</text>
      </g>
    </svg>
  `)}`,

  potato_early_blight: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <radialGradient id="potatoLeafGrad" cx="48%" cy="45%" r="52%">
          <stop offset="0%" stop-color="#84cc16" />
          <stop offset="50%" stop-color="#4d7c0f" />
          <stop offset="90%" stop-color="#365314" />
          <stop offset="100%" stop-color="#1a2e05" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="#0f172a" />
      <!-- Leaf -->
      <path d="M 300 60 C 420 110, 500 220, 480 370 C 460 460, 380 510, 300 530 C 220 510, 140 460, 120 370 C 100 220, 180 110, 300 60 Z"
            fill="url(#potatoLeafGrad)" stroke="#3f6212" stroke-width="3" />
      <!-- Midrib -->
      <path d="M 300 60 L 300 550" stroke="#bef264" stroke-width="4" stroke-linecap="round"/>
      <path d="M 300 160 Q 380 190 440 230" stroke="#bef264" stroke-width="2" opacity="0.7"/>
      <path d="M 300 240 Q 210 280 150 320" stroke="#bef264" stroke-width="2" opacity="0.7"/>
      <path d="M 300 330 Q 390 360 450 390" stroke="#bef264" stroke-width="2" opacity="0.7"/>
      <path d="M 300 410 Q 220 440 160 460" stroke="#bef264" stroke-width="2" opacity="0.7"/>

      <!-- Classic Alternaria Solani Concentric Target Rings -->
      <!-- Spot 1 Center-Right -->
      <ellipse cx="370" cy="270" rx="65" ry="50" fill="#facc15" opacity="0.35" />
      <circle cx="370" cy="270" r="46" fill="#78350f" />
      <circle cx="370" cy="270" r="36" fill="none" stroke="#d97706" stroke-width="3.5" />
      <circle cx="370" cy="270" r="26" fill="none" stroke="#451a03" stroke-width="3" />
      <circle cx="370" cy="270" r="16" fill="none" stroke="#b45309" stroke-width="2.5" />
      <circle cx="370" cy="270" r="8" fill="#1c1917" />

      <!-- Spot 2 Lower-Left -->
      <ellipse cx="230" cy="380" rx="55" ry="42" fill="#facc15" opacity="0.3" />
      <circle cx="230" cy="380" r="38" fill="#78350f" />
      <circle cx="230" cy="380" r="28" fill="none" stroke="#d97706" stroke-width="3" />
      <circle cx="230" cy="380" r="18" fill="none" stroke="#451a03" stroke-width="2.5" />
      <circle cx="230" cy="380" r="6" fill="#1c1917" />

      <!-- Spot 3 Upper-Left small -->
      <circle cx="220" cy="200" r="24" fill="#78350f" />
      <circle cx="220" cy="200" r="16" fill="none" stroke="#d97706" stroke-width="2" />
      <circle cx="220" cy="200" r="6" fill="#1c1917" />
    </svg>
  `)}`,

  dual_infection: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <pattern id="mosaicPattern" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 30 10 L 60 0 L 50 30 L 60 60 L 25 50 L 0 60 L 10 30 Z" fill="#65a30d" opacity="0.6"/>
          <path d="M 15 15 L 45 15 L 45 45 L 15 45 Z" fill="#eab308" opacity="0.35"/>
        </pattern>
      </defs>
      <rect width="600" height="600" fill="#0f172a" />
      <!-- Puckered distorted viral leaf outline -->
      <path d="M 300 50 C 440 80, 520 200, 480 340 C 460 410, 420 480, 310 540 C 250 510, 130 460, 110 340 C 90 210, 170 70, 300 50 Z" 
            fill="#4d7c0f" stroke="#365314" stroke-width="3"/>
      <!-- Viral Mosaic overlay -->
      <path d="M 300 50 C 440 80, 520 200, 480 340 C 460 410, 420 480, 310 540 C 250 510, 130 460, 110 340 C 90 210, 170 70, 300 50 Z" 
            fill="url(#mosaicPattern)" opacity="0.75"/>
      <!-- Distorted Midrib & vein clearing -->
      <path d="M 300 50 Q 320 280 305 545" stroke="#fef08a" stroke-width="4.5" fill="none" opacity="0.85"/>
      <!-- Concurrently: Septoria pinpoint fungal pycnidia lesions scattered -->
      <circle cx="340" cy="180" r="18" fill="#facc15" opacity="0.4"/>
      <circle cx="340" cy="180" r="10" fill="#292524" />
      <circle cx="340" cy="180" r="2" fill="#fafaf9" />

      <circle cx="390" cy="290" r="22" fill="#facc15" opacity="0.4"/>
      <circle cx="390" cy="290" r="12" fill="#292524" />
      <circle cx="389" cy="290" r="2.5" fill="#fafaf9" />

      <circle cx="210" cy="270" r="16" fill="#facc15" opacity="0.4"/>
      <circle cx="210" cy="270" r="8" fill="#292524" />

      <circle cx="240" cy="400" r="20" fill="#facc15" opacity="0.4"/>
      <circle cx="240" cy="400" r="11" fill="#292524" />

      <!-- Visual indicator: High Entropy Warning Banner -->
      <g transform="translate(30, 30)">
        <rect width="180" height="34" rx="8" fill="#e11d48" opacity="0.9" />
        <text x="90" y="22" fill="#ffffff" font-weight="bold" font-size="12" font-family="sans-serif" text-anchor="middle">DUAL PATHOLOGY</text>
      </g>
    </svg>
  `)}`,

  coffee_rust: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <radialGradient id="coffeeLeaf" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#15803d" />
          <stop offset="60%" stop-color="#166534" />
          <stop offset="100%" stop-color="#052e16" />
        </radialGradient>
        <radialGradient id="rustPustule" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#f97316" />
          <stop offset="60%" stop-color="#c2410c" />
          <stop offset="100%" stop-color="#7c2d12" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="#0f172a" />
      <!-- Elliptical thick waxy coffee leaf -->
      <path d="M 300 70 C 430 110, 480 240, 460 380 C 440 470, 370 515, 300 535 C 230 515, 160 470, 140 380 C 120 240, 170 110, 300 70 Z" 
            fill="url(#coffeeLeaf)" stroke="#14532d" stroke-width="3.5" />
      <path d="M 300 70 L 300 550" stroke="#86efac" stroke-width="4.5"/>
      <path d="M 300 170 Q 370 190 420 220" stroke="#86efac" stroke-width="2.2" opacity="0.6"/>
      <path d="M 300 250 Q 230 270 180 300" stroke="#86efac" stroke-width="2.2" opacity="0.6"/>
      <path d="M 300 340 Q 370 360 420 390" stroke="#86efac" stroke-width="2.2" opacity="0.6"/>

      <!-- Abaxial Powdery Orange Rust Pustules (Hemileia vastatrix) -->
      <ellipse cx="370" cy="230" rx="45" ry="35" fill="url(#rustPustule)" />
      <ellipse cx="370" cy="230" rx="35" ry="25" fill="#ea580c" opacity="0.9" />
      <circle cx="365" cy="225" r="15" fill="#fed7aa" opacity="0.8" />

      <ellipse cx="230" cy="330" rx="55" ry="40" fill="url(#rustPustule)" />
      <ellipse cx="230" cy="330" rx="42" ry="30" fill="#ea580c" opacity="0.9" />
      <circle cx="225" cy="325" r="18" fill="#fed7aa" opacity="0.8" />

      <ellipse cx="340" cy="410" rx="38" ry="28" fill="url(#rustPustule)" />
      <circle cx="335" cy="405" r="12" fill="#fed7aa" opacity="0.8" />
    </svg>
  `)}`,

  maize_leaf_blight: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="maizeBlade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#15803d" />
          <stop offset="48%" stop-color="#22c55e" />
          <stop offset="50%" stop-color="#86efac" />
          <stop offset="52%" stop-color="#22c55e" />
          <stop offset="100%" stop-color="#166534" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="#0f172a" />
      <!-- Long linear parallel-veined corn leaf blade -->
      <path d="M 270 40 Q 360 280 320 560 L 280 560 Q 230 280 270 40 Z" fill="url(#maizeBlade)" stroke="#166534" stroke-width="2" />
      <!-- Parallel veins -->
      <line x1="285" y1="40" x2="295" y2="560" stroke="#bbf7d0" stroke-width="1.2" opacity="0.5"/>
      <line x1="275" y1="40" x2="285" y2="560" stroke="#bbf7d0" stroke-width="1.2" opacity="0.5"/>
      <line x1="305" y1="40" x2="315" y2="560" stroke="#bbf7d0" stroke-width="1.2" opacity="0.5"/>

      <!-- Long Elliptical "Cigar-Shaped" Gray-Brown Lesions (Exserohilum turcicum) -->
      <ellipse cx="295" cy="220" rx="22" ry="70" fill="#78350f" transform="rotate(3, 295, 220)" />
      <ellipse cx="295" cy="220" rx="14" ry="55" fill="#451a03" transform="rotate(3, 295, 220)" />
      <ellipse cx="295" cy="220" rx="7" ry="35" fill="#a8a29e" transform="rotate(3, 295, 220)" />

      <ellipse cx="285" cy="380" rx="18" ry="60" fill="#78350f" transform="rotate(-2, 285, 380)" />
      <ellipse cx="285" cy="380" rx="10" ry="42" fill="#451a03" transform="rotate(-2, 285, 380)" />
      <ellipse cx="285" cy="380" rx="5" ry="25" fill="#a8a29e" transform="rotate(-2, 285, 380)" />
    </svg>
  `)}`,
};

export const PRESET_BENCHMARK_CASES: PresetBenchmarkCase[] = [
  {
    id: 'case_tomato_late_blight',
    title: 'Tomato Late Blight (Phytophthora)',
    crop: 'Tomato (Solanum lycopersicum)',
    location: 'Nakuru County, Kenya',
    tagline: 'High Rain Alert -> Dynamic Foliar Override Activated',
    badge: 'Weather Override Active',
    badgeColor: 'amber',
    weatherScenario: 'Heavy rain expected in 3 hours (88% prob, 34mm). Severe wash-off risk.',
    imageUrl: sampleLeafImages.tomato_late_blight,
    historyNote: 'Rapid water-soaked lesions expanding on lower canopy leaves over the last 48 hours following monsoon showers. White mildew fuzz visible on leaf underside during early morning hours.',
    audioTranscript: 'Agronomist Field Audio: "We noticed sudden dark brown spots spreading through the lower canopy after yesterday night\'s deluge. White downy sporulation underneath the leaves. Need urgent intervention before it takes the entire 3 acres."',
    acreage: 3.5,
    coordinates: { lat: -0.3031, lng: 36.08 },
  },
  {
    id: 'case_potato_early_blight',
    title: 'Potato Early Blight (Alternaria solani)',
    crop: 'Potato (Solanum tuberosum)',
    location: 'Salinas Valley, California',
    tagline: 'Dry Arid Conditions -> Direct Foliar Spray Approved',
    badge: 'Foliar Approved',
    badgeColor: 'emerald',
    weatherScenario: 'Clear skies for next 72 hours. Temp 22°C, 35% humidity, 0% rain.',
    imageUrl: sampleLeafImages.potato_early_blight,
    historyNote: 'Concentric target-board rings on mature lower leaves. Lesions are dark brown with yellow chlorotic margins bounded by leaf veins. No recent rainfall; warm dry days with heavy dew nights.',
    audioTranscript: 'Farmer Voice Note: "Hey, spotted these circular target-like spots with concentric rings on the older potato foliage. Weather is dry right now, want to know if we can do our regular foliar pass today."',
    acreage: 5.0,
    coordinates: { lat: 36.6777, lng: -121.6555 },
  },
  {
    id: 'case_dual_infection_uncertainty',
    title: 'Dual Pathology / High Entropy',
    crop: 'Tomato (Solanum lycopersicum)',
    location: 'Nashik Agro Corridor, India',
    tagline: 'Visual Entropy > 0.75 -> Agronomist Fallback Protocol Tripped',
    badge: 'Uncertainty Flagged',
    badgeColor: 'rose',
    weatherScenario: 'Intermittent humid drizzle (65% RH), 26°C.',
    imageUrl: sampleLeafImages.dual_infection,
    historyNote: 'Leaves show mottled yellow-green mosaic pattern with leaf puckering, alongside scattered dark brown pinpoint pycnidia spots. Suspected concurrent viral (ToMV) and fungal (Septoria) infection.',
    audioTranscript: 'Grower Note: "Strange mixed symptoms on plot 4. The upper leaves are curling with yellow mosaic patterns, but simultaneously there are small brown fungal specks all over the stems and leaflets. Not sure which treatment to apply."',
    acreage: 2.0,
    coordinates: { lat: 19.9975, lng: 73.7898 },
  },
  {
    id: 'case_coffee_rust_shortage',
    title: 'Coffee Leaf Rust (Hemileia vastatrix)',
    crop: 'Coffee Arabica',
    location: 'Huila Region, Colombia',
    tagline: 'Local Supply Shortage -> Autonomous Coop Re-Routing',
    badge: 'Supply Auto-Reroute',
    badgeColor: 'sky',
    weatherScenario: 'High mountain mist, 92% leaf wetness, mild drizzle.',
    imageUrl: sampleLeafImages.coffee_rust,
    historyNote: 'Yellow-orange powdery pustules on the lower surface of leaves. Severe defoliation starting on bearing branches. Primary Copper Oxychloride stock is depleted in nearest village.',
    audioTranscript: 'Estate Manager Audio: "Rust outbreak on our Typica blocks. Powdery orange spots multiplying on lower leaf surfaces. Local cooperative is out of standard copper fungicide, need alternate bio or systemic formulation."',
    acreage: 4.2,
    coordinates: { lat: 2.9273, lng: -75.2819 },
  },
  {
    id: 'case_maize_leaf_blight_wind',
    title: 'Northern Corn Leaf Blight (Exserohilum)',
    crop: 'Maize / Corn (Zea mays)',
    location: 'Eldoret Grain Basin, Kenya',
    tagline: 'High Wind Velocity (38 km/h) -> Drift Hazard Postponement',
    badge: 'Wind Hazard Window',
    badgeColor: 'purple',
    weatherScenario: 'Sunny but hazardous wind gusts up to 38 km/h. High drift risk.',
    imageUrl: sampleLeafImages.maize_leaf_blight,
    historyNote: 'Long, narrow, elliptical grayish-green to tan lesions developing parallel to leaf veins. Lesions extending 3 to 12 cm long with dark fungal sporulation during damp mornings.',
    audioTranscript: 'Farm Supervisor: "The corn field has long cigar-shaped tan lesions spreading upwards. High winds blowing across the basin right now, we can\'t spray without serious drift into the cattle pasture."',
    acreage: 10.0,
    coordinates: { lat: 0.5143, lng: 35.2698 },
  },
];
