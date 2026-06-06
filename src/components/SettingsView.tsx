/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AppSettings } from "../types";
import { Mail, ShieldCheck, Bell, Sparkles, ToggleLeft, ToggleRight, Radio, Save, Sliders, ServerCrash } from "lucide-react";

interface SettingsViewProps {
  appSettings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export default function SettingsView({ appSettings, onUpdateSettings }: SettingsViewProps) {
  const [settings, setSettings] = useState(appSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggleMaintenance = () => {
    setSettings(prev => ({
      ...prev,
      maintenanceMode: !prev.maintenanceMode
    }));
  };

  const handleSettingChange = (field: keyof AppSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-sans font-bold flex items-center gap-2.5 animate-fade">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 animate-bounce" />
          <span>PRODUCTION PARAMETERS SHADOW SYNC COMPLETION: System modules restarted.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-600">
        {/* Row 1 Grid: Maintenance Mode, App Name & theme color selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
          {/* CARD 1: MAINTENANCE TRIGGER */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <ServerCrash className="w-4.5 h-4.5 text-rose-500" />
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">STORE COLD MAINTENANCE</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">Halts all ongoing checkout operations</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-normal font-sans font-medium mb-4">
                When active, storefront returns 503 Maintenance state with custom templates. Secure REST APIs and checkout callback tunnels remain active for logging integrations.
              </p>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-2xl">
              <span className="text-slate-600 font-bold">Under maintenance</span>
              <button
                type="button"
                onClick={handleToggleMaintenance}
                className="text-slate-800 hover:text-sky-600"
              >
                {settings.maintenanceMode ? (
                  <span className="text-rose-600 font-extrabold flex items-center gap-1">
                    MAINTENANCE
                    <ToggleRight className="w-8 h-8 text-rose-650" />
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1 font-bold">
                    RUNNING LIVE
                    <ToggleLeft className="w-8 h-8 text-slate-300" />
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* CARD 2: BRAND MATTERS */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4.5 h-4.5 text-sky-500" />
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">SYSTEM METRICS IDENT</h3>
                <p className="text-[10px] text-slate-400 font-semibold">Corporate client facing logos</p>
              </div>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Corporate App Name</label>
                <input
                  type="text"
                  value={settings.appName}
                  onChange={(e) => handleSettingChange("appName", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-sans text-xs focus:outline-none focus:border-sky-500 focus:bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Ident primary Glow color</label>
                <input
                  type="color"
                  value={settings.themeColor}
                  onChange={(e) => handleSettingChange("themeColor", e.target.value)}
                  className="w-full h-8 px-1 py-1 bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 font-semibold font-sans mt-1">Adjusts real-time digital logo parameters across client frame layers.</p>
              </div>
            </div>
          </div>

          {/* CARD 3: COMMUNICATIONS SMTP */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Mail className="w-4.5 h-4.5 text-sky-500" />
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">SMTP TRANSACTION BULLETINS</h3>
                <p className="text-[10px] text-slate-400 font-semibold">Send invoices to customer inbox</p>
              </div>
            </div>

            <div className="space-y-3.5 font-sans">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1">SMTP Server IP / Host</label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white font-medium text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1">Port</label>
                  <input
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => handleSettingChange("smtpPort", parseInt(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-center focus:outline-none focus:border-sky-500 focus:bg-white font-medium text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1">SMTP Username</label>
                  <input
                    type="text"
                    value={settings.smtpUser}
                    onChange={(e) => handleSettingChange("smtpUser", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-[11px] font-medium focus:outline-none focus:border-sky-500 focus:bg-white truncate"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1">SMTP Default Sender</label>
                  <input
                    type="text"
                    value={settings.smtpEmail}
                    onChange={(e) => handleSettingChange("smtpEmail", e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-[11px] font-medium focus:outline-none focus:border-sky-500 focus:bg-white truncate"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic push notification card */}
        <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow font-sans">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Bell className="w-4.5 h-4.5 text-sky-500" />
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">FIRE DISPATCH PUSH BROADCAST SUITE</h3>
              <p className="text-[10px] text-slate-400 font-semibold font-sans mt-0.5">Dispatches instant notifications to user browser endpoints</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1">FIREBASE SERVER API PUSH AUTH DISPATCHER KEY</label>
              <input
                type="text"
                value={settings.pushServerKey}
                onChange={(e) => handleSettingChange("pushServerKey", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white rounded-xl text-sky-650 focus:outline-none font-mono font-semibold truncate"
              />
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-105">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold font-sans text-xs flex items-center justify-center gap-1 shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                <Save className="w-4 h-4 font-bold" />
                Commit all settings configurations
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
