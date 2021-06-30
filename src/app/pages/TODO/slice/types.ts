export type Todo = {
  id: number;
  content: string;
  isCompleted: boolean;
}

export interface TodoPageState {
  todoList: Todo[] | [];
  isLoading: boolean;
  error: string;
}
