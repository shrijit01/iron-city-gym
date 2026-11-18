import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Flame, Play } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

interface HeroSectionProps {
  onOpenJoinModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenJoinModal }) => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 180]);
  const opacityText = useTransform(scrollY, [0, 450], [1, 0.1]);
  const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.15]);

  // Floating chalk dust simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    // Chalk dust particles
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2, // Drifting upwards like chalk dust
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(198, 255, 0, 0.3)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headlineWords = [
    { text: GYM_DATA.hero.headlineLine1, delay: 0.15 },
    { text: GYM_DATA.hero.headlineLine2, delay: 0.3 },
    { text: GYM_DATA.hero.headlineLine3, delay: 0.45 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Background Video Layer with Parallax Scale */}
      <motion.div
        style={{ scale: scaleVideo }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={GYM_DATA.hero.videoFallbackPoster}
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.2] grayscale-[35%]"
        >
          <source src={GYM_DATA.hero.videoUrl} type="video/mp4" />
          {/* Fallback image */}
          <img
            src={GYM_DATA.hero.videoFallbackPoster}
            alt="Iron City Athlete Lifting Heavy Barbell"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Cinematic Overlays: Industrial Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-transparent to-[#080808]/80" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
      </motion.div>

      {/* Chalk Dust Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Main Hero Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20 pb-16"
      >
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2.5 h-2.5 bg-[#C6FF00] rounded-none rotate-45 inline-block shadow-[0_0_8px_#C6FF00]" />
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-[#C6FF00] uppercase font-bold">
              {GYM_DATA.hero.eyebrow}
            </span>
          </motion.div>

          {/* Massive Stacked Brutalist Headline */}
          <div className="overflow-hidden mb-6">
            {headlineWords.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ y: '100%', rotate: 2 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{
                  duration: 0.85,
                  delay: item.delay,
                  ease: [0.16, 1, 0.3, 1], // Smooth cinematic cubic bezier
                }}
                className="overflow-hidden"
              >
                <h1 className="font-['Bebas_Neue'] text-[18vw] sm:text-[15vw] lg:text-[11vw] leading-[0.88] tracking-tight uppercase text-white hover:text-[#C6FF00] transition-colors duration-300 select-none drop-shadow-2xl">
                  {item.text}
                </h1>
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-base sm:text-lg md:text-xl text-[#B8B8B8] max-w-xl font-['Inter'] font-light leading-relaxed mb-8 md:mb-10"
          >
            "{GYM_DATA.hero.subtitle}"
          </motion.p>

          {/* CTA Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary CTA */}
            <button
              onClick={() => {
                soundFX.playImpact();
                onOpenJoinModal();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="group relative inline-flex items-center gap-3 bg-[#C6FF00] text-black font-['Oswald'] font-bold text-sm sm:text-base tracking-widest px-8 py-4 uppercase overflow-hidden shadow-[0_0_25px_rgba(198,255,0,0.3)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_35px_rgba(198,255,0,0.5)]"
            >
              <Flame className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
              <span>JOIN THE MOVEMENT</span>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black translate-y-[3px] group-hover:translate-y-0 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <a
              href="#equipment-assembly"
              onMouseEnter={() => soundFX.playHover()}
              className="group inline-flex items-center gap-2 border border-white/20 bg-black/40 backdrop-blur-sm text-white font-['Oswald'] tracking-widest text-sm sm:text-base px-7 py-4 uppercase transition-all duration-300 hover:border-[#C6FF00] hover:text-[#C6FF00] hover:bg-black/60"
            >
              <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
              <span>EXPLORE THE GYM</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Atmospheric Specs Banner on Desktop Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden xl:flex absolute bottom-12 right-12 z-20 flex-col items-end text-right font-mono text-xs text-[#777777] border-r-2 border-[#C6FF00] pr-4"
      >
        <span className="text-[#C6FF00] font-bold">CALIBRATED STEEL ONLY</span>
        <span>LAT: 40.4406° N / LON: 79.9959° W</span>
        <span>ELEVATION: 1,220 FT • INDUSTRIAL ZONE</span>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#equipment-assembly"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#888888] hover:text-[#C6FF00] transition-colors"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">SCROLL TO FORGE</span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-full h-1/2 bg-[#C6FF00]"
          />
        </div>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
};
