import React from 'react';
import { 
  FileCheck2, 
  Droplet, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  DollarSign, 
  QrCode, 
  Printer, 
  CheckCircle, 
  AlertTriangle,
  Beaker,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MitigationPlan } from '../types/bioloop';

interface MitigationCardProps {
  plan: MitigationPlan;
  onReserveOrder: () => void;
  onViewPrintSlip: () => void;
  onOpenReviewModal?: () => void;
  isReserving?: boolean;
}

export const MitigationCard: React.FC<MitigationCardProps> = ({
  plan,
  onReserveOrder,
  onViewPrintSlip,
  onOpenReviewModal,
  isReserving = false,
}) => {
  const {
    diseaseName,
    scientificName,
    pathogenType,
    confidenceScore,
    visualEntropy,
    uncertaintyFlag,
    cropType,
    acreage,
    farmLocality,
    selectedTreatment,
    applicationSchedule,
    environmentalOverride,
    procurementOrder,
  } = plan;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-7 shadow-sm space-y-6">
      {/* Top Banner: Diagnosis & Confidence */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
              BioLoop Mitigation Card
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 capitalize border border-emerald-200">
              {pathogenType} Pathology
            </span>
            {uncertaintyFlag && (
              <button
                type="button"
                onClick={onOpenReviewModal}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 hover:bg-rose-200"
              >
                <AlertTriangle className="w-3 h-3" /> Uncertainty Flagged (Review)
              </button>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {diseaseName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 italic font-serif">
            {scientificName} &bull; Cultivar: {cropType}
          </p>
        </div>

        {/* Confidence & Entropy Pill */}
        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Multimodal Confidence</span>
            <span className="text-base font-extrabold text-emerald-700">
              {confidenceScore.toFixed(1)}%
            </span>
          </div>
          <div className="h-7 w-px bg-slate-200" />
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Visual Entropy</span>
            <span className={`text-base font-extrabold ${uncertaintyFlag ? 'text-rose-600' : 'text-slate-800'}`}>
              {visualEntropy.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Rationale: Why this treatment was chosen based on today's weather */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-emerald-400 uppercase tracking-wider">
            Treatment Strategy & Weather Alignment
          </span>
          <span className="text-slate-400 text-[11px] font-mono">
            Mode: {selectedTreatment.treatmentMode.replace(/_/g, ' ').toUpperCase()}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {environmentalOverride.triggered
            ? environmentalOverride.adaptedTreatmentStrategy
            : 'Clear atmospheric conditions permit standard protective foliar deposition. No wash-off or drift hazard detected.'}
        </p>

        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            <strong>Allocated Product:</strong>{' '}
            <span className="text-white font-semibold">{selectedTreatment.primaryProduct.commercialBrand}</span>{' '}
            ({selectedTreatment.primaryProduct.activeIngredient})
          </div>
          <div>
            <strong>Water Volume:</strong>{' '}
            <span className="text-white font-semibold">{selectedTreatment.waterVolumeLiters} Liters</span> for {acreage} acres
          </div>
        </div>
      </div>

      {/* Agronomic Dosage & Safety Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Application Protocol
          </span>
          <p className="text-slate-800 font-medium leading-relaxed">
            {selectedTreatment.dosageInstructions}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Tank-Mix & Chemistry Instructions
          </span>
          <p className="text-slate-800 font-medium leading-relaxed">
            {selectedTreatment.tankMixInstructions}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Agronomic Intervals & Safety
          </span>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Pre-Harvest (PHI):</span>
            <span className="font-bold text-slate-800">{selectedTreatment.preHarvestIntervalDays} days</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Re-Entry (REI):</span>
            <span className="font-bold text-slate-800">{selectedTreatment.reEntryIntervalHours} hours</span>
          </div>
          <div className="pt-1 border-t border-slate-200">
            <span className="text-[10px] text-slate-500 block">Required PPE:</span>
            <span className="text-[10px] font-medium text-slate-700">
              {selectedTreatment.ppeRequirements.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Application Timeline */}
      <div>
        <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-2.5">
          Application Schedule
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {applicationSchedule.map((phase, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {phase.phase}
                </span>
                <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {phase.timing}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800">{phase.action}</p>
              <p className="text-[11px] text-slate-500 italic">{phase.criticalNotes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prescriptive Fulfillment Slip & Cooperative Reserve */}
      <div className="pt-4 border-t border-slate-200">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/60 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                Cooperative Procurement & Pickup Slip
              </span>
              {procurementOrder && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-800 text-white font-bold">
                  {procurementOrder.pickupPassCode}
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-800">
              Allocated at: <strong>{selectedTreatment.primaryProduct.coopName}</strong> ({selectedTreatment.primaryProduct.distanceKm} km)
            </p>
            <p className="text-xs text-emerald-700">
              Total Order: <strong>${(selectedTreatment.primaryProduct.priceUsd * Math.max(1, Math.ceil(acreage))).toFixed(2)} USD</strong> ({Math.max(1, Math.ceil(acreage))} &times; {selectedTreatment.primaryProduct.packSize})
            </p>
          </div>

          <div className="flex items-center gap-2">
            {procurementOrder ? (
              <button
                type="button"
                onClick={onViewPrintSlip}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>View & Print Pickup Voucher</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onReserveOrder}
                disabled={isReserving}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {isReserving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Reserving Stock...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    <span>Reserve Stock & Issue Pass</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
