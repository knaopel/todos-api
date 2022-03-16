import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../../../components'
import Main from '../Main/Main'

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  )
}

export default Router