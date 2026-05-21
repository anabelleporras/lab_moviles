export const COLORS = {
  bg:           '#0a0a0f',
  bgCard:       '#111118',
  wall:         '#3C3489',
  wallLight:    '#534AB7',
  primary:      '#7F77DD',
  primaryDim:   '#534AB7',
  primaryFaint: '#26215C',
  accent:       '#EF9F27',
  teal:         '#1D9E75',
  tealLight:    '#5DCAA5',
  danger:       '#D85A30',
  dangerLight:  '#F0997B',
  textHigh:     '#AFA9EC',
  textMid:      '#888780',
  textLow:      '#444441',
  btnText:      '#EEEDFE'
} as const;

export type ColorKey = keyof typeof COLORS;