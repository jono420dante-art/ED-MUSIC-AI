'use client';

import { useState, useRef } from 'react';

interface Sample {
  id: string;
  name: string;
  category: string;
  bpm: number;
  key: string;
  duration: string;
  tags: string[];
  url: string;
  waveform?: number[];
  liked: boolean;
  downloads: number;
}

const SAMPLE_CATEGORIES = ['All', 'Drums', 'Bass', 'Leads', 'Pads', 'FX', 'Vocals', 'Loops', 'One-Shots', 'Atmospheres'];

const MOCK_SAMPLES: Sample[] = [
  { id: '1', name: 'Deep House Kick', category: 'Drums', bpm: 124, key: 'C', duration: '0:02', tags: ['kick', 'deep', 'punchy'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: false, downloads: 1247 },
  { id: '2', name: 'Afro Bass Loop', category: 'Bass', bpm: 120, key: 'Am', duration: '0:04', tags: ['bass', 'afro', 'loop'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: true, downloads: 843 },
  { id: '3', name: 'Synth Lead Rise', category: 'Leads', bpm: 128, key: 'F', duration: '0:08', tags: ['synth', 'rise', 'tension'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: false, downloads: 2341 },
  { id: '4', name: 'Ambient Pad Wash', category: 'Pads', bpm: 90, key: 'Gm', duration: '0:16', tags: ['pad', 'ambient', 'lush'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: false, downloads: 567 },
  { id: '5', name: 'Vocal Chop Pack', category: 'Vocals', bpm: 130, key: 'Dm', duration: '0:03', tags: ['vocal', 'chop', 'house'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: true, downloads: 3102 },
  { id: '6', name: 'TR-808 Snare', category: 'Drums', bpm: 0, key: 'N/A', duration: '0:01', tags: ['snare', '808', 'classic'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: false, downloads: 4521 },
  { id: '7', name: 'Sub Bass Wobble', category: 'Bass', bpm: 140, key: 'C', duration: '0:02', tags: ['sub', 'wobble', 'bass'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: false, downloads: 1893 },
  { id: '8', name: 'Cymbal Swell FX', category: 'FX', bpm: 0, key: 'N/A', duration: '0:04', tags: ['cymbal', 'swell', 'transition'], url: '', waveform: Array.from({length: 40}, () => Math.random()), liked: true, downloads: 723 },
];

export default function SamplesSection() {
  const [samples, setSamples] = useState<Sample[]>(MOCK_SAMPLES);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [playing, setPlaying] = useState<string | null>(null);
  const [bpmFilter, setBpmFilter] = useState<[number, number]>([60, 200]);
  const [sortBy, setSortBy] = useState<'name' | 'bpm' | 'downloads'>('downloads');
  const audioRef = useRef<HTMLAudioElement>(null);

  const filtered = samples
    .filter(s => category === 'All' || s.category === category)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.includes(search.toLowerCase())))
    .filter(s => s.bpm === 0 || (s.bpm >= bpmFilter[0] && s.bpm <= bpmFilter[1]))
    .sort((a, b) => {
      if (sortBy === 'bpm') return a.bpm - b.bpm;
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      return a.name.localeCompare(b.name);
    });

  const togglePlay = (id: string) => {
    setPlaying(prev => prev === id ? null : id);
  };

  const toggleLike = (id: string) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, liked: !s.liked } : s));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header / Filters */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">🎵 Sample Library</h2>
            <p className="text-gray-400 text-sm">Browse & preview {samples.length} professional samples</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="downloads">Most Downloaded</option>
              <option value="bpm">BPM</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search samples, tags..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {SAMPLE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                category === cat
                  ? 'bg-pink-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sample List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-2">
          {filtered.map(sample => (
            <div
              key={sample.id}
              className={`glass-card p-4 flex items-center gap-4 group hover:border-pink-500/30 transition-all ${
                playing === sample.id ? 'border-pink-500/50 bg-pink-500/5' : ''
              }`}
            >
              {/* Play Button */}
              <button
                onClick={() => togglePlay(sample.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                  playing === sample.id
                    ? 'bg-pink-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-pink-600/50'
                }`}
              >
                {playing === sample.id ? '⏸' : '▶'}
              </button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{sample.name}</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">{sample.category}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {sample.bpm > 0 && <span>♩ {sample.bpm} BPM</span>}
                  <span>🎵 {sample.key}</span>
                  <span>⏱ {sample.duration}</span>
                </div>
              </div>

              {/* Waveform */}
              <div className="hidden md:flex items-center gap-px h-8 w-32">
                {sample.waveform?.map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      playing === sample.id ? 'bg-pink-500' : 'bg-white/30'
                    }`}
                    style={{ height: `${Math.max(4, h * 32)}px` }}
                  />
                ))}
              </div>

              {/* Tags */}
              <div className="hidden lg:flex gap-1">
                {sample.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-gray-500">{sample.downloads.toLocaleString()} ↓</span>
                <button
                  onClick={() => toggleLike(sample.id)}
                  className={`p-2 rounded-lg transition-all ${
                    sample.liked ? 'text-pink-400 bg-pink-400/10' : 'text-gray-500 hover:text-pink-400'
                  }`}
                >
                  {sample.liked ? '♥' : '♡'}
                </button>
                <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                  ⬇
                </button>
                <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                  +
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="text-4xl mb-3">🎵</div>
              <div className="text-sm">No samples found</div>
              <div className="text-xs mt-1">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </div>

      {/* Player Bar */}
      {playing && (
        <div className="border-t border-white/10 p-4 flex items-center gap-4 bg-black/30 backdrop-blur-sm">
          <button onClick={() => setPlaying(null)} className="text-gray-400 hover:text-white">✕</button>
          <div className="flex-1">
            <div className="text-sm font-medium">{samples.find(s => s.id === playing)?.name}</div>
            <div className="h-1 bg-white/10 rounded-full mt-1">
              <div className="h-full bg-pink-500 rounded-full w-1/3 animate-pulse" />
            </div>
          </div>
          <span className="text-xs text-gray-400">Playing...</span>
        </div>
      )}
    </div>
  );
}
