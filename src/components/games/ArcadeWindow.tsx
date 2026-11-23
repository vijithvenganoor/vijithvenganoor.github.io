'use client';

import React, { useRef, useEffect } from 'react';
import { useArcade, GAMES_LIST, GameId } from '@/context/ArcadeContext';
import {
  Gamepad2,
  X,
  RotateCcw,
  ChevronLeft,
  Trophy,
  Terminal,
  Layers,
  Rocket,
  Play,
  Sparkles,
  Volume2,
  Zap,
} from 'lucide-react';

const ICON_MAP = {
  terminal: Terminal,
  layers: Layers,
  rocket: Rocket,
  zap: Zap,
};

export default function ArcadeWindow() {
  const {
    isOpen,
    activeGame,
    score,
    highScores,
    playGame,
    closeArcade,
    backToHub,
    restartGame,
  } = useArcade();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Focus iframe on mount of active game so keyboard controls work immediately
  useEffect(() => {
    if (activeGame && iframeRef.current) {
      setTimeout(() => {
        iframeRef.current?.focus();
      }, 100);
    }
  }, [activeGame]);

  if (!isOpen) return null;

  const currentGameInfo = activeGame ? GAMES_LIST.find((g) => g.id === activeGame) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-charcoal-900/80 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Retro Arcade Hub"
    >
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[820px] rounded-3xl bg-[#090d16]/95 border border-slate-700/60 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Control Bar */}
        <div className="h-16 px-4 sm:px-6 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between shrink-0">
          {/* Left Title / Back to Hub */}
          <div className="flex items-center gap-3">
            {activeGame ? (
              <button
                onClick={backToHub}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-mono font-semibold text-slate-200 transition-colors"
                title="Return to Games Hub"
              >
                <ChevronLeft className="w-4 h-4 text-cyan-400" />
                <span>Back to Games</span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold tracking-wider text-slate-200 flex items-center gap-2">
                    <span>ARCADE LAB</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    HTML5 CANVAS EXPERIMENTS
                  </div>
                </div>
              </div>
            )}

            {currentGameInfo && (
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
                <span className="font-mono text-xs font-bold text-slate-200">
                  {currentGameInfo.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  [{currentGameInfo.category}]
                </span>
              </div>
            )}
          </div>

          {/* Center: Live Score Display & Game Controls when playing */}
          {activeGame && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,245,212,0.15)]">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold">
                  SCORE
                </span>
                <span className="font-mono text-base sm:text-lg font-black text-cyan-400">
                  {score}
                </span>
              </div>

              <button
                onClick={restartGame}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors"
                title="Restart active game"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Restart</span>
              </button>
            </div>
          )}

          {/* Right Action: Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={closeArcade}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs font-mono flex items-center gap-1"
              title="Close Arcade (Esc)"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">ESC</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col">
          {!activeGame ? (
            /* GAMES HUB VIEW */
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center space-y-8 py-4">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PLAYABLE MINI-GAMES // NO INSTALL REQUIRED</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Choose a Game to Play
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                  Built purely in native HTML5 Canvas &amp; JavaScript with zero dependencies, 60fps physics, synthesized retro soundscapes, and full keyboard/touch controls.
                </p>
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {GAMES_LIST.map((game) => {
                  const Icon = ICON_MAP[game.iconName as keyof typeof ICON_MAP] || Gamepad2;
                  const highScore = highScores[game.id] || 0;

                  return (
                    <div
                      key={game.id}
                      className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-950/30"
                    >
                      <div className="space-y-4">
                        {/* Top Badge & Icon */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-wider text-slate-500 font-bold uppercase">
                            {game.category}
                          </span>
                          <div className={`p-2.5 rounded-xl border ${game.accentColor}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Game Title & Description */}
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {game.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            {game.tagline}
                          </p>
                        </div>

                        {/* Controls Hint */}
                        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-400">
                          {game.controlsHint}
                        </div>
                      </div>

                      {/* Card Footer: High Score & Play Button */}
                      <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                          <Trophy className="w-3.5 h-3.5 text-amber-400" />
                          <span>Best: {highScore}</span>
                        </div>

                        <button
                          onClick={() => playGame(game.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/20 group-hover:scale-105"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>PLAY NOW</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Notice */}
              <div className="text-center text-[11px] font-mono text-slate-500">
                Tip: While playing, page scrolling is locked and background 3D particle rendering is paused for smooth 60fps performance.
              </div>
            </div>
          ) : (
            /* GAME PLAYER VIEW */
            <div className="w-full flex-1 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-3xl h-full max-h-[660px] rounded-2xl overflow-hidden border border-slate-800 bg-[#090d16] shadow-2xl flex items-center justify-center">
                <iframe
                  id="active-game-iframe"
                  ref={iframeRef}
                  src={`/games/${activeGame}/index.html`}
                  title={currentGameInfo?.title || 'Mini Game'}
                  className="w-full h-full border-0 rounded-2xl"
                  allow="autoplay"
                />
              </div>

              {/* Controls footer reminder below canvas */}
              <div className="mt-3 text-center text-xs font-mono text-slate-400 flex items-center gap-4">
                <span>{currentGameInfo?.controlsHint}</span>
                <span className="text-slate-700">•</span>
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">ESC</kbd> to exit to hub</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
