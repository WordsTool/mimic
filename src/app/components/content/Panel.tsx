import * as React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';

const Container = styled.div`
  position: fixed;
  width: 304px;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100000;
  background-color: ${({ theme }) => theme.palette.paper.main};
`;

const Panel = () => (
  <Container>
    <Typography variant="button">button</Typography>
  </Container>
);

export default Panel;
