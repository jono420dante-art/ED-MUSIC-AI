import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ED MUSIC AI — Professional AI Music Production Studio',
  description: 'Generate tracks, synthesize vocals, split stems, create music videos — all powered by cutting-edge AI. ElevenLabs, Suno v3.5, Kling AI, Veo3, Demucs.',
  keywords: 'AI music production, music generator, DAW, mixer, stem separation, ElevenLabs, Suno AI',
  authors: [{ name: 'ED MUSIC AI' }],
  openGraph: {
    title: 'ED MUSIC AI — Professional AI Music Production Studio',
    description: 'The ultimate AI-powered music production suite.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-[#0A0A0F] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
