import styled from 'styled-components';

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => (theme.palette.surface.dark)}
`;

export default Divider;
