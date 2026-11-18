import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, CheckCircle2, Rotate3d, Crosshair, Sparkles, ArrowDown } from 'lucide-react';
import { GymTextureGenerator } from '../utils/textureGenerator';
import { soundFX } from '../utils/soundEffects';

interface ComponentCallout {
  id: string;
  tag: string;
  name: string;
  spec: string;
  xPercent: number;
  yPercent: number;
}

const CALLOUTS: ComponentCallout[] = [
  { id: 'shaft', tag: '01', name: '215,000 PSI SPRING STEEL CORE', spec: 'Volcano Diamond Knurl • Dual Grip Marks', xPercent: 50, yPercent: 44 },
  { id: 'bearings', tag: '02', name: '5-ROW NEEDLE ROLLER BEARINGS', spec: 'Low-Friction Precision Whip Rotation', xPercent: 32, yPercent: 36 },
  { id: 'bushing', tag: '03', name: 'PHOSPHOR BRONZE RETENTION BUSHING', spec: 'Self-Lubricating Industrial Alloy', xPercent: 38, yPercent: 62 },
  { id: 'plates', tag: '04', name: 'CALIBRATED VULCANIZED BUMPERS', spec: 'IPF Spec ±10g • Steel Hub Core', xPercent: 20, yPercent: 48 },
  { id: 'collar', tag: '05', name: 'CNC BILLET 6061-T6 COLLAR', spec: 'Quick-Release Cam Latch Lock', xPercent: 12, yPercent: 35 },
];

