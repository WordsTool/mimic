import styled from 'styled-components';
import Typography from '../../../base/Typography';


export const FaqItemQuestion = styled(Typography).attrs({ variant: 'body1', color: 'dark' })`
  margin: 0 0 8px 0;
`;

export const FaqItemAnswer = styled(Typography).attrs({ variant: 'body2' })`
`;

const FaqItem = styled(Typography).attrs({ variant: 'body2' })`
  margin: 12px 0 20px 0;
`;

export default FaqItem;
