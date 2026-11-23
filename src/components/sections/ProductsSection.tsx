'use client';

import React, { useState } from 'react';
import { useArcade } from '@/context/ArcadeContext';
import {
  Sparkles,
  ArrowUpRight,
  Smartphone,
  TrendingUp,
  MapPin,
  Moon,
  Gamepad2,
  Compass,
  Code2,
  ExternalLink,
  Github,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  category: 'mobile' | 'fintech' | 'web' | 'opensource';
  categoryLabel: string;
  stack: string[];
  description: string;
  features: string[];
  icon: React.ElementType;
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'bytebuddy',
    name: 'ByteBuddy (ScreenTimePet)',
    badge: 'AI DIGITAL WELLBEING',
    tagline: 'Floating interactive companion that helps beat smartphone distraction',
    category: 'mobile',
    categoryLabel: 'Mobile & AI Companion',
    icon: Smartphone,
    accentColor: 'border-l-forest-700 bg-sage-50/60',
    stack: ['React Native (Expo)', 'Kotlin Native Overlay', 'Lottie State Machine', 'Local SQLite'],
    description:
      'An Android digital wellbeing companion featuring Milo the puppy—a reactive on-screen pet rendered via Kotlin SYSTEM_ALERT_WINDOW overlays. Milo reacts to compulsive app opens with dynamic interventions, state machines (play, sleep, idle, butterfly catch), and gamified recovery quests.',
    features: [
      'Foreground Kotlin Service using WindowManager overlay for persistent desktop interactions.',
      'UsageStatsManager telemetry monitoring real-time app switches without battery drain.',
      'Graduated intervention ladder from subtle reminders to fullscreen focus locks.',
      'Zero cloud dependency: 100% private on-device SQLite database.',
    ],
    liveUrl: 'https://github.com/vijithvenganoor',
    githubUrl: 'https://github.com/vijithvenganoor',
  },
  {
    id: 'swingharvest',
    name: 'SwingHarvest',
    badge: 'TAX AUTOMATION SAAS',
    tagline: 'Automated tax-loss harvesting & capital gains analytics for Indian swing traders',
    category: 'fintech',
    categoryLabel: 'FinTech & SaaS',
    icon: TrendingUp,
    accentColor: 'border-l-terracotta-600 bg-terracotta-50/60',
    stack: ['Next.js', 'Supabase', 'Cloudflare Pages', 'Cloudflare Workers', 'Tailwind CSS'],
    description:
      'Engineered specifically for Indian retail equity traders on Zerodha, Groww, and Upstox to identify tax harvesting opportunities before financial year-end, calculating Short-Term and Long-Term Capital Gains (STCG/LTCG) with dividend ledger integration.',
    features: [
      'Automated broker contract note parsing and trade ledger normalization.',
      'Real-time FIFO/weighted average tax liability calculator factoring Section 111A and 112A rules.',
      'Tax-loss harvesting simulator highlighting offsetting opportunities against realized gains.',
      'Deployed on Cloudflare Workers edge network with Supabase Row Level Security.',
    ],
    liveUrl: 'https://github.com/vijithvenganoor',
    githubUrl: 'https://github.com/vijithvenganoor',
  },
  {
    id: 'moment-milestone',
    name: 'Moment & Milestone Studio',
    badge: 'CUSTOM ASTRONOMY & MAP STUDIO',
    tagline: 'High-res street maps and night-sky star charts with automated print fulfillment',
    category: 'web',
    categoryLabel: 'Creative & Web',
    icon: Moon,
    accentColor: 'border-l-amber-600 bg-amber-50/60',
    stack: ['Next.js', 'MapLibre GL', 'Custom Ephemeris Renderer', 'Qikink API', 'Vector SVG'],
    description:
      'An e-commerce personalization studio where users craft museum-quality vector star charts calculated from astronomical date coordinates, paired with custom street-grid maps and automated print-on-demand fulfillment.',
    features: [
      'Sub-second mathematical rendering of star coordinates and constellations for any historical date.',
      'Vector tile styling with custom parchment, noir, and terracotta aesthetic presets.',
      'Automated order pipeline connecting print-ready 300 DPI PDF generation to Qikink fulfillment APIs.',
      'Client-side real-time live preview with interactive zoom and coordinate tuning.',
    ],
    liveUrl: 'https://github.com/vijithvenganoor',
    githubUrl: 'https://github.com/vijithvenganoor',
  },
  {
    id: 'ai-astrology',
    name: 'AI Astrology & Swiss Ephemeris Engine',
    badge: 'PRECISION HOROSCOPE & AI MEMORY',
    tagline: 'Deterministic celestial mechanics combined with conversational AI memory',
    category: 'mobile',
    categoryLabel: 'Mobile & AI Companion',
    icon: Sparkles,
    accentColor: 'border-l-purple-600 bg-purple-50/60',
    stack: ['Expo React Native', '.NET Core Swiss Ephemeris', 'Async AI Pipeline', 'Vector Store'],
    description:
      'A cross-platform mobile application combining the gold-standard C# Swiss Ephemeris library for planetary degree calculation with an asynchronous conversational AI memory pipeline for continuous life insights.',
    features: [
      'Sub-arcsecond celestial longitude and latitude planetary calculations in .NET.',
      'Long-term context memory pipeline linking life milestones to planetary transits.',
      'Native fluid UI with custom astrological mandala chart drawing.',
    ],
    githubUrl: 'https://github.com/vijithvenganoor',
  },
  {
    id: 'toms-adventure',
    name: "Tom's Adventure World",
    badge: 'PUBLISHED GOOGLE PLAY GAME',
    tagline: 'Retro platformer adventure game designed and published on Android',
    category: 'mobile',
    categoryLabel: 'Game Development',
    icon: Gamepad2,
    accentColor: 'border-l-emerald-600 bg-emerald-50/60',
    stack: ['Unity 2D', 'C#', 'Android SDK', 'Google Play Store'],
    description:
      'A classic side-scrolling platformer featuring custom physics, responsive touch controls, multi-world level progression, and enemy pathfinding algorithms published to the Google Play Store.',
    features: [
      'Engineered smooth 60fps platformer physics and mobile touch input handling.',
      'Custom level tilemaps, particle systems, and retro audio design.',
      'Published and maintained on Google Play Store with thousands of level plays.',
    ],
    playStoreUrl: 'https://github.com/vijithvenganoor',
  },
  {
    id: 'azhimala-guide',
    name: 'Azhimala Guide',
    badge: 'DESTINATION & TOURISM PLATFORM',
    tagline: 'Regional coastal travel portal for Kerala’s iconic seaside landmark',
    category: 'web',
    categoryLabel: 'Creative & Web',
    icon: Compass,
    accentColor: 'border-l-blue-600 bg-blue-50/60',
    stack: ['Next.js', 'Cloudflare Pages', 'SEO Architecture', 'Affiliate Engine'],
    description:
      'A high-performance regional guide dedicated to the monumental 58-ft Azhimala Shiva statue and southern Kerala coastline, ranking organically for regional travel and hospitality queries.',
    features: [
      'Static-site generation with 100/100 Lighthouse performance scores.',
      'Rich structured data schema for tourist attractions, routes, and local weather forecasts.',
      'Automated edge deployment via Cloudflare Pages with zero server overhead.',
    ],
    liveUrl: 'https://azhimalaguide.com',
  },
  {
    id: 'queryhelper',
    name: 'queryhelper & .NET Dev Tools',
    badge: 'OPEN SOURCE UTILITIES',
    tagline: 'ADO.NET 4.0 querying engine, model generator & iTextSharp chart renderer',
    category: 'opensource',
    categoryLabel: 'Open Source',
    icon: Code2,
    accentColor: 'border-l-charcoal-700 bg-parchment-200/60',
    stack: ['C#', 'ADO.NET', 'SQL Server', 'iTextSharp', 'GitHub'],
    description:
      'A suite of developer utilities including `queryhelper` (lightweight ADO.NET query helper and POCO model generator), `PDFChart` (iTextSharp charting utility), and automated timesheet and SQL interval tools.',
    features: [
      'Fast, dependency-free database querying and automatic C# POCO mapping.',
      'PDF chart rendering for automated report generation in enterprise .NET apps.',
      'Clean developer ergonomics with transparent parameter binding.',
    ],
    githubUrl: 'https://github.com/vijithvenganoor',
  },
];

