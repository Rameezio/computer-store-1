import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/products';
import { useToast } from '../../components/Toast';
import { Tag, Search, Package, X, Check, Percent, Edit2 } from 'lucide-react';

const AdminDeals = () => {
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [discountInput, setDiscountInput] = useState('');
  const [filter, setFilter] = useState('active'); // 'all' | 'active' | 'none'

  useEffect(() => { fetchProducts(); }, [searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { limit: 100 };
      if (searchTerm) params.search = searchTerm;
      const res = await productsAPI.getAll(params);
      setProducts(res.products || []);
    } catch {
      addToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getDiscount = (p) =>
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0;

  const handleApplyDiscount = async (product) => {
    const pct = Number(discountInput);
    if (!pct || pct < 1 || pct > 99) {
      addToast('Enter a valid discount (1–99%)', 'error');
      return;
    }
    setSaving(product._id);
    try {
      const origPrice = product.originalPrice || product.price;
      const salePrice = Math.round(origPrice - (origPrice * pct) / 100);
      await productsAPI.update(product._id, {
        price: salePrice,
        originalPrice: origPrice,
      });
      addToast(`${pct}% discount applied!`, 'success');
      setEditingId(null);
      setDiscountInput('');
      fetchProducts();
    } catch {
      addToast('Failed to apply discount', 'error');
    } finally {
      setSaving(null);
    }
  };

  const handleRemoveDiscount = async (product) => {
    setSaving(product._id);
    try {
      const origPrice = product.originalPrice || product.price;
      await productsAPI.update(product._id, {
        price: origPrice,
        originalPrice: null,
      });
      addToast('Discount removed', 'success');
      fetchProducts();
    } catch {
      addToast('Failed to remove discount', 'error');
    } finally {
      setSaving(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const hasDiscount = p.originalPrice && p.originalPrice > p.price;
    if (filter === 'active') return hasDiscount;
    if (filter === 'none') return !hasDiscount;
    return true;
  });

  const activeDealsCount = products.filter(p => p.originalPrice && p.originalPrice > p.price).length;
  const fmt = (n) => Number(n).toLocaleString('en-PK');

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-[#0f172a]">Deals & Discounts</h2>
          <p className="text-gray-500 text-sm mt-0.5">{activeDealsCount} active deals out of {products.length} products</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full">
            {activeDealsCount} ACTIVE
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Products', value: products.length, color: 'bg-blue-50 text-blue-600' },
          { label: 'Active Deals', value: activeDealsCount, color: 'bg-green-50 text-green-600' },
          { label: 'No Discount', value: products.length - activeDealsCount, color: 'bg-gray-50 text-gray-600' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center`}>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs font-bold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
          />
        </div>
        {/* Filter */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Has Discount' },
            { key: 'none', label: 'No Discount' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                filter === f.key
                  ? 'bg-[#00d4ff] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="grid gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 animate-pulse flex gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No products found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const discount = getDiscount(product);
            const hasDiscount = discount > 0;
            const isEditing = editingId === product._id;
            const isSaving = saving === product._id;

            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all p-4"
              >
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <div className="w-14 h-14 bg-[#f8f8f8] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <Package className="w-6 h-6 text-gray-300" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0f172a] font-black text-sm truncate">{product.name}</p>
                    <p className="text-gray-400 text-xs capitalize mt-0.5">{product.category}</p>
                  </div>

                  {/* Price info */}
                  <div className="text-right flex-shrink-0 hidden sm:block">
                    <p className="text-[#0f172a] font-black text-sm">Rs. {fmt(product.price)}</p>
                    {hasDiscount && (
                      <p className="text-gray-400 text-xs line-through">Rs. {fmt(product.originalPrice)}</p>
                    )}
                  </div>

                  {/* Discount badge */}
                  <div className="flex-shrink-0">
                    {hasDiscount ? (
                      <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                        -{discount}%
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-400 text-xs font-bold px-2.5 py-1 rounded-full">
                        No deal
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {hasDiscount && !isEditing && (
                      <button
                        onClick={() => handleRemoveDiscount(product)}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                      >
                        <X className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    )}
                    {!isEditing ? (
                      <button
                        onClick={() => { setEditingId(product._id); setDiscountInput(discount || ''); }}
                        className="flex items-center gap-1.5 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00b8e6] font-bold text-xs px-3 py-2 rounded-xl transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        {hasDiscount ? 'Edit' : 'Add Deal'}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Percent className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={discountInput}
                            onChange={e => setDiscountInput(e.target.value)}
                            placeholder="10"
                            className="w-20 border border-gray-200 rounded-xl pl-3 pr-7 py-2 text-sm font-bold focus:outline-none focus:border-[#00d4ff]/50"
                            autoFocus
                          />
                        </div>
                        <button
                          onClick={() => handleApplyDiscount(product)}
                          disabled={isSaving}
                          className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setEditingId(null); setDiscountInput(''); }}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDeals;
