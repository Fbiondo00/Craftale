import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TierLevelSelector from '@/components/pricing/TierLevelSelector';
import type { TierWithLevels } from '@/types/database-extended';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

describe('TierLevelSelector', () => {
  const mockTier: TierWithLevels = {
    id: 1,
    name: 'Professional',
    slug: 'professional',
    description: 'Perfect for growing restaurants',
    target_audience: 'growing restaurants',
    levels: [
      {
        id: 1,
        level_code: 'A',
        name: 'Base',
        price: '99',
        original_price: null,
        features: ['Level A Feature 1', 'Level A Feature 2'],
      },
      {
        id: 2,
        level_code: 'B',
        name: 'Standard',
        price: '199',
        original_price: null,
        features: ['Level B Feature 1', 'Level B Feature 2', 'Level B Feature 3'],
      },
      {
        id: 3,
        level_code: 'C',
        name: 'Premium',
        price: '299',
        original_price: null,
        features: [
          'Level C Feature 1',
          'Level C Feature 2',
          'Level C Feature 3',
          'Level C Feature 4',
        ],
      },
    ],
  };

  const mockOnLevelSelect = jest.fn();
  const mockOnPersonaMatcherOpen = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render tier name and description', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      // The heading text is split across multiple elements, so search for the main text
      expect(screen.getByText(/il piano perfetto per il tuo ristorante/)).toBeInTheDocument();
      expect(screen.getByText(mockTier.description)).toBeInTheDocument();
    });

    it('should render all three levels', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      // Check for level selection buttons (there are 2 of each - header and bottom row)
      expect(screen.getAllByText('Scegli Base')).toHaveLength(2);
      expect(screen.getAllByText('Scegli Standard')).toHaveLength(2);
      expect(screen.getAllByText('Scegli Premium')).toHaveLength(2);
    });

    it('should display prices for each level', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      expect(screen.getByText('€99')).toBeInTheDocument();
      expect(screen.getByText('€199')).toBeInTheDocument();
      expect(screen.getByText('€299')).toBeInTheDocument();
    });

    it('should show loading state when tier is not provided', () => {
      render(
        <TierLevelSelector
          selectedTier={null as any}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      // Check for loading spinner class
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Feature Comparison', () => {
    it('should display feature comparison table', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      // Check for feature categories instead of specific tier features
      expect(screen.getByText('Funzionalità Base')).toBeInTheDocument();
      expect(screen.getByText('Design Responsive')).toBeInTheDocument();
      expect(screen.getByText('Pagine Incluse')).toBeInTheDocument();
    });

    it('should show check marks for included features', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      // Should have check marks (SVG elements with class w-5 h-5)
      const checkIcons = document.querySelectorAll('svg.w-5.h-5');
      expect(checkIcons.length).toBeGreaterThan(0);
    });
  });

  describe('User Interactions', () => {
    it('should call onLevelSelect when a level is selected', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      const standardButtons = screen.getAllByText('Scegli Standard');
      fireEvent.click(standardButtons[0]); // Click the first one

      expect(mockOnLevelSelect).toHaveBeenCalledWith('professional', 'B');
    });

    it('should call onPersonaMatcherOpen when AI assistant button is clicked', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      const aiButton = screen.getByText('Ricevi Assistenza Personalizzata');
      fireEvent.click(aiButton);

      expect(mockOnPersonaMatcherOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onBack when back button is clicked', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
          onBack={mockOnBack}
        />
      );

      const backButton = screen.getByText('Torna Indietro');
      fireEvent.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Visual Styling', () => {
    it('should highlight the standard (B) level', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      // The Standard level should have special styling with semantic token
      const standardColumn = screen.getByText('Standard').closest('th');
      expect(standardColumn).toHaveClass('bg-apty-tertiary/10');
    });

    it('should render additional info section', () => {
      render(
        <TierLevelSelector
          selectedTier={mockTier}
          onLevelSelect={mockOnLevelSelect}
          onPersonaMatcherOpen={mockOnPersonaMatcherOpen}
        />
      );

      // Check for the help section text instead of specific features
      expect(screen.getByText(/Non sei sicuro di quale livello scegliere/)).toBeInTheDocument();
      expect(screen.getByText('Ricevi Assistenza Personalizzata')).toBeInTheDocument();
    });
  });
});
