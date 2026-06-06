/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SupportTicket } from "../types";
import { MessageSquare, Send, CheckSquare, Phone, HeartHandshake, AlertCircle, Info } from "lucide-react";

interface CustomerSupportViewProps {
  tickets: SupportTicket[];
  onReplyTicket: (ticketId: string, text: string) => void;
  onResolveTicket: (ticketId: string) => void;
}

export default function CustomerSupportView({ tickets, onReplyTicket, onResolveTicket }: CustomerSupportViewProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || "");
  const [replyText, setReplyText] = useState("");
  const [whatsAppNum, setWhatsAppNum] = useState("+62 813-8821-2900");
  const [waSaved, setWaSaved] = useState(false);

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !activeTicket) return;

    onReplyTicket(activeTicket.id, replyText);
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: CHAT LISTS AND WHATSAPP CONFIG */}
        <div className="space-y-6">
          {/* SECURE WHATSAPP DISPATCHER */}
          <div className="p-5 rounded-3xl border border-slate-100 bg-white shadow-sm">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Phone className="w-4.5 h-4.5 text-sky-500" />
              INTEGRASI WHATSAPP GATEWAY
            </h3>
            <p className="text-[11px] text-slate-450 font-medium mb-4 leading-normal font-sans">
              Redirects users directly to active support specialists on WhatsApp when tickets require off-site verification.
            </p>

            {waSaved && (
              <div className="p-2 mb-3 bg-emerald-50 border border-emerald-150 text-emerald-650 text-[11px] rounded-xl font-bold font-sans select-none animate-pulse">
                WhatsApp redirection updated.
              </div>
            )}

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">WhatsApp CS Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={whatsAppNum}
                    onChange={(e) => setWhatsAppNum(e.target.value)}
                    placeholder="+62..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-all font-sans"
                  />
                  <button
                    onClick={() => {
                       setWaSaved(true);
                       setTimeout(() => setWaSaved(false), 2000);
                    }}
                    className="px-3.5 bg-sky-600 hover:bg-sky-700 font-bold rounded-xl text-white transition-all text-[11px] cursor-pointer shadow-md shadow-sky-500/10"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Instant WhatsApp simulation */}
              <a
                href={`https://wa.me/${whatsAppNum.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 mt-2 text-center shadow-lg shadow-emerald-100 cursor-pointer"
              >
                Test WhatsApp trigger
              </a>
            </div>
          </div>

          {/* ACTIVE INBOX QUEUE */}
          <div className="p-5 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">SUPPORT HELP DESK</h3>
              <p className="text-[10px] text-slate-400 font-semibold font-sans mt-0.5">Real-time web & complaint queues</p>
            </div>

            <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
              {tickets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col gap-2 cursor-pointer ${
                    selectedTicketId === t.id
                      ? "bg-sky-50 border-sky-305 text-sky-850 hover:bg-sky-50 border-sky-300"
                      : "bg-slate-50 border-transparent text-slate-650 hover:bg-slate-100/60 hover:border-slate-200/50"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 font-bold">
                    <span>{t.id} &bull; {t.channel.toUpperCase()}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold ${
                      t.status === "Open" ? "bg-rose-50 text-rose-600 border border-rose-100" :
                      t.status === "Processing" ? "bg-amber-50 text-amber-650 border border-amber-100" :
                      "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-extrabold text-slate-800 truncate font-sans leading-tight">
                    {t.subject}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[120px] font-sans font-semibold">{t.customerName}</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-450 font-bold font-mono shadow-sm">
                      {t.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE SUPPORT CONVERSATION CONTAINER */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-100 bg-white shadow-md flex flex-col justify-between h-[498px]">
          {activeTicket ? (
            <>
              {/* Box Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="min-w-0">
                  <span className="text-[10px] text-sky-600 font-bold font-mono uppercase tracking-wider block mb-0.5">
                    Queue Area // ID: {activeTicket.id}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 truncate font-sans leading-tight">
                    {activeTicket.subject}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold font-sans mt-0.5 truncate">
                    Buyer: {activeTicket.customerName} ({activeTicket.customerEmail})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {activeTicket.status !== "Resolved" && (
                    <button
                      onClick={() => onResolveTicket(activeTicket.id)}
                      className="p-1.5 px-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100 text-xs font-bold rounded-xl font-mono transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>

              {/* Chat Message Bubble Lists */}
              <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-1 font-sans text-xs scrollbar-thin">
                <div className="p-3 bg-sky-50 border border-sky-100 rounded-2xl flex items-start gap-2.5">
                  <Info className="w-4.5 h-4.5 text-sky-550 shrink-0 mt-0.5 animate-bounce" />
                  <p className="text-[11px] text-sky-700 font-semibold leading-relaxed font-sans">
                    Always verify gateway order transactions hash inside the payments logs system before generating unique serial codes manual deliveries.
                  </p>
                </div>

                {activeTicket.messages.map((m) => {
                  const isAdmin = m.sender === "admin";
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col max-w-[80%] ${isAdmin ? "ml-auto items-end" : "mr-auto items-start"}`}
                    >
                      <span className="text-[10px] text-slate-400 font-mono mb-1 select-none font-bold">
                        {isAdmin ? "SUPPORT AGENT" : activeTicket.customerName.toUpperCase()} &bull; {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      <div className={`p-3.5 rounded-2xl font-sans ${
                        isAdmin
                          ? "bg-sky-600 text-white rounded-tr-none shadow-md shadow-sky-500/10 font-medium"
                          : "bg-slate-50 border border-slate-150 text-slate-700 rounded-tl-none font-medium"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Message Inputs */}
              <form onSubmit={handleSendReply} className="flex gap-2.5 border-t border-slate-100 pt-4">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Address or type response client concerns..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-2xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-sans"
                  required
                />
                <button
                  type="submit"
                  className="px-4.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl transition-all flex items-center justify-center gap-1 shadow-lg shadow-sky-500/10 cursor-pointer"
                >
                  <Send className="w-4 h-4 font-bold" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-450 py-16">
              <MessageSquare className="w-12 h-12 text-slate-200 mb-2 animate-pulse" />
              <p className="text-xs font-bold font-sans">No active complaints selected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
