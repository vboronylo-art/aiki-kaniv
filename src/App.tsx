/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CINEMATIC_TAKES } from './data/cinematicTakes';
import { CinematicTake, KeyframeMarker } from './types';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MeditationTimer } from './components/MeditationTimer';
import { CinematicPlayer } from './components/CinematicPlayer';
import { BiomechanicalExplorer } from './components/BiomechanicalExplorer';
import { TechniqueCatalog } from './components/TechniqueCatalog';
import { KanivDojoStory } from './components/KanivDojoStory';
import { DojoEnrollmentSection } from './components/DojoEnrollmentSection';
import { TechniqueSnapshotModal } from './components/TechniqueSnapshotModal';
import { Footer } from './components/Footer';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  const [takes] = useState<CinematicTake[]>(CINEMATIC_TAKES);
  const [activeTake, setActiveTake] = useState<CinematicTake>(CINEMATIC_TAKES[0]);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('player');

  const [snapshotModal, setSnapshotModal] = useState<{
    isOpen: boolean;
    take: CinematicTake | null;
    keyframe: KeyframeMarker | null;
    time: number;
  }>({
    isOpen: false,
    take: null,
    keyframe: null,
    time: 0,
  });

  // Keep mute state in sync with soundEngine
  useEffect(() => {
    return soundEngine.subscribe((muted) => {
      setIsMuted(muted);
    });
  }, []);

  // Handle ESC key to exit cinema mode or close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (snapshotModal.isOpen) {
          setSnapshotModal((prev) => ({ ...prev, isOpen: false }));
        } else if (isCinemaMode) {
          setIsCinemaMode(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [snapshotModal.isOpen, isCinemaMode]);

  const handleSelectTake = (take: CinematicTake) => {
    setActiveTake(take);
  };

  const handleJumpToTechnique = (takeId: string, time: number) => {
    const targetTake = takes.find((t) => t.id === takeId) || takes[0];
    setActiveTake(targetTake);

    const playerEl = document.getElementById('player');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCaptureFrame = (
    take: CinematicTake,
    keyframe: KeyframeMarker | null,
    time: number
  ) => {
    setSnapshotModal({
      isOpen: true,
      take,
      keyframe,
      time,
    });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a08] text-[#f4efe6] selection:bg-[#c98a3c]/30 selection:text-[#f7e6c4] flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navigation
        isCinemaMode={isCinemaMode}
        onToggleCinemaMode={() => setIsCinemaMode(!isCinemaMode)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section */}
        {!isCinemaMode && (
          <HeroSection
            takes={takes}
            onStartReel={() => {
              handleNavigate('player');
            }}
            onSelectTake={handleSelectTake}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        )}

        {/* Interactive Meditation Timer (Mokusō before training) */}
        {!isCinemaMode && (
          <MeditationTimer
            onCompleteAndStartTraining={() => {
              handleNavigate('player');
            }}
          />
        )}

        {/* Primary Cinematic Slow-Motion Player */}
        <CinematicPlayer
          takes={takes}
          activeTake={activeTake}
          onSelectTake={handleSelectTake}
          isCinemaMode={isCinemaMode}
          onToggleCinemaMode={() => setIsCinemaMode(!isCinemaMode)}
          onCaptureFrame={handleCaptureFrame}
        />

        {/* Biomechanics & Anatomy of Ki Section */}
        {!isCinemaMode && (
          <>
            <BiomechanicalExplorer onJumpToTechnique={handleJumpToTechnique} />
            <TechniqueCatalog onSelectTechnique={handleJumpToTechnique} />
            <KanivDojoStory />
            <DojoEnrollmentSection />
          </>
        )}
      </main>

      {/* Frame Inspection Snapshot Modal */}
      <TechniqueSnapshotModal
        take={snapshotModal.take}
        keyframe={snapshotModal.keyframe}
        currentTime={snapshotModal.time}
        isOpen={snapshotModal.isOpen}
        onClose={() => setSnapshotModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Footer */}
      {!isCinemaMode && <Footer />}
    </div>
  );
}
