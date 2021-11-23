import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;



class TodoService {
  constructor(token) {
    this.token = token;
    axios.defaults.headers.common['Authorization'] = token;
  }

  getTodos() {
    return axios.get(`${API_URL}/todos`);
  }
  getTodo(id) { }
  getAllTodos() { }
  updateTodo(todo) { }
  deleteTodo(id) { };
};

export default TodoService;