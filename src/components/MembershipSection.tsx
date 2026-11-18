import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Flame, ArrowUpRight, Zap } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';
import { soundFX } from '../utils/soundEffects';

interface MembershipSectionProps {
  onSelectTier: (tierId: string) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="membership" className="relative w-full py-28 md:py-36 bg-[#080808] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
                TRANSPARENT VALUE // NO HIDDEN CANCELLATION TRAPS
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none">
              MEMBERSHIP TIERS
            </h2>
            <p className="font-['Oswald'] text-lg md:text-xl text-[#C6FF00] tracking-wide uppercase mt-2">
              "YOUR NEXT CHAPTER STARTS HERE."
            </p>
          </div>

          {/* Billing Cycle Switcher */}
          <div className="flex items-center gap-3 bg-[#141414] border border-white/10 p-1.5 self-start md:self-auto">
            <button
              onClick={() => {
                setBillingCycle('monthly');
                soundFX.playHover();
              }}
              className={`px-5 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black font-bold'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => {
                setBillingCycle('annual');
                soundFX.playHover();
              }}
              className={`px-5 py-2 text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all ${
                billingCycle === 'annual'
                  ? 'bg-[#C6FF00] text-black font-bold shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              <span>ANNUAL</span>
              <span className="text-[10px] bg-black text-[#C6FF00] px-1.5 py-0.5 font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {GYM_DATA.memberships.map((plan) => {
            const isFeatured = plan.isPopular;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#151515] border-2 border-[#C6FF00] shadow-[0_0_35px_rgba(198,255,0,0.15)]'
                    : 'bg-[#111111] border border-white/10 hover:border-white/30'
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C6FF00] text-black font-['Oswald'] font-bold text-xs uppercase px-4 py-1 tracking-widest flex items-center gap-1.5 shadow-[0_0_12px_#C6FF00]">
                    <Flame className="w-3.5 h-3.5" />
                    <span>ATHLETE BENCHMARK // MOST POPULAR</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="border-b border-white/10 pb-6 mb-6">
                    <span className="font-mono text-xs text-[#888888] uppercase tracking-widest block mb-1">
                      TIER 0{plan.id === 'basic' ? '1' : plan.id === 'performance' ? '2' : '3'}
                    </span>
                    <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#999999] font-['Inter'] mt-1 min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-['Bebas_Neue'] text-6xl text-white tracking-tight">
                      ${price}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-xs text-[#C6FF00] uppercase font-bold">
                        / MONTH
                      </span>
                      <span className="font-mono text-[10px] text-[#666666]">
                        {billingCycle === 'annual' ? 'BILLED ANNUALLY' : 'MONTH-TO-MONTH'}
                      </span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#CCCCCC]">
                        <div
                          className={`mt-0.5 p-0.5 rounded-none ${
                            isFeatured ? 'bg-[#C6FF00] text-black' : 'bg-white/10 text-white'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[#777777] mb-4 text-center">
                    {plan.duration}
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={() => {
                      soundFX.playImpact();
                      onSelectTier(plan.id);
                    }}
                    onMouseEnter={() => soundFX.playHover()}
                    className={`w-full py-4 font-['Oswald'] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                      isFeatured
                        ? 'bg-[#C6FF00] text-black hover:bg-white shadow-[0_0_20px_rgba(198,255,0,0.3)]'
                        : 'border border-white/20 text-white hover:border-[#C6FF00] hover:text-[#C6FF00]'
                    }`}
                  >
                    <span>CLAIM THIS TIER</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Corporate & Drop-In Inquiries Notice */}
        <div className="mt-16 bg-[#141414] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-[#C6FF00]" />
            <div>
              <span className="text-white font-['Oswald'] text-base tracking-wider uppercase block">
                TRAVELLING LIFTER OR POWERLIFTING SQUAD?
              </span>
              <span className="text-xs text-[#888888] font-['Inter']">
                Single session drop-in passes ($25) and team training reservations available upon request.
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelectTier('performance')}
            className="whitespace-nowrap font-mono text-xs text-[#C6FF00] border-b border-[#C6FF00] pb-0.5 hover:text-white transition-colors"
          >
            REQUEST SQUAD / DAY PASS &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
