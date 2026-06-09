/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PromoVoucher, FlashSale, Product } from "../types";
import { Percent, Ticket, Zap, Shield, Plus, Tag, HelpCircle, Save, CheckCircle, Trash2 } from "lucide-react";

interface PromoManagementViewProps {
  vouchers: PromoVoucher[];
  flashSales: FlashSale[];
  products: Product[];
  onAddVoucher: (vch: PromoVoucher) => void;
  onDeleteVoucher: (id: string) => void;
  onToggleFlashSale: (id: string) => void;
}

export default function PromoManagementView({
  vouchers,
  flashSales,
  products,
  onAddVoucher,
  onDeleteVoucher,
  onToggleFlashSale
}: PromoManagementViewProps) {
  // General configs states
  const [cashbackPercent, setCashbackPercent] = useState(5);
  const [referralRewardUSD, setReferralRewardUSD] = useState(3.5);
  const [savedConfigs, setSavedConfigs] = useState(false);

  // Voucher state creation form
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"Percentage" | "Fixed">("Percentage");
  const [value, setValue] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [maxUsage, setMaxUsage] = useState("");

  const triggerSaveGlobalConfigs = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedConfigs(true);
    setTimeout(() => setSavedConfigs(false), 2000);
  };

  const submitVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !value) return;

    const newVoucher: PromoVoucher = {
      id: `vch-${Date.now()}`,
      code: String(code || "").toUpperCase().replace(/\s+/g, ""),
      discountType,
      value: parseFloat(value),
      minPurchase: parseFloat(minPurchase) || 0,
      maxUsage: parseInt(maxUsage) || 100,
      usageCount: 0,
      status: "Active",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // 30 days expiry
    };

    onAddVoucher(newVoucher);
    setCode("");
    setValue("");
    setMinPurchase("");
    setMaxUsage("");
  };

  return (
    <div className="space-y-6">
      {/* Visual Banners list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BANNER 1: SUMMER CAMPAIGN */}
        <div className="rounded-3xl p-6 relative overflow-hidden bg-gradient-to-tr from-sky-650 via-sky-600 to-indigo-600 border border-sky-100 flex flex-col justify-between h-44 shadow-lg shadow-sky-100/50 group">
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all" />
          
          <div className="space-y-1 z-10">
            <span className="text-[9px] font-mono font-bold tracking-widest text-sky-100 bg-white/15 border border-white/20 px-2.5 py-1 rounded-full uppercase">
              Campaign Active
            </span>
            <h3 className="text-base font-bold text-white tracking-tight mt-2 pb-0.5">SUMMER DISCOUNTS PARADISE</h3>
            <p className="text-xs text-sky-50 leading-snug font-medium">Dispatches 20% flat discount vouchers across the whole template catalog.</p>
          </div>

          <div className="flex items-center justify-between z-10 border-t border-white/10 pt-3">
            <span className="text-[10px] font-semibold text-sky-100">Impressions: 4,921 clicks</span>
            <span className="text-xs font-extrabold text-white font-mono tracking-wider bg-white/20 px-2 py-0.5 rounded-md shadow-sm">RAMADHANLAUNCH</span>
          </div>
        </div>

        {/* BANNER 2: API KEY PROMO */}
        <div className="rounded-3xl p-6 relative overflow-hidden bg-gradient-to-tr from-indigo-550 via-indigo-600 to-purple-600 border border-indigo-100 flex flex-col justify-between h-44 shadow-lg shadow-indigo-100/50 group">
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all" />
          
          <div className="space-y-1 z-10">
            <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-100 bg-white/15 border border-white/20 px-2.5 py-1 rounded-full uppercase">
              Ready / Scheduled
            </span>
            <h3 className="text-base font-bold text-white tracking-tight mt-2 pb-0.5">API KEY ENTRANCE BLAST</h3>
            <p className="text-xs text-indigo-50 leading-snug font-medium">Bundles direct discount codes on developer API subscriptions.</p>
          </div>

          <div className="flex items-center justify-between z-10 border-t border-white/10 pt-3">
            <span className="text-[10px] font-semibold text-indigo-100">Trigger: Automated push</span>
            <span className="text-xs font-extrabold text-white font-mono tracking-wider bg-white/20 px-2 py-0.5 rounded-md shadow-sm">APIBLAST10</span>
          </div>
        </div>
      </div>

      {/* Main Campaign controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DISKONS CARDS TABLE & FORM */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Ticket className="w-4.5 h-4.5 text-sky-500 animate-pulse" />
                VOUCHER REGISTRATION MATRIX
              </h3>
              <p className="text-xs text-slate-400 font-medium">Customer checkout coupons</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vouchers lists */}
              <div className="md:col-span-2 space-y-3 max-h-[310px] overflow-y-auto pr-1">
                {vouchers.map((v) => (
                  <div key={v.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold tracking-widest text-slate-800 font-mono bg-white px-2 py-0.5 border border-slate-200 rounded-md shadow-sm">{v.code}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          v.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-200 text-slate-500"
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-slate-400" />
                        Diskon: <span className="font-bold text-slate-700">{v.discountType === "Percentage" ? `${v.value}%` : `$${v.value}`} off</span>
                        &bull; Needs Min Spend: <span className="font-mono font-bold text-slate-700">${v.minPurchase}</span>
                      </p>
                    </div>

                    <div className="text-right flex items-center gap-4">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-600 block">{v.usageCount} / {v.maxUsage} used</span>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Exp: {v.expiryDate}</span>
                      </div>
                      <button
                        onClick={() => onDeleteVoucher(v.id)}
                        className="p-2 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all cursor-pointer"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add form */}
              <form onSubmit={submitVoucher} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-3.5 font-sans text-xs text-slate-600">
                <span className="text-[10px] text-sky-600 font-extrabold block border-b border-slate-200 pb-1.5 uppercase tracking-wider">Instant Voucher Creator</span>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. SPECIAL88"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono font-semibold placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-all shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Type</label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 px-2 py-1.5 rounded-xl font-medium text-slate-700 text-[11px] focus:outline-none focus:border-sky-500 transition-all shadow-sm"
                    >
                      <option value="Percentage">% Percent</option>
                      <option value="Fixed">$ Fixed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Worth / Value</label>
                    <input
                      type="number"
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-xl focus:outline-none focus:border-sky-500 transition-all font-mono font-semibold shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Min Spend ($)</label>
                    <input
                      type="number"
                      value={minPurchase}
                      onChange={(e) => setMinPurchase(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-xl focus:outline-none focus:border-sky-500 transition-all font-mono font-semibold shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Limit Counts</label>
                    <input
                      type="number"
                      value={maxUsage}
                      onChange={(e) => setMaxUsage(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-xl focus:outline-none focus:border-sky-500 transition-all font-mono font-semibold shadow-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer"
                >
                  Generate Coupon code
                </button>
              </form>
            </div>
          </div>

          {/* FLASH SALES SYSTEM CONTROL */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 font-sans">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-4.5 h-4.5 text-sky-500 rotate-12" />
                FLASH SALE ACTIVE STOPOVERS
              </h3>
              <p className="text-xs text-slate-400 font-medium">Extreme time-limited discounts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flashSales.map((fs) => {
                const associatedProduct = products.find(p => p.id === fs.productId);
                return (
                  <div key={fs.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-sky-200 transition-all">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold font-mono">
                        <span>Sale Block ID: {fs.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          fs.isActive ? "bg-amber-105 bg-amber-50 text-amber-600 border border-amber-100" : "bg-slate-200 text-slate-500"
                        }`}>
                          {fs.isActive ? "RUNNING" : "STANDBY"}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 truncate font-sans mt-2.5">
                        {associatedProduct?.title || "Unknown Digital resource"}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-1.5">
                        Price: <span className="line-through text-slate-400">${associatedProduct?.price}</span> &bull; Sale: <span className="text-sky-600 font-extrabold font-mono text-xs">${fs.promoPrice}</span>
                      </p>
                    </div>

                    {/* Progress slider bar */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 mb-1">
                        <span>Items Claimed: {fs.soldCount} of {fs.stockLimit}</span>
                        <span>{Math.round((fs.soldCount / fs.stockLimit) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-sm"
                          style={{ width: `${(fs.soldCount / fs.stockLimit) * 100}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleFlashSale(fs.id)}
                      className={`w-full py-2 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                        fs.isActive
                          ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                          : "bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100"
                      }`}
                    >
                      {fs.isActive ? "Suspend Flash Campaign" : "Trigger Live flash Sale"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* REWARDS & CASHBACK PANEL */}
        <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <Percent className="w-5 h-5 text-sky-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">RETENTION COMMISSION REWARDS</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans mt-0.5">Store commissions configuration</p>
              </div>
            </div>

            {savedConfigs && (
              <div className="p-2.5 mb-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs rounded-xl font-bold font-sans flex items-center gap-1.5 select-none animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Store campaign rules saved & synchronized.
              </div>
            )}

            <form onSubmit={triggerSaveGlobalConfigs} className="space-y-5 font-sans text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-sky-600 font-extrabold block uppercase tracking-wider mb-1.5">Automated Cashback</span>
                <p className="text-[11px] text-slate-500 mb-4.5 leading-relaxed">
                  Sets the automatically credited percentage to customer wallets on every successful checkout order.
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={cashbackPercent}
                    onChange={(e) => setCashbackPercent(parseInt(e.target.value))}
                    className="flex-1 accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                  />
                  <span className="text-slate-800 text-xs font-bold font-mono px-2.5 py-1 bg-white border border-slate-200 rounded-lg shadow-sm shrink-0">
                    {cashbackPercent}%
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-sky-600 font-extrabold block uppercase tracking-wider mb-1.5">Referral Direct Bounty</span>
                <p className="text-[11px] text-slate-500 mb-4.5 leading-relaxed">
                  The flat monetary reward ($) deposited into affiliate balances when their code is used.
                </p>
                <div className="flex items-center justify-between gap-3 font-sans">
                  <span className="text-slate-550 font-bold">$ Rewards / click:</span>
                  <input
                    type="number"
                    step="0.5"
                    value={referralRewardUSD}
                    onChange={(e) => setReferralRewardUSD(parseFloat(e.target.value))}
                    className="w-24 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 outline-none focus:border-sky-500 text-center font-mono font-bold shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-850 hover:bg-slate-900 text-[11px] font-bold text-white rounded-xl transition-all cursor-pointer shadow-lg shadow-slate-100"
              >
                Save financial constants
              </button>
            </form>
          </div>

          <div className="text-[10px] text-slate-400 font-medium font-sans mt-6 leading-relaxed text-center">
            Payout calculations managed securely by Accessra Firebase functions scheduler.
          </div>
        </div>
      </div>
    </div>
  );
}
