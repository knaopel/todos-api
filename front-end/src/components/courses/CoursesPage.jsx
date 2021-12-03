import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, deleteCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import { Navigate } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import CourseList from './CourseList';

const CoursesPage = ({
  loading,
  courses,
  authors,
  loadAuthors,
  loadCourses,
  deleteCourse,
}) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert('Loading courses failed. ' + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert('Loading authors failed. ' + error);
      });
    }
  }, [courses, authors, loadAuthors, loadCourses]);

  function handleDeleteCourse(course) {
    toast.success('Course deleted');
    deleteCourse(course).catch(error => {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    });
  }

  return (
    <>
      {redirectToAddCoursePage && <Navigate to='/courses/new' />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className='btn btn-primary add-course'
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <CourseList onDeleteClick={handleDeleteCourse} courses={courses} />
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.author_id)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
