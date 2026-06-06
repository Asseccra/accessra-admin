/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { DeviceInfo } from "../types";
import { ShieldAlert, Terminal, CheckCircle2, AlertTriangle, Cpu, Globe, RefreshCw, KeyRound, Lock, Eye, Save } from "lucide-react";

interface SecurityPanelProps {
  deviceInfos: DeviceInfo[];
  onToggleDeviceStatus: (id: string, newStatus: "Trusted" | "Flagged" | "Blocked") => void;
}

export default function SecurityPanel({ deviceInfos, onToggleDeviceStatus }: SecurityPanelProps) {
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [editorRules, setEditorRules] = useState(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Global Safety Net: Default Deny All
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Core Identity Primitive Helper Rules
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isEmailVerified() {
      return isSignedIn() && request.auth.token.email_verified == true;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // ------------------------------------------
    // Match block: Products Catalog
    // ------------------------------------------
    match /products/{productId} {
      // Public reading allowed for catalog viewing
      allow read: if true;
      // Writing restricted strictly to Super Admins & Staff
      allow write: if isAdmin();
    }
    
    // ------------------------------------------
    // Match block: Realtime Orders Database
    // ------------------------------------------
    match /orders/{orderId} {
      // Customers can read their own invoices; Admins can read all elements
      allow get: if isOwner(resource.data.customerId) || isAdmin();
      allow list: if isAdmin() || (isSignedIn() && resource.data.customerId == request.auth.uid);
      
      // Creating is verified; restricted to email verified buyers
      allow create: if isEmailVerified() && request.resource.data.customerId == request.auth.uid;
      
      // Updating is forbidden for client except through payment gateway callbacks (server SDK)
      allow update: if isAdmin();
    }
    
    // ------------------------------------------
    // Match block: User Directories
    // ------------------------------------------
    match /users/{userId} {
      allow get: if isOwner(userId) || isAdmin();
      allow list: if isAdmin();
      allow create: if isSignedIn() && isOwner(userId);
      // Forbid users from modifying roles (anti-privilege escalation)
      allow update: if isOwner(userId) && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'balance']);
    }
  }
}`);

  const handleDeployRules = () => {
    setDeploySuccess(true);
    setTimeout(() => setDeploySuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Visual threat banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
        <div className="p-5 rounded-2xl bg-white border border-slate-100 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
          <Lock className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">FIRE SHIELD INTEL</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">
              Active Firebase Rules protect 4 directories. Auto-preventing Shadow Updates.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-100 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
          <ShieldAlert className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">NEURAL RISK SCORE</h4>
            <p className="text-[11px] text-emerald-600 font-bold mt-1 leading-normal">
              SECURE DEPLOYMENT OVERVIEW // Threats level: 0.1% lowest threat pool.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-100 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
          <Cpu className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">ENCRYPTION ENGINE</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">
              AES-256 data envelope encryption actively parsing payment Webhook API handshakes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* INTERACTIVE RULES EDITOR - 3 COLS */}
        <div className="lg:col-span-3 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 font-sans">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4.5 h-4.5 text-sky-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">FIRESTORE RULES ENFORCER</h3>
                  <p className="text-xs text-slate-400 font-semibold">Hardened security rulesets Match gates</p>
                </div>
              </div>

              {deploySuccess && (
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-150 text-emerald-600 animate-pulse">
                  DEPLOYED ACTIVE
                </span>
              )}
            </div>

            <textarea
              readOnly
              value={editorRules}
              onChange={(e) => setEditorRules(e.target.value)}
              className="w-full h-80 p-4 font-mono text-[10px] text-sky-400 bg-slate-900 rounded-2xl border border-slate-950 outline-none focus:border-sky-500 overflow-y-auto scrollbar-thin resize-none leading-relaxed select-all"
            />
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 font-sans text-xs text-slate-500">
            <span className="text-slate-400 font-semibold">Security deployment validated by ESLint Firestore analyzer.</span>
            <button
              onClick={handleDeployRules}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer"
            >
              Push & Deploy Live firestore.rules
            </button>
          </div>
        </div>

        {/* DEVICE ACCESS TRACKER - 2 COLS */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4 font-sans">
              <Globe className="w-4.5 h-4.5 text-sky-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">ACTIVE DEVICE TUNNELS</h3>
                <p className="text-xs text-slate-400 font-semibold">Location & browser identity logs</p>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {deviceInfos.map((d) => (
                <div key={d.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>{d.browser} ({d.os})</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[8.5px] font-extrabold ${
                      d.status === "Trusted" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      d.status === "Flagged" ? "bg-amber-50 text-amber-650 border border-amber-100" :
                      "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  <p className="text-slate-800 font-bold text-xs">IP: {d.ip} &bull; Place: {d.location}</p>

                  <div className="flex justify-between items-center text-[11px] text-slate-450 font-medium">
                    <span>Trust score: <span className="font-bold text-slate-700">{d.trustScore}%</span></span>
                    <div className="flex gap-2">
                      {d.status === "Trusted" ? (
                        <button
                          onClick={() => onToggleDeviceStatus(d.id, "Flagged")}
                          className="text-rose-650 hover:underline font-bold cursor-pointer"
                        >
                          Revoke trust
                        </button>
                      ) : (
                        <button
                          onClick={() => onToggleDeviceStatus(d.id, "Trusted")}
                          className="text-emerald-650 hover:underline font-bold cursor-pointer"
                        >
                          Approve entry
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-400 mt-4 leading-relaxed font-sans font-semibold text-center pb-1">
            IP ranges outside of Indonesia (IDN) trigger automated OTP push authentication codes instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
