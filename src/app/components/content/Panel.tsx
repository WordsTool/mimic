import * as React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';
import Logo from '../../icons/Logo';
import List, { ListItem, ListItemAction, ListItemContent } from '../base/List';
import WordstoolLogo from '../../icons/WordstoolLogo';
import PinIcon from '../../icons/PinIcon';
import OpenInNewIcon from '../../icons/OpenInNewIcon';
import CloseIcon from '../../icons/CloseIcon';

type PanelPropsType = {
  dictionaries: { name: string, onPress: () => void, onPressNew: () => void, active: boolean }[],
};

const Container = styled.div`
  position: fixed;
  width: 304px;
  display: flex;
  flex-direction: column;
  // left: -311px;
  top: 0;
  height: 100%;
  z-index: 100000;
  background-color: ${({ theme }) => theme.palette.paper.main};
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,.2), 0px 1px 18px 0px rgba(0,0,0,.12), 0px 6px 10px 0px rgba(0,0,0,.14);
`;

const Head = styled.div`
  height: 64px;
  padding: 0 0 0 20px;
  display: flex;
  flex-direction: row;  
  align-items: center;
`;

const Form = styled.div`
  padding: 20px 16px;
  background-color: ${({ theme }) => theme.palette.primary.main}
`;

const Footer = styled.div`
`;

const HeadLogo = styled(Logo)`
  width: 32px;
  height: 32px;  
`;
const Title = styled(Typography)`
  font-size: 16px;
  margin: 0 0 0 20px;
`;
const CloseButton = styled.div`
  position: absolute;
  right: 12px;
  top: 16px;
  padding: 8px;
  cursor: pointer;
`;
const MainInput = styled.input`
  width: 100%;
  height: 42px;
  line-height: 42px;
`;
const DictList = styled(List)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Panel = ({ dictionaries }: PanelPropsType) => (
  <Container>
    <Head>
      <HeadLogo />
      <Title variant="subtitle1">
        mimic dictionary
      </Title>
      <CloseButton role="button">
        <CloseIcon />
      </CloseButton>
    </Head>
    <Form>
      <div>
        <MainInput />
      </div>
    </Form>
    <DictList>
      {dictionaries.map(({ name}) => (
        <ListItem key={name}>
          <ListItemContent>
            <Typography variant="subtitle1">
              {name}
            </Typography>
          </ListItemContent>
          <ListItemAction>
            <OpenInNewIcon />
          </ListItemAction>
        </ListItem>
      ))}
    </DictList>
    <Footer>
      <WordstoolLogo />
      <Typography variant="overline">
        powered by
      </Typography>
      <Typography variant="body1">
        WordsTool
      </Typography>
      <PinIcon />
    </Footer>
  </Container>
);

export default Panel;
