'use client';

import { useState } from 'react';

const voices = [
  { id: '1', name: 'Aria', style: 'Pop / Emotional', lang: 'EN' },
  { id: '2', name: 'Marcus', style: 'Deep / Hip-Hop', lang: 'EN' },
  { id: '3', name: 'Zara', style: 'R&B / Soul', lang: 'EN' },
  { id: '4', name: 'Dante', style: 'Rock / Power', lang: 'EN' },
  { id: '5', name: 'Luna', style: 'EDM / Electronic', lang: 'EN' },
  { id: '6', name: 'Sol', style: 'Latin / Reggaeton', lang: 'ES' },
];

const genres = ['Pop', 'Hip-Hop', 'R&B', 'Rock', 'EDM', 'Jazz', 'Afrobeat', 'Trap', 'Lo-Fi', 'Classical', 'Country', 'Gospel', 'Reggae', 'Metal', 'Blues', 'Soul', 'Folk', 'Ambient', 'Drill', 'Dancehall'];

export default function StudioSection() {
  const [prompt, setPrompt] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('1');
  const [selectedGenre, setSelectedGenre] = useState('Pop');
  const [tempo, setTempo] = useState(120);
  const [generating, setGenerating] = useState(false);
  const [tracks, setTracks] = useState<{ id: string; name: string; duration: string; genre: string }[]>([
    { id: '1', name: 'Midnight Drive', duration: '3:24', genre: 'Lo-Fi' },
    { id: '2', name: 'Solar Burst', duration: '2:58', genre: 'EDM' },
    { id: '3', name: 'Soulbound', duration: '4:12', genre: 'R&B' },
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setTracks(prev => [{
        id: Date.now().toString(),
        name: prompt.slice(0, 20) + '...',
        duration: '3:' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
        genre: selectedGenre,
      }, ...prev]);
      setGenerating(false);
      setPrompt('');
    }, 3000);
  };

  return (
    <div className="flex h-[calc(100vh-100px)]">
      {/* Left Panel - Controls */}
      <div className="w-80 flex flex-col gap-4 p-6 border-r border-[#1E1E2E] overflow-y-auto">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>🎵</span> Music Studio
        </h2>

        {/* Prompt */}
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Track Description</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the track you want to generate..."
            className="w-full h-24 bg-[#0D0D1A] border border-[#1E1E2E] rounded-xl p-3 text-sm text-white placeholder-gray-600 resize-none focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Genre</label>
          <div className="flex flex-wrap gap-1.5">
            {genres.slice(0, 10).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedGenre === g
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#1E1E2E] text-gray-400 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Voice */}
        <div>
          <label className="text-xs text-gray-500 mb-2 block">AI Voice (ElevenLabs)</label>
          <div className="flex flex-col gap-2">
            {voices.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVoice(v.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                  selectedVoice === v.id
                    ? 'border-purple-500 bg-purple-600/10 text-white'
                    : 'border-[#1E1E2E] text-gray-400 hover:border-gray-600'
                }`}
              >
                <span className="font-medium text-sm">{v.name}</span>
                <span className="text-xs text-gray-500">{v.style}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tempo */}
        <div>
          <label className="text-xs text-gray-500 mb-2 flex items-center justify-between">
            <span>Tempo</span>
            <span className="text-white font-mono">{tempo} BPM</span>
          </label>
          <input
            type="range" min={60} max={200} value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            generating
              ? 'bg-purple-600/50 text-purple-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
        >
          {generating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </span>
          ) : 'Generate Track'}
        </button>

        {/* Engine tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-0.5 bg-[#1E1E2E] rounded text-xs text-purple-400">ElevenLabs</span>
          <span className="px-2 py-0.5 bg-[#1E1E2E] rounded text-xs text-cyan-400">Suno v3.5</span>
          <span className="px-2 py-0.5 bg-[#1E1E2E] rounded text-xs text-green-400">48kHz</span>
        </div>
      </div>

      {/* Right Panel - Track List */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Generated Tracks</h3>
          <span className="text-xs text-gray-500">{tracks.length} tracks</span>
        </div>

        <div className="flex flex-col gap-3">
          {tracks.map((track, i) => (
            <div
              key={track.id}
              className="glass-card p-4 flex items-center gap-4 hover:border-purple-500/30 transition-all group"
            >
              {/* Play Button */}
              <button className="w-10 h-10 rounded-full bg-purple-600/20 hover:bg-purple-600 flex items-center justify-center transition-colors flex-shrink-0">
                <span className="text-sm">▶️</span>
              </button>

              {/* Waveform visual */}
              <div className="flex items-center gap-0.5 w-32">
                {[...Array(20)].map((_, j) => (
                  <div
                    key={j}
                    className="bg-purple-500/60 rounded-sm flex-1"
                    style={{ height: `${8 + Math.random() * 20}px` }}
                  />
                ))}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="font-semibold text-sm text-white">{track.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{track.genre} · {track.duration}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg bg-[#1E1E2E] hover:bg-[#2D2D4E] text-xs text-gray-400 hover:text-white">⤓</button>
                <button className="p-2 rounded-lg bg-[#1E1E2E] hover:bg-[#2D2D4E] text-xs text-gray-400 hover:text-white">♡</button>
                <button className="p-2 rounded-lg bg-[#1E1E2E] hover:bg-[#2D2D4E] text-xs text-gray-400 hover:text-white">⋯</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
