'use client';

import { useState } from 'react';

interface Video {
  id: string;
  name: string;
  engine: string;
  duration: string;
  url?: string;
  thumbnail?: string;
  prompt?: string;
  createdAt: string;
}

interface VideoSettings {
  prompt: string;
  engine: 'kling' | 'veo3' | 'runway' | 'pika';
  duration: number;
  style: string;
  resolution: '720p' | '1080p' | '4K';
  fps: 24 | 30 | 60;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3';
}

const VIDEO_ENGINES = [
  { id: 'kling', name: 'Kling AI', desc: 'Cinematic AI video generation', emoji: '🎬' },
  { id: 'veo3', name: 'Veo 3', desc: 'Google DeepMind video synthesis', emoji: '🎥' },
  { id: 'runway', name: 'Runway Gen-3', desc: 'Creative AI video generation', emoji: '🚀' },
  { id: 'pika', name: 'Pika Labs', desc: 'Fast AI video creation', emoji: '⚡' },
];

const VIDEO_STYLES = [
  'Cinematic', 'Music Video', 'Abstract', 'Lyric Video', 'Concert',
  'Animated', 'Documentary', 'Surreal', 'Neon Noir', 'Epic Fantasy'
];

export default function VideoSection() {
  const [settings, setSettings] = useState<VideoSettings>({
    prompt: '',
    engine: 'kling',
    duration: 10,
    style: 'Music Video',
    resolution: '1080p',
    fps: 30,
    aspectRatio: '16:9',
  });
  const [videos, setVideos] = useState<Video[]>([]);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleGenerate = async () => {
    if (!settings.prompt.trim()) {
      setError('Please enter a video prompt');
      return;
    }
    setGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setVideos(prev => [data.video, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Left - Controls */}
      <div className="w-96 flex flex-col gap-4 overflow-y-auto">
        <div>
          <h2 className="text-xl font-bold mb-1">🎬 AI Video Studio</h2>
          <p className="text-gray-400 text-sm">Generate cinematic music videos with AI</p>
        </div>

        {/* Engine Selection */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Video Engine</label>
          <div className="grid grid-cols-2 gap-2">
            {VIDEO_ENGINES.map(engine => (
              <button
                key={engine.id}
                onClick={() => setSettings(s => ({ ...s, engine: engine.id as any }))}
                className={`p-3 rounded-lg border text-left transition-all ${
                  settings.engine === engine.id
                    ? 'border-pink-500 bg-pink-500/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-lg">{engine.emoji}</div>
                <div className="text-xs font-medium">{engine.name}</div>
                <div className="text-xs text-gray-500">{engine.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Video Prompt</label>
          <textarea
            value={settings.prompt}
            onChange={e => setSettings(s => ({ ...s, prompt: e.target.value }))}
            placeholder="Describe your music video scene... (e.g., 'A neon-lit futuristic city at night with a DJ performing on stage, rain falling, cinematic')"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none resize-none"
            rows={5}
          />
        </div>

        {/* Style */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Style</label>
          <div className="flex flex-wrap gap-2">
            {VIDEO_STYLES.map(style => (
              <button
                key={style}
                onClick={() => setSettings(s => ({ ...s, style }))}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  settings.style === style
                    ? 'bg-pink-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            Duration: <span className="text-pink-400">{settings.duration}s</span>
          </label>
          <input
            type="range" min={5} max={60} step={5}
            value={settings.duration}
            onChange={e => setSettings(s => ({ ...s, duration: Number(e.target.value) }))}
            className="w-full accent-pink-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5s</span><span>30s</span><span>60s</span>
          </div>
        </div>

        {/* Resolution & FPS */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Resolution</label>
            <select
              value={settings.resolution}
              onChange={e => setSettings(s => ({ ...s, resolution: e.target.value as any }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white"
            >
              <option value="720p">720p HD</option>
              <option value="1080p">1080p FHD</option>
              <option value="4K">4K UHD</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Frame Rate</label>
            <select
              value={settings.fps}
              onChange={e => setSettings(s => ({ ...s, fps: Number(e.target.value) as any }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white"
            >
              <option value={24}>24 FPS</option>
              <option value={30}>30 FPS</option>
              <option value={60}>60 FPS</option>
            </select>
          </div>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Aspect Ratio</label>
          <div className="flex gap-2">
            {(['16:9', '9:16', '1:1', '4:3'] as const).map(ratio => (
              <button
                key={ratio}
                onClick={() => setSettings(s => ({ ...s, aspectRatio: ratio }))}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                  settings.aspectRatio === ratio
                    ? 'bg-pink-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {generating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Video...
            </span>
          ) : '🎬 Generate Video'}
        </button>
      </div>

      {/* Right - Video Gallery */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="font-semibold text-lg mb-6">Generated Videos</h3>
        {selectedVideo && (
          <div className="mb-6 rounded-xl overflow-hidden bg-black border border-white/10">
            <video
              src={selectedVideo.url}
              controls
              autoPlay
              className="w-full max-h-96 object-contain"
            />
            <div className="p-4">
              <div className="font-medium">{selectedVideo.name}</div>
              <div className="text-sm text-gray-400">{selectedVideo.engine} • {selectedVideo.duration}</div>
              {selectedVideo.prompt && (
                <div className="text-xs text-gray-500 mt-2">{selectedVideo.prompt}</div>
              )}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {videos.map(video => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="glass-card overflow-hidden group hover:border-pink-500/30 transition-all cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-[#111128] to-[#0D0D1A] flex items-center justify-center relative">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-pink-600/20 flex items-center justify-center">
                    <span className="text-2xl">🎬</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-gray-300">{video.duration}</div>
                <div className="absolute inset-0 bg-pink-600/0 group-hover:bg-pink-600/10 flex items-center justify-center transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-lg">▶</span>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="font-medium text-sm">{video.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{video.engine}</div>
              </div>
            </div>
          ))}
        </div>
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="text-4xl mb-3">🎬</div>
            <div className="text-sm">No videos generated yet</div>
            <div className="text-xs mt-1">Configure settings and click Generate Video</div>
          </div>
        )}
      </div>
    </div>
  );
}
