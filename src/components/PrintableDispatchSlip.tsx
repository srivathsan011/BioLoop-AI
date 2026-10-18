import React from 'react';
import { 
  Printer, 
  X, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Sprout,
  QrCode
} from 'lucide-react';
import { ProcurementOrder, MitigationPlan } from '../types/bioloop';

interface PrintableDispatchSlipProps {
  order: ProcurementOrder;
  plan: MitigationPlan;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableDispatchSlip: React.FC<PrintableDispatchSlipProps> = ({
  order,
  plan,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Modal Controls - Hidden during print */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Cooperative Procurement Pass</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Voucher</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 text-lg font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Pass Container */}
        <div id="printable-slip" className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50/50 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">BIOLOOP AI</h2>
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Autonomous Agro-Supply Dispatch Voucher
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Voucher Pass Code</span>
              <span className="text-sm font-black font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                {order.pickupPassCode}
              </span>
            </div>
          </div>

          {/* Farmer & Field Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[9px] font-bold uppercase text-slate-400 block">Order ID</span>
              <span className="font-mono font-bold text-slate-800">{order.orderId}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase text-slate-400 block">Crop & Acreage</span>
              <span className="font-bold text-slate-800">{order.cropType} ({order.acreage} ac)</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase text-slate-400 block">Target Pathology</span>
              <span className="font-bold text-rose-700">{plan.diseaseName}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase text-slate-400 block">Issued Timestamp</span>
              <span className="text-slate-600">{new Date(order.reservedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Allocated Physical Inputs */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Prescribed & Reserved Inputs for Smallholder Allocation
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Commercial Product</th>
                    <th className="py-2 px-3">Active Ingredient</th>
                    <th className="py-2 px-3">Pack & Qty</th>
                    <th className="py-2 px-3 text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.selectedItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 font-bold text-slate-800">
                        {item.item.commercialBrand}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-800 text-[11px]">
                        {item.item.activeIngredient}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {item.quantity} &times; {item.item.packSize}
                      </td>
                      <td className="py-2.5 px-3 text-right font-extrabold text-slate-900">
                        ${item.subtotal.toFixed(2)} USD
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fulfillment Cooperative Location */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[9px] font-bold uppercase text-slate-500 block mb-0.5">
                Authorized Distribution Depot
              </span>
              <h5 className="font-extrabold text-slate-900">{order.coopName}</h5>
              <p className="text-slate-600 text-[11px] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                <span>{order.coopAddress}</span>
              </p>
              <p className="text-slate-600 text-[11px] flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>{order.coopPhone}</span>
              </p>
            </div>

            {/* QR Mock & Auth token */}
            <div className="flex items-center justify-end gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
              <div className="text-right">
                <span className="text-[9px] font-bold uppercase text-slate-500 block">Cryptographic Token</span>
                <span className="font-mono text-[9px] text-slate-600 break-all block max-w-[170px]">
                  {order.verificationToken}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-1">
                  <CheckCircle2 className="w-3 h-3" /> Priority Reservation Active
                </span>
              </div>
              <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
            </div>
          </div>

          {/* Weather Guidance Notice */}
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950">
            <strong>Application Guidance:</strong> {plan.environmentalOverride.adaptedTreatmentStrategy}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 text-center text-xs text-slate-400 print:hidden">
          Present this digital or printed pass at the cooperative counter for immediate inventory release.
        </div>
      </div>
    </div>
  );
};
