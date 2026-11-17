'use client';

import React from 'react';
import HeroCharacterCanvas from './HeroCharacterCanvas';
import DustParticlesCanvas from '../3d/DustParticlesCanvas';
import { ArrowDown, Code2, MapPin, Sparkles, Building2, Flame } from 'lucide-react';

export default function HeroSection() {
  const scrollToExplore = () => {
    const target = document.getElementById('engineering');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 3D Dust and Mote Particles */}
      <DustParticlesCanvas />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
        {/* Left Editorial Overlay */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 pt-6 lg:pt-0">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-parchment-200/90 border border-parchment-300/90 text-charcoal-700 text-xs font-mono tracking-wider w-fit shadow-sm">
            <span className="text-sm">👋</span>
            <span className="font-semibold uppercase tracking-widest text-[11px]">HI, I&apos;M</span>
            <span className="text-charcoal-300">•</span>
            <span className="text-forest-700 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Kochi, Kerala
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-charcoal-900 leading-[0.95]">
              Vijith
            </h1>
            <div className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-terracotta-600 font-medium tracking-normal pl-1">
              V S
            </div>
          </div>

          {/* Role Subtitle in Monospace */}
          <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-forest-700 leading-relaxed max-w-md">
            SENIOR SOFTWARE ENGINEER & INDIE PRODUCT BUILDER
          </div>

          {/* Micro-bio note */}
          <p className="text-sm sm:text-base text-charcoal-500 leading-relaxed max-w-lg font-normal">
            Architecting enterprise WealthTech in <span className="font-semibold text-charcoal-800">.NET</span> by day. Shipping AI apps, SaaS tools, and serverless products by night from Kochi, Kerala.
          </p>

          {/* Telemetry / Credential Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-parchment-200/80 border border-parchment-300 text-[11px] font-mono text-charcoal-700">
              <Building2 className="w-3.5 h-3.5 text-forest-700" />
              <span>RedBlack Software</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-parchment-200/80 border border-parchment-300 text-[11px] font-mono text-charcoal-700">
              <Code2 className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Enterprise WealthTech</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-parchment-200/80 border border-parchment-300 text-[11px] font-mono text-charcoal-700">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>7+ Indie Products Shipped</span>
            </div>
          </div>
        </div>

        {/* Centerpiece: Interactive Hero Character */}
        <div className="lg:col-span-7 flex items-center justify-center relative">
          <HeroCharacterCanvas onExploreClick={scrollToExplore} />
        </div>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <div className="max-w-7xl mx-auto w-full pt-4 flex items-center justify-between border-t border-parchment-300/80 text-[11px] font-mono text-charcoal-400 relative z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-forest-700" />
          <span className="font-medium text-charcoal-600">Enterprise .NET &amp; High-Frequency Rebalancing</span>
        </div>
        <button
          onClick={scrollToExplore}
          className="hidden sm:flex items-center gap-1 text-charcoal-600 hover:text-terracotta-600 transition-colors"
        >
          <span>Scroll down for engineering architecture</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
