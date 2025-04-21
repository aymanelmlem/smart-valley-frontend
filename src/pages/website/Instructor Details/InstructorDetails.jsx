import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InstructorDetailCourse } from '../../../redux/instructor/instructorSlice';
import { Link, useParams } from 'react-router-dom';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png'

export default function InstructorDetails() {
  const { instDetailCourse, isLoading } = useSelector(
    (state) => state.instructor
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(InstructorDetailCourse({ id }));
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingBetweenPage />;
  }

  if (!instDetailCourse || !instDetailCourse.instructor) {
    return (
      <div className="flex justify-center items-center h-screen">
        No Instructor Details Found
      </div>
    );
  }

  const instructor = instDetailCourse.instructor;

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Instructor Details</title>
        <meta name="description" content="Instructor details page" />
        <meta name="keywords" content="Instructor details, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 py-24">
        {/* Instructor Profile Section */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg mb-12 p-8">
          <div className="flex items-center justify-between md:justify-start space-x-6">
            <img
              src={instructor.profilePicture.secure_url}
              alt={`${instructor.name}'s profile`}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {instructor.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {instructor.email}
              </p>
              <div className="mt-4 flex justify-center md:justify-start gap-6">
                {instructor.profileLinks.facebook?.link && (
                  <a
                    href={instructor.profileLinks.facebook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors duration-300"
                  >
                    <i className="fa-brands fa-square-facebook text-2xl"></i>
                  </a>
                )}
                {instructor.profileLinks.linkedin?.link && (
                  <a
                    href={instructor.profileLinks.linkedin.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-colors duration-300"
                  >
                    <i className="fa-brands fa-linkedin text-2xl"></i>
                  </a>
                )}
                {instructor.profileLinks.github?.link && (
                  <a
                    href={instructor.profileLinks.github.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-gray-400 hover:text-gray-700 transition-colors duration-300"
                  >
                    <i className="fa-brands fa-github-square text-2xl"></i>
                  </a>
                )}
                {instructor.profileLinks.youtube?.link && (
                  <a
                    href={instructor.profileLinks.youtube.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 dark:text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <i className="fa-brands fa-youtube text-2xl"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Courses by {instructor.name}
          </h3>
          {instructor.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructor.courses.map((course, index) => (
                <Link
                  to={`/CourseDetailsStudent/${course.id}`}
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={course.coursePicture.secure_url}
                    alt={`${course.courseName} cover`}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {course.courseName}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                      {course.courseDescription}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {course.coursePrice} EGP
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {course.courseHours} hrs
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {course.whatWillYouLearn.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {item.objective}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300">
              No Courses Available
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
