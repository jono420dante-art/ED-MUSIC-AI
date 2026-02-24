'use client';

import { NavTab } from '@/app/page';

const tabs: { id: NavTab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'studio', label: 'Studio', icon: '🎵' },
  { id: 'granular', label: 'Granular', icon: '✨' },
  { id: 'video', label: 'Video', icon: '🎤' },
  { id: 'mixer', label: 'Mixer', icon: '🏚️' },
  { id: 'samples', label: 'Samples', icon: '📀' },
  { id: 'market', label: 'Market', icon: '🛒' },
  { id: 'models', label: 'Models', icon: '🤖' },
];

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#0D0D1A] border-b border-[#1E1E2E] sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center font-bold text-lg">
          E
        </div>
        <div>
          <div className="font-bold text-base leading-none tracking-wide text-white">ED MUSIC AI</div>
          <div className="text-[10px] text-gray-500 tracking-widest uppercase">AI MUSIC STUDIO</div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`nav-tab ${
              activeTab === tab.id
                ? 'active bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#1E1E2E]'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-lg bg-[#1E1E2E] hover:bg-[#2D2D4E] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          ⚙️
        </button>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1E1E2E] rounded-lg">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-xs font-bold">D</div>
          <span className="text-sm text-gray-300">ED · Music AI</span>
        </div>
      </div>
    </nav>
  );
}
