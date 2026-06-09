/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Product, Order, User } from "../types";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from "recharts";
import { DollarSign, Tag, ShoppingCart, UserCheck, ChevronRight, ArrowUpRight, TrendingUp, Sparkles, AlertCircle } from "lucide-react";

interface DashboardViewProps {
  products: Product[];
  orders: Order[];
  users: User[];
  setActiveTab: (tab: string) => void;
}

export default function DashboardView({ products, orders, users, setActiveTab }: DashboardViewProps) {
  // Analytical high-performance metrics calculations
  const totalUsers = users.length;
  const totalSales = orders.filter(o => o.paymentStatus === "Paid").reduce((acc, curr) => acc + curr.amount, 0);
  const totalTransactionsCount = orders.length;
  const activeTransactionsCount = orders.filter(o => o.paymentStatus === "Pending").length;

  // Chart data formatting: Revenue over time (Mock Daily Trend)
  const revenueTrendData = [
    { day: "05/29", revenue: 420 },
    { day: "05/30", revenue: 580 },
    { day: "05/31", revenue: 390 },
    { day: "06/01", revenue: 840 },
    { day: "06/02", revenue: 620 },
    { day: "06/03", revenue: 950 },
    { day: "06/04", revenue: totalSales }
  ];

  // Category analysis
  const categoriesData = [
    { name: "SaaS Utilities", value: 380, fill: "#0369a1" },
    { name: "SaaS Boilerplates", value: 540, fill: "#0ea5e9" },
    { name: "Developer Keys", value: 120, fill: "#38bdf8" },
    { name: "Courses", value: 290, fill: "#6366f1" },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Realtime Overview Stat Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* STAT 1: SALES REVENUE */}
        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:border-sky-300 transition-all flex items-start justify-between shadow-sm hover:shadow-md">
          <div className="space-y-1.55">
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider font-extrabold">Total Revenue</span>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              ${totalSales.toLocaleString()}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +14.2% since yesterday
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* STAT 2: TOTAL REGISTERED */}
        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:border-sky-300 transition-all flex items-start justify-between shadow-sm hover:shadow-md">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider font-extrabold">Registered Users</span>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{totalUsers}</h3>
            <p className="text-[11px] text-sky-600 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Live activity feed active
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* STAT 3: TOTAL TRANSACTIONS */}
        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:border-sky-300 transition-all flex items-start justify-between shadow-sm hover:shadow-md">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider font-extrabold">Transactions</span>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{totalTransactionsCount}</h3>
            <p className="text-[11px] text-slate-500 font-medium select-none">
              Logged & secured
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>

        {/* STAT 4: ACTIVE PENDING VERIFICATIONS */}
        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:border-sky-300 transition-all flex items-start justify-between shadow-sm hover:shadow-md">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider font-extrabold">Pending Verif</span>
            <h3 className="text-2xl font-bold text-slate-850 tracking-tight">{activeTransactionsCount}</h3>
            <p className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              Verification required
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytics Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REVENUE LINE CHART */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-100 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">REVENUE OVERVIEW</h3>
              <p className="text-xs text-slate-400">Merchant checkout velocity updates</p>
            </div>
            <span className="text-[10px] font-bold font-mono px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE TELEMETRY
            </span>
          </div>
          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${v}`} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "12px",
                    color: "#0f172a",
                    fontSize: "12px",
                    fontWeight: "500",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP CATEGORIES SALES */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">CATEGORY ALLOCATION</h3>
            <p className="text-xs text-slate-400 mt-1">Classification breakdown metrics</p>
          </div>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesData} layout="vertical">
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="2 2" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} width={90} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    fontSize: "11px"
                  }}
                />
                <Bar dataKey="value" strokeWidth={1} radius={[0, 4, 4, 0]}>
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              <span>SaaS (38%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Boilerplates (54%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transact & Top Selling List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT REALTIME TRANSACTIONS */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-100 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">REALTIME TRANSACTION STREAM</h3>
              <p className="text-xs text-slate-400">Processing marketplace activity</p>
            </div>
            <button
              onClick={() => setActiveTab("orders")}
              className="text-xs text-sky-600 hover:text-sky-700 font-bold font-mono flex items-center gap-1 cursor-pointer"
            >
              See gateway records
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100/60 flex items-center justify-between hover:bg-slate-100/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl text-xs font-bold font-mono ${
                    order.paymentStatus === "Paid"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : order.paymentStatus === "Pending"
                      ? "bg-amber-50 text-amber-600 border border-amber-100"
                      : "bg-rose-50 text-rose-600 border border-rose-100"
                  }`}>
                    {order.id}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{order.productTitle}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">{order.customerEmail}</p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-850">${order.amount.toFixed(2)}</span>
                    <p className="text-[9px] text-slate-400 font-mono tracking-wider">{String(order.paymentGateway || "-").toUpperCase()}</p>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                    order.paymentStatus === "Paid"
                      ? "bg-emerald-50 text-emerald-600"
                      : order.paymentStatus === "Pending"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-rose-50 text-rose-600"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP DEMAND PRODUCT POOL */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4 pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">TOP SELLING PRODUCTS</h3>
            <p className="text-xs text-slate-400">Highest conversion digital metrics</p>
          </div>

          <div className="space-y-4">
            {products.slice(0, 3).map((prod) => (
              <div key={prod.id} className="flex gap-3">
                <img
                  referrerPolicy="no-referrer"
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{prod.title}</h4>
                  <p className="text-[10px] text-sky-600 font-bold mt-0.5">{prod.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-medium text-slate-400 font-mono">Stock: {prod.stock || "Auto"}</span>
                    <span className="text-xs font-bold text-slate-800 font-mono">
                      ${(prod.promoPrice || prod.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab("products")}
            className="w-full mt-4 py-2.5 text-center rounded-xl bg-slate-50 border border-slate-250/60 text-xs font-bold text-slate-600 hover:bg-slate-105 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            Manage full stock
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
