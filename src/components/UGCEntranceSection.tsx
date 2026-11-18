import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Smartphone, Monitor, ShieldCheck, Radio, Flame, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const UGCEntranceSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPhoneView, setIsPhoneView] = useState(false);
  const [hasScannedKeycard, setHasScannedKeycard] = useState(false);
  const [keycardScanning, setKeycardScanning] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    soundFX.playHover();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    soundFX.playHover();
  };

  const handleScanKeycard = () => {
    if (hasScannedKeycard) return;
    setKeycardScanning(true);
    soundFX.playHover();

    setTimeout(() => {
      soundFX.playMetallicSnap();
      soundFX.playImpact();
      setKeycardScanning(false);
      setHasScannedKeycard(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 900);
  };

  return (
    <section id="ugc-entrance" className="relative w-full py-28 md:py-36 bg-[#080808] border-t border-white/10 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Bebas_Neue'] text-[24vw] text-white/[0.015] pointer-events-none select-none whitespace-nowrap">
        FIRST-PERSON SANCTUARY
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-[#C6FF00] animate-pulse" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
                USER GENERATED FOOTAGE // UNCUT ATHLETE POV
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none">
              WALKING INTO IRON CITY
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0] font-['Inter'] max-w-xl mt-2">
              Unfiltered first-person perspective. Swipe your digital keycard, push through the double industrial steel doors, and feel the raw energy of the training arena.
            </p>
          </div>

          {/* Viewport Format Switcher */}
          <div className="flex items-center gap-2 bg-[#141414] border border-white/10 p-1.5 self-start md:self-auto">
            <button
              onClick={() => {
                setIsPhoneView(false);
                soundFX.playHover();
              }}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                !isPhoneView ? 'bg-[#C6FF00] text-black font-bold' : 'text-[#888888] hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>WIDESCREEN POV</span>
            </button>
            <button
              onClick={() => {
                setIsPhoneView(true);
                soundFX.playHover();
              }}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                isPhoneView ? 'bg-[#C6FF00] text-black font-bold' : 'text-[#888888] hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>MOBILE REEL POV</span>
            </button>
          </div>
        </div>

        {/* Interactive UGC Player Stage */}
        <div className="relative flex justify-center items-center">
          <div
            className={`relative transition-all duration-700 overflow-hidden border-2 border-white/15 bg-black shadow-[0_20px_80px_rgba(0,0,0,0.95)] ${
              isPhoneView
                ? 'w-full max-w-[380px] aspect-[9/16] rounded-3xl border-[#C6FF00]/40'
                : 'w-full aspect-[16/9] max-h-[720px]'
            }`}
          >
            {/* The Actual Video */}
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
              className="w-full h-full object-cover filter contrast-[1.15] brightness-[0.9]"
            >
              <source src="https://cdn.coverr.co/videos/coverr-sports-equipment-in-a-gym-7635/1080p.mp4" type="video/mp4" />
              <source src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-42635-large.mp4" type="video/mp4" />
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
                alt="Gym Entrance Walk-in"
                className="w-full h-full object-cover"
              />
            </video>

            {/* Subtle Vignette & Grain */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

            {/* UGC Camera HUD / REC Indicator */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10 font-mono text-[11px] text-white">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span className="font-bold tracking-wider">REC // UGC ATHLETE CAM</span>
                <span className="text-[#C6FF00] ml-2">4K 60FPS</span>
              </div>

              <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10 font-mono text-[11px] text-[#A0A0A0]">
                <span>ISO 800 • 1/120s • f/1.8</span>
              </div>
            </div>

            {/* Interactive Biometric Keycard Gate Overlay (Appears until scanned) */}
            <AnimatePresence>
              {!hasScannedKeycard && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-20 h-28 bg-[#181818] border-2 border-[#C6FF00] p-2 flex flex-col justify-between mb-6 shadow-[0_0_30px_rgba(198,255,0,0.3)] relative cursor-pointer"
                    onClick={handleScanKeycard}
                  >
                    <div className="flex justify-between items-center text-[8px] font-mono text-[#C6FF00]">
                      <span>IRON CITY</span>
                      <span>NFC</span>
                    </div>
                    <div className="w-6 h-5 bg-[#C6FF00] mx-auto rounded-none flex items-center justify-center font-bold text-black text-[9px]">
                      IC
                    </div>
                    <div className="text-[7px] font-mono text-[#888888] text-center">
                      KEYCARD 482-A
                    </div>

                    {keycardScanning && (
                      <div className="absolute inset-0 bg-[#C6FF00]/30 animate-pulse flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-[#C6FF00]" />
                      </div>
                    )}
                  </motion.div>

                  <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wider uppercase mb-1">
                    ACCESS RESTRICTED // BIOMETRIC LOCK
                  </h3>
                  <p className="text-xs text-[#A0A0A0] max-w-sm font-['Inter'] mb-6">
                    Tap the athlete keycard below to disengage the industrial magnetic locks and step onto the floor.
                  </p>

                  <button
                    onClick={handleScanKeycard}
                    disabled={keycardScanning}
                    className="bg-[#C6FF00] text-black font-['Oswald'] font-bold text-sm tracking-widest px-8 py-3.5 uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(198,255,0,0.4)] flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{keycardScanning ? 'SCANNING NFC...' : 'TAP KEYCARD TO ENTER'}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live Telemetry Overlay at Bottom */}
            <div className="absolute bottom-16 left-4 right-4 z-20 pointer-events-none">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/80 backdrop-blur-md border border-white/10 p-3 font-mono text-[10px]">
                <div>
                  <span className="text-[#888888] block">FLOOR POPULATION:</span>
                  <span className="text-[#C6FF00] font-bold">42 ACTIVE ATHLETES</span>
                </div>
                <div>
                  <span className="text-[#888888] block">ACOUSTIC PRESSURE:</span>
                  <span className="text-white font-bold">92.4 dB (HARD ROCK)</span>
                </div>
                <div>
                  <span className="text-[#888888] block">AIR CALIBRATION:</span>
                  <span className="text-white font-bold">68°F • CHALK AIR</span>
                </div>
                <div>
                  <span className="text-[#888888] block">PLATFORM 01:</span>
                  <span className="text-[#C6FF00] font-bold">585 LB PULL IN PROGRESS</span>
                </div>
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-[#C6FF00] hover:border-[#C6FF00] flex items-center justify-center transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-[#C6FF00] hover:border-[#C6FF00] flex items-center justify-center transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-xs font-mono text-white/80 hidden sm:inline">
                  {isMuted ? 'AUDIO MUTED (CLICK TO UNMUTE)' : 'LIVE ARENA AUDIO ACTIVE'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-[#C6FF00] text-black px-3 py-1 font-['Oswald'] text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>UNFILTERED ATMOSPHERE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
