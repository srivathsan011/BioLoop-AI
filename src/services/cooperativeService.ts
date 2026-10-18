import type { CooperativeInventoryItem, ProcurementOrder } from '../types/bioloop.ts';

export const REGIONAL_COOPERATIVE_STOCKS: CooperativeInventoryItem[] = [
  // Kenya / East Africa
  {
    id: 'coop_ke_01',
    coopName: 'Rift Valley Smallholders Farmers Co-op',
    distanceKm: 2.4,
    locality: 'Nakuru Central Depot, Kenya',
    address: 'Plot 42, Agrovet Junction, Nakuru-Njoro Highway',
    phone: '+254 722 890 142',
    commercialBrand: 'Ridomil Gold MZ 68 WG',
    activeIngredient: 'Metalaxyl-M (4%) + Mancozeb (64%)',
    formulation: 'Water Dispersible Granule (WG)',
    modeOfAction: 'systemic',
    packSize: '1 kg Box',
    priceUsd: 18.5,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'PCPB(CR)0842',
    batchExpiry: '11/2027',
    recommendedDosePerAcre: '1.0 kg in 200L water',
  },
  {
    id: 'coop_ke_02',
    coopName: 'Rift Valley Smallholders Farmers Co-op',
    distanceKm: 2.4,
    locality: 'Nakuru Central Depot, Kenya',
    address: 'Plot 42, Agrovet Junction, Nakuru-Njoro Highway',
    phone: '+254 722 890 142',
    commercialBrand: 'Tusal Bio-Fungicide (Trichoderma viride)',
    activeIngredient: 'Trichoderma viride & T. harzianum spores (1x10^9 CFU/g)',
    formulation: 'Wettable Powder (WP) for Soil Drench',
    modeOfAction: 'biological_antagonist',
    packSize: '500 g Foil Sachet',
    priceUsd: 14.0,
    stockStatus: 'in_stock',
    organicCertified: true,
    registrationNumber: 'PCPB(CR)1190-BIO',
    batchExpiry: '06/2027',
    recommendedDosePerAcre: '500 g in 150L water for root zone drench',
  },
  {
    id: 'coop_ke_03',
    coopName: 'Nakuru Agri-Supply Union',
    distanceKm: 4.8,
    locality: 'Nakuru Town, Kenya',
    address: 'Kenyatta Avenue Wholesale Market, Bay 7',
    phone: '+254 733 451 902',
    commercialBrand: 'Dithane M-45 (Contact Mancozeb)',
    activeIngredient: 'Mancozeb (80% WP)',
    formulation: 'Wettable Powder',
    modeOfAction: 'contact_protectant',
    packSize: '2 kg Pouch',
    priceUsd: 16.0,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'PCPB(CR)0105',
    batchExpiry: '09/2027',
    recommendedDosePerAcre: '1.5 kg in 200L water',
  },

  // California / North America
  {
    id: 'coop_us_01',
    coopName: 'Salinas Valley Growers Cooperative',
    distanceKm: 1.8,
    locality: 'Salinas Valley, California',
    address: '1440 Abbott Street, Salinas, CA 93901',
    phone: '+1 (831) 755-3200',
    commercialBrand: 'Bravo Weather Stik (Chlorothalonil)',
    activeIngredient: 'Chlorothalonil (54%)',
    formulation: '720 g/L Suspension Concentrate (SC)',
    modeOfAction: 'contact_protectant',
    packSize: '2.5 Gallon Jug (9.46 L)',
    priceUsd: 54.0,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'EPA Reg. No. 50534-188',
    batchExpiry: '03/2028',
    recommendedDosePerAcre: '1.5 pints in 50 gal water',
  },
  {
    id: 'coop_us_02',
    coopName: 'Salinas Valley Growers Cooperative',
    distanceKm: 1.8,
    locality: 'Salinas Valley, California',
    address: '1440 Abbott Street, Salinas, CA 93901',
    phone: '+1 (831) 755-3200',
    commercialBrand: 'Quadris Top (Azoxystrobin + Difenoconazole)',
    activeIngredient: 'Azoxystrobin (18.2%) + Difenoconazole (11.4%)',
    formulation: 'Flowable SC',
    modeOfAction: 'systemic',
    packSize: '1 Gallon Jug',
    priceUsd: 110.0,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'EPA Reg. No. 100-1313',
    batchExpiry: '08/2027',
    recommendedDosePerAcre: '8.0 fl oz per acre',
  },

  // Colombia / Latin America
  {
    id: 'coop_co_01',
    coopName: 'Cooperativa Departamental de Caficultores del Huila (CADEFIHUILA)',
    distanceKm: 3.1,
    locality: 'Neiva - Huila, Colombia',
    address: 'Carrera 1 Este No. 25-50, Neiva',
    phone: '+57 8 871 4500',
    commercialBrand: 'Kocide 2000 (Copper Hydroxide)',
    activeIngredient: 'Copper Hydroxide (53.8%)',
    formulation: 'Dry Flowable (DF)',
    modeOfAction: 'contact_protectant',
    packSize: '1 kg Bag',
    priceUsd: 19.0,
    stockStatus: 'out_of_stock', // Simulating primary out-of-stock condition!
    organicCertified: true,
    registrationNumber: 'ICA No. 2210',
    batchExpiry: '04/2027',
    recommendedDosePerAcre: '1.2 kg in 250L water',
  },
  {
    id: 'coop_co_02',
    coopName: 'AgroCafé Biológicos & Insumos del Sur',
    distanceKm: 6.2,
    locality: 'Rivera - Huila Corridor, Colombia',
    address: 'Km 7 Vía Campoalegre',
    phone: '+57 312 445 8899',
    commercialBrand: 'Serenade ASO (Bacillus amyloliquefaciens)',
    activeIngredient: 'Bacillus amyloliquefaciens strain QST 713',
    formulation: 'Bio-Fungicide Aqueous Suspension',
    modeOfAction: 'biological_antagonist',
    packSize: '5 Liter Container',
    priceUsd: 38.0,
    stockStatus: 'in_stock', // Autonomous rerouting success!
    organicCertified: true,
    registrationNumber: 'ICA Bio-Cert 0089',
    batchExpiry: '12/2027',
    recommendedDosePerAcre: '2.0 Liters in 200L water',
  },
  {
    id: 'coop_co_03',
    coopName: 'AgroCafé Biológicos & Insumos del Sur',
    distanceKm: 6.2,
    locality: 'Rivera - Huila Corridor, Colombia',
    address: 'Km 7 Vía Campoalegre',
    phone: '+57 312 445 8899',
    commercialBrand: 'Priori Xtra (Azoxystrobin + Cyproconazole)',
    activeIngredient: 'Azoxystrobin (200 g/L) + Cyproconazole (80 g/L)',
    formulation: 'Suspension Concentrate',
    modeOfAction: 'systemic',
    packSize: '1 Liter Bottle',
    priceUsd: 42.0,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'ICA No. 3491',
    batchExpiry: '05/2028',
    recommendedDosePerAcre: '350 ml per acre in 200L water',
  },

  // India
  {
    id: 'coop_in_01',
    coopName: 'Nashik District Agricultural Cooperative Society',
    distanceKm: 3.5,
    locality: 'Nashik Market Yard, Maharashtra',
    address: 'Shop 18, APMC Complex, Dindori Road, Nashik',
    phone: '+91 253 257 8810',
    commercialBrand: 'Sanveevani Trichoderma Bio-Fungicide',
    activeIngredient: 'Trichoderma harzianum (2x10^8 CFU/g)',
    formulation: 'Carrier-based Powder',
    modeOfAction: 'biological_antagonist',
    packSize: '1 kg Packet',
    priceUsd: 6.5,
    stockStatus: 'in_stock',
    organicCertified: true,
    registrationNumber: 'CIB&RC-1920-BIO',
    batchExpiry: '01/2028',
    recommendedDosePerAcre: '1 kg in farm compost or 100L water',
  },
  {
    id: 'coop_in_02',
    coopName: 'Nashik District Agricultural Cooperative Society',
    distanceKm: 3.5,
    locality: 'Nashik Market Yard, Maharashtra',
    address: 'Shop 18, APMC Complex, Dindori Road, Nashik',
    phone: '+91 253 257 8810',
    commercialBrand: 'Antracol 70 WP (Propineb)',
    activeIngredient: 'Propineb (70% WP)',
    formulation: 'Wettable Powder with Zinc',
    modeOfAction: 'contact_protectant',
    packSize: '1 kg Pack',
    priceUsd: 9.8,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'CIR-48,201',
    batchExpiry: '09/2027',
    recommendedDosePerAcre: '600 g per acre',
  },

  // Tropical & Banana Corridor
  {
    id: 'coop_trop_01',
    coopName: 'Tropical Growers Agronomic Union',
    distanceKm: 3.2,
    locality: 'Banana Basin Agro-Corridor',
    address: 'Sector 4, Plantation Supply Hub',
    phone: '+1 800 555 0192',
    commercialBrand: 'Tilt 250 EC (Propiconazole)',
    activeIngredient: 'Propiconazole (250 g/L)',
    formulation: 'Emulsifiable Concentrate (EC)',
    modeOfAction: 'systemic',
    packSize: '1 Liter Bottle',
    priceUsd: 28.0,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'EPA Reg. No. 100-617',
    batchExpiry: '10/2027',
    recommendedDosePerAcre: '400 ml in 150L water + mineral spray oil',
  },
  {
    id: 'coop_trop_02',
    coopName: 'Tropical Growers Agronomic Union',
    distanceKm: 3.2,
    locality: 'Banana Basin Agro-Corridor',
    address: 'Sector 4, Plantation Supply Hub',
    phone: '+1 800 555 0192',
    commercialBrand: 'Siganex 600 SC (Pyrimethanil)',
    activeIngredient: 'Pyrimethanil (600 g/L)',
    formulation: 'Suspension Concentrate (SC)',
    modeOfAction: 'systemic',
    packSize: '1 Liter Container',
    priceUsd: 34.5,
    stockStatus: 'in_stock',
    organicCertified: false,
    registrationNumber: 'AGRI-BAN-4820',
    batchExpiry: '04/2028',
    recommendedDosePerAcre: '300 ml in 200L water',
  },
];

