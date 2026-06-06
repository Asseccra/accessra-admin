/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { GatewayConfig } from "../types";
import { ShieldAlert, Check, RefreshCw, Layers, ToggleLeft, ToggleRight, HelpCircle, AlertTriangle, Play, Circle, CloudLightning } from "lucide-react";

interface PaymentGatewayViewProps {
  initialConfigs: {
    Duitku: GatewayConfig;
    Xendit: GatewayConfig;
    Midtrans: GatewayConfig;
  };
  errorLogs: Array<{ id: string; timestamp: string; gateway: string; amount: number; code: string; message: string }>;
}

export default function PaymentGatewayView({ initialConfigs, errorLogs }: PaymentGatewayViewProps) {
  const [configs, setConfigs] = useState(initialConfigs);
  const [savedToast, setSavedToast] = useState(false);
  const [testingPing, setTestingPing] = useState<string | null>(null);
  const [callbackSimulatedToast, setCallbackSimulatedToast] = useState(false);
  const [pingStatus, setPingStatus] = useState<Record<string, "Idle" | "Running" | "Success" | "Error">>({
    Duitku: "Idle",
    Xendit: "Idle",
    Midtrans: "Idle"
  });

  const handleToggle = (gateway: "Duitku" | "Xendit" | "Midtrans") => {
    setConfigs(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        isEnabled: !prev[gateway].isEnabled
      }
    }));
  };

  const handleConfigChange = (
    gateway: "Duitku" | "Xendit" | "Midtrans",
    field: keyof GatewayConfig,
    value: any
  ) => {
    setConfigs(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        [field]: value
      }
    }));
  };

  const saveConfiguration = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
    }, 2500);
  };

  const executePingTest = (gateway: string) => {
    setPingStatus(prev => ({ ...prev, [gateway]: "Running" }));
    setTimeout(() => {
      setPingStatus(prev => ({ ...prev, [gateway]: "Success" }));
    }, 1500);
  };

  const triggerSimulatedCallback = () => {
    setCallbackSimulatedToast(true);
    setTimeout(() => {
      setCallbackSimulatedToast(false);
    }, 3500);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header Notification */}
      {savedToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-105 text-emerald-700 text-xs font-sans font-bold flex items-center gap-2.5 animate-fade select-none">
          <Check className="w-4.5 h-4.5 text-emerald-600 animate-bounce" />
          <span>PAYMENT ROUTER HANDSHAKE SAVED: Gateway Webhook callbacks synced to production server successfully.</span>
        </div>
      )}

      {callbackSimulatedToast && (
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-150 text-sky-700 text-xs font-sans font-bold flex items-center gap-2.5 animate-fade select-none">
          <CloudLightning className="w-4.5 h-4.5 text-sky-600 animate-pulse" />
          <span>SIMULATED CALLBACK DISPATCHED: Invoice payload triggered successfully! Check real-time order logs under Dashboard or Order tabs.</span>
        </div>
      )}

      {/* Grid Gateway Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        {(["Duitku", "Xendit", "Midtrans"] as const).map((gateway) => {
          const config = configs[gateway];
          const isEnabled = config.isEnabled;
          return (
            <div
              key={gateway}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between bg-white ${
                isEnabled
                  ? "border-slate-150 shadow-sm hover:shadow-md"
                  : "border-slate-100 opacity-60 hover:opacity-80 search-shadow"
              }`}
            >
              {/* Card Header Toggler */}
              <div className="flex items-center justify-between border-b border-slate-150 pb-4 mb-4 font-sans">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg text-xs font-extrabold shrink-0 ${
                    gateway === "Duitku" ? "text-purple-600 bg-purple-50 border border-purple-100" :
                    gateway === "Xendit" ? "text-cyan-600 bg-cyan-50 border border-cyan-105" :
                    "text-indigo-600 bg-indigo-50 border border-indigo-100"
                  }`}>
                    {gateway[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{gateway}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold font-sans text-left">Router: API Callback</p>
                  </div>
                </div>

                <button onClick={() => handleToggle(gateway)} className="text-slate-500 hover:text-slate-800 cursor-pointer">
                  {isEnabled ? (
                    <span className="text-xs font-sans font-bold text-sky-655 text-sky-600 flex items-center gap-1">
                      ACTIVE <ToggleRight className="w-8 h-8 text-sky-600" />
                    </span>
                  ) : (
                    <span className="text-xs font-sans font-bold text-slate-400 flex items-center gap-1">
                      DISABLED <ToggleLeft className="w-8 h-8 text-slate-200" />
                    </span>
                  )}
                </button>
              </div>

              {/* Input Configuration settings */}
              <form onSubmit={saveConfiguration} className="space-y-4 font-sans text-xs text-slate-600 font-medium">
                <div>
                  <label className="block text-slate-500 font-bold text-[10px] mb-1">MERCHANT CODE / ORG ID</label>
                  <input
                    type="text"
                    value={config.merchantCode}
                    onChange={(e) => handleConfigChange(gateway, "merchantCode", e.target.value)}
                    disabled={!isEnabled}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none disabled:opacity-45 transition-all font-sans text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold text-[10px] mb-1">SECRET API CREDENTIAL KEY</label>
                  <input
                    type="password"
                    value={config.apiKey}
                    onChange={(e) => handleConfigChange(gateway, "apiKey", e.target.value)}
                    disabled={!isEnabled}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none disabled:opacity-45 transition-all font-sans"
                  />
                </div>

                {/* Callback URL visual section */}
                <div className="p-3 rounded-xl bg-slate-55 bg-slate-50 border border-slate-150 animate-pulse">
                  <div className="flex items-center justify-between text-[10px] text-slate-450 font-bold mb-1.5">
                    <span>WEBHOOK IPN CALLBACK URL</span>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-450 shrink-0 cursor-help" title="Set this URL in your payment dashboard callback settings." />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={config.callbackUrl}
                    className="w-full bg-transparent text-sky-650 text-[10px] truncate select-all focus:outline-none font-mono font-semibold"
                  />
                </div>

                {/* Sandbox environment selectors */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-[10px] text-slate-500 font-bold">Sandbox Test Environment</span>
                  <label className="flex items-center gap-1.5 cursor-pointer font-sans text-xs select-none">
                    <input
                      type="checkbox"
                      checked={config.sandbox}
                      onChange={(e) => handleConfigChange(gateway, "sandbox", e.target.checked)}
                      disabled={!isEnabled}
                      className="accent-sky-550 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-605 text-slate-600 font-bold">Sandbox enabled</span>
                  </label>
                </div>

                {/* Actions inside Gateways */}
                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={!isEnabled}
                    className="flex-1 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-[11px] font-bold text-white disabled:opacity-45 transition-all cursor-pointer shadow-md shadow-sky-500/10"
                  >
                    Save configuration
                  </button>
                  <button
                    type="button"
                    onClick={() => executePingTest(gateway)}
                    disabled={!isEnabled || pingStatus[gateway] === "Running"}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center gap-1 disabled:opacity-45 transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${pingStatus[gateway] === "Running" ? "animate-spin" : ""}`} />
                    {pingStatus[gateway] === "Success" ? "Online" : "Ping test"}
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>

      {/* Gateway Logging Errors Stream and Callback Monitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        {/* PAYMENT SYSTEM ERROR MONITOR LOGS */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-3 border-b border-slate-105 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">GATEWAY WARNING CODES & ERROR LOGS</h3>
              <p className="text-xs text-slate-400 font-semibold">Anti-fail redundancy monitor</p>
            </div>
            <span className="text-[10px] font-sans font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600">
              ANTI-FAIL LIVE
            </span>
          </div>

          <div className="space-y-3 font-sans text-xs max-h-56 overflow-y-auto pr-1">
            {errorLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-rose-55 bg-rose-50 border border-rose-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 px-1.5 rounded bg-rose-105 bg-rose-100 border border-rose-150 text-rose-600 font-extrabold text-[9px]">
                      {log.code}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      Gateway ID: {log.gateway} // TX: ${log.amount}
                    </span>
                  </div>
                  <p className="text-slate-650 text-[11px] mt-1.5 leading-relaxed font-sans font-medium">{log.message}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold shrink-0 select-none">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WEBHOOK CALLBACK SIMULATION TERMINAL */}
        <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
              <CloudLightning className="w-4.5 h-4.5 text-sky-500" />
              CALLBACK SIMULATOR
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Simulates payment response from API nodes</p>
          </div>

          <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-150 font-sans text-xs text-slate-600 space-y-2">
            <div className="flex justify-between border-b border-slate-205 border-slate-200 pb-1.5">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Node Status:</span>
              <span className="text-emerald-600 font-extrabold uppercase text-[10px]">Idle / Ready</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal font-medium">
              Use this tool to dispatch simulated callback payloads containing random invoice data, mimicking a successful transaction confirmation.
            </p>
          </div>

          <button
            onClick={triggerSimulatedCallback}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-sky-500/10 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Trigger Callback payload simulation
          </button>
        </div>
      </div>
    </div>
  );
}
