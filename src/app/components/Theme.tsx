import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import prefersColorScheme from 'css-prefers-color-scheme';
import * as themes from '../styles/theme';

let browserScheme: 'light' | 'dark' = 'light';

try {
  browserScheme = prefersColorScheme().scheme;
} catch (e) {
}

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={themes[browserScheme]}>
    {children}
  </ThemeProvider>
);

export default Theme;
