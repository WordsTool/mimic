import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Typography from '../base/Typography';
import Logo from '../../icons/Logo';
import List, { ListItem, ListItemAction, ListItemContent } from '../base/List';
import PinIcon from '../../icons/PinIcon';
import OpenInNewIcon from '../../icons/OpenInNewIcon';
import CloseIcon from '../../icons/CloseIcon';
import PoweredBy from '../common/PoweredBy';
import IconButton from '../base/IconButton';
import MainInput from './MainInput';

type PositionType = 'right' | 'left';

export interface PanelPropsType {
  position: PositionType,
  isHidden: boolean,
  toggleHidden: () => void,
  pinned: boolean,
  togglePinned: () => void,
  dictionaries: { name: string, onPress: () => void, onPressNew: () => void, active: boolean }[],
}

const Container = styled.div<{ position: PositionType, isHidden: boolean }>`
  position: fixed;
  width: 304px;
  display: flex;
  flex-direction: column;
  transform: ${({ isHidden, position }) => (
    ((isHidden && (position === 'left')) || (!isHidden && (position === 'right'))) ? 'translateX(-304px)' : 'translateX(0)'
  )};
  left: ${({ position }) => (position === 'left' ? '0' : '100%')}; 
  transition: transform 0.1s ease-in-out;
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
  font-size: 18px;  
  margin: 0 0 0 20px;
`;
const CloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 16px;
`;

const DictList = styled(List)`
  overflow: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const PinAndUnpinIcon = styled(PinIcon)<{ pinned: boolean }>`
  transform: ${({ pinned }) => (pinned ? 'rotate(45deg)' : 'rotate(0deg)')}; 
`;

const Panel = (props: PanelPropsType) => {
  const {
    dictionaries,
    isHidden,
    toggleHidden,
    pinned,
    togglePinned,
    position,
  } = props;

  const [inTransition, toggleTransition] = React.useState(!isHidden);
  const firstRender = React.useRef(false);

  React.useEffect(
    () => {
      if (firstRender.current) {
        toggleTransition(true);
      }
      firstRender.current = true;
    },
    [isHidden],
  );
  const onAnimationEnd = () => {
    toggleTransition(false);
  };

  return (
    <Container onTransitionEnd={onAnimationEnd} isHidden={isHidden} position={position}>
      {isHidden && !inTransition ? null : (
        <>
          <Head>
            <HeadLogo />
            <Title variant="subtitle1">
              mimic dictionary
            </Title>
            <CloseButton onClick={toggleHidden}>
              <CloseIcon />
            </CloseButton>
          </Head>
          <Form>
            <MainInput />
          </Form>
          <DictList>
            {dictionaries.map(({ name, active }) => (
              <ListItem key={name} active={active}>
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
            <IconButton onClick={() => togglePinned()}>
              <PinAndUnpinIcon pinned={pinned} />
            </IconButton>
          </Footer>
        </>
      )}
    </Container>
  );
};

export default Panel;
