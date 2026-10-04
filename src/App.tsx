/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyProject } from './components/WhyProject';
import { FourPillars } from './components/FourPillars';
import { Approach } from './components/Approach';
import { LocalCSO } from './components/LocalCSO';
import { Thematics } from './components/Thematics';
import { Resources } from './components/Resources';
import { Community } from './components/Community';
import { Ambition } from './components/Ambition';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LwsExportModal } from './components/LwsExportModal';

export default function App() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinClick = () => {
    scrollToSection('communaute');
    setTimeout(() => {
      const nameInput = document.getElementById('nom') as HTMLInputElement | null;
      if (nameInput) {
        nameInput.focus();
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-teal-500/20 selection:text-teal-900 font-sans">
      
      {/* 1. Header (Sticky Top Bar Contract) */}
      <Header onOpenExportModal={() => setIsExportModalOpen(true)} />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onDiscoverClick={() => scrollToSection('pourquoi')}
          onJoinClick={handleJoinClick}
        />

        {/* 2. Pourquoi ce projet ? */}
        <WhyProject />

        {/* 3. Nos 4 Piliers */}
        <FourPillars />

        {/* 4. Notre Approche */}
        <Approach />

        {/* 5. Pour les OSC Locales */}
        <LocalCSO />

        {/* 6. Thématiques */}
        <Thematics />

        {/* 7. Ressources */}
        <Resources />

        {/* 8. Communauté */}
        <Community />

        {/* 9. Ambition */}
        <Ambition />

        {/* 10. CTA Final */}
        <FinalCTA onJoinClick={handleJoinClick} />
      </main>

      {/* Footer */}
      <Footer onOpenExportModal={() => setIsExportModalOpen(true)} />

      {/* Dedicated LWS Export & Deployment Guide Modal */}
      <LwsExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
