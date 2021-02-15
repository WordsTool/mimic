import * as React from 'react';
import styled from 'styled-components';
import Logo from '../icons/Logo';

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 50%;
    background-color: ${(props) => props.theme.palette.primary.main};
    width: 40px;
    height: 40px;
    z-index: 10000;
    border-radius: 0 10px 10px 0;
    display: flex;
    align-items: center;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,.2), 0px 1px 18px 0px rgba(0,0,0,.12), 0px 6px 10px 0px rgba(0,0,0,.14);
`;

const StyledLogo = styled(Logo)`
    width: 20px;
    height: 20px;
    margin: 10px 4px;
    * {
        fill: #ffffff
    }
`;
const Arrow = styled.svg`
    width: 8px;
    height: 16px;
    path {
        fill: #ffffff
    };
`;

const Tail = () => {
  return (
    <Container>
      <StyledLogo />
      <Arrow viewBox="0 0 8 16">
        <path d="M1.52227 0L0 1.88L4.94467 8L0 14.12L1.52227 16L8 8L1.52227 0Z" />
      </Arrow>
    </Container>
  );
};

export default Tail;
