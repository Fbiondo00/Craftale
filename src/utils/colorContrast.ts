/**
 * Color Contrast Verification Utility
 * Ensures WCAG 2.1 Level AA/AAA compliance for APTY design system
 *
 * Implementation based on official W3C/WCAG 2.1 specifications:
 * - https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 * - https://www.w3.org/TR/WCAG21/#contrast-minimum
 * - https://www.w3.org/TR/WCAG21/#contrast-enhanced
 *
 * All formulas and thresholds are scientifically accurate and standards-compliant
 * according to WCAG 2.1 Success Criteria 1.4.3 (AA) and 1.4.6 (AAA)
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB triplet string to RGB object
 */
function rgbTripletToRgb(triplet: string): { r: number; g: number; b: number } | null {
  const parts = triplet.trim().split(/\s+/).map(Number);
  if (parts.length === 3 && parts.every(n => !isNaN(n) && n >= 0 && n <= 255)) {
    return { r: parts[0], g: parts[1], b: parts[2] };
  }
  return null;
}

/**
 * Calculate relative luminance per WCAG guidelines
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 *
 * Official W3C Formula:
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 *
 * Where R, G, B are defined as:
 * if RsRGB <= 0.03928 then R = RsRGB/12.92
 * else R = ((RsRGB+0.055)/1.055) ^ 2.4
 *
 * These coefficients (0.2126, 0.7152, 0.0722) are based on the
 * ITU-R Recommendation BT.709 for the sRGB color space
 */
function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb;

  // Convert to sRGB (normalize to 0-1 range)
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  // Apply gamma correction as per WCAG 2.1 specification
  // Threshold: 0.03928, Linear divisor: 12.92, Gamma: 2.4
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  // Calculate luminance using ITU-R BT.709 coefficients
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 *
 * Official W3C Formula:
 * Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
 * Where L1 is the relative luminance of the lighter color
 * and L2 is the relative luminance of the darker color
 *
 * Reference: https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export function getContrastRatio(
  color1: string | { r: number; g: number; b: number },
  color2: string | { r: number; g: number; b: number },
): number {
  // Convert colors to RGB if needed
  let rgb1: { r: number; g: number; b: number } | null;
  let rgb2: { r: number; g: number; b: number } | null;

  if (typeof color1 === "string") {
    rgb1 = color1.startsWith("#") ? hexToRgb(color1) : rgbTripletToRgb(color1);
  } else {
    rgb1 = color1;
  }

  if (typeof color2 === "string") {
    rgb2 = color2.startsWith("#") ? hexToRgb(color2) : rgbTripletToRgb(color2);
  } else {
    rgb2 = color2;
  }

  if (!rgb1 || !rgb2) {
    throw new Error("Invalid color format");
  }

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  // Ensure L1 is the lighter color
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG 2.1 Compliance Levels
 *
 * Based on WCAG 2.1 Success Criteria:
 * - 1.4.3 Contrast (Minimum) - Level AA
 * - 1.4.6 Contrast (Enhanced) - Level AAA
 *
 * Reference: https://www.w3.org/TR/WCAG21/#contrast-minimum
 * Reference: https://www.w3.org/TR/WCAG21/#contrast-enhanced
 */
export const WCAG_LEVELS = {
  AA_NORMAL: 4.5, // Level AA for normal text (WCAG SC 1.4.3)
  AA_LARGE: 3, // Level AA for large text (18pt+ or 14pt+ bold)
  AAA_NORMAL: 7, // Level AAA for normal text (WCAG SC 1.4.6)
  AAA_LARGE: 4.5, // Level AAA for large text
} as const;

/**
 * Check if contrast ratio meets WCAG requirements
 */
export function meetsWCAG(ratio: number, level: keyof typeof WCAG_LEVELS = "AA_NORMAL"): boolean {
  return ratio >= WCAG_LEVELS[level];
}

/**
 * Get WCAG compliance level for a contrast ratio
 */
export function getWCAGLevel(ratio: number, isLargeText: boolean = false): string {
  if (isLargeText) {
    if (ratio >= WCAG_LEVELS.AAA_LARGE) return "AAA";
    if (ratio >= WCAG_LEVELS.AA_LARGE) return "AA";
  } else {
    if (ratio >= WCAG_LEVELS.AAA_NORMAL) return "AAA";
    if (ratio >= WCAG_LEVELS.AA_NORMAL) return "AA";
  }
  return "Fail";
}

/**
 * Get CSS variable value from document
 */
export function getCSSVariableValue(variableName: string): string | null {
  if (typeof window === "undefined") return null;

  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variableName).trim();
  return value || null;
}

/**
 * Test APTY color combinations for WCAG compliance
 */
