"use client";

import Link from "next/link";
import { AptySecondaryButton } from "@/components/apty/AptyButton";
import { motion } from "framer-motion";

interface ProjectCase {
  id: string;
  logo: string;
  projectName: string;
  category: string;
  metric: string;
  metricColor?: string;
  description: string;
  link: string;
  logoAlt: string;
  isExternal?: boolean;
}

export default function CaseStudiesSection() {
  const projectCases: ProjectCase[] = [
    {
      id: "ecommerce-platform",
      logo: "/images/projects/ecommerce-logo.svg",
      projectName: "ModernShop",
      category: "E-commerce Platform",
      metric: "+250% conversion rate",
      metricColor: "text-apty-primary",
      description: "Piattaforma e-commerce full‑stack con raccomandazioni basate su AI",
      link: "https://modernshop-demo.vercel.app",
      logoAlt: "ModernShop logo",
      isExternal: true,
    },
    {
      id: "saas-dashboard",
      logo: "/images/projects/saas-logo.svg",
      projectName: "DataFlow Pro",
      category: "SaaS Analytics",
      metric: "10ms response time",
      metricColor: "text-apty-primary",
      description: "Dashboard di analytics in tempo reale con visualizzazioni avanzate",
      link: "https://dataflow-analytics.vercel.app",
      logoAlt: "DataFlow Pro logo",
      isExternal: true,
    },
    {
      id: "mobile-app",
      logo: "/images/projects/mobile-logo.svg",
      projectName: "FitTracker",
      category: "Health & Fitness",
      metric: "50K+ active users",
      metricColor: "text-apty-primary",
      description: "App mobile cross‑platform con React Native e sincronizzazione cloud",
      link: "https://fittracker-landing.vercel.app",
      logoAlt: "FitTracker logo",
      isExternal: true,
    },
  ];

  return (
    <section className="py-24 bg-apty-bg-inverse">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[40px] leading-[48px] font-semibold font-apty-heading text-apty-text-inverse">
            Progetti reali che abbiamo realizzato per i nostri clienti
          </h2>
        </motion.div>

        {/* Projects Grid - Single Row with 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projectCases.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className="
                h-full flex flex-col
                bg-apty-bg-base 
                rounded-xl 
                p-6
                border border-apty-border-subtle
                hover:border-apty-border-default
                apty-transition
              "
              >
                {/* App Logo and Info - Horizontal Layout */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Logo - Rounded square */}
                  <div
                    className={`
                    w-14 h-14 
                    rounded-xl 
                    flex items-center justify-center
                    shadow-sm
                    flex-shrink-0
                    ${
                      index === 0
                        ? "bg-gradient-to-br from-cyan-400 to-cyan-500"
                        : index === 1
                          ? "bg-gradient-to-br from-orange-300 via-orange-400 to-yellow-400"
                          : "bg-gradient-to-br from-pink-300 to-pink-400"
                    }
                  `}
                  >
                    {/* Placeholder icon - would be actual logo */}
                    <span className="text-white text-xl font-bold">{project.projectName.charAt(0)}</span>
                  </div>

                  {/* Project Name and Category - Stacked */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-apty-text-primary font-apty-heading">
                      {project.projectName}
                    </h3>
                    <p className="text-sm text-apty-text-secondary mt-0.5">{project.category}</p>
                  </div>
                </div>

                {/* Metric Highlight - Colored based on brand */}
                <div className="mb-3">
                  <p className={`text-lg font-semibold ${project.metricColor || "text-apty-primary"}`}>
                    {project.metric}
                  </p>
                </div>

                {/* Description - Smaller text */}
                <p className="text-sm text-apty-text-secondary mb-6 flex-grow leading-relaxed">{project.description}</p>

                {/* Pulsante Scopri di più - usa AptySecondaryButton con chevron */}
                <div className="mt-auto pt-2">
                  <Link
                    href={project.link}
                    target={project.isExternal ? "_blank" : undefined}
                    rel={project.isExternal ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    <AptySecondaryButton withChevron size="md" className="w-full justify-center">
                      Scopri di più
                    </AptySecondaryButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
