import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Typography from '../base/Typography';
import Switch from '../base/Switch';
import DragIcon from '../../icons/DragIcon';
import List, {
  ListItem, ListItemAction, ListItemContent, ListItemIcon,
} from '../base/List';
import Dictionary = mimic.Dictionary;
import DictionaryConfig = mimic.DictionaryConfig;
import EventCommonSetting = mimic.popup.EventCommonSetting;

const ListContainer = styled(List)<{ isDraggingOver: boolean }>`
  background-color: ${({ isDraggingOver, theme }) => (isDraggingOver && theme.palette.surface.light)};
`;

const SortableListItem = styled(ListItem)<{ isDragging: boolean }>`
  box-shadow: ${({ isDragging }) => (isDragging ? '0px 3px 5px 0px rgba(0,0,0,.1)' : 'none')};
  background-color: ${(props) => props.theme.palette.surface.main};
`;

type SortableListPropsType = {
  list: Dictionary[],
  config: DictionaryConfig[],
  onChange: (e: EventCommonSetting) => void,
};

const SortableList = ({ list, config, onChange }: SortableListPropsType) => {
  const [currentList, updateList] = useState<{ id: string, name: string, off: boolean }[]>(
    config.map(({ id, off }) => {
      const { name } = list.find(({ id: itemId }) => id === itemId);
      return { id, name, off };
    }),
  );


  const reorder = (souce: number, dist: number) => {
    const result = Array.from(currentList);
    const [removed] = result.splice(souce, 1);
    result.splice(dist, 0, removed);

    const newConfig = result.map(({ id, off }) => ({ id, off }));
    onChange({ name: 'dictionariesConfig', value: newConfig });

    updateList(result);
  };

  const toggleEnabled = (index: number) => {
    currentList[index].off = !currentList[index].off;

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
            {currentList.map(({ name, off }, index) => (
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
                      <Switch checked={!off} onChange={() => toggleEnabled(index)} />
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
