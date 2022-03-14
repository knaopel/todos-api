import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { TodoForm } from "../components";
// import { loadTodos, saveTodo } from '../redux/actions/todoActions';

const Todo = ({ edit, view, todos, user, loading, loadTodos, saveTodo }) => {
  const { id } = useParams();
  const [todo, setTodo] = useState({ title: '', body: '' });
  const navigate = useNavigate();
  useEffect(() => {
    // if (!user.auth_token) {
    // navigate('/login');
    // } else 
    if (user.auth_token && !todos.isLoaded && !todos.isLoading) {
      // loadTodos(user.auth_token)
      //   .catch(err => {
      //     console.log('fetching todos failed. ', err);
      //   });
    }
    if (id && todos.isLoaded) {
      const currentTodo = todos.items.find(todo => todo.id === parseInt(id));
      setTodo({ ...currentTodo, title: currentTodo.title || '', body: currentTodo.body || '' });
    }
  }, [id, todos, user, loadTodos]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (view) {
      navigate('/');
    } else {
      // saveTodo(todo, user.auth_token)
      //   .then(() => {
      //     console.log('todo saved');
      //     navigate('/');
      //   })
      //   .catch(err => {
      //     console.log('error saving.', err);
      //   });
    }
  };

  if (view) {
    return <TodoForm view todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />;
  }
  if (edit) {
    return <TodoForm edit todo={todo} setTodo={setTodo} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;
  }
  return <TodoForm todo={todo} setTodo={setTodo} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />;
};

// const mapStateToProps = state => {
//   return {
//     todos: state.todos,
//     user: state.user,
//     loading: state.apiCallsInProgress > 0
//   };
// };

export default Todo;