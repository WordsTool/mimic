import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Typography from '../../base/Typography';
import i18n from '../../../utils/i18n';
import { contacts } from '../../../../settings';

const { email, patreon } = contacts;

const Container = styled.div`
  padding: 28px 20px 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
`;

const Glad = styled(Typography).attrs({ variant: 'body2' })`
  text-align: center;
  margin: 0 0 12px 0;
`;

const HasQuestion = styled(Typography).attrs({ variant: 'body2' })`
  text-align: center;
  margin: 0 0 26px 0;
`;

const Contact = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 6px 20px;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) => (theme.palette.primary.main)};
`;

const Support = styled.div`
  position: absolute;
  right: 156px;
  bottom: 20px;
  line-height: 140%;
  font-size: 12px;
  white-space: pre-line;
  text-align: right;
  color: #828282;
`;


const ArrowSvg = styled.svg`
  position: absolute;
  right: 72px;
  bottom: 0;
  width: 68px;
  height: 38px;
`;

const ArrowPath = styled.path`
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
    <Support>
      {i18n('contact_support')}
    </Support>
    <ArrowSvg viewBox="0 0 68 39">
      <ArrowPath
        d="M45.8084 28.158C45.3768 27.8064 45.3197 27.1768 45.6811 26.7557L46.3351 25.9939C46.6911 25.5791 47.3205 25.5224 47.7475 25.8666L60.3684 36.0416L59.8335 37.7928C59.6257 38.4731 58.7785 38.7245 58.2219 38.2711L45.8084 28.158Z"
        fill="#828282"
      />
      <ArrowPath
        d="M65.2435 22.886C65.5255 22.4168 66.1401 22.2589 66.6198 22.5324L67.4971 23.0325C67.9802 23.3079 68.1437 23.9162 67.8621 24.39L59.7755 37.9933C59.4097 38.6086 58.5222 38.6555 58.0913 38.0822L56.9912 36.6184L65.2435 22.886Z"
        fill="#828282"
      />
      <ArrowPath
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.1711 9.66998C33.5967 4.985 20.4721 3.4746 0 3.4746V0.5C20.4161 0.5 34.2979 1.96419 43.6436 7.07058C53.1857 12.2843 57.7447 21.1249 60.0504 34.9634L57.0614 35.4438C54.824 22.0152 50.5492 14.2477 42.1711 9.66998Z"
        fill="#828282"
      />
    </ArrowSvg>
  </Container>
);

export default ContactUs;
