/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Typography from '../base/Typography';
import Switch from '../base/Switch';
import DragIcon from '../../icons/DragIcon';
import List, {
  ListItem, ListItemAction, ListItemContent, ListItemIcon,
} from '../base/List';

const ListContainer = styled(List)<{ isDraggingOver: boolean }>`
  background-color: ${({ isDraggingOver, theme }) => (isDraggingOver ? '#F6F6F6' : theme.palette.paper.main)};
`;

const SortableListItem = styled(ListItem)<{ isDragging: boolean }>`
  box-shadow: ${({ isDragging }) => (isDragging ? '0px 3px 5px 0px rgba(0,0,0,.1)' : 'none')};
  background-color: ${(props) => props.theme.palette.paper.main};
`;

const SortableList = ({ list }: { list: { name: string }[] }) => {
  const [currentList, updateList] = React.useState(
    list.map((item) => ({ ...item, enabled: true })),
  );

  const reorder = (souce: number, dist: number) => {
    const result = Array.from(currentList);
    const [removed] = result.splice(souce, 1);
    result.splice(dist, 0, removed);

    updateList(result);
  };

  const toggleEnabled = (index: number) => {
    currentList[index].enabled = !currentList[index].enabled;

    updateList([...currentList]);
  };

  const onDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      reorder(result.source.index, result.destination.index);
    },
    [currentList],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {({ droppableProps, placeholder, innerRef }, { isDraggingOver }) => (
          <ListContainer
            {...droppableProps}
            isDraggingOver={isDraggingOver}
            ref={innerRef}
          >
            {currentList.map(({ name, enabled }, index) => (
              <Draggable key={name} draggableId={name} index={index}>
                {(
                  { draggableProps, dragHandleProps, innerRef: draggableInnerRef },
                  { isDragging },
                ) => (
                  <SortableListItem
                    {...draggableProps}
                    {...dragHandleProps}
                    isDragging={isDragging}
                    ref={draggableInnerRef}
                    key={name}
                  >
                    <ListItemIcon>
                      <DragIcon />
                    </ListItemIcon>
                    <ListItemContent>
                      <Typography variant="subtitle1">
                        {name}
                      </Typography>
                    </ListItemContent>
                    <ListItemAction>
                      <Switch checked={enabled} onChange={() => toggleEnabled(index)} />
                    </ListItemAction>
                  </SortableListItem>
                )}
              </Draggable>
            ))}
            {placeholder}
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SortableList;
