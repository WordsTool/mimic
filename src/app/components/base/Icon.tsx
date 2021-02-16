import * as React from 'react';
import styled from 'styled-components';

const Icon = styled.svg`
  * {
    fill: ${({ theme }) => theme.palette.text.light};
  }
`;

export default Icon;
