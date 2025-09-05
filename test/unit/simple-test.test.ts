import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Simple Test Setup', () => {
  it('should render a basic React component', () => {
    const TestComponent = () => React.createElement('div', { 'data-testid': 'test' }, 'Hello World');
    
    render(React.createElement(TestComponent));
    
    expect(screen.getByTestId('test')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeVisible();
  });

  it('should have Jest working correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have proper test environment', () => {
    expect(global.TextEncoder).toBeDefined();
    expect(global.TextDecoder).toBeDefined();
  });
}); 