'use client';

import { useState } from 'react';

const channels = [
  { id: 'vocals', label: 'Vocals', color: '#7C3AED', icon: '🎤' },
  { id: 'drums', label: 'Drums', color: '#EC4899', icon: '🥁' },
  { id: 'bass', label: 'Bass', color: '#06B6D4', icon: '🎸' },
  { id: 'guitar', label: 'Guitar', color: '#22C55E', icon: '🎷' },
  { id: 'keys', label: 'Keys', color: '#F59E0B', icon: '🎹' },
  { id: 'fx', label: 'FX', color: '#EF4444', icon: '⚡' },
  { id: 'master', label: 'Master', color: '#fff', icon: '🏚️' },
];

const fxChains = ['Reverb', 'Delay', 'Compressor', 'EQ', 'Limiter', 'Chorus', 'Flanger'];

export default function MixerSection() {
  const [volumes, setVolumes] = useState<Record<string, number>>(
    Object.fromEntries(channels.map((c) => [c.id, c.id === 'master' ? 85 : 75]))
  );
  const [pans, setPans] = useState<Record<string, number>>(
    Object.fromEntries(channels.map((c) => [c.id, 0]))
  );
  const [mutes, setMutes] = useState<Record<string, boolean>>(
    Object.fromEntries(channels.map((c) => [c.id, false]))
  );
  const [solos, setSolos] = useState<Record<string, boolean>>(
    Object.fromEntries(channels.map((c) => [c.id, false]))
  );
  const [activeFX, setActiveFX] = useState<Record<string, boolean>>(
    Object.fromEntries(fxChains.map((fx) => [fx, false]))
  );
  const [stemUploading, setStemUploading] = useState(false);

  const handleStemSplit = () => {
    setStemUploading(true);
    setTimeout(() => setStemUploading(false), 3000);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center gap-4 px-6 py-3 bg-[#0D0D1A] border-b border-[#1E1E2E]">
        <h2 className="text-base font-bold flex items-center gap-2">
          <span>🏚️</span> Mixer Pro
        </h2>
        <div className="flex-1" />
        <button
          onClick={handleStemSplit}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            stemUploading ? 'bg-pink-600/50 text-pink-300' : 'bg-pink-600 hover:bg-pink-500 text-white'
          }`}
        >
          {stemUploading ? (
            <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Splitting Stems...</>
          ) : (
            <>✂️ Isolate Stems (Demucs)</>
          )}
        </button>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-[#1E1E2E] hover:bg-[#2D2D4E] text-xs rounded-lg text-gray-400 hover:text-white">⏮ Reset</button>
          <button className="px-3 py-2 bg-green-600 hover:bg-green-500 text-xs rounded-lg text-white">► Export</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mixer Channels */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2 p-4 h-full">
            {channels.map((ch) => (
              <div key={ch.id} className="track-channel">
                {/* Icon */}
                <div className="text-xl">{ch.icon}</div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">{ch.label}</div>

                {/* Pan Knob */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-[#2D2D4E] flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors">
                    <div className="w-1.5 h-4 bg-purple-500 rounded-full" />
                  </div>
                  <div className="text-[9px] text-gray-600 text-center mt-0.5">PAN</div>
                </div>

                {/* VU Meter */}
                <div className="w-3 h-24 bg-[#1E1E2E] rounded-full overflow-hidden relative">
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-full transition-all"
                    style={{
                      height: `${mutes[ch.id] ? 0 : volumes[ch.id]}%`,
                      background: `linear-gradient(to top, #22c55e, #84cc16 60%, ${volumes[ch.id] > 85 ? '#ef4444' : '#22c55e'} 100%)`,
                    }}
                  />
                </div>

                {/* Fader */}
                <div className="relative h-32 flex items-center justify-center">
                  <input
                    type="range"
                    min={0} max={100}
                    value={volumes[ch.id]}
                    onChange={(e) => setVolumes(prev => ({ ...prev, [ch.id]: Number(e.target.value) }))}
                    className="w-28 absolute"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                  />
                </div>

                {/* Volume display */}
                <div className="text-[10px] font-mono" style={{ color: ch.color }}>
                  {volumes[ch.id]}
                </div>

                {/* M/S buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => setMutes(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                    className={`w-7 h-6 rounded text-[10px] font-bold transition-colors ${
                      mutes[ch.id] ? 'bg-red-500 text-white' : 'bg-[#1E1E2E] text-gray-500 hover:bg-[#2D2D4E]'
                    }`}
                  >M</button>
                  <button
                    onClick={() => setSolos(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                    className={`w-7 h-6 rounded text-[10px] font-bold transition-colors ${
                      solos[ch.id] ? 'bg-yellow-500 text-black' : 'bg-[#1E1E2E] text-gray-500 hover:bg-[#2D2D4E]'
                    }`}
                  >S</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FX Chain Panel */}
        <div className="w-56 border-l border-[#1E1E2E] p-4 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-300">FX Chain</h3>
          {fxChains.map((fx) => (
            <div key={fx} className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{fx}</span>
              <button
                onClick={() => setActiveFX(prev => ({ ...prev, [fx]: !prev[fx] }))}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  activeFX[fx] ? 'bg-purple-600' : 'bg-[#2D2D4E]'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                  activeFX[fx] ? 'left-5' : 'left-0.5'
                }`} />
              </button>
            </div>
          ))}
          <div className="mt-auto pt-4 border-t border-[#1E1E2E]">
            <div className="text-xs text-gray-600">Powered by Demucs</div>
            <div className="text-xs text-gray-600">+ AI stem isolation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
