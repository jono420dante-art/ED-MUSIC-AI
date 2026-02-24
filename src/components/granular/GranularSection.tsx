'use client';

import { useState, useRef } from 'react';

const presets = [
  'Ethereal Pad', 'Grain Storm', 'Crystal Voice', 'Deep Space', 'Organic Texture',
  'Morphic Bass', 'Spectral Lead', 'Glitch Pulse', 'Ambient Drone', 'Time Stretch',
  'Frozen Moment', 'Particle Synth', 'Neural Echo', 'Quantum Reverb', 'Void Walker',
];

const fxChains = [
  { name: 'Reverb', color: '#7C3AED' },
  { name: 'Delay', color: '#06B6D4' },
  { name: 'Filter', color: '#EC4899' },
  { name: 'Chorus', color: '#22C55E' },
  { name: 'Distortion', color: '#F59E0B' },
  { name: 'Bitcrush', color: '#EF4444' },
  { name: 'Pitch', color: '#8B5CF6' },
];

export default function GranularSection() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [xyPad, setXyPad] = useState({ x: 50, y: 50 });
  const [params, setParams] = useState({
    grainSize: 50, density: 70, pitch: 0, spread: 40, attack: 30, release: 50,
  });
  const [activeFX, setActiveFX] = useState([true, false, false, false, false, false, false]);
  const xyRef = useRef<HTMLDivElement>(null);

  const handleXY = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!xyRef.current) return;
    const rect = xyRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setXyPad({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="flex h-[calc(100vh-100px)]">
      {/* Left - Presets */}
      <div className="w-56 border-r border-[#1E1E2E] p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Presets ({presets.length})</h3>
        <div className="flex flex-col gap-1">
          {presets.map((p, i) => (
            <button
              key={p}
              onClick={() => setSelectedPreset(i)}
              className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                selectedPreset === i
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:bg-[#1E1E2E] hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Center - Controls */}
      <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>✨</span> Granular Engine
          </h2>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-xs text-purple-300">250+ Presets</span>
            <span className="px-2 py-1 bg-cyan-600/20 border border-cyan-500/30 rounded text-xs text-cyan-300">XY Pad</span>
          </div>
        </div>

        {/* XY Pad */}
        <div
          ref={xyRef}
          onMouseMove={(e) => e.buttons === 1 && handleXY(e)}
          onClick={handleXY}
          className="relative w-full h-64 bg-[#0D0D1A] border border-[#1E1E2E] rounded-2xl cursor-crosshair overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${xyPad.x}% ${xyPad.y}%, rgba(124,58,237,0.3) 0%, transparent 60%), #0D0D1A`,
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          {/* Dot */}
          <div
            className="absolute w-5 h-5 rounded-full bg-purple-500 border-2 border-white shadow-[0_0_15px_rgba(124,58,237,0.8)] -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
            style={{ left: `${xyPad.x}%`, top: `${xyPad.y}%` }}
          />
          {/* Labels */}
          <div className="absolute bottom-2 left-2 text-[10px] text-gray-600">Density →</div>
          <div className="absolute top-2 right-2 text-[10px] text-gray-600">↑ Pitch</div>
          <div className="absolute bottom-2 right-2 text-xs text-purple-400 font-mono">{xyPad.x} / {xyPad.y}</div>
        </div>

        {/* Knob Parameters */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(params).map(([key, val]) => (
            <div key={key}>
              <label className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-white font-mono text-xs">{val}</span>
              </label>
              <input
                type="range"
                min={key === 'pitch' ? -24 : 0}
                max={key === 'pitch' ? 24 : 100}
                value={val}
                onChange={(e) => setParams(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right - FX Chain */}
      <div className="w-56 border-l border-[#1E1E2E] p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-300">FX Chain (7)</h3>
        {fxChains.map((fx, i) => (
          <div key={fx.name} className={`p-3 rounded-xl border transition-all ${
            activeFX[i]
              ? 'border-purple-500/50 bg-purple-600/5'
              : 'border-[#1E1E2E]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">{fx.name}</span>
              <button
                onClick={() => setActiveFX(prev => { const n = [...prev]; n[i] = !n[i]; return n; })}
                className={`w-8 h-4 rounded-full transition-colors relative ${
                  activeFX[i] ? 'bg-purple-600' : 'bg-[#2D2D4E]'
                }`}
              >
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                  activeFX[i] ? 'left-4' : 'left-0.5'
                }`} />
              </button>
            </div>
            {activeFX[i] && (
              <input type="range" min={0} max={100} defaultValue={50} className="w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
