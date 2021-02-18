/* eslint-disable react/no-unused-prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,max-len */
import React from 'react';
import styled from 'styled-components';
import UIPosition = mimic.UIPosition;
import UIHorizontalType = mimic.UIHorizontalType;
import UIVerticalType = mimic.UIVerticalType;
import UITailPosition = mimic.UITailPosition;

type PanelControlPropsType = {
  active: boolean,
  value: UIHorizontalType,
  onClick: () => void;
  className?: string,
};

const PanelControl = ({ className, onClick }: PanelControlPropsType) => (
  <div role="button" className={className} onClick={onClick}>
    <svg width="7" height="14" viewBox="0 0 7 14">
      <path d="M7 14L6.11959e-07 7L7 6.11959e-07L7 14Z" fill="#BDBDBD" />
    </svg>
  </div>
);

PanelControl.defaultProps = {
  className: null,
};

const StyledPanelControl = styled(PanelControl)<PanelControlPropsType>`
  width: 22px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: ${({ theme, active }) => (active ? `1px solid ${theme.palette.primary.main}` : `1px dashed ${theme.palette.text.light}`)};
  svg {
    transform: ${({ value }) => (value === 'left' ? 'rotate(180deg)' : '')};
    * {
      fill: ${({ theme, active }) => (active ? theme.palette.primary.main : theme.palette.text.light)};
    }
  } 
`;

type TailControlPropsType = UITailPosition & {
  onClick: () => void, active: boolean, className?: string };

const TailControl = ({
  onClick, className,
}: TailControlPropsType) => (
  <div
    role="button"
    className={className}
    onClick={() => { onClick(); }}
  >
    <div />
  </div>
);

TailControl.defaultProps = {
  className: null,
};

const StylesTailControl = styled(TailControl)<TailControlPropsType>`
  width: 20px;
  height: 24px;
  justify-content: ${({ horizontal }) => ({ left: 'flex-start', right: 'flex-end' }[horizontal])};  
  border-radius: ${({ horizontal }) => ({ left: '0 4px 4px 0', right: '4px 0 0 4px' }[horizontal])};
  position: absolute;
  left: ${({ horizontal }) => ({ left: '0', right: '100%' }[horizontal])};;
  margin-left: ${({ horizontal }) => ({ left: '0', right: '-20px' }[horizontal])};;
  top: ${({ vertical }) => ({ top: '0', center: '50%', bottom: '100%' }[vertical])};;
  margin-top: ${({ vertical }) => ({ top: '0', center: '-12px', bottom: '-24px' }[vertical])};;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
  div {
    width: 8px;
    height: 6px;
    border-radius: ${({ horizontal }) => (horizontal === 'left' ? '0 2px 2px 0' : '2px 0 0 2px')};
    background-color: ${({ theme, active }) => (active ? theme.palette.primary.main : theme.palette.text.light)};
  }
`;

const verticalList = ['top', 'center', 'bottom'];
const horizontalList = ['left', 'right'];

const tailPositions: [UIHorizontalType, UIVerticalType][] = horizontalList
  .reduce((m, h) => [...m, ...verticalList.map((v) => [h, v])], []);

type PositionControlPropsType = {
  ui: UIPosition,
  onChange: (ui: UIPosition) => void,
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 128px;
  height: 74px;
`;
const TailsBlock = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 4px;
  position: relative;
  border: ${({ theme }) => (`1px solid ${theme.palette.text.light}`)};
`;

const PositionControl = ({ ui: { tail, panel }, onChange }: PositionControlPropsType) => {
  const getPanelControl = (side: UIHorizontalType) => (
    <StyledPanelControl
      active={panel === side}
      value={side}
      onClick={() => onChange({ tail, panel: side })}
    />
  );

  return (
    <Container>
      {getPanelControl('left')}
      <TailsBlock>
        {tailPositions.map(([horizontal, vertical]) => (
          <StylesTailControl
            vertical={vertical}
            horizontal={horizontal}
            active={tail.vertical === vertical && tail.horizontal === horizontal}
            onClick={() => {
              onChange({ panel, tail: { vertical, horizontal } });
            }}
          />
        ))}
      </TailsBlock>
      {getPanelControl('right')}
    </Container>
  );
};

export default PositionControl;
