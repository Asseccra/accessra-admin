/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { User } from "../types";
import { Search, ShieldAlert, Edit2, Ban, ShieldCheck, Check, Key, UserIcon, MoreVertical, HeartHandshake, X } from "lucide-react";

interface UserManagementViewProps {
  users: User[];
  onToggleUserStatus: (id: string, newStatus: "Active" | "Suspended" | "Banned") => void;
  onUpdateUserRole: (id: string, newRole: "Super Admin" | "Staff" | "User") => void;
  onUpdateUser: (updatedUser: User) => void;
}

export default function UserManagementView({
  users,
  onToggleUserStatus,
  onUpdateUserRole,
  onUpdateUser
}: UserManagementViewProps) {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedUserLogs, setSelectedUserLogs] = useState<User | null>(users[0] || null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(usr => {
    const matchesSearch =
      usr.name.toLowerCase().includes(search.toLowerCase()) ||
      usr.email.toLowerCase().includes(search.toLowerCase()) ||
      usr.referralCode.toLowerCase().includes(search.toLowerCase());
    
    if (selectedRole === "All") return matchesSearch;
    return matchesSearch && usr.role === selectedRole;
  });

  return (
    <div className="space-y-6">
      {/* Filtering tools */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accounts directory by name, email, or Referral Code..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-sans font-medium"
          />
        </div>

        <div className="flex gap-2 font-sans text-xs">
          {["All", "User", "Staff", "Super Admin"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold ${
                selectedRole === role
                  ? "bg-sky-50 border-sky-300 text-[#0d3b66]"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DIRECTORY LIST - 2 COLS */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/75 text-slate-500 font-sans text-[10px] uppercase tracking-wider font-bold">
                  <th className="p-4">Profile Name</th>
                  <th className="p-4">Contact Area</th>
                  <th className="p-4">Role Pool</th>
                  <th className="p-4">Affiliates</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-600 font-medium">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 font-bold">
                      No matching registered users located.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => setSelectedUserLogs(user)}
                      className={`hover:bg-slate-50/50 transition-all cursor-pointer ${
                        selectedUserLogs?.id === user.id ? "bg-sky-50/60 border-l-2 border-l-[#0d3b66]" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] uppercase text-[#0d3b66] font-extrabold shrink-0">
                            {user.name.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 font-sans">{user.name}</div>
                            <div className="text-[10px] text-slate-400 font-semibold">Registered: {new Date(user.joinedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 truncate max-w-[140px] font-mono leading-relaxed">{user.email}</td>
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) => onUpdateUserRole(user.id, e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 text-[10px] text-sky-800 font-bold px-2.5 py-1 rounded focus:outline-none cursor-pointer focus:bg-white"
                          onClick={(e) => e.stopPropagation()} // block row selection
                        >
                          <option value="User">Buyer / User</option>
                          <option value="Staff">Staff Officer</option>
                          <option value="Super Admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="p-4 flex flex-col gap-0.5 text-[10px] font-sans font-semibold">
                        <span className="text-slate-700 font-bold hover:underline decoration-sky-500">
                          Code: {user.referralCode}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 font-bold">
                          <span>Count: {user.referralsCount} refs</span>
                          <span className="text-emerald-600 font-extrabold font-mono">${user.balance}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : user.status === "Suspended"
                            ? "bg-amber-50 text-amber-650 border border-amber-100"
                            : "bg-rose-50 text-rose-600 border border-rose-100"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setEditingUser(user)}
                            className="p-1 px-2.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-[#0d3b66] hover:text-white border border-sky-150 text-[10px] font-extrabold cursor-pointer transition-all flex items-center gap-1 shadow-sm"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit info</span>
                          </button>
                          
                          {user.status === "Active" ? (
                            <button
                              onClick={() => onToggleUserStatus(user.id, "Banned")}
                              className="p-1 px-2.5 rounded-lg bg-rose-50 text-rose-650 hover:bg-rose-600 hover:text-white border border-rose-150 text-[10px] font-bold cursor-pointer transition-all"
                            >
                              Ban Acc
                            </button>
                          ) : (
                            <button
                              onClick={() => onToggleUserStatus(user.id, "Active")}
                              className="p-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-650 hover:bg-emerald-650 hover:text-white border border-emerald-150 text-[10px] font-bold cursor-pointer transition-all"
                            >
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ACTIVE LOG READER DEEP DRILL PANEL */}
        <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4 font-sans">
              <ShieldAlert className="w-4.5 h-4.5 text-sky-505 text-[#0d3b66]" />
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">DIAGNOSTIC HISTORY LOOPS</h3>
                <p className="text-xs text-slate-400 font-semibold">Telemetry checks log</p>
              </div>
            </div>

            {selectedUserLogs ? (
              <div className="space-y-4 font-sans text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-2xl space-y-1.5 font-sans leading-normal">
                  <p className="text-slate-505 text-slate-500 font-semibold">Target User: <span className="text-slate-800 font-bold">{selectedUserLogs.name}</span></p>
                  <p className="text-slate-550 text-slate-500 font-semibold">Identifier: <span className="text-sky-650 font-mono font-bold break-all">{selectedUserLogs.email}</span></p>
                  <div className="flex justify-between items-center text-slate-500 font-semibold">
                    <span>Security Scope: <span className="text-slate-800 font-bold uppercase">{selectedUserLogs.role}</span></span>
                    <span className="text-emerald-600 font-extrabold font-mono">Bal: ${selectedUserLogs.balance}</span>
                  </div>

                  {/* Elegant Edit profile trigger inside panel area */}
                  <button
                    onClick={() => setEditingUser(selectedUserLogs)}
                    className="w-full mt-3 py-2 px-3.5 rounded-xl bg-sky-50 text-[#0d3b66] hover:bg-[#0d3b66] hover:text-white border border-sky-150 transition-all text-xs font-bold font-sans flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile Account</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedUserLogs.activityLog.map((log, index) => (
                    <div key={index} className="p-3 rounded-xl bg-slate-50 border border-slate-150 font-sans">
                      <div className="flex items-center justify-between text-slate-400 font-bold font-mono text-[9.5px] mb-1">
                        <span>IP: {log.ip}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-slate-700 leading-normal font-medium">{log.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs font-sans font-bold">
                Select an account on the list to view database telemetry logs.
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between font-sans text-[10.5px] text-slate-400 font-bold">
            <span>Access security status</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              SYNC COMPLETE
            </span>
          </div>
        </div>
      </div>

      {/* FULLY ANIMATED HIGH POLISHED POPUP EDIT USER MODAL */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(u) => {
            onUpdateUser(u);
            if (selectedUserLogs && selectedUserLogs.id === u.id) {
              setSelectedUserLogs(u);
            }
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [referralCode, setReferralCode] = useState(user.referralCode);
  const [referralsCount, setReferralsCount] = useState(user.referralsCount);
  const [balance, setBalance] = useState(user.balance);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!referralCode.trim()) {
      setError("Referral code cannot be empty.");
      return;
    }

    onSave({
      ...user,
      name: name.trim(),
      email: email.trim(),
      role,
      status,
      referralCode: referralCode.trim().toUpperCase(),
      referralsCount: Number(referralsCount),
      balance: Number(balance)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative animate-fade-in font-sans">
        {/* Sky Brand Top Strip */}
        <div className="h-1.5 w-full bg-[#0d3b66]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-xs uppercase text-[#0d3b66] font-extrabold shrink-0">
              {name.slice(0, 2) || "US"}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0d3b66]">Edit Akun Pengguna</h3>
              <p className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider font-mono">User ID: #{user.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-650 text-[11px] font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name & Email Input group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <UserIcon className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 focus:outline-none transition-all font-sans text-xs font-semibold"
                  placeholder="Full Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Alamat Email</label>
              <div className="relative">
                <Key className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 focus:outline-none transition-all font-sans text-xs font-semibold"
                  placeholder="Email Address"
                />
              </div>
            </div>
          </div>

          {/* Role & Status Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Peran (Role Pool)</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 text-xs font-bold outline-none cursor-pointer transition-all"
              >
                <option value="User">Buyer / User</option>
                <option value="Staff">Staff Officer</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Status Akun</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 text-xs font-bold outline-none cursor-pointer transition-all"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Banned">Banned</option>
              </select>
            </div>
          </div>

          {/* Referral parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Kode Rujukan (Referral)</label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 focus:outline-none transition-all font-mono text-xs font-semibold uppercase"
                placeholder="PROMO88"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Jumlah Referral</label>
              <input
                type="number"
                min="0"
                value={referralsCount}
                onChange={(e) => setReferralsCount(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 focus:outline-none transition-all font-mono text-xs font-semibold"
                placeholder="0"
              />
            </div>
          </div>

          {/* Wallet Balance adjustment */}
          <div>
            <label className="block text-slate-500 font-bold text-[10px] uppercase mb-1.5">Saldo Dompet Admin ($ Wallet USD)</label>
            <div className="relative">
              <span className="text-slate-400 font-extrabold text-xs absolute left-3.5 top-1/2 -translate-y-1/2">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full pl-8 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0d3b66] text-slate-800 focus:outline-none transition-all font-mono text-xs font-semibold"
                placeholder="0.00"
              />
            </div>
            <span className="text-[9.5px] text-slate-450 font-semibold block mt-1">Gunakan untuk menambah atau mengoreksi saldo kredit referral terafiliasi.</span>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2.5 pt-4 border-t border-slate-100 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="py-2 px-5 rounded-xl bg-[#0d3b66] hover:bg-[#072440] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-sky-950/10"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
