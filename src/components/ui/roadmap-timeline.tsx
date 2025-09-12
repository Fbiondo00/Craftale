"use client";

import React, { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
// removed , useScroll, useTransform
import {
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  Code2,
  Lightbulb,
  Palette,
  Rocket,
  Target,
  TrendingUp,
} from "lucide-react";

interface ProcessStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  duration: string;
  deliverables: string[];
  icon: React.ElementType;
  color: string;
}

interface RoadmapTimelineProps {
  stages?: ProcessStage[];
  className?: string;
}

const web44Stages: ProcessStage[] = [
  {
    id: "1",
    title: "Spark the Vision",
    subtitle: "Discovery & Strategy",
    description: "We dive deep into your goals and uncover opportunities that position you ahead of the competition.",
    status: "completed",
    duration: "2-3 weeks",
    deliverables: ["Market Research", "User Personas", "Competitive Analysis", "Strategy Blueprint"],
    icon: Lightbulb,
    color: "#6366f1",
  },
  {
    id: "2",
    title: "Blueprint Success",
    subtitle: "Planning & Architecture",
    description: "Strategic workshops that transform insights into an actionable roadmap engineered for results.",
    status: "completed",
    duration: "2-3 weeks",
    deliverables: ["Wireframes", "Site Architecture", "User Journey Maps", "Technical Specs"],
    icon: Target,
    color: "#8b5cf6",
  },
  {
    id: "3",
    title: "Craft Experience",
    subtitle: "Design & Prototyping",
    description:
      "Award-winning design that elevates your brand and creates experiences that convert browsers into customers.",
    status: "in-progress",
    duration: "3-4 weeks",
    deliverables: ["Visual Design", "Interactive Prototype", "Design System", "Brand Guidelines"],
    icon: Palette,
    color: "#a855f7",
  },
  {
    id: "4",
    title: "Engineer Performance",
    subtitle: "Development & Integration",
    description: "Future-proof development that delivers lightning-fast, scalable platforms built for growth.",
    status: "upcoming",
    duration: "6-8 weeks",
    deliverables: ["Frontend Code", "Backend API", "CMS Integration", "Performance Optimization"],
    icon: Code2,
    color: "#c084fc",
  },
  {
    id: "5",
    title: "Optimize & Test",
    subtitle: "Quality Assurance",
    description: "Rigorous testing and optimization ensuring every element performs at peak efficiency.",
    status: "upcoming",
    duration: "2-3 weeks",
    deliverables: ["Cross-browser Testing", "Performance Audit", "Security Testing", "Bug Fixes"],
    icon: TrendingUp,
    color: "#d946ef",
  },
  {
    id: "6",
    title: "Launch into Greatness",
    subtitle: "Go Live & Support",
    description: "Flawless deployment with zero surprises—your brand makes a powerful first impression from day one.",
    status: "upcoming",
    duration: "Ongoing",
    deliverables: ["Production Deploy", "Performance Monitor", "User Training", "Ongoing Support"],
    icon: Rocket,
    color: "#ec4899",
  },
];

const GeometricPattern: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 60, height = 60, className = "" }) => {
  const id = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-indigo-400/10 stroke-indigo-400/20 ${className}`}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray="2 2" />
          <circle cx={width / 4} cy={height / 4} r="1" fill="currentColor" opacity="0.5" />
          <circle cx={(3 * width) / 4} cy={(3 * height) / 4} r="1" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
};

const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ stages = web44Stages, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const getStatusIcon = (status: ProcessStage["status"]) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in-progress":
        return Clock;
      default:
        return Circle;
    }
  };

  const generateCurvePath = (startY: number, endY: number, index: number) => {
    const isEven = index % 2 === 0;
    const curveOffset = isEven ? 100 : -100;
    const midY = (startY + endY) / 2;

    // Move the line slightly more to the right for better icon alignment
    const centerX = 580; // Fine-tuned from 550 to 580

    return `M ${centerX} ${startY} Q ${centerX + curveOffset} ${midY} ${centerX} ${endY}`;
  };

  return (
    <section
      className={`relative bg-gradient-to-br from-brand-secondary/10/50 via-brand-tertiary/10/30 to-brand-accent/10/50 overflow-hidden ${className}`}
      ref={containerRef}
    >
      <GeometricPattern width={80} height={80} className="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent">
              OUR PROVEN PROCESS.
            </span>
          </motion.h2>
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            ENGINEERED FOR SUCCESS.
          </motion.h3>
          <motion.p
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We don't just build websites—we engineer digital experiences that drive results. Our battle-tested process
            turns your vision into a high-converting reality, with zero surprises and maximum impact.
          </motion.p>
        </div>

        <div className="relative min-h-screen">
          <div className="space-y-32">
            {stages.map((stage, index) => {
              const isEven = index % 2 === 0;
              const StatusIcon = getStatusIcon(stage.status);

              return (
                <motion.div
                  key={stage.id}
                  className={`flex items-center gap-12 ${isEven ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onHoverStart={() => setActiveStage(stage.id)}
                  onHoverEnd={() => setActiveStage(null)}
                >
                  <div className="flex-1 max-w-lg">
                    <Card
                      className={`
                      transition-all duration-500 hover:shadow-2xl border-2 bg-white/80 backdrop-blur-sm
                      ${activeStage === stage.id ? "scale-105 shadow-xl border-brand-secondary/40" : "border-color-default"}
                      ${stage.status === "completed" ? "border-color-state-success-border bg-color-state-success-bg/80" : ""}
                      ${stage.status === "in-progress" ? "border-color-state-info-border bg-color-state-info-bg/80" : ""}
                    `}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            variant="outline"
                            className={`font-semibold
                              ${stage.status === "completed" ? "border-color-state-success text-color-state-success-text bg-color-state-success-bg" : ""}
                              ${stage.status === "in-progress" ? "border-color-state-info text-color-state-info-text bg-color-state-info-bg" : ""}
                              ${stage.status === "upcoming" ? "border-color-hover text-color-secondary bg-color-subtle" : ""}
                            `}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {stage.status === "in-progress"
                              ? "In Progress"
                              : stage.status === "completed"
                                ? "Completed"
                                : "Upcoming"}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-mono bg-color-muted px-2 py-1 rounded">
                            {stage.duration}
                          </span>
                        </div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-4">
                          <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: stage.color }}>
                            <stage.icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-xl">{stage.title}</div>
                            <div className="text-sm text-muted-foreground font-medium">{stage.subtitle}</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-6 leading-relaxed text-base">{stage.description}</p>

                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-color-primary">
                            <ArrowRight className="w-4 h-4" style={{ color: stage.color }} />
                            Key Deliverables
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {stage.deliverables.map((deliverable, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-center gap-2 text-sm bg-color-subtle p-2 rounded-lg"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                                {deliverable}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="w-20 flex justify-center relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: stage.color }}
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: index * 0.2,
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false }}
                        transition={{
                          delay: index * 0.2 + 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <stage.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Add pulse effect for in-progress stage */}
                    {stage.status === "in-progress" && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-color-state-info-border"
                        animate={{
                          scale: [1, 1.4],
                          opacity: [0.7, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Duration */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 3 }}
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-brand-secondary/10 to-brand-tertiary/10 border border-brand-secondary/30 rounded-full px-8 py-4 shadow-xl">
            <Clock className="w-6 h-6 text-brand-secondary" />
            <span className="text-xl font-bold text-foreground">12-16 weeks to launch</span>
            <div className="w-2 h-2 bg-color-state-success rounded-full animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground mt-3 font-medium">From first meeting to powerful results</p>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapTimeline;
