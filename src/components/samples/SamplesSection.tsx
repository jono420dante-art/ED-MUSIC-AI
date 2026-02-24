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
  waveform: number[];
  liked: boolean;
  downloads: number;
}

const SAMPLE_CATEGORIES = ['All', 'Drums', 'Bass', 'Synths', 'Vocals', 'FX', 'Loops', 'One-Shots'];

const MOCK_SAMPLES: Sample[] = [
  { 
    id: '1', name: 'Kick Heavy 1', category: 'Drums', bpm: 120, key: 'Am', duration: '0:02', 
    tags: ['kick', 'heavy', 'drums'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 450 
  },
  { 
    id: '2', name: 'Snare Crisp 1', category: 'Drums', bpm: 125, key: 'C', duration: '0:04', 
    tags: ['snare', 'crisp', 'drums'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 320 
  },
  { 
    id: '3', name: 'Hi-Hat Loop 1', category: 'Loops', bpm: 130, key: 'Dm', duration: '0:08', 
    tags: ['hi-hat', 'loop', 'drums'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 280 
  },
  { 
    id: '4', name: 'Bass Growl 1', category: 'Bass', bpm: 128, key: 'F', duration: '0:06', 
    tags: ['bass', 'growl', 'sub'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 610 
  },
  { 
    id: '5', name: 'Synth Pad 1', category: 'Synths', bpm: 122, key: 'G', duration: '0:12', 
    tags: ['synth', 'pad', 'ambient'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 540 
  },
  { 
    id: '6', name: 'Vocal Chop 1', category: 'Vocals', bpm: 126, key: 'Em', duration: '0:03', 
    tags: ['vocals', 'chop', 'vox'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 890 
  },
  { 
    id: '7', name: 'Riser FX 1', category: 'FX', bpm: 124, key: 'Bm', duration: '0:05', 
    tags: ['riser', 'fx', 'transition'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 370 
  },
  { 
    id: '8', name: 'Clap Stack 1', category: 'Drums', bpm: 132, key: 'A', duration: '0:01', 
    tags: ['clap', 'stack', 'drums'], url: '', waveform: Array.from({length: 40}, () => Math.random()), 
    liked: false, downloads: 210 
  }
];

export default function SamplesSection() {
  const [samples, setSamples] = useState<Sample[]>(MOCK_SAMPLES);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredSamples = samples.filter(s => 
    (category === 'All' || s.category === category) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Sample Universe</h1>
          <p className="text-gray-400 text-sm">Explore and audition thousands of samples</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search samples..."
              className="bg-[#111118] border border-[#1E1E2E] rounded-lg px-4 py-2 text-sm w-64 focus:border-[#7C3AED] outline-none transition-colors text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add to Project
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {SAMPLE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              category === cat ? 'bg-[#7C3AED] text-white' : 'bg-[#111118] text-gray-400 hover:bg-[#1E1E2E]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-2">
          {filteredSamples.map(sample => (
            <div key={sample.id} className="group bg-[#111118]/50 hover:bg-[#111118] border border-white/5 hover:border-[#7C3AED]/30 rounded-xl p-3 flex items-center gap-4 transition-all">
              <button className="w-10 h-10 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED] hover:text-white transition-all">
                ▶
              </button>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{sample.name}</h4>
                <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                  <span>{sample.category}</span>
                  <span>{sample.bpm} BPM</span>
                  <span>{sample.key}</span>
                </div>
              </div>

              <div className="hidden md:flex flex-1 items-center gap-1 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
                {sample.waveform.map((h, i) => (
                  <div key={i} className="flex-1 bg-gray-700 rounded-full" style={{ height: `${Math.max(10, h * 100)}%` }} />
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-400 font-mono text-xs">{sample.duration}</span>
                <div className="flex items-center gap-2">
                  <button className={`transition-colors ${sample.liked ? 'text-red-500' : 'text-gray-600 hover:text-red-400'}`}>
                    ♥
                  </button>
                  <button className="text-gray-600 hover:text-white transition-colors">
                    ⤓
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
