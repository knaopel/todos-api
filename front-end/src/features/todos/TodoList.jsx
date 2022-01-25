import React from 'react';
import { useEffect } from 'react';
import { fetchTodos, selectTodoById, selectTodoIds } from './todosSlice';
import { useDispatch, useSelector } from 'react-redux';

const Todos = ({ todoIds }) => {
  debugger;
  return todoIds.map(id => <TodoItem todoId={id} />)
}

const TodoItem = ({ todoId }) => {
  const todo = useSelector(state=>selectTodoById(state,todoId))
  return <div>{todo.title}</div>
}

const TodoList = () => {
  const todoStatus = useSelector(state=>state.todos.status);
  const todoIds = useSelector(selectTodoIds);
  const dispatch = useDispatch();
  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, todoStatus,todoIds]);
  return <div>
    <h2>Todos</h2>
    <Todos todoIds={todoIds} />
  </div>;
};

// TodoList.propTypes = {};

export default TodoList;
