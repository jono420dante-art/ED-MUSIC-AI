'use client';

import { useState } from 'react';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: 'music' | 'voice' | 'video' | 'stem' | 'audio';
  description: string;
  status: 'active' | 'beta' | 'coming-soon';
  version: string;
  capabilities: string[];
  pricing: string;
}

const AI_MODELS: AIModel[] = [
  { id: 'elevenlabs', name: 'ElevenLabs TTS', provider: 'ElevenLabs', type: 'voice', description: '22 AI voices for natural speech synthesis', status: 'active', version: 'v3', capabilities: ['Voice cloning', 'Multilingual', 'Emotion control', 'Real-time synthesis'], pricing: 'API usage' },
  { id: 'suno', name: 'Suno AI Music Generator', provider: 'Suno', type: 'music', description: 'Full song generation with lyrics & instrumentation', status: 'active', version: 'v3.5', capabilities: ['Lyrics generation', 'Multi-genre', 'Custom instrumentation', 'Stem exports'], pricing: 'Per generation' },
  { id: 'kling', name: 'Kling AI Video', provider: 'Kuaishou', type: 'video', description: 'Cinematic AI video generation', status: 'active', version: '1.5', capabilities: ['Text-to-video', '1080p export', 'Motion control', 'Style transfer'], pricing: 'Per second' },
  { id: 'veo3', name: 'Google Veo 3', provider: 'Google DeepMind', type: 'video', description: 'Advanced video synthesis & editing', status: 'beta', version: '3.0', capabilities: ['Photorealistic', '4K export', 'Physics simulation', 'Scene understanding'], pricing: 'Enterprise' },
  { id: 'demucs', name: 'Demucs Stem Separator', provider: 'Meta AI', type: 'stem', description: 'AI-powered audio stem separation', status: 'active', version: 'v4', capabilities: ['Vocals isolation', 'Drum separation', 'Bass extraction', 'Instrumental split'], pricing: 'Free / Self-hosted' },
  { id: 'musicgen', name: 'MusicGen', provider: 'Meta AI', type: 'music', description: 'Melody-conditioned music generation', status: 'beta', version: '1.0', capabilities: ['Melody conditioning', 'Stereo output', 'Multi-instrument', 'Genre control'], pricing: 'Free / Self-hosted' },
  { id: 'audioldm', name: 'AudioLDM 2', provider: 'Stability AI', type: 'audio', description: 'Text-to-audio latent diffusion', status: 'active', version: '2.0', capabilities: ['Sound effects', 'Ambient audio', 'Custom durations', 'High fidelity'], pricing: 'API usage' },
];

export default function ModelsSection() {
  const [filter, setFilter] = useState<'all' | 'music' | 'voice' | 'video' | 'stem' | 'audio'>('all');
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [search, setSearch] = useState('');

  const filtered = AI_MODELS
    .filter(m => filter === 'all' || m.type === filter)
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.provider.toLowerCase().includes(search.toLowerCase()));

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (status === 'beta') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  const getTypeEmoji = (type: string) => {
    if (type === 'music') return '🎵';
    if (type === 'voice') return '🎤';
    if (type === 'video') return '🎬';
    if (type === 'stem') return '🎛️';
    return '🔊';
  };

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">🤖 AI Director</h2>
        <p className="text-gray-400 text-sm">Manage and orchestrate AI models for music production</p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search AI models..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'music', 'voice', 'video', 'stem', 'audio'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                filter === f ? 'bg-pink-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(model => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className="glass-card p-5 hover:border-pink-500/30 transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeEmoji(model.type)}</span>
                  <div>
                    <div className="font-semibold text-sm">{model.name}</div>
                    <div className="text-xs text-gray-500">{model.provider}</div>
                  </div>
                </div>
                <div className={`px-2 py-0.5 border rounded text-xs font-medium ${getStatusColor(model.status)}`}>
                  {model.status}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-400 mb-3">{model.description}</p>

              {/* Capabilities */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-400 mb-1">Capabilities</div>
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.slice(0, 3).map(cap => (
                    <span key={cap} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500">
                      {cap}
                    </span>
                  ))}
                  {model.capabilities.length > 3 && (
                    <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500">
                      +{model.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">v{model.version}</span>
                <span className="text-pink-400">{model.pricing}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="text-4xl mb-3">🤖</div>
            <div className="text-sm">No AI models found</div>
            <div className="text-xs mt-1">Try adjusting your filters</div>
          </div>
        )}
      </div>

      {/* Model Detail Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="glass-card w-full max-w-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getTypeEmoji(selectedModel.type)}</span>
                <div>
                  <h3 className="text-xl font-bold">{selectedModel.name}</h3>
                  <div className="text-sm text-gray-400">{selectedModel.provider} • v{selectedModel.version}</div>
                </div>
              </div>
              <button onClick={() => setSelectedModel(null)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            {/* Status Badge */}
            <div className={`inline-flex px-3 py-1 border rounded-lg text-sm font-medium mb-4 ${getStatusColor(selectedModel.status)}`}>
              {selectedModel.status.replace('-', ' ').toUpperCase()}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Description</h4>
              <p className="text-sm text-gray-300">{selectedModel.description}</p>
            </div>

            {/* Capabilities */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Capabilities</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedModel.capabilities.map(cap => (
                  <div key={cap} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <span className="text-pink-400">✓</span>
                    <span className="text-sm text-gray-300">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Type */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-4">
                <div className="text-xs text-gray-400 mb-1">Type</div>
                <div className="font-medium capitalize">{selectedModel.type}</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-gray-400 mb-1">Pricing</div>
                <div className="font-medium text-pink-400">{selectedModel.pricing}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-semibold text-white hover:opacity-90 transition-all"
                disabled={selectedModel.status === 'coming-soon'}
              >
                {selectedModel.status === 'coming-soon' ? 'Coming Soon' : 'Configure Model'}
              </button>
              <button className="px-6 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all">
                View Docs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-pink-400">{AI_MODELS.length}</div>
          <div className="text-xs text-gray-400">Total Models</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-green-400">{AI_MODELS.filter(m => m.status === 'active').length}</div>
          <div className="text-xs text-gray-400">Active</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-yellow-400">{AI_MODELS.filter(m => m.status === 'beta').length}</div>
          <div className="text-xs text-gray-400">Beta</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-gray-400">{AI_MODELS.filter(m => m.status === 'coming-soon').length}</div>
          <div className="text-xs text-gray-400">Coming Soon</div>
        </div>
      </div>
    </div>
  );
}
