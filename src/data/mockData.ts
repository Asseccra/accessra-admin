/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Order, User, SupportTicket, PromoVoucher, FlashSale, DeviceInfo } from "../types";

export const initialProducts: Product[] = [
  {
    id: "prod-101",
    title: "Accessra Cloud AI Booster",
    description: "Unlocks high-performance computing resources and pre-trained models for instant API responses. Seamlessly boots microservices.",
    category: "SaaS",
    price: 149.0,
    promoPrice: 99.0,
    stock: 50,
    autoStock: true,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60",
    deliveryType: "Instant Key",
    deliveryContent: "KEY-AI-BOOST-83FHA92-XP92"
  },
  {
    id: "prod-102",
    title: "Next.js SaaS Boilerplate (Elite Edition)",
    description: "Production-ready boilerplates containerized with PostgreSQL, Firebase, Stripe webhook integrations, and Tailwind styling.",
    category: "Templates",
    price: 79.0,
    promoPrice: 49.0,
    stock: 200,
    autoStock: true,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60",
    deliveryType: "Download Link",
    deliveryContent: "https://accessra.digital/dl/nextjs-saas-elite-v4.zip"
  },
  {
    id: "prod-103",
    title: "Google Workspace API Key Injector",
    description: "Automated Chrome extension token integration for managing calendar, tasks, and Google drive spreadsheet synchronization.",
    category: "API Keys",
    price: 29.0,
    stock: 120,
    autoStock: true,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=60",
    deliveryType: "Credentials",
    deliveryContent: "Client-Id: 9811-accessra.google.com\nSecret: GOCSPX-u981jas"
  },
  {
    id: "prod-104",
    title: "Advanced Tailwind Web3 UI Library",
    description: "300+ custom glowing responsive UI components designed strictly with Glassmorphism, tailored for modern cryptocurrency apps.",
    category: "Templates",
    price: 199.0,
    promoPrice: 129.0,
    stock: 0,
    autoStock: false,
    status: "Archived",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop&q=60",
    deliveryType: "Download Link",
    deliveryContent: "https://accessra.digital/dl/web3-ui-kit.zip"
  },
  {
    id: "prod-105",
    title: "Fullstack LLM Engineering Course",
    description: "Complete course covering prompt engineering, RAG, function calling, vector databases, and full deployment structures.",
    category: "Courses",
    price: 199.0,
    promoPrice: 159.0,
    stock: 1000,
    autoStock: true,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60",
    deliveryType: "Download Link",
    deliveryContent: "https://accessra.digital/courses/llm-en-bundle"
  }
];

export const initialOrders: Order[] = [
  {
    id: "ORD-9883",
    customerEmail: "johndoe@gmail.com",
    productId: "prod-101",
    productTitle: "Accessra Cloud AI Booster",
    amount: 99.0,
    date: "2026-06-04T12:35:00Z",
    paymentGateway: "Midtrans",
    paymentStatus: "Paid",
    orderStatus: "Completed",
    referenceId: "midtrans-773dfa105"
  },
  {
    id: "ORD-9882",
    customerEmail: "sarah.smith@yahoo.com",
    productId: "prod-102",
    productTitle: "Next.js SaaS Boilerplate (Elite Edition)",
    amount: 49.0,
    date: "2026-06-04T10:15:00Z",
    paymentGateway: "Xendit",
    paymentStatus: "Paid",
    orderStatus: "Completed",
    referenceId: "xen-pay-992a012"
  },
  {
    id: "ORD-9881",
    customerEmail: "rudy_setiawan@outlook.com",
    productId: "prod-103",
    productTitle: "Google Workspace API Key Injector",
    amount: 29.0,
    date: "2026-06-03T18:42:00Z",
    paymentGateway: "Duitku",
    paymentStatus: "Pending",
    orderStatus: "Pending Verification",
    referenceId: "duitku-inv-a0921"
  },
  {
    id: "ORD-9880",
    customerEmail: "kevin_dev@coder.io",
    productId: "prod-105",
    productTitle: "Fullstack LLM Engineering Course",
    amount: 159.0,
    date: "2026-06-03T11:20:00Z",
    paymentGateway: "Midtrans",
    paymentStatus: "Failed",
    orderStatus: "Processing",
    referenceId: "midtrans-err-2211"
  },
  {
    id: "ORD-9879",
    customerEmail: "linda.marina@gmail.com",
    productId: "prod-102",
    productTitle: "Next.js SaaS Boilerplate (Elite Edition)",
    amount: 49.0,
    date: "2026-06-02T15:30:00Z",
    paymentGateway: "Xendit",
    paymentStatus: "Refunded",
    orderStatus: "Refunded",
    referenceId: "ref-xen-8822"
  }
];