export default function ProductsSection() {
  const { openHub, playGame } = useArcade();
  const [activeTab, setActiveTab] = useState<'all' | 'mobile' | 'fintech' | 'web' | 'opensource'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    activeTab === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-50 border border-terracotta-100 text-terracotta-600 text-xs font-mono font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION 02 // BUILT &amp; SHIPPED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
            Indie Products &amp; <span className="font-serif italic font-normal text-forest-700">Digital Builds</span>
          </h2>
          <p className="text-charcoal-500 max-w-2xl text-sm sm:text-base leading-relaxed">
            From native Android wellbeing companions with on-screen pet state machines to Indian equity tax-loss harvesting engines and astronomy studios.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-parchment-200/80 border border-parchment-300">
          {(
            [
              { id: 'all', label: 'All Products' },
              { id: 'mobile', label: 'Mobile & AI' },
              { id: 'fintech', label: 'FinTech' },
              { id: 'web', label: 'Creative & Web' },
              { id: 'opensource', label: 'Open Source' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-charcoal-900 text-parchment-50 shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-parchment-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Mini-Games Arcade Banner */}
      <div className="mb-10 glass-panel rounded-3xl p-6 sm:p-7 border border-terracotta-200/80 bg-gradient-to-r from-parchment-100 via-terracotta-50/40 to-sage-50/40 shadow-watercolor flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-charcoal-900 text-cyan-400 flex items-center justify-center shadow-md shrink-0">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-terracotta-600">
                HTML5 Canvas Arcade Lab
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-charcoal-900">
              Take a Break: Play 3 Built-In Mini-Games
            </h3>
            <p className="text-xs text-charcoal-600">
              Cyberpunk Snake • Neon Brick Breaker • Astro Dodger. 60fps canvas physics, synthesized sound &amp; zero install.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => playGame('snake')}
            className="px-3 py-1.5 rounded-xl bg-charcoal-900 hover:bg-terracotta-600 text-parchment-50 text-xs font-mono font-bold transition-colors shadow-sm"
          >
            🐍 Snake
          </button>
          <button
            onClick={() => playGame('breakout')}
            className="px-3 py-1.5 rounded-xl bg-charcoal-900 hover:bg-terracotta-600 text-parchment-50 text-xs font-mono font-bold transition-colors shadow-sm"
          >
            🧱 Breakout
          </button>
          <button
            onClick={() => playGame('dodger')}
            className="px-3 py-1.5 rounded-xl bg-charcoal-900 hover:bg-terracotta-600 text-parchment-50 text-xs font-mono font-bold transition-colors shadow-sm"
          >
            🚀 Dodger
          </button>
          <button
            onClick={openHub}
            className="px-3.5 py-1.5 rounded-xl bg-forest-700 hover:bg-forest-600 text-parchment-50 text-xs font-mono font-bold transition-colors shadow-sm"
          >
            Open Arcade Hub ↗
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const Icon = product.icon;
          return (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`glass-panel glass-panel-hover rounded-3xl p-6 border-l-4 ${product.accentColor} flex flex-col justify-between cursor-pointer group`}
            >
              <div className="space-y-4">
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest font-bold uppercase text-charcoal-500">
                    {product.badge}
                  </span>
                  <div className="p-2 rounded-xl bg-parchment-200 text-charcoal-800 group-hover:bg-charcoal-900 group-hover:text-parchment-50 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-charcoal-900 group-hover:text-terracotta-600 transition-colors flex items-center gap-1.5">
                    <span>{product.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="mt-1 text-xs text-charcoal-600 leading-snug">
                    {product.tagline}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-parchment-100 border border-parchment-300 text-[10px] font-mono text-charcoal-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-4 border-t border-parchment-300/80 flex items-center justify-between text-xs font-mono text-charcoal-600">
                <span className="text-[11px] text-forest-700 font-medium">
                  {product.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-charcoal-800 group-hover:text-terracotta-600">
                  Inspect Architecture
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Architecture Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-parchment-300 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-terracotta-600 tracking-wider uppercase">
                  {selectedProduct.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                  {selectedProduct.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 rounded-full hover:bg-parchment-200 text-charcoal-500 hover:text-charcoal-900 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Key Architectural Highlights */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold uppercase text-charcoal-500 tracking-wider">
                Engineering Highlights &amp; State Machinery
              </div>
              <div className="space-y-2">
                {selectedProduct.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600 mt-2 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Badges */}
            <div>
              <div className="font-mono text-xs font-bold uppercase text-charcoal-500 tracking-wider mb-2">
                Technology Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl bg-parchment-200 text-xs font-mono font-medium text-charcoal-800 border border-parchment-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-parchment-300 flex items-center justify-end gap-3">
              {selectedProduct.githubUrl && (
                <a
                  href={selectedProduct.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-parchment-200 hover:bg-parchment-300 text-charcoal-900 text-xs font-mono font-semibold transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {selectedProduct.liveUrl && (
                <a
                  href={selectedProduct.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-900 text-parchment-50 hover:bg-terracotta-600 text-xs font-mono font-semibold transition-colors"
                >
                  <span>Open Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