export function checkCooperativeInventory(
  activeIngredients: string[],
  locality?: string,
  treatmentMode?: string
): CooperativeInventoryItem[] {
  let matched = REGIONAL_COOPERATIVE_STOCKS.filter((item) => {
    // If locality hints match
    if (locality) {
      const loc = locality.toLowerCase();
      const itemLoc = (item.locality + ' ' + item.coopName).toLowerCase();
      if (
        (loc.includes('kenya') || loc.includes('nakuru') || loc.includes('eldoret')) &&
        item.id.startsWith('coop_ke')
      ) {
        return true;
      }
      if (
        (loc.includes('california') || loc.includes('salinas') || loc.includes('us')) &&
        item.id.startsWith('coop_us')
      ) {
        return true;
      }
      if (
        (loc.includes('colombia') || loc.includes('huila') || loc.includes('neiva')) &&
        item.id.startsWith('coop_co')
      ) {
        return true;
      }
      if (
        (loc.includes('india') || loc.includes('nashik') || loc.includes('maharashtra')) &&
        item.id.startsWith('coop_in')
      ) {
        return true;
      }
    }

    // Match active ingredient substring
    const matchesIngredient = activeIngredients.some((ing) =>
      item.activeIngredient.toLowerCase().includes(ing.toLowerCase()) ||
      item.commercialBrand.toLowerCase().includes(ing.toLowerCase())
    );

    if (matchesIngredient) return true;

    // Match treatment mode
    if (treatmentMode && item.modeOfAction.includes(treatmentMode)) {
      return true;
    }

    return false;
  });

  // If no match found by locality, fallback to top items relevant to mode
  if (matched.length === 0) {
    matched = REGIONAL_COOPERATIVE_STOCKS.slice(0, 3);
  }

  return matched;
}

export function generateProcurementOrder(
  cropType: string,
  acreage: number,
  selectedItem: CooperativeInventoryItem,
  farmerName: string = 'Registered Cooperative Member'
): ProcurementOrder {
  const quantity = Math.max(1, Math.ceil(acreage * 1));
  const subtotal = Math.round(selectedItem.priceUsd * quantity * 100) / 100;
  const randCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const orderId = `BL-${Date.now().toString().slice(-6)}-${randCode.slice(0, 3)}`;

  return {
    orderId,
    reservedAt: new Date().toISOString(),
    pickupPassCode: `PASS-${randCode}`,
    coopName: selectedItem.coopName,
    coopAddress: selectedItem.address,
    coopPhone: selectedItem.phone,
    farmerName,
    cropType,
    acreage,
    selectedItems: [
      {
        item: selectedItem,
        quantity,
        subtotal,
      },
    ],
    totalCostUsd: subtotal,
    pickupStatus: 'reserved',
    verificationToken: `v1.jwt.agri-coop.${randCode}.${Date.now()}`,
  };
}
