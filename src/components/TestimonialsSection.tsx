import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevStory = () => {
    soundFX.playHover();
    setCurrentIndex((prev) => (prev === 0 ? GYM_DATA.testimonials.length - 1 : prev - 1));
  };

  const nextStory = () => {
    soundFX.playHover();
    setCurrentIndex((prev) => (prev === GYM_DATA.testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = GYM_DATA.testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative w-full py-28 md:py-36 bg-[#0a0a0a] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Quote className="w-4 h-4 text-[#C6FF00]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
                PROVEN TRANSFORMATION // ATHLETE STORIES
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none">
              TESTED UNDER LOAD
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <span className="font-mono text-xs text-[#777777] mr-4">
              0{currentIndex + 1} / 0{GYM_DATA.testimonials.length}
            </span>
            <button
              onClick={prevStory}
              className="w-12 h-12 border border-white/20 bg-[#151515] flex items-center justify-center text-white hover:text-black hover:bg-[#C6FF00] hover:border-[#C6FF00] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextStory}
              className="w-12 h-12 border border-white/20 bg-[#151515] flex items-center justify-center text-white hover:text-black hover:bg-[#C6FF00] hover:border-[#C6FF00] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Big Editorial Quote Presentation */}
        <div className="relative min-h-[380px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full"
            >
              {/* Pull Quote */}
              <div className="lg:col-span-8">
                <Quote className="w-12 h-12 text-[#C6FF00]/40 mb-6" />
                <blockquote className="font-['Oswald'] text-2xl sm:text-3xl md:text-4xl text-white font-normal uppercase leading-snug tracking-wide">
                  "{current.quote}"
                </blockquote>

                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <div>
                    <h4 className="font-['Bebas_Neue'] text-3xl text-white tracking-wider leading-none">
                      {current.author}
                    </h4>
                    <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
                      {current.role}
                    </span>
                  </div>

                  <div className="ml-auto hidden sm:flex items-center gap-2 bg-[#151515] border border-[#C6FF00]/30 px-3.5 py-1.5 font-mono text-xs text-[#C6FF00]">
                    <Award className="w-4 h-4" />
                    <span>{current.achievement}</span>
                  </div>
                </div>
              </div>

              {/* Athlete Portrait Stage */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 bg-[#161616] border border-white/15 overflow-hidden shadow-2xl">
                  <img
                    src={current.image}
                    alt={current.author}
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.2] grayscale-[30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-white/80 bg-black/70 backdrop-blur-sm p-2 border border-white/10">
                    <span className="text-[#C6FF00] font-bold block">// VERIFIED LIFTER</span>
                    {current.achievement}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
