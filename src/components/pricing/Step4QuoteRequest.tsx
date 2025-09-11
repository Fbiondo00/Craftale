'use client';

import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Building,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  MessageSquare,
  AlertCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CartSummaryStep4 from './CartSummaryStep4';
import type { OptionalServiceWithAvailability as OptionalService } from '@/types/database-extended';

// Import types and validation
import type {
  QuoteRequest,
  //QuoteFormProps,
  StepComponentProps,
  CompletionType,
  UserData,
  ProjectDetails,
  MeetingRequest,
  PreferredSlot,
  FormValidationError,
  TimelineUrgency,
  MeetingType,
  QuoteFormState,
  //PricingConfiguration,
} from '@/types/step4-quote-request';

import {
  RESTAURANT_TYPE_LABELS,
  //ITALIAN_PROVINCES,
  BUDGET_RANGES,
  AVAILABLE_TIME_SLOTS,
} from '@/types/step4-quote-request';

import {
  validateUserData,
  validateProjectDetails,
  validateMeetingRequest,
  // validateStep,
  // formatPrice,
  // formatDate,
  // formatPhoneNumber,
} from '@/lib/step4-validation';

// =====================================
// GLOWING EFFECT COMPONENT
// =====================================

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: 'default' | 'white';
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = 'default',
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty('--active', '0');
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty('--active', isActive ? '1' : '0');

          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty('--start', String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener('scroll', handleScroll, { passive: true });
      document.body.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('scroll', handleScroll);
        document.body.removeEventListener('pointermove', handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            'pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity',
            glow && 'opacity-100',
            variant === 'white' && 'border-white',
            disabled && '!block'
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              '--blur': `${blur}px`,
              '--spread': spread,
              '--start': '0',
              '--active': '0',
              '--glowingeffect-border-width': `${borderWidth}px`,
              '--repeating-conic-gradient-times': '5',
              '--gradient':
                variant === 'white'
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #4f46e5 10%, #4f46e500 20%),
                radial-gradient(circle at 40% 40%, #9333ea 5%, #9333ea00 15%),
                radial-gradient(circle at 60% 60%, #ec4899 10%, #ec489900 20%), 
                radial-gradient(circle at 40% 60%, #4f46e5 10%, #4f46e500 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #4f46e5 0%,
                  #9333ea calc(25% / var(--repeating-conic-gradient-times)),
                  #ec4899 calc(50% / var(--repeating-conic-gradient-times)), 
                  #4f46e5 calc(75% / var(--repeating-conic-gradient-times)),
                  #4f46e5 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity',
            glow && 'opacity-100',
            blur > 0 && 'blur-[var(--blur)] ',
            className,
            disabled && '!hidden'
          )}
        >
          <div
            className={cn(
              'glow',
              'rounded-[inherit]',
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              'after:[border:var(--glowingeffect-border-width)_solid_transparent]',
              'after:[background:var(--gradient)] after:[background-attachment:fixed]',
              'after:opacity-[var(--active)] after:transition-opacity after:duration-300',
              'after:[mask-clip:padding-box,border-box]',
              'after:[mask-composite:intersect]',
              'after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]'
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = 'GlowingEffect';

// =====================================
// SERVICE INTERFACES
// =====================================

// =====================================
// COMPONENT VARIANTS FOR ANIMATIONS
// =====================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const iconVariants = {
  idle: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.95 },
};

// =====================================
// SERVICE TOGGLE CARD COMPONENT
// =====================================

// =====================================
// AI GUIDANCE BUTTON COMPONENT
// =====================================

// =====================================
// CART SUMMARY COMPONENT - REMOVED
// =====================================

// =====================================
// STEP 1: USER DATA COMPONENT
// =====================================

interface UserDataStepProps extends StepComponentProps {
  isUserAuthenticated?: boolean;
}

const UserDataStep: React.FC<UserDataStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  errors = [],
  isUserAuthenticated = false,
}) => {
  const [formData, setFormData] = useState<Partial<UserData>>(data.userData || {});
  const [localErrors, setLocalErrors] = useState<FormValidationError[]>([]);

  const handleInputChange = (field: keyof UserData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate({ userData: updatedData as UserData });

    // Clear field-specific errors when user starts typing
    setLocalErrors((prev) => prev.filter((error) => error.field !== field));
  };

  const handleNext = () => {
    const validationErrors = validateUserData(formData);
    if (validationErrors.length === 0) {
      onNext();
    } else {
      setLocalErrors(validationErrors);
    }
  };

  const allErrors = [...errors, ...localErrors];
  const getFieldError = (field: string) =>
    allErrors.find((error) => error.field === field)?.message;

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='space-y-8'
    >
      <div className='text-center'>
        <motion.div
          variants={iconVariants}
          initial='idle'
          whileHover='hover'
          whileTap='tap'
          className='mx-auto w-16 h-16 bg-brand-secondary/20 rounded-2xl flex items-center justify-center mb-4'
        >
          <User className='w-8 h-8 text-brand-secondary' />
        </motion.div>
        <h2 className='text-3xl font-bold text-color-primary mb-2'>I Tuoi Dati</h2>
        <p className='text-color-tertiary max-w-2xl mx-auto'>
          Iniziamo con le tue informazioni di contatto per poterti fornire un preventivo
          personalizzato.
        </p>
      </div>

      <div className='bg-white rounded-2xl shadow-lg border border-color-subtle p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* First Name */}
          <div>
            <label className='block text-sm font-medium text-color-secondary mb-2'>Nome *</label>
            <input
              type='text'
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={isUserAuthenticated && !!formData.firstName}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                getFieldError('firstName') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong',
                isUserAuthenticated &&
                  formData.firstName &&
                  'bg-color-subtle cursor-not-allowed text-color-muted'
              )}
              placeholder='Il tuo nome'
            />
            {getFieldError('firstName') && (
              <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('firstName')}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className='block text-sm font-medium text-color-secondary mb-2'>Cognome *</label>
            <input
              type='text'
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={isUserAuthenticated && !!formData.lastName}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                getFieldError('lastName') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong',
                isUserAuthenticated &&
                  formData.lastName &&
                  'bg-color-subtle cursor-not-allowed text-color-muted'
              )}
              placeholder='Il tuo cognome'
            />
            {getFieldError('lastName') && (
              <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('lastName')}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-color-secondary mb-2'>Email *</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-color-disabled' />
              <input
                type='email'
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isUserAuthenticated && !!formData.email}
                className={cn(
                  'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                  getFieldError('email') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong',
                  isUserAuthenticated &&
                    formData.email &&
                    'bg-color-subtle cursor-not-allowed text-color-muted'
                )}
                placeholder='la.tua@email.it'
              />
            </div>
            {getFieldError('email') && (
              <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('email')}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className='block text-sm font-medium text-color-secondary mb-2'>Telefono *</label>
            <div className='relative'>
              <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-color-disabled' />
              <input
                type='tel'
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={cn(
                  'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                  getFieldError('phone') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong'
                )}
                placeholder='+39 123 456 7890'
              />
            </div>
            {getFieldError('phone') && (
              <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('phone')}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className='md:col-span-2'>
            <label className='block text-sm font-medium text-color-secondary mb-2'>
              Nome Ristorante/Azienda *
            </label>
            <div className='relative'>
              <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-color-disabled' />
              <input
                type='text'
                value={formData.companyName || ''}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={cn(
                  'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                  getFieldError('companyName') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong'
                )}
                placeholder='Il nome del tuo ristorante'
              />
            </div>
            {getFieldError('companyName') && (
              <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('companyName')}
              </p>
            )}
          </div>

          {/* Optional P.IVA */}
          <div>
            <label className='block text-sm font-medium text-color-secondary mb-2'>
              P.IVA (opzionale)
            </label>
            <input
              type='text'
              value={formData.companyVat || ''}
              onChange={(e) => handleInputChange('companyVat', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                getFieldError('companyVat') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong'
              )}
              placeholder='IT12345678901'
            />
            {getFieldError('companyVat') && (
              <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('companyVat')}
              </p>
            )}
          </div>

          {/* Optional Website */}
          <div>
            <label className='block text-sm font-medium text-color-secondary mb-2'>
              Sito Web Attuale (opzionale)
            </label>
            <input
              type='url'
              value={formData.websiteUrl || ''}
              onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                getFieldError('websiteUrl') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong'
              )}
              placeholder='https://www.tuosito.it'
            />
            {getFieldError('websiteUrl') && (
              <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('websiteUrl')}
              </p>
            )}
          </div>
        </div>

        <div className='flex justify-between mt-8 pt-6 border-t border-color-subtle'>
          <button
            onClick={onPrevious}
            className='flex items-center px-6 py-3 text-color-tertiary bg-color-muted rounded-lg hover:bg-color-muted transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Indietro
          </button>

          <button
            onClick={handleNext}
            className='flex items-center px-8 py-3 bg-brand-secondary text-white rounded-lg hover:bg-brand-secondary transition-colors'
          >
            Continua
            <ArrowRight className='w-4 h-4 ml-2' />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// =====================================