export const BarbellAssemblySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCallout, setActiveCallout] = useState<ComponentCallout | null>(null);
  const soundTriggered = useRef({ half: false, snap: false });
  const targetProgressRef = useRef(0);

  // Scroll listener for smooth scrubbing
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
      setScrollProgress(progress);
      targetProgressRef.current = progress;

      // Audio feedback during scrub
      if (progress > 0.45 && !soundTriggered.current.half) {
        soundFX.playMetallicChime(620, 0.12);
        soundTriggered.current.half = true;
      } else if (progress < 0.4) {
        soundTriggered.current.half = false;
      }

      if (progress > 0.85 && !soundTriggered.current.snap) {
        soundFX.playMetallicSnap();
        soundTriggered.current.snap = true;
      } else if (progress < 0.8) {
        soundTriggered.current.snap = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js Photorealistic 3D Exploded-to-Assembled Scene
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // 1. Scene & Depth
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Deep Zenith Black
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. High-End Studio Lighting (similar to the Zenith exploded headphone setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Overhead Key Spotlight
    const keySpot = new THREE.SpotLight(0xffffff, 4.5);
    keySpot.position.set(2, 9, 5);
    keySpot.angle = Math.PI / 3.5;
    keySpot.penumbra = 0.7;
    scene.add(keySpot);

    // High-Contrast Cool Rim Backlight (highlights metallic edges in the dark)
    const rimLight1 = new THREE.DirectionalLight(0xddeeff, 3.2);
    rimLight1.position.set(-6, 3, -4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xffffff, 2.8);
    rimLight2.position.set(6, -2, -3);
    scene.add(rimLight2);

    // Subtle Electric Lime Specular Glow
    const limeAccent = new THREE.PointLight(0xc6ff00, 2.5, 12);
    limeAccent.position.set(0, -3.5, 3);
    scene.add(limeAccent);

    // 3. Procedural Photorealistic Materials
    const knurlTex = GymTextureGenerator.createKnurlingTexture();
    const brushedTex = GymTextureGenerator.createBrushedSteelTexture();
    const plateFaceTex = GymTextureGenerator.createPlateFaceTexture('20 KG');
    const plateFaceTex25 = GymTextureGenerator.createPlateFaceTexture('10 KG');

    // Hard-Chrome Polished Steel (Shaft center)
    const hardChromeMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.96,
      roughness: 0.16,
    });

    // Diamond Knurling Material with micro-bump depth
    const knurledGripMat = new THREE.MeshStandardMaterial({
      color: 0x999999,
      metalness: 0.88,
      roughness: 0.42,
      bumpMap: knurlTex,
      bumpScale: 0.04,
    });

    // Sleeve Brushed Steel
    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.92,
      roughness: 0.22,
      roughnessMap: brushedTex,
    });

    // Machined Phosphor Bronze Bushing (realistic copper-bronze alloy)
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xcd7f32,
      metalness: 0.92,
      roughness: 0.28,
    });

    // Needle Roller Steel (ultra shiny chrome needles)
    const needleRollerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.08,
    });

    // Needle Bearing Ring Cage (dark manganese steel)
    const bearingCageMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.85,
      roughness: 0.35,
    });

    // Vulcanized Rubber Bumper Plate
    const bumperRubberMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      metalness: 0.15,
      roughness: 0.65,
    });

    const plateDecalMat = new THREE.MeshStandardMaterial({
      map: plateFaceTex,
      metalness: 0.3,
      roughness: 0.5,
    });

    const plateDecalMat25 = new THREE.MeshStandardMaterial({
      map: plateFaceTex25,
      metalness: 0.3,
      roughness: 0.5,
    });

    const plateSteelHubMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.95,
      roughness: 0.18,
    });

    // CNC Billet Aluminum Collar (anodized black + lime cam lever)
    const collarBilletMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      metalness: 0.9,
      roughness: 0.25,
    });

    const collarLeverMat = new THREE.MeshStandardMaterial({
      color: 0xc6ff00,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0xc6ff00,
      emissiveIntensity: 0.35,
    });

    // 4. Barbell Master Hierarchy Group
    const masterBarbell = new THREE.Group();
    scene.add(masterBarbell);

    // --- SHAFT ---
    const shaftLength = 5.0;
    const shaftRadius = 0.075;
    const shaftGeom = new THREE.CylinderGeometry(shaftRadius, shaftRadius, shaftLength, 32);
    const shaftMesh = new THREE.Mesh(shaftGeom, hardChromeMat);
    shaftMesh.rotation.z = Math.PI / 2;
    masterBarbell.add(shaftMesh);

    // Knurling Grip Bands (Left, Right, Center)
    const createKnurlBand = (length: number, xPos: number) => {
      const geom = new THREE.CylinderGeometry(shaftRadius * 1.015, shaftRadius * 1.015, length, 32);
      const mesh = new THREE.Mesh(geom, knurledGripMat);
      mesh.rotation.z = Math.PI / 2;
      mesh.position.x = xPos;
      masterBarbell.add(mesh);
      return mesh;
    };
    createKnurlBand(0.95, -1.05);
    createKnurlBand(0.95, 1.05);
    createKnurlBand(0.35, 0); // Center knurl

    // Helper: Build a realistic Needle Bearing Cage with individual cylindrical needles
    const createNeedleBearingCage = () => {
      const cageGroup = new THREE.Group();
      const outerRingGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.22, 28, 1, true);
      const outerRing = new THREE.Mesh(outerRingGeom, bearingCageMat);
      outerRing.rotation.z = Math.PI / 2;
      cageGroup.add(outerRing);

      // 12 individual needle rollers
      const needleCount = 14;
      const needleGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.18, 12);
      for (let i = 0; i < needleCount; i++) {
        const angle = (i / needleCount) * Math.PI * 2;
        const needle = new THREE.Mesh(needleGeom, needleRollerMat);
        needle.rotation.z = Math.PI / 2;
        needle.position.y = Math.cos(angle) * 0.102;
        needle.position.z = Math.sin(angle) * 0.102;
        cageGroup.add(needle);
      }
      return cageGroup;
    };

    // Helper: Build a Phosphor Bronze Bushing ring
    const createBronzeBushing = () => {
      const geom = new THREE.CylinderGeometry(0.13, 0.13, 0.14, 28);
      const mesh = new THREE.Mesh(geom, bronzeMat);
      mesh.rotation.z = Math.PI / 2;
      return mesh;
    };

    // Helper: Build a Competition Bumper Plate (High detail rubber + steel hub + laser decal)
    const createCompetitionPlate = (outerRadius: number, thickness: number, decalMat: THREE.Material) => {
      const plate = new THREE.Group();

      // Main vulcanized rubber body
      const mainGeom = new THREE.CylinderGeometry(outerRadius, outerRadius, thickness, 36);
      const mainMesh = new THREE.Mesh(mainGeom, bumperRubberMat);
      mainMesh.rotation.z = Math.PI / 2;
      plate.add(mainMesh);

      // Stainless steel central insert hub
      const hubGeom = new THREE.CylinderGeometry(0.24, 0.24, thickness * 1.02, 32);
      const hubMesh = new THREE.Mesh(hubGeom, plateSteelHubMat);
      hubMesh.rotation.z = Math.PI / 2;
      plate.add(hubMesh);

      // Both plate faces with laser decals
      const faceGeom = new THREE.CircleGeometry(outerRadius * 0.98, 36);
      const leftFace = new THREE.Mesh(faceGeom, decalMat);
      leftFace.rotation.y = -Math.PI / 2;
      leftFace.position.x = -thickness / 2 - 0.002;
      plate.add(leftFace);

      const rightFace = new THREE.Mesh(faceGeom, decalMat);
      rightFace.rotation.y = Math.PI / 2;
      rightFace.position.x = thickness / 2 + 0.002;
      plate.add(rightFace);

      return plate;
    };

    // Helper: Build CNC Billet Aluminum Quick-Lock Collar
    const createCNCCollar = () => {
      const collar = new THREE.Group();

      // Collar body with chamfer
      const bodyGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.14, 32);
      const body = new THREE.Mesh(bodyGeom, collarBilletMat);
      body.rotation.z = Math.PI / 2;
      collar.add(body);

      // Inner compression ring
      const innerRingGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.15, 28);
      const innerRing = new THREE.Mesh(innerRingGeom, plateSteelHubMat);
      innerRing.rotation.z = Math.PI / 2;
      collar.add(innerRing);

      // Quick-release cam lever
      const leverGeom = new THREE.BoxGeometry(0.08, 0.18, 0.05);
      const lever = new THREE.Mesh(leverGeom, collarLeverMat);
      lever.position.set(0, 0.26, 0);
      collar.add(lever);

      return collar;
    };

    // --- LEFT ASSEMBLY COMPONENTS (Deconstructed in 3D Space) ---
    // Left Sleeve
    const sleeveLength = 1.25;
    const sleeveGeom = new THREE.CylinderGeometry(0.138, 0.138, sleeveLength, 32);
    const leftSleeve = new THREE.Mesh(sleeveGeom, sleeveMat);
    leftSleeve.rotation.z = Math.PI / 2;
    masterBarbell.add(leftSleeve);

    const leftBushing = createBronzeBushing();
    masterBarbell.add(leftBushing);

    const leftBearings = createNeedleBearingCage();
    masterBarbell.add(leftBearings);

    const leftPlate1 = createCompetitionPlate(0.92, 0.18, plateDecalMat); // 20 KG plate 1
    const leftPlate2 = createCompetitionPlate(0.92, 0.18, plateDecalMat); // 20 KG plate 2
    const leftPlate3 = createCompetitionPlate(0.72, 0.14, plateDecalMat25); // 10 KG plate
    masterBarbell.add(leftPlate1);
    masterBarbell.add(leftPlate2);
    masterBarbell.add(leftPlate3);

    const leftCollar = createCNCCollar();
    masterBarbell.add(leftCollar);

    // --- RIGHT ASSEMBLY COMPONENTS (Deconstructed in 3D Space) ---
    const rightSleeve = new THREE.Mesh(sleeveGeom, sleeveMat);
    rightSleeve.rotation.z = Math.PI / 2;
    masterBarbell.add(rightSleeve);

    const rightBushing = createBronzeBushing();
    masterBarbell.add(rightBushing);

    const rightBearings = createNeedleBearingCage();
    masterBarbell.add(rightBearings);

    const rightPlate1 = createCompetitionPlate(0.92, 0.18, plateDecalMat);
    const rightPlate2 = createCompetitionPlate(0.92, 0.18, plateDecalMat);
    const rightPlate3 = createCompetitionPlate(0.72, 0.14, plateDecalMat25);
    masterBarbell.add(rightPlate1);
    masterBarbell.add(rightPlate2);
    masterBarbell.add(rightPlate3);

    const rightCollar = createCNCCollar();
    masterBarbell.add(rightCollar);

    // Dynamic Dust Particles floating in dark gym light beams
    const particleCount = 200;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 9;
      positions[i + 2] = (Math.random() - 0.5) * 7;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xc6ff00,
      transparent: true,
      opacity: 0.45,
    });
    const dustParticles = new THREE.Points(particleGeom, particleMat);
    scene.add(dustParticles);

    // Interactive Mouse Orbit
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth - 0.5) * 0.6;
      mouseY = ((e.clientY - rect.top) / container.clientHeight - 0.5) * 0.6;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 5. Animation Render Loop (Zenith-Level Exploded View Interpolation)
    let animationId: number;
    let smoothProgress = 0;

    const animate = () => {
      // Lerp progress smoothly
      smoothProgress += (targetProgressRef.current - smoothProgress) * 0.1;

      // Rotate particles subtly
      dustParticles.rotation.y += 0.0008;

      // Mouse interactive orbit
      masterBarbell.rotation.y = THREE.MathUtils.lerp(masterBarbell.rotation.y, mouseX * 0.35, 0.05);
      masterBarbell.rotation.x = THREE.MathUtils.lerp(masterBarbell.rotation.x, mouseY * 0.35, 0.05);

      // ==============================================================
      // ZENITH EXPLODED PHYSICS & KINEMATICS
      // When progress = 0: All parts are exploded in 3D (like Zenith headphones)
      // When progress = 1: Fully assembled, locked barbell setup
      // ==============================================================
      const p = smoothProgress; // 0 (Exploded) -> 1 (Assembled)

      // Master Barbell subtle breathing float
      masterBarbell.position.y = Math.sin(Date.now() * 0.0015) * 0.05;

      // 1. Core Barbell Shaft
      // In exploded view, floats with slight rotation angle; in assembled view, locks horizontal
      shaftMesh.rotation.y = (1 - p) * 0.15;
      shaftMesh.rotation.x = (1 - p) * 0.08;

      // 2. Left Sleeve
      // Target assembled: x = -2.5
      // Exploded: x = -4.2, elevated y = 0.4, z = 0.6
      leftSleeve.position.x = THREE.MathUtils.lerp(-4.2, -2.5, p);
      leftSleeve.position.y = (1 - p) * 0.4;
      leftSleeve.position.z = (1 - p) * 0.6;
      leftSleeve.rotation.y = (1 - p) * 0.3;

      // 3. Left Phosphor Bronze Bushing (Exploded forward & outward)
      // Target assembled: x = -1.9
      // Exploded: x = -2.8, y = -1.2, z = 1.8 (floating in front like Zenith PCB)
      leftBushing.position.x = THREE.MathUtils.lerp(-2.8, -1.9, p);
      leftBushing.position.y = THREE.MathUtils.lerp(-1.2, 0, p);
      leftBushing.position.z = THREE.MathUtils.lerp(1.8, 0, p);
      leftBushing.rotation.y = (1 - p) * 1.5;

      // 4. Left 5-Row Needle Roller Bearing Cage (Exploded upward & outward)
      // Target assembled: x = -2.3
      // Exploded: x = -3.5, y = 1.4, z = 1.4
      leftBearings.position.x = THREE.MathUtils.lerp(-3.5, -2.3, p);
      leftBearings.position.y = THREE.MathUtils.lerp(1.4, 0, p);
      leftBearings.position.z = THREE.MathUtils.lerp(1.4, 0, p);
      leftBearings.rotation.y = (1 - p) * -1.8;

      // 5. Left Calibrated Bumper Plates (Floating in from distant left with angled rotation)
      // Plate 1 target: x = -2.05 (snug against inner sleeve collar)
      leftPlate1.position.x = THREE.MathUtils.lerp(-5.8, -2.05, p);
      leftPlate1.position.y = (1 - p) * 0.7;
      leftPlate1.position.z = (1 - p) * -0.5;
      leftPlate1.rotation.y = (1 - p) * 0.45;

      // Plate 2 target: x = -2.25
      leftPlate2.position.x = THREE.MathUtils.lerp(-7.2, -2.25, p);
      leftPlate2.position.y = (1 - p) * -0.6;
      leftPlate2.position.z = (1 - p) * 0.8;
      leftPlate2.rotation.y = (1 - p) * -0.5;

      // Plate 3 target: x = -2.43
      leftPlate3.position.x = THREE.MathUtils.lerp(-8.6, -2.43, p);
      leftPlate3.position.y = (1 - p) * 0.9;
      leftPlate3.position.z = (1 - p) * -0.9;
      leftPlate3.rotation.y = (1 - p) * 0.6;

      // 6. Left CNC Billet Collar (slides on last and snaps clamp shut)
      // Target: x = -2.58
      leftCollar.position.x = THREE.MathUtils.lerp(-10.2, -2.58, p);
      leftCollar.position.y = (1 - p) * -0.8;
      leftCollar.position.z = (1 - p) * 1.5;
      leftCollar.rotation.y = (1 - p) * -1.2;

      // ==============================================================
      // RIGHT SIDE SYMMETRIC EXPLODED INTERPOLATION
      // ==============================================================
      rightSleeve.position.x = THREE.MathUtils.lerp(4.2, 2.5, p);
      rightSleeve.position.y = (1 - p) * 0.4;
      rightSleeve.position.z = (1 - p) * 0.6;
      rightSleeve.rotation.y = (1 - p) * -0.3;

      rightBushing.position.x = THREE.MathUtils.lerp(2.8, 1.9, p);
      rightBushing.position.y = THREE.MathUtils.lerp(-1.2, 0, p);
      rightBushing.position.z = THREE.MathUtils.lerp(1.8, 0, p);
      rightBushing.rotation.y = (1 - p) * -1.5;

      rightBearings.position.x = THREE.MathUtils.lerp(3.5, 2.3, p);
      rightBearings.position.y = THREE.MathUtils.lerp(1.4, 0, p);
      rightBearings.position.z = THREE.MathUtils.lerp(1.4, 0, p);
      rightBearings.rotation.y = (1 - p) * 1.8;

      rightPlate1.position.x = THREE.MathUtils.lerp(5.8, 2.05, p);
      rightPlate1.position.y = (1 - p) * 0.7;
      rightPlate1.position.z = (1 - p) * -0.5;
      rightPlate1.rotation.y = (1 - p) * -0.45;

      rightPlate2.position.x = THREE.MathUtils.lerp(7.2, 2.25, p);
      rightPlate2.position.y = (1 - p) * -0.6;
      rightPlate2.position.z = (1 - p) * 0.8;
      rightPlate2.rotation.y = (1 - p) * 0.5;

      rightPlate3.position.x = THREE.MathUtils.lerp(8.6, 2.43, p);
      rightPlate3.position.y = (1 - p) * 0.9;
      rightPlate3.position.z = (1 - p) * -0.9;
      rightPlate3.rotation.y = (1 - p) * -0.6;

      rightCollar.position.x = THREE.MathUtils.lerp(10.2, 2.58, p);
      rightCollar.position.y = (1 - p) * -0.8;
      rightCollar.position.z = (1 - p) * 1.5;
      rightCollar.rotation.y = (1 - p) * 1.2;

      // Camera push-in for final inspection
      camera.position.z = THREE.MathUtils.lerp(8.4, 6.2, Math.pow(p, 2));

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const toggleViewMode = (mode: 'exploded' | 'assembled') => {
    targetProgressRef.current = mode === 'assembled' ? 1 : 0;
    setScrollProgress(mode === 'assembled' ? 1 : 0);
    soundFX.playImpact();
  };

  return (
    <section
      id="equipment-assembly"
      ref={sectionRef}
      className="relative w-full h-[380vh] bg-[#000000]"
    >
      {/* Sticky Fullscreen 3D Stage (Deep Zenith Void) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10 pointer-events-none select-none">
        {/* Top Header & Engineering HUD */}
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-start justify-between gap-6 pointer-events-auto z-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crosshair className="w-4 h-4 text-[#C6FF00] animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-xs font-mono tracking-[0.25em] text-[#C6FF00] uppercase font-bold">
                ENGINEERED HARDWARE // EXPLODED KINEMATICS
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl md:text-8xl text-white tracking-wide uppercase leading-none">
              FORGED, NOT FOUND.
            </h2>
            <p className="text-xs sm:text-sm text-[#888888] font-['Inter'] max-w-lg mt-2">
              Precision deconstruction of our Olympic competition setup. Scroll to draw the internal bearings, bushings, calibrated bumper discs, and billet clamps into one indestructible bar.
            </p>
          </div>

          {/* Quick Mode Toggle & Telemetry */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            {/* Exploded vs Assembled Pill Toggle (Zenith Style) */}
            <div className="flex items-center gap-1.5 bg-[#141414] border border-white/15 p-1.5 shadow-2xl">
              <button
                onClick={() => toggleViewMode('exploded')}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  scrollProgress < 0.5
                    ? 'bg-[#C6FF00] text-black font-bold shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>EXPLODED VIEW</span>
              </button>
              <button
                onClick={() => toggleViewMode('assembled')}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  scrollProgress >= 0.5
                    ? 'bg-[#C6FF00] text-black font-bold shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ASSEMBLED BAR</span>
              </button>
            </div>

            {/* Live Assembly Percentage Dial */}
            <div className="flex items-center gap-3 font-mono text-xs text-[#888888]">
              <span>CALIBRATION:</span>
              <span className="text-[#C6FF00] font-bold text-sm">
                {Math.round(scrollProgress * 100)}%
              </span>
              <div className="w-20 h-1.5 bg-[#222222] overflow-hidden">
                <div
                  className="h-full bg-[#C6FF00] transition-all duration-75"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Photorealistic Three.js 3D Canvas */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-0"
        />

        {/* Floating Zenith-Style Technical Callout Pins (Visible in Exploded Mode) */}
        {scrollProgress < 0.55 && (
          <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
            {CALLOUTS.map((callout) => (
              <motion.div
                key={callout.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute pointer-events-auto cursor-pointer group"
                style={{
                  left: `${callout.xPercent}%`,
                  top: `${callout.yPercent}%`,
                }}
                onClick={() => {
                  setActiveCallout(callout);
                  soundFX.playHover();
                }}
              >
                {/* Connecting Pinpoint & Line */}
                <div className="relative flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#C6FF00] ring-4 ring-[#C6FF00]/20 flex items-center justify-center animate-pulse">
                    <div className="w-1 h-1 bg-black rounded-full" />
                  </div>
                  <div className="w-8 h-[1px] bg-[#C6FF00]/50" />
                  <div className="bg-[#111111]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 transition-all group-hover:border-[#C6FF00] group-hover:scale-105">
                    <span className="font-mono text-[10px] text-[#C6FF00] tracking-widest block font-bold">
                      [{callout.tag}] {callout.name}
                    </span>
                    <span className="font-['Inter'] text-[10px] text-[#A0A0A0]">
                      {callout.spec}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Active Callout Detailed Spec Card */}
        {activeCallout && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto bg-[#121212]/95 backdrop-blur-md border border-[#C6FF00] p-4 max-w-md w-full shadow-2xl flex items-start justify-between">
            <div>
              <span className="font-mono text-xs text-[#C6FF00] font-bold block mb-1">
                [{activeCallout.tag}] {activeCallout.name}
              </span>
              <p className="text-xs text-[#CCCCCC] font-['Inter'] leading-relaxed">
                {activeCallout.spec}. Precision-machined for competition tolerance, structural rigidity, and seamless whip response.
              </p>
            </div>
            <button
              onClick={() => setActiveCallout(null)}
              className="text-[#888888] hover:text-white p-1 text-xs font-mono ml-4"
            >
              [X]
            </button>
          </div>
        )}

        {/* Center Editorial Headline (Zenith Style: "Hear Everything" -> "Every Rep Builds You") */}
        <div className="relative z-20 max-w-4xl mx-auto w-full text-center pointer-events-auto mb-6">
          <AnimatePresence mode="wait">
            {scrollProgress >= 0.8 ? (
              <motion.div
                key="assembled"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-[#111111]/90 backdrop-blur-xl border border-[#C6FF00]/40 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center justify-center gap-2 text-[#C6FF00] mb-2 font-mono text-xs uppercase tracking-widest font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>COMPETITION BAR ASSEMBLED // 495 LBS CALIBRATED</span>
                </div>
                <h3 className="font-['Bebas_Neue'] text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none">
                  EVERY REP BUILDS YOU.
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] font-['Inter'] max-w-xl mx-auto mt-2 leading-relaxed">
                  No slop, no give. When you step inside the cage, the iron provides absolute truth.
                </p>
                <div className="mt-5 flex items-center justify-center gap-4">
                  <a
                    href="#ugc-entrance"
                    className="bg-[#C6FF00] text-black font-['Oswald'] font-bold text-sm tracking-wider px-6 py-2.5 uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(198,255,0,0.3)]"
                  >
                    ENTER TRAINING FLOOR &darr;
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="exploded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#888888] bg-[#0c0c0c]/80 backdrop-blur-md px-4 py-1.5 border border-white/10">
                  <Rotate3d className="w-4 h-4 text-[#C6FF00]" />
                  <span>DRAG TO ROTATE 3D • SCROLL DOWN TO ASSEMBLE PARTS</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#C6FF00] animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Technical Bar */}
        <div className="relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between text-[11px] font-mono text-[#666666] border-t border-white/10 pt-3 pointer-events-auto">
          <span>// CAD ENGINE: THREE.JS PBR HARDWARE SHADERS</span>
          <span className="hidden sm:inline text-[#A0A0A0]">IPF CERTIFIED • 28MM DIAMETER • 215,000 PSI TENSILE</span>
          <span className="text-[#C6FF00]">VOLCANO KNURL SPEC: 1.2MM</span>
        </div>
      </div>
    </section>
  );
};
