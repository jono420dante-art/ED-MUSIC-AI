'use client';

import { useEffect, useState } from 'react';

export default function StatusBar() {
  const [time, setTime] = useState('');
  const [cpu, setCpu] = useState(23);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCpu(Math.floor(20 + Math.random() * 15));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex items-center justify-between px-6 py-2 bg-[#0D0D1A] border-t border-[#1E1E2E] text-xs text-gray-500 font-mono">
      {/* Left: Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 font-semibold">Connected</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Engine:</span>
          <span className="text-purple-400">ElevenLabs</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Suno:</span>
          <span className="text-cyan-400">v3.5</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Video:</span>
          <span className="text-pink-400">Kling + Veo3</span>
        </div>
      </div>

      {/* Center: Waveform animation */}
      <div className="flex items-center gap-0.5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="waveform-bar bg-purple-500"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* Right: Metrics */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-gray-600">CPU:</span>
          <span className="text-amber-400">{cpu}%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">SR:</span>
          <span className="text-cyan-400">48kHz</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Buffer:</span>
          <span className="text-gray-300">256</span>
        </div>
        <div className="text-gray-600">{time}</div>
        <div className="text-purple-500 font-semibold">v2.0.0</div>
      </div>
    </footer>
  );
}