// STEP 2: PROJECT DETAILS COMPONENT (Enhanced with Services)
// =====================================

const ProjectDetailsStep: React.FC<StepComponentProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  errors = [],
}) => {
  const [formData, setFormData] = useState<Partial<ProjectDetails>>(data.projectDetails || {});
  const [localErrors, setLocalErrors] = useState<FormValidationError[]>([]);
  // Hydration-safe today's date string for min attributes
  const [todayStr, setTodayStr] = useState<string>('');
  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0]);
  }, []);

  // Enhanced services state - removed (no longer needed)

  const handleInputChange = (field: keyof ProjectDetails, value: string | string[]) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate({ projectDetails: updatedData as ProjectDetails });

    setLocalErrors((prev) => prev.filter((error) => error.field !== field));
  };

  // Service toggle handlers removed - no longer needed

  const handleNext = () => {
    const validationErrors = validateProjectDetails(formData);
    if (validationErrors.length === 0) {
      onNext();
    } else {
      setLocalErrors(validationErrors);
    }
  };

  const allErrors = [...errors, ...localErrors];
  const getFieldError = (field: string) =>
    allErrors.find((error) => error.field === field)?.message;

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='space-y-8'
    >
      <div className='text-center'>
        <motion.div
          variants={iconVariants}
          initial='idle'
          whileHover='hover'
          whileTap='tap'
          className='mx-auto w-16 h-16 bg-brand-secondary/20 rounded-2xl flex items-center justify-center mb-4'
        >
          <FileText className='w-8 h-8 text-brand-secondary' />
        </motion.div>
        <h2 className='text-3xl font-bold text-color-primary mb-2'>Dettagli del Progetto</h2>
        <p className='text-color-tertiary max-w-2xl mx-auto'>
          Raccontaci di più sul tuo ristorante e su cosa vorresti ottenere dal nuovo sito web.
        </p>
      </div>

      {/* Project Details Container */}
      <div className='bg-white rounded-2xl shadow-lg border border-color-subtle p-8 space-y-6'>
        {/* Restaurant Type */}
        <div>
          <label className='block text-sm font-medium text-color-secondary mb-3'>
            Che tipo di ristorante è? *
          </label>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {Object.entries(RESTAURANT_TYPE_LABELS).map(([value, label]) => (
              <label key={value} className='relative'>
                <input
                  type='radio'
                  value={value}
                  checked={formData.restaurantType === value}
                  onChange={(e) => handleInputChange('restaurantType', e.target.value)}
                  className='sr-only'
                />
                <div
                  className={cn(
                    'p-4 border-2 rounded-lg cursor-pointer transition-all',
                    formData.restaurantType === value
                      ? 'border-brand-secondary/90 bg-brand-secondary/10 text-brand-secondary'
                      : 'border-color-default hover:border-brand-secondary/40'
                  )}
                >
                  <span className='font-medium'>{label}</span>
                  {formData.restaurantType === value && (
                    <Check className='w-5 h-5 text-brand-secondary float-right' />
                  )}
                </div>
              </label>
            ))}
          </div>
          {getFieldError('restaurantType') && (
            <p className='mt-2 text-sm text-color-state-error-strong flex items-center'>
              <AlertCircle className='w-4 h-4 mr-1' />
              {getFieldError('restaurantType')}
            </p>
          )}
        </div>
      </div>

      {/* Additional Project Details Container */}
      <div className='bg-white rounded-2xl shadow-lg border border-color-subtle p-8 space-y-6'>
        {/* Timeline */}
        <div>
          <label className='block text-sm font-medium text-color-secondary mb-3'>
            Quando vorresti avere il sito pronto? *
          </label>
          <div className='space-y-3'>
            {[
              { value: 'asap', label: 'Il prima possibile', desc: 'Entro 2-3 settimane' },
              { value: 'flexible', label: 'Sono flessibile', desc: 'Entro 4-6 settimane' },
              { value: 'specific_date', label: 'Ho una data specifica', desc: 'Scegli la data' },
            ].map((option) => (
              <label key={option.value} className='relative'>
                <input
                  type='radio'
                  value={option.value}
                  checked={formData.timeline === option.value}
                  onChange={(e) => handleInputChange('timeline', e.target.value as TimelineUrgency)}
                  className='sr-only'
                />
                <div
                  className={cn(
                    'p-4 border-2 rounded-lg cursor-pointer transition-all',
                    formData.timeline === option.value
                      ? 'border-brand-secondary/90 bg-brand-secondary/10 text-brand-secondary'
                      : 'border-color-default hover:border-brand-secondary/40'
                  )}
                >
                  <div className='flex justify-between items-center'>
                    <div>
                      <span className='font-medium'>{option.label}</span>
                      <p className='text-sm text-color-muted mt-1'>{option.desc}</p>
                    </div>
                    {formData.timeline === option.value && (
                      <Check className='w-5 h-5 text-brand-secondary' />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {formData.timeline === 'specific_date' && (
            <div className='mt-4'>
              <label className='block text-sm font-medium text-color-secondary mb-2'>
                Data desiderata
              </label>
              <input
                type='date'
                value={formData.specificDeadline || ''}
                onChange={(e) => handleInputChange('specificDeadline', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors',
                  getFieldError('specificDeadline') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong'
                )}
                min={todayStr || undefined}
              />
              {getFieldError('specificDeadline') && (
                <p className='mt-1 text-sm text-color-state-error-strong flex items-center'>
                  <AlertCircle className='w-4 h-4 mr-1' />
                  {getFieldError('specificDeadline')}
                </p>
              )}
            </div>
          )}

          {getFieldError('timeline') && (
            <p className='mt-2 text-sm text-color-state-error-strong flex items-center'>
              <AlertCircle className='w-4 h-4 mr-1' />
              {getFieldError('timeline')}
            </p>
          )}
        </div>

        {/* Budget Flexibility */}
        <div>
          <label className='block text-sm font-medium text-color-secondary mb-3'>
            Flessibilità di budget *
          </label>
          <div className='space-y-3'>
            {BUDGET_RANGES.map((range) => (
              <label key={range.value} className='relative'>
                <input
                  type='radio'
                  value={range.value}
                  checked={formData.budgetFlexibility === range.value}
                  onChange={(e) => handleInputChange('budgetFlexibility', e.target.value)}
                  className='sr-only'
                />
                <div
                  className={cn(
                    'p-4 border-2 rounded-lg cursor-pointer transition-all',
                    formData.budgetFlexibility === range.value
                      ? 'border-brand-secondary/90 bg-brand-secondary/10 text-brand-secondary'
                      : 'border-color-default hover:border-brand-secondary/40'
                  )}
                >
                  <div className='flex justify-between items-center'>
                    <span className='font-medium'>{range.label}</span>
                    {formData.budgetFlexibility === range.value && (
                      <Check className='w-5 h-5 text-brand-secondary' />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
          {getFieldError('budgetFlexibility') && (
            <p className='mt-2 text-sm text-color-state-error-strong flex items-center'>
              <AlertCircle className='w-4 h-4 mr-1' />
              {getFieldError('budgetFlexibility')}
            </p>
          )}
        </div>

        <div className='flex justify-between mt-8 pt-6 border-t border-color-subtle'>
          <button
            onClick={onPrevious}
            className='flex items-center px-6 py-3 text-color-tertiary bg-color-muted rounded-lg hover:bg-color-muted transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Indietro
          </button>

          <button
            onClick={handleNext}
            className='flex items-center px-8 py-3 bg-brand-secondary text-white rounded-lg hover:bg-brand-secondary transition-colors'
          >
            Continua
            <ArrowRight className='w-4 h-4 ml-2' />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// =====================================
// STEP 3: MEETING REQUEST COMPONENT
// =====================================

const MeetingRequestStep: React.FC<StepComponentProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  errors = [],
}) => {
  const [formData, setFormData] = useState<Partial<MeetingRequest>>(
    data.meetingRequest || {
      preferredSlots: [],
      estimatedDuration: 60,
    }
  );
  const [localErrors, setLocalErrors] = useState<FormValidationError[]>([]);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  // Hydration-safe min date string
  const [minDateStr, setMinDateStr] = useState<string>('');
  useEffect(() => {
    setMinDateStr(new Date().toISOString().split('T')[0]);
  }, []);

  const handleInputChange = (field: keyof MeetingRequest, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate({ meetingRequest: updatedData as MeetingRequest });

    setLocalErrors((prev) => prev.filter((error) => error.field !== field));
  };

  const addTimeSlot = () => {
    setIsCalendarModalOpen(true);
  };

  const handleCalendarSelection = (date: string, timeSlot: string) => {
    const currentSlots = formData.preferredSlots || [];
    if (currentSlots.length < 3) {
      const newSlot: PreferredSlot = {
        date,
        timeSlot,
        preferenceOrder: currentSlots.length + 1,
      };
      handleInputChange('preferredSlots', [...currentSlots, newSlot]);
    }
  };

  const updateTimeSlot = (index: number, field: keyof PreferredSlot, value: string | number) => {
    const currentSlots = [...(formData.preferredSlots || [])];
    currentSlots[index] = { ...currentSlots[index], [field]: value };
    handleInputChange('preferredSlots', currentSlots);
  };

  const removeTimeSlot = (index: number) => {
    const currentSlots = [...(formData.preferredSlots || [])];
    currentSlots.splice(index, 1);
    // Reorder preference numbers
    currentSlots.forEach((slot, i) => {
      slot.preferenceOrder = i + 1;
    });
    handleInputChange('preferredSlots', currentSlots);
  };

  const handleSubmit = () => {
    // Ensure estimatedDuration is always set to 60 minutes
    const dataWithDuration = { ...formData, estimatedDuration: 60 };
    const validationErrors = validateMeetingRequest(dataWithDuration);
    if (validationErrors.length === 0) {
      // Update the form data with the fixed duration before proceeding
      onUpdate({ meetingRequest: dataWithDuration as MeetingRequest });
      onNext();
    } else {
      setLocalErrors(validationErrors);
    }
  };

  const allErrors = [...errors, ...localErrors];
  const getFieldError = (field: string) =>
    allErrors.find((error) => error.field === field)?.message;

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='space-y-8'
    >
      <div className='text-center'>
        <motion.div
          variants={iconVariants}
          initial='idle'
          whileHover='hover'
          whileTap='tap'
          className='mx-auto w-16 h-16 bg-brand-secondary/20 rounded-2xl flex items-center justify-center mb-4'
        >
          <Calendar className='w-8 h-8 text-brand-secondary' />
        </motion.div>
        <h2 className='text-3xl font-bold text-color-primary mb-2'>Pianifichiamo un Incontro</h2>
        <p className='text-color-tertiary max-w-2xl mx-auto'>
          Scegli quando preferisci incontrarci per discutere del tuo progetto in dettaglio.
        </p>
      </div>

      <div className='bg-white rounded-2xl shadow-lg border border-color-subtle p-8 space-y-6'>
        {/* Meeting Type */}
        <div>
          <label className='block text-sm font-medium text-color-secondary mb-3'>Tipo di incontro *</label>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {[
              {
                value: 'online',
                label: 'Video call online',
                desc: 'Google Meet o Zoom',
                icon: MessageSquare,
              },
              {
                value: 'in_person',
                label: 'Di persona',
                desc: 'Nel nostro ufficio o presso di te',
                icon: MapPin,
              },
            ].map((option) => (
              <label key={option.value} className='relative'>
                <input
                  type='radio'
                  value={option.value}
                  checked={formData.meetingType === option.value}
                  onChange={(e) => handleInputChange('meetingType', e.target.value as MeetingType)}
                  className='sr-only'
                />
                <div
                  className={cn(
                    'p-6 border-2 rounded-lg cursor-pointer transition-all',
                    formData.meetingType === option.value
                      ? 'border-brand-secondary/90 bg-brand-secondary/10 text-brand-secondary'
                      : 'border-color-default hover:border-brand-secondary/40'
                  )}
                >
                  <div className='flex items-start space-x-3'>
                    <option.icon className='w-6 h-6 mt-1 flex-shrink-0' />
                    <div className='flex-1'>
                      <span className='font-medium block'>{option.label}</span>
                      <p className='text-sm text-color-muted mt-1'>{option.desc}</p>
                    </div>
                    {formData.meetingType === option.value && (
                      <Check className='w-5 h-5 text-brand-secondary flex-shrink-0' />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
          {getFieldError('meetingType') && (
            <p className='mt-2 text-sm text-color-state-error-strong flex items-center'>
              <AlertCircle className='w-4 h-4 mr-1' />
              {getFieldError('meetingType')}
            </p>
          )}
        </div>

        {/* Estimated Duration */}
        <div>
          <p className='text-sm text-color-secondary font-medium'>Durata stimata dell'incontro: 1 ora</p>
        </div>

        {/* Preferred Time Slots */}
        <div>
          <div className='flex justify-between items-center mb-3'>
            <label className='text-sm font-medium text-color-secondary'>
              Fasce orarie preferite * (max 3)
            </label>
            {(formData.preferredSlots || []).length < 3 && (
              <button
                type='button'
                onClick={addTimeSlot}
                className='text-sm text-brand-secondary hover:text-brand-secondary font-medium'
              >
                + Aggiungi slot
              </button>
            )}
          </div>

          {(formData.preferredSlots || []).length === 0 && (
            <button
              type='button'
              onClick={addTimeSlot}
              className='w-full p-6 border-2 border-dashed border-color-strong rounded-lg text-color-muted hover:border-brand-secondary/40 hover:text-brand-secondary transition-colors'
            >
              <Clock className='w-8 h-8 mx-auto mb-2' />
              <span className='block font-medium'>Aggiungi la tua prima esperienza</span>
              <span className='text-sm'>Seleziona data e orario preferiti</span>
            </button>
          )}

          <div className='space-y-4'>
            {(formData.preferredSlots || []).map((slot, index) => (
              <div key={index} className='border border-color-default rounded-lg p-4'>
                <div className='flex justify-between items-start mb-3'>
                  <span className='text-sm font-medium text-color-secondary'>
                    {index === 0 ? 'Prima scelta' : index === 1 ? 'Seconda scelta' : 'Terza scelta'}
                  </span>
                  <button
                    type='button'
                    onClick={() => removeTimeSlot(index)}
                    className='text-color-state-error hover:text-color-state-error-text text-sm'
                  >
                    Rimuovi
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-color-tertiary mb-1'>Data</label>
                    <input
                      type='date'
                      value={slot.date}
                      onChange={(e) => updateTimeSlot(index, 'date', e.target.value)}
                      className={cn(
                        'w-full px-3 py-2 border rounded focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90',
                        getFieldError(`preferredSlots.${index}.date`)
                          ? 'border-color-state-error-border'
                          : 'border-color-strong'
                      )}
                      min={minDateStr || undefined}
                    />
                    {getFieldError(`preferredSlots.${index}.date`) && (
                      <p className='mt-1 text-xs text-color-state-error-strong'>
                        {getFieldError(`preferredSlots.${index}.date`)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm text-color-tertiary mb-1'>Orario</label>
                    <select
                      value={slot.timeSlot}
                      onChange={(e) => updateTimeSlot(index, 'timeSlot', e.target.value)}
                      className={cn(
                        'w-full px-3 py-2 border rounded focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90',
                        getFieldError(`preferredSlots.${index}.timeSlot`)
                          ? 'border-color-state-error-border'
                          : 'border-color-strong'
                      )}
                    >
                      <option value=''>Seleziona orario</option>
                      {AVAILABLE_TIME_SLOTS.map((timeSlot) => (
                        <option key={timeSlot} value={timeSlot}>
                          {timeSlot}
                        </option>
                      ))}
                    </select>
                    {getFieldError(`preferredSlots.${index}.timeSlot`) && (
                      <p className='mt-1 text-xs text-color-state-error-strong'>
                        {getFieldError(`preferredSlots.${index}.timeSlot`)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {getFieldError('preferredSlots') && (
            <p className='mt-2 text-sm text-color-state-error-strong flex items-center'>
              <AlertCircle className='w-4 h-4 mr-1' />
              {getFieldError('preferredSlots')}
            </p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label className='block text-sm font-medium text-color-secondary mb-2'>
            Richieste speciali (opzionale)
          </label>
          <textarea
            value={formData.specialRequests || ''}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            rows={3}
            className={cn(
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-secondary/90 focus:border-brand-secondary/90 transition-colors resize-none',
              getFieldError('specialRequests') ? 'border-color-state-error-border bg-color-state-error-bg' : 'border-color-strong'
            )}
            placeholder="Hai qualche richiesta particolare per l'incontro?"
            maxLength={500}
          />
          <div className='flex justify-between mt-1'>
            {getFieldError('specialRequests') && (
              <p className='text-sm text-color-state-error-strong flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {getFieldError('specialRequests')}
              </p>
            )}
            <p className='text-sm text-color-muted ml-auto'>
              {(formData.specialRequests || '').length}/500
            </p>
          </div>
        </div>

        <div className='flex justify-between mt-8 pt-6 border-t border-color-subtle'>
          <button
            onClick={onPrevious}
            className='flex items-center px-6 py-3 text-color-tertiary bg-color-muted rounded-lg hover:bg-color-muted transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Indietro
          </button>

          <button
            onClick={handleSubmit}
            className='flex items-center px-8 py-3 bg-brand-secondary text-white rounded-lg hover:bg-brand-secondary transition-colors'
          >
            <Sparkles className='w-4 h-4 mr-2' />
            Invia Richiesta
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        onSelectSlot={handleCalendarSelection}
        selectedSlots={formData.preferredSlots || []}
      />
    </motion.div>
  );
};

// =====================================
// CALENDAR MODAL COMPONENT
// =====================================

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSlot: (date: string, timeSlot: string) => void;
  selectedSlots: Array<{ date: string; timeSlot: string; preferenceOrder: number }>;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  onSelectSlot,
  selectedSlots,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get today's date for minimum date validation
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Calendar navigation
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const now = new Date();
    if (
      currentMonth.getMonth() > now.getMonth() ||
      currentMonth.getFullYear() > now.getFullYear()
    ) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isPast = date < today;
      const isSelected = selectedDate === dateString;
      const isBooked = selectedSlots.some((slot) => slot.date === dateString);

      days.push({
        day,
        date: dateString,
        isPast,
        isSelected,
        isBooked,
        isToday: dateString === todayString,
      });
    }

    return days;
  };

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelectSlot(selectedDate, selectedTime);
      setSelectedDate('');
      setSelectedTime('');
      onClose();
    }
  };

  const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  if (!isOpen) return null;

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className='relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-color-default'>
          <div>
            <h3 className='text-xl font-bold text-color-primary'>Seleziona Data e Orario</h3>
            <p className='text-sm text-color-tertiary mt-1'>Scegli quando preferisci incontrarci</p>
          </div>
          <button onClick={onClose} className='p-2 hover:bg-color-muted rounded-lg transition-colors'>
            <X className='w-5 h-5 text-color-muted' />
          </button>
        </div>

        <div className='p-6'>
          {/* Calendar Header */}
          <div className='flex items-center justify-between mb-6'>
            <button
              onClick={prevMonth}
              className='p-2 hover:bg-color-muted rounded-lg transition-colors'
              disabled={
                currentMonth.getMonth() === today.getMonth() &&
                currentMonth.getFullYear() === today.getFullYear()
              }
            >
              <ArrowLeft className='w-5 h-5 text-color-tertiary' />
            </button>
            <h4 className='text-lg font-semibold text-color-primary'>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>
            <button
              onClick={nextMonth}
              className='p-2 hover:bg-color-muted rounded-lg transition-colors'
            >
              <ArrowRight className='w-5 h-5 text-color-tertiary' />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className='grid grid-cols-7 gap-2 mb-6'>
            {/* Day headers */}
            {dayNames.map((day) => (
              <div key={day} className='text-center text-sm font-medium text-color-muted py-2'>
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {generateCalendarDays().map((dayData, index) => (
              <div key={index} className='aspect-square'>
                {dayData && (
                  <button
                    onClick={() => !dayData.isPast && handleDateSelect(dayData.date)}
                    disabled={dayData.isPast}
                    className={cn(
                      'w-full h-full rounded-lg text-sm font-medium transition-all',
                      dayData.isPast
                        ? 'text-color-disabled cursor-not-allowed'
                        : dayData.isSelected
                          ? 'bg-brand-secondary text-white shadow-md'
                          : dayData.isToday
                            ? 'bg-brand-secondary/20 text-brand-secondary hover:bg-brand-secondary/30'
                            : dayData.isBooked
                              ? 'bg-color-state-warning-subtle text-color-state-warning-text hover:bg-yellow-200'
                              : 'text-color-secondary hover:bg-color-muted'
                    )}
                  >
                    {dayData.day}
                    {dayData.isBooked && (
                      <div className='w-1 h-1 bg-color-state-warning rounded-full mx-auto mt-1'></div>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <h5 className='text-sm font-medium text-color-secondary mb-3'>
                Orari disponibili per{' '}
                {new Date(selectedDate).toLocaleDateString('it-IT', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h5>
              <div className='grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6'>
                {AVAILABLE_TIME_SLOTS.map((timeSlot) => {
                  const isBooked = selectedSlots.some(
                    (slot) => slot.date === selectedDate && slot.timeSlot === timeSlot
                  );
                  return (
                    <button
                      key={timeSlot}
                      onClick={() => !isBooked && setSelectedTime(timeSlot)}
                      disabled={isBooked}
                      className={cn(
                        'p-2 text-sm rounded-lg border transition-all',
                        isBooked
                          ? 'bg-color-muted text-color-disabled border-color-default cursor-not-allowed'
                          : selectedTime === timeSlot
                            ? 'bg-brand-secondary text-white border-brand-secondary'
                            : 'border-color-default hover:border-brand-secondary/40 hover:bg-brand-secondary/10'
                      )}
                    >
                      {timeSlot}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className='flex justify-between items-center pt-4 border-t border-color-default'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-color-tertiary hover:text-color-primary transition-colors'
            >
              Annulla
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-all',
                selectedDate && selectedTime
                  ? 'bg-brand-secondary text-white hover:bg-brand-secondary'
                  : 'bg-color-muted text-color-disabled cursor-not-allowed'
              )}
            >
              Conferma Selezione
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// =====================================
// HORIZONTAL PROGRESS BAR SECTION COMMENT
// =====================================
// Horizontal progress bar is now integrated inline in the main component layout

// =====================================
// MAIN QUOTE REQUEST COMPONENT
// =====================================

interface Step4QuoteRequestProps {
  completionType: CompletionType;
  initialData?: Partial<QuoteRequest>;
  onSubmit: (quoteRequest: QuoteRequest) => void;
  onCancel: (() => void) | null;
  className?: string;
  selectedServices?: OptionalService[];
  onModifyConfiguration?: () => void;
  user?: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  } | null;
}

const Step4QuoteRequest: React.FC<Step4QuoteRequestProps> = ({
  completionType,
  initialData,
  onSubmit,
  onCancel,
  className,
  selectedServices = [],
  onModifyConfiguration,
  user,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  // Parse user name into first and last name
  const parseUserName = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';
    return { firstName, lastName };
  };

  // Initialize form data with user info if available
  const getInitialFormData = (): Partial<QuoteRequest> => {
    const baseData = initialData || {};

    if (user && user.name && user.email) {
      const { firstName, lastName } = parseUserName(user.name);
      return {
        ...baseData,
        userData: {
          ...baseData.userData,
          firstName: baseData.userData?.firstName || firstName,
          lastName: baseData.userData?.lastName || lastName,
          email: baseData.userData?.email || user.email,
          phone: baseData.userData?.phone || '', // Ensure phone is always a string
          companyName: baseData.userData?.companyName || '', // Ensure companyName is always a string
        },
      };
    }

    return baseData;
  };

  const [formData, setFormData] = useState<Partial<QuoteRequest>>(getInitialFormData());
  const [formState, setFormState] = useState<QuoteFormState>({
    currentStep: 1,
    totalSteps: 3,
    isSubmitting: false,
    validationErrors: [],
    completedSteps: new Set(),
  });

  const totalSteps = 3;

  const handleUpdateData = (updates: Partial<QuoteRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
      setFormState((prev) => ({
        ...prev,
        currentStep: currentStep + 1,
        completedSteps: new Set([...Array.from(prev.completedSteps), currentStep]),
      }));
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
      setFormState((prev) => ({
        ...prev,
        currentStep: currentStep - 1,
      }));
    }
  };

  const handleFinalSubmit = async () => {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const quoteRequest: QuoteRequest = {
        quoteId: `QR-${Date.now()}`,
        submissionDate: new Date().toISOString(),
        completionType,
        status: 'submitted',
        userData: formData.userData!,
        projectDetails: formData.projectDetails!,
        meetingRequest: formData.meetingRequest!,
        priority: false,
        estimatedProjectValue: 0, // Calculate based on selections
        ...(completionType === 'complete_journey' && {
          pricingConfiguration: formData.pricingConfiguration,
        }),
        ...(completionType === 'ai_assisted_skip' && {
          aiChatHistory: formData.aiChatHistory,
          partialSelections: formData.partialSelections,
        }),
      };

      await onSubmit(quoteRequest);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const stepProps: StepComponentProps = {
    data: formData,
    onUpdate: handleUpdateData,
    onNext: handleNext,
    onPrevious: handlePrevious,
    errors: formState.validationErrors,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UserDataStep {...stepProps} isUserAuthenticated={!!user} />;
      case 2:
        return <ProjectDetailsStep {...stepProps} />;
      case 3:
        return <MeetingRequestStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('w-full py-8', className)}>
      {/* Header */}
      <div className='mb-8 text-center'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-color-primary'>Richiedi Preventivo</h1>
          {onCancel && (
            <button onClick={onCancel} className='text-color-muted hover:text-color-secondary text-sm'>
              Annulla
            </button>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className='flex gap-8 max-w-7xl mx-auto'>
        {/* Left Side - Progress Steps + Form Content */}
        <div className='flex-1 max-w-4xl space-y-6'>
          {/* Horizontal Progress Bar */}
          <div className='mb-8'>
            <div className='flex items-center space-x-4'>
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <React.Fragment key={step}>
                  <div className='flex items-center'>
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                        step < currentStep || formState.completedSteps.has(step)
                          ? 'bg-color-state-success-strong text-white'
                          : step === currentStep
                            ? 'bg-brand-secondary text-white'
                            : 'bg-color-muted text-color-muted'
                      )}
                    >
                      {step < currentStep || formState.completedSteps.has(step) ? (
                        <Check className='w-4 h-4' />
                      ) : (
                        step
                      )}
                    </div>
                    <span className='ml-2 text-sm font-medium text-color-secondary'>
                      {step === 1 ? 'Dati' : step === 2 ? 'Progetto' : 'Incontro'}
                    </span>
                  </div>
                  {step < totalSteps && (
                    <div
                      className={cn(
                        'flex-1 h-1 rounded-full transition-colors',
                        step < currentStep || formState.completedSteps.has(step)
                          ? 'bg-color-state-success-strong'
                          : 'bg-color-muted'
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Sidebar - Configuration Summary */}
        <div className='w-80'>
          {selectedServices && onModifyConfiguration && (
            <CartSummaryStep4
              selectedServices={selectedServices}
              onModifyConfiguration={onModifyConfiguration}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step4QuoteRequest;
