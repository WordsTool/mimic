import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  padding: 4px;
  cursor: pointer;
  * {
    vertical-align: bottom;
  }
`;

const IconButton = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Container role="button" {...props} />
);

export default IconButton;
