import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface NavbarProps {
  onOpenJoinModal: (tierId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundFX.toggle();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { name: 'ASSEMBLY', href: '#equipment-assembly' },
    { name: 'WALK-IN POV', href: '#ugc-entrance' },
    { name: 'THE GYM', href: '#the-gym' },
    { name: 'PHILOSOPHY', href: '#philosophy' },
    { name: 'PROGRAMS', href: '#programs' },
    { name: 'MEMBERSHIP', href: '#membership' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-3 cursor-pointer select-none"
            onMouseEnter={() => soundFX.playHover()}
          >
            <div className="w-8 h-8 bg-[#C6FF00] flex items-center justify-center font-black text-black font-['Bebas_Neue'] text-xl tracking-tighter group-hover:scale-105 transition-transform">
              IC
            </div>
            <div className="flex flex-col">
              <span className="font-['Bebas_Neue'] text-2xl md:text-3xl tracking-widest text-white leading-none group-hover:text-[#C6FF00] transition-colors">
                IRON CITY
              </span>
              <span className="text-[9px] font-['Inter'] tracking-[0.3em] text-[#888888] font-semibold uppercase">
                Est. 2018 • Industrial Gym
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-['Inter'] font-semibold tracking-widest text-[#B3B3B3] hover:text-[#C6FF00] transition-colors relative py-1 group"
                onMouseEnter={() => soundFX.playHover()}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C6FF00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded border text-xs flex items-center gap-1.5 transition-all ${
                soundEnabled
                  ? 'border-[#C6FF00] text-[#C6FF00] bg-[#C6FF00]/10 shadow-[0_0_12px_rgba(198,255,0,0.2)]'
                  : 'border-white/20 text-[#888888] hover:text-white hover:border-white/40'
              }`}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-wider hidden sm:inline">SFX ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-wider hidden sm:inline">SFX OFF</span>
                </>
              )}
            </button>

            {/* Primary CTA button */}
            <button
              onClick={() => {
                soundFX.playImpact();
                onOpenJoinModal();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="hidden sm:inline-flex items-center gap-2 bg-[#C6FF00] text-black font-['Oswald'] font-bold text-sm tracking-wider px-6 py-2.5 uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(198,255,0,0.4)] hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              <span>JOIN NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                soundFX.playHover();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-white hover:text-[#C6FF00] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-28 pb-12 px-8"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-[#C6FF00] tracking-widest">
                // NAVIGATION MATRIX
              </span>
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-['Bebas_Neue'] text-4xl text-white hover:text-[#C6FF00] tracking-wider transition-colors flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span>{link.name}</span>
                  <span className="text-sm font-mono text-[#666666]">0{idx + 1}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full bg-[#C6FF00] text-black font-['Oswald'] font-bold text-lg tracking-widest py-4 uppercase text-center flex items-center justify-center gap-2"
              >
                <span>JOIN THE MOVEMENT</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <div className="flex justify-between items-center text-xs text-[#777777] font-mono pt-4 border-t border-white/10">
                <span>482 INDUSTRIAL PKWY</span>
                <span className="text-[#C6FF00]">24/7 OPEN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
