import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import AboutPage from './about/AboutPage';
import HomePage from './home/HomePage';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='container-fluid'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/courses/new' component={ManageCoursePage} />
        <Route path='/courses/:slug' component={ManageCoursePage} />
        <Route path='/courses' component={CoursesPage} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
