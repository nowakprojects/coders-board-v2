import { transparentize } from 'polished';

const colors = {
  primary: {
    dark: '#096dd9',
    main: '#1890ff',
    light: '#40a9ff',
    border: '#91d5ff',
    background: '#e6f7ff',
  },
  info: {
    dark: '#08979c',
    main: '#13c2c2',
    light: '#36cfc9',
    border: '#87e8de',
    background: '#e6fffb',
  },
  success: {
    dark: '#389e0d',
    main: '#52c41a',
    light: '#73d13d',
    border: '#b7eb8f',
    background: '#f6ffed',
  },
  warning: {
    dark: '#d48806',
    main: '#faad14',
    light: '#ffc53d',
    border: '#ffe58f',
    background: '#fffbe6',
  },
  error: {
    dark: '#cf1322',
    main: '#f5222d',
    light: '#ff4d4f',
    border: '#ffa39e',
    background: '#fff1f0',
  },
  background: {
    base: transparentize(0.96, '#000'),
    light: transparentize(0.98, '#000'),
    body: '#f0f2f5',
    component: '#fff',
  },
  border: {
    base: transparentize(0.85, '#000'),
    split: transparentize(0.91, '#000'),
  },
  text: {
    title: transparentize(0.15, '#000'),
    primary: transparentize(0.35, '#000'),
    secondary: transparentize(0.55, '#000'),
    disabled: transparentize(0.75, '#000'),
    white: '#fff',
  },
  common: {
    black: '#000',
    white: '#fff',
  },
};

const fonts = {
  main:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  code: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
};

const fontSizes = {
  h1: 38,
  h2: 30,
  h3: 24,
  h4: 20,
  large: 16,
  normal: 14,
  small: 12,
};

const lineHeights = {
  h1: 1.23,
  h2: 1.35,
  h3: 1.35,
  h4: 1.4,
  large: 1.5715,
  normal: 1.5715,
  small: 1.5715,
};

const fontWeights = {
  normal: 400,
  bold: 600,
};

const shadows = {};

const radii = {
  small: 4,
};

const breakpoints = {
  default: '0px',
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export const theme = {
  space: [] as number[],
  colors,
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  shadows,
  radii,
  breakpoints,
};
