/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.elevenlabs.io', 'cdn.suno.ai', 'storage.googleapis.com'],
  },
  env: {
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
    SUNO_API_KEY: process.env.SUNO_API_KEY,
    KLING_API_KEY: process.env.KLING_API_KEY,
    VEO3_API_KEY: process.env.VEO3_API_KEY,
    RUNWAY_API_KEY: process.env.RUNWAY_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
