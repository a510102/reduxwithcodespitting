import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useTodoPageSlice } from './slice';
import { TypeInput } from './Feature/TypeTodo';
import { TodoList } from './Feature/TodoList';

export function TodoPage() {
  const dispatch = useDispatch();
  const { actions } = useTodoPageSlice();

  useEffect(() => {
    dispatch(actions.fetchTodoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <h2>Todo Page</h2>
      <TypeInput />
      <TodoList />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0 16px;
`;
