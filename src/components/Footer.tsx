import React, { useState, useEffect } from 'react';
import { ArrowUp, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' EST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFX.playHover();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#C6FF00] flex items-center justify-center font-black text-black font-['Bebas_Neue'] text-xl">
                  IC
                </div>
                <span className="font-['Bebas_Neue'] text-3xl tracking-widest text-white">
                  {GYM_DATA.brand.name}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#888888] font-['Inter'] max-w-sm leading-relaxed mb-6">
                An industrial sanctuary built for athletes, lifters, and warriors. Zero pretension, maximum discipline, competition-calibrated steel.
              </p>

              {/* Live status badge */}
              <div className="inline-flex items-center gap-2.5 bg-[#121212] border border-[#C6FF00]/30 px-3.5 py-1.5 font-mono text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
                <span className="text-[#C6FF00] font-bold">OPEN NOW</span>
                <span className="text-[#666666]">|</span>
                <span className="text-[#A0A0A0]">{timeStr}</span>
              </div>
            </div>

            {/* Social Icons with SVG */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/20 bg-[#111111] flex items-center justify-center text-white hover:text-black hover:bg-[#C6FF00] hover:border-[#C6FF00] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/20 bg-[#111111] flex items-center justify-center text-white hover:text-black hover:bg-[#C6FF00] hover:border-[#C6FF00] transition-colors"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/20 bg-[#111111] flex items-center justify-center text-white hover:text-black hover:bg-[#C6FF00] hover:border-[#C6FF00] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#C6FF00] tracking-widest uppercase block mb-4">
              // NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-mono uppercase">
              <li>
                <a href="#equipment-assembly" className="text-[#A0A0A0] hover:text-[#C6FF00] transition-colors">
                  01 // EQUIPMENT ASSEMBLY
                </a>
              </li>
              <li>
                <a href="#ugc-entrance" className="text-[#A0A0A0] hover:text-[#C6FF00] transition-colors">
                  02 // UGC WALK-IN POV
                </a>
              </li>
              <li>
                <a href="#the-gym" className="text-[#A0A0A0] hover:text-[#C6FF00] transition-colors">
                  03 // EXPLORE FACILITY
                </a>
              </li>
              <li>
                <a href="#philosophy" className="text-[#A0A0A0] hover:text-[#C6FF00] transition-colors">
                  04 // TRAINING PHILOSOPHY
                </a>
              </li>
              <li>
                <a href="#programs" className="text-[#A0A0A0] hover:text-[#C6FF00] transition-colors">
                  04 // ATHLETE PROGRAMS
                </a>
              </li>
              <li>
                <a href="#membership" className="text-[#A0A0A0] hover:text-[#C6FF00] transition-colors">
                  05 // MEMBERSHIP TIERS
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-[#A0A0A0] hover:text-[#C6FF00] transition-colors">
                  06 // MEMBER STORIES
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-4">
            <span className="font-mono text-xs text-[#C6FF00] tracking-widest uppercase block mb-4">
              // FACILITY DOSSIER
            </span>
            <div className="space-y-4 text-xs font-['Inter'] text-[#A0A0A0]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">LOCATION:</strong>
                  <span>{GYM_DATA.brand.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">FACILITY HOURS:</strong>
                  <span>{GYM_DATA.brand.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">PHONE:</strong>
                  <span>{GYM_DATA.brand.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">EMAIL:</strong>
                  <span>{GYM_DATA.brand.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#666666]">
          <div>
            &copy; {new Date().getFullYear()} IRON CITY GYM LLC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF ENTRY</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-[#C6FF00] transition-colors border border-white/20 px-3 py-1.5 bg-[#121212]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
