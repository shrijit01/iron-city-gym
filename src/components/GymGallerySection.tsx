import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Expand, Compass } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';
import type { GalleryItem } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

export const GymGallerySection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -450, behavior: 'smooth' });
      soundFX.playHover();
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 450, behavior: 'smooth' });
      soundFX.playHover();
    }
  };

  return (
    <section id="the-gym" className="relative w-full py-28 bg-[#0a0a0a] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#C6FF00]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
                15,000 SQ FT FACILITY
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none">
              EXPLORE THE GYM
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#777777] hidden sm:inline">
              // DRAG OR SCROLL HORIZONTALLY
            </span>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 border border-white/20 bg-[#151515] flex items-center justify-center text-white hover:text-black hover:bg-[#C6FF00] hover:border-[#C6FF00] transition-all"
                aria-label="Scroll gallery left"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 border border-white/20 bg-[#151515] flex items-center justify-center text-white hover:text-black hover:bg-[#C6FF00] hover:border-[#C6FF00] transition-all"
                aria-label="Scroll gallery right"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-12 pb-8 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {GYM_DATA.gallery.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              soundFX.playImpact();
            }}
            className="group relative flex-shrink-0 w-[300px] sm:w-[420px] md:w-[480px] h-[520px] bg-[#141414] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#C6FF00]"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.2] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />
            </div>

            {/* Top metadata pill */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="font-mono text-[10px] bg-black/70 backdrop-blur-md text-[#C6FF00] px-3 py-1 border border-white/10 tracking-widest uppercase font-bold">
                {item.category}
              </span>
              <span className="font-mono text-xs text-white/70">
                0{idx + 1} / 0{GYM_DATA.gallery.length}
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-transparent flex flex-col justify-end">
              <span className="font-mono text-[10px] text-[#A0A0A0] tracking-wider uppercase mb-1">
                {item.specs}
              </span>
              <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide uppercase leading-none group-hover:text-[#C6FF00] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#999999] font-['Inter'] line-clamp-2 mt-2 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#C6FF00] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>VIEW SPECS & DETAILS</span>
                <Expand className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Lime corner highlight */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-2 border-r-2 border-transparent group-hover:border-[#C6FF00] transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox / Modal for Detailed Zone Inspection */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121212] border border-[#C6FF00]/50 max-w-3xl w-full overflow-hidden shadow-2xl relative"
          >
            <div className="relative aspect-video w-full">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/80 text-white hover:text-[#C6FF00] p-2 border border-white/20 font-mono text-xs uppercase"
              >
                [ESC / CLOSE]
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-[#C6FF00] text-xs font-mono font-bold tracking-widest uppercase mb-1">
                <span>{selectedItem.category}</span>
                <span>•</span>
                <span>{selectedItem.specs}</span>
              </div>
              <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide uppercase mb-3">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-[#CCCCCC] font-['Inter'] leading-relaxed mb-6">
                {selectedItem.description} Built to withstand the world's heaviest training loads. Our equipment is sanitized hourly and recalibrated on a strict weekly cycle.
              </p>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-[#C6FF00] text-black font-['Oswald'] font-bold text-sm tracking-wider px-6 py-2.5 uppercase hover:bg-white transition-colors"
              >
                RETURN TO TOUR
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
