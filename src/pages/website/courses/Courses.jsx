import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterAllCourses,
  filterAllCoursesPaid,
  getAllCourses,
  getAllCoursesPaid,
} from '../../../redux/courses/courses.slice';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import CourseCategory from './course By category/courseCategory/CourseCategory';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';

export default function Courses() {
  const { isLoading, allcourse } = useSelector((state) => state.courses);
  const { isLogin } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState({
    teachedBy: '',
    courseName: '',
    coursePrice: '',
    courseHours: '',
  });
  const handleFilterChange = (e) => {
    setFilterValue((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getAllCoursesPaid());
    } else {
      dispatch(getAllCourses());
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    if (isLogin) {
      dispatch(filterAllCoursesPaid(filterValue));
    } else {
      dispatch(filterAllCourses(filterValue));
    }
  }, [filterValue, dispatch, isLogin]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(20);
  const totalPages = allcourse?.courses
    ? Math.ceil(allcourse?.courses.length / numberOfPages)
    : 1;
  const start = (currentPage - 1) * numberOfPages;
  const end = start + numberOfPages;

  const handlePageChange = (page) => setCurrentPage(page);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`p-2 px-4 mx-1 ${
            currentPage === i
              ? 'bg-blue-700 dark:bg-blue-500 text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 dark:outline-blue-500 text-black rounded-md cursor-pointer'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    return (
      <ul className="m-0 p-0 list-unstyled flex dark:text-white">
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-700 dark:hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !allcourse?.courses?.length}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>

        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-700 dark:hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !allcourse?.courses?.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Courses</title>
        <meta name="description" content="courses page" />
        <meta name="keywords" content="courses, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="dark:bg-gray-900">
        <section className="bg-courses h-[500px] bg-no-repeat bg-cover bg-center bg-fixed">
          <div className="text-center flex flex-col items-center justify-center bg-gray-900 bg-opacity-70 h-full">
            <h3 className="sm:text-7xl text-4xl font-semibold text-white animate__backInDown animate__animated animate__delay-1/2s">
              {t('courses')}
            </h3>
            <span className="mt-10 flex gap-10 items-center">
              <Link
                to="/"
                className="text-xl text-white animate__backInUp animate__animated animate__delay-1/2s"
              >
                {t('home')}
              </Link>
              <span className="text-xl text-white font-semibold"> | </span>
              <Link
                to="/courses"
                className="text-xl text-blue-700 font-semibold animate__backInDown animate__animated animate__delay-1/2s"
              >
                {t('courses')}
              </Link>
            </span>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-screen-2xl mx-auto px-5 md:px-20">
            <div className="flex flex-wrap md:flex-nowrap gap-8">
              {/* Sidebar Filter */}
              <aside className="w-full md:w-1/4">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-400 shadow-lg rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Instructors</h4>
                  <input
                    type="text"
                    name="teachedBy"
                    placeholder="Enter instructor name"
                    value={filterValue.teachedBy}
                    onChange={handleFilterChange}
                    className="w-full p-2 rounded-md border border-gray-300 ring-0 focus:border-gray-300 dark:bg-gray-700  dark:ring-0 dark:focus:border-gray-600 dark:border-gray-600"
                  />
                </div>
                <div className="bg-white mt-2 dark:bg-gray-800 dark:text-gray-400 shadow-lg rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Course name</h4>
                  <input
                    type="text"
                    name="courseName"
                    placeholder="Enter course name"
                    value={filterValue.courseName}
                    onChange={handleFilterChange}
                    className="w-full p-2 rounded-md border border-gray-300 ring-0 focus:border-gray-300 dark:bg-gray-700  dark:ring-0 dark:focus:border-gray-600 dark:border-gray-600"
                  />
                </div>
                <div className="bg-white mt-2 dark:bg-gray-800 dark:text-gray-400 shadow-lg rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Course Price</h4>
                  <input
                    type="text"
                    name="coursePrice"
                    placeholder="Enter course price"
                    value={filterValue.coursePrice}
                    onChange={handleFilterChange}
                    className="w-full p-2 rounded-md border border-gray-300 ring-0 focus:border-gray-300 dark:bg-gray-700  dark:ring-0 dark:focus:border-gray-600 dark:border-gray-600"
                  />
                </div>
                <div className="bg-white mt-2 dark:bg-gray-800 dark:text-gray-400 shadow-lg rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Course hours</h4>
                  <input
                    type="text"
                    name="courseHours"
                    placeholder="Enter course hours"
                    value={filterValue.courseHours}
                    onChange={handleFilterChange}
                    className="w-full p-2 rounded-md border border-gray-300 ring-0 focus:border-gray-300 dark:bg-gray-700  dark:ring-0 dark:focus:border-gray-600 dark:border-gray-600"
                  />
                </div>
              </aside>
              {/* Course List/Grid */}
              <div className="w-full md:w-3/4">
                <div className={`grid gap-8 lg:grid-cols-2 xl:grid-cols-3 `}>
                  {isLoading ? (
                    <LoadingBetweenPage />
                  ) : allcourse?.courses?.length > 0 ? (
                    isLogin ? (
                      allcourse?.courses
                        ?.slice(start, end)
                        .map((item, index) => {
                          const state =
                            allcourse?.stateArray &&
                            index < allcourse.stateArray.length
                              ? allcourse.stateArray[index]
                              : null;

                          return (
                            <CourseCategory
                              key={item._id}
                              data={item}
                              state={state}
                            />
                          );
                        })
                    ) : (
                      allcourse.courses
                        .slice(start, end)
                        .map((item) => (
                          <CourseCategory key={item._id} data={item} />
                        ))
                    )
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                      <svg
                        className="w-24 h-24 text-gray-400 dark:text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12l7.5 7.5L19.5 12M12 4.5v15"
                        />
                      </svg>
                      <h2 className="text-2xl font-semibold mt-4 text-gray-600 dark:text-gray-300">
                        No Courses Available
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        It looks like there are no courses available at the
                        moment. Please check back later or explore other
                        sections of our site.
                      </p>
                      <Link
                        to="/"
                        className="mt-6 text-gray-900 dark:text-white font-bold hover:underline bg-blue-100 dark:bg-blue-800 p-4 rounded-md shadow-md"
                      >
                        Back to Home
                      </Link>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {allcourse?.courses?.length > 0 && (
                  <div className="flex items-center justify-center gap-10 mt-5 mb-10">
                    
                    {renderPagination()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
