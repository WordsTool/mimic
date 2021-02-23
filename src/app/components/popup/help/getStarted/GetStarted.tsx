import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Typography from '../../../base/Typography';
import i18n from '../../../../utils/i18n';
import HelpTitle from '../HelpTitle';

const Container = styled.div`
  margin: 0 0 24px 0;
`;

const GetStartedText = styled(Typography).attrs({ variant: 'body2' })`
  margin: 8px 0;
`;

const GetStartedItem = styled(Typography).attrs({ variant: 'body2' })`
  margin: 0 0 12px 0;
  &:before {
    content: '-';
    margin: 0 8px 0 0;
  }
`;

const GetStarted: FunctionComponent = () => (
  <Container>
    <HelpTitle>
      {i18n('get_started_title')}
    </HelpTitle>
    <GetStartedText>
      {i18n('get_started_begin')}
    </GetStartedText>
    <GetStartedText>
      {i18n('get_started_select')}
    </GetStartedText>
    <GetStartedItem>
      {i18n('get_started_select_step1')}
    </GetStartedItem>
    <GetStartedItem>
      {i18n('get_started_select_step2')}
    </GetStartedItem>
  </Container>
);

export default GetStarted;
