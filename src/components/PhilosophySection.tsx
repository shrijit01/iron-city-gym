import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GYM_DATA } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

export const PhilosophySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="philosophy" className="relative w-full py-28 md:py-36 bg-[#080808] border-t border-white/10 overflow-hidden">
      {/* Background Industrial Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 font-['Bebas_Neue'] text-[22vw] text-white/[0.015] pointer-events-none select-none whitespace-nowrap z-0">
        DISCIPLINE OVER MOTIVATION
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#C6FF00]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
                THE IRON CITY MANIFESTO
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl md:text-8xl text-white tracking-tight uppercase leading-[0.9]">
              THE TRAINING<br />PHILOSOPHY
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#888888] font-['Inter'] max-w-md mt-6 md:mt-0 leading-relaxed">
            We don't offer shortcuts or gimmicks. We forge resilient bodies and minds through high-density mechanical work, progressive overload, and iron discipline.
          </p>
        </div>

        {/* Split Screen Editorial Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Massive Editorial Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {GYM_DATA.philosophy.map((item, idx) => {
              const isActive = activeTab === idx;

              return (
                <div
                  key={item.number}
                  onMouseEnter={() => {
                    setActiveTab(idx);
                    soundFX.playHover();
                  }}
                  onClick={() => {
                    setActiveTab(idx);
                    soundFX.playImpact();
                  }}
                  className={`group cursor-pointer border-t transition-all duration-500 pt-6 ${
                    isActive ? 'border-[#C6FF00]' : 'border-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono tracking-widest transition-colors font-bold ${
                        isActive ? 'text-[#C6FF00]' : 'text-[#666666]'
                      }`}
                    >
                      {item.number} // {item.title}
                    </span>
                    <span
                      className={`text-xs font-mono transition-transform duration-300 ${
                        isActive ? 'text-[#C6FF00] translate-x-1' : 'text-[#555555]'
                      }`}
                    >
                      [EXPLORE PILLAR]
                    </span>
                  </div>

                  {/* Progressive Text Reveal Headline */}
                  <h3
                    className={`font-['Bebas_Neue'] text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase transition-all duration-300 ${
                      isActive ? 'text-white translate-x-2' : 'text-[#333333] hover:text-[#777777]'
                    }`}
                  >
                    {item.statement}
                  </h3>

                  {/* Body description */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-base sm:text-lg text-[#B0B0B0] font-['Inter'] font-light leading-relaxed max-w-xl pl-4 border-l-2 border-[#C6FF00]">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage with Dynamic Parallax Media */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 w-full aspect-[4/5] bg-[#151515] overflow-hidden border border-white/10 group shadow-2xl">
              {/* Dynamic Image Crossfade */}
              {GYM_DATA.philosophy.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{
                    opacity: activeTab === idx ? 1 : 0,
                    scale: activeTab === idx ? 1 : 1.08,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={item.image}
                    alt={`Iron City Gym ${item.title}`}
                    className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.25] grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
                </motion.div>
              ))}

              {/* Technical HUD Overlay on Image */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#080808]/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
                <span className="font-mono text-[10px] text-white tracking-widest uppercase">
                  RAW PLATFORM CAM 0{activeTab + 1}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#080808]/90 backdrop-blur-md p-4 border border-white/10">
                <span className="font-mono text-[10px] text-[#C6FF00] tracking-widest block uppercase mb-1">
                  CORE STANDARD
                </span>
                <p className="font-['Oswald'] text-lg text-white font-bold tracking-wide uppercase">
                  {GYM_DATA.philosophy[activeTab].statement}
                </p>
                <span className="font-mono text-xs text-[#777777]">
                  DISCIPLINE IS THE BRIDGE BETWEEN GOALS AND ACCOMPLISHMENT.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
