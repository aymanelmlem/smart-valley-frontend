import { useEffect, useState } from 'react';
import inst from '../../../assets/Team-01.jpg';
import { Link } from 'react-router-dom';
import MainSectionCategory from '../categories/MainSectionCategory';
import HeadSectionHome from '../../../components/headSectionHome/HeadSectionHome';
import { useTranslation } from 'react-i18next';
import IncludeUser from '../../../components/iclude/IncludeUser';
import CourseCategory from '../courses/course By category/courseCategory/CourseCategory';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getAllCoursesPaid,
} from '../../../redux/courses/courses.slice';
import { allInstructorForStudent } from '../../../redux/instructor/instructorSlice';
import InstructorForStudent from '../instructorForStudent/InstructorForStudent';
import 'animate.css';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';

export default function Home() {
  const { isLoading, allcourse } = useSelector((state) => state.courses);
  const { isLogin } = useSelector((state) => state.students);
  const { allInstStudent } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    if (isLogin) {
      dispatch(getAllCoursesPaid());
    } else {
      dispatch(getAllCourses());
    }
  }, [dispatch, isLogin]);
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
              ? 'bg-blue-700  dark:bg-blue-500 text-white rounded-md cursor-pointer'
              : 'outline-double dark:text-white outline-blue-700 dark:outline-blue-500 text-black rounded-md cursor-pointer'
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
  useEffect(() => {
    setIsLoad(true);
    dispatch(allInstructorForStudent());
    setIsLoad(false);
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <meta name="description" content="Home page" />
        <meta name="keywords" content="Home, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      {/* Home Section */}
      <section className="bg-gray-50 relative overflow-hidden dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Animated background shapes */}
        <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45 animate-ping"></div>
        <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45 animate-ping"></div>

        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            {/* Animated Title */}
            <h1 className="bg-gradient-to-r from-blue-700 via-blue-900 to-purple-700 dark:from-blue-300 dark:via-blue-500 dark:to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl animate__animated animate__fadeInUp">
              {t('Empower')}
              <span className="sm:block mt-4">{t('Explore')}</span>
            </h1>

            {/* Animated Description */}
            <p className="mx-auto mt-4 max-w-xl text-gray-700 dark:text-gray-300 sm:text-xl/relaxed animate__animated animate__fadeInUp animate__delay-1s">
              {t('Discover')}
            </p>

            {/* Animated Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {isLogin ? (
                ''
              ) : (
                <Link
                  className="block w-full animate__backInUp animate__animated animate__delay-1s rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-400 dark:hover:bg-blue-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto transform transition duration-300 hover:scale-105"
                  to="/student-signup"
                >
                  {t('start learning')}
                </Link>
              )}
              <Link
                className="block w-full animate__backInDown animate__animated animate__delay-1s rounded border border-blue-600 px-12 py-3 text-sm font-medium text-gray-900 hover:text-white dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto transform transition duration-300 hover:scale-105"
                to="/courses"
              >
                {t('Explore Courses')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <MainSectionCategory />
      {/* We Deliver Real Results*/}
      <section className="flex items-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl ">
                {t('Unlock Your Learning Potential')}
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {t('Explore course Introduction')}
              </p>

              <Link
                to="/courses"
                className="mt-8 inline-block rounded bg-indigo-600 text-white px-12 py-3 text-sm font-medium transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                {t('Start Learning Today')}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
                <span className="inline-block rounded-lg bg-gray-50 dark:bg-gray-700 p-3">
                  <svg
                    className="text-blue-700 dark:text-blue-400 size-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.25 6.75v12.5M17.25 12H5.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </span>
                <h2 className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                  {t('Interactive Courses')}
                </h2>
                <p className="hidden sm:mt-1 sm:block sm:text-sm text-gray-600 dark:text-gray-300">
                  {t(
                    'Engage with dynamic content and interactive lessons to enhance your learning experience.'
                  )}
                </p>
              </div>

              <div className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
                <span className="inline-block rounded-lg bg-gray-50 dark:bg-gray-700 p-3">
                  <svg
                    className="text-blue-700 dark:text-blue-400 size-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 7v6l4 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M20.25 11.25c0-5.65-4.6-10.25-10.25-10.25S-.25 5.6-.25 11.25 4.6 21.5 10.25 21.5 20.25 16.9 20.25 11.25z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </span>
                <h2 className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                  {t('Expert Instructors')}
                </h2>
                <p className="hidden sm:mt-1 sm:block sm:text-sm text-gray-600 dark:text-gray-300">
                  {t(
                    'Learn from industry experts and gain insights that can propel your career forward.'
                  )}
                </p>
              </div>

              <div className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
                <span className="inline-block rounded-lg bg-gray-50 dark:bg-gray-700 p-3">
                  <svg
                    className="text-blue-700 dark:text-blue-400 size-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 5h16v14H4V5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M12 15v-6l4 3-4 3z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </span>
                <h2 className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                  {t('Certifications')}
                </h2>
                <p className="hidden sm:mt-1 sm:block sm:text-sm text-gray-600 dark:text-gray-300">
                  {t(
                    'Earn certifications that validate your skills and enhance your resume.'
                  )}
                </p>
              </div>

              <div className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
                <span className="inline-block rounded-lg bg-gray-50 dark:bg-gray-700 p-3">
                  <svg
                    className="text-blue-700 dark:text-blue-400 size-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M11 3v18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </span>
                <h2 className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                  {t('Flexible Learning')}
                </h2>
                <p className="hidden sm:mt-1 sm:block sm:text-sm text-gray-600 dark:text-gray-300">
                  {t(
                    'Access course materials anytime, anywhere, and learn at your own pace.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Welcome to Our Learen Education Centre */}
      <section className="selection:bg-blue-400 selection:bg-opacity-30 bg-gray-100 dark:bg-gray-900">
        <div className="container m-auto px-5 py-10 md:p-16">
          <div className="flex flex-wrap gap-10 justify-center items-center">
            <div className="w-full lg:w-[calc((100%/3)-2.5rem)]">
              <img src={inst} className="w-full rounded-full" alt="" />
            </div>
            <div className="w-full lg:w-[calc((100%/2)-2.5rem)]">
              <h3 className="text-3xl text-center dark:text-white lg:text-start md:text-5xl font-semibold">
                {t('Welcome to')}

                <span className="text-blue-500 dark:text-blue-300 ms-2">
                  {t('OurLearn')}
                </span>
                {t('Education Center')}
              </h3>
              <h4 className="text-2xl lg:text-3xl mt-10 text-center lg:text-start text-blue-700 dark:text-blue-400 font-semibold">
                {t('Learn from the best educators in the field')}
              </h4>
              <p className="text-gray-400 dark:text-gray-300 mt-10 text-center lg:text-start lg:text-xl">
                {t(
                  'Explore our diverse range of courses and workshops designed to help you achieve your learning goals. Join a community of dedicated students and expert instructors today.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* courses */}
      <section className="courses bg-gray-50 dark:bg-gray-900 dark:text-white selection:bg-blue-400 selection:bg-opacity-30">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
          <HeadSectionHome title={t('Recent Courses')} text={t('Research')} />
          <div
            className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5`}
          >
            {isLoading ? (
              <LoadingBetweenPage />
            ) : allcourse?.courses?.length > 0 ? (
              isLogin ? (
                allcourse?.courses?.slice(start, end).map((item, index) => {
                  const state =
                    allcourse?.stateArray && index < allcourse.stateArray.length
                      ? allcourse.stateArray[index]
                      : null;

                  return (
                    <CourseCategory key={item._id} data={item} state={state} />
                  );
                })
              ) : (
                allcourse.courses
                  .slice(start, end)
                  .map((item) => <CourseCategory key={item._id} data={item} />)
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
                  It looks like there are no courses available at the moment.
                  Please check back later or explore other sections of our site.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination */}
        {allcourse?.courses?.length > 0 && (
          <div className="flex items-center justify-center gap-10 mt-5">
            {renderPagination()}
          </div>
        )}
      </section>
      {/* Instructor */}
      <section className="instructor bg-gray-50 dark:text-white dark:bg-gray-900 selection:bg-blue-400 selection:bg-opacity-30">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
          <HeadSectionHome title={t('Talented')} text={t('Skillful')} />
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
            <div
              className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
            >
              {isLoad ? (
                <LoadingBetweenPage />
              ) : allInstStudent?.isntcrutors?.length > 0 ? (
                allInstStudent?.isntcrutors
                  ?.slice(start, end)
                  .map((item) => (
                    <InstructorForStudent key={item._id} data={item} />
                  ))
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
                    No Instructors Available
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    It looks like there are no Instructors available at the
                    moment. Please check back later or explore other sections of
                    our site.
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Pagination */}
          {allInstStudent?.isntcrutors?.length > 0 && (
            <div className="flex items-center justify-center gap-10 mt-5">
              {renderPagination()}
            </div>
          )}
        </div>
      </section>

      <IncludeUser />
    </>
  );
}
