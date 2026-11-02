/**
 * The carnival's colours, fonts and sizes. Games draw with these rather than
 * their own values, so every booth on the midway looks like it belongs.
 */
export const theme = {
  colors: {
    background: '#140b1f',
    surface: '#2a1640',
    text: '#fbf4ff',
    muted: '#c9b3ec',
    accent: '#ff7a1a',
    danger: '#ff4d4d',
    stripeA: '#ff7a1a',
    stripeB: '#7a3fc4',
    water: '#5ff0d0',
    wood: '#8a5a3b',
    slime: '#7cff3a',
    witch: '#b14dff',
  },
  font: {
    family: '"Trebuchet MS", "Segoe UI", system-ui, sans-serif',
    small: 14,
    body: 18,
    title: 32,
  },
  radius: 12,
  canvas: {
    width: 800,
    height: 500,
  },
} as const;

/** Canvas font string, e.g. canvasFont('title') → 'bold 32px "Trebuchet MS", …'. */
export function canvasFont(size: 'small' | 'body' | 'title', weight: 'normal' | 'bold' = 'normal') {
  return `${weight} ${theme.font[size]}px ${theme.font.family}`;
}

/** Exposes the theme to CSS as custom properties, e.g. --color-accent. */
export function applyTheme(root: HTMLElement = document.documentElement) {
  for (const [name, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--color-${name}`, value);
  }
  root.style.setProperty('--font-family', theme.font.family);
  root.style.setProperty('--radius', `${theme.radius}px`);
}
