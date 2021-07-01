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

type updateTodo = {
  id: number;
  content: string;
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
    updateTodo: (state, { payload }: PayloadAction<updateTodo>) => {
      const { id, content } = payload;
      const updateTodoIndex = state.todoList.findIndex(
        todoItem => todoItem.id === id,
      );
      console.log(updateTodoIndex);
      let updateTodo = state.todoList.filter(todoItem => todoItem.id === id)[0];
      updateTodo = { ...updateTodo, content };
      const newTodoList = state.todoList.splice(updateTodoIndex, 1, updateTodo);
      console.log(newTodoList);
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
