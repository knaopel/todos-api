import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

const newCourse = {
  id: null,
  title: '',
  author_id: null,
  category: '',
};

const ManageCoursePage = ({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  apiCallsInProgress,
  saveCourse,
}) => {
  const [course, setCourse] = useState(newCourse);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    } else {
      const getCourseBySlug = slug => {
        return courses.find(course => course.slug === slug);
      };
      const currentCourse =
        slug && courses.length > 0 ? getCourseBySlug(slug) : newCourse;
      setCourse(currentCourse);
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert('Loading authors failed' + error);
      });
    }
  }, [courses, courses.length, authors.length, slug, loadCourses, loadAuthors]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, author_id, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!author_id) errors.author = 'Author is required';
    if (!category) errors.category = 'Category is required';

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course saved.');
        navigate('/courses');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return apiCallsInProgress > 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses,
    apiCallsInProgress: state.apiCallsInProgress,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
