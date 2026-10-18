import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Mic, 
  Square
} from 'lucide-react';
import { PRESET_BENCHMARK_CASES } from '../data/presets';

interface IngestionSectionProps {
  onRunAgent: (params: {
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
  }) => void;
  isLoading: boolean;
  activePresetId?: string;
  onSelectPreset: (presetId: string) => void;
}

export const IngestionSection: React.FC<IngestionSectionProps> = ({
  onRunAgent,
  isLoading,
  activePresetId,
  onSelectPreset,
}) => {
  const currentPreset = PRESET_BENCHMARK_CASES.find((p) => p.id === activePresetId) || PRESET_BENCHMARK_CASES[0];

  const [cropType, setCropType] = useState<string>(currentPreset.crop);
  const [locality, setLocality] = useState<string>(currentPreset.location);
  const [latitude, setLatitude] = useState<number>(currentPreset.coordinates.lat);
  const [longitude, setLongitude] = useState<number>(currentPreset.coordinates.lng);
  const [acreage, setAcreage] = useState<number>(currentPreset.acreage);
  const [historyNote, setHistoryNote] = useState<string>(currentPreset.historyNote);
  const [imagePreview, setImagePreview] = useState<string>(currentPreset.imageUrl);
  const [weatherOverride, setWeatherOverride] = useState<'rain_imminent' | 'dry_clear' | 'wind_hazard' | undefined>(
    activePresetId === 'case_potato_early_blight' ? 'dry_clear' :
    activePresetId === 'case_maize_leaf_blight_wind' ? 'wind_hazard' : 'rain_imminent'
  );

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioTranscript, setAudioTranscript] = useState<string>(currentPreset.audioTranscript || '');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePresetChange = (presetId: string) => {
    onSelectPreset(presetId);
    const p = PRESET_BENCHMARK_CASES.find((item) => item.id === presetId);
    if (p) {
      setCropType(p.crop);
      setLocality(p.location);
      setLatitude(p.coordinates.lat);
      setLongitude(p.coordinates.lng);
      setAcreage(p.acreage);
      setHistoryNote(p.historyNote);
      setImagePreview(p.imageUrl);
      setAudioTranscript(p.audioTranscript || '');
      if (p.id === 'case_potato_early_blight') {
        setWeatherOverride('dry_clear');
      } else if (p.id === 'case_maize_leaf_blight_wind') {
        setWeatherOverride('wind_hazard');
      } else {
        setWeatherOverride('rain_imminent');
      }
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        setAudioTranscript('Voice Note: "Water-soaked dark lesions spreading across lower canopy after rain. Urgent guidance needed."');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setAudioTranscript('Voice Note: "Water-soaked dark lesions spreading across lower canopy after rain. Urgent guidance needed."');
      }, 2000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunAgent({
      imageBase64: imagePreview,
      presetCaseId: activePresetId,
      cropType,
      locality,
      latitude,
      longitude,
      acreage,
      historyNote,
      audioTranscript,
      weatherOverride,
    });
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      {/* Benchmark Presets bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Select Benchmark Case
          </label>
          <span className="text-xs text-slate-400">Pre-loaded scenarios</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PRESET_BENCHMARK_CASES.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetChange(preset.id)}
                className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {preset.title.split('(')[0].trim()}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{preset.location}</p>
                </div>
                <div className="mt-2">
                  <span
                    className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                      preset.badgeColor === 'amber'
                        ? 'bg-amber-100 text-amber-800'
                        : preset.badgeColor === 'emerald'
                        ? 'bg-emerald-100 text-emerald-800'
                        : preset.badgeColor === 'rose'
                        ? 'bg-rose-100 text-rose-800'
                        : preset.badgeColor === 'purple'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {preset.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Leaf Visual */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Leaf Specimen
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Crop specimen"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="text-xs text-slate-400">No image selected</div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 px-3 py-1.5 text-white text-xs flex justify-between items-center">
                <span className="font-semibold text-emerald-300 truncate max-w-[200px]">{cropType}</span>
                <span className="text-[10px] text-slate-300">Specimen Feed</span>
              </div>
            </div>
          </div>

          {/* Right: Field Inputs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Crop Species
                </label>
                <input
                  type="text"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Locality
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Farm Acreage</span>
                  <span className="font-bold text-emerald-700">{acreage} Acres</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={acreage}
                  onChange={(e) => setAcreage(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weather Simulation
                </label>
                <select
                  value={weatherOverride || 'rain_imminent'}
                  onChange={(e) => setWeatherOverride(e.target.value as any)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-slate-800 bg-white"
                >
                  <option value="rain_imminent">Torrential Rain Imminent (&lt;4h, Wash-Off)</option>
                  <option value="dry_clear">Dry & Arid (0% Rain, Foliar Approved)</option>
                  <option value="wind_hazard">High Wind Gusts (&gt;35 km/h, Drift Risk)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Field Observations & History
              </label>
              <textarea
                rows={2}
                value={historyNote}
                onChange={(e) => setHistoryNote(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none text-slate-900 resize-none"
                placeholder="Observed symptoms, spread rate, recent rainfall..."
                required
              />
            </div>

            {/* Voice Note Module */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-700">Voice Note</span>
                {isRecording ? (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-bold"
                  >
                    <Square className="w-2.5 h-2.5 fill-current" /> Stop
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-medium"
                  >
                    <Mic className="w-3 h-3 text-emerald-700" /> Record
                  </button>
                )}
              </div>

              {audioTranscript && (
                <p className="text-[11px] text-slate-600 italic bg-white p-1.5 rounded border border-slate-200 truncate">
                  &ldquo;{audioTranscript}&rdquo;
                </p>
              )}
            </div>

            {/* Primary Action Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Running BioLoop Agent...</span>
                  </>
                ) : (
                  <span>Run Autonomous Agent</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
