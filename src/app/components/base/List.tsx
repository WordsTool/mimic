import { MouseEvent } from 'react';
import styled from 'styled-components';

const List = styled.div`
  margin: 8px 0;
`;

export const ListItemContent = styled.div`
  text-align: left;
  flex: 1;
`;

export const ListItem = styled.div<{ active?: boolean, onClick?: () => void }>`
  min-height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  margin: 0 4px;
  border-radius: 6px;
  cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'auto')};
  background-color: ${({ active, theme }) => active && theme.palette.highlight.active};
  :hover {
    background-color: ${({ active, theme }) => !active && theme.palette.highlight.hover};
  }
`;

export const ListItemAction = styled.div<{ onClick?: (e: MouseEvent) => void }>`
  cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'auto')}; 
  self-align: flex-end;
  * {
    vertical-align: bottom;
  }
`;

export const ListItemIcon = styled.div`
  margin: 0 16px 0 0;
`;

export default List;
