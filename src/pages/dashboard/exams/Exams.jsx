import { useEffect, useState } from 'react';
import HeadSection from '../../../components/headSection/HeadSection';
import { useDispatch, useSelector } from 'react-redux';
import {
  courseInstructor,
  filterCourses,
} from '../../../redux/courses/courses.slice';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';

export default function Exams() {
  const { isLoading, courseIns } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [filterValues, setFilterValues] = useState({
    courseName: '',
  });
  const handleFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(filterCourses(filterValues));
  };
  /* -------------------------------- Pagination -------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(4);

  const totalPages = courseIns?.courses
    ? Math.ceil(courseIns.courses.length / parseInt(numberOfPages))
    : 1;

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * parseInt(numberOfPages);
  const end = start + parseInt(numberOfPages);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          className={` ${
            currentPage === i
              ? 'bg-blue-700  text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 text-gray-800 dark:text-white rounded-md cursor-pointer'
          }  p-2 px-4 mx-1`}
          key={i}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md dark:text-white"
            disabled={currentPage === 1 || !courseIns?.courses?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md dark:text-white"
            disabled={currentPage === totalPages || !courseIns?.courses?.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    );
  };
  useEffect(() => {
    dispatch(courseInstructor());
  }, [dispatch]);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Select Course for create Exam</title>
        <meta name="description" content="Select Course for create Exam page" />
        <meta name="keywords" content="Select Course for create Exam, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl m-auto space-y-10">
      <HeadSection
        title="select course to create exams"
        subTitle="Exams"
        link="All Exams"
      />
      <div className='flex items-center justify-between'>
        <form
          onSubmit={handleFilterSubmit}
          className="mt-5 flex gap-3 justify-start flex-wrap pb-10 px-10 md:px-0"
        >
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={filterValues.courseName}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
          <button
            type="submit"
            className="bg-blue-600 p-2 text-white font-semibold rounded-md"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse text-lg"></i>
            ) : (
              'Filter'
            )}
          </button>
        </form>
        <Link to="/panel/allexams" className="bg-blue-600 p-2 text-white font-semibold rounded-md">
          All Exam
        </Link>
      </div>
      <div className="flex flex-wrap w-full gap-10 ">
        {isLoading ? (
          <LoadingBetweenPage />
        ) : courseIns?.courses?.length > 0 ? (
          courseIns.courses.slice(start, end).map((item) => (
            <Link
              to={`/panel/createExams/${item._id}`}
              key={item._id}
              className="shadow-lg p-5  group transition-transform duration-300 relative bg-white dark:bg-gray-900 overflow-hidden rounded-lg w-full md:w-[calc((100%/2)-2.5rem)] lg:w-[calc((100%/3)-2.5rem)] xl:w-[calc((100%/4)-2.5rem)] hover:shadow-2xl hover:scale-105"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.coursePicture.secure_url}
                  alt="category"
                  className="w-full h-52 object-cover transition-transform duration-300 ease-in-out rounded-lg hover:scale-110"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                  {item.courseName.replace(/"/g, '')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Engaging course content and resources
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-900 p-10 rounded-md shadow-md m-auto">
            <p>There are no courses currently available</p>
          </div>
        )}
      </div>
      {/* render pagination */}
      <div className="flex  items-center justify-center  my-10 gap-10 ">
        <div className="flex items-center">
          <span className="me-2 dark:text-white">Show:</span>
          <select
            onChange={(e) => setNumberOfPages(e.target.value)}
            className=" shadow-md border-0 focus:ring-0 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-white p-3 "
            style={{ width: '130px' }}
          >
            <option value="4">4 Rows</option>
            <option value="12">12 Rows</option>
            <option value="20">20 Rows</option>
            <option value="50">50 Rows</option>
          </select>
        </div>
        {renderPagination()}
      </div>
    </div>
    </>
  );
}
