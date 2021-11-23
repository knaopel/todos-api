import React from "react";
import { useParams } from "react-router";
// import { useRouteMatch } from "react-router-dom";
import { TodoForm } from "../components";

// let match = useRouteMatch();

const Todo = ({ edit, view }) => {
  const {id} = useParams();
  return (
    <>
      <div>Todo</div>
      {edit && <TodoForm edit id={id} />}
      {view && <TodoForm view id={id} />}
    </>
    // <Routes>
    //   <Route path={`${match.path}/new`} element={<TodoForm />} />
    // </Routes>
  );
};

export default Todo;
