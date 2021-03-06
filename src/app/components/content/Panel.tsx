import React, { FunctionComponent, MouseEvent } from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';
import Logo from '../../icons/Logo';
import List, { ListItem, ListItemContent } from '../base/List';
import PinIcon from '../../icons/PinIcon';
import OpenInNewIcon from '../../icons/OpenInNewIcon';
import CloseIcon from '../../icons/CloseIcon';
import PoweredBy from '../common/PoweredBy';
import IconButton from '../base/IconButton';
import i18n from '../../utils/i18n';
import Dictionary = mimic.Dictionary;

type PositionType = 'right' | 'left';
type DictionaryItem = {
  dictionary: Dictionary,
  active: boolean,
};

export interface PanelPropsType {
  position: PositionType,
  isHidden: boolean,
  toggleHidden: () => void,
  pinned: boolean,
  togglePinned: () => void,
  dictionaries: DictionaryItem[],
  mainInput: React.ReactNode,
  onPressItem: (dictionary: Dictionary) => void,
  onPressItemNew: (dictionary: Dictionary) => void,
}

const PANEL_WIDTH = 240;

const Container = styled.div<{ position: PositionType, isHidden: boolean }>`
  position: fixed;
  width: ${PANEL_WIDTH}px;
  display: flex;
  flex-direction: column;
  transform: ${({ isHidden, position }) => (
    ((isHidden && (position === 'left')) || (!isHidden && (position === 'right'))) ? `translateX(-${PANEL_WIDTH}px)` : 'translateX(0)'
  )};
  left: ${({ position }) => (position === 'left' ? '0' : '100%')}; 
  transition: transform 0.1s ease-in-out;
  top: 0;
  height: 100%;
  z-index: 2147483638;
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
  margin: 0 0 0 16px;
  text-transform: lowercase;
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
  transform: ${({ pinned }) => (pinned ? 'rotate(0deg)' : 'rotate(45deg)')}; 
`;

const NewTabActionButton = styled(IconButton)`
  padding: 12px 12px 12px 12px;
  margin: 0 -12px 0 0;
  border-radius: 0 6px 6px 0;
  :hover {
    background-color: ${({ theme }) => theme.palette.highlight.hover}!important;
  }
`;

const DictionaryListItem = styled(ListItem)`
  :hover {
    ${NewTabActionButton} {
      background-color: ${({ active, theme }) => !active && theme.palette.surface.light};
    }
  }
`;


const Panel: FunctionComponent<PanelPropsType> = (props: PanelPropsType) => {
  const {
    dictionaries,
    isHidden,
    toggleHidden,
    pinned,
    togglePinned,
    position,
    mainInput,
    onPressItem,
    onPressItemNew,
  } = props;

  const [inTransition, toggleTransition] = React.useState(!isHidden);
  const firstRender = React.useRef(false);

  React.useEffect(
    () => {
      if (firstRender.current) toggleTransition(true);
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
              {i18n('app_name')}
            </Title>
            <CloseButton onClick={toggleHidden}>
              <CloseIcon />
            </CloseButton>
          </Head>
          <Form>
            {mainInput}
          </Form>
          <DictList>
            {dictionaries.map(({ active, dictionary, dictionary: { id, name } }) => (
              <DictionaryListItem
                title={i18n('content_panel_this_tab_title')}
                key={id}
                ref={(ref) => {
                  if (active && ref) ref.scrollIntoView();
                }}
                active={active}
                onClick={() => onPressItem(dictionary)}
              >
                <ListItemContent>
                  <Typography variant="subtitle1">
                    {name}
                  </Typography>
                </ListItemContent>
                <NewTabActionButton
                  title={i18n('content_panel_new_tab_title')}
                  onClick={(e: MouseEvent) => {
                    onPressItemNew(dictionary);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <OpenInNewIcon />
                </NewTabActionButton>
              </DictionaryListItem>
            ))}
          </DictList>
          <Footer>
            <PoweredBy />
            <IconButton
              onClick={() => togglePinned()}
              title={pinned ? i18n('content_panel_unpin_button_title') : i18n('content_panel_pin_button_title')}
            >
              <PinAndUnpinIcon pinned={pinned} />
            </IconButton>
          </Footer>
        </>
      )}
    </Container>
  );
};

export default Panel;
