'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  Star, 
  TrendingUp, 
  ArrowRight,
  Lightbulb,
  Target,
  Edit3,
  RotateCcw
} from 'lucide-react';
import { RecommendationDisplayProps } from '@/types/pricing';
//import { cn } from '@/lib/utils';

export default function RecommendationDisplay({
  recommendation,
  onAccept,
  onModify,
  onStartOver
}: RecommendationDisplayProps) {
  const { 
    matchedPersona, 
    recommendedTier, 
    recommendedPackage, 
    optionalServices,
    totalEstimate,
    confidence,
    reasoning,
    alternatives
  } = recommendation;

  // const monthlyServices = optionalServices.filter(service => service.unit === 'monthly');
  // const oneTimeServices = optionalServices.filter(service => service.unit !== 'monthly');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-color-state-success-subtle text-color-state-success-text px-4 py-2 rounded-full mb-4">
          <Target className="w-5 h-5" />
          <span className="font-medium">Raccomandazione Personalizzata</span>
        </div>
        
        <h2 className="text-3xl font-bold text-color-primary mb-2">
          Ecco la Soluzione Perfetta per Te!
        </h2>
        <p className="text-xl text-color-tertiary">
          Basata sul tuo profilo: <span className="font-semibold text-brand-secondary">{matchedPersona.name}</span>
        </p>
      </motion.div>

      {/* Confidence Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-color-state-success-border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-color-state-success rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-color-primary">
                Compatibilità: {confidence}%
              </h3>
              <p className="text-color-tertiary">
                Questa soluzione è perfetta per le tue esigenze
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-color-state-success-strong">
              {confidence}%
            </div>
            <div className="text-sm text-color-muted">
              Match Score
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border-2 border-brand-secondary/30 overflow-hidden"
      >
        {/* Recommended Package Header */}
        <div className="bg-gradient-to-r from-brand-secondary via-brand-tertiary to-brand-accent p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  Raccomandato per te
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                {recommendedTier.name} - {recommendedPackage.name}
              </h3>
              <p className="text-white/90 text-lg">
                {recommendedTier.tagline}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold">
                €{recommendedPackage.price.toLocaleString()}
              </div>
              <div className="text-white/80">
                una tantum
              </div>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Core Features */}
            <div>
              <h4 className="text-lg font-semibold text-color-primary mb-4">
                Cosa Include:
              </h4>
              <div className="space-y-3">
                {recommendedPackage.coreFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-color-state-success mt-0.5 flex-shrink-0" />
                    <span className="text-color-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Stats */}
            <div>
              <h4 className="text-lg font-semibold text-color-primary mb-4">
                Dettagli del Progetto:
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-color-subtle rounded-lg p-3">
                  <div className="text-2xl font-bold text-color-primary">
                    {recommendedPackage.pages}
                  </div>
                  <div className="text-sm text-color-tertiary">Pagine</div>
                </div>
                <div className="bg-color-subtle rounded-lg p-3">
                  <div className="text-2xl font-bold text-color-primary">
                    {recommendedPackage.revisions}
                  </div>
                  <div className="text-sm text-color-tertiary">Revisioni</div>
                </div>
                <div className="bg-color-subtle rounded-lg p-3">
                  <div className="text-sm font-medium text-color-primary">
                    ⏰ {recommendedPackage.timeline}
                  </div>
                  <div className="text-xs text-color-tertiary">Consegna</div>
                </div>
                <div className="bg-color-subtle rounded-lg p-3">
                  <div className="text-sm font-medium text-color-primary">
                    🆘 {recommendedPackage.support}
                  </div>
                  <div className="text-xs text-color-tertiary">Supporto</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Choice */}
          <div className="bg-color-state-info-bg rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-color-state-info-strong mt-1" />
              <div>
                <h4 className="font-semibold text-color-primary mb-2">
                  Perché è perfetto per te:
                </h4>
                <ul className="space-y-1">
                  {reasoning.map((reason, index) => (
                    <li key={index} className="text-color-secondary text-sm">
                      • {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Optional Services */}
      {optionalServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-color-default p-6"
        >
          <h3 className="text-xl font-semibold text-color-primary mb-4">
            Servizi Aggiuntivi Consigliati
          </h3>
          <p className="text-color-tertiary mb-6">
            Questi servizi opzionali possono migliorare ulteriormente i tuoi risultati
          </p>

          <div className="grid gap-4">
            {optionalServices.map((service) => (
              <div key={service.id} className="bg-color-subtle rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-color-primary">
                        {service.name}
                      </h4>
                      {service.popular && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Popolare
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-color-tertiary mb-2">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="font-bold text-color-primary">
                      €{service.price}
                    </div>
                    {service.unit && (
                      <div className="text-xs text-color-muted">
                        /{service.unit === 'monthly' ? 'mese' : service.unit}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Total Estimate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Riepilogo Investimento</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-color-disabled mb-1">Pacchetto Base</div>
            <div className="text-2xl font-bold">
              €{totalEstimate.base.toLocaleString()}
            </div>
            <div className="text-sm text-color-disabled">una tantum</div>
          </div>
          
          {totalEstimate.withRecommendedOptions > totalEstimate.base && (
            <div>
              <div className="text-sm text-color-disabled mb-1">Con Opzionali</div>
              <div className="text-2xl font-bold text-green-400">
                €{totalEstimate.withRecommendedOptions.toLocaleString()}
              </div>
              <div className="text-sm text-color-disabled">una tantum</div>
            </div>
          )}
          
          {totalEstimate.monthly && (
            <div>
              <div className="text-sm text-color-disabled mb-1">Servizi Mensili</div>
              <div className="text-2xl font-bold text-blue-400">
                €{totalEstimate.monthly.toLocaleString()}
              </div>
              <div className="text-sm text-color-disabled">al mese</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Alternative Options */}
      {alternatives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-color-default p-6"
        >
          <h3 className="text-xl font-semibold text-color-primary mb-4">
            Alternative da Considerare
          </h3>
          
          <div className="grid gap-4">
            {alternatives.map((alt, index) => (
              <div key={index} className="border border-color-default rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-color-primary mb-1">
                      {alt.tier.name} - {alt.package.name}
                    </h4>
                    <p className="text-sm text-color-tertiary mb-2">
                      {alt.reason}
                    </p>
                    <div className="text-sm text-color-muted">
                      {alt.package.description}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-color-primary">
                      €{alt.package.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-color-muted">una tantum</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 pt-6"
      >
        <button
          onClick={onAccept}
          className="flex-1 bg-gradient-to-r from-brand-secondary to-brand-tertiary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-brand-secondary hover:to-brand-tertiary transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          Perfetto! Procediamo
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={onModify}
          className="flex-1 bg-white border-2 border-color-strong text-color-secondary px-6 py-4 rounded-xl font-medium hover:border-brand-secondary/40 hover:text-brand-secondary transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Edit3 className="w-5 h-5" />
          Personalizza
        </button>
        
        <button
          onClick={onStartOver}
          className="px-6 py-4 text-color-tertiary hover:text-color-primary font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Ricomincia
        </button>
      </motion.div>
    </div>
  );
} 