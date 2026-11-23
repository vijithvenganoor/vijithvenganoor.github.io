'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Menu, X, ArrowUpRight, Gamepad2 } from 'lucide-react';
import { useArcade } from '@/context/ArcadeContext';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Engineering', href: '#engineering' },
  { name: 'Products', href: '#products' },
  { name: 'Games', href: '#games', isArcade: true },
  { name: 'Life in Watercolor', href: '#stories' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openHub } = useArcade();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-parchment-100/90 backdrop-blur-md border-b border-parchment-300/80 shadow-glass'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#"
          className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Vijith V S - Home"
        >
          <div className="w-9 h-9 rounded-full bg-sage-200 border border-sage-300 flex items-center justify-center font-serif text-lg font-bold text-forest-700 shadow-sm group-hover:bg-terracotta-50 group-hover:text-terracotta-600 group-hover:border-terracotta-500 transition-colors">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-charcoal-900">
              VIJITH V S
            </span>
            <span className="text-[10px] text-charcoal-500 font-mono tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              Kochi, Kerala
            </span>
          </div>
        </Link>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-parchment-200/70 border border-parchment-300/80 backdrop-blur-md shadow-sm">
          {NAV_LINKS.map((link) =>
            link.isArcade ? (
              <button
                key={link.name}
                onClick={openHub}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold text-charcoal-800 hover:text-white rounded-full bg-terracotta-50 hover:bg-terracotta-600 border border-terracotta-200/60 hover:border-terracotta-600 shadow-sm transition-all duration-200"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-terracotta-600 group-hover:text-white" />
                <span>{link.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs font-mono font-medium text-charcoal-700 hover:text-charcoal-900 rounded-full hover:bg-parchment-50 transition-all duration-200"
              >
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/vijithvs/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-charcoal-500 hover:text-charcoal-900 hover:bg-parchment-200 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/vijithvenganoor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-charcoal-900 text-parchment-50 hover:bg-terracotta-600 transition-colors shadow-sm"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-charcoal-700 hover:bg-parchment-200 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-parchment-100/95 backdrop-blur-xl border-b border-parchment-300 shadow-xl space-y-2">
          {NAV_LINKS.map((link) =>
            link.isArcade ? (
              <button
                key={link.name}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openHub();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-mono font-bold text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-terracotta-600" />
                  <span>{link.name} (Arcade)</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-terracotta-600 text-white font-semibold">
                  3 Games
                </span>
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-mono font-medium text-charcoal-800 hover:bg-parchment-200 transition-colors"
              >
                {link.name}
              </a>
            )
          )}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://github.com/vijithvenganoor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-semibold bg-charcoal-900 text-parchment-50"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vijithvs/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 rounded-lg border border-parchment-300 text-charcoal-700 hover:bg-parchment-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
