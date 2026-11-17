'use client';

import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUp,
  MapPin,
  Terminal,
  Send,
  Sparkles,
  Coffee,
} from 'lucide-react';

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  const email = 'vijithvs92@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:${email}?subject=Collaboration%20Inquiry%20via%20Portfolio&body=${encodeURIComponent(
        message + (senderEmail ? `\n\nFrom: ${senderEmail}` : '')
      )}`;
    }, 600);
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
      {/* Interactive Collaboration Terminal Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 shadow-watercolor border border-parchment-300 relative overflow-hidden mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Connection & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-50 border border-terracotta-100 text-terracotta-600 text-xs font-mono font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLABORATE &amp; CONNECT</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
              Let&apos;s build something <br />
              <span className="font-serif italic text-forest-700 font-normal">remarkable together.</span>
            </h3>

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              Whether you want to discuss enterprise wealth management rebalancing architectures in .NET, jam on indie AI/mobile apps, or grab a pour-over coffee in Kochi—my inbox is always open.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-mono text-charcoal-700">
                <MapPin className="w-4 h-4 text-forest-700 shrink-0" />
                <span>Kochi, Kerala, India (Cyber Tower 2, Infopark)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-charcoal-700">
                <Coffee className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>Open for indie SaaS collaborations &amp; technical advisory</span>
              </div>
            </div>

            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-parchment-200/90 border border-parchment-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-charcoal-700 shrink-0" />
                <span className="font-mono text-xs text-charcoal-900 font-semibold truncate">
                  {email}
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-900 text-parchment-50 hover:bg-terracotta-600 text-[11px] font-mono transition-colors shrink-0 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Drop-a-Message Terminal Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-charcoal-900 text-parchment-100 p-6 sm:p-7 shadow-2xl border border-charcoal-800 space-y-4">
              <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-parchment-300">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>terminal // indie-connect.sh</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              {formSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="font-mono text-sm font-bold text-parchment-50">
                    Preparing your message...
                  </div>
                  <p className="font-mono text-xs text-parchment-400 max-w-sm mx-auto">
                    Opening your default mail client with your inquiry addressed to Vijith.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-parchment-400 mb-1.5 text-[11px]">
                      // Your Email or Handle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. alex@company.com or @twitter"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-parchment-100 placeholder:text-charcoal-500 focus:outline-none focus:border-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-parchment-400 mb-1.5 text-[11px]">
                      // Message or Project Concept
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Hi Vijith, wanted to connect regarding WealthTech rebalancing engines / an indie build..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-parchment-100 placeholder:text-charcoal-500 focus:outline-none focus:border-terracotta-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-500 text-parchment-50 font-bold tracking-wider transition-colors shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT DISPATCH →</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-parchment-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-charcoal-500">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-bold text-charcoal-800">© {new Date().getFullYear()} Vijith V S.</span>
          <span className="hidden sm:inline text-charcoal-300">•</span>
          <span>Crafted with Next.js, Three.js, GSAP &amp; Watercolor Arts</span>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/vijithvenganoor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-charcoal-900 transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/vijithvs/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-charcoal-900 transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-parchment-200 hover:bg-parchment-300 text-charcoal-800 transition-colors font-semibold"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
