import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flame, MapPin } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface FinalCTASectionProps {
  onOpenJoinModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenJoinModal }) => {
  return (
    <section className="relative w-full py-32 md:py-44 bg-[#080808] border-t border-white/10 overflow-hidden flex items-center justify-center">
      {/* Background Cinematic Visual with Dramatic Lighting */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1920&auto=format&fit=crop"
          alt="Iron City Athlete Lifting Heavy"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.3] grayscale-[30%] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-radial from-transparent to-[#080808] opacity-90" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-[#151515] border border-[#C6FF00]/40 px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 bg-[#C6FF00] animate-ping" />
          <span className="text-xs font-mono tracking-widest text-[#C6FF00] uppercase font-bold">
            THE IRON NEVER LIES
          </span>
        </motion.div>

        {/* Massive Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-['Bebas_Neue'] text-6xl sm:text-8xl md:text-9xl text-white tracking-tight uppercase leading-[0.88] mb-6"
        >
          STOP WAITING.<br />
          <span className="text-[#C6FF00] drop-shadow-[0_0_35px_rgba(198,255,0,0.3)]">
            START BUILDING.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-[#CCCCCC] font-['Inter'] font-light max-w-xl mb-10 leading-relaxed"
        >
          Your strongest chapter starts with one decision. Step through our doors and feel what happens when pure focus meets calibrated steel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => {
              soundFX.playImpact();
              onOpenJoinModal();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="group relative inline-flex items-center gap-3 bg-[#C6FF00] text-black font-['Oswald'] font-bold text-base sm:text-lg tracking-widest px-10 py-5 uppercase shadow-[0_0_30px_rgba(198,255,0,0.35)] hover:bg-white hover:shadow-[0_0_40px_rgba(198,255,0,0.6)] transition-all duration-300"
          >
            <Flame className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
            <span>JOIN IRON CITY</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <a
            href="#the-gym"
            onMouseEnter={() => soundFX.playHover()}
            className="inline-flex items-center gap-2 border border-white/20 bg-black/60 backdrop-blur-sm text-white font-['Oswald'] font-bold text-base tracking-widest px-8 py-5 uppercase hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#C6FF00]" />
            <span>FIND YOUR TRAINING FLOOR</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
