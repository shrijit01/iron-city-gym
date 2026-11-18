import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ArrowRight, Clock, Target, Plus, Minus } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';
import type { ProgramItem } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

interface ProgramsSectionProps {
  onSelectProgram: (program: ProgramItem) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="programs"
      className="relative w-full py-28 md:py-36 bg-[#080808] border-t border-white/10 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="w-4 h-4 text-[#C6FF00]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
                PERIODIZED PROTOCOLS
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none">
              TRAINING PROGRAMS
            </h2>
          </div>
          <span className="text-xs font-mono text-[#888888] tracking-widest uppercase mt-4 md:mt-0">
            // CALIBRATED FOR PEAK HUMAN FORCE
          </span>
        </div>

        {/* Floating Desktop Image Follower */}
        <div className="relative">
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: cursorPos.x + 20,
                  y: cursorPos.y - 140,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.1 }}
                className="hidden lg:block pointer-events-none fixed z-30 w-80 h-48 overflow-hidden border-2 border-[#C6FF00] shadow-[0_0_30px_rgba(0,0,0,0.9)]"
                style={{ top: 0, left: 0 }}
              >
                <img
                  src={GYM_DATA.programs[hoveredIndex].image}
                  alt={GYM_DATA.programs[hoveredIndex].title}
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-[#C6FF00]">
                  <span>{GYM_DATA.programs[hoveredIndex].focus}</span>
                  <span>{GYM_DATA.programs[hoveredIndex].frequency}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full-Width Program Rows */}
          <div className="divide-y divide-white/10 border-b border-white/10">
            {GYM_DATA.programs.map((program, idx) => {
              const isHovered = hoveredIndex === idx;
              const isExpanded = expandedMobileIndex === idx;

              return (
                <div
                  key={program.id}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    soundFX.playHover();
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setExpandedMobileIndex(isExpanded ? null : idx);
                    soundFX.playImpact();
                  }}
                  className={`group relative transition-all duration-300 cursor-pointer ${
                    isHovered ? 'bg-[#141414]' : 'bg-transparent'
                  }`}
                >
                  {/* Desktop Row */}
                  <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-6">
                    <div className="flex items-start md:items-center gap-6 md:gap-12">
                      {/* Number with spring translation */}
                      <span
                        className={`font-['Bebas_Neue'] text-3xl md:text-5xl transition-all duration-300 ${
                          isHovered
                            ? 'text-[#C6FF00] translate-x-2'
                            : 'text-[#555555] group-hover:text-white'
                        }`}
                      >
                        {program.number}
                      </span>

                      <div>
                        {/* Title */}
                        <h3
                          className={`font-['Bebas_Neue'] text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase transition-all duration-300 ${
                            isHovered
                              ? 'text-white translate-x-3'
                              : 'text-[#E0E0E0] group-hover:text-white'
                          }`}
                        >
                          {program.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#888888] font-['Inter'] mt-1 max-w-xl">
                          {program.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="hidden sm:flex flex-col text-right font-mono text-xs">
                        <span className="text-[#C6FF00] font-bold flex items-center justify-end gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {program.frequency}
                        </span>
                        <span className="text-[#777777] flex items-center justify-end gap-1 mt-0.5">
                          <Target className="w-3.5 h-3.5" />
                          {program.focus}
                        </span>
                      </div>

                      {/* Mobile expand icon */}
                      <div className="md:hidden text-[#C6FF00]">
                        {isExpanded ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                      </div>

                      {/* Desktop CTA Arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFX.playImpact();
                          onSelectProgram(program);
                        }}
                        className={`hidden md:flex w-12 h-12 border items-center justify-center transition-all duration-300 ${
                          isHovered
                            ? 'border-[#C6FF00] bg-[#C6FF00] text-black translate-x-1 shadow-[0_0_15px_rgba(198,255,0,0.4)]'
                            : 'border-white/20 text-white'
                        }`}
                        title="Enroll in Program"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Lime Animated Accent Line on Bottom */}
                  <div
                    className={`h-[2px] bg-[#C6FF00] transition-all duration-500 ${
                      isHovered ? 'w-full' : 'w-0'
                    }`}
                  />

                  {/* Mobile Tap-Expanded Accordion Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden px-4 pb-6 overflow-hidden border-t border-white/5 bg-[#101010]"
                      >
                        <div className="aspect-video w-full overflow-hidden my-4 border border-white/10">
                          <img
                            src={program.image}
                            alt={program.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-[#B0B0B0] font-['Inter'] leading-relaxed mb-4">
                          {program.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {program.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] bg-white/10 text-[#C6FF00] px-2.5 py-1 uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            soundFX.playImpact();
                            onSelectProgram(program);
                          }}
                          className="w-full bg-[#C6FF00] text-black font-['Oswald'] font-bold text-sm tracking-wider py-3 uppercase text-center"
                        >
                          SELECT PROGRAM ENROLLMENT
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
