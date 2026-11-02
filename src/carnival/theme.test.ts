import { describe, expect, it } from 'vitest';
import { theme } from './theme';

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const { colors } = theme;

describe('theme colours', () => {
  it('keeps text readable on the background and surface', () => {
    expect(contrast(colors.text, colors.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(colors.text, colors.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(colors.muted, colors.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(colors.muted, colors.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps text on the accent readable', () => {
    expect(contrast(colors.background, colors.accent)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps the accent and water easy to see on the background', () => {
    expect(contrast(colors.accent, colors.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(colors.water, colors.background)).toBeGreaterThanOrEqual(4.5);
  });
});
