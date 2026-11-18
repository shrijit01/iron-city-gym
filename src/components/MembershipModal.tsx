import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GYM_DATA } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

interface MembershipModalProps {
  isOpen: boolean;
  selectedTierId?: string;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  selectedTierId = 'performance',
  onClose,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(selectedTierId);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync tier when prop changes
  React.useEffect(() => {
    if (selectedTierId) {
      setSelectedTier(selectedTierId);
    }
  }, [selectedTierId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playImpact();

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6FF00', '#ffffff', '#222222'],
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  const currentPlan = GYM_DATA.memberships.find((m) => m.id === selectedTier) || GYM_DATA.memberships[1];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#121212] border-2 border-white/15 p-6 sm:p-8 z-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Brutalist Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6FF00]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#888888] hover:text-[#C6FF00] p-1.5 transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#C6FF00]" />
                <span className="text-xs font-mono tracking-widest text-[#C6FF00] uppercase font-bold">
                  OFFICIAL ENROLLMENT DOSSIER
                </span>
              </div>

              <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide uppercase mb-1">
                JOIN IRON CITY GYM
              </h3>
              <p className="text-xs sm:text-sm text-[#999999] font-['Inter'] mb-6">
                Complete your athlete registration below to secure priority biometric keycard access.
              </p>

              {/* Tier Selection Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {GYM_DATA.memberships.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.id);
                      soundFX.playHover();
                    }}
                    className={`p-3 border text-left flex flex-col justify-between transition-all ${
                      selectedTier === tier.id
                        ? 'border-[#C6FF00] bg-[#C6FF00]/10 text-white shadow-[0_0_15px_rgba(198,255,0,0.2)]'
                        : 'border-white/10 bg-[#161616] text-[#888888] hover:border-white/30'
                    }`}
                  >
                    <span className="font-['Oswald'] text-xs font-bold uppercase tracking-wider block">
                      {tier.name}
                    </span>
                    <span className="font-['Bebas_Neue'] text-xl text-white mt-1">
                      ${tier.monthlyPrice}<span className="text-xs font-mono text-[#888888]">/mo</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Plan Summary Banner */}
              <div className="bg-[#181818] border border-white/5 p-4 mb-6 flex items-center justify-between text-xs">
                <div>
                  <span className="text-white font-bold block">{currentPlan.name} MEMBERSHIP</span>
                  <span className="text-[#888888]">{currentPlan.duration}</span>
                </div>
                <span className="font-['Oswald'] text-lg font-bold text-[#C6FF00]">
                  ${currentPlan.monthlyPrice} / MONTH
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#A0A0A0] uppercase tracking-wider mb-1">
                    Athlete Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#181818] border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#A0A0A0] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="athlete@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#181818] border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A0A0A0] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181818] border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A0A0A0] uppercase tracking-wider mb-1">
                    Target Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#181818] border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C6FF00] transition-colors font-mono"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full bg-[#C6FF00] text-black font-['Oswald'] font-bold text-base tracking-widest py-4 uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(198,255,0,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>CONFIRM MEMBERSHIP & INITIATE KEYCARD</span>
                    <Sparkles className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#666666]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6FF00]" />
                    <span>ZERO ACTIVATION FEES • 14-DAY RISK-FREE SATISFACTION GUARANTEE</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#C6FF00] text-black flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_#C6FF00]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <span className="text-xs font-mono tracking-widest text-[#C6FF00] uppercase font-bold block mb-2">
                APPLICATION ACCEPTED // ATHLETE VERIFIED
              </span>

              <h3 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide uppercase mb-3">
                WELCOME TO THE PLATFORM
              </h3>

              <p className="text-sm text-[#CCCCCC] font-['Inter'] max-w-md mx-auto leading-relaxed mb-6">
                Welcome, <strong className="text-white">{fullName}</strong>. Your membership for{' '}
                <strong className="text-[#C6FF00]">{currentPlan.name}</strong> is pre-registered.
                A confirmation dossier and digital keycard setup link have been dispatched to{' '}
                <span className="text-white font-mono">{email}</span>.
              </p>

              <div className="bg-[#181818] border border-white/10 p-4 max-w-md mx-auto mb-8 font-mono text-xs text-left text-[#A0A0A0] space-y-1">
                <div>// ATHLETE ID: IC-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div>// STATUS: CLEARED FOR PLATFORM ENTRY</div>
                <div>// ORIENTATION TIME: 08:00 AM ON {startDate}</div>
              </div>

              <button
                onClick={handleReset}
                className="bg-white text-black font-['Oswald'] font-bold text-sm tracking-wider px-8 py-3 uppercase hover:bg-[#C6FF00] transition-colors"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
