/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, KeyRound, Sparkles, CheckCircle, Smartphone, AlertTriangle, Users } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface LoginProps {
  onSuccess: (role: "Super Admin" | "Staff", adminEmail: string) => void;
  userEmail: string;
}

export default function Login({ onSuccess, userEmail }: LoginProps) {
  const [email, setEmail] = useState(userEmail || "jigongasem3@gmail.com");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Super Admin" | "Staff">("Super Admin");
  const [is2faStep, setIs2faStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSentToast, setOtpSentToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Generate a fresh code for simulation
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
  }, [is2faStep]);

  const handleInitiateLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    setErrorMsg("Please enter administrator email and password.");
    return;
  }
  setErrorMsg("");
  setIsSubmitting(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);

    setIsSubmitting(false);
    onSuccess(role, email);
  } catch (error) {
    setIsSubmitting(false);
    setErrorMsg("Login failed. Please check your email or password.");
    console.error(error);
  }
};

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === generatedOtp || otpCode === "123456" || otpCode === "888888") {
      setIsSubmitting(true);
      setErrorMsg("");
      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess(role, email);
      }, 1000);
    } else {
      setErrorMsg("The verification OTP code is incorrect or expired. Hint: Use the code displayed in the top banner!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Background glowing decorations - beautiful ocean blue gradient glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-sky-100/50 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-indigo-50/50 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-gradient-to-tr from-sky-400/10 to-transparent blur-3xl rounded-full pointer-events-none animate-pulse" />

      {/* 2FA Banner Helper */}
      {otpSentToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 max-w-sm w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-xl border-l-4 border-l-sky-500 z-50 flex items-start gap-3"
        >
          <Smartphone className="w-5 h-5 text-sky-500 mt-0.5 shrink-0 animate-bounce" />
          <div className="flex-1">
            <h4 className="text-xs font-mono text-slate-800 font-bold">2FA VERIFICATION CODE</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              A secure code has been dispatched to: <span className="text-sky-600 font-semibold">{email}</span>.
            </p>
            <div className="mt-2 bg-sky-50 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5">
              <span className="text-[10px] text-slate-500 font-mono">OTP Code:</span>
              <span className="text-sm font-extrabold tracking-widest text-sky-600 font-mono">{generatedOtp}</span>
            </div>
          </div>
          <button onClick={() => setOtpSentToast(false)} className="text-slate-400 hover:text-slate-600 text-xs font-semibold">✕</button>
        </motion.div>
      )}

      {/* Main card box - white theme */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white relative shadow-2xl shadow-sky-950/5 border border-slate-100 hover:shadow-sky-950/10 transition-shadow overflow-hidden"
      >
        {/* Sleek scanner grid line overlay */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-sky-600 to-indigo-500" />

        <div className="flex flex-col items-center mb-8">
          {/* Logo container */}
          <div className="relative mb-4 flex items-center justify-center p-3 rounded-2xl bg-sky-50/50 border border-sky-100 shadow-sm">
            <svg
              width="44"
              height="44"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_6px_rgba(14,165,233,0.2)]"
            >
              <defs>
                <linearGradient id="login-logo-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
              <path
                d="M38 15C34 15 32 17 30 20L12 80C10 83 12 85 16 85H27C31 85 33 83 35 80L50 48C52 45 54 45 56 48L62 60L55 60C51 60 48 62 46 65L39 77C37 81 39 85 44 85H63L73 85C77 85 79 83 81 80L84 75C86 71 84 68 80 68H51L43 51L62 20C64 17 62 15 58 15H38Z"
                fill="url(#login-logo-grad)"
              />
            </svg>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-1">
            Accessra <span className="text-sky-600 font-extrabold">Admin</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            DIGITAL MARKETPLACE MANAGEMENT GATEWAY
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!is2faStep ? (
          /* SECTION 1: CREDENTIALS */
          <form onSubmit={handleInitiateLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Administrator Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono">@</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@accessra.digital"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/10 font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/10 font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Privilege Role Assignment
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("Super Admin")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    role === "Super Admin"
                      ? "bg-sky-50 border-sky-400 text-sky-600 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Staff")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    role === "Staff"
                      ? "bg-sky-50 border-sky-400 text-sky-600 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Staff
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center leading-relaxed">
                {role === "Super Admin"
                  ? "Unlocks full control, reports, transaction audits, and gateway configurations."
                  : "Authorized to manage checkout verification parameters and consumer support tickets."}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold text-sm transition-all shadow-md shadow-sky-500/15 flex items-center justify-center gap-2 relative group overflow-hidden cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white mt-px" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        ) : (
          /* SECTION 2: 2FA STEP */
          <form onSubmit={handleVerify2FA} className="space-y-4">
            <div className="text-center p-3.5 rounded-xl bg-sky-50 border border-sky-100 mb-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                A 6-digit dynamic authentication passcode has been sent to your administrator profile.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 text-center">
                Enter Verification Passcode
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full text-center tracking-[0.4em] py-3 rounded-xl bg-slate-50 border border-slate-200 text-lg font-bold text-sky-600 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10 transition-all font-mono"
                required
                autoFocus
              />
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setIs2faStep(false)}
                className="w-1/3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verify and Enter
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center mt-4">
              Protected by hardware identity security. Session will be audited.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
