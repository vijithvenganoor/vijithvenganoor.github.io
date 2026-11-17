'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Palette,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  MapPin,
  Clock,
  Heart,
} from 'lucide-react';

interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  timeTag: string;
  location: string;
  image: string;
  narrative: string;
  tags: string[];
}

const STORIES: StoryItem[] = [
  {
    id: 'system-architecture',
    title: 'System Architecture & Wireframing',
    subtitle: 'Dual-monitor setup & pencil-and-paper distributed flows',
    timeTag: 'Deep Work // 10:00 AM',
    location: 'Home Studio, Ernakulam',
    image: '/images/stories/system-architecture.webp',
    narrative:
      'Before writing a single line of C# or TypeScript, I sketch distributed system state machines and interface layouts on grid paper. Dual screens loaded with component wireframes and system topology diagrams keep architecture grounded.',
    tags: ['System Design', 'Wireframing', 'Star Chart Study', 'Focus Studio'],
  },
  {
    id: 'trading-laptop',
    title: 'Equity Research & Swing Trading',
    subtitle: 'Fundamental balance sheets & 1–2 week breakout setups',
    timeTag: 'Market Hours // 02:30 PM',
    location: 'Balcony Desk, Kochi',
    image: '/images/stories/trading-laptop.webp',
    narrative:
      'Analyzing company quarterly financials, dividend ledgers, and technical price patterns in the Indian equity markets. This personal passion directly sparked SwingHarvest—automating capital gains and tax harvesting for active swing traders.',
    tags: ['Swing Trading', 'Tax Harvesting', 'Financial Analysis', 'NSE / BSE'],
  },
  {
    id: 'conference',
    title: 'Cloud-Native Community',
    subtitle: 'Exploring agentic AI & distributed telemetry corridors',
    timeTag: 'Community Tech Day',
    location: 'Infopark & Technopark Hubs',
    image: '/images/stories/conference.webp',
    narrative:
      'Engaging with fellow engineers, exploring multi-agent architectures, cloud-native telemetry, and serverless edge runtimes across Kerala’s twin tech corridors—Infopark Kochi and Technopark Trivandrum.',
    tags: ['Agent Architectures', 'Cloud Community', 'Developer Ecosystem', 'Kerala Tech'],
  },
  {
    id: 'marine-drive',
    title: 'Coastal Kochi & Marine Drive',
    subtitle: 'Tender coconuts, sea breezes & the Water Metro cruise',
    timeTag: 'Sunset Stroll // 05:45 PM',
    location: 'Marine Drive Promenade, Kochi',
    image: '/images/stories/marine-drive.webp',
    narrative:
      'Taking an evening break along the Arabian Sea backwaters. Watching the electric Kochi Water Metro boats glide past the promenade while sipping fresh tender coconut water—the ultimate reset button after marathon sprint deliveries.',
    tags: ['Marine Drive', 'Kochi Water Metro', 'Kerala Coastline', 'Evening Walk'],
  },
  {
    id: 'heritage-festival',
    title: 'Cultural Festivals & Heritage',
    subtitle: 'Malayalam literature, classical architecture & palace lawns',
    timeTag: 'Weekend Cultural Walk',
    location: 'Kanakakkunnu Palace, Thiruvananthapuram',
    image: '/images/stories/heritage-festival.webp',
    narrative:
      'Wandering through the shaded brick archways and red-tiled traditional Kerala architecture of Kanakakkunnu Palace during regional literary festivals. Heritage, art, and storytelling deeply inform the aesthetics of everything I build.',
    tags: ['Kerala Architecture', 'Literature Fest', 'Palace Lawns', 'Cultural Heritage'],
  },
  {
    id: 'story-ukulele',
    title: 'Acoustic Sessions & Malayalam Songwriting',
    subtitle: 'Strumming chords and crafting romantic lyrics on the balcony',
    timeTag: 'Balcony Twilight // 06:30 PM',
    location: 'Ernakulam Balcony Overlook',
    image: '/images/stories/story-ukulele.webp',
    narrative:
      'Unwinding with an acoustic wooden ukulele overlooking swaying coconut palms at dusk. Writing handwritten Malayalam lyrics, capturing vocal melody memos, and exploring AI-assisted music composition algorithms.',
    tags: ['Ukulele Chords', 'Malayalam Lyrics', 'Acoustic Music', 'Sunset Melodies'],
  },
  {
    id: 'story-coffee',
    title: 'The Pour-Over Ritual',
    subtitle: 'Freshly ground Arabica, goose-neck kettle & morning contemplation',
    timeTag: 'Morning Ritual // 07:15 AM',
    location: 'Studio Kitchen, Kochi',
    image: '/images/stories/story-coffee.webp',
    narrative:
      'Every productive engineering morning begins with the slow pour-over ritual. Blooming freshly roasted South Indian beans through a glass dripper while natural sunlight floods through traditional wooden shutters.',
    tags: ['Pour-Over Coffee', 'Morning Routine', 'Kochi Life', 'Precision Bloom'],
  },
  {
    id: 'story-fitness-gyro',
    title: 'Desk Ergonomics & Calibration',
    subtitle: 'Forearm strengthener ball & posture resets between deep sprints',
    timeTag: 'Midday Reset // 01:15 PM',
    location: 'Developer Workstation',
    image: '/images/stories/story-fitness-gyro.webp',
    narrative:
      'High-velocity code authoring demands deliberate ergonomic hygiene. Spinning a high-speed gyro powerball between compiler runs keeps wrists calibrated and prevents repetitive strain during intense build cycles.',
    tags: ['Wrist Ergonomics', 'Gyro Powerball', 'Dev Health', 'Focus Ritual'],
  },
  {
    id: 'story-car-care',
    title: 'Highway Miles & Machine Care',
    subtitle: 'NH 66 road trips, Kia Sonet iMT & Honda Hornet 2.0',
    timeTag: 'Weekend Roadtrip Prep',
    location: 'Kerala Highway Corridors',
    image: '/images/stories/story-car-care.webp',
    narrative:
      'Maintaining my 2023 Kia Sonet iMT and 2022 Honda Hornet 2.0 with hands-on precision before embarking on long scenic drives along NH 66, tracing coastal backwaters between Kochi and Trivandrum.',
    tags: ['Kia Sonet iMT', 'Honda Hornet 2.0', 'NH 66 Highway', 'Machine Care'],
  },
];

