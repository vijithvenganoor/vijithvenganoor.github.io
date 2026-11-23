'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, Terminal, Cpu, ArrowDown, RefreshCw } from 'lucide-react';
import { useArcade } from '@/context/ArcadeContext';

export type CharacterState = 'working' | 'left' | 'right' | 'greeting' | 'pointing';

interface HeroCharacterCanvasProps {
  onExploreClick: () => void;
}

const HERO_IMAGES: Record<CharacterState, string> = {
  working: '/images/hero/hero-working.webp',
  left: '/images/hero/hero-left.webp',
  right: '/images/hero/hero-right.webp',
  greeting: '/images/hero/hero-greeting.webp',
  pointing: '/images/hero/hero-pointing.webp',
};

export default function HeroCharacterCanvas({ onExploreClick }: HeroCharacterCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeGame } = useArcade();
  const [renderMode, setRenderMode] = useState<'2.5d' | 'frames'>('2.5d');
  const [activeState, setActiveState] = useState<CharacterState>('working');
  const [activeZone, setActiveZone] = useState<'left' | 'center' | 'right' | 'idle'>('idle');
  const [parallax, setParallax] = useState({ rotateX: 0, rotateY: 0, tx: 0, ty: 0 });

  // Frame sequence scrubbing mode state
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const targetFrameRef = useRef<number>(1);
  const rafRef = useRef<number | null>(null);

  // Return to idle timer
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetToIdleAfterDelay = useCallback((delay = 2000) => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setActiveState('working');
      setActiveZone('idle');
      targetFrameRef.current = 1;
    }, delay);
  }, []);

  // Frame sequence smooth lerp loop
  useEffect(() => {
    if (renderMode !== 'frames') return;

    let localFrame = currentFrame;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const loop = () => {
      const diff = targetFrameRef.current - localFrame;
      if (Math.abs(diff) > 0.3) {
        localFrame = lerp(localFrame, targetFrameRef.current, 0.15);
        setCurrentFrame(Math.round(localFrame));
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [renderMode, currentFrame]);

  // Zone trigger logic
  const handleZoneChange = useCallback(
    (zone: 'left' | 'center' | 'right') => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

      setActiveZone(zone);

      if (zone === 'left') {
        setActiveState('left');
        targetFrameRef.current = 35;
        resetToIdleAfterDelay(2200);
      } else if (zone === 'right') {
        setActiveState('right');
        targetFrameRef.current = 75;
        resetToIdleAfterDelay(2200);
      } else if (zone === 'center') {
        setActiveState('greeting');
        targetFrameRef.current = 50;

        // Sequence: after 900ms switch to pointing down
        setTimeout(() => {
          setActiveState((current) => (current === 'greeting' ? 'pointing' : current));
          targetFrameRef.current = 60;
        }, 950);

        resetToIdleAfterDelay(4000);
      }
    },
    [resetToIdleAfterDelay]
  );

  // Mouse move handler over hero
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || activeGame) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Subtle 2.5D tilt
      const rY = (x - 0.5) * 10;
      const rX = -(y - 0.5) * 8;
      const tx = (x - 0.5) * 12;
      const ty = (y - 0.5) * 8;
      setParallax({ rotateX: rX, rotateY: rY, tx, ty });

      // Determine horizontal zone
      if (x < 0.33) {
        if (activeZone !== 'left') handleZoneChange('left');
      } else if (x > 0.67) {
        if (activeZone !== 'right') handleZoneChange('right');
      } else {
        if (activeZone !== 'center') handleZoneChange('center');
      }
    },
    [activeZone, handleZoneChange]
  );

  const handleMouseLeave = useCallback(() => {
    setParallax({ rotateX: 0, rotateY: 0, tx: 0, ty: 0 });
    resetToIdleAfterDelay(1500);
  }, [resetToIdleAfterDelay]);

  // Format frame number
  const paddedFrame = String(Math.min(90, Math.max(1, currentFrame))).padStart(3, '0');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center select-none"
    >
      {/* Sunlight Halo Behind Character */}
      <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full character-halo pointer-events-none -translate-y-6" />

      {/* Mode Switcher Pill */}
      <div className="absolute top-2 right-4 z-30 flex items-center gap-1.5 p-1 rounded-full bg-parchment-200/80 border border-parchment-300 backdrop-blur-md shadow-sm text-[11px] font-mono">
        <button
          onClick={() => setRenderMode('2.5d')}
          className={`px-3 py-1 rounded-full transition-all ${
            renderMode === '2.5d'
              ? 'bg-forest-700 text-parchment-50 shadow-sm font-semibold'
              : 'text-charcoal-700 hover:text-charcoal-900'
          }`}
          title="Generative 2.5D Depth Rig"
        >
          2.5D Depth Rig
        </button>
        <button
          onClick={() => setRenderMode('frames')}
          className={`px-3 py-1 rounded-full transition-all ${
            renderMode === 'frames'
              ? 'bg-terracotta-600 text-parchment-50 shadow-sm font-semibold'
              : 'text-charcoal-700 hover:text-charcoal-900'
          }`}
          title="90-Frame Scrubbed Sequence"
        >
          Frame Sequence
        </button>
      </div>

      {/* Three Mobile Tap Zones (Transparent Overlays with Tap Hints) */}
      <div className="absolute inset-0 z-20 flex md:hidden pointer-events-auto">
        <button
          onClick={() => handleZoneChange('left')}
          className="w-1/3 h-full focus:outline-none"
          aria-label="Interact Left"
        />
        <button
          onClick={() => handleZoneChange('center')}
          className="w-1/3 h-full focus:outline-none"
          aria-label="Interact Center"
        />
        <button
          onClick={() => handleZoneChange('right')}
          className="w-1/3 h-full focus:outline-none"
          aria-label="Interact Right"
        />
      </div>

      {/* Main Character Illustration Canvas with 2.5D Parallax */}
      <div
        className="relative w-[340px] sm:w-[440px] lg:w-[490px] h-full transition-transform duration-200 ease-out flex items-end justify-center"
        style={{
          transform: `perspective(1000px) rotateX(${parallax.rotateX}deg) rotateY(${parallax.rotateY}deg) translate3d(${parallax.tx}px, ${parallax.ty}px, 0)`,
        }}
      >
        {renderMode === '2.5d' ? (
          /* 2.5D Generative Watercolor States with Crossfade */
          <div className="relative w-full h-[96%] max-h-[660px]">
            {(['working', 'left', 'right', 'greeting', 'pointing'] as CharacterState[]).map((state) => (
              <div
                key={state}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeState === state ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={HERO_IMAGES[state]}
                  alt={`Vijith V S - ${state} state`}
                  fill
                  priority={state === 'working'}
                  sizes="(max-width: 768px) 340px, (max-width: 1200px) 440px, 490px"
                  className="object-contain object-bottom drop-shadow-xl"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Frame Sequence Scrubbing Mode (frame_001.webp - frame_090.webp) */
          <div className="relative w-full h-[96%] max-h-[660px]">
            <Image
              src={`/frames/frame_${paddedFrame}.webp`}
              alt={`Vijith V S - Frame ${paddedFrame}`}
              fill
              unoptimized
              className="object-contain object-bottom drop-shadow-xl"
            />
            <div className="absolute bottom-4 left-4 z-20 px-2 py-1 rounded bg-charcoal-900/80 text-parchment-100 font-mono text-[10px]">
              Frame: {paddedFrame} / 090
            </div>
          </div>
        )}

        {/* Primary Interactive CTA Pill Over Lower Laptop Bezel */}
        <div
          className={`absolute bottom-6 sm:bottom-8 z-30 transition-all duration-300 ${
            activeState === 'greeting' || activeState === 'pointing' || activeZone === 'center'
              ? 'scale-105 opacity-100 translate-y-0'
              : 'opacity-90 hover:opacity-100 hover:scale-105'
          }`}
        >
          <button
            onClick={onExploreClick}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-charcoal-900 text-parchment-50 hover:bg-terracotta-600 transition-all duration-300 shadow-xl border border-charcoal-800 hover:border-terracotta-500 font-mono text-xs font-bold tracking-wider uppercase"
          >
            <span>EXPLORE PORTFOLIO</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Floating Glassmorphic Hint & Reaction Callout Cards */}
      {/* Left Callout Card */}
      <div
        className={`absolute left-2 sm:left-4 top-1/3 max-w-[240px] sm:max-w-[270px] z-30 transition-all duration-400 ease-out pointer-events-none ${
          activeZone === 'left'
            ? 'opacity-100 translate-x-0'
            : activeZone === 'idle'
            ? 'opacity-85 translate-x-0'
            : 'opacity-40 -translate-x-3'
        }`}
      >
        {activeZone === 'left' ? (
          <div className="glass-panel rounded-2xl p-3.5 shadow-watercolor border-l-4 border-l-forest-700 animate-in fade-in slide-in-from-left duration-300">
            <div className="flex items-center gap-2 text-forest-700 font-mono text-xs font-bold">
              <Sparkles className="w-4 h-4 text-forest-700" />
              <span>Left Viewport Active</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-charcoal-900 leading-snug">
              &ldquo;Anyone over there on the left? 👀&rdquo;
            </p>
            <p className="mt-1 text-[11px] font-mono text-charcoal-500">
              Checking architecture logs...
            </p>
          </div>
        ) : activeZone === 'center' ? (
          <div className="glass-panel rounded-2xl p-3.5 shadow-watercolor border-l-4 border-l-terracotta-600 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-terracotta-600 font-mono text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-terracotta-600" />
              <span>Center Focus</span>
            </div>
            <p className="mt-1 text-xs font-bold text-charcoal-900">
              &ldquo;Hello and welcome! 👋&rdquo;
            </p>
            <p className="mt-0.5 text-[11px] font-mono text-charcoal-500">
              Glad you stopped by my studio.
            </p>
          </div>
        ) : (
          <div className="glass-panel rounded-full px-3.5 py-2 shadow-sm flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span className="text-[11px] font-mono font-medium text-charcoal-700">
              Move cursor to interact with me
            </span>
          </div>
        )}
      </div>

      {/* Right Callout Card (Visible when hovering right zone) */}
      <div
        className={`absolute right-2 sm:right-4 top-1/3 max-w-[240px] sm:max-w-[270px] z-30 transition-all duration-400 ease-out pointer-events-none ${
          activeZone === 'right' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
        }`}
      >
        <div className="glass-panel rounded-2xl p-3.5 shadow-watercolor border-r-4 border-r-terracotta-600 animate-in fade-in slide-in-from-right duration-300">
          <div className="flex items-center gap-2 text-terracotta-600 font-mono text-xs font-bold">
            <Cpu className="w-4 h-4 text-terracotta-600" />
            <span>Right Viewport Active</span>
          </div>
          <p className="mt-1 text-xs font-semibold text-charcoal-900 leading-snug">
            &ldquo;What&apos;s happening on the right? ⚡&rdquo;
          </p>
          <p className="mt-1 text-[11px] font-mono text-charcoal-500">
            Monitoring Cloudflare Workers...
          </p>
        </div>
      </div>

      {/* Zone Indicator Dots at Bottom */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 py-1 px-3 rounded-full bg-parchment-200/60 backdrop-blur-sm text-[10px] font-mono text-charcoal-500">
        <span className={activeZone === 'left' ? 'text-forest-700 font-bold' : ''}>← 0–33%</span>
        <span className="text-charcoal-300">•</span>
        <span className={activeZone === 'center' ? 'text-terracotta-600 font-bold' : ''}>33–67% Focus</span>
        <span className="text-charcoal-300">•</span>
        <span className={activeZone === 'right' ? 'text-forest-700 font-bold' : ''}>67–100% →</span>
      </div>
    </div>
  );
}
