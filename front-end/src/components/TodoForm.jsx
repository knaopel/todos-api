const TodoForm = ({ edit, view, id }) => {
  return (
    <>
      <div>TodoForm</div>
      {view && <div>Viewing #{id}</div>}
      {edit && <div>Editing #{id}</div>}
    </>
  );
};

export default TodoForm;
