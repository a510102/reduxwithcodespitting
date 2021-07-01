import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useTodoPageSlice } from '../../slice';
import { Todo } from '../../slice/types';
import { ListItem } from '../../components/ListItem';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface Props {
  todoItem: Todo;
}

export function TodoItem(props: Props) {
  const { todoItem } = props;
  const dispatch = useDispatch();
  const { actions } = useTodoPageSlice();

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(todoItem.content);

  const handleDeleteTodo = (todoItemId: number) => {
    dispatch(actions.deleteTodo(todoItemId));
  };

  const handleEditTodo = (todoItemId: number) => {
    if (editValue) {
      dispatch(actions.updateTodo({ id: todoItemId, content: editValue }));
      setIsEdit(false);
    }
  };

  return (
    <ListItem key={todoItem.id}>
      {isEdit ? (
        <Input
          value={editValue}
          onChange={({ target }) => setEditValue(target.value)}
        />
      ) : (
        <ItemContent onClick={() => setIsEdit(true)}>
          {todoItem.content}
        </ItemContent>
      )}
      <ItemButtons isEdit={isEdit}>
        <Button
          onClick={() => {
            handleEditTodo(todoItem.id);
          }}
        >
          Edit
        </Button>
        {isEdit && <Button onClick={() => setIsEdit(false)}>Cancel</Button>}
        <Button onClick={() => handleDeleteTodo(todoItem.id)}>Delete</Button>
      </ItemButtons>
    </ListItem>
  );
}

const ItemContent = styled.p`
  font-size: 1rem;
  padding: 4px;
  flex: 1;
`;

interface ItemButtonsProps {
  isEdit: boolean;
}

const ItemButtons = styled.div<ItemButtonsProps>`
  width: ${props => (props.isEdit ? '50%' : '30%')};
  padding: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
