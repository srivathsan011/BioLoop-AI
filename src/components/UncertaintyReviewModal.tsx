import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Beaker, 
  PhoneCall, 
  X,
  Building2
} from 'lucide-react';
import { AgronomistReviewProtocol } from '../types/bioloop';

interface UncertaintyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  protocol?: AgronomistReviewProtocol;
  cropType: string;
}

export const UncertaintyReviewModal: React.FC<UncertaintyReviewModalProps> = ({
  isOpen,
  onClose,
  protocol,
  cropType,
}) => {
  if (!isOpen || !protocol) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-rose-200 rounded-2xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-200 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-rose-950">Agronomist Fallback Review Protocol</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                Safety-First Gate
              </span>
            </div>
            <p className="text-xs text-rose-800">
              Autonomous mitigation paused due to high visual entropy / concurrent infection cues
            </p>
          </div>
        </div>

        {/* Reason card */}
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Uncertainty Trigger Analysis</span>
            </span>
            <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-rose-200">
              Entropy: {protocol.visualEntropyScore.toFixed(2)} / 1.00
            </span>
          </div>
          <p className="leading-relaxed">
            {protocol.triggerReason}
          </p>
        </div>

        {/* Differential Diagnoses */}
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            <Beaker className="w-4 h-4 text-slate-600" />
            <span>Differential Diagnostic Distribution</span>
          </h4>
          <div className="space-y-1.5">
            {protocol.differentialDiagnoses.map((diag, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                <span>{diag}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  Cand. #{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio-Security Quarantine Instructions */}
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Immediate Bio-Security Containment Steps</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200">
            {protocol.quarantineActions.map((action, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Laboratory PCR Submission Voucher */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Plant Pathology Laboratory Referral</span>
            </span>
            <span className="font-mono text-emerald-400 font-bold bg-slate-800 px-2 py-0.5 rounded">
              {protocol.labTestingCode}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {protocol.recommendedSamples}
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Acknowledge & Apply Containment
          </button>
        </div>
      </div>
    </div>
  );
};
