'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, Shield, AlertTriangle, XCircle,
  CheckCircle2, RefreshCw, Activity, Server
} from 'lucide-react';

export default function SecurityThreatsSection() {
  const [activeTab, setActiveTab] = useState<'costs' | 'risks' | 'solutions'>('costs');

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
            <span className='text-apty-primary'>Security Threats</span> to Italian SMBs
          </h2>
          <p className='text-xl text-apty-text-secondary max-w-3xl mx-auto'>
            67% of breaches happen due to outdated software and poor maintenance
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
                Breach Costs
              </button>
              <button
                onClick={() => setActiveTab('risks')}
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === 'risks' 
                    ? 'bg-apty-primary text-apty-text-inverse' 
                    : 'text-apty-text-secondary hover:text-apty-text-primary'
                }`}
              >
                Common Risks
              </button>
              <button
                onClick={() => setActiveTab('solutions')}
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === 'solutions' 
                    ? 'bg-apty-primary text-apty-text-inverse' 
                    : 'text-apty-text-secondary hover:text-apty-text-primary'
                }`}
              >
                Prevention
              </button>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'costs' ? -20 : activeTab === 'risks' ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'costs' && (
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Average Breach Costs for Italian SMBs</h3>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between mb-2'>
                        <span className='text-apty-text-primary'>Ransomware Payment</span>
                        <span className='text-2xl font-bold text-apty-state-error'>€38-46K</span>
                      </div>
                      <div className='w-full bg-apty-bg-elevated rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-state-error to-apty-accent rounded-full' style={{ width: '65%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className='flex justify-between mb-2'>
                        <span className='text-apty-text-primary'>Recovery & Remediation</span>
                        <span className='text-2xl font-bold text-apty-secondary'>€20-45K</span>
                      </div>
                      <div className='w-full bg-apty-bg-elevated rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-secondary to-apty-primary rounded-full' style={{ width: '55%' }} />
                      </div>
                    </div>

                    <div>
                      <div className='flex justify-between mb-2'>
                        <span className='text-apty-text-primary'>Lost Revenue (6 months)</span>
                        <span className='text-2xl font-bold text-apty-tertiary'>€10-80K</span>
                      </div>
                      <div className='w-full bg-apty-bg-elevated rounded-full h-3'>
                        <div className='h-3 bg-gradient-to-r from-apty-tertiary to-apty-accent rounded-full' style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div className='mt-6 p-4 bg-apty-state-error/10 rounded-lg'>
                      <p className='text-sm text-apty-text-primary'>
                        <strong>Total Impact:</strong> €68,000-171,000 per breach + 20-35% customer trust loss
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Legal & Compliance Fines</h3>
                  <div className='space-y-6'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center gap-3 mb-2'>
                        <Lock className='w-5 h-5 text-apty-primary' />
                        <span className='font-semibold text-apty-text-primary'>GDPR Violations</span>
                      </div>
                      <div className='text-2xl font-bold text-apty-state-error mb-1'>€2,000-27,000</div>
                      <div className='text-sm text-apty-text-secondary'>Per violation for SMBs (up to €20M max)</div>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center gap-3 mb-2'>
                        <Shield className='w-5 h-5 text-apty-secondary' />
                        <span className='font-semibold text-apty-text-primary'>Codice Privacy</span>
                      </div>
                      <div className='text-2xl font-bold text-apty-state-error mb-1'>€10,000-120,000</div>
                      <div className='text-sm text-apty-text-secondary'>Data breach penalties</div>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center gap-3 mb-2'>
                        <AlertTriangle className='w-5 h-5 text-apty-tertiary' />
                        <span className='font-semibold text-apty-text-primary'>Cookie Law</span>
                      </div>
                      <div className='text-2xl font-bold text-apty-state-error mb-1'>Up to €120,000</div>
                      <div className='text-sm text-apty-text-secondary'>Incorrect consent mechanisms</div>
                    </div>

                    <div className='p-4 bg-apty-primary/10 rounded-lg'>
                      <p className='text-xs text-apty-text-primary'>
                        Lawsuits for privacy & downtime doubled 2022-2024, SMBs = 40% of cases
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risks' && (
              <div className='space-y-8'>
                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Most Common Website Issues Causing Business Disruption</h3>
                  <div className='grid md:grid-cols-3 gap-6'>
                    <div className='text-center p-4 bg-apty-bg-elevated rounded-lg'>
                      <XCircle className='w-8 h-8 text-apty-state-error mx-auto mb-2' />
                      <div className='text-lg font-bold text-apty-text-primary'>Broken Forms</div>
                      <div className='text-2xl font-bold text-apty-state-error my-2'>6-14%</div>
                      <div className='text-xs text-apty-text-secondary'>Annual occurrence</div>
                      <div className='text-sm font-semibold text-apty-primary mt-2'>€1,000-7,200</div>
                      <div className='text-xs text-apty-text-secondary'>Revenue loss per incident</div>
                    </div>
                    
                    <div className='text-center p-4 bg-apty-bg-elevated rounded-lg'>
                      <Lock className='w-8 h-8 text-apty-accent mx-auto mb-2' />
                      <div className='text-lg font-bold text-apty-text-primary'>SSL Expiry</div>
                      <div className='text-2xl font-bold text-apty-accent my-2'>10-18%</div>
                      <div className='text-xs text-apty-text-secondary'>Annual occurrence</div>
                      <div className='text-sm font-semibold text-apty-primary mt-2'>€2,000-5,000</div>
                      <div className='text-xs text-apty-text-secondary'>Trust & sales impact</div>
                    </div>

                    <div className='text-center p-4 bg-apty-bg-elevated rounded-lg'>
                      <AlertTriangle className='w-8 h-8 text-apty-secondary mx-auto mb-2' />
                      <div className='text-lg font-bold text-apty-text-primary'>Plugin Conflicts</div>
                      <div className='text-2xl font-bold text-apty-secondary my-2'>10-18%</div>
                      <div className='text-xs text-apty-text-secondary'>Annual occurrence</div>
                      <div className='text-sm font-semibold text-apty-primary mt-2'>€3,000-7,200</div>
                      <div className='text-xs text-apty-text-secondary'>Downtime costs</div>
                    </div>
                  </div>

                  <div className='mt-6 grid md:grid-cols-2 gap-6'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <h4 className='font-semibold text-apty-text-primary mb-3'>User Behavior Impact</h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>Bounce after errors</span>
                          <span className='font-bold text-apty-state-error'>53%</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>Trust erosion</span>
                          <span className='font-bold text-apty-state-error'>38%</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>Warn others</span>
                          <span className='font-bold text-apty-state-error'>14%</span>
                        </div>
                      </div>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <h4 className='font-semibold text-apty-text-primary mb-3'>Performance Thresholds</h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>3+ sec load</span>
                          <span className='font-bold text-apty-state-error'>-21-26% conversions</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>5+ sec load</span>
                          <span className='font-bold text-apty-state-error'>-45% conversions</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-apty-text-secondary'>First error</span>
                          <span className='font-bold text-apty-state-error'>28% abandon</span>
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
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Preventive Maintenance Schedule</h3>
                  <div className='space-y-4'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='font-semibold text-apty-text-primary'>Daily Tasks</span>
                        <RefreshCw className='w-5 h-5 text-apty-primary' />
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li>• Uptime monitoring (99.95% target)</li>
                        <li>• Backup verification (e-commerce)</li>
                        <li>• Security scan alerts</li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='font-semibold text-apty-text-primary'>Weekly Tasks</span>
                        <Activity className='w-5 h-5 text-apty-secondary' />
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li>• Plugin/theme updates check</li>
                        <li>• Performance metrics review</li>
                        <li>• Backup integrity test</li>
                        <li>• Error log analysis</li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='font-semibold text-apty-text-primary'>Monthly Tasks</span>
                        <Server className='w-5 h-5 text-apty-tertiary' />
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li>• CMS core updates (WordPress, etc.)</li>
                        <li>• SSL certificate check (3-month ahead)</li>
                        <li>• Full security audit</li>
                        <li>• SEO health check</li>
                        <li>• GDPR compliance review</li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-state-success/10 rounded-lg'>
                      <p className='text-sm text-apty-text-primary'>
                        <strong>Result:</strong> 95% of issues prevented, 99.95% uptime achieved
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-apty-bg-base rounded-2xl p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold text-apty-text-primary mb-6'>Maintenance Plan Comparison</h3>
                  <div className='space-y-4'>
                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex justify-between items-start mb-3'>
                        <div>
                          <div className='font-semibold text-apty-text-primary'>Basic Plan</div>
                          <div className='text-sm text-apty-text-secondary'>Brochure sites</div>
                        </div>
                        <div className='text-xl font-bold text-apty-primary'>€50-100/mo</div>
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                          Weekly backups
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                          Monthly updates
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-state-success' />
                          2-20hr recovery
                        </li>
                      </ul>
                    </div>

                    <div className='p-4 bg-gradient-to-br from-apty-primary/10 to-apty-secondary/10 rounded-lg border border-apty-primary'>
                      <div className='flex justify-between items-start mb-3'>
                        <div>
                          <div className='font-semibold text-apty-text-primary'>Professional</div>
                          <div className='text-sm text-apty-text-secondary'>Blog, small e-commerce</div>
                        </div>
                        <div className='text-xl font-bold text-apty-primary'>€120-280/mo</div>
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          Daily backups
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          Weekly security scans
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          4-8hr recovery
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-primary' />
                          Performance optimization
                        </li>
                      </ul>
                    </div>

                    <div className='p-4 bg-apty-bg-elevated rounded-lg'>
                      <div className='flex justify-between items-start mb-3'>
                        <div>
                          <div className='font-semibold text-apty-text-primary'>Enterprise</div>
                          <div className='text-sm text-apty-text-secondary'>Large e-commerce</div>
                        </div>
                        <div className='text-xl font-bold text-apty-tertiary'>€350-900/mo</div>
                      </div>
                      <ul className='space-y-1 text-sm text-apty-text-secondary'>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          Real-time backups
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          24/7 monitoring
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          1-4hr recovery
                        </li>
                        <li className='flex items-center gap-2'>
                          <CheckCircle2 className='w-4 h-4 text-apty-tertiary' />
                          Dedicated support
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
            Fonti: 
            <a href='https://www.clusit.it/rapporto-clusit/' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Clusit Report 2025</a>,
            <a href='https://www.agid.gov.it/it/sicurezza/cert-agid' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>CERT-AgID Italia</a>,
            <a href='https://www.polimi.it/osservatori' target='_blank' rel='noopener noreferrer' className='text-apty-primary hover:underline mx-1'>Politecnico Milano Cybersecurity</a>
          </p>
        </div>
      </div>
    </section>
  );
}