'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type GameId = 'snake' | 'breakout' | 'dodger';

export interface GameInfo {
  id: GameId;
  title: string;
  tagline: string;
  category: string;
  accentColor: string;
  controlsHint: string;
  iconName: string;
}

export const GAMES_LIST: GameInfo[] = [
  {
    id: 'snake',
    title: 'Cyberpunk Snake',
    tagline: 'Grid-based neon serpent with kinetic particle trails & speed ramping.',
    category: 'CLASSIC // 60 FPS',
    accentColor: 'border-cyan-400 text-cyan-400 bg-cyan-950/30',
    controlsHint: 'Arrow Keys / WASD to steer • Space to pause',
    iconName: 'terminal',
  },
  {
    id: 'breakout',
    title: 'Neon Brick Breaker',
    tagline: 'Paddle & ball physics with dynamic rebound angles & particle bursts.',
    category: 'PHYSICS // MULTI-TIER',
    accentColor: 'border-pink-500 text-pink-500 bg-pink-950/30',
    controlsHint: 'Mouse or Left/Right arrows to move • Click or Space to launch',
    iconName: 'layers',
  },
  {
    id: 'dodger',
    title: 'Astro Dodger',
    tagline: 'Fast-paced celestial survival dodging plasma asteroids & laser gates.',
    category: 'SURVIVAL // PROCEDURAL',
    accentColor: 'border-sky-400 text-sky-400 bg-sky-950/30',
    controlsHint: 'Mouse or Arrow / WASD keys to pilot • Collect gold stars',
    iconName: 'rocket',
  },
];

interface ArcadeContextType {
  isOpen: boolean;
  activeGame: GameId | null;
  score: number;
  highScores: Record<GameId, number>;
  openHub: () => void;
  playGame: (gameId: GameId) => void;
  closeArcade: () => void;
  backToHub: () => void;
  restartGame: () => void;
}

const ArcadeContext = createContext<ArcadeContextType | undefined>(undefined);

export function ArcadeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState<Record<GameId, number>>({
    snake: 0,
    breakout: 0,
    dodger: 0,
  });

  // Load high scores from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vj_arcade_high_scores');
      if (saved) {
        setHighScores(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Save high scores
  const saveHighScore = useCallback((gameId: GameId, newScore: number) => {
    setHighScores((prev) => {
      if (newScore > (prev[gameId] || 0)) {
        const updated = { ...prev, [gameId]: newScore };
        try {
          localStorage.setItem('vj_arcade_high_scores', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      }
      return prev;
    });
  }, []);

  // PostMessage listener from iframe games
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'GAME_SCORE') {
        const receivedScore = Number(e.data.score) || 0;
        setScore(receivedScore);
        if (activeGame) {
          saveHighScore(activeGame, receivedScore);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeGame, saveHighScore]);

  // Lock body scroll and capture arrow keys when arcade/game is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (activeGame) {
            setActiveGame(null);
            setScore(0);
          } else {
            setIsOpen(false);
          }
          return;
        }

        // Capture navigation keys when playing a game so background page never scrolls
        if (activeGame) {
          const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
          if (gameKeys.includes(e.code) || gameKeys.includes(e.key)) {
            e.preventDefault();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown, { passive: false });
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, activeGame]);

  const openHub = () => {
    setIsOpen(true);
    setActiveGame(null);
    setScore(0);
  };

  const playGame = (gameId: GameId) => {
    setIsOpen(true);
    setActiveGame(gameId);
    setScore(0);
  };

  const closeArcade = () => {
    setIsOpen(false);
    setActiveGame(null);
    setScore(0);
  };

  const backToHub = () => {
    setActiveGame(null);
    setScore(0);
  };

  const restartGame = () => {
    setScore(0);
    const iframe = document.getElementById('active-game-iframe') as HTMLIFrameElement | null;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'RESTART_GAME' }, '*');
    }
  };

  return (
    <ArcadeContext.Provider
      value={{
        isOpen,
        activeGame,
        score,
        highScores,
        openHub,
        playGame,
        closeArcade,
        backToHub,
        restartGame,
      }}
    >
      {children}
    </ArcadeContext.Provider>
  );
}

export function useArcade() {
  const context = useContext(ArcadeContext);
  if (!context) {
    throw new Error('useArcade must be used within an ArcadeProvider');
  }
  return context;
}
