import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Shield, Zap } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [counts, setCounts] = useState<number[]>(GYM_DATA.stats.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const animateCounts = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(
        GYM_DATA.stats.map((stat) => Math.round(stat.value * ease))
      );

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    requestAnimationFrame(animateCounts);
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-[#0d0d0d] border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background industrial grid pattern */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#C6FF00]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
              PERFORMANCE METRICS // CONFIRMED SPEC
            </span>
          </div>
          <span className="text-xs font-mono text-[#666666] hidden md:inline">
            REAL HARDWARE • ZERO COMPROMISE
          </span>
        </div>

        {/* 4-Column Brutalist Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {GYM_DATA.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative p-6 bg-[#141414] border border-white/10 group hover:border-[#C6FF00] transition-colors duration-300"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#C6FF00]" />

              <div className="font-['Bebas_Neue'] text-6xl sm:text-7xl lg:text-7xl tracking-tight text-white flex items-baseline leading-none mb-2">
                <span>{stat.prefix}</span>
                <span>{counts[idx].toLocaleString()}</span>
                <span className="text-[#C6FF00]">{stat.suffix}</span>
              </div>

              <div className="w-full h-[1px] bg-white/15 my-3 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 1.2, delay: idx * 0.2 }}
                  className="h-full bg-[#C6FF00]"
                />
              </div>

              <h4 className="font-['Oswald'] text-sm tracking-wider uppercase font-bold text-white mb-1">
                {stat.label}
              </h4>
              <p className="font-['Inter'] text-xs text-[#888888] leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Verification Footer Pill */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#111111] border border-white/5 font-mono text-xs text-[#777777]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C6FF00]" />
            <span>CALIBRATED COMPETITION PLATES CERTIFIED TO IPF STANDARDS</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#C6FF00]" />
            <span>HEAVY VIBRATION DAMPENED FOUNDATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
