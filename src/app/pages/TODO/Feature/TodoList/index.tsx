import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useTodoPageSlice } from '../../slice';
import { todoListSelector } from '../../slice/selectors';
import { Button } from '../../components/Button';
import { TodoItem } from '../TodoItem';

export function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector(todoListSelector)?.todoList || [];
  const isShowTodoList = todoList && todoList?.length > 0;
  const { actions } = useTodoPageSlice();

  const handleRestTodo = () => {
    dispatch(actions.clearTodo());
  };

  return (
    <Wrapper>
      {isShowTodoList && <Button onClick={handleRestTodo}>Reset</Button>}
      {isShowTodoList &&
        todoList.map(todoItem => <TodoItem todoItem={todoItem} />)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
`;
