/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Eye, ShoppingBag, Percent, ArrowUpRight } from "lucide-react";

export default function AnalyticsView() {
  // Conversion trends data
  const conversionData = [
    { date: "05/29", traffic: 1200, checkouts: 42 },
    { date: "05/30", dateStr: "May 30", traffic: 1450, checkouts: 58 },
    { date: "05/31", traffic: 980, checkouts: 39 },
    { date: "06/01", traffic: 1950, checkouts: 84 },
    { date: "06/02", traffic: 1540, checkouts: 62 },
    { date: "06/03", traffic: 2200, checkouts: 95 },
    { date: "06/04", traffic: 2500, checkouts: 110 }
  ];

  // Most viewed vs most purchased
  const demandData = [
    { name: "Accessra Cloud AI", views: 4200, sales: 840 },
    { name: "Boilerplate Elite", views: 3100, sales: 940 },
    { name: "API Key Injector", views: 1800, sales: 320 },
    { name: "Tailwind Web3", views: 2400, sales: 150 },
    { name: "LLM Course Bundle", views: 2900, sales: 510 }
  ];

  // Retention User Cohort Table Mock (standard matrix representation)
  const cohortRows = [
    { cohort: "May 2026", size: "1,200", m0: "100%", m1: "42%", m2: "35%", m3: "29%" },
    { cohort: "Apr 2026", size: "1,040", m0: "100%", m1: "38%", m2: "29%", m3: "24%" },
    { cohort: "Mar 2026", size: "950", m0: "100%", m1: "41%", m2: "31%", m3: "27%" },
    { cohort: "Feb 2026", size: "820", m0: "100%", m1: "35%", m2: "26%", m3: "20%" }
  ];

  return (
    <div className="space-y-6">
      {/* Overview ratios grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:shadow-md transition-all shadow-sm font-sans">
          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">AVG CONVERSION</span>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1 pb-0.5">4.4%</h3>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +0.4% from last period
          </p>
        </div>

        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:shadow-md transition-all shadow-sm font-sans">
          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">USER RETENTION (M1)</span>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1 pb-0.5">39%</h3>
          <p className="text-[10px] text-slate-500 font-medium mt-1">Median template buyer rate</p>
        </div>

        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:shadow-md transition-all shadow-sm font-sans">
          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">TOTAL HOURLY CALLS</span>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1 pb-0.5">142,000</h3>
          <p className="text-[10px] text-sky-650 font-semibold mt-1">API request volume p/h</p>
        </div>

        <div className="rounded-2xl p-5 bg-white border border-slate-100 hover:shadow-md transition-all shadow-sm font-sans">
          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">BOUNCE RATE</span>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1 pb-0.5">28.2%</h3>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">-5.2% lowest drop-off</p>
        </div>
      </div>

      {/* Graphs list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GRAPH 1: CONVERSION TRAFFIC VS SALES */}
        <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center bg-transparent">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">CONVERSION VELOCITY PIPELINE</h3>
              <p className="text-xs text-slate-400 font-semibold">Comparing daily user traffic vs checkout rates</p>
            </div>
            <span className="text-xs font-mono font-extrabold text-sky-650 shrink-0">VISITS VS CONFIRMED</span>
          </div>

          <div className="h-60 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversionData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "12px",
                    color: "#0f172a",
                    fontSize: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" name="Global traffic p/h" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRAPH 2: MOST VIEWED VS MOST PURCHASED PRODS */}
        <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center bg-transparent">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">INTERACTIVE CATALOG ATTRACTION</h3>
              <p className="text-xs text-slate-400 font-semibold">Product impressions vs conversion sales</p>
            </div>
            <span className="text-xs font-mono font-extrabold text-sky-650 shrink-0">DEMAND MATRIX</span>
          </div>

          <div className="h-60 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData}>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "12px",
                    color: "#0f172a",
                    fontSize: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Bar dataKey="views" fill="#0ea5e9" name="Impressions" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sales" fill="#6366f1" name="Checkouts" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* MATRIX MODULE: COHORT USER RETENTION */}
      <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">RECURRING BUYER COHORT RETENTION</h3>
          <p className="text-xs text-slate-400 font-semibold">Cohort analysis indicating repeat transactions over months</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-center border-collapse text-xs text-slate-600">
            <thead>
              <tr className="bg-slate-50 text-[10px] text-slate-500 uppercase font-bold border-b border-slate-200">
                <th className="p-3 text-left font-sans">Cohort Month</th>
                <th className="p-3 font-sans">New users pool</th>
                <th className="p-3 font-sans">Month 0</th>
                <th className="p-3 font-sans">Month 1</th>
                <th className="p-3 font-sans">Month 2</th>
                <th className="p-3 font-sans">Month 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cohortRows.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/50">
                  <td className="p-3 text-left font-sans font-bold text-slate-800">{row.cohort}</td>
                  <td className="p-3 text-slate-500 font-mono font-semibold">{row.size}</td>

                  {/* Gradient retention visual grids */}
                  <td className="p-3 bg-sky-100/60 text-sky-800 font-extrabold font-mono border-l border-white">{row.m0}</td>
                  <td className="p-3 bg-sky-50 text-sky-700 font-bold font-mono border-l border-white">{row.m1}</td>
                  <td className="p-3 bg-slate-50 text-slate-600 font-semibold font-mono border-l border-white">{row.m2}</td>
                  <td className="p-3 bg-white text-slate-400 font-mono border-l border-white">{row.m3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
