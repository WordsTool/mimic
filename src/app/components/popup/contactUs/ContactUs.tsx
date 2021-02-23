import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Typography from '../../base/Typography';
import i18n from '../../../utils/i18n';
import { contacts } from '../../../../settings';

const { email, patreon } = contacts;

const Container = styled.div`
  padding: 24px 20px;
  margin: 0 0 32px 0;
`;

const Glad = styled(Typography).attrs({ variant: 'body2' })`

`;

const HasQuestion = styled(Typography).attrs({ variant: 'body2' })`

`;

const Contact = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) => (theme.palette.primary.main)};
`;

const ContactUs: FunctionComponent = () => (
  <Container>
    <Glad>
      {i18n('contact_glad')}
    </Glad>
    <HasQuestion>
      {i18n('contact_has_question')}
    </HasQuestion>
    <Contact>
      <Typography variant="body2" color="light">
        {i18n('contact_write')}
      </Typography>
      <Link href={`mailto:${email}`}>
        {email}
      </Link>
    </Contact>
    <Contact>
      <Typography variant="body2" color="light">
        {i18n('contact_follow')}
      </Typography>
      <Link href={patreon.url} target="_blank">
        {patreon.text}
      </Link>
    </Contact>
  </Container>
);

export default ContactUs;
