export type PathogenType = 'fungal' | 'bacterial' | 'viral' | 'oomycete' | 'pest_damage' | 'physiological_deficiency';

export interface VisualMarker {
  id: string;
  label: string;
  markerType: 'chlorotic_halo' | 'fungal_pustule' | 'necrotic_lesion' | 'vein_clearing' | 'target_ring' | 'water_soaked' | 'mosaic_mottle';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage
  height: number; // percentage
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface MicroclimateForecastPoint {
  hour: string;
  tempC: number;
  rainProbability: number;
  condition: string;
}

export interface MicroclimateData {
  locality: string;
  latitude: number;
  longitude: number;
  temperatureC: number;
  relativeHumidityPct: number;
  leafWetnessDurationHours: number;
  windSpeedKmH: number;
  windGustsKmH: number;
  solarRadiationWm2: number;
  precipitationForecast48h: MicroclimateForecastPoint[];
  rainImminent: boolean; // rain in < 24-48h or high probability
  nextRainExpectedInHours: number | null;
  foliarWashOffRisk: 'low' | 'moderate' | 'critical';
  windDriftRisk: 'safe' | 'caution' | 'hazardous';
  atmosphericSummary: string;
}

export interface EnvironmentalOverride {
  triggered: boolean;
  standardFoliarProtocol: string;
  overrideTrigger: string; // e.g. "Torrential Rain Imminent (<4h): High Wash-Off & Soil Leaching Risk"
  adaptedTreatmentStrategy: string; // e.g. "Pivot to Systemic Root Drenching + Bio-inoculant (Trichoderma) + Timed Spray Window"
  safetyRationale: string;
  nextSafeSprayWindow: string;
}

export interface CooperativeInventoryItem {
  id: string;
  coopName: string;
  distanceKm: number;
  locality: string;
  address: string;
  phone: string;
  commercialBrand: string;
  activeIngredient: string;
  formulation: string; // e.g. "75% WP", "250 SC", "Powder"
  modeOfAction: 'systemic' | 'contact_protectant' | 'biological_antagonist' | 'curative';
  packSize: string;
  priceUsd: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  organicCertified: boolean;
  registrationNumber: string;
  batchExpiry: string;
  recommendedDosePerAcre: string;
}

export interface ProcurementOrder {
  orderId: string;
  reservedAt: string;
  pickupPassCode: string;
  coopName: string;
  coopAddress: string;
  coopPhone: string;
  farmerName?: string;
  cropType: string;
  acreage: number;
  selectedItems: Array<{
    item: CooperativeInventoryItem;
    quantity: number;
    subtotal: number;
  }>;
  totalCostUsd: number;
  pickupStatus: 'reserved' | 'ready_for_pickup' | 'collected';
  verificationToken: string;
}

export interface AgentTraceStep {
  id: string;
  timestamp: string;
  stepNumber: number;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'overridden' | 'warning';
  thought: string;
  toolName?: 'fetch_microclimate_data' | 'check_cooperative_inventory';
  toolArguments?: Record<string, any>;
  toolResult?: Record<string, any>;
  durationMs?: number;
}

export interface AgronomistReviewProtocol {
  tripped: boolean;
  triggerReason: string;
  dualPathologyDetected: boolean;
  differentialDiagnoses: string[];
  quarantineActions: string[];
  diagnosticConfidenceScore: number;
  visualEntropyScore: number; // 0 (certain) - 1.0 (highly ambiguous)
  labTestingCode: string;
  recommendedSamples: string;
}

export interface MitigationPlan {
  planId: string;
  createdAt: string;
  cropType: string;
  acreage: number;
  farmLocality: string;
  diseaseName: string;
  scientificName: string;
  pathogenType: PathogenType;
  confidenceScore: number; // 0-100%
  visualEntropy: number; // 0-1
  uncertaintyFlag: boolean;
  imageUrl?: string;
  
  // Explainable pathology
  visualMarkers: VisualMarker[];
  symptomLocalizationAnalysis: string;
  concurrentInfections?: string[];
  
  // Environmental loop
  microclimate: MicroclimateData;
  environmentalOverride: EnvironmentalOverride;
  
  // Supply chain loop
  cooperativeInventory: CooperativeInventoryItem[];
  selectedTreatment: {
    treatmentMode: 'systemic_root_drench' | 'contact_foliar_spray' | 'biological_antagonist' | 'delayed_timed_foliar';
    primaryProduct: CooperativeInventoryItem;
    alternativeProduct?: CooperativeInventoryItem;
    dosageInstructions: string;
    waterVolumeLiters: number;
    tankMixInstructions: string;
    preHarvestIntervalDays: number;
    reEntryIntervalHours: number;
    ppeRequirements: string[];
  };

  // Step-by-step agronomist schedule
  applicationSchedule: Array<{
    phase: string;
    timing: string;
    action: string;
    criticalNotes: string;
  }>;

  // Review protocol if uncertainty flagged
  reviewProtocol?: AgronomistReviewProtocol;

  // Active or draft procurement order
  procurementOrder?: ProcurementOrder;
  
  // Trace of execution
  traceSteps: AgentTraceStep[];
}

export interface PresetBenchmarkCase {
  id: string;
  title: string;
  crop: string;
  location: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  weatherScenario: string;
  imageUrl: string;
  historyNote: string;
  audioTranscript?: string;
  acreage: number;
  coordinates: { lat: number; lng: number };
}
