import React from 'react';
import { 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Sun, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert,
  CalendarClock
} from 'lucide-react';
import { MicroclimateData, EnvironmentalOverride } from '../types/bioloop';

interface MicroclimateCardProps {
  microclimate: MicroclimateData;
  override: EnvironmentalOverride;
}

export const MicroclimateCard: React.FC<MicroclimateCardProps> = ({ microclimate, override }) => {
  const getWashOffBadge = (risk: MicroclimateData['foliarWashOffRisk']) => {
    switch (risk) {
      case 'critical':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          dot: 'bg-rose-500 animate-ping',
          label: 'Critical Wash-Off Hazard',
        };
      case 'moderate':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          dot: 'bg-amber-500',
          label: 'Moderate Wash-Off Risk',
        };
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          dot: 'bg-emerald-500',
          label: 'Safe Canopy Dry-Down',
        };
    }
  };

  const washOffStyle = getWashOffBadge(microclimate.foliarWashOffRisk);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Microclimate & Spray Conditions
          </h3>
          <p className="text-xs text-slate-500">
            Real-time weather validation and foliar wash-off hazard assessment
          </p>
        </div>

        {/* Wash-Off Status Badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${washOffStyle.bg}`}>
          <span className={`w-2 h-2 rounded-full ${washOffStyle.dot}`} />
          <span>{washOffStyle.label}</span>
        </div>
      </div>

      {/* Dynamic Environmental Override Notice Banner */}
      {override.triggered ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300/80 text-amber-950 space-y-2">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-amber-900 flex items-center gap-1.5">
                <span>{override.overrideTrigger}</span>
              </h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                {override.adaptedTreatmentStrategy}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-amber-800">
              <strong>Agronomist Rationale:</strong> {override.safetyRationale}
            </span>
            <div className="flex items-center gap-1 font-semibold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Next Safe Window: {override.nextSafeSprayWindow}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <p>
            <strong>Atmospheric Clearance Granted:</strong> Stable weather verified. Foliar applications will bond cleanly to the cuticle without premature precipitation wash-off.
          </p>
        </div>
      )}

      {/* Key Meteorological Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Air Temp</span>
            <Thermometer className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <div className="text-lg font-extrabold text-slate-800">
            {microclimate.temperatureC}&deg;C
          </div>
          <span className="text-[10px] text-slate-400">Canopy boundary layer</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Relative Humidity</span>
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="text-lg font-extrabold text-slate-800">
            {microclimate.relativeHumidityPct}%
          </div>
          <span className="text-[10px] text-slate-400">Fungal spore trigger</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Leaf Wetness</span>
            <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-lg font-extrabold text-slate-800">
            {microclimate.leafWetnessDurationHours} hrs
          </div>
          <span className="text-[10px] text-slate-400">Continuous surface moisture</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Wind & Gusts</span>
            <Wind className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-lg font-extrabold text-slate-800">
            {microclimate.windSpeedKmH} km/h
          </div>
          <span className="text-[10px] text-slate-400">Gusts up to {microclimate.windGustsKmH} km/h</span>
        </div>
      </div>

      {/* 48-Hour Precipitation Graph */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <span className="font-semibold text-slate-800">
            48-Hour Precipitation Profile
          </span>
          <span className="text-slate-400 text-[11px]">Rain probability & condition</span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {microclimate.precipitationForecast48h.map((point, i) => {
            const isHighRain = point.rainProbability >= 70;
            const isMedRain = point.rainProbability >= 30 && point.rainProbability < 70;
            return (
              <div
                key={i}
                className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-center flex flex-col justify-between"
              >
                <span className="text-[9px] font-mono text-slate-500">{point.hour}</span>
                <div className="my-1">
                  <div
                    className={`h-10 w-full rounded flex items-end justify-center pb-0.5 text-[9px] font-bold ${
                      isHighRain
                        ? 'bg-rose-200 text-rose-900 border-t-2 border-rose-500'
                        : isMedRain
                        ? 'bg-sky-200 text-sky-900 border-t-2 border-sky-500'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {point.rainProbability}%
                  </div>
                </div>
                <span className="text-[8px] text-slate-400 truncate" title={point.condition}>
                  {point.tempC}&deg;C
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
