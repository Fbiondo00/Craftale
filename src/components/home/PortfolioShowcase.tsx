"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WorkSample } from "@/types/home-page";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Monitor } from "lucide-react";

interface PortfolioShowcaseProps {
  hoveredWork: number;
  onWorkHover: (index: number) => void;
  onWorkHoverEnd: () => void;
}

export default function PortfolioShowcase({ hoveredWork, onWorkHover, onWorkHoverEnd }: PortfolioShowcaseProps) {
  const workSamples: WorkSample[] = [
    {
      title: "E-commerce Revolution",
      client: "TechStore Pro",
      category: "E-commerce",
      result: "+300% Sales",
      tech: ["React", "Node.js", "Stripe"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Local Business Boom",
      client: "Bella Vista Restaurant",
      category: "Restaurant",
      result: "+150% Bookings",
      tech: ["WordPress", "Custom Theme"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "SaaS Landing Magic",
      client: "CloudSync",
      category: "SaaS",
      result: "+400% Signups",
      tech: ["Next.js", "Tailwind", "Framer"],
      color: "from-brand-tertiary/90 to-brand-accent/90",
    },
  ];

  return (
    <section className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recent Work That <span className="text-brand-secondary">Drives Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. See how we&apos;ve helped businesses like yours increase sales, generate
            leads, and grow their online presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {workSamples.map((work, index) => (
            <motion.div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => onWorkHover(index)}
              onHoverEnd={onWorkHoverEnd}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`relative overflow-hidden bg-gradient-to-br ${work.color} h-48`}>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={hoveredWork === index ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Monitor className="w-20 h-20 text-white/80" />
                </motion.div>

                {/* Floating elements on hover */}
                <AnimatePresence>
                  {hoveredWork === index && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/60 rounded-full"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            y: [0, -20, -40],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                <motion.div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-4 bg-color-state-success text-white px-3 py-1 rounded-full text-sm font-semibold"
                  animate={
                    hoveredWork === index
                      ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 0 0 rgba(34, 197, 94, 0)",
                            "0 0 20px rgba(34, 197, 94, 0.5)",
                            "0 0 0 rgba(34, 197, 94, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {work.result}
                </motion.div>
              </div>

              <div className="p-6">
                <div className="text-sm text-brand-secondary font-semibold mb-1">{work.category}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-secondary transition-colors">
                  {work.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">for {work.client}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {work.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="bg-muted px-2 py-1 rounded text-xs hover:bg-brand-secondary/20 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -1 }}
                      transition={{ delay: techIndex * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-brand-secondary/10 group-hover:text-brand-secondary transition-colors"
                >
                  <Link href="/blog?filter=case-studies" className="flex items-center justify-center w-full">
                    View Case Study
                    <motion.div
                      animate={hoveredWork === index ? { x: [0, 5, 0] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/blog?filter=projects">
              <Button size="lg" variant="outline" className="group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-secondary/10 to-brand-tertiary/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="flex items-center space-x-2 relative z-10">
                  <span>View All Projects</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
