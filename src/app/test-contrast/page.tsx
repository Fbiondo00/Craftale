/**
 * test-contrast/page.tsx
 * 
 * Interactive WCAG 2.1 color contrast verification tool for the APTY design system.
 * 
 * Purpose:
 * - Verify all APTY color combinations meet WCAG 2.1 standards
 * - Provide live contrast ratio testing for custom colors
 * - Display scientific calculations with official W3C references
 * - Serve as a compliance validation tool for accessibility
 * 
 * Features:
 * - Automated testing of all APTY color combinations
 * - Visual preview of color pairs with contrast ratios
 * - Pass/fail indicators for AA and AAA compliance levels
 * - Step-by-step explanation of the calculation methodology
 * - Live testing tool for custom color combinations
 * - Direct links to official W3C/WCAG documentation
 * 
 * Scientific Accuracy:
 * - Uses official W3C formulas for luminance and contrast
 * - ITU-R BT.709 coefficients for sRGB color space
 * - Gamma correction as per WCAG 2.1 specification
 * - All calculations verified against W3C standards
 * 
 * @page
 * @see https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */

'use client';

import { useEffect, useState } from 'react';
import { testAPTYColorSystem, formatContrastResults, getContrastRatio, getWCAGLevel } from '@/utils/colorContrast';

