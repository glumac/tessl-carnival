import { theme } from '../carnival';

const { colors } = theme;

/**
 * The midway map's Halloween night palette. Tent reds, creams and golds come
 * from the carnival theme; the sky, grass, paths and other scenery shades only
 * the map uses live here.
 */
export const palette = {
  sky: '#2a1442',
  skyHigh: '#07040f',
  cloud: 'rgba(120, 104, 160, 0.35)',
  cloudShade: 'rgba(84, 70, 120, 0.3)',
  haze: '#3a2f52',
  moon: '#f4ecc8',
  moonShade: '#d9cc9a',
  moonGlow: 'rgba(244, 236, 200, 0.12)',

  grass: '#1f3324',
  grassDark: '#152419',
  grassEdge: '#14211a',
  grassLight: '#27402c',
  path: '#5a5068',
  pathShade: '#463e54',
  hedge: '#1d3a26',
  hedgeDark: '#122719',
  hedgeLight: '#2a4d33',
  shadow: 'rgba(0, 0, 0, 0.4)',

  pumpkin: '#f07a1a',
  pumpkinShade: '#c25a10',
  pumpkinStem: '#3f5a1e',
  lantern: '#ffd84a',
  lanternGlow: 'rgba(255, 170, 40, 0.22)',
  ghost: 'rgba(245, 245, 255, 0.78)',
  ghostShade: 'rgba(200, 200, 235, 0.6)',
  orange: '#ff8c1a',
  slime: '#8fe33a',
  purple: '#8e4fd1',

  red: colors.stripeA,
  redShade: '#b8283a',
  cream: colors.stripeB,
  creamShade: '#e3d9c2',
  gold: colors.accent,
  goldShade: '#e0a91c',
  blue: '#2b8ccc',
  blueShade: '#1f6aa0',
  sky2: colors.water,
  pink: '#f59ac0',
  pinkShade: '#e076a4',
  wood: colors.wood,
  woodDark: '#6b4429',
  woodLight: '#b7834f',
  board: '#c8955b',
  metal: '#e9e4f2',
  metalShade: '#b9b0cc',
  ink: colors.background,
  opening: '#4a2a28',
  closed: '#a99cc4',
  closedShade: '#8a7daa',
  white: '#ffffff',

  skins: ['#f1c27d', '#c68642', '#8d5524', '#e0ac69', '#ffdbac'],
  hairs: ['#3b2219', '#1b1035', '#a55728', '#e6c35c', '#6b4429'],
  shirts: ['#ff8c1a', '#8fe33a', '#8e4fd1', colors.danger, '#2b8ccc', colors.stripeB],
  pants: ['#2d3a6b', '#3b2a4f', '#5a4a3a'],
  bunting: ['#ff8c1a', '#8e4fd1', '#8fe33a', colors.stripeB],
  balloons: ['#ff8c1a', '#8e4fd1', '#8fe33a', colors.accent, colors.stripeA],
} as const;
