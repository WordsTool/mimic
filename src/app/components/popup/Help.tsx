import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Faq from './help/faq/Faq';
import GetStarted from './help/getStarted/GetStarted';

const Container = styled.div`
  padding: 0 20px;
`;

const Help: FunctionComponent = () => (
  <Container>
    <GetStarted />
    <Faq />
  </Container>
);

export default Help;