export const initialUsers: User[] = [
  {
    id: "usr-01",
    name: "John Doe",
    email: "johndoe@gmail.com",
    role: "User",
    status: "Active",
    joinedDate: "2026-05-10T08:00:00Z",
    referralCode: "JOHNAXESRA",
    referralsCount: 14,
    balance: 450000,
    activityLog: [
      { action: "Purchased Product Cloud AI Booster", timestamp: "2026-06-04T12:35:00Z", ip: "182.16.29.112" },
      { action: "Logged in via Google Auth", timestamp: "2026-06-04T12:30:00Z", ip: "182.16.29.112" }
    ]
  },
  {
    id: "usr-02",
    name: "Sarah Smith",
    email: "sarah.smith@yahoo.com",
    role: "User",
    status: "Active",
    joinedDate: "2026-05-18T14:22:00Z",
    referralCode: "SARAH88",
    referralsCount: 8,
    balance: 240000,
    activityLog: [
      { action: "Purchased SaaS Boilerplate Elite", timestamp: "2026-06-04T10:15:00Z", ip: "109.82.73.44" }
    ]
  },
  {
    id: "usr-03",
    name: "Ahmad Setiawan",
    email: "rudy_setiawan@outlook.com",
    role: "User",
    status: "Active",
    joinedDate: "2026-06-01T09:11:00Z",
    referralCode: "AHMADCRA",
    referralsCount: 1,
    balance: 0,
    activityLog: [
      { action: "Initiated Checkout for API Key Injector", timestamp: "2026-06-03T18:40:00Z", ip: "36.85.11.233" }
    ]
  },
  {
    id: "usr-04",
    name: "Spammer Bandit",
    email: "spammer@malicious.xyz",
    role: "User",
    status: "Banned",
    joinedDate: "2026-06-02T02:00:00Z",
    referralCode: "FAKEPROMO",
    referralsCount: 0,
    balance: 0,
    activityLog: [
      { action: "Brute-forced Voucher codes with high frequency", timestamp: "2026-06-02T02:15:00Z", ip: "203.0.113.88" }
    ]
  },
  {
    id: "usr-05",
    name: "Kevin De Staff",
    email: "kevin.staff@accessra.digital",
    role: "Staff",
    status: "Active",
    joinedDate: "2026-01-15T09:00:00Z",
    referralCode: "STAFFKEV",
    referralsCount: 22,
    balance: 1200000,
    activityLog: [
      { action: "Updated database inventory stock", timestamp: "2026-06-04T11:05:00Z", ip: "182.16.50.2" }
    ]
  }
];

export const initialTickets: SupportTicket[] = [
  {
    id: "TCK-882",
    customerName: "John Doe",
    customerEmail: "johndoe@gmail.com",
    subject: "Cloud AI Booster license key failed activation",
    status: "Open",
    channel: "Web Chat",
    category: "Delivery Failure",
    messages: [
      { id: "m1", sender: "customer", text: "Hi, I just bought the AI Booster key but it returns. Failed to authenticate.", timestamp: "2026-06-04T12:40:00Z" },
      { id: "m2", sender: "admin", text: "Checking your order. Yes, we found it has key sync issues. Can you try again with this updated key?", timestamp: "2026-06-04T12:45:00Z" },
      { id: "m3", sender: "customer", text: "Ok checking it now...", timestamp: "2026-06-04T12:48:00Z" }
    ]
  },
  {
    id: "TCK-881",
    customerName: "Rudy Setiawan",
    customerEmail: "rudy_setiawan@outlook.com",
    subject: "Manual verification for my Bank transfer gateway",
    status: "Processing",
    channel: "WhatsApp",
    category: "Billing",
    messages: [
      { id: "m4", sender: "customer", text: "Saya sudah transfer lewat Duitku mandiri virtual account, statusnya masih pending. Ini resinya.", timestamp: "2026-06-04T08:12:00Z" },
      { id: "m5", sender: "admin", text: "Terimakasih kak Ahmad, tim finance sedang mencocokan invoice. Silakan tunggu sebentar.", timestamp: "2026-06-04T08:20:00Z" }
    ]
  },
  {
    id: "TCK-880",
    customerName: "Melly Jane",
    customerEmail: "mellyj@example.com",
    subject: "How can I access my referral balance",
    status: "Resolved",
    channel: "Ticket",
    category: "Inquiry",
    messages: [
      { id: "m6", sender: "customer", text: "Where is the button to cash out my commissions?", timestamp: "2026-06-03T11:00:00Z" },
      { id: "m7", sender: "admin", text: "Hello! You can request withdrawal under your Settings > Referral page once balance is over $20.", timestamp: "2026-06-03T14:30:00Z" },
      { id: "m8", sender: "customer", text: "Awesome! Worked like charm. Thanks admin.", timestamp: "2026-06-03T15:00:00Z" }
    ]
  }
];