export default function TestContrastPage() {
  const [results, setResults] = useState<any>(null);
  const [customTests, setCustomTests] = useState<any[]>([]);

  useEffect(() => {
    // Run the APTY color system tests
    const testResults = testAPTYColorSystem();
    setResults(testResults);
    
    // Log to console for debugging (only on client)
    if (typeof window !== 'undefined') {
      console.log(formatContrastResults(testResults));
    }
    
    // Run additional custom tests for critical combinations
    const custom = [
      {
        name: 'Primary Purple (#6720FF) on White',
        fg: '103 32 255',
        bg: '255 255 255',
      },
      {
        name: 'White on Primary Purple',
        fg: '255 255 255',
        bg: '103 32 255',
      },
      {
        name: 'Dark Mode: Light Text on Dark BG',
        fg: '240 240 240',
        bg: '20 20 20',
      },
      {
        name: 'Link Color (#6720FF) on White',
        fg: '103 32 255',
        bg: '255 255 255',
      },
      {
        name: 'Accent Pink (#FF4E8C) on White',
        fg: '255 78 140',
        bg: '255 255 255',
      },
    ];
    
    const customResults = custom.map(test => {
      const ratio = getContrastRatio(test.fg, test.bg);
      return {
        ...test,
        ratio: Math.round(ratio * 100) / 100,
        normalLevel: getWCAGLevel(ratio, false),
        largeLevel: getWCAGLevel(ratio, true),
      };
    });
    
    setCustomTests(customResults);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">APTY Color Contrast Verification</h1>
        
        {/* Scientific Validation Notice */}
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Scientifically Accurate Calculations
          </h2>
          <p className="text-sm mb-2">
            All calculations on this page use the <strong>official W3C/WCAG 2.1 formulas</strong> for color contrast verification.
            These are not approximations but exact implementations of the international accessibility standards.
          </p>
          <p className="text-sm font-semibold">Official References:</p>
          <ul className="text-sm space-y-1 mt-1">
            <li>• <a href="https://www.w3.org/WAI/GL/wiki/Contrast_ratio" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">W3C Contrast Ratio Definition</a></li>
            <li>• <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">WCAG 2.1 Success Criterion 1.4.3 (Level AA)</a></li>
            <li>• <a href="https://www.w3.org/TR/WCAG21/#contrast-enhanced" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">WCAG 2.1 Success Criterion 1.4.6 (Level AAA)</a></li>
          </ul>
        </div>
        
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">WCAG 2.1 Requirements</h2>
          <ul className="space-y-1 text-sm">
            <li>• <strong>AA Normal Text:</strong> Minimum 4.5:1 contrast ratio</li>
            <li>• <strong>AA Large Text:</strong> Minimum 3:1 contrast ratio (18pt+ or 14pt+ bold)</li>
            <li>• <strong>AAA Normal Text:</strong> Minimum 7:1 contrast ratio</li>
            <li>• <strong>AAA Large Text:</strong> Minimum 4.5:1 contrast ratio</li>
          </ul>
        </div>

        {/* Critical Combinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Critical Color Combinations</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Combination</th>
                  <th className="border p-3 text-center">Preview</th>
                  <th className="border p-3 text-center">Ratio</th>
                  <th className="border p-3 text-center">Normal Text</th>
                  <th className="border p-3 text-center">Large Text</th>
                </tr>
              </thead>
              <tbody>
                {customTests.map((test, idx) => (
                  <tr key={idx}>
                    <td className="border p-3">{test.name}</td>
                    <td className="border p-3">
                      <div 
                        className="p-2 rounded text-center"
                        style={{
                          backgroundColor: `rgb(${test.bg})`,
                          color: `rgb(${test.fg})`,
                        }}
                      >
                        Sample Text
                      </div>
                    </td>
                    <td className="border p-3 text-center font-mono">
                      {test.ratio}:1
                    </td>
                    <td className="border p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        test.normalLevel === 'AAA' ? 'bg-green-500 text-white' :
                        test.normalLevel === 'AA' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {test.normalLevel}
                      </span>
                    </td>
                    <td className="border p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        test.largeLevel === 'AAA' ? 'bg-green-500 text-white' :
                        test.largeLevel === 'AA' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {test.largeLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* All Test Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">All APTY System Tests</h2>
          <div className="grid gap-4">
            {results && Object.entries(results).map(([label, result]: [string, any]) => (
              <div 
                key={label}
                className={`p-4 rounded-lg border-2 ${
                  result.normalText.AA 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-red-300 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{label}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Contrast Ratio: <strong>{result.ratio}:1</strong>
                    </p>
                    {result.recommendation && (
                      <p className="text-sm text-red-600 mt-1">
                        ⚠️ {result.recommendation}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Normal</div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        result.normalText.AAA ? 'bg-green-500 text-white' :
                        result.normalText.AA ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {result.normalText.AAA ? 'AAA' : result.normalText.AA ? 'AA' : 'FAIL'}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Large</div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        result.largeText.AAA ? 'bg-green-500 text-white' :
                        result.largeText.AA ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {result.largeText.AAA ? 'AAA' : result.largeText.AA ? 'AA' : 'FAIL'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works - Scientific Explanation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How the Calculations Work</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Step 1: Gamma Correction (Linearization)</h3>
              <p className="text-sm mb-2">Each RGB channel is linearized using the sRGB gamma correction formula:</p>
              <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
{`if (channel <= 0.03928)
  linearized = channel / 12.92
else
  linearized = ((channel + 0.055) / 1.055) ^ 2.4`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Step 2: Calculate Relative Luminance</h3>
              <p className="text-sm mb-2">Using ITU-R BT.709 coefficients for human vision sensitivity:</p>
              <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
{`L = 0.2126 * R + 0.7152 * G + 0.0722 * B`}
              </pre>
              <p className="text-xs text-gray-600 mt-1">
                These coefficients reflect that human eyes are most sensitive to green, 
                moderately sensitive to red, and least sensitive to blue.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Step 3: Calculate Contrast Ratio</h3>
              <p className="text-sm mb-2">The official W3C formula:</p>
              <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
{`Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
where L1 = lighter color, L2 = darker color`}
              </pre>
              <p className="text-xs text-gray-600 mt-1">
                The 0.05 offset prevents division by zero and accounts for display flare.
              </p>
            </div>
          </div>
        </section>

        {/* Live Testing Tool */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Live Contrast Testing</h2>
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Foreground Color (RGB triplet or hex)
                </label>
                <input 
                  type="text" 
                  id="fg-input"
                  placeholder="e.g., 103 32 255 or #6720FF"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Background Color (RGB triplet or hex)
                </label>
                <input 
                  type="text" 
                  id="bg-input"
                  placeholder="e.g., 255 255 255 or #FFFFFF"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <button 
              onClick={() => {
                const fgInput = (document.getElementById('fg-input') as HTMLInputElement)?.value;
                const bgInput = (document.getElementById('bg-input') as HTMLInputElement)?.value;
                
                if (fgInput && bgInput) {
                  try {
                    const ratio = getContrastRatio(fgInput, bgInput);
                    alert(`Contrast Ratio: ${Math.round(ratio * 100) / 100}:1\n` +
                          `Normal Text: ${getWCAGLevel(ratio, false)}\n` +
                          `Large Text: ${getWCAGLevel(ratio, true)}`);
                  } catch (e) {
                    alert('Invalid color format. Use RGB triplets (e.g., 255 255 255) or hex (#FFFFFF)');
                  }
                }
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Contrast
            </button>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold mb-2">⚠️ Colors Needing Attention</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Primary Purple (#6720FF):</strong> May need adjustment for better contrast on white backgrounds</li>
              <li>• <strong>Light grays:</strong> Ensure sufficient contrast for body text</li>
              <li>• <strong>State colors:</strong> Verify warning and info text colors meet AA standards</li>
            </ul>
            <p className="mt-4 text-sm">
              <strong>Tip:</strong> Test with{' '}
              <a 
                href="https://color.review" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                color.review
              </a>
              {' '}for comprehensive contrast verification.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}