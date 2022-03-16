import React from 'react'
import { Route } from 'react-router-dom'
import { Todo } from '../../../../pages'

const TodoRoutes = () => {
  return (
    <>
      <Route path='new' element={<Todo />} />
      <Route path=':id' element={<Todo view />} />
      <Route path=':id/edit' element={<Todo edit />} />
      <Route path='' element={<div>Nothing to see here</div>} />
    </>
  )
}

export default TodoRoutes