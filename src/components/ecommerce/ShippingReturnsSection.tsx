"use client";

import { motion } from "framer-motion";
import { Package, RefreshCw } from "lucide-react";

export default function ShippingReturnsSection() {
  return (
    <section className="py-24 md:py-32 bg-apty-bg-subtle">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4">
            Shipping & Returns That <span className="text-apty-primary">Build Trust</span>
          </h2>
          <p className="text-xl text-apty-text-secondary max-w-3xl mx-auto">
            Italian shoppers demand transparency and flexibility
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Strategy */}
            <div className="bg-apty-bg-base rounded-2xl p-8">
              <Package className="w-12 h-12 text-apty-primary mb-4" />
              <h3 className="text-2xl font-bold text-apty-text-primary mb-6">Smart Shipping Strategy</h3>

              <div className="space-y-4">
                <div className="p-4 bg-apty-primary/10 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-apty-text-primary">Free Shipping Threshold</span>
                    <span className="font-bold text-apty-primary">€110-120</span>
                  </div>
                  <div className="text-sm text-apty-text-secondary">Increases cart value +12-18%</div>
                </div>

                <div className="p-4 bg-apty-bg-subtle rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-apty-text-primary">Express Delivery</span>
                    <span className="font-bold text-apty-secondary">24-48h</span>
                  </div>
                  <div className="text-sm text-apty-text-secondary">+7-12% conversion rate</div>
                </div>

                <div className="p-4 bg-apty-bg-subtle rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-apty-text-primary">Max Delivery Time</span>
                    <span className="font-bold text-apty-accent">5 days</span>
                  </div>
                  <div className="text-sm text-apty-text-secondary">58% abandon if longer</div>
                </div>

                <div className="text-sm text-apty-text-secondary mt-4">
                  <strong>Top Carriers:</strong> BRT, GLS, Poste Italiane
                </div>
              </div>
            </div>

            {/* Returns Strategy */}
            <div className="bg-apty-bg-base rounded-2xl p-8">
              <RefreshCw className="w-12 h-12 text-apty-secondary mb-4" />
              <h3 className="text-2xl font-bold text-apty-text-primary mb-6">Returns Build Loyalty</h3>

              <div className="space-y-4">
                <div className="p-4 bg-apty-secondary/10 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-apty-text-primary">Legal Requirement</span>
                    <span className="font-bold text-apty-secondary">14 days</span>
                  </div>
                  <div className="text-sm text-apty-text-secondary">Diritto di recesso mandatory</div>
                </div>

                <div className="p-4 bg-apty-bg-subtle rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-apty-text-primary">Average Return Rate</span>
                    <span className="font-bold text-apty-text-primary">8-10%</span>
                  </div>
                  <div className="text-sm text-apty-text-secondary">20% in fashion sector</div>
                </div>

                <div className="p-4 bg-apty-state-success/10 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-apty-text-primary">Flexible Returns</span>
                    <span className="font-bold text-apty-state-success">+30%</span>
                  </div>
                  <div className="text-sm text-apty-text-secondary">Repeat purchase increase</div>
                </div>

                <div className="text-sm text-apty-text-secondary mt-4">
                  <strong>Best Practice:</strong> Pre-paid return labels
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-apty-text-secondary">
            Fonti:
            <a
              href="https://ecommercenews.eu/ecommerce-in-europe/ecommerce-italy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apty-primary hover:underline mx-1"
            >
              E-commerce News EU
            </a>
            ,
            <a
              href="https://www.casaleggio.it/e-commerce/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apty-primary hover:underline mx-1"
            >
              Casaleggio Associati
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
