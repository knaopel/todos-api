import { createContext, useContext, useState } from 'react';

// Todos Context
export const TodosContext = createContext({
  todos: [],
  setTodos: (data) => { },
});

// Use Todos Context
export const useTodosContext = () => {
  return useContext(TodosContext);
};

// Todo Provider
export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const value = {
    todos, setTodos
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};