import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { useTodoPageSlice } from '../../slice';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function TypeInput() {
  const dispatch = useDispatch();
  const { actions } = useTodoPageSlice();

  const [value, setValue] = useState('');

  const addNewTodo = () => {
    if (value) {
      dispatch(actions.addTodo(value));
      setValue('');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Input
          value={value}
          onChange={({ target }) => setValue(target.value)}
          placeholder="add new Todo List"
        />
        <Button onClick={addNewTodo}>ADD</Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  padding: 8px 0;
  display: flex;
  width: 60%;
  justify-content: space-between;
`;
