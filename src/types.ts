/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  promoPrice?: number;
  stock: number;
  autoStock: boolean;
  status: "Active" | "Draft" | "Archived";
  thumbnail: string;
  deliveryType: "Instant Key" | "Download Link" | "Credentials";
  deliveryContent: string;
}

export interface Order {
  id: string;
  customerEmail: string;
  productId: string;
  productTitle: string;
  amount: number;
  date: string;
  paymentGateway: "Duitku" | "Xendit" | "Midtrans";
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded";
  orderStatus: "Completed" | "Processing" | "Pending Verification" | "Refunded";
  referenceId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Staff" | "User";
  status: "Active" | "Suspended" | "Banned";
  joinedDate: string;
  referralCode: string;
  referralsCount: number;
  balance: number;
  activityLog: Array<{
    action: string;
    timestamp: string;
    ip: string;
  }>;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  status: "Open" | "Processing" | "Resolved";
  channel: "WhatsApp" | "Web Chat" | "Ticket";
  category: "Refund" | "Delivery Failure" | "Billing" | "Inquiry";
  messages: Array<{
    id: string;
    sender: "admin" | "customer";
    text: string;
    timestamp: string;
  }>;
}

export interface PromoVoucher {
  id: string;
  code: string;
  discountType: "Percentage" | "Fixed";
  value: number;
  minPurchase: number;
  maxUsage: number;
  usageCount: number;
  status: "Active" | "Expired";
  expiryDate: string;
}

export interface FlashSale {
  id: string;
  productId: string;
  promoPrice: number;
  stockLimit: number;
  soldCount: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface DeviceInfo {
  id: string;
  adminEmail: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  timestamp: string;
  trustScore: number;
  status: "Trusted" | "Flagged" | "Blocked";
}

export interface GatewayConfig {
  merchantCode: string;
  apiKey: string;
  sandbox: boolean;
  callbackUrl: string;
  isEnabled: boolean;
}

export interface AppSettings {
  appName: string;
  maintenanceMode: boolean;
  themeColor: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpEmail: string;
  pushServerKey: string;
}
