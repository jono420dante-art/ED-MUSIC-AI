'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  creator: string;
  price: number;
  category: string;
  rating: number;
  downloads: number;
  tags: string[];
  emoji: string;
}

const MARKET_CATEGORIES = ['All', 'Samples', 'Presets', 'Tracks', 'Stems', 'Voices'];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Afro House Essentials',
    creator: 'Lagos Beats',
    price: 29.99,
    category: 'Samples',
    rating: 4.8,
    downloads: 1234,
    tags: ['afro', 'house', 'drums'],
    emoji: '🥁'
  },
  {
    id: '2',
    name: 'Amapiano Drums Vol 2',
    creator: 'JoBurg Sound',
    price: 24.99,
    category: 'Samples',
    rating: 4.9,
    downloads: 987,
    tags: ['amapiano', 'drums', 'log drums'],
    emoji: '🎧'
  },
  {
    id: '3',
    name: 'Granular Textures Pack',
    creator: 'Texture Lab',
    price: 19.99,
    category: 'Presets',
    rating: 4.7,
    downloads: 567,
    tags: ['granular', 'ambient', 'texture'],
    emoji: '✨'
  },
  {
    id: '4',
    name: 'Deep Bass Collection',
    creator: 'Sub Master',
    price: 34.99,
    category: 'Samples',
    rating: 4.6,
    downloads: 2345,
    tags: ['bass', '808', 'sub'],
    emoji: '🔊'
  },
  {
    id: '5',
    name: 'Vocal Chops Africa',
    creator: 'Voice Africa',
    price: 29.99,
    category: 'Voices',
    rating: 4.8,
    downloads: 876,
    tags: ['vocals', 'chops', 'africa'],
    emoji: '🎤'
  },
  {
    id: '6',
    name: 'Cinematic FX Bundle',
    creator: 'Film Sound Co',
    price: 49.99,
    category: 'Samples',
    rating: 4.9,
    downloads: 654,
    tags: ['cinematic', 'fx', 'risers'],
    emoji: '🎬'
  },
  {
    id: '7',
    name: 'Midnight Synth Presets',
    creator: 'Synth Lord',
    price: 39.99,
    category: 'Presets',
    rating: 4.5,
    downloads: 1123,
    tags: ['synth', 'preset', 'dark'],
    emoji: '🎹'
  },
  {
    id: '8',
    name: 'Trap Essentials 2024',
    creator: 'ATL Sounds',
    price: 27.99,
    category: 'Samples',
    rating: 4.7,
    downloads: 3456,
    tags: ['trap', 'hi-hats', '808'],
    emoji: '💎'
  }
];

export default function MarketSection() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = PRODUCTS.filter(p => 
    (category === 'All' || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.creator.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Marketplace</h1>
          <p className="text-gray-400">Premium samples, presets & sounds</p>
        </div>
        <div className="flex items-center gap-4 bg-[#111118] p-2 rounded-xl border border-[#1E1E2E]">
          <input 
            type="text" 
            placeholder="Search market..."
            className="bg-transparent border-none focus:ring-0 text-sm w-64 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {MARKET_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              category === cat ? 'bg-[#7C3AED] text-white' : 'bg-[#111118] text-gray-400 hover:bg-[#1E1E2E]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-[#111118] border border-[#1E1E2E] rounded-2xl overflow-hidden hover:border-[#7C3AED]/50 transition-all group">
            <div className="h-48 bg-[#0A0A0F] flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
              {product.emoji}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg truncate">{product.name}</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">{product.creator}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-5 min-h-[48px]">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-[#0A0A0F] text-[10px] text-gray-400 rounded uppercase tracking-wider font-semibold border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-gray-500 text-xs ml-1">{product.downloads.toLocaleString()}</span>
                </div>
                <div className="text-lg font-bold">${product.price}</div>
              </div>
              <button className="w-full mt-4 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-sm font-semibold transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
