import * as React from 'react';
import styled from 'styled-components';

type Variant = 'headline1'
| 'headline2'
| 'headline3'
| 'headline4'
| 'headline5'
| 'headline6'
| 'subtitle1'
| 'subtitle2'
| 'body1'
| 'body2'
| 'button'
| 'caption'
| 'overline';

type TypographyPropsType = {
  variant?: Variant,
  color?: 'main' | 'light' | 'dark',
};

const PrimaryFont = 'Nunito-Light, system-ui, sans-serif';
const SecondaryFont = 'Roboto, system-ui, sans-serif';

const fonts = {
  headline1: [PrimaryFont, 300, 101, -1.5],
  headline2: [PrimaryFont, 300, 63, -0.5],
  headline3: [PrimaryFont, 400, 50, 0],
  headline4: [PrimaryFont, 400, 36, 0.25],
  headline5: [PrimaryFont, 400, 25, 0],
  headline6: [SecondaryFont, 500, 21, 0.15],
  subtitle1: [PrimaryFont, 400, 17, 0.15],
  subtitle2: [SecondaryFont, 500, 15, 0.1],
  body1: [SecondaryFont, 400, 16, 0.5],
  body2: [SecondaryFont, 400, 14, 0.25],
  button: [SecondaryFont, 500, 14, 1.25, 'uppercase'],
  caption: [SecondaryFont, 400, 12, 0.4],
  overline: [SecondaryFont, 400, 10, 1.5],
};

export const getStyle = (variant: Variant): string => {
  const [fontFamily, fontWeight, fontSize, letterSpacing, textTransform] = fonts[variant];
  return `
  font: ${fontSize}px ${fontFamily}; 
  letter-spacing: ${letterSpacing}px;
  font-weight: ${fontWeight};
  ${textTransform ? `text-transform: ${textTransform};` : ''}
  `;
};

const Typography = styled.div<TypographyPropsType>`
  font-family: ${({ variant }) => fonts[variant][0]};
  font-weight: ${({ variant }) => fonts[variant][1]};
  font-size: ${({ variant }) => `${fonts[variant][2]}px`};
  letter-spacing: ${({ variant }) => `${fonts[variant][3]}px`};
  text-transform: ${({ variant }) => fonts[variant][4] || 'inherit'};
  color: ${({ color, theme }) => theme.palette.text[color]};
`;

Typography.defaultProps = {
  variant: 'body1',
  color: 'main',
};

export default Typography;
