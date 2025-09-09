'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, Shield, AlertTriangle, XCircle,
  CheckCircle2, RefreshCw, Activity, Server
} from 'lucide-react';

export default function SecurityThreatsSection() {
  const [activeTab, setActiveTab] = useState<'costs' | 'risks' | 'solutions'>('costs');
  let initialX = -20;
  if (activeTab === 'risks') {
    initialX = 0;
  } else if (activeTab === 'solutions') {
    initialX = 20;
  }

  return (
    <section className='py-24 md:py-32 bg-apty-bg-subtle'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-[40px] md:text-[56px] leading-[1.2] font-bold font-apty-heading text-apty-text-primary mb-4'>
            <span className='text-apty-primary'>Minacce alla sicurezza</span> per le PMI italiane
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            Il 67% delle violazioni avviene a causa di software obsoleti e scarsa manutenzione
          </p>
        </motion.div>

        {/* Tabbed Content */}
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-center mb-12'>
            <div className='bg-apty-bg-base rounded-lg p-1 flex gap-1'>
              <button
                onClick={() => setActiveTab('costs')}
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === 'costs' 
                    ? 'bg-apty-primary text-apty-text-inverse' 
                    : 'text-apty-text-secondary hover:text-apty-text-primary'
                }`}
              >
                Costi delle violazioni
              </button>
              <button
                onClick={() => setActiveTab('risks')}
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === 'risks' 
                    ? 'bg-apty-primary text-apty-text-inverse' 
                    : 'text-apty-text-secondary hover:text-apty-text-primary'
                }`}
              >
                Rischi comuni
              </button>
              <button
                onClick={() => setActiveTab('solutions')}
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === 'solutions' 
                    ? 'bg-apty-primary text-apty-text-inverse' 
                    : 'text-apty-text-secondary hover:text-apty-text-primary'
                }`}
              >
                Prevenzione
              </button>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: initialX }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'costs' && (
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Costi medi delle violazioni per le PMI italiane</h3>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between mb-2'>
                        <span className='text-apty-text-primary'>Pagamento ransomware</span>
                        <span className='text-2xl font-bold text-apty-state-error'>€38-46K</span>
                      </div>
                      <div className='w-full bg-apty-bg-elevated rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-state-error to-apty-accent rounded-full' style={{ width: '65%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className='flex justify-between mb-2'>
                        <span className='text-apty-text-primary'>Ripristino e remediation</span>
                        <span className='text-2xl font-bold text-apty-secondary'>€20-45K</span>
                      </div>
                      <div className='w-full bg-apty-bg-elevated rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-secondary to-apty-primary rounded-full' style={{ width: '55%' }} />
                      </div>
                    </div>

                    <div>
                      <div className='flex justify-between mb-2'>
                        <span className='text-apty-text-primary'>Ricavi persi (6 mesi)</span>
                        <span className='text-2xl font-bold text-apty-tertiary'>€10-80K</span>
                      </div>
                      <div className='w-full bg-apty-bg-elevated rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-tertiary to-apty-accent rounded-full' style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div className='mt-6 p-4 bg-apty-state-error/10 rounded-lg'>
                      <p className='text-sm text-apty-text-primary'>
                        <strong>Impatto totale:</strong> €68.000-171.000 per violazione + 20-35% di perdita di fiducia dei clienti
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Sanzioni legali e di conformità</h3>
                  <div className='space-y-6'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center gap-3 mb-2'>
                        <Lock className='w-5 h-5 text-apty-primary' />
                        <span className='font-semibold text-apty-text-primary'>Violazioni GDPR</span>
                      </div>
                      <div className='text-2xl font-bold text-apty-state-error mb-1'>€2,000-27,000</div>
                      <div className='text-sm text-apty-text-secondary'>Per violazione per le PMI (fino a €20M max)</div>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center gap-3 mb-2'>
                        <Shield className='w-5 h-5 text-apty-secondary' />
                        <span className='font-semibold text-apty-text-primary'>Codice della privacy</span>
                      </div>
                      <div className='text-2xl font-bold text-apty-state-error mb-1'>€10,000-120,000</div>
                      <div className='text-sm text-apty-text-secondary'>Sanzioni per data breach</div>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center gap-3 mb-2'>
                        <AlertTriangle className='w-5 h-5 text-apty-tertiary' />
                        <span className='font-semibold text-apty-text-primary'>Legge sui cookie</span>
                      </div>
                      <div className='text-2xl font-bold text-apty-state-error mb-1'>Up to €120,000</div>
                      <div className='text-sm text-apty-text-secondary'>Meccanismi di consenso non corretti</div>
                    </div>

                    <div className='p-4 bg-apty-primary/10 rounded-lg'>
                      <p className='text-xs text-apty-text-primary'>
                        Le cause per privacy e downtime sono raddoppiate tra il 2022 e il 2024, le PMI rappresentano il 40% dei casi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risks' && (
              <div className='space-y-8'>
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Problemi web più comuni che causano interruzioni al business</h3>
                  <div className='grid md:grid-cols-3 gap-6'>
                    <div className='text-center p-4 bg-apty-bg-elevated rounded-lg'>
                      <XCircle className='w-8 h-8 text-apty-state-error mx-auto mb-2' />
                      <div className='text-lg font-bold text-apty-text-primary'>Form non funzionanti</div>
                      <div className='text-2xl font-bold text-apty-state-error my-2'>6-14%</div>
                      <div className='text-xs text-apty-text-secondary'>Frequenza annuale</div>
                      <div className='text-sm font-semibold text-apty-primary mt-2'>€1,000-7,200</div>
                      <div className='text-xs text-apty-text-secondary'>Perdita di ricavi per incidente</div>
                    </div>
                    
                    <div className='text-center p-4 bg-apty-bg-elevated rounded-lg'>
                      <Lock className='w-8 h-8 text-apty-accent mx-auto mb-2' />
                      <div className='text-lg font-bold text-apty-text-primary'>SSL scaduto</div>
                      <div className='text-2xl font-bold text-apty-accent my-2'>10-18%</div>
                      <div className='text-xs text-apty-text-secondary'>Frequenza annuale</div>
                      <div className='text-sm font-semibold text-apty-primary mt-2'>€2,000-5,000</div>
                      <div className='text-xs text-apty-text-secondary'>Impatto su fiducia e vendite</div>
                    </div>

                    <div className='text-center p-4 bg-apty-bg-elevated rounded-lg'>
                      <AlertTriangle className='w-8 h-8 text-apty-secondary mx-auto mb-2' />
                      <div className='text-lg font-bold text-apty-text-primary'>Conflitti tra plugin</div>
                      <div className='text-2xl font-bold text-apty-secondary my-2'>10-18%</div>
                      <div className='text-xs text-apty-text-secondary'>Frequenza annuale</div>
                      <div className='text-sm font-semibold text-apty-primary mt-2'>€3,000-7,200</div>
                      <div className='text-xs text-apty-text-secondary'>Costi di downtime</div>
                    </div>
                  </div>

                  <div className='mt-6 grid md:grid-cols-2 gap-6'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <h4 className='font-semibold text-apty-text-primary mb-3'>Impatto sul comportamento degli utenti</h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>Abbandono dopo errori</span>
                          <span className='font-bold text-apty-state-error'>53%</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>Erosione della fiducia</span>
                          <span className='font-bold text-apty-state-error'>38%</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>Avvisano altri</span>
                          <span className='font-bold text-apty-state-error'>14%</span>
                        </div>
                      </div>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <h4 className='font-semibold text-apty-text-primary mb-3'>Soglie di performance</h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>3+ sec di caricamento</span>
                          <span className='font-bold text-apty-state-error'>-21-26% conversioni</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>5+ sec di caricamento</span>
                          <span className='font-bold text-apty-state-error'>-45% conversioni</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>Primo errore</span>
                          <span className='font-bold text-apty-state-error'>28% abbandono</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'solutions' && (
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Piano di manutenzione preventiva</h3>
                  <div className='space-y-4'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='font-semibold text-apty-text-primary'>Attività giornaliere</span>
                        <RefreshCw className='w-5 h-5 text-apty-primary' />
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li>• Monitoraggio uptime (obiettivo 99,95%)</li>
                        <li>• Verifica dei backup (e-commerce)</li>
                        <li>• Avvisi scansioni di sicurezza</li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='font-semibold text-apty-text-primary'>Attività settimanali</span>
                        <Activity className='w-5 h-5 text-apty-secondary' />
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li>• Verifica aggiornamenti plugin/tema</li>
                        <li>• Revisione metriche di performance</li>
                        <li>• Test integrità dei backup</li>
                        <li>• Analisi dei log errori</li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='font-semibold text-apty-text-primary'>Attività mensili</span>
                        <Server className='w-5 h-5 text-apty-tertiary' />
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li>• Aggiornamenti core del CMS (WordPress, ecc.)</li>
                        <li>• Controllo certificato SSL (3 mesi in anticipo)</li>
                        <li>• Audit di sicurezza completo</li>
                        <li>• Verifica stato di salute SEO</li>
                        <li>• Revisione conformità GDPR</li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-state-success/10 rounded-lg'>
                      <p className='text-sm text-apty-text-primary'>
                        <strong>Risultato:</strong> prevenuto il 95% dei problemi, raggiunto il 99,95% di uptime
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Confronto dei piani di manutenzione</h3>
                  <div className='space-y-4'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex justify-between items-start mb-3'>
                        <div>
                          <div className='font-semibold text-apty-text-primary'>Piano Base</div>
                          <div className='text-sm text-apty-text-secondary'>Siti vetrina</div>
                        </div>
                        <div className='text-xl font-bold text-apty-primary'>€50-100/mese</div>
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                          Backup settimanali
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                          Aggiornamenti mensili
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                          Ripristino 2-20 ore
                        </li>
                      </ul>
                    </div>

                    <div className='p-4 bg-gradient-to-br from-apty-primary/10 to-apty-secondary/10 rounded-lg border border-apty-primary'>
                      <div className='flex justify-between items-start mb-3'>
                        <div>
                          <div className='font-semibold text-apty-text-primary'>Professional</div>
                          <div className='text-sm text-apty-text-secondary'>Blog, piccoli e-commerce</div>
                        </div>
                        <div className='text-xl font-bold text-apty-primary'>€120-280/mese</div>
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          Backup giornalieri
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          Scansioni di sicurezza settimanali
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          Ripristino 4-8 ore
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          Ottimizzazione delle performance
                        </li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex justify-between items-start mb-3'>
                        <div>
                          <div className='font-semibold text-apty-text-primary'>Enterprise</div>
                          <div className='text-sm text-apty-text-secondary'>Grandi e-commerce</div>
                        </div>
                        <div className='text-xl font-bold text-apty-tertiary'>€350-900/mese</div>
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          Backup in tempo reale
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          Monitoraggio 24/7
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          Ripristino 1-4 ore
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          Supporto dedicato
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Source Links */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-apty-text-secondary'>
            Fonti:{' '}
            <a href='https://www.clusit.it/rapporto-clusit/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline'>Clusit Report 2025</a>
            {' '}<span aria-hidden='true' className='mx-2'>•</span>{' '}
            <a href='https://www.agid.gov.it/it/sicurezza/cert-agid' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline'>CERT-AgID Italia</a>
            {' '}<span aria-hidden='true' className='mx-2'>•</span>{' '}
            <a href='https://www.polimi.it/osservatori' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline'>Politecnico Milano Cybersecurity</a>
          </p>
        </div>
      </div>
    </section>
  );
}