export interface ContrastTestResult {
  foreground: string;
  background: string;
  ratio: number;
  normalText: {
    AA: boolean;
    AAA: boolean;
  };
  largeText: {
    AA: boolean;
    AAA: boolean;
  };
  recommendation?: string;
}

export function testColorContrast(foreground: string, background: string): ContrastTestResult {
  const ratio = getContrastRatio(foreground, background);

  const result: ContrastTestResult = {
    foreground,
    background,
    ratio: Math.round(ratio * 100) / 100,
    normalText: {
      AA: meetsWCAG(ratio, "AA_NORMAL"),
      AAA: meetsWCAG(ratio, "AAA_NORMAL"),
    },
    largeText: {
      AA: meetsWCAG(ratio, "AA_LARGE"),
      AAA: meetsWCAG(ratio, "AAA_LARGE"),
    },
  };

  // Add recommendations
  if (!result.normalText.AA) {
    result.recommendation = `Contrast ratio ${result.ratio}:1 fails WCAG AA for normal text (requires 4.5:1)`;
  } else if (!result.normalText.AAA && result.normalText.AA) {
    result.recommendation = `Meets AA but not AAA for normal text (AAA requires 7:1)`;
  }

  return result;
}

/**
 * Test all APTY design system color combinations
 */
export function testAPTYColorSystem(): Record<string, ContrastTestResult> {
  const results: Record<string, ContrastTestResult> = {};

  // Get APTY colors from CSS variables (if in browser)
  if (typeof window !== "undefined") {
    // Test primary text on backgrounds
    const primaryText = getCSSVariableValue("--apty-text-primary") || "17 17 17";
    const bgBase = getCSSVariableValue("--apty-bg-base") || "255 255 255";
    const bgSubtle = getCSSVariableValue("--apty-bg-subtle") || "248 244 242";
    const bgMuted = getCSSVariableValue("--apty-bg-muted") || "250 249 252";

    results["Primary Text on Base BG"] = testColorContrast(primaryText, bgBase);
    results["Primary Text on Subtle BG"] = testColorContrast(primaryText, bgSubtle);
    results["Primary Text on Muted BG"] = testColorContrast(primaryText, bgMuted);

    // Test brand colors on white
    const brandPrimary = getCSSVariableValue("--apty-primary") || "103 32 255";
    const brandSecondary = getCSSVariableValue("--apty-secondary") || "80 51 255";
    const brandAccent = getCSSVariableValue("--apty-accent") || "255 78 140";

    results["Brand Primary on White"] = testColorContrast(brandPrimary, bgBase);
    results["Brand Secondary on White"] = testColorContrast(brandSecondary, bgBase);
    results["Brand Accent on White"] = testColorContrast(brandAccent, bgBase);

    // Test white text on brand colors
    const whiteText = "255 255 255";
    results["White on Brand Primary"] = testColorContrast(whiteText, brandPrimary);
    results["White on Brand Secondary"] = testColorContrast(whiteText, brandSecondary);
    results["White on Brand Accent"] = testColorContrast(whiteText, brandAccent);

    // Test state colors
    const successText = getCSSVariableValue("--apty-success-text") || "0 126 51";
    const successBg = getCSSVariableValue("--apty-success-bg") || "232 248 240";
    const errorText = getCSSVariableValue("--apty-error-text") || "204 0 0";
    const errorBg = getCSSVariableValue("--apty-error-bg") || "255 235 235";

    results["Success Text on Success BG"] = testColorContrast(successText, successBg);
    results["Error Text on Error BG"] = testColorContrast(errorText, errorBg);
  }

  return results;
}

/**
 * Format contrast test results for console output
 */
export function formatContrastResults(results: Record<string, ContrastTestResult>): string {
  let output = "\n🎨 APTY Color Contrast Test Results\n";
  output += "═".repeat(60) + "\n\n";

  for (const [label, result] of Object.entries(results)) {
    const status = result.normalText.AA ? "✅" : "❌";
    const level = result.normalText.AAA ? "AAA" : result.normalText.AA ? "AA" : "FAIL";

    output += `${status} ${label}\n`;
    output += `   Ratio: ${result.ratio}:1 (${level})\n`;
    if (result.recommendation) {
      output += `   ⚠️  ${result.recommendation}\n`;
    }
    output += "\n";
  }

  // Summary
  const passing = Object.values(results).filter(r => r.normalText.AA).length;
  const total = Object.values(results).length;
  const percentage = Math.round((passing / total) * 100);

  output += "─".repeat(60) + "\n";
  output += `Summary: ${passing}/${total} combinations pass WCAG AA (${percentage}%)\n`;

  return output;
}

/**
 * Run contrast tests and log results
 */
export function runContrastAudit(): void {
  const results = testAPTYColorSystem();
  console.log(formatContrastResults(results));

  // Also return structured data for programmatic use
  return results as any;
}
