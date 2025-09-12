"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/about/HeroSection";
import StorySection from "@/components/about/StorySection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";
import CTASection from "@/components/home/CTASection";
import { LumaSpin } from "@/components/ui/luma-spin";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-color-inverse flex items-center justify-center">
        <LumaSpin size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HeroSection />
      <TeamSection />
      <ValuesSection />
      <StorySection />
      <CTASection />
    </div>
  );
}
