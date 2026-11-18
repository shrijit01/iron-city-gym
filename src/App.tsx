import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BarbellAssemblySection } from './components/BarbellAssemblySection';
import { UGCEntranceSection } from './components/UGCEntranceSection';
import { PhilosophySection } from './components/PhilosophySection';
import { GymGallerySection } from './components/GymGallerySection';
import { ProgramsSection } from './components/ProgramsSection';
import { StatsSection } from './components/StatsSection';
import { MembershipSection } from './components/MembershipSection';
import { MembershipModal } from './components/MembershipModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import type { ProgramItem } from './data/gymData';

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string>('performance');

  // Initialize Lenis Smooth Momentum Scrolling
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationId = requestAnimationFrame(raf);
    }

    animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
    };
  }, []);

  const handleOpenJoinModal = (tierId = 'performance') => {
    setSelectedTierId(tierId);
    setModalOpen(true);
  };

  const handleSelectProgram = (_program: ProgramItem) => {
    setSelectedTierId('performance');
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#C6FF00] selection:text-black font-['Inter']">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Global Navigation Header */}
      <Navbar onOpenJoinModal={handleOpenJoinModal} />

      {/* 1. Cinematic Hero Section */}
      <HeroSection onOpenJoinModal={() => handleOpenJoinModal('performance')} />

      {/* 2. Signature 3D Scroll Barbell Assembly ("FORGED, NOT FOUND.") */}
      <BarbellAssemblySection />

      {/* 2.5 UGC First-Person Gym Entrance Walk-in */}
      <UGCEntranceSection />

      {/* 3. The Training Philosophy Editorial Matrix */}
      <PhilosophySection />

      {/* 4. Explore The Gym Gallery */}
      <GymGallerySection />

      {/* 5. Training Programs Typographic Rows */}
      <ProgramsSection onSelectProgram={handleSelectProgram} />

      {/* 6. Performance Metrics & Stats Visualization */}
      <StatsSection />

      {/* 7. Membership Conversion Tiers */}
      <MembershipSection onSelectTier={handleOpenJoinModal} />

      {/* 8. Testimonials & Member Transformations */}
      <TestimonialsSection />

      {/* 9. Final CTA - The Iron City Moment */}
      <FinalCTASection onOpenJoinModal={() => handleOpenJoinModal('performance')} />

      {/* 10. Brutalist Facility Footer */}
      <Footer />

      {/* Interactive Functional Membership Modal */}
      <MembershipModal
        isOpen={modalOpen}
        selectedTierId={selectedTierId}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default App;
