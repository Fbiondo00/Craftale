'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { tierComparisonData, TierFeatureValue } from './tierComparisonData';
import Tooltip from '../ui/Tooltip';
import { AptyPrimaryButton, AptySecondaryButton } from '../apty/AptyButton';

interface ValueRendererProps {
  value: boolean | string | TierFeatureValue;
}

const ValueRenderer: React.FC<ValueRendererProps> = ({ value }) => {
  // Handle TierFeatureValue object
  if (typeof value === 'object' && value !== null && 'value' in value) {
    const tierValue = value as TierFeatureValue;
    const displayValue = tierValue.value;

    // Create the content to display
    const content =
      typeof displayValue === 'boolean' ? (
        displayValue ? (
          <Check className='w-5 h-5 text-green-600 mx-auto' />
        ) : (
          <X className='w-5 h-5 text-gray-300 mx-auto' />
        )
      ) : (
        <span className='text-sm text-gray-700'>{displayValue}</span>
      );

    // If there's tooltip content, wrap with Tooltip
    if (tierValue.shortDescription || tierValue.longDescription) {
      const tooltipContent = tierValue.longDescription || tierValue.shortDescription || '';

      return (
        <Tooltip content={tooltipContent}>
          <span className='border-b-2 border-dotted border-gray-300 hover:border-gray-500'>
            {content}
          </span>
        </Tooltip>
      );
    }

    return <>{content}</>;
  }

  // Handle legacy boolean/string values
  if (typeof value === 'boolean') {
    return value ? (
      <Check className='w-5 h-5 text-green-600 mx-auto' />
    ) : (
      <X className='w-5 h-5 text-gray-300 mx-auto' />
    );
  }

  return <span className='text-sm text-gray-700'>{value}</span>;
};

interface FeatureNameProps {
  name: string;
  longDescription?: string;
}

const FeatureName: React.FC<FeatureNameProps> = ({ name, longDescription }) => {
  if (!longDescription) {
    return <span className='text-sm text-gray-700'>{name}</span>;
  }

  return (
    <Tooltip content={longDescription}>
      <span className='text-sm text-gray-700 border-b-2 border-dotted border-gray-300 hover:border-gray-500'>
        {name}
      </span>
    </Tooltip>
  );
};

interface TableHeaderProps {
  onTierSelect: (tier: string) => void;
  isMobile?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ onTierSelect, isMobile = false }) => {
  if (isMobile) {
    return (
      <thead className='bg-white bg-opacity-100 sticky top-20 z-40 before:absolute before:inset-x-0 before:-top-20 before:h-20 before:bg-white before:content-[""]' style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <tr className='bg-white bg-opacity-100'>
          <th className='px-3 py-4 text-center bg-white bg-opacity-100 w-1/3'>
            <div className='text-base font-semibold text-gray-900'>Starter</div>
          </th>
          <th className='px-3 py-4 text-center bg-white bg-opacity-100 w-1/3'>
            <div className='text-base font-semibold text-gray-900'>Pro</div>
          </th>
          <th className='px-3 py-4 text-center bg-white bg-opacity-100 w-1/3'>
            <div className='text-base font-semibold text-gray-900'>Ecommerce</div>
          </th>
        </tr>
      </thead>
    );
  }

  return (
    <thead className='bg-white bg-opacity-100 sticky top-24 z-40 before:absolute before:inset-x-0 before:-top-24 before:h-24 before:bg-white before:content-[""]' style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
      <tr className='bg-white bg-opacity-100'>
        <th className='px-6 py-6 text-left font-medium bg-white bg-opacity-100'></th>
        <th className='px-6 py-6 text-center bg-purple-50 bg-opacity-100 border-l-2 border-r-2 border-purple-200 relative'>
          <div className='absolute inset-x-0 top-0 h-0.5 bg-purple-200'></div>
          <div className='text-xl font-semibold text-gray-900 mb-3'>Starter</div>
          <AptySecondaryButton
            onClick={() => onTierSelect('essential')}
            className='min-w-[140px]'
            size='sm'
          >
            Inizia con Starter
          </AptySecondaryButton>
        </th>
        <th className='px-6 py-6 text-center bg-white bg-opacity-100'>
          <div className='text-xl font-semibold text-gray-900 mb-3'>Pro</div>
          <AptyPrimaryButton
            onClick={() => onTierSelect('interactive')}
            className='min-w-[140px]'
            size='sm'
          >
            Inizia con Pro
          </AptyPrimaryButton>
        </th>
        <th className='px-6 py-6 text-center bg-white bg-opacity-100'>
          <div className='text-xl font-semibold text-gray-900 mb-3'>Ecommerce</div>
          <AptySecondaryButton
            onClick={() => onTierSelect('ecommerce')}
            className='min-w-[140px]'
            size='sm'
          >
            Inizia con Ecommerce
          </AptySecondaryButton>
        </th>
      </tr>
    </thead>
  );
};



interface TierComparisonTableProps {
  onTierSelect?: (tier: string) => void;
}

