"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SITE_CONTENT } from "@/content/site";
import { IntroPortal } from "@/components/experience/IntroPortal";
import { BoliviaOrigin } from "@/components/experience/BoliviaOrigin";
import { LabExperience } from "@/components/experience/LabExperience";
import { DecisionChallenge } from "@/components/experience/DecisionChallenge";
import { SustainabilitySection } from "@/components/experience/SustainabilitySection";
import { AnimalImpact } from "@/components/experience/AnimalImpact";
import { FutureVision } from "@/components/experience/FutureVision";
import { FinalReveal } from "@/components/experience/FinalReveal";
import { ProgressRoot } from "@/components/ui/ProgressRoot";
import { AudioControl } from "@/components/ui/AudioControl";
import { GuidedModeBar } from "@/components/ui/GuidedModeBar";
import { trackEvent } from "@/lib/analytics";

function EcosistemaExperience() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const modeParam = searchParams.get("mode");

  const isJurySource = source === "video" || modeParam === "jury";
  const [isGuidedMode, setIsGuidedMode] = useState(false);
  const [currentGuidedIndex, setCurrentGuidedIndex] = useState(0);

  useEffect(() => {
    trackEvent("ecosistema_loaded", { source, modeParam, isJurySource });
    if (modeParam === "guided" || modeParam === "jury") {
      setIsGuidedMode(true);
    }
  }, [source, modeParam, isJurySource]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStartExplore = () => {
    trackEvent("explore_started");
    setIsGuidedMode(false);
    scrollToSection("origen");
  };

  const handleStartGuided = () => {
    trackEvent("guided_mode_started");
    setIsGuidedMode(true);
    setCurrentGuidedIndex(0);
    scrollToSection(SITE_CONTENT.chapters[0].id);
  };

  const handleGuidedStep = (index: number) => {
    setCurrentGuidedIndex(index);
    const targetChapter = SITE_CONTENT.chapters[index];
    if (targetChapter) {
      scrollToSection(targetChapter.id);
      trackEvent("guided_chapter_viewed", { chapter: targetChapter.id, index });
    }
  };

  const handleRestart = () => {
    trackEvent("experience_restarted");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsGuidedMode(false);
  };

  return (
    <main className="relative min-h-screen selection:bg-brand-emerald selection:text-brand-paper">
      <ProgressRoot />
      <AudioControl />

      {isGuidedMode && (
        <GuidedModeBar
          chapters={SITE_CONTENT.chapters}
          currentChapterIndex={currentGuidedIndex}
          onSelectChapter={handleGuidedStep}
          onExitGuided={() => setIsGuidedMode(false)}
        />
      )}

      {/* Chapter 00: Intro Portal */}
      <IntroPortal
        onStartExplore={handleStartExplore}
        onStartGuided={handleStartGuided}
        isJurySource={isJurySource}
      />

      {/* Chapter 01: Bolivia & Native Ingredients */}
      <BoliviaOrigin
        onIngredientToLab={(ingredient) => {
          scrollToSection("laboratorio");
          trackEvent("ingredient_directed_to_lab", { ingredient: ingredient.id });
        }}
      />

      {/* Chapter 02: Laboratory & NutriQ Formulation */}
      <LabExperience />

      {/* Chapter 03: Decision Simulator (100 Resources Balance) */}
      <DecisionChallenge />

      {/* Chapter 04: Sustainability & Packaging Layers */}
      <SustainabilitySection />

      {/* Chapter 05: Animal Welfare & Giving Back */}
      <AnimalImpact />

      {/* Chapter 06: Andrea Angles & Converging Vision */}
      <FutureVision />

      {/* Final Reveal, QR Access and Closure */}
      <FinalReveal onRestart={handleRestart} />
    </main>
  );
}

export default function EcosistemaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-brand-paper text-brand-forest font-mono text-xs">
          ANGLES NATURAL • ECOSISTEMA VIVO...
        </div>
      }
    >
      <EcosistemaExperience />
    </Suspense>
  );
}