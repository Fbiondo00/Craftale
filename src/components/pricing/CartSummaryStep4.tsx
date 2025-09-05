'use client';

import React from 'react';
import { motion } from 'framer-motion';
//import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/ui/GlowingEffect';
import type { OptionalServiceWithAvailability as OptionalService } from '@/types/database-extended';
import {
  ArrowLeft,
  Camera,
  PenTool,
  Wrench,
  BarChart3,
  LucideIcon,
  ShoppingCart,
} from 'lucide-react';

interface CartSummaryStep4Props {
  selectedServices: OptionalService[];
  onModifyConfiguration: () => void;
}

// Icon mapping for string to component
const iconMap: Record<string, LucideIcon> = {
  Camera,
  PenTool,
  Wrench,
  BarChart3,
};

// Category configuration (matching OptionalServicesSelector)
const categoryConfig = {
  photography: {
    name: 'Fotografia Professionale',
    icon: 'Camera',
    gradient: { from: '#a855f7', to: '#ec4899' }, // purple-500 to pink-500
  },
  content: {
    name: 'Contenuti & Copywriting',
    icon: 'PenTool',
    gradient: { from: '#3b82f6', to: '#06b6d4' }, // blue-500 to cyan-500
  },
  integrations: {
    name: 'Integrazioni',
    icon: 'Wrench',
    gradient: { from: '#22c55e', to: '#10b981' }, // green-500 to emerald-500
  },
  marketing: {
    name: 'Marketing & SEO',
    icon: 'BarChart3',
    gradient: { from: '#f97316', to: '#ef4444' }, // orange-500 to red-500
  },
};

const CartSummaryStep4 = ({ selectedServices, onModifyConfiguration }: CartSummaryStep4Props) => {
  // Calculate total price
  const totalPrice = selectedServices.reduce((sum, s) => sum + Number(s.price), 0);

  // Get category data for each service
  const servicesWithCategory = selectedServices.map((service) => {
    const category = categoryConfig[service.category as keyof typeof categoryConfig];

    const IconComponent = category?.icon ? iconMap[category.icon] : null;

    return {
      ...service,
      categoryIcon: IconComponent,
      categoryGradient: category?.gradient || { from: '#6366f1', to: '#8b5cf6' },
      categoryName: category?.name || service.category || '',
    };
  });

  return (
    <motion.div
      className='relative rounded-xl overflow-hidden'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={48}
        inactiveZone={0.01}
        borderWidth={2}
      />

      <div className='relative rounded-xl p-6 bg-white/90 backdrop-blur-sm border border-color-default shadow-xl'>
        <div className='relative z-10'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent'>
              Riepilogo Ordine
            </h3>
            {selectedServices.length > 0 && (
              <div className='px-3 py-1 bg-gradient-to-r from-brand-secondary/20 to-brand-tertiary/20 rounded-full text-sm text-brand-secondary font-medium'>
                {selectedServices.length} servizi{selectedServices.length !== 1 ? '' : 'o'}
              </div>
            )}
          </div>

          <div className='space-y-3 mb-4'>
            {selectedServices.length === 0 ? (
              <div className='bg-color-subtle/80 rounded-lg p-8 border border-color-default'>
                <div className='flex flex-col items-center justify-center text-color-disabled'>
                  <motion.div
                    className='p-3 rounded-xl bg-color-muted mb-3'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <ShoppingCart className='w-6 h-6 text-color-disabled' />
                  </motion.div>
                  <p className='text-sm text-color-muted font-medium'>Nessun servizio selezionato</p>
                  <p className='text-xs text-color-disabled mt-1'>
                    Seleziona i servizi che desideri aggiungere
                  </p>
                </div>
              </div>
            ) : (
              servicesWithCategory.map((service, index) => (
                <motion.div
                  key={service.id}
                  className='flex items-center gap-3 p-3 rounded-lg bg-color-subtle/80 border border-color-default hover:shadow-md transition-shadow duration-200'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {service.categoryIcon && (
                    <motion.div
                      className='p-1.5 rounded-md bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10 text-brand-secondary'
                      style={{
                        background: `linear-gradient(135deg, ${service.categoryGradient.from}15, ${service.categoryGradient.to}08)`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <service.categoryIcon className='w-4 h-4' />
                    </motion.div>
                  )}

                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-color-primary text-sm'>{service.name}</p>
                    <p className='text-xs text-color-muted truncate'>{service.description}</p>
                  </div>

                  <motion.span
                    className='text-sm font-semibold text-brand-secondary'
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    €{service.price}
                  </motion.span>
                </motion.div>
              ))
            )}
          </div>

          <div className='border-t border-color-default pt-4'>
            <div className='flex items-center justify-between'>
              <span className='text-base font-medium text-color-primary'>Total</span>
              <motion.span
                className='text-xl font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                key={totalPrice}
              >
                €{totalPrice}
              </motion.span>
            </div>
            <p className='text-xs text-color-muted mt-1'>
              {selectedServices.length === 0 ? 'Nessun servizio' : 'Servizi selezionati'}
            </p>
          </div>

          <motion.button
            className='w-full mt-4 px-4 py-2 bg-white border-2 border-brand-secondary text-brand-secondary rounded-lg font-medium text-sm hover:bg-brand-secondary/10 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onModifyConfiguration}
          >
            <ArrowLeft className='w-4 h-4' />
            Modifica configurazione
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummaryStep4;