export const initialVouchers: PromoVoucher[] = [
  {
    id: "v-01",
    code: "RAMADHANLAUNCH",
    discountType: "Percentage",
    value: 20,
    minPurchase: 50.0,
    maxUsage: 100,
    usageCount: 42,
    status: "Active",
    expiryDate: "2026-07-31"
  },
  {
    id: "v-02",
    code: "SAASELITE50",
    discountType: "Fixed",
    value: 50,
    minPurchase: 100.0,
    maxUsage: 10,
    usageCount: 10,
    status: "Expired",
    expiryDate: "2026-06-01"
  },
  {
    id: "v-03",
    code: "CASHBACK10",
    discountType: "Percentage",
    value: 10,
    minPurchase: 20.0,
    maxUsage: 500,
    usageCount: 18,
    status: "Active",
    expiryDate: "2026-08-15"
  }
];

export const initialFlashSales: FlashSale[] = [
  {
    id: "fs-01",
    productId: "prod-101",
    promoPrice: 69.0,
    stockLimit: 15,
    soldCount: 9,
    startTime: "2026-06-04T18:00:00Z",
    endTime: "2026-06-05T00:00:00Z",
    isActive: true
  },
  {
    id: "fs-02",
    productId: "prod-102",
    promoPrice: 29.0,
    stockLimit: 20,
    soldCount: 3,
    startTime: "2026-06-10T12:00:00Z",
    endTime: "2026-06-10T18:00:00Z",
    isActive: false
  }
];

export const initialDevices: DeviceInfo[] = [
  {
    id: "dev-01",
    adminEmail: "jigongasem3@gmail.com",
    browser: "Chrome v124",
    os: "macOS 14.4",
    ip: "182.16.29.1",
    location: "Jakarta, Indonesia",
    timestamp: "2026-06-04T23:15:00Z",
    trustScore: 98,
    status: "Trusted"
  },
  {
    id: "dev-02",
    adminEmail: "guest.staff@accessra.digital",
    browser: "Firefox Dev Edition",
    os: "Linux x86_64",
    ip: "36.85.12.89",
    location: "Surabaya, Indonesia",
    timestamp: "2026-06-04T19:30:00Z",
    trustScore: 85,
    status: "Trusted"
  },
  {
    id: "dev-03",
    adminEmail: "unknown@malicious.ru",
    browser: "Safari (Headless)",
    os: "Windows 10",
    ip: "45.188.19.22",
    location: "Moscow, Russia",
    timestamp: "2026-06-04T21:40:00Z",
    trustScore: 12,
    status: "Flagged"
  }
];

export const paymentGatewaysData = {
  Duitku: { merchantCode: "D10928", apiKey: "d83g2h9rghas8fhajskfh89rf", sandbox: true, callbackUrl: "https://accessra.digital/api/callbacks/duitku", isEnabled: true },
  Xendit: { merchantCode: "XN_PROD_11", apiKey: "xnd_development_9sh28dhH7sh2uDh7sa", sandbox: true, callbackUrl: "https://accessra.digital/api/callbacks/xendit", isEnabled: true },
  Midtrans: { merchantCode: "MID_TRANS_22", apiKey: "SB-Mid-server-82hdaHsa89ghAs", sandbox: true, callbackUrl: "https://accessra.digital/api/callbacks/midtrans", isEnabled: false }
};

export const defaultSettings = {
  appName: "Accessra Digital",
  maintenanceMode: false,
  themeColor: "#0ea5e9",
  smtpHost: "smtp.mailgun.org",
  smtpPort: 587,
  smtpUser: "postmaster@mg.accessra.digital",
  smtpEmail: "noreply@accessra.digital",
  pushServerKey: "AAAA8R9U...2F8H"
};

export const errorPaymentLogs = [
  { id: "e-1", timestamp: "2026-06-04T12:15:00Z", gateway: "Xendit", amount: 49.0, code: "API_TIMEOUT", message: "Connect to api.xendit.co timed out after 5000ms" },
  { id: "e-2", timestamp: "2026-06-04T09:12:00Z", gateway: "Duitku", amount: 15.0, code: "SIGNATURE_MISMATCH", message: "Callback signature hash calculation did not match payload" },
  { id: "e-3", timestamp: "2026-06-03T18:04:00Z", gateway: "Midtrans", amount: 129.0, code: "DENIED_BY_FRAUD_PROG", message: "Payment flag status: deny. 3D Secure score low" }
];
