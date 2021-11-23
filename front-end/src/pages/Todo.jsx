import React from "react";
import { useParams } from "react-router";
import { TodoForm } from "../components";

const Todo = ({ edit, view }) => {
  const { id } = useParams();
  if (view) {
    return <TodoForm view id={id} />;
  }
  if (edit) {
    return <TodoForm edit id={id} />;
  }
  return <TodoForm />;
};

export default Todo;
