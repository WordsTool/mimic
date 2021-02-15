import styled from 'styled-components';

const List = styled.div<{ isDraggingOver: boolean }>`
`;

export const ListItem = styled.div`
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

export const ListItemAction = styled.div`
  self-align: flex-end;
`;

export const ListItemContent = styled.div`
  flex: 1;
`;

export const ListItemIcon = styled.div`
  margin: 0 16px 0 0;
`;

export default List;
