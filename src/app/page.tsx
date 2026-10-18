"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { CloudSection } from "@/components/sections/cloud";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { TimelineSection } from "@/components/sections/timeline";
import { CertificationsSection } from "@/components/sections/certifications";
import { HobbiesSection } from "@/components/sections/hobbies";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Ambient mesh gradient — fixed background giving depth to all sections */}
      <div aria-hidden className="ambient-mesh" />
      {/* Faint dot texture overlay for subtle depth */}
      <div aria-hidden className="dot-texture pointer-events-none fixed inset-0 z-0 opacity-60" />
      {/* Subtle scanlines overlay across whole page */}
      <div aria-hidden className="scanlines pointer-events-none fixed inset-0 z-[1]" />

      <Navbar />

      <main className="relative z-[2] flex-1">
        <HeroSection />
        <AboutSection />
        <CloudSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <CertificationsSection />
        <HobbiesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
