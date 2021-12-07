import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './common/Header';
import AboutPage from './about/AboutPage';
import HomePage from './home/HomePage';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';
import { ToastContainer } from 'react-toastify';
import LoginPage from './auth/LoginPage';

const App = () => (
  <div className='container-fluid'>
    <Header />
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/courses/new' element={<ManageCoursePage />} />
      <Route path='/courses/:slug' element={<ManageCoursePage />} />
      <Route path='/courses' element={<CoursesPage />} />
    </Routes>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
