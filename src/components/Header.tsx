import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

interface HeaderProps {
  onSelectPreset: (presetId: string) => void;
  activePresetId?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  BioLoop AI
                </span>
                <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Closed-Loop Agronomy
                </span>
              </div>
            </div>
          </div>

          {/* System Telemetry Badges */}
          <div className="hidden md:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/60 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Gemini 3.8 Flash Agent</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/60 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Live Microclimate Radar</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/60 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Cooperative Stock Mesh</span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowArchitectureModal(true)}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              System Concept
            </button>
          </div>
        </div>
      </header>

      {/* Concept Modal */}
      {showArchitectureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-xl w-full p-6 text-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowArchitectureModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-lg font-bold p-1"
            >
              &times;
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-white">BioLoop AI: Closed-Loop Architecture</h3>
              <p className="text-xs text-slate-400 mt-0.5">Moving beyond passive image labels to physical supply fulfillment</p>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="font-semibold text-rose-300 mb-1">Traditional Limitation</div>
                <p className="text-slate-400 leading-relaxed">
                  Most plant health systems output only a classification label (e.g. &ldquo;Late Blight - 92%&rdquo;). This leaves farmers without weather-grounded treatment plans or verified local inventory.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="font-semibold text-emerald-300 mb-1">BioLoop Solution</div>
                <ul className="text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
                  <li><strong>Multimodal Localization:</strong> Highlights chlorotic halos and necrotic areas; quantifies visual entropy.</li>
                  <li><strong>Autonomous Weather Gates:</strong> Queries hyper-local weather. If downpours are imminent, cancels foliar sprays to prevent wash-off and switches to root drenching or timed windows.</li>
                  <li><strong>Inventory Routing:</strong> Cross-references physical stock across local farmer cooperatives and issues reservations.</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-semibold text-slate-200">Autonomous Reasoning</div>
                  <p className="text-slate-500 mt-0.5">Dual tools called dynamically based on visual evidence and atmospheric risk.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-semibold text-slate-200">Economic Protection</div>
                  <p className="text-slate-500 mt-0.5">Prevents costly chemical wash-off and ensures treatment availability.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowArchitectureModal(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
