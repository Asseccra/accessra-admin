/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [bootStep, setBootStep] = useState(0);

  const steps = [
    "Initializing secure connection...",
    "Securing payment corridors...",
    "Syncing dashboard datasets...",
    "System ready. Welcome back."
  ];

  useEffect(() => {
    if (bootStep < steps.length) {
      const timer = setTimeout(() => {
        setBootStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [bootStep]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden z-50 select-none">
      {/* Background Soft Ocean Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-100/50 blur-[100px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-md w-full px-6 flex flex-col items-center">
        {/* Glowing Logo Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-6"
        >
          {/* Subtle ocean blue glow behind logo */}
          <div className="absolute inset-0 bg-sky-300/25 blur-[35px] rounded-full scale-125 pointer-events-none animate-pulse" />

          {/* SVG Custom Accessra Logo based on uploaded image */}
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_4px_12px_rgba(14,165,233,0.3)] relative z-10"
          >
            <defs>
              <linearGradient id="logo-grad-primary" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="logo-grad-secondary" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <path
              d="M38 15C34 15 32 17 30 20L12 80C10 83 12 85 16 85H27C31 85 33 83 35 80L50 48C52 45 54 45 56 48L62 60L55 60C51 60 48 62 46 65L39 77C37 81 39 85 44 85H63L73 85C77 85 79 83 81 80L84 75C86 71 84 68 80 68H51L43 51L62 20C64 17 62 15 58 15H38Z"
              fill="url(#logo-grad-primary)"
            />
            <path
              d="M48 57L39 72C38 74 39 76 41 76H54C56 76 57 74 58 72L67 57C68 55 67 53 65 53H51C49 53 48 55 48 57Z"
              fill="url(#logo-grad-secondary)"
              opacity="0.9"
            />
          </svg>
        </motion.div>

        {/* Corporate Branding */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold tracking-tight text-slate-800 text-center"
        >
          Accessra <span className="text-sky-600 font-extrabold">Admin</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[10px] font-mono text-slate-400 mt-1 pb-1 tracking-[0.25em] text-center"
        >
          DIGITAL MARKETPLACE
        </motion.p>

        {/* Loading Progress bar */}
        <div className="w-52 bg-slate-100 h-1.5 rounded-full mt-8 overflow-hidden relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-600 shadow-[0_2px_8px_rgba(14,165,233,0.4)]"
          />
        </div>

        {/* Quiet loading step indicator */}
        <div className="h-6 mt-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={bootStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] font-mono font-medium text-slate-500"
            >
              {steps[Math.min(bootStep, steps.length - 1)]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
