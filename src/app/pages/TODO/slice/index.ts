import { PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice } from 'utils/@reduxjs/toolkit';

import todoPageSaga from './saga';
import { TodoPageState } from './types';

export const initialState: TodoPageState = {
  todoList: [],
  isLoading: false,
  error: '',
};

const slice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: new Date().getTime(),
        content: action.payload,
        isCompleted: false,
      };
      state.todoList = [newTodo, ...state.todoList];
    },
    updateTodo: (state, action) => {
      console.log(action);
    },
    deleteTodo: (state, { payload: id }: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(todoItem => todoItem.id !== id);
    },
    // eslint-disable-next-line prettier/prettier
    clearTodo: (state) => {
      state.todoList = [];
    },
    // eslint-disable-next-line prettier/prettier
    fetchTodoList: (state) => {
      state.isLoading = true;
    },
    fetchTodoListSuccess: (state, action) => {
      const newTodoList = action.payload.map(item => ({
        id: item.id,
        content: item.title,
        isCompleted: item.completed,
      }));
      state.isLoading = false;
      state.todoList = newTodoList;
    },
    fetchTodoListFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: TodoPageActions } = slice;

export const useTodoPageSlice = () => {
  useInjectReducer({
    key: slice.name,
    reducer: slice.reducer,
  });
  useInjectSaga({
    key: slice.name,
    saga: todoPageSaga,
  });

  return { actions: slice.actions };
};
