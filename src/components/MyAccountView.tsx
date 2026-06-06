/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { DeviceInfo } from "../types";
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Smartphone,
  Globe,
  Clock,
  LogOut,
  Upload,
  Check,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Laptop,
  CheckCircle,
  Eye,
  EyeOff,
  Trash2
} from "lucide-react";

interface MyAccountViewProps {
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminAvatar: string;
  twoFAEnabled: boolean;
  adminLanguage: string;
  adminTimezone: string;
  deviceInfos: DeviceInfo[];
  onUpdateProfile: (data: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    twoFAEnabled: boolean;
    adminLanguage: string;
    adminTimezone: string;
  }) => void;
  onSignOut: () => void;
  onSignOutAllDevices: () => void;
  onRevokeDevice: (id: string) => void;
}

export default function MyAccountView({
  adminName,
  adminEmail,
  adminPhone,
  adminAvatar,
  twoFAEnabled,
  adminLanguage,
  adminTimezone,
  deviceInfos,
  onUpdateProfile,
  onSignOut,
  onSignOutAllDevices,
  onRevokeDevice
}: MyAccountViewProps) {
  // Local Form states
  const [name, setName] = useState(adminName);
  const [email, setEmail] = useState(adminEmail);
  const [phone, setPhone] = useState(adminPhone);
  const [avatar, setAvatar] = useState(adminAvatar);
  const [twoFA, setTwoFA] = useState(twoFAEnabled);
  const [language, setLanguage] = useState(adminLanguage);
  const [timezone, setTimezone] = useState(adminTimezone);

  // Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [dragActive, setDragActive] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter devices to only look at currently logged in account's device logs
  const adminDevices = deviceInfos.filter(d => d.adminEmail === adminEmail);

  // Drag and Drop implementation for profile photo
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Submit profile details
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      onUpdateProfile({
        name,
        email,
        phone,
        avatar,
        twoFAEnabled: twoFA,
        adminLanguage: language,
        adminTimezone: timezone
      });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }, 1000);
  };

  // Submit password change
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (!oldPassword) {
      setPasswordError("Mohon masukkan password lama Anda.");
      return;
    }
    if (oldPassword !== "admin123") {
      setPasswordError("Password lama salah! Default password lama akun Anda adalah admin123.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password baru minimal harus berisi 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi password baru tidak cocok.");
      return;
    }

    setPasswordSuccess(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {saveStatus === "success" && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
          <span>PROFIL BERHASIL DIPERBARUI: Parameter identitas disinkronkan ke seluruh sistem!</span>
        </div>
      )}

      {passwordSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
          <span>PASSWORD BERHASIL DIUBAH: Sesi keamanan terenkripsi ulang secara aman.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: HERO AVATAR CARD & PREFERENCES */}
        <div className="space-y-6">
          
          {/* PROFILE AVATAR CARD */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col items-center">
            {/* Background design accents */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-r from-sky-500 via-[#0d3b66] to-indigo-600 opacity-90" />
            
            <div className="relative mt-7 group">
              <img
                src={avatar}
                alt={adminName}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-sky-50"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-2 bg-sky-600 text-white rounded-full hover:bg-[#0d3b66] transition-all shadow-md cursor-pointer"
                title="Ganti Foto Profil"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center mt-4 space-y-1">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">{adminName}</h3>
              <p className="text-[10px] text-slate-450 uppercase font-bold px-2.5 py-0.5 bg-sky-50 border border-sky-100/50 text-[#0d3b66] rounded-full inline-block">
                Root Super Admin
              </p>
              <p className="text-xs text-slate-500 font-medium font-mono pt-1">{adminEmail}</p>
            </div>

            <div className="w-full border-t border-slate-100 my-6 pt-5 space-y-3.5 text-xs text-slate-500 font-medium font-sans">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Security Rank</span>
                <span className="text-[#0d3b66] font-bold">100% SECURE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Session Devices</span>
                <span className="text-[#0d3b66] font-bold font-mono">{adminDevices.length} Active</span>
              </div>
            </div>

            {/* DRAG AND DROP TARGET AREA */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`w-full p-4 border border-dashed rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                dragActive
                  ? "border-[#0d3b66] bg-sky-50/50"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className={`w-5 h-5 ${dragActive ? "text-sky-600 animate-bounce" : "text-slate-400"}`} />
              <div className="text-[10px] text-slate-600 font-bold">
                Drag photo di sini atau klik untuk Upload
              </div>
              <span className="text-[8px] text-slate-400 block font-semibold uppercase font-mono">PNG, JPG up to 2MB</span>
            </div>
          </div>

          {/* PREFERENCES PANEL */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="w-4.5 h-4.5 text-sky-600" />
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">PREFERENCES</h3>
                <p className="text-[10px] text-slate-450 font-semibold font-sans">Localization preferences profile</p>
              </div>
            </div>

             <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1.5">Bahasa Tampilan</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={language}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      setLanguage(selectedVal);
                      onUpdateProfile({
                        name,
                        email,
                        phone,
                        avatar,
                        twoFAEnabled: twoFA,
                        adminLanguage: selectedVal,
                        adminTimezone: timezone
                      });
                    }}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] rounded-xl outline-none cursor-pointer text-slate-800 font-bold transition-all text-xs"
                  >
                    <option value="Bahasa Indonesia">Bahasa Indonesia (ID)</option>
                    <option value="English">English (US)</option>
                    <option value="日本語">日本語 (JP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1.5">Zona Waktu Sistem</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={timezone}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      setTimezone(selectedVal);
                      onUpdateProfile({
                        name,
                        email,
                        phone,
                        avatar,
                        twoFAEnabled: twoFA,
                        adminLanguage: language,
                        adminTimezone: selectedVal
                      });
                    }}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] rounded-xl outline-none cursor-pointer text-slate-800 font-bold transition-all text-xs"
                  >
                    <option value="WIB (GMT+7)">WIB - Asia/Jakarta (GMT+7)</option>
                    <option value="WITA (GMT+8)">WITA - Asia/Makassar (GMT+8)</option>
                    <option value="WIT (GMT+9)">WIT - Asia/Jayapura (GMT+9)</option>
                    <option value="UTC (GMT+0)">UTC - Coordinated Universal (GMT+0)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACCOUNT ACTIONS */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow/5 hover:border-rose-100 space-y-4">
            <h3 className="text-xs font-bold text-rose-600 uppercase tracking-tight">ACCOUNT ACTIONS</h3>
            
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={onSignOutAllDevices}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-100 text-rose-650 font-bold transition-all text-xs cursor-pointer"
              >
                Sign Out on All External Devices
              </button>
              
              <button
                type="button"
                onClick={onSignOut}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 font-bold transition-all text-xs cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Logout
              </button>
            </div>
          </div>

        </div>

        {/* PROFILE INFORMATION DETAILS & CHANGE PASSWORD */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PROFILE INFORMATION VIEW FORM */}
          <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-sky-600" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">Profile Information</h3>
                <p className="text-[10px] text-slate-400 font-semibold font-sans">Manage your system administrative profile credentials</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-semibold mb-1.5 text-xs">Nama Admin</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 font-sans text-xs font-semibold outline-none transition-all"
                    placeholder="Nama Lengkap"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1.5 text-xs">Alamat Email Utama</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 font-sans text-xs font-semibold outline-none transition-all"
                    placeholder="Email Address"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-semibold mb-1.5 text-xs">Nomor Handphone (WhatsApp)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 font-sans text-xs font-semibold outline-none transition-all"
                    placeholder="Contoh: +62 812-xxxx-xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1.5 text-xs">Otentikasi Dua Faktor (2FA)</label>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="text-[11px] text-slate-600 font-bold">2FA SMS & Authenticator App</span>
                  <button
                    type="button"
                    onClick={() => setTwoFA(!twoFA)}
                    className="text-[#0d3b66] focus:outline-none"
                    title={twoFA ? "Matikan 2FA" : "Aktifkan 2FA"}
                  >
                    {twoFA ? (
                      <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                        AKTIF
                        <ToggleRight className="w-8 h-8 text-emerald-650" />
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-bold">
                        NONAKTIF
                        <ToggleLeft className="w-8 h-8 text-slate-350" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="submit"
                disabled={saveStatus === "saving"}
                className="py-2.5 px-6 rounded-xl bg-[#0d3b66] hover:bg-[#072440] disabled:bg-slate-350 text-white font-bold font-sans text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-sky-950/10 cursor-pointer transition-all"
              >
                {saveStatus === "saving" ? (
                  <span>Menyimpan...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4 font-bold" />
                    <span>Simpan Perubahan Profil</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* CHANGE PASSWORD VIEW */}
          <form onSubmit={handleSavePassword} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Key className="w-5 h-5 text-sky-600" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">Ubah Password Keamanan</h3>
                <p className="text-[10px] text-slate-400 font-semibold font-sans">Perbarui password akun administrator secara periodik</p>
              </div>
            </div>

            {passwordError && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-650 text-xs font-bold rounded-xl flex items-center gap-2 font-sans animate-shake">
                <ShieldAlert className="w-4.5 h-4.5 text-rose-650" />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1.5">Password Lama</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showOldPass ? "text" : "password"}
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full pl-9 pr-12 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 font-semibold outline-none transition-all"
                    placeholder="Masukkan password lama (default: admin123)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-655 p-1"
                  >
                    {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-1 text-[10px] text-slate-500">
                  Password lama Anda saat ini adalah: <span className="font-mono bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100 font-bold text-[#0d3b66]">admin123</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1.5">Password Baru</label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showNewPass ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-9 pr-12 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 font-semibold outline-none transition-all"
                      placeholder="Minimal 6 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 p-1"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1.5">Konfirmasi Password Baru</label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 font-semibold outline-none transition-all"
                      placeholder="Ulangi password baru"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold font-sans text-xs flex items-center justify-center gap-1 shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                Ubah Password
              </button>
            </div>
          </form>

          {/* DEVICE LOGIN HISTORY */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-sky-600" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">Device Login History</h3>
                  <p className="text-[10px] text-slate-450 font-semibold font-sans">Active credential device tokens logged</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onSignOutAllDevices}
                className="text-rose-600 hover:text-rose-700 text-[10px] font-extrabold uppercase hover:underline cursor-pointer"
              >
                Kick All Other Devices
              </button>
            </div>

            <div className="divide-y divide-slate-100 font-sans text-xs">
              {adminDevices.length === 0 ? (
                <p className="py-4 text-center text-slate-400 font-bold">No active external device histories found.</p>
              ) : (
                adminDevices.map((device) => {
                  const isCurrent = device.ip === "182.16.8.21" || device.ip === "127.0.0.1"; // Identify simulated current device
                  return (
                    <div key={device.id} className="py-3.5 sm:flex items-center justify-between gap-4 first:pt-0">
                      <div className="flex items-start gap-3">
                        <div className="p-2 ml-0 sm:ml-1 rounded-xl bg-slate-50 border border-slate-150 text-slate-500 shrink-0 mt-0.5">
                          <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-800">{device.os} &bull; {device.browser}</span>
                            {isCurrent && (
                              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8.5px] px-2 py-0.5 rounded-full font-extrabold">
                                CURRENT DEVICE
                              </span>
                            )}
                          </div>
                          <div className="text-[10.5px] text-slate-400 font-semibold space-y-0.5 mt-0.5">
                            <p>IP Address: <span className="font-mono font-bold text-slate-550 text-slate-500">{device.ip}</span> ({device.location})</p>
                            <p>Last Authentication Sync: {new Date(device.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      {!isCurrent && (
                        <button
                          type="button"
                          onClick={() => onRevokeDevice(device.id)}
                          className="mt-2.5 sm:mt-0 px-3 py-1.5 rounded-lg border border-rose-100 hover:border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-bold text-[10px] shrink-0 self-end sm:self-center cursor-pointer transition-all flex items-center gap-1.5"
                          title="Cabut akses token perangkat ini"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Revoke</span>
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
