/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Order } from "../types";
import { Search, Check, Printer, FileText, Star } from "lucide-react";

interface OrderManagementViewProps {
  orders: Order[];
  onVerifyOrder: (id: string) => void;
  onRefundOrder: (id: string) => void;
}

export default function OrderManagementView({ orders, onVerifyOrder, onRefundOrder }: OrderManagementViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeInvoice, setActiveInvoice] = useState<Order | null>(null);

  const statuses = ["All", "Paid", "Pending", "Failed", "Refunded"];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedStatus === "All") return matchesSearch;
    return matchesSearch && order.paymentStatus === selectedStatus;
  });

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 select-none">
      {/* Filtering options bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions by Order ID, Buyer email, or Digital Goods..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium"
          />
        </div>

        <div className="flex gap-2">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedStatus === st
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table list */}
      <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">TX ID & Ref</th>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Digital Product / Goods</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Invoice Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-medium font-sans">
                    No matching transactions found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="p-4">
                      <div className="font-bold text-slate-850 font-mono">{order.id}</div>
                      <div className="text-[10px] text-slate-400 max-w-[120px] truncate font-mono mt-0.5">
                        {order.referenceId}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-650">{order.customerEmail}</td>
                    <td className="p-4">
                      <div className="text-slate-800 font-bold">{order.productTitle}</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        Captured: {new Date(order.date).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded bg-sky-50 text-[10px] font-extrabold text-sky-600 border border-sky-100/50 uppercase font-mono">
                        {order.paymentGateway}
                      </span>
                    </td>
                    <td className="p-4 text-slate-800 font-extrabold font-mono text-sm">${order.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                          order.paymentStatus === "Paid"
                            ? "text-emerald-600"
                            : order.paymentStatus === "Pending"
                            ? "text-amber-600"
                            : "text-rose-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                             order.paymentStatus === "Paid"
                              ? "bg-emerald-500"
                              : order.paymentStatus === "Pending"
                              ? "bg-amber-500 animate-pulse"
                              : "bg-rose-500"
                          }`} />
                          {order.paymentStatus}
                        </span>

                        <span className="text-[10px] text-slate-400 font-medium">
                          Fulfillment: {order.orderStatus}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* MANUAL VERIFICATION TRIGGER */}
                        {order.orderStatus === "Pending Verification" && (
                          <button
                            onClick={() => onVerifyOrder(order.id)}
                            className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100 transition-all text-[11px] flex items-center gap-1 font-bold cursor-pointer"
                            title="Verify and fulfill keys manually"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Verify Fulfill
                          </button>
                        )}

                        {/* REFUND TRIGGER */}
                        {order.paymentStatus === "Paid" && (
                          <button
                            onClick={() => onRefundOrder(order.id)}
                            className="p-1.5 px-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100 transition-all text-[11px] font-bold cursor-pointer"
                            title="Issue Full Refund"
                          >
                            Refund
                          </button>
                        )}

                        <button
                          onClick={() => setActiveInvoice(order)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                          title="View Digital Invoice"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED DIGITAL INVOICE MODAL POPUP */}
      {activeInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveInvoice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-base font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Printable Area */}
            <div id="print-invoice-panel" className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 text-slate-700 space-y-6">
              <div className="flex justify-between items-start border-b border-slate-200/80 pb-4">
                <div>
                  <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-sky-500 animate-pulse" />
                    Accessra Digital Invoice
                  </h2>
                  <p className="text-[10px] text-slate-400 mt-1">Order Dispatch Identifier Registry</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold font-mono text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
                    {activeInvoice.id}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">{new Date(activeInvoice.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Bill Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Billed To:</span>
                  <span className="text-slate-800 font-bold block max-w-[180px] break-all">{activeInvoice.customerEmail}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Country Destination: Indonesia</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Payment Platform:</span>
                  <span className="text-slate-850 font-bold block">{activeInvoice.paymentGateway.toUpperCase()}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block break-all">Ref: {activeInvoice.referenceId}</span>
                </div>
              </div>

              {/* Line items Table */}
              <div className="border-t border-b border-slate-200/80 py-4 my-2 space-y-2">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Product Title / Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between font-bold text-slate-850">
                  <span>{activeInvoice.productTitle}</span>
                  <span className="font-mono text-xs">${activeInvoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Instant Delivery License Package</span>
                  <span>Qty: 1</span>
                </div>
              </div>

              {/* Subtotal Total summaries */}
              <div className="text-right text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-450">Subtotal:</span>
                  <span className="text-slate-850 font-bold">${activeInvoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-100">
                  <span>Processing gateway taxes:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-xs font-extrabold pt-2">
                  <span className="text-sky-600">Total Invoice Amount:</span>
                  <span className="text-slate-850 font-extrabold text-sm">${activeInvoice.amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Dynamic Status Watermark */}
              <div className="flex justify-center py-2.5 border border-dashed border-sky-300 rounded-xl bg-sky-50">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${
                  activeInvoice.paymentStatus === "Paid"
                    ? "text-emerald-600"
                    : activeInvoice.paymentStatus === "Pending"
                    ? "text-amber-600"
                    : "text-rose-600"
                }`}>
                  Secure payment status: {activeInvoice.paymentStatus}
                </span>
              </div>
            </div>

            {/* Print Action elements */}
            <div className="flex gap-2.5 mt-6 font-mono text-xs">
              <button
                onClick={triggerPrint}
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Download / Print Invoice
              </button>
              <button
                onClick={() => setActiveInvoice(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-all font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
