import React from 'react';
import { 
  Store, 
  MapPin, 
  Phone, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck,
  Tag,
  Repeat
} from 'lucide-react';
import { CooperativeInventoryItem } from '../types/bioloop';

interface InventoryRoutingCardProps {
  items: CooperativeInventoryItem[];
  selectedItem: CooperativeInventoryItem;
  onSelectItem: (item: CooperativeInventoryItem) => void;
  acreage: number;
}

export const InventoryRoutingCard: React.FC<InventoryRoutingCardProps> = ({
  items,
  selectedItem,
  onSelectItem,
  acreage,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Cooperative Inventory & Availability
          </h3>
          <p className="text-xs text-slate-500">
            Authorized regional stock within 15 km
          </p>
        </div>

        <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
          Certified Agricultural Supply
        </span>
      </div>

      {/* Cooperative Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {items.map((item) => {
          const isSelected = selectedItem.id === item.id;
          const isOutOfStock = item.stockStatus === 'out_of_stock';
          const calculatedQty = Math.max(1, Math.ceil(acreage * 1));
          const totalEstimated = (item.priceUsd * calculatedQty).toFixed(2);

          return (
            <div
              key={item.id}
              className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500'
                  : isOutOfStock
                  ? 'border-slate-200 bg-slate-50/70 opacity-75'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                {/* Stock status & distance */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1 font-semibold text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.distanceKm} km away</span>
                  </div>

                  {isOutOfStock ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                      <Repeat className="w-3 h-3" /> Auto-Rerouted (Stock Out)
                    </span>
                  ) : item.stockStatus === 'low_stock' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      Low Stock (3 left)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  )}
                </div>

                {/* Brand & Active ingredient */}
                <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                  {item.commercialBrand}
                </h4>
                <p className="text-xs text-emerald-800 font-semibold mb-2">
                  {item.activeIngredient}
                </p>

                {/* Formulation and Details */}
                <div className="space-y-1 text-[11px] text-slate-500 mb-3 bg-white/80 p-2 rounded-lg border border-slate-200/60">
                  <div className="flex justify-between">
                    <span>Cooperative:</span>
                    <span className="font-medium text-slate-700 truncate max-w-[150px]">{item.coopName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Formulation:</span>
                    <span className="font-medium text-slate-700">{item.formulation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit Pack:</span>
                    <span className="font-medium text-slate-700">{item.packSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registration:</span>
                    <span className="font-mono text-slate-600">{item.registrationNumber}</span>
                  </div>
                </div>
              </div>

              {/* Price & Selection */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Unit Price</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ${item.priceUsd.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Est. ${totalEstimated} for {acreage}ac
                  </span>
                </div>

                {isOutOfStock ? (
                  <button
                    disabled
                    className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-400 text-xs font-semibold cursor-not-allowed"
                  >
                    Depleted
                  </button>
                ) : isSelected ? (
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Allocated</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectItem(item)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-semibold transition"
                  >
                    Select Alternative
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