export default function StoryGallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomStory, setZoomStory] = useState<StoryItem | null>(null);

  const prevStory = () => {
    setCurrentIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
  };

  const active = STORIES[currentIndex];

  return (
    <section id="stories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
      {/* Section Header */}
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 border border-sage-200 text-forest-700 text-xs font-mono font-semibold tracking-wider">
          <Palette className="w-3.5 h-3.5" />
          <span>SECTION 03 // BEYOND CODE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
          Life in <span className="font-serif italic font-normal text-terracotta-600">Watercolor</span>
        </h2>
        <p className="text-charcoal-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          An authentic visual narrative captured through custom ink-and-watercolor illustrations—reflecting the rituals, music, Kerala landscapes, and highway drives that fuel my creative engineering.
        </p>
      </div>

      {/* Featured Story Spotlight Carousel Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 shadow-watercolor border border-parchment-300 relative overflow-hidden mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Illustration Preview with Click-to-Zoom */}
          <div className="lg:col-span-5 relative group flex items-center justify-center">
            <div
              onClick={() => setZoomStory(active)}
              className="relative w-full max-w-[340px] sm:max-w-[380px] h-[460px] sm:h-[520px] rounded-2xl overflow-hidden shadow-2xl border-2 border-parchment-300 bg-parchment-200 cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
            >
              <Image
                src={active.image}
                alt={active.title}
                fill
                priority
                sizes="(max-width: 768px) 340px, 420px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-parchment-100/90 backdrop-blur-md text-charcoal-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Story Narrative & Metadata */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 border border-terracotta-100 text-terracotta-600 font-mono text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{active.timeTag}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 border border-sage-200 text-forest-700 font-mono text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{active.location}</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900">
                {active.title}
              </h3>
              <p className="font-serif italic text-lg sm:text-xl text-forest-700 mt-1">
                {active.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal">
              {active.narrative}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {active.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-xl bg-parchment-200/90 border border-parchment-300 text-xs font-mono text-charcoal-700"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="pt-6 border-t border-parchment-300 flex items-center justify-between">
              <div className="font-mono text-xs text-charcoal-500">
                Story <span className="font-bold text-charcoal-900">{currentIndex + 1}</span> of{' '}
                {STORIES.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevStory}
                  className="p-2.5 rounded-full bg-parchment-200 hover:bg-parchment-300 text-charcoal-800 transition-colors shadow-sm"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextStory}
                  className="p-2.5 rounded-full bg-charcoal-900 hover:bg-terracotta-600 text-parchment-50 transition-colors shadow-sm"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Thumbnail Strip */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {STORIES.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 w-28 sm:w-36 rounded-2xl overflow-hidden border-2 transition-all p-1.5 text-left ${
              currentIndex === idx
                ? 'border-terracotta-600 bg-terracotta-50 shadow-md scale-105'
                : 'border-parchment-300 bg-parchment-100 hover:border-charcoal-400 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden mb-1.5 bg-parchment-200">
              <Image src={item.image} alt={item.title} fill sizes="140px" className="object-cover" />
            </div>
            <div className="font-mono text-[10px] font-bold text-charcoal-900 truncate">
              {item.title}
            </div>
            <div className="text-[9px] text-charcoal-500 truncate font-mono">{item.location}</div>
          </button>
        ))}
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setZoomStory(null)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-[460px] sm:max-w-[520px] h-[72vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-parchment-100 bg-parchment-100">
              <Image
                src={zoomStory.image}
                alt={zoomStory.title}
                fill
                sizes="(max-width: 768px) 90vw, 540px"
                className="object-contain"
              />
            </div>
            <div className="mt-3 text-center text-parchment-50">
              <div className="font-bold text-base">{zoomStory.title}</div>
              <div className="text-xs text-parchment-300 font-mono">{zoomStory.location}</div>
            </div>
            <button
              onClick={() => setZoomStory(null)}
              className="absolute -top-10 right-0 text-parchment-200 hover:text-parchment-50 font-mono text-sm"
            >
              Close [✕]
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
