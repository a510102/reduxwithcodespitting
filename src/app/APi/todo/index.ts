import axios from 'axios';

const Url = 'https://jsonplaceholder.typicode.com/todos';

export const fetchAllTodoList = async () => {
  try {
    const response = await axios.get(Url);
    return response.data;
  } catch (error) {
    console.warn(error);
  }
};

export const fetchTodoById = async (id: string) => {
  try {
    const response = await axios.get(`${Url}/${id}`);
    return response;
  } catch (error) {
    console.warn(error);
  }
};
