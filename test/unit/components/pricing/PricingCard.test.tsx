/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PricingCard from '@/components/pricing/PricingCard';
import { Globe } from 'lucide-react';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )),
  },
}));

const mockProps = {
  title: 'Presenza Digitale Essenziale',
  price: 850,
  features: [
    { text: 'Sito web responsive professionale', included: true },
    { text: 'Menu digitale ottimizzato', included: true },
    { text: 'Google My Business completo', included: true },
  ],
  onCTAClick: jest.fn(),
  icon: Globe,
  idealFor: 'Trattorie familiari',
};

describe('PricingCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Card Interactions', () => {
    it('should call onCTAClick when CTA button is clicked', () => {
      const mockClick = jest.fn();
      render(<PricingCard {...mockProps} onCTAClick={mockClick} />);
      
      fireEvent.click(screen.getByRole('button'));
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Visual Components', () => {
    it('should render inheritance line when specified', () => {
      render(
        <PricingCard 
          {...mockProps} 
          inheritedFeatures={{ fromTier: 'Essential' }} 
        />
      );
      
      expect(screen.getByText(/Tutto da/)).toBeInTheDocument();
      expect(screen.getByText(/Essential/)).toBeInTheDocument();
    });

    it('should not render badge even when provided (badges removed)', () => {
      render(<PricingCard {...mockProps} badge="popular" />);
      
      // Badges have been removed from the design
      expect(screen.queryByText('Popolare')).not.toBeInTheDocument();
      expect(screen.queryByText('Enterprise')).not.toBeInTheDocument();
    });

    it('should render custom card styling', () => {
      render(<PricingCard {...mockProps} isCustomCard={true} />);
      
      expect(screen.getByText('Valutazione Gratuita')).toBeInTheDocument();
    });
  });
}); 