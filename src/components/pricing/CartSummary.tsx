'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles, ChevronRight } from 'lucide-react';
import type { OptionalServiceWithAvailability as ApiOptionalService } from '@/types/database-extended';
import { GlowingEffect } from '@/components/ui/GlowingEffect';

interface CartSummaryProps {
  totalPrice: number;
  selectedCount: number;
  onProceed?: () => void;
  selectedServices?: ApiOptionalService[];
  onPersonaMatcherOpen?: () => void;
}

const CartSummary = ({
  totalPrice,
  selectedCount,
  onProceed,
  selectedServices = [],
  onPersonaMatcherOpen,
}: CartSummaryProps) => {
  return (
    <>
      {/* AI Assistant Button - Original styling */}
      {onPersonaMatcherOpen && (
        <motion.div
          className='relative rounded-xl overflow-hidden'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <GlowingEffect
            spread={30}
            glow={false}
            disabled={true}
            proximity={48}
            inactiveZone={0.01}
            borderWidth={2}
          />

          <motion.button
            className='relative w-full rounded-xl p-6 bg-white/90 backdrop-blur-sm border border-color-default shadow-xl text-left transition-all duration-300 hover:shadow-2xl group'
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPersonaMatcherOpen}
          >
            <div className='flex items-center gap-4'>
              <motion.div
                className='p-3 rounded-xl bg-gradient-to-br from-brand-secondary/10 to-brand-tertiary/10'
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className='w-6 h-6 text-brand-secondary' />
              </motion.div>

              <div className='flex-1'>
                <h3 className='text-lg font-bold bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent bg-clip-text text-transparent mb-1'>
                  Assistente AI
                </h3>
                <p className='text-sm text-color-tertiary'>
                  Non sei sicuro su cosa scegliere? Chiedi all&apos;AI
                </p>
              </div>

              <motion.div
                className='text-brand-secondary opacity-70 group-hover:opacity-100 transition-opacity duration-200'
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronRight className='w-5 h-5' />
              </motion.div>
            </div>

            {/* Subtle gradient overlay on hover */}
            <motion.div
              className='absolute inset-0 rounded-xl bg-gradient-to-r from-brand-secondary/10 via-brand-tertiary/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.button>
        </motion.div>
      )}

      {/* Riepilogo Ordine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white rounded-xl border-2 border-brand-secondary/30 p-6 shadow-lg'
      >
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-color-primary flex items-center'>
            <Sparkles className='w-5 h-5 text-brand-secondary mr-2' />
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
            selectedServices.map((service, index) => (
              <motion.div
                key={service.id}
                className='flex items-center gap-3 p-3 rounded-lg bg-color-subtle/80 border border-color-default hover:shadow-md transition-shadow duration-200'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
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
          className='w-full mt-4 px-4 py-3 bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent text-white rounded-lg font-medium hover:from-brand-secondary hover:via-brand-tertiary hover:to-brand-accent transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onProceed}
          disabled={selectedCount === 0}
        >
          {selectedCount === 0 ? 'Seleziona almeno un servizio' : 'Procedi con l&apos;ordine'}
        </motion.button>
      </motion.div>
    </>
  );
};

export { CartSummary };
