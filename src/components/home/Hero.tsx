'use client';

import { NavTab } from '@/app/page';

interface HeroProps {
  onNavigate: (tab: NavTab) => void;
}

const stats = [
  { value: '22', label: 'AI Voices' },
  { value: '250+', label: 'Granular Presets' },
  { value: '20+', label: 'Genres' },
  { value: '7', label: 'FX Chains' },
];

const features = [
  {
    icon: '🎵',
    title: 'Music Studio',
    desc: 'Generate AI-powered tracks with ElevenLabs & Suno v3.5',
    tab: 'studio' as NavTab,
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    icon: '✨',
    title: 'Granular Engine',
    desc: '250+ presets, XY pad control, 7 FX chains',
    tab: 'granular' as NavTab,
    gradient: 'from-indigo-600 to-cyan-600',
  },
  {
    icon: '🎬',
    title: 'Video Suite',
    desc: 'AI video generation with Kling, Veo3 & Runway',
    tab: 'video' as NavTab,
    gradient: 'from-pink-600 to-rose-600',
  },
  {
    icon: '🏚️',
    title: 'Mixer Pro',
    desc: 'Professional mixing console with stem isolation',
    tab: 'mixer' as NavTab,
    gradient: 'from-green-600 to-teal-600',
  },
  {
    icon: '📀',
    title: 'Sample Library',
    desc: 'Thousands of royalty-free AI-generated samples',
    tab: 'samples' as NavTab,
    gradient: 'from-amber-600 to-orange-600',
  },
  {
    icon: '🤖',
    title: 'AI Director',
    desc: 'AI-powered music composition assistant & co-creator',
    tab: 'models' as NavTab,
    gradient: 'from-red-600 to-pink-600',
  },
];

const poweredBy = ['ElevenLabs', 'Suno v3.5', 'Kling AI', 'Veo3', 'Demucs', 'Runway ML'];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-6 py-12 studio-grid relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Badge */}
      <div className="relative z-10 mb-6 flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/30 rounded-full text-sm text-purple-300">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        AI-Powered Music Production
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-center text-6xl md:text-7xl font-extrabold mb-4">
        <span className="gradient-text">ED MUSIC AI</span>
      </h1>
      <p className="relative z-10 text-center text-gray-400 text-lg max-w-2xl mb-8">
        The ultimate AI music production suite. Generate tracks, synthesize vocals, split stems, and create videos — all powered by cutting-edge AI.
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 flex items-center gap-4 mb-12">
        <button
          onClick={() => onNavigate('studio')}
          className="btn-primary"
        >
          Launch Studio
        </button>
        <button
          onClick={() => onNavigate('granular')}
          className="btn-secondary"
        >
          Explore Granular
        </button>
      </div>

      {/* Stats */}
      <div className="relative z-10 flex items-center gap-8 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl w-full mb-10">
        {features.map((f) => (
          <button
            key={f.tab}
            onClick={() => onNavigate(f.tab)}
            className="glass-card p-6 text-left hover:border-purple-500/50 transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl mb-3`}>
              {f.icon}
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">{f.title}</h3>
            <p className="text-xs text-gray-500">{f.desc}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Open</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Powered By */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
        {poweredBy.map((name) => (
          <span
            key={name}
            className="px-3 py-1 bg-[#1E1E2E] border border-[#2D2D4E] rounded-full text-xs text-gray-400 font-mono"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
