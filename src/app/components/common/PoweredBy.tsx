import * as React from 'react';
import styled from 'styled-components';
import WordstoolLogo from '../../icons/WordstoolLogo';
import Typography from '../base/Typography';

type SizeType = 'medium' | 'small';

type Element = { size: SizeType };

const LogoIcon = styled(WordstoolLogo)<Element>`
  width: ${({ size }) => (size === 'medium' ? '28px' : '24px')};
  height: ${({ size }) => (size === 'medium' ? '28px' : '24px')};
  margin: 0 4px 0 0;
  display: inline-block;
  vertical-align: bottom;
`;
const Powered = styled(Typography)<Element>`
  position: absolute;
  left: ${({ size }) => (size === 'medium' ? '32px' : '28px')};
  top: -2px;
  font-size: ${({ size }) => (size === 'medium' ? '10px' : '8px')};
  line-height: ${({ size }) => (size === 'medium' ? '12px' : '10px')};
  letter-spacing: 0;
  white-space: nowrap;
`;
const WordsTool = styled(Typography)<Element>`
  color: #4C92FF;
  display: inline-block;
  left: ${({ size }) => (size === 'medium' ? '14px' : '12px')};
  font-size: ${({ size }) => (size === 'medium' ? '14px' : '12px')};
  line-height: ${({ size }) => (size === 'medium' ? '18px' : '16px')};
  vertical-align: bottom;
`;

const Container = styled.a`
  position: relative;
  display: inline-block;
`;

const PoweredBy = ({ size }: { size?: SizeType }) => (
  <Container href="https://wordstool.com" target="_blank">
    <Powered size={size} variant="overline">
      powered by
    </Powered>
    <LogoIcon size={size} />
    <WordsTool size={size} variant="subtitle2">
      WordsTool
    </WordsTool>
  </Container>
);

PoweredBy.defaultProps = {
  size: 'medium',
};

export default PoweredBy;
