import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { ArcadeProvider } from '@/context/ArcadeContext';
import ArcadeWindow from '@/components/games/ArcadeWindow';

export const metadata: Metadata = {
  title: 'Vijith V S | Senior Software Engineer & Indie Product Builder',
  description:
    'Senior Software Engineer at RedBlack Software (Infopark Kochi). Enterprise WealthTech in .NET, automated portfolio rebalancing, high-scale financial engines, and shipping AI & mobile apps.',
  keywords: [
    'Vijith V S',
    'Vijith Venganoor',
    'Senior Software Engineer',
    'RedBlack Software',
    'Intelliflo',
    'Infopark Kochi',
    'Kerala Software Engineer',
    'C#',
    '.NET Core',
    'WealthTech',
    'Portfolio Rebalancing',
    'React Native',
    'Next.js',
    'Three.js',
    'Indie Hacker',
    'ByteBuddy',
    'SwingHarvest',
  ],
  authors: [{ name: 'Vijith V S', url: 'https://vijithvenganoor.github.io/' }],
  creator: 'Vijith V S',
  metadataBase: new URL('https://vijithvenganoor.github.io/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vijith V S — Senior Software Engineer & Indie Product Builder',
    description:
      'Enterprise WealthTech in .NET by day. Shipping AI apps, SaaS tools, and serverless products by night from Kochi, Kerala.',
    url: 'https://vijithvenganoor.github.io/',
    siteName: 'Vijith V S Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vijith V S — Senior Software Engineer & Indie Product Builder',
    description:
      'Enterprise WealthTech in .NET by day. Shipping AI apps, SaaS tools, and serverless products by night from Kochi, Kerala.',
    creator: '@vijithvs',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-terracotta-100 selection:text-terracotta-700 min-h-screen relative text-charcoal-900">
        <SmoothScrollProvider>
          <ArcadeProvider>
            <div className="fixed inset-0 pointer-events-none studio-vignette z-10" />
            <div className="relative z-20">{children}</div>
            <ArcadeWindow />
          </ArcadeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
