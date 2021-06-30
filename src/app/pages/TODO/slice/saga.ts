import { takeLatest, call, put } from 'redux-saga/effects';

import { TodoPageActions as actions } from '.';
import { fetchAllTodoList } from 'app/APi/todo';

function* fetchTodoListSaga() {
  try {
    const todoList = yield call(fetchAllTodoList);
    yield put(actions.fetchTodoListSuccess(todoList));
  } catch (error) {
    console.warn(error);
    yield put(actions.fetchTodoListFail('Api Error'));
  }
}

export default function* todoPageSaga() {
  yield takeLatest(actions.fetchTodoList.type, fetchTodoListSaga);
}
