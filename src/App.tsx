/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Boxes,
  Receipt,
  CreditCard,
  Users2,
  TicketPercent,
  MessageSquareDiff,
  ShieldHalf,
  BarChart4,
  Settings2,
  LogOut,
  BellRing,
  Globe2,
  Menu,
  X,
  Laptop,
  ShieldCheck,
  Zap,
  Star,
  User as UserIconCircle
} from "lucide-react";

// Types
import { Product, Order, User, SupportTicket, PromoVoucher, FlashSale, DeviceInfo, AppSettings } from "./types";

// Static Default Datasets
import {
  initialOrders,
  initialUsers,
  initialTickets,
  initialVouchers,
  initialFlashSales,
  initialDevices,
  paymentGatewaysData,
  errorPaymentLogs,
  defaultSettings
} from "./data/mockData";

// Components Views
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import DashboardView from "./components/DashboardView";
import ProductManagementView from "./components/ProductManagementView";
import OrderManagementView from "./components/OrderManagementView";
import PaymentGatewayView from "./components/PaymentGatewayView";
import UserManagementView from "./components/UserManagementView";
import PromoManagementView from "./components/PromoManagementView";
import CustomerSupportView from "./components/CustomerSupportView";
import SecurityPanel from "./components/SecurityPanel";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";
import MyAccountView from "./components/MyAccountView";

import { testConnection } from "./firebase/firebaseUtils";

