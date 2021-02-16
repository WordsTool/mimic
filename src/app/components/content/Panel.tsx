import * as React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';
import Logo from '../../icons/Logo';
import List, { ListItem, ListItemAction, ListItemContent } from '../base/List';
import PinIcon from '../../icons/PinIcon';
import OpenInNewIcon from '../../icons/OpenInNewIcon';
import CloseIcon from '../../icons/CloseIcon';
import PoweredBy from '../common/PoweredBy';

type PanelPropsType = {
  hidden: boolean,
  toggleHidden: () => void,
  dictionaries: { name: string, onPress: () => void, onPressNew: () => void, active: boolean }[],
};

const Container = styled.div`
  position: fixed;
  width: 304px;
  display: flex;
  flex-direction: column;
  left: ${({ hidden }) => (hidden ? '-304px' : 0)};
  top: 0;
  height: 100%;
  z-index: 100000;
  background-color: ${({ theme }) => theme.palette.surface.main};
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
  background-color: ${({ theme }) => theme.palette.primary.dark}
`;

const Footer = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;  
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
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
  right: 8px;
  top: 12px;
  padding: 8px;
  cursor: pointer;
`;
const MainInput = styled.input`
  width: 100%;
  padding: 0;
  margin: 0;
  outline: none;
  height: 42px;
  line-height: 42px;
  border: 0;
  border-radius: 4px;
`;

const InputWrapper = styled.div`
`;

const DictList = styled(List)`
  overflow: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Panel = ({ dictionaries, hidden, toggleHidden }: PanelPropsType) => (
  <Container hidden={hidden}>
    <Head>
      <HeadLogo />
      <Title variant="subtitle1">
        mimic dictionary
      </Title>
      <CloseButton role="button" onClick={toggleHidden}>
        <CloseIcon />
      </CloseButton>
    </Head>
    <Form>
      <InputWrapper>
        <MainInput placeholder="Enter phrase" />
      </InputWrapper>
    </Form>
    <DictList>
      {dictionaries.map(({ name }) => (
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
      <PoweredBy />
      <PinIcon />
    </Footer>
  </Container>
);

export default Panel;
