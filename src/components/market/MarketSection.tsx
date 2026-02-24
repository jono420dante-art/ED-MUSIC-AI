'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  creator: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  featured: boolean;
  preview?: string;
  sales: number;
}

const MARKET_CATEGORIES = ['All', 'Sample Packs', 'Presets', 'Loops', 'FX Chains', 'MIDI Packs', 'Templates', 'Plugins'];

const PRODUCTS: Product[] = [
  { id: '1', name: 'Afrobeat Essentials Vol.1', creator: 'DieterPRO', price: 29.99, category: 'Sample Packs', rating: 4.9, reviews: 342, description: '500+ premium Afrobeat samples, loops and one-shots', tags: ['afro', 'beats', 'drums', 'bass'], featured: true, sales: 1247 },
  { id: '2', name: 'Deep House FX Collection', creator: 'SoundForge', price: 19.99, category: 'FX Chains', rating: 4.7, reviews: 218, description: '7 professional FX chains for deep house production', tags: ['fx', 'house', 'chains', 'effects'], featured: true, sales: 893 },
  { id: '3', name: 'Granular Synthesis Presets', creator: 'GrainMaster', price: 24.99, category: 'Presets', rating: 4.8, reviews: 156, description: '250+ granular synthesis presets for unique textures', tags: ['granular', 'presets', 'texture', 'ambient'], featured: false, sales: 634 },
  { id: '4', name: 'Trap Hi-Hat Loops', creator: 'TrapLord', price: 14.99, category: 'Loops', rating: 4.6, reviews: 445, description: '200 trap hi-hat patterns at various BPMs', tags: ['trap', 'hihats', 'loops', 'drums'], featured: false, sales: 2341 },
  { id: '5', name: 'Cinematic Strings MIDI', creator: 'OrchestraX', price: 34.99, category: 'MIDI Packs', rating: 4.9, reviews: 87, description: 'Professional cinematic string MIDI progressions', tags: ['cinematic', 'strings', 'midi', 'orchestral'], featured: true, sales: 421 },
  { id: '6', name: 'UK Drill Template Bundle', creator: 'DrillKing', price: 39.99, category: 'Templates', rating: 4.5, reviews: 193, description: '10 full UK Drill production templates', tags: ['drill', 'uk', 'template', 'production'], featured: false, sales: 1089 },
  { id: '7', name: 'Bass House Synthesis Pack', creator: 'BassLab', price: 22.99, category: 'Presets', rating: 4.7, reviews: 267, description: 'Massive synth presets for bass house music', tags: ['bass', 'house', 'synth', 'presets'], featured: false, sales: 762 },
  { id: '8', name: 'Vocal Harmonics Bundle', creator: 'VocalAI', price: 27.99, category: 'Sample Packs', rating: 4.8, reviews: 134, description: 'AI-processed vocal harmony samples and loops', tags: ['vocals', 'harmonics', 'ai', 'loops'], featured: true, sales: 534 },
];

export default function MarketSection() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price' | 'rating' | 'sales'>('featured');
  const [cart, setCart] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = PRODUCTS
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'featured') return Number(b.featured) - Number(a.featured);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.sales - a.sales;
    });

  const toggleCart = (id: string) => {
    setCart(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, id) => {
    const p = PRODUCTS.find(p => p.id === id);
    return sum + (p?.price || 0);
  }, 0);

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Left Sidebar */}
      <div className="w-64 flex flex-col gap-4 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold">🛍️ Market</h2>
          <p className="text-gray-400 text-sm">Premium sounds & tools</p>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div>
          <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Categories</div>
          <div className="space-y-1">
            {MARKET_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  category === cat
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <div className="glass-card p-4 mt-auto">
            <div className="font-medium mb-2">🛒 Cart ({cart.length})</div>
            {cart.map(id => {
              const p = PRODUCTS.find(p => p.id === id);
              return p ? (
                <div key={id} className="flex justify-between text-sm text-gray-300 mb-1">
                  <span className="truncate">{p.name}</span>
                  <span>${p.price}</span>
                </div>
              ) : null;
            })}
            <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-pink-400">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full mt-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-all">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sort Bar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-400">{filtered.length} products found</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Sort:</span>
            {(['featured', 'price', 'rating', 'sales'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1 rounded-full text-xs transition-all capitalize ${
                  sortBy === s ? 'bg-pink-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(product => (
            <div key={product.id} className="glass-card overflow-hidden hover:border-pink-500/30 transition-all group">
              {/* Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-purple-900/50 to-pink-900/30 flex items-center justify-center relative">
                <div className="text-5xl">
                  {product.category === 'Sample Packs' ? '🎵' :
                   product.category === 'FX Chains' ? '🎛️' :
                   product.category === 'Presets' ? '🎹' :
                   product.category === 'Loops' ? '🔄' :
                   product.category === 'MIDI Packs' ? '🎼' :
                   product.category === 'Templates' ? '📋' : '🔌'}
                </div>
                {product.featured && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-pink-600 rounded text-xs font-medium">
                    ⭐ Featured
                  </span>
                )}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs">
                  {product.sales.toLocaleString()} sold
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-gray-500">by {product.creator}</div>
                  </div>
                  <div className="text-pink-400 font-bold">${product.price}</div>
                </div>

                <div className="text-xs text-gray-400 mb-3">{product.description}</div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400 text-xs">★ {product.rating}</span>
                  <span className="text-gray-500 text-xs">({product.reviews} reviews)</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500">#{tag}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                      cart.includes(product.id)
                        ? 'bg-pink-600/30 border border-pink-500/50 text-pink-300'
                        : 'bg-pink-600 hover:bg-pink-700 text-white'
                    }`}
                  >
                    {cart.includes(product.id) ? '✓ Added' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="px-3 py-2 rounded-lg text-xs bg-white/10 hover:bg-white/20 text-gray-300 transition-all"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="glass-card w-full max-w-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
                <div className="text-sm text-gray-400">by {selectedProduct.creator}</div>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="h-48 bg-gradient-to-br from-purple-900/50 to-pink-900/30 rounded-xl flex items-center justify-center mb-4">
              <span className="text-7xl">🎵</span>
            </div>
            <div className="text-sm text-gray-300 mb-4">{selectedProduct.description}</div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">★ {selectedProduct.rating}</span>
              <span className="text-gray-500 text-sm">({selectedProduct.reviews} reviews)</span>
              <span className="text-gray-500 text-sm">• {selectedProduct.sales.toLocaleString()} sold</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { toggleCart(selectedProduct.id); setSelectedProduct(null); }}
                className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-semibold text-white hover:opacity-90 transition-all"
              >
                {cart.includes(selectedProduct.id) ? '✓ In Cart' : `Add to Cart - $${selectedProduct.price}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
