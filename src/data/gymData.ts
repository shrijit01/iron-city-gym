export interface ProgramItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  frequency: string;
  focus: string;
  image: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string;
  image: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  features: string[];
  duration: string;
  accentColor?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  achievement: string;
  image: string;
}

export const GYM_DATA = {
  brand: {
    name: "IRON CITY GYM",
    tagline: "BUILT UNDER PRESSURE",
    subheading: "Strength isn't given. It's earned.",
    location: "482 INDUSTRIAL PARKWAY, SECTOR 7",
    hours: "24/7 ACCESS FOR KEYCARD MEMBERS • STAFFED 06:00 - 22:00",
    phone: "+1 (800) 555-IRON",
    email: "contact@ironcitygym.com",
    instagram: "@ironcitygym",
  },

  hero: {
    eyebrow: "IRON CITY GYM / BUILT THROUGH DISCIPLINE",
    headlineLine1: "BUILT",
    headlineLine2: "UNDER",
    headlineLine3: "PRESSURE.",
    subtitle: "Strength isn't given. It's earned through repetition, grit, and the cold weight of the iron.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-42635-large.mp4",
    videoFallbackPoster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
  },

  assembly: {
    eyebrow: "PRECISION CRAFTED GEAR",
    title: "FORGED, NOT FOUND.",
    subtitle: "Every component is calibrated for maximum tensile strength, knurled grip friction, and competition tolerances.",
    closingHeadline: "EVERY REP BUILDS YOU.",
    closingSubtext: "When you step onto the platform, excuses vanish. The bar holds no illusions.",
    specs: [
      { label: "Shaft Tensile", value: "215,000 PSI" },
      { label: "Whip Response", value: "Dynamic Dual-Bushing" },
      { label: "Knurling", value: "Volcano Aggressive 1.2mm" },
      { label: "Tolerance", value: "±10 Gram Competition Spec" },
    ]
  },

  philosophy: [
    {
      number: "001",
      title: "DISCIPLINE",
      statement: "NO SHORTCUTS.",
      body: "Motivation is temporary dopamine. Discipline is an unbreakable commitment to show up when fatigue, doubt, and circumstances beg you to quit.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
    },
    {
      number: "002",
      title: "CONSISTENCY",
      statement: "NO EXCUSES.",
      body: "The iron does not negotiate. It weighs the exact same on your best day and your worst day. Daily unglamorous execution builds champions.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      number: "003",
      title: "PROGRESS",
      statement: "JUST WORK.",
      body: "We obsess over micro-increments: one more kilo on the bar, one more second under tension, one more barrier broken in your mind.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  gallery: [
    {
      id: "strength-zone",
      title: "OLYMPIC PLATFORMS & RACKS",
      category: "STRENGTH ZONE",
      description: "Custom Eleiko and Rogue calibrated racks bolted into vibration-damped bamboo oak platforms.",
      specs: "24 Monolift & Half-Rack Stations",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "free-weights",
      title: "CAST IRON ARSENAL",
      category: "FREE WEIGHTS",
      description: "Custom milled urethane and raw cast iron dumbbells running from 5 lbs up to 200 lbs.",
      specs: "Dumbbells to 200 lbs • Steel Bumper Sets",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "functional-turf",
      title: "TACTICAL SPRINT & PROWLER TURF",
      category: "FUNCTIONAL ZONE",
      description: "60-yard indoor heavy-friction turf designed for sled pulls, farmer carries, and plyometric drills.",
      specs: "60-Yard Strip • Dual Prowler Lanes",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "cardio-deck",
      title: "HIGH-OUTPUT CONDITIONING",
      category: "METABOLIC LAB",
      description: "Concept2 rowers, SkiErgs, assault bikes, and curved motorless treadmills calibrated for VO2 max testing.",
      specs: "Concept2 Fleet • Woodway Curves",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "recovery-lounge",
      title: "CRYOTHERAPY & INFRARED SUITE",
      category: "RESTORATION",
      description: "Scandinavian dry cedar saunas, 42°F cold plunge tubs, and Normatec pneumatic compression stations.",
      specs: "Twin Ice Plunges • 190°F Finnish Sauna",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  programs: [
    {
      id: "p1",
      number: "01",
      title: "STRENGTH & CONDITIONING",
      subtitle: "Barbell mastery, CNS overload, and peak kinetic force output.",
      description: "Periodized compound lifting protocols combined with high-lactate metabolic finishers for unbreakable stamina.",
      frequency: "4-5 Days / Week",
      focus: "Squat, Bench, Deadlift, Clean & Jerk",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      tags: ["Powerlifting", "Strongman", "Barbell Dynamics"],
    },
    {
      id: "p2",
      number: "02",
      title: "MUSCLE BUILDING",
      subtitle: "Hypertrophy science, mechanical tension, and metabolic stress.",
      description: "Engineered muscle-building volume cycles targeting structural symmetry, tendon density, and full muscle bellies.",
      frequency: "5-6 Days / Week",
      focus: "Hypertrophy, Time-Under-Tension, Density",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
      tags: ["Hypertrophy", "Bodybuilding", "Metabolic Tension"],
    },
    {
      id: "p3",
      number: "03",
      title: "FAT LOSS & FITNESS",
      subtitle: "Metabolic conditioning, heart rate zones, and body recomposition.",
      description: "High-density functional intervals that incinerate visceral fat while shielding lean contractile muscle mass.",
      frequency: "3-4 Days / Week",
      focus: "VO2 Max, EPOC Burn, Functional Agility",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop",
      tags: ["High Intensity", "Conditioning", "Agility"],
    },
    {
      id: "p4",
      number: "04",
      title: "PERSONAL TRAINING",
      subtitle: "Dedicated elite coach, biometric tracking, tailored programming.",
      description: "One-on-one kinematic movement analysis, custom nutrition roadmap, and individualized strength progressions.",
      frequency: "Custom Schedules",
      focus: "1-on-1 Mentorship, Biomechanical Analysis",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
      tags: ["Bespoke Coaching", "Kinematics", "Nutrition"],
    },
    {
      id: "p5",
      number: "05",
      title: "FUNCTIONAL TRAINING",
      subtitle: "Multi-planar movement, kettlebells, sandbags, and raw athleticism.",
      description: "Train like a combat athlete: rotative power, unilateral stability, carry mechanics, and explosive durability.",
      frequency: "3-5 Days / Week",
      focus: "Grip, Rotational Core, Unilateral Strength",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      tags: ["Kettlebells", "Turf Sleds", "Athletic Power"],
    },
  ],

  stats: [
    { value: 2400, prefix: "", suffix: "+", label: "ACTIVE ATHLETES", desc: "Disciplined members training daily" },
    { value: 15000, prefix: "", suffix: " SQ FT", label: "TRAINING FLOOR", desc: "Industrial brutalist open arena" },
    { value: 48, prefix: "", suffix: "+", label: "OLYMPIC RACKS", desc: "Calibrated steel platforms & bars" },
    { value: 24, prefix: "", suffix: " / 7", label: "UNRESTRICTED ACCESS", desc: "Biometric keycard security round-the-clock" },
  ],

  memberships: [
    {
      id: "basic",
      name: "BASIC IRON",
      tagline: "Essential access for the committed lifter.",
      monthlyPrice: 69,
      annualPrice: 55,
      features: [
        "Full access to main training arena & free weights",
        "Locker room & private shower suites",
        "Iron City companion app & workout logger",
        "Standard hours access (05:00 - 23:00)",
        "Equipment sanitization & towel service",
      ],
      duration: "No lock-in contracts • Cancel anytime",
    },
    {
      id: "performance",
      name: "PERFORMANCE",
      tagline: "Our benchmark plan for serious athletes.",
      monthlyPrice: 119,
      annualPrice: 95,
      isPopular: true,
      features: [
        "24/7 Unlimited biometric access to all zones",
        "All Olympic lifting platforms & specialty bars",
        "Dry cedar Finnish sauna & cold plunge suite",
        "Bi-weekly coach check-in & movement assessment",
        "2 guest passes per month",
        "15% discount at Iron City Pro Shop",
      ],
      duration: "Monthly flexible or 12-month annual rate",
    },
    {
      id: "elite",
      name: "ELITE BLACK",
      tagline: "Uncompromising access, recovery, and programming.",
      monthlyPrice: 189,
      annualPrice: 149,
      features: [
        "All Performance tier inclusions",
        "1-on-1 monthly custom strength periodization plan",
        "Unlimited Normatec compression & infrared sauna",
        "Dedicated VIP locker with laundry service",
        "Exclusive access to Black Floor competition rigs",
        "Priority registration for powerlifting meets & seminars",
      ],
      duration: "VIP member concierge tier",
    },
  ],

  testimonials: [
    {
      id: "t1",
      quote: "Iron City isn't a spa with dumbbells. It is a cathedral of discipline. In 14 months here, my squat went from 315 to 495 lbs because nobody lets you make excuses.",
      author: "MARCUS VANCE",
      role: "Competitive Powerlifter",
      achievement: "495 LB Squat • 14 Months Member",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "t2",
      quote: "The atmosphere here hits you the second the bass shakes the floor. Clean steel, serious lifters, zero influencers hogging equipment. It's the purest gym in the city.",
      author: "ELENA ROSTOVA",
      role: "Cross-Training Athlete",
      achievement: "Top 5 Regional Cross-Fit Finals",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "t3",
      quote: "I dropped 38 lbs of fat and put on 14 lbs of dense muscle. The coaches here don't sell gimmicks; they teach mechanical leverage, nutrition, and mental grit.",
      author: "DAVID STERLING",
      role: "Executive & Master Lifter",
      achievement: "Body Recomposition • 2 Years Member",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    },
  ],
};
