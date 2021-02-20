import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import prefersColorScheme from 'css-prefers-color-scheme';
import * as themes from '../styles/theme';
import UIColorSchemeType = mimic.UIColorSchemeType;

let browserScheme: 'light' | 'dark' = 'light';

try {
  browserScheme = prefersColorScheme().scheme;
  console.log({ browserScheme });
} catch (e) {
}

type ThemePropsType = {
  children: React.ReactNode,
  theme: UIColorSchemeType,
};

const Theme = ({ children, theme }: ThemePropsType) => (
  <ThemeProvider theme={themes[theme || browserScheme]}>
    {children}
  </ThemeProvider>
);

export default Theme;