const translations: Record<string, Record<string, string>> = {
  "Bahasa Indonesia": {
    "dashboard": "Dashboard Hub",
    "products": "Stok Produk",
    "orders": "Live Pesanan Masuk",
    "gateways": "API Pembayaran",
    "users": "Kumpulan Pengguna",
    "promos": "Kampanye Promo",
    "support": "Pesan Layanan CS",
    "analytics": "Analisis Mendalam",
    "myaccount": "Akun Saya ⭐",
    "settings": "Pengaturan Aplikasi",
    "dashboard_mgmt": "DASHBOARD UTAMA SISTEM",
    "products_mgmt": "KONTROL INVENTARIS PRODUK",
    "orders_mgmt": "SISTEM LIVE TRANSAKSI MASUK",
    "gateways_mgmt": "SINKRONISASI API GERBANG PEMBAYARAN",
    "users_mgmt": "DATABASE PENGGUNA TERINTEGRASI",
    "promos_mgmt": "KAMPANYE VOUCHER & TOKO PROMO",
    "support_mgmt": "KOTAK MASUK TICKET LAYANAN PELANGGAN",
    "analytics_mgmt": "METRIK & ANALISIS MENDALAM",
    "myaccount_mgmt": "PENGATURAN IDENTITAS UTAMA ADMIN",
    "settings_mgmt": "PENGATURAN PARAMETER SISTEM",
    "Secure Connection Status:": "Status Koneksi Aman Sesi:",
    "Active": "Aktif",
    "Sign Out": "Keluar Sesi",
    "Accessra Admin": "ADMIN ACCESSRA",
    "Accessra Digital Marketplace Administration Panel": "Panel Kontrol Utama Administrasi Digital Accessra",
    "Connected Device Status": "Status Perangkat yang Terhubung",
    "Root Super Admin": "Super Admin Akun Root",
  },
  "English": {
    "dashboard": "Dashboard Hub",
    "products": "Product Stock",
    "orders": "Live Checkout",
    "gateways": "Payment APIs",
    "users": "User Pool",
    "promos": "Promo Campaigns",
    "support": "CS Web Inbox",
    "analytics": "Deep Analytics",
    "myaccount": "My Account ⭐",
    "settings": "App Settings",
    "dashboard_mgmt": "MAIN SYSTEM DASHBOARD HUB",
    "products_mgmt": "PRODUCT INVENTORY CONTROL",
    "orders_mgmt": "LIVE CHECKOUT MONITORING SYSTEM",
    "gateways_mgmt": "PAYMENT GATEWAYS API INTEGRATION",
    "users_mgmt": "INTEGRATED USER SEED DATABASE",
    "promos_mgmt": "VOUCHER CAMPAIGNS & DYNAMIC FLASH SALE",
    "support_mgmt": "CUSTOMER TICKET SERVICE RADAR",
    "analytics_mgmt": "DEEP METRICS & DATA ANALYTICS",
    "myaccount_mgmt": "SUPER ADMIN PROFILE ACCOUNT",
    "settings_mgmt": "SYSTEM GLOBAL PARAMETERS",
    "Secure Connection Status:": "Secure Connection Status:",
    "Active": "Active",
    "Sign Out": "Sign Out Session",
    "Accessra Admin": "ACCESSRA ADMIN",
    "Accessra Digital Marketplace Administration Panel": "Accessra Digital Marketplace Administration Panel",
    "Connected Device Status": "Connected Device Status",
    "Root Super Admin": "Root Super Admin Account",
  },
  "日本語": {
    "dashboard": "ダッシュボード",
    "products": "製品在庫管理",
    "orders": "取引監視",
    "gateways": "決済API設定",
    "users": "ユーザー一覧",
    "promos": "プロモーション設定",
    "support": "CS問合せ窓口",
    "analytics": "集計・解析",
    "myaccount": "マイアカウント ⭐",
    "settings": "システム設定",
    "dashboard_mgmt": "メインシステム・ダッシュボード",
    "products_mgmt": "製品在庫管理コントロール",
    "orders_mgmt": "リアルタイム取引監視システム",
    "gateways_mgmt": "電子決済APIインテグレーション",
    "users_mgmt": "顧客データベース管理ポータル",
    "promos_mgmt": "割引クーポン＆特別キャンペーン",
    "support_mgmt": "顧客問合せチケットセンター",
    "analytics_mgmt": "ディープ解析データ＆集計",
    "myaccount_mgmt": "管理者アカウント個別プロフィール",
    "settings_mgmt": "グローバル環境パラメータ",
    "Secure Connection Status:": "セキュア接続ステータス:",
    "Active": "接続中",
    "Sign Out": "管理者ログアウト",
    "Accessra Admin": "アクセスラ管理者画面",
    "Accessra Digital Marketplace Administration Panel": "Accessra デジタルマーケットプレイス統合管理ポータル",
    "Connected Device Status": "デバイス接続ログ一覧",
    "Root Super Admin": "ルート・メインシステム管理者",
  }
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("jigongasem3@gmail.com");
  const [adminRole, setAdminRole] = useState<"Super Admin" | "Staff">("Super Admin");

  // Admin Account custom states
  const [adminName, setAdminName] = useState("Muhammad Irfan");
  const [adminPhone, setAdminPhone] = useState("+62 812-7055-1212");
  const [adminAvatar, setAdminAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80");
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [adminLanguage, setAdminLanguage] = useState("Bahasa Indonesia");
  const [adminTimezone, setAdminTimezone] = useState("WIB (GMT+7)");

  // Translation helper based on current active adminLanguage state
  const t = (key: string): string => {
    const lang = adminLanguage || "Bahasa Indonesia";
    const dict = translations[lang] || translations["Bahasa Indonesia"];
    return dict[key] || key;
  };

  // Global Interactive Databases States
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [vouchers, setVouchers] = useState<PromoVoucher[]>(initialVouchers);
  const [flashSales, setFlashSales] = useState<FlashSale[]>(initialFlashSales);
  const [deviceInfos, setDeviceInfos] = useState<DeviceInfo[]>(initialDevices);
  const [appSettings, setAppSettings] = useState<AppSettings>(defaultSettings);

  // Validate the connection to firestore on boot
  useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(db, "orders"), orderBy("createdAt", "desc")),
    (snapshot) => {
      const realtimeOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];

      setOrders(realtimeOrders);
    }
  );

  return () => unsubscribe();
}, []);

  // Layout Controls
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveNotification, setLiveNotification] = useState<{ title: string; desc: string } | null>(null);



      // Auto dismiss notifier toast in 6 seconds
      

 const handleAddProduct = async (prod: Product) => {
  try {
    const p: any = prod;

    const docRef = await addDoc(collection(db, "products"), {
      ...p,

      title: p.title || p.name || "Produk Digital",
      name: p.title || p.name || "Produk Digital",

      category: p.category || "software",
      categoryName: p.categoryName || p.category || "Software",
      type: p.type || "software",

      deliveryType: p.deliveryType || "Instant Key",
      deliveryContent: p.deliveryContent || "",

      price: Number(p.promoPrice || p.price || 0),
      originalPrice: Number(p.price || p.originalPrice || 0),
      promoPrice: Number(p.promoPrice || p.price || 0),

      discountPercent: Number(p.discountPercent || 0),
      rating: Number(p.rating || 4.8),
      ratingCount: Number(p.ratingCount || 0),

      autoStock: p.autoStock ?? true,
      stock: p.autoStock ? 99999 : Number(p.stock || 0),

      thumbnail: p.thumbnail || "",
      description: p.description || "",
      inputPlaceholder: p.inputPlaceholder || "Masukkan data tujuan",
      processTime: p.processTime || "Otomatis",

      features: p.features || ["Legal 100%", "Proses Otomatis", "CS 24/7"],
      reviews: p.reviews || [],

      status: "active",
      createdAt: serverTimestamp()
    });

    setProducts(prev => [{ ...prod, id: docRef.id }, ...prev]);
  } catch (error) {
    console.error("Gagal tambah produk:", error);
  }
};
  const handleUpdateProduct = (prod: Product) => {
    setProducts(prev => prev.map(p => (p.id === prod.id ? prod : p)));
  };
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Order verify & Refund actions
  const handleVerifyOrder = (id: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === id) {
          return {
            ...o,
            paymentStatus: "Paid",
            orderStatus: "Completed"
          };
        }
        return o;
      })
    );
  };
  const handleRefundOrder = (id: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === id) {
          return {
            ...o,
            paymentStatus: "Refunded",
            orderStatus: "Refunded"
          };
        }
        return o;
      })
    );
  };

  // User actions toggles
  const handleToggleUserStatus = (id: string, newStatus: "Active" | "Suspended" | "Banned") => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === id) {
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };
  const handleUpdateUserRole = (id: string, newRole: "Super Admin" | "Staff" | "User") => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === id) {
          return { ...u, role: newRole as any };
        }
        return u;
      })
    );
  };
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === updatedUser.id) {
          return updatedUser;
        }
        return u;
      })
    );
  };

  // Promo operations
  const handleAddVoucher = (vch: PromoVoucher) => {
    setVouchers(prev => [vch, ...prev]);
  };
  const handleDeleteVoucher = (id: string) => {
    setVouchers(prev => prev.filter(v => v.id !== id));
  };
  const handleToggleFlashSale = (id: string) => {
    setFlashSales(prev =>
      prev.map(fs => {
        if (fs.id === id) {
          return { ...fs, isActive: !fs.isActive };
        }
        return fs;
      })
    );
  };

  // Customer support chat reply and status handler
  const handleReplyTicket = (ticketId: string, text: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: "Processing" as const,
            messages: [
              ...t.messages,
              {
                id: `rep-${Date.now()}`,
                sender: "admin",
                text,
                timestamp: new Date().toISOString()
              }
            ]
          };
        }
        return t;
      })
    );
  };
  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return { ...t, status: "Resolved" as const };
        }
        return t;
      })
    );
  };

  // Security elements
  const handleToggleDeviceStatus = (id: string, newStatus: "Trusted" | "Flagged" | "Blocked") => {
    setDeviceInfos(prev =>
      prev.map(d => {
        if (d.id === id) {
          return { ...d, status: newStatus };
        }
        return d;
      })
    );
  };

  const handleUpdateProfile = (data: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    twoFAEnabled: boolean;
    adminLanguage: string;
    adminTimezone: string;
  }) => {
    setAdminName(data.name);
    setAdminEmail(data.email);
    setAdminPhone(data.phone);
    setAdminAvatar(data.avatar);
    setTwoFAEnabled(data.twoFAEnabled);
    setAdminLanguage(data.adminLanguage);
    setAdminTimezone(data.adminTimezone);
  };

  const handleRevokeDevice = (id: string) => {
    setDeviceInfos(prev => prev.filter(d => d.id !== id));
  };

  const handleSignOutAllDevices = () => { // Product actions handlers
  
    setDeviceInfos(prev =>
      prev.filter(d => d.adminEmail !== adminEmail || d.ip === "182.16.8.21" || d.ip === "127.0.0.1")
    );
    setLiveNotification({
      title: "DEVICES RE-ENCRYPT DISPATCHED",
      desc: "All external digital login session keys revoked and logged out successfully."
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Sidebar Menu mapping arrays
  const sidebarMenu = [
    { id: "dashboard", label: "Dashboard Hub", icon: LayoutDashboard },
    { id: "products", label: "Product Stock", icon: Boxes },
    { id: "orders", label: "Live Checkout", icon: Receipt },
    { id: "gateways", label: "Payment APIs", icon: CreditCard },
    { id: "users", label: "User Pool", icon: Users2 },
    { id: "promos", label: "Promo Campaigns", icon: TicketPercent },
    { id: "support", label: "CS Web Inbox", icon: MessageSquareDiff },
    { id: "analytics", label: "Deep Analytics", icon: BarChart4 },
    { id: "myaccount", label: "My Account ⭐", icon: UserIconCircle },
    { id: "settings", label: "App Settings", icon: Settings2 }
  ];

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    return (
      <Login
        userEmail={adminEmail}
        onSuccess={(role, email) => {
          setAdminRole(role);
          setAdminEmail(email);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 flex relative overflow-hidden font-sans">

      {adminRole === "admin" && (
    <div
      style={{
        background: "red",
        color: "white",
        padding: "10px",
        fontWeight: "bold",
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999
      }}
    >
      ADMIN TERDETEKSI
    </div>
      )}

      {/* GLOBAL MAINTENANCE DECORATOR BLOCK */}
      {appSettings.maintenanceMode && (
        <div className="fixed top-0 inset-x-0 bg-amber-500 font-sans text-xs text-center font-bold tracking-wide text-white py-1.5 z-50 flex items-center justify-center gap-2 shadow-sm">
          <Zap className="w-4 h-4 text-white animate-bounce" />
          Accessra Marketplace is currently in maintenance mode. Admins have access.
        </div>
      )}

      {/* Side HUD Frame Navigation - DESKTOP */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0d3b66] border-r border-white/10 h-screen shrink-0 relative z-30 transition-all">
        {/* Sleek ocean transition indicator line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400" />

        {/* Corporate branding logo area */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3 font-sans">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            className="filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.35)] cursor-pointer"
            onClick={() => setActiveTab("dashboard")}
          >
            <path
              d="M38 15C34 15 32 17 30 20L12 80C10 83 12 85 16 85H27C31 85 33 83 35 80L50 48C52 45 54 45 56 48L62 60L55 60C51 60 48 62 46 65L39 77C37 81 39 85 44 85H63L73 85C77 85 79 83 81 80L84 75C86 71 84 68 80 68H51L43 51L62 20C64 17 62 15 58 15H38Z"
              fill={appSettings.themeColor || "#0ea5e9"}
            />
          </svg>
          <div>
            <h1 className="text-sm font-extrabold tracking-wide text-white leading-tight">Accessra <span className="text-sky-300">Admin</span></h1>
            <span className="text-[10px] text-sky-200/50 block uppercase font-mono tracking-widest font-bold">Marketplace</span>
          </div>
        </div>

        {/* Admin parameters summary */}
        <div className="p-4 mx-4 my-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 font-sans">
          <img
            src={adminAvatar}
            alt={adminName}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-inner bg-sky-150 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[11px] text-white font-bold truncate block max-w-[125px] font-sans">
              {adminName}
            </span>
            <span className="p-0.5 px-2 rounded-full text-[8px] font-extrabold bg-sky-500/20 text-sky-200 border border-sky-400/20 uppercase inline-block font-sans select-none leading-none">
              {t(adminRole === "Super Admin" ? "Root Super Admin" : "Staff")}
            </span>
          </div>
        </div>

        {/* Sidebar Nav menu Option buttons */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-none text-xs font-sans">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-left transition-all duration-200 cursor-pointer font-bold ${
                  isSelected
                    ? "bg-white/15 text-white border border-white/10 shadow-sm"
                    : "text-sky-100/70 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-sky-300 animate-pulse" : "text-sky-100/40"}`} />
                <span>{t(item.id)}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout bottom */}
        <div className="p-4 border-t border-white/10 font-sans">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/20 text-sky-200 hover:text-rose-100 font-bold transition-all text-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {t("Sign Out")}
          </button>
        </div>
      </aside>

      {/* Mobile drawer backdrop and side menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex font-sans">
            {/* Backdrop click dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900"
            />
            
             {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="relative w-72 bg-[#0d3b66] h-full flex flex-col justify-between p-6 border-r border-white/10 z-50 font-sans"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-sky-400 animate-pulse" />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">{t("Accessra Admin")}</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-sky-200 hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Admin parameters summary */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 font-sans">
                  <img
                    src={adminAvatar}
                    alt={adminName}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-inner bg-sky-150 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-white font-bold truncate block max-w-[125px] font-sans">
                      {adminName}
                    </span>
                    <span className="p-0.5 px-2 rounded-full text-[8px] font-extrabold bg-sky-500/20 text-sky-200 border border-sky-400/20 uppercase inline-block font-sans select-none leading-none">
                      {t(adminRole === "Super Admin" ? "Root Super Admin" : "Staff")}
                    </span>
                  </div>
                </div>

                <nav className="space-y-1">
                  {sidebarMenu.map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-left transition-all font-bold text-xs cursor-pointer ${
                          isSelected
                            ? "bg-white/15 text-white border border-white/10"
                            : "text-sky-100/70 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <Icon className={`w-4.5 h-4.5 shrink-0 ${isSelected ? "text-sky-300 scale-105" : "text-sky-100/40"}`} />
                        <span>{t(item.id)}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/20 text-sky-200 hover:text-rose-100 font-bold transition-all text-xs cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                {t("Sign Out")}
              </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Right Canvas content Frame */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative z-10 pt-8 lg:pt-0 pb-8 px-4 lg:px-8">
        
        {/* Real-time Order notification header slide-in widget */}
        <AnimatePresence>
          {liveNotification && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-4 inset-x-4 lg:right-8 lg:left-auto lg:max-w-md bg-white border border-slate-100 p-4 rounded-2xl shadow-xl shadow-slate-200/50 flex items-start gap-3 z-40"
            >
              <BellRing className="w-5 h-5 text-sky-500 shrink-0 mt-0.5 animate-bounce" />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-800">{liveNotification.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{liveNotification.desc}</p>
              </div>
              <button onClick={() => setLiveNotification(null)} className="text-slate-400 hover:text-slate-600 text-xs font-semibold">&times;</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Floating Header Area - Navbar: Biru Laut (Sea Blue) */}
        <header className="flex h-16 items-center justify-between bg-[#0d3b66] border border-[#0d3b66]/20 px-6 py-4 rounded-2xl shadow-lg shadow-sky-950/5 mt-4 mb-6 shrink-0 relative text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white hover:text-sky-200 bg-white/10 border border-white/15 rounded-xl cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 uppercase">
                {t(activeTab + "_mgmt")}
              </h2>
              <span className="text-[11px] text-sky-200/70 block font-normal">
                {t("Accessra Digital Marketplace Administration Panel")}
              </span>
            </div>
          </div>

          {/* Right quick telemetry metadata - fully human-labeled */}
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-100">
            <Globe2 className="w-4 h-4 text-sky-300 animate-pulse" />
            <span className="hidden sm:inline">{t("Secure Connection Status:")}</span>
            <span className="bg-white/15 border border-white/10 text-sky-200 font-extrabold px-3 py-1 rounded-full text-[10px]">{t("Active")}</span>
          </div>
        </header>

        {/* Main interactive Tab Routing panels */}
        <div className="flex-1 pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === "dashboard" && (
                <DashboardView
                  products={products}
                  orders={orders}
                  users={users}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === "products" && (
                <ProductManagementView
                  products={products}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              )}
              {activeTab === "orders" && (
                <OrderManagementView
                  orders={orders}
                  onVerifyOrder={handleVerifyOrder}
                  onRefundOrder={handleRefundOrder}
                />
              )}
              {activeTab === "gateways" && (
                <PaymentGatewayView
                  initialConfigs={paymentGatewaysData}
                  errorLogs={errorPaymentLogs}
                />
              )}
              {activeTab === "users" && (
                <UserManagementView
                  users={users}
                  onToggleUserStatus={handleToggleUserStatus}
                  onUpdateUserRole={handleUpdateUserRole}
                  onUpdateUser={handleUpdateUser}
                />
              )}
              {activeTab === "promos" && (
                <PromoManagementView
                  vouchers={vouchers}
                  flashSales={flashSales}
                  products={products}
                  onAddVoucher={handleAddVoucher}
                  onDeleteVoucher={handleDeleteVoucher}
                  onToggleFlashSale={handleToggleFlashSale}
                />
              )}
              {activeTab === "support" && (
                <CustomerSupportView
                  tickets={tickets}
                  onReplyTicket={handleReplyTicket}
                  onResolveTicket={handleResolveTicket}
                />
              )}
              {activeTab === "security" && (
                <SecurityPanel
                  deviceInfos={deviceInfos}
                  onToggleDeviceStatus={handleToggleDeviceStatus}
                />
              )}
              {activeTab === "analytics" && <AnalyticsView />}
              {activeTab === "myaccount" && (
                <MyAccountView
                  adminName={adminName}
                  adminEmail={adminEmail}
                  adminPhone={adminPhone}
                  adminAvatar={adminAvatar}
                  twoFAEnabled={twoFAEnabled}
                  adminLanguage={adminLanguage}
                  adminTimezone={adminTimezone}
                  deviceInfos={deviceInfos}
                  onUpdateProfile={handleUpdateProfile}
                  onSignOut={handleLogout}
                  onSignOutAllDevices={handleSignOutAllDevices}
                  onRevokeDevice={handleRevokeDevice}
                />
              )}
              {activeTab === "settings" && (
                <SettingsView
                  appSettings={appSettings}
                  onUpdateSettings={setAppSettings}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
