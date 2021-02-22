import React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';

const Container = styled.div``;

const Help = () => (
  <Container>
    <Typography>
      {chrome.i18n.getMessage('popup_help_get_started_title')}
    </Typography>
  </Container>
);

export default Help;