const TierComparisonTable: React.FC<TierComparisonTableProps> = ({
  onTierSelect = (tier: string) => console.log('Selected tier:', tier),
}) => {
  const [activeStickyIndex, setActiveStickyIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const categoryRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const mobileCategoryRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      // Mobile when screen is less than 768px (md breakpoint)
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current) return;

      const stickyTop = isMobile ? 128 : 208; // Adjust for mobile (top-32 = 128px)
      const refs = isMobile ? mobileCategoryRefs : categoryRefs;
      
      let newActiveIndex = 0;
      
      // Find which category should be sticky based on scroll position
      for (let i = refs.current.length - 1; i >= 0; i--) {
        const row = refs.current[i];
        if (row) {
          const rect = row.getBoundingClientRect();
          // Check if this category row has passed the sticky position
          if (rect.top <= stickyTop) {
            newActiveIndex = i;
            break;
          }
        }
      }
      
      if (newActiveIndex !== activeStickyIndex) {
        setActiveStickyIndex(newActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStickyIndex, isMobile]);

  return (
    <section className='py-26 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-28'>
          <h3 className='text-[40px] leading-[40px] font-semibold font-apty-heading text-gray-900 mb-6'>
            SCEGLI IL <span className='text-purple-600'>PIANO PERFETTO</span> PER LA TUA AZIENDA
          </h3>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Confronta le caratteristiche dei nostri tre livelli di servizio e trova la soluzione
            ideale per le tue esigenze digitali.
          </p>
        </div>

        <div className='bg-white' ref={tableRef}>
          <div className='relative' style={{ isolation: 'isolate' }}>
            <table className='w-full border-collapse'>
              <TableHeader onTierSelect={onTierSelect} isMobile={isMobile} />
              <tbody>
                {tierComparisonData.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    {isMobile ? (
                      <>
                        {/* Mobile: Category name as full-width row */}
                        <tr 
                          ref={(el) => { mobileCategoryRefs.current[categoryIndex] = el; }}
                          className={categoryIndex === activeStickyIndex ? 'sticky top-32' : ''}
                          style={categoryIndex === activeStickyIndex ? { 
                            zIndex: 30, 
                            transform: 'translateZ(0)', 
                            willChange: 'transform' 
                          } : {}}
                        >
                          <td colSpan={3} className='px-4 py-3 font-semibold text-gray-800 bg-gray-50 bg-opacity-100 text-center'>
                            {category.category}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr 
                        ref={(el) => { categoryRefs.current[categoryIndex] = el; }}
                        className={categoryIndex === activeStickyIndex ? 'sticky top-52' : ''}
                        style={categoryIndex === activeStickyIndex ? { 
                          zIndex: 30, 
                          transform: 'translateZ(0)', 
                          willChange: 'transform' 
                        } : {}}
                      >
                        <td className='px-6 py-3 font-semibold text-gray-800 bg-gray-50 bg-opacity-100'>{category.category}</td>
                        <td className='px-6 py-3 bg-purple-50 bg-opacity-100 border-l-2 border-r-2 border-purple-200'></td>
                        <td className='px-6 py-3 bg-gray-50 bg-opacity-100'></td>
                        <td className='px-6 py-3 bg-gray-50 bg-opacity-100'></td>
                      </tr>
                    )}
                    {category.features.map((feature, featureIndex) => {
                      const isLastFeature =
                        categoryIndex === tierComparisonData.length - 1 &&
                        featureIndex === category.features.length - 1;
                      
                      if (isMobile) {
                        return (
                          <React.Fragment key={featureIndex}>
                            {/* Mobile: Feature name as separate row */}
                            <tr>
                              <td colSpan={3} className='px-4 py-2 text-sm text-gray-600 bg-white'>
                                {feature.name}
                              </td>
                            </tr>
                            {/* Mobile: Feature values row */}
                            <tr className='border-b border-gray-100'>
                              <td className='px-3 py-3 text-center bg-white'>
                                <ValueRenderer value={feature.tier1} />
                              </td>
                              <td className='px-3 py-3 text-center bg-white'>
                                <ValueRenderer value={feature.tier2} />
                              </td>
                              <td className='px-3 py-3 text-center bg-white'>
                                <ValueRenderer value={feature.tier3} />
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      }
                      
                      return (
                        <tr key={featureIndex} className='group hover:bg-purple-50'>
                          <td className='px-6 py-4 bg-white group-hover:bg-purple-50 border-b border-gray-100'>
                            <FeatureName
                              name={feature.name}
                              longDescription={feature.longDescription}
                            />
                          </td>
                          <td
                            className={`px-6 py-4 text-center bg-purple-50 border-b border-gray-100 border-l-2 border-r-2 border-purple-200 ${
                              isLastFeature ? 'border-b-2 rounded-b-xl' : ''
                            }`}
                          >
                            <ValueRenderer value={feature.tier1} />
                          </td>
                          <td className='px-6 py-4 text-center bg-white border-b border-gray-100 group-hover:bg-purple-50'>
                            <ValueRenderer value={feature.tier2} />
                          </td>
                          <td className='px-6 py-4 text-center bg-white border-b border-gray-100 group-hover:bg-purple-50'>
                            <ValueRenderer value={feature.tier3} />
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TierComparisonTable;