import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  AlertCircle, 
  ShieldCheck, 
  Search, 
  Info,
  Maximize2
} from 'lucide-react';
import { VisualMarker } from '../types/bioloop';

interface LeafVisualizerProps {
  imageUrl: string;
  markers: VisualMarker[];
  visualEntropy: number;
  uncertaintyFlag: boolean;
  diseaseName: string;
  scientificName: string;
  symptomLocalizationAnalysis: string;
}

export const LeafVisualizer: React.FC<LeafVisualizerProps> = ({
  imageUrl,
  markers,
  visualEntropy,
  uncertaintyFlag,
  diseaseName,
  scientificName,
  symptomLocalizationAnalysis,
}) => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(markers[0]?.id || null);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showPins, setShowPins] = useState<boolean>(true);

  const selectedMarker = markers.find((m) => m.id === selectedMarkerId) || markers[0];

  const getMarkerColor = (type: VisualMarker['markerType']) => {
    switch (type) {
      case 'chlorotic_halo':
        return 'border-amber-400 bg-amber-400/20 text-amber-300';
      case 'fungal_pustule':
        return 'border-sky-300 bg-sky-300/25 text-sky-200';
      case 'target_ring':
        return 'border-orange-500 bg-orange-500/20 text-orange-300';
      case 'water_soaked':
        return 'border-rose-500 bg-rose-500/20 text-rose-300';
      case 'mosaic_mottle':
        return 'border-emerald-400 bg-emerald-400/25 text-emerald-300';
      default:
        return 'border-rose-400 bg-rose-400/20 text-rose-300';
    }
  };

  const getMarkerPinColor = (type: VisualMarker['markerType']) => {
    switch (type) {
      case 'chlorotic_halo':
        return 'bg-amber-400 text-slate-950';
      case 'fungal_pustule':
        return 'bg-cyan-300 text-slate-950';
      case 'target_ring':
        return 'bg-orange-500 text-white';
      case 'water_soaked':
        return 'bg-rose-600 text-white';
      case 'mosaic_mottle':
        return 'bg-emerald-500 text-slate-950';
      default:
        return 'bg-rose-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Visual Pathology Inspection</h3>
          <p className="text-xs text-slate-500">
            Localized foliar symptoms isolated across the leaf lamina
          </p>
        </div>

        {/* Layer Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setShowBoxes(!showBoxes)}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition ${
              showBoxes
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Boundaries</span>
          </button>
          <button
            type="button"
            onClick={() => setShowPins(!showPins)}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition ${
              showPins
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pins</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Leaf Canvas / Viewport */}
        <div className="md:col-span-7">
          <div className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center min-h-[380px] max-h-[520px] select-none p-2">
            <div className="relative inline-block max-w-full max-h-[500px]">
              <img
                src={imageUrl}
                alt="Analyzed leaf specimen"
                className="max-h-[500px] w-auto max-w-full block object-contain pointer-events-none rounded"
              />

              {/* Render Overlay Bounding Boxes & Pins directly on top of the image */}
              <div className="absolute inset-0 pointer-events-auto">
                {markers.map((marker, index) => {
                  const isSelected = selectedMarker?.id === marker.id;
                  const colorClasses = getMarkerColor(marker.markerType);
                  const pinColor = getMarkerPinColor(marker.markerType);

                  return (
                    <React.Fragment key={marker.id}>
                      {/* Bounding Box */}
                      {showBoxes && (
                        <div
                          onClick={() => setSelectedMarkerId(marker.id)}
                          className={`absolute cursor-pointer border-2 transition-all rounded-md ${colorClasses} ${
                            isSelected
                              ? 'ring-2 ring-white shadow-lg shadow-black/50 z-20 opacity-100'
                              : 'opacity-70 hover:opacity-100 z-10'
                          }`}
                          style={{
                            left: `${marker.x}%`,
                            top: `${marker.y}%`,
                            width: `${marker.width}%`,
                            height: `${marker.height}%`,
                          }}
                        >
                          <span className="absolute -top-3 left-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-900/90 text-white whitespace-nowrap shadow">
                            #{index + 1} {marker.label}
                          </span>
                        </div>
                      )}

                      {/* Center Pin Indicator */}
                      {showPins && (
                        <button
                          type="button"
                          onClick={() => setSelectedMarkerId(marker.id)}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-md transition-transform z-30 ${pinColor} ${
                            isSelected ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                          }`}
                          style={{
                            left: `${marker.x + marker.width / 2}%`,
                            top: `${marker.y + marker.height / 2}%`,
                          }}
                          title={marker.label}
                        >
                          {index + 1}
                        </button>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Marker selector chips */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {markers.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setSelectedMarkerId(m.id)}
                className={`px-2.5 py-1 rounded-lg border text-xs whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedMarker?.id === m.id
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>#{idx + 1} {m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Marker Detail Card & Visual Entropy Meter */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-4">
          {/* Selected Marker Deep Dive */}
          {selectedMarker ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Foliar Marker Isolation
                </span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Severity: {selectedMarker.severity.toUpperCase()}
                </span>
              </div>

              <h4 className="font-extrabold text-slate-900 text-sm">{selectedMarker.label}</h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                {selectedMarker.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-500">
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Class Type</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {selectedMarker.markerType.replace('_', ' ')}
                  </span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Bounding Area</span>
                  <span className="font-mono text-slate-800">
                    {selectedMarker.width}% &times; {selectedMarker.height}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 text-slate-400 text-xs">
              Click any pinpoint on the leaf to inspect the histological marker.
            </div>
          )}

          {/* Visual Entropy & Uncertainty Evaluation */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                Visual Entropy Evaluation
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  uncertaintyFlag
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {uncertaintyFlag ? 'Uncertainty Flagged' : 'High Diagnostic Purity'}
              </span>
            </div>

            {/* Entropy Progress Bar */}
            <div>
              <div className="flex justify-between text-[11px] mb-1 font-mono">
                <span className="text-slate-400">Shannon Entropy Index:</span>
                <span className={uncertaintyFlag ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {visualEntropy.toFixed(2)} / 1.00
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-500 ${
                    uncertaintyFlag ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, visualEntropy * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                <span>0.00 (Monoculture certainty)</span>
                <span>Threshold: 0.45</span>
                <span>1.00 (High ambiguity)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {uncertaintyFlag
                ? 'CAUTION: Visual entropy exceeded safe bounds. Multiple conflicting symptom distributions detected. Agronomist review fallback active to prevent chemical misapplication.'
                : 'Foliar symptom markers correlate with high confidence to canonical pathology patterns.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
