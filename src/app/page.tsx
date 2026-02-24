'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import StudioSection from '@/components/studio/StudioSection';
import GranularSection from '@/components/granular/GranularSection';
import VideoSection from '@/components/video/VideoSection';
import MixerSection from '@/components/mixer/MixerSection';
import SamplesSection from '@/components/samples/SamplesSection';
import MarketplaceSection from '@/components/marketplace/MarketplaceSection';
import ModelsSection from '@/components/models/ModelsSection';
import StatusBar from '@/components/layout/StatusBar';

export type NavTab = 'home' | 'studio' | 'granular' | 'video' | 'mixer' | 'samples' | 'market' | 'models';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Hero onNavigate={setActiveTab} />;
      case 'studio': return <StudioSection />;
      case 'granular': return <GranularSection />;
      case 'video': return <VideoSection />;
      case 'mixer': return <MixerSection />;
      case 'samples': return <SamplesSection />;
      case 'market': return <MarketplaceSection />;
      case 'models': return <ModelsSection />;
      default: return <Hero onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
      <StatusBar />
    </div>
  );
}
