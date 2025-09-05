'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Download,
  Clock,
  Sparkles,
  User,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import types
import type { QuoteRequest, CompletionType } from '@/types/step4-quote-request';

import { formatDate, formatPhoneNumber } from '@/lib/step4-validation';

// =====================================
// COMPONENT VARIANTS FOR ANIMATIONS
// =====================================

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const iconVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
  },
};

// =====================================
// SUCCESS COMPONENT INTERFACES
// =====================================

interface Step4QuoteSuccessProps {
  quoteRequest: QuoteRequest;
  onBackToHome: () => void;
  onNewQuote: () => void;
  className?: string;
}

// =====================================
// MAIN SUCCESS COMPONENT
// =====================================

const Step4QuoteSuccess: React.FC<Step4QuoteSuccessProps> = ({
  quoteRequest,
  onBackToHome,
  onNewQuote,
  className,
}) => {
  // Determine the appropriate message based on quote status
  const getStatusMessage = () => {
    switch (quoteRequest.status) {
      case 'submitted':
        return {
          title: 'Preventivo Inviato con Successo!',
          subtitle: 'La tua richiesta è stata ricevuta e sarà processata a breve',
          icon: CheckCircle,
          color: 'green'
        };
      case 'under_review':
        return {
          title: 'Preventivo in Revisione',
          subtitle: 'Il nostro team sta analizzando la tua richiesta',
          icon: Clock,
          color: 'blue'
        };
      case 'accepted':
        return {
          title: 'Preventivo Accettato!',
          subtitle: 'Il tuo preventivo è stato approvato e stiamo procedendo',
          icon: CheckCircle,
          color: 'green'
        };
      default:
        return {
          title: 'Preventivo Registrato',
          subtitle: 'La tua richiesta è stata salvata',
          icon: FileText,
          color: 'gray'
        };
    }
  };

  const statusInfo = getStatusMessage();
  const getExpectedResponseTime = (completionType: CompletionType): string => {
    return completionType === 'complete_journey'
      ? 'entro 4 ore lavorative'
      : 'entro 24 ore lavorative';
  };

  const getNextSteps = (completionType: CompletionType): string[] => {
    if (completionType === 'complete_journey') {
      return [
        'Riceverai una conferma email entro 15 minuti',
        'Il nostro team analizzerà la tua richiesta dettagliata',
        "Ti contatteremo per confermare l'appuntamento",
        "Prepareremo un preventivo personalizzato per l'incontro",
      ];
    } else {
      return [
        'Riceverai una conferma email entro 15 minuti',
        'Il nostro AI analizzerà le tue esigenze',
        'Un consulente ti contatterà per un approfondimento',
        'Identificheremo insieme la soluzione ideale',
      ];
    }
  };

  const getEstimatedValue = (): string => {
    if (quoteRequest.pricingConfiguration) {
      return `€${quoteRequest.pricingConfiguration.totalCalculatedPriceEur.toLocaleString('it-IT')}`;
    }
    return 'Da definire';
  };

  const getScheduledMeeting = () => {
    if (quoteRequest.meetingRequest?.preferredSlots?.length > 0) {
      const firstSlot = quoteRequest.meetingRequest.preferredSlots[0];
      return {
        date: formatDate(firstSlot.date),
        time: firstSlot.timeSlot,
        type: quoteRequest.meetingRequest.meetingType === 'online' ? 'Video call' : 'Di persona',
      };
    }
    return null;
  };

  const scheduledMeeting = getScheduledMeeting();

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={cn('max-w-4xl mx-auto py-8', className)}
    >
      {/* Success Header */}
      <motion.div variants={itemVariants} className='text-center mb-12'>
        <motion.div
          variants={iconVariants}
          initial='initial'
          animate='animate'
          whileHover='hover'
          className={`mx-auto w-20 h-20 ${
            statusInfo.color === 'green' ? 'bg-color-state-success-subtle' :
            statusInfo.color === 'blue' ? 'bg-color-state-info-subtle' :
            'bg-color-muted'
          } rounded-full flex items-center justify-center mb-6`}
        >
          {React.createElement(statusInfo.icon, { 
            className: `w-12 h-12 ${
              statusInfo.color === 'green' ? 'text-color-state-success-strong' :
              statusInfo.color === 'blue' ? 'text-color-state-info-strong' :
              'text-color-tertiary'
            }` 
          })}
        </motion.div>

        <motion.h1 variants={itemVariants} className='text-4xl font-bold text-color-primary mb-4'>
          {statusInfo.title}
        </motion.h1>

        <motion.p variants={itemVariants} className='text-xl text-color-tertiary max-w-2xl mx-auto'>
          {statusInfo.subtitle}
          {quoteRequest.status === 'submitted' && (
            <> Ti risponderemo {getExpectedResponseTime(quoteRequest.completionType)}.</>
          )}
        </motion.p>
      </motion.div>

      {/* Quote Summary Card */}
      <motion.div
        variants={itemVariants}
        className='bg-white rounded-2xl shadow-lg border border-color-subtle overflow-hidden mb-8'
      >
        <div className='bg-gradient-to-r from-brand-secondary/90 to-brand-tertiary px-8 py-6'>
          <div className='flex items-center justify-between text-white'>
            <div>
              <h2 className='text-2xl font-bold mb-1'>{quoteRequest.userData?.companyName || 'Nome Azienda'}</h2>
              <p className='text-brand-secondary/20'>Richiesta #{quoteRequest.quoteId}</p>
            </div>
            <motion.div variants={pulseVariants} animate='pulse' className='text-right'>
              <div className='text-sm text-brand-secondary/20 mb-1'>Valore stimato</div>
              <div className='text-3xl font-bold'>{getEstimatedValue()}</div>
            </motion.div>
          </div>
        </div>

        <div className='p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Contact Information */}
            <div>
              <h3 className='text-lg font-semibold text-color-primary mb-4 flex items-center'>
                <User className='w-5 h-5 mr-2 text-brand-secondary' />
                Contatto
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center text-color-tertiary'>
                  <Mail className='w-4 h-4 mr-3 text-color-disabled' />
                  <span>{quoteRequest.userData?.email || 'Email non fornita'}</span>
                </div>
                <div className='flex items-center text-color-tertiary'>
                  <Phone className='w-4 h-4 mr-3 text-color-disabled' />
                  <span>{formatPhoneNumber(quoteRequest.userData?.phone || '')}</span>
                </div>
                {quoteRequest.userData?.websiteUrl && (
                  <div className='flex items-center text-color-tertiary'>
                    <Sparkles className='w-4 h-4 mr-3 text-color-disabled' />
                    <span className='truncate'>{quoteRequest.userData?.websiteUrl}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className='text-lg font-semibold text-color-primary mb-4 flex items-center'>
                <FileText className='w-5 h-5 mr-2 text-brand-secondary' />
                Progetto
              </h3>
              <div className='space-y-3'>
                <div>
                  <span className='text-sm text-color-muted'>Tipo di attività</span>
                  <p className='text-color-primary font-medium'>
                    {quoteRequest.projectDetails?.restaurantType || 'Non specificato'}
                  </p>
                </div>
                <div>
                  <span className='text-sm text-color-muted'>Timeline</span>
                  <p className='text-color-primary font-medium'>
                    {quoteRequest.projectDetails?.timeline === 'asap'
                      ? 'Il prima possibile'
                      : quoteRequest.projectDetails?.timeline === 'flexible'
                        ? 'Flessibile'
                        : quoteRequest.projectDetails?.specificDeadline
                          ? `Entro ${formatDate(quoteRequest.projectDetails.specificDeadline)}`
                          : 'Non specificato'}
                  </p>
                </div>
              </div>
            </div>

            {/* Meeting Information */}
            <div>
              <h3 className='text-lg font-semibold text-color-primary mb-4 flex items-center'>
                <Calendar className='w-5 h-5 mr-2 text-brand-secondary' />
                Incontro
              </h3>
              {scheduledMeeting ? (
                <div className='space-y-3'>
                  <div>
                    <span className='text-sm text-color-muted'>Data preferita</span>
                    <p className='text-color-primary font-medium'>{scheduledMeeting.date}</p>
                  </div>
                  <div>
                    <span className='text-sm text-color-muted'>Orario</span>
                    <p className='text-color-primary font-medium'>{scheduledMeeting.time}</p>
                  </div>
                  <div>
                    <span className='text-sm text-color-muted'>Modalità</span>
                    <p className='text-color-primary font-medium'>{scheduledMeeting.type}</p>
                  </div>
                </div>
              ) : (
                <p className='text-color-muted'>Da programmare</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        variants={itemVariants}
        className='bg-white rounded-2xl shadow-lg border border-color-subtle p-8 mb-8'
      >
        <h2 className='text-2xl font-bold text-color-primary mb-6 flex items-center'>
          <Clock className='w-6 h-6 mr-3 text-brand-secondary' />
          Prossimi Passi
        </h2>

        <div className='space-y-4'>
          {getNextSteps(quoteRequest.completionType).map((step, index) => (
            <motion.div key={index} variants={itemVariants} className='flex items-start space-x-4'>
              <div className='flex-shrink-0 w-8 h-8 bg-brand-secondary/20 rounded-full flex items-center justify-center'>
                <span className='text-sm font-semibold text-brand-secondary'>{index + 1}</span>
              </div>
              <p className='text-color-secondary pt-1'>{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Important Information */}
      <motion.div
        variants={itemVariants}
        className='bg-color-state-info-bg border border-color-state-info-border rounded-2xl p-6 mb-8'
      >
        <div className='flex items-start space-x-3'>
          <MessageSquare className='w-6 h-6 text-color-state-info-strong flex-shrink-0 mt-1' />
          <div>
            <h3 className='text-lg font-semibold text-blue-900 mb-2'>Informazioni Importante</h3>
            <div className='text-color-state-info-text space-y-2'>
              <p>• Controlla la tua email (anche lo spam) per la conferma di ricezione</p>
              <p>
                • Il nostro team ti contatterà al numero{' '}
                {formatPhoneNumber(quoteRequest.userData?.phone || '')}
                 per confermare l'appuntamento
              </p>
              <p>• Se hai domenze urgenti, puoi contattarci direttamente al +39 123 456 7890</p>
              {quoteRequest.completionType === 'ai_assisted_skip' && (
                <p>• Durante la chiamata, discuteremo le opzioni più adatte alle tue esigenze</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className='flex flex-col sm:flex-row gap-4 justify-center'
      >
        <button
          onClick={onBackToHome}
          className='flex items-center justify-center px-8 py-3 bg-brand-secondary text-white rounded-lg hover:bg-brand-secondary transition-colors font-medium'
        >
          <ArrowRight className='w-4 h-4 mr-2' />
          Torna alla Home
        </button>

        <button
          onClick={onNewQuote}
          className='flex items-center justify-center px-8 py-3 border border-color-strong text-color-secondary rounded-lg hover:bg-color-subtle transition-colors font-medium'
        >
          Nuova Richiesta
        </button>

        <button
          onClick={() => window.print()}
          className='flex items-center justify-center px-6 py-3 text-color-tertiary bg-color-muted rounded-lg hover:bg-color-muted transition-colors font-medium'
        >
          <Download className='w-4 h-4 mr-2' />
          Stampa Riepilogo
        </button>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className='text-center mt-12 pt-8 border-t border-color-default'
      >
        <p className='text-color-muted'>
          Hai domande? Contattaci a{' '}
          <a
            href='mailto:info@webagency.it'
            className='text-brand-secondary hover:text-brand-secondary font-medium'
          >
            info@webagency.it
          </a>{' '}
          o al{' '}
          <a href='tel:+39123456789' className='text-brand-secondary hover:text-brand-secondary font-medium'>
            +39 123 456 7890
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Step4QuoteSuccess;
