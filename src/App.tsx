import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sprout, 
  Layers, 
  CloudRain, 
  Store, 
  Cpu, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  QrCode,
  AlertTriangle
} from 'lucide-react';
import { Header } from './components/Header';
import { IngestionSection } from './components/IngestionSection';
import { LeafVisualizer } from './components/LeafVisualizer';
import { MicroclimateCard } from './components/MicroclimateCard';
import { InventoryRoutingCard } from './components/InventoryRoutingCard';
import { MitigationCard } from './components/MitigationCard';
import { AgentReasoningTrace } from './components/AgentReasoningTrace';
import { UncertaintyReviewModal } from './components/UncertaintyReviewModal';
import { PrintableDispatchSlip } from './components/PrintableDispatchSlip';
import { MitigationPlan, CooperativeInventoryItem } from './types/bioloop';
import { PRESET_BENCHMARK_CASES } from './data/presets';
import { runBioLoopAgent } from './services/geminiAgent';

export default function App() {
  const [activePresetId, setActivePresetId] = useState<string>('case_tomato_late_blight');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(PRESET_BENCHMARK_CASES[0].imageUrl);
  const [plan, setPlan] = useState<MitigationPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pathology' | 'microclimate' | 'cooperative' | 'agent_trace'>('all');
  const [showPrintSlip, setShowPrintSlip] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [isReserving, setIsReserving] = useState<boolean>(false);

  // Initialize with the first benchmark preset on load so the interface is immediately populated
  useEffect(() => {
    const initDefaultPreset = async () => {
      const defaultPreset = PRESET_BENCHMARK_CASES[0];
      const initialPlan = await runBioLoopAgent({
        imageBase64: defaultPreset.imageUrl,
        presetCaseId: defaultPreset.id,
        cropType: defaultPreset.crop,
        locality: defaultPreset.location,
        latitude: defaultPreset.coordinates.lat,
        longitude: defaultPreset.coordinates.lng,
        acreage: defaultPreset.acreage,
        historyNote: defaultPreset.historyNote,
        audioTranscript: defaultPreset.audioTranscript,
        weatherOverride: 'rain_imminent',
      });
      setPlan(initialPlan);
    };

    initDefaultPreset();
  }, []);

  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const p = PRESET_BENCHMARK_CASES.find((item) => item.id === presetId);
    if (p) {
      setCurrentImageUrl(p.imageUrl);
    }
  };

  const handleRunAgent = async (params: {
    imageBase64: string;
    presetCaseId?: string;
    cropType: string;
    locality: string;
    latitude: number;
    longitude: number;
    acreage: number;
    historyNote: string;
    audioTranscript?: string;
    weatherOverride?: 'rain_imminent' | 'dry_clear' | 'wind_hazard';
  }) => {
    setIsLoading(true);
    if (params.imageBase64) {
      setCurrentImageUrl(params.imageBase64);
    }
    try {
      // First try backend API endpoint
      const res = await fetch('/api/agent/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.plan) {
          setPlan(data.plan);
          if (data.plan.uncertaintyFlag) {
            setShowReviewModal(true);
          }
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('API fetch encountered error, fallback to direct client agent engine:', e);
    }

    // Direct fallback
    try {
      const resultPlan = await runBioLoopAgent(params);
      setPlan(resultPlan);
      if (resultPlan.uncertaintyFlag) {
        setShowReviewModal(true);
      }
    } catch (err) {
      console.error('Failed to run agent:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectItem = (item: CooperativeInventoryItem) => {
    if (!plan) return;
    setPlan({
      ...plan,
      selectedTreatment: {
        ...plan.selectedTreatment,
        primaryProduct: item,
      },
    });
  };

  const handleReserveOrder = () => {
    if (!plan) return;
    setIsReserving(true);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6'],
      });

      // Update plan with active reservation
      const randCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const order = {
        orderId: `BL-${Date.now().toString().slice(-6)}-${randCode.slice(0, 3)}`,
        reservedAt: new Date().toISOString(),
        pickupPassCode: `PASS-${randCode}`,
        coopName: plan.selectedTreatment.primaryProduct.coopName,
        coopAddress: plan.selectedTreatment.primaryProduct.address,
        coopPhone: plan.selectedTreatment.primaryProduct.phone,
        farmerName: 'Verified Cooperative Member',
        cropType: plan.cropType,
        acreage: plan.acreage,
        selectedItems: [
          {
            item: plan.selectedTreatment.primaryProduct,
            quantity: Math.max(1, Math.ceil(plan.acreage)),
            subtotal: Math.round(plan.selectedTreatment.primaryProduct.priceUsd * Math.max(1, Math.ceil(plan.acreage)) * 100) / 100,
          },
        ],
        totalCostUsd: Math.round(plan.selectedTreatment.primaryProduct.priceUsd * Math.max(1, Math.ceil(plan.acreage)) * 100) / 100,
        pickupStatus: 'reserved' as const,
        verificationToken: `v1.jwt.agri-coop.${randCode}.${Date.now()}`,
      };

      setPlan({
        ...plan,
        procurementOrder: order,
      });

      setIsReserving(false);
      setShowPrintSlip(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Global Navigation Header */}
      <Header
        onSelectPreset={handleSelectPreset}
        activePresetId={activePresetId}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        {/* Slim Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Autonomous Crop Pathology & Supply Fulfillment
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Multimodal leaf diagnosis coupled with real-time weather wash-off validation and cooperative stock reservation.
            </p>
          </div>
        </div>

        {/* Small How to Use Manual */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">How to Use</span>
            <span className="text-[11px] text-slate-400">3-Step Autonomous Flow</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <span className="font-semibold text-slate-800 block">Select or Upload</span>
                <span className="text-slate-500 text-[11px]">Choose a benchmark case or upload your own leaf image.</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <span className="font-semibold text-slate-800 block">Run Agent</span>
                <span className="text-slate-500 text-[11px]">Validates visual pathology, localized weather, and wash-off risk.</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <span className="font-semibold text-slate-800 block">Fulfillment Pass</span>
                <span className="text-slate-500 text-[11px]">Inspect weather-safe dosage and reserve stock at the local cooperative.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Ingestion & Field Context */}
        <IngestionSection
          onRunAgent={handleRunAgent}
          isLoading={isLoading}
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
        />

        {/* View Switcher Tabs */}
        {plan && (
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setActiveTab('pathology')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  activeTab === 'pathology'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Visual Pathology
              </button>

              <button
                onClick={() => setActiveTab('microclimate')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  activeTab === 'microclimate'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Microclimate & Overrides
              </button>

              <button
                onClick={() => setActiveTab('cooperative')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  activeTab === 'cooperative'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Cooperative Inventory
              </button>

              <button
                onClick={() => setActiveTab('agent_trace')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  activeTab === 'agent_trace'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Agent Trace ({plan.traceSteps.length})
              </button>
            </div>

            {plan.procurementOrder && (
              <button
                onClick={() => setShowPrintSlip(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Pickup Pass: {plan.procurementOrder.pickupPassCode}</span>
              </button>
            )}
          </div>
        )}

        {/* Section 2: Agent Results & Mitigation Dashboard */}
        {plan && (
          <div className="space-y-6 animate-fade-in">
            {/* Primary Mitigation Card always visible */}
            {(activeTab === 'all' || activeTab === 'pathology') && (
              <MitigationCard
                plan={plan}
                onReserveOrder={handleReserveOrder}
                onViewPrintSlip={() => setShowPrintSlip(true)}
                onOpenReviewModal={() => setShowReviewModal(true)}
                isReserving={isReserving}
              />
            )}

            {/* Explainable Leaf Visualizer */}
            {(activeTab === 'all' || activeTab === 'pathology') && (
              <LeafVisualizer
                imageUrl={plan.imageUrl || currentImageUrl}
                markers={plan.visualMarkers}
                visualEntropy={plan.visualEntropy}
                uncertaintyFlag={plan.uncertaintyFlag}
                diseaseName={plan.diseaseName}
                scientificName={plan.scientificName}
                symptomLocalizationAnalysis={plan.symptomLocalizationAnalysis}
              />
            )}

            {/* Microclimate Card */}
            {(activeTab === 'all' || activeTab === 'microclimate') && (
              <MicroclimateCard
                microclimate={plan.microclimate}
                override={plan.environmentalOverride}
              />
            )}

            {/* Regional Cooperative Inventory Routing */}
            {(activeTab === 'all' || activeTab === 'cooperative') && (
              <InventoryRoutingCard
                items={plan.cooperativeInventory}
                selectedItem={plan.selectedTreatment.primaryProduct}
                onSelectItem={handleSelectItem}
                acreage={plan.acreage}
              />
            )}

            {/* Real-Time Agent Reasoning Trace */}
            {(activeTab === 'all' || activeTab === 'agent_trace') && (
              <AgentReasoningTrace steps={plan.traceSteps} />
            )}
          </div>
        )}
      </main>

      {/* Uncertainty Review Modal */}
      {plan && (
        <UncertaintyReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          protocol={plan.reviewProtocol}
          cropType={plan.cropType}
        />
      )}

      {/* Printable Cooperative Dispatch Slip */}
      {plan?.procurementOrder && (
        <PrintableDispatchSlip
          order={plan.procurementOrder}
          plan={plan}
          isOpen={showPrintSlip}
          onClose={() => setShowPrintSlip(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">BioLoop AI</span>
            <span>&bull; Autonomous Closed-Loop Agronomic Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Gemini 3.8 Multimodal & Tools</span>
            <span>&bull;</span>
            <span>Verified Cooperative Supply Mesh</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
