/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { Plus, Edit2, Trash2, Save, Key, Download, Server, Sparkles } from "lucide-react";

interface ProductManagementViewProps {
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ProductManagementView({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}: ProductManagementViewProps) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("SaaS");
  const [price, setPrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [stock, setStock] = useState("");
  const [autoStock, setAutoStock] = useState(true);
  const [status, setStatus] = useState<"Active" | "Draft" | "Archived">("Active");
  const [thumbnail, setThumbnail] = useState("");
  const [deliveryType, setDeliveryType] = useState<"Instant Key" | "Download Link" | "Credentials">("Instant Key");
  const [deliveryContent, setDeliveryContent] = useState("");

  const categories = ["All", "SaaS", "Templates", "API Keys", "Courses", "E-books"];
  const thumbnailOptions = [
    { label: "Neural Flow Banner", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
    { label: "SaaS Blueprint Abstract", url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80" },
    { label: "Developer Blue Neon", url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80" },
    { label: "Cyber Terminal Art", url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80" }
  ];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setTitle("");
    setDescription("");
    setCategory("SaaS");
    setPrice("49.00");
    setPromoPrice("");
    setStock("100");
    setAutoStock(true);
    setStatus("Active");
    setThumbnail(thumbnailOptions[0].url);
    setDeliveryType("Instant Key");
    setDeliveryContent("ACCESSRA-DEMO-LICENSE-KEY");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setTitle(prod.title);
    setDescription(prod.description);
    setCategory(prod.category);
    setPrice(prod.price.toString());
    setPromoPrice(prod.promoPrice ? prod.promoPrice.toString() : "");
    setStock(prod.stock.toString());
    setAutoStock(prod.autoStock);
    setStatus(prod.status);
    setThumbnail(prod.thumbnail);
    setDeliveryType(prod.deliveryType);
    setDeliveryContent(prod.deliveryContent);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const formattedProduct: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      title,
      description,
      category,
      price: parseFloat(price),
      promoPrice: promoPrice ? parseFloat(promoPrice) : undefined,
      stock: autoStock ? 99999 : parseInt(stock) || 0,
      autoStock,
      status,
      thumbnail: thumbnail || thumbnailOptions[0].url,
      deliveryType,
      deliveryContent
    };

    if (editingProduct) {
      onUpdateProduct(formattedProduct);
    } else {
      onAddProduct(formattedProduct);
    }
    setIsModalOpen(false);
  };

  const filtered = filterCategory === "All"
    ? products
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="space-y-6 select-none">
      {/* Header Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterCategory === cat
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Digital Product
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="rounded-3xl border border-slate-100 bg-white overflow-hidden relative flex flex-col group hover:border-sky-300 hover:shadow-lg transition-all shadow-sm"
          >
            {/* Stock/Visibility Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${
                prod.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50" : "bg-slate-100 text-slate-500"
              }`}>
                {prod.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-sky-50 text-sky-600 border border-sky-100/50">
                {prod.category}
              </span>
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden border-b border-slate-100">
              <img
                referrerPolicy="no-referrer"
                src={prod.thumbnail}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/40 to-transparent p-4 flex items-end justify-between">
                <span className="text-[10px] bg-white/90 backdrop-blur px-2 py-0.5 rounded text-slate-700 font-bold font-mono border border-slate-200/50 shadow-sm">
                  ID: {prod.id}
                </span>

                <div className="flex gap-2">
                  <span className="p-1 px-2.5 rounded bg-sky-500/90 text-white backdrop-blur font-bold text-[9px] flex items-center gap-1 shadow-sm">
                    {prod.deliveryType === "Instant Key" && <Key className="w-3 h-3" />}
                    {prod.deliveryType === "Download Link" && <Download className="w-3 h-3" />}
                    {prod.deliveryType === "Credentials" && <Server className="w-3 h-3" />}
                    {prod.deliveryType}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-snug group-hover:text-sky-600 transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 h-8 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  {prod.promoPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold font-mono text-sky-600">${prod.promoPrice}</span>
                      <span className="text-xs line-through font-mono text-slate-400">${prod.price}</span>
                    </div>
                  ) : (
                    <span className="text-base font-bold font-mono text-slate-800">${prod.price}</span>
                  )}
                  <span className="text-[10px] text-slate-400 font-bold font-mono mt-0.5">
                    Stock: {prod.autoStock ? "∞ Unbounded" : `${prod.stock} items left`}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                    title="Edit Properties"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteProduct(prod.id)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 text-slate-500 hover:text-red-600 transition-all cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP CONTAINER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-sky-500" />
              {editingProduct ? "MODIFY DIGITAL PRODUCT" : "REGISTER NEW DIGITAL PRODUCT"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase mb-1 font-bold">Product Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. NextJS SaaS Boilerplate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] uppercase mb-1 font-bold">Category Classification</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none transition-all"
                  >
                    <option value="SaaS">SaaS Utilities</option>
                    <option value="Templates">Templates & UI kits</option>
                    <option value="API Keys">Developer API Keys</option>
                    <option value="Courses">Interactive Courseware</option>
                    <option value="E-books">E-books & Guides</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 text-[10px] uppercase mb-1 font-bold">Resource Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter high quality product specifications..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase mb-1 font-bold">Base Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] uppercase mb-1 font-bold">Promo Discount Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={promoPrice}
                    onChange={(e) => setPromoPrice(e.target.value)}
                    placeholder="None (Standard)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] uppercase mb-1 font-bold">Stock Management</label>
                  <div className="flex items-center gap-2 h-10">
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      disabled={autoStock}
                      className="w-1/2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-850 focus:outline-none disabled:opacity-50 font-mono"
                    />
                    <label className="flex items-center gap-1 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={autoStock}
                        onChange={(e) => setAutoStock(e.target.checked)}
                        className="rounded text-sky-500 focus:ring-sky-500"
                      />
                      <span className="text-[10px] text-slate-500 font-semibold font-mono">Infinite auto stock</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Delivery Protocol Panel */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-3">
                <div className="flex items-center justify-between border-b border-sky-200/50 pb-2">
                  <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">Digital Fulfillment Method</span>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as any)}
                    className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-1 rounded focus:outline-none focus:border-sky-400 font-medium cursor-pointer"
                  >
                    <option value="Instant Key">Instant Key (License Generator)</option>
                    <option value="Download Link">Secure Package Download URL</option>
                    <option value="Credentials">Server Configuration credentials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] mb-1">Payload Content (Dispatched instantly to customer on payment confirmation)</label>
                  <textarea
                    value={deliveryContent}
                    onChange={(e) => setDeliveryContent(e.target.value)}
                    rows={2}
                    placeholder={
                      deliveryType === "Instant Key"
                        ? "Enter pre-generated license key e.g. KEY-88A92HD"
                        : "Enter direct download storage URL..."
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 focus:border-sky-500 text-slate-800 text-xs focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              {/* Graphic Presets selection */}
              <div>
                <label className="block text-slate-500 text-[10px] uppercase mb-2 font-bold">Thumbnail Graphic selection</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  {thumbnailOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setThumbnail(opt.url)}
                      className={`p-2 rounded-xl border text-[10px] truncate shadow-sm font-semibold transition-all cursor-pointer ${
                        thumbnail === opt.url
                          ? "border-sky-500 bg-sky-50 text-sky-600"
                          : "border-slate-200 hover:border-slate-300 bg-white text-slate-500"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="Or paste any custom direct image path..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 text-slate-800 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Product specifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
