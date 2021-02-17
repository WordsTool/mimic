import * as React from 'react';
import styled from 'styled-components';
import Logo from '../icons/Logo';

type VerticalPosition = 'top' | 'center' | 'bottom';

type HorizontalType = 'left' | 'right';

type TailPosition = {
  horizontal: HorizontalType,
  vertical: VerticalPosition,
};

const verticalPositions: { top: string, center: string, bottom: string } = {
  top: '25%',
  center: '50%',
  bottom: '75%',
};

const Container = styled.div<{ vertical: VerticalPosition, horizontal: HorizontalType, hidden: boolean }>`
  cursor: pointer;
  position: fixed;
  top: ${({ vertical }) => verticalPositions[vertical]};
  background-color: ${(props) => props.theme.palette.primary.main};
  width: 40px;
  height: 40px;
  margin: -20px 0 0 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,.2), 0px 1px 18px 0px rgba(0,0,0,.12), 0px 6px 10px 0px rgba(0,0,0,.14);
  transition: transform 0.1s ease-in-out;
  left: ${({ horizontal }) => ({ left: '0', right: '100%' }[horizontal])};
  border-radius: ${({ horizontal }) => ({ left: '0 10px 10px 0', right: '10px 0 0 10px' }[horizontal])};
  transform: ${({ horizontal, hidden }) => (hidden
    ? ({ left: 'translateX(-24px)', right: 'translateX(-16px)' }[horizontal])
    : ({ left: 'translateX(-40px)', right: 'translateX(0px)' }[horizontal]))};
  flex-direction: ${({ horizontal }) => ({ left: 'row', right: 'row-reverse' }[horizontal])};
  :hover {
    transform: ${({ horizontal }) => ({ left: 'translateX(0);', right: 'translateX(-40px);' }[horizontal])};
  }
`;

const StyledLogo = styled(Logo)`
    width: 20px;
    height: 20px;
    margin: 10px 4px;
    * {
        fill: #ffffff
    }
`;
const Arrow = styled.svg<{ horizontal: HorizontalType }>`
    width: 8px;
    height: 16px;
    transform: ${({ horizontal }) => ({ left: 'rotate(0deg)', right: 'rotate(180deg)' }[horizontal])};
    path {
        fill: #ffffff
    };
`;

type TailPropsType = { hidden: boolean, position: TailPosition, onClick: () => void };

const Tail = ({ onClick, position, hidden }: TailPropsType) => {
  const {
    horizontal,
    vertical,
  } = position;

  return (
    <Container
      onClick={onClick}
      vertical={vertical}
      horizontal={horizontal}
      hidden={hidden}
      role="button"
    >
      <StyledLogo />
      <Arrow viewBox="0 0 8 16" horizontal={horizontal}>
        <path d="M1.52227 0L0 1.88L4.94467 8L0 14.12L1.52227 16L8 8L1.52227 0Z" />
      </Arrow>
    </Container>
  );
};

export default Tail;
