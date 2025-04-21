import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myListOfCourses } from '../../../redux/student/student.slice';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';

export default function MyLearning() {
  const { isLoading, myList } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myListOfCourses());
  }, [dispatch]);

  // Filter courses to handle null entries
  const filteredCourses = myList?.coursesLists?.filter((course) => course.course !== null) || [];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Courses</title>
        <meta name="description" content="My courses page" />
        <meta name="keywords" content="my courses, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="dark:bg-gray-900 pt-28">
        <div className="max-w-screen-xl mx-auto p-5">
          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.course._id} course={course.course} />
              ))}
            </div>
          ) : (
            <p className="text-gray-800 dark:text-gray-500 w-full text-center pt-20">
              No courses now!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// Extracted CourseCard component for better readability and reusability
function CourseCard({ course }) {
  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="overflow-hidden rounded-t-lg">
        <img
          alt={course.courseName || 'Course Image'}
          src={course.coursePicture?.secure_url || 'placeholder-image-url'}
          className="w-full h-52 object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {course.courseName}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4 line-clamp-2">
          {course.courseDescription}
        </p>
        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
          <div className="flex items-center">
            <i className="fa-solid fa-clock mr-2"></i>
            {course.courseHours} h
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-tag mr-2"></i>
            {course.coursePrice} EGP
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Taught By</p>
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {course.teachedBy}
            </span>
          </div>
          <Link
            to={`/sections/${course.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-md shadow"
          >
            Watch Course
          </Link>
        </div>
      </div>
    </div>
  );
}
