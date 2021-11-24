import axios from 'axios';
import BaseService from './base-service';

class TodoService extends BaseService {

  getTodos() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.API_URL}/todos`)
        .then(resp => resolve(resp.data))
        .catch(err => {
          // TODO: logging errors
          reject('Data fetch failed');
          console.log('error:', err);
        });
    });
  }

  getTodo(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.API_URL}/todos/${id}`)
        .then(resp => resolve(resp.data))
        .catch(err => {
          // TODO: logging errors
          console.log("Error:", err);
          reject(`Error fetching todo with id: ${id}`);
        });
    });
  }
  getAllTodos() { }

  createTodo(todo) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.API_URL}/todos`, todo)
        .then(resp => resolve(resp.data))
        .catch(err => {
          // TODO: logging errors
          console.log("Error:", err);
          reject(`Error creating todo`);
        });
    });
  }

  updateTodo(todo) {
    const { id } = todo;
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.API_URL}/todos/${id}`, todo)
        .then(resp => resolve(resp.data))
        .catch(err => {
          // TODO: logging errors
          console.log("Error:", err);
          reject(`Error updating todo with id: ${id}`);
        });
    });
  }

  completeTodo(todo) {
    todo.is_completed = true;
    return this.updateTodo(todo);
  }

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.API_URL}/todos/${id}`)
        .then(resp => resolve(resp.data))
        .catch(err => {
          // TODO: logging errors
          console.log("Error:", err);
          reject(`Error deleting todo with id: ${id}`);
        });
    });
  };
};

export default TodoService;