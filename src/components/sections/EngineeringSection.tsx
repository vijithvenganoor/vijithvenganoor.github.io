'use client';

import React, { useState } from 'react';
import {
  Server,
  Smartphone,
  Cloud,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Sparkles,
  Layers,
  Zap,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  highlight?: boolean;
}

const TECH_CLUSTERS = [
  {
    id: 'backend',
    title: 'Backend & Enterprise Systems',
    subtitle: 'Mission-critical, high-throughput engines & deterministic math',
    icon: Server,
    color: 'border-l-forest-700',
    tagColor: 'bg-sage-100 text-forest-700 border-sage-200',
    skills: [
      { name: 'C# / .NET Core', category: 'Core Language', highlight: true },
      { name: '.NET Web APIs & Microservices', category: 'Architecture', highlight: true },
      { name: 'Automated Portfolio Rebalancing', category: 'WealthTech', highlight: true },
      { name: 'Tax-Aware Trading Engines', category: 'WealthTech', highlight: true },
      { name: 'ASP.NET MVC', category: 'Framework' },
      { name: 'ADO.NET High-Perf Data Access', category: 'Database' },
      { name: 'SQL Server & Query Optimization', category: 'Database', highlight: true },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Swiss Ephemeris Astronomical Engine', category: 'Precision Math', highlight: true },
    ],
    architectureHighlights: [
      'Engineered automated rebalancing pipelines handling high-volume equity and mutual fund rebalancing for institutional RIAs.',
      'Designed tax-loss harvesting engines calculating wash-sale rules, short-term vs long-term capital gains, and tax drag mitigation.',
      'Refactored legacy stored procedures and query pipelines into ultra-fast zero-allocation data querying routines.',
    ],
  },
  {
    id: 'frontend-mobile',
    title: 'Frontend, Mobile & Creative Tech',
    subtitle: 'Fluid user experiences, 3D graphics & native Android OS services',
    icon: Smartphone,
    color: 'border-l-terracotta-600',
    tagColor: 'bg-terracotta-50 text-terracotta-600 border-terracotta-100',
    skills: [
      { name: 'Next.js & React 18/19', category: 'Web', highlight: true },
      { name: 'React Native & Expo', category: 'Mobile', highlight: true },
      { name: 'Kotlin Android Native Services', category: 'Android OS', highlight: true },
      { name: 'SYSTEM_ALERT_WINDOW Overlays', category: 'Android OS', highlight: true },
      { name: 'TypeScript', category: 'Language', highlight: true },
      { name: 'Three.js & WebGL', category: '3D Graphics', highlight: true },
      { name: 'Tailwind CSS & Design Systems', category: 'Styling' },
      { name: 'Unity 2D/3D Game Engine', category: 'Gaming' },
      { name: 'Lottie & GSAP Animations', category: 'Micro-interactions' },
    ],
    architectureHighlights: [
      'Developed foreground floating Android companion overlay with Kotlin WindowManager and state machines in ByteBuddy.',
      'Built custom interactive 3D WebGL experiences and SVG star-chart generators with sub-second vector renders.',
      'Architected cross-platform mobile apps with offline-first SQLite synchronization and seamless background telemetry.',
    ],
  },
  {
    id: 'cloud-edge-ai',
    title: 'Cloud, Edge & AI Automation',
    subtitle: 'Serverless compute, edge data pipelines & local LLM agents',
    icon: Cloud,
    color: 'border-l-amber-600',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    skills: [
      { name: 'Cloudflare Workers & Pages', category: 'Serverless Edge', highlight: true },
      { name: 'Supabase (Auth, DB, Realtime)', category: 'Backend-as-a-Service', highlight: true },
      { name: 'Self-Hosted n8n Automation', category: 'Workflows', highlight: true },
      { name: 'Local LLMs (Ollama / DeepSeek)', category: 'AI Inference', highlight: true },
      { name: 'Meta WhatsApp Cloud API', category: 'Messaging Automation', highlight: true },
      { name: 'MapLibre GL & Geolocation', category: 'GIS Mapping' },
      { name: 'Docker & Containerization', category: 'DevOps' },
      { name: 'RESTful API Integration', category: 'Integrations' },
    ],
    architectureHighlights: [
      'Deployed zero-cold-start edge APIs on Cloudflare Workers handling global requests with <30ms latency.',
      'Created self-hosted n8n workflows connecting transactional WhatsApp alerts, payment webhooks, and customer notifications.',
      'Integrated local and cloud LLM memory pipelines for conversational context recall in astrology and productivity apps.',
    ],
  },
];

export default function EngineeringSection() {
  const [activeCluster, setActiveCluster] = useState<string>('backend');

  return (
    <section id="engineering" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
      {/* Section Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 border border-sage-200 text-forest-700 text-xs font-mono font-semibold tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>SECTION 01 // ARCHITECTURE &amp; ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
          Enterprise Systems &amp; <span className="font-serif italic font-normal text-terracotta-600">Technical Arsenal</span>
        </h2>
        <p className="text-charcoal-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          Over a decade of architecting high-reliability wealth management engines in enterprise .NET, combined with modern TypeScript, Android native overlays, and edge serverless ecosystems.
        </p>
      </div>

      {/* Role Spotlight Card: RedBlack Software */}
      <div className="mb-14 glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 shadow-watercolor border border-parchment-300 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-200/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-forest-700 text-parchment-50 font-mono text-xs font-bold tracking-wider">
                CURRENT ROLE
              </span>
              <span className="font-mono text-xs text-charcoal-500">
                Infopark Cyber Tower 2, Kochi, Kerala
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
              Senior Software Engineer{' '}
              <span className="text-forest-700 font-serif italic font-normal">@ RedBlack Software</span>
            </h3>
            <p className="text-xs font-mono text-charcoal-500 uppercase tracking-wider">
              (Formerly Intelliflo // Enterprise WealthTech &amp; Portfolio Management)
            </p>

            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed pt-1">
              Driving core architecture for institutional wealth management platforms. Spearheading the development of automated portfolio rebalancing engines, high-scale trade generation pipelines, and tax-loss harvesting engines that power billions of dollars in client assets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-parchment-50/80 border border-parchment-300/80">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span className="text-xs text-charcoal-700 font-medium">
                  Deterministic rebalancing algorithms with multi-account householding.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-parchment-50/80 border border-parchment-300/80">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span className="text-xs text-charcoal-700 font-medium">
                  Tax-aware trading engine factoring wash-sale constraints and capital gains.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-parchment-50/80 border border-parchment-300/80">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span className="text-xs text-charcoal-700 font-medium">
                  C# .NET Core Web APIs optimized for low-latency batch processing.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-parchment-50/80 border border-parchment-300/80">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span className="text-xs text-charcoal-700 font-medium">
                  High-throughput SQL Server database tuning &amp; execution plans.
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry Column */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-parchment-200/90 border border-parchment-300 space-y-1">
              <div className="font-mono text-[10px] tracking-wider uppercase text-charcoal-500">
                Enterprise Domain
              </div>
              <div className="text-sm font-bold text-charcoal-900">
                Wealth Management &amp; Institutional Rebalancing
              </div>
              <div className="text-xs text-charcoal-600">
                Tax-loss harvesting, model portfolio alignment, and order generation.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-parchment-200/90 border border-parchment-300 space-y-1">
              <div className="font-mono text-[10px] tracking-wider uppercase text-charcoal-500">
                Core Tech Stack
              </div>
              <div className="text-sm font-bold text-charcoal-900">
                C# // .NET Core // SQL Server // Web APIs
              </div>
              <div className="text-xs text-charcoal-600">
                Microservices, ADO.NET query optimizers, and automated regression suites.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-parchment-200/90 border border-parchment-300 space-y-1">
              <div className="font-mono text-[10px] tracking-wider uppercase text-charcoal-500">
                Location &amp; Hub
              </div>
              <div className="text-sm font-bold text-forest-700 flex items-center gap-1.5">
                <span>Cyber Tower 2, Infopark, Kochi</span>
              </div>
              <div className="text-xs text-charcoal-600">
                Heart of Kerala&apos;s enterprise software and fintech engineering corridor.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3D Skill Clusters */}
      <div className="space-y-6">
        {/* Cluster Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-parchment-200/80 border border-parchment-300 max-w-fit">
          {TECH_CLUSTERS.map((cluster) => {
            const Icon = cluster.icon;
            const isActive = activeCluster === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => setActiveCluster(cluster.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-charcoal-900 text-parchment-50 shadow-md'
                    : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-parchment-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cluster.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Cluster Showcase Card */}
        {TECH_CLUSTERS.filter((c) => c.id === activeCluster).map((cluster) => {
          const Icon = cluster.icon;
          return (
            <div
              key={cluster.id}
              className={`glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border-l-8 ${cluster.color} shadow-watercolor transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-parchment-300">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-parchment-200 border border-parchment-300 text-charcoal-900">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-charcoal-900">
                      {cluster.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-500 font-mono">
                      {cluster.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="py-6">
                <div className="font-mono text-xs font-bold text-charcoal-600 uppercase tracking-wider mb-4">
                  Core Technologies &amp; Capabilities
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cluster.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 transition-transform duration-150 hover:scale-105 ${
                        skill.highlight
                          ? cluster.tagColor + ' shadow-sm font-semibold'
                          : 'bg-parchment-50 text-charcoal-700 border-parchment-300'
                      }`}
                    >
                      {skill.highlight && <Zap className="w-3 h-3" />}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="pt-4 border-t border-parchment-300">
                <div className="font-mono text-xs font-bold text-charcoal-600 uppercase tracking-wider mb-3">
                  Engineering Proof Points
                </div>
                <div className="space-y-2.5">
                  {cluster.architectureHighlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-700">
                      <Sparkles className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
