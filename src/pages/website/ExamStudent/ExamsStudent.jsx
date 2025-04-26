import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allExamStudent,
  filterExamStudent,
} from '../../../redux/student/student.slice';
import { useParams } from 'react-router-dom';
import ExamUiSt from './ExamUiSt';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function ExamsStudent() {
  const { allExStu } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [filterValue, setFilterValue] = useState({
    examName: '',
  });
  const handleFilterChange = (e) => {
    setFilterValue((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(allExamStudent(id));
    dispatch(filterExamStudent({ filter: filterValue, id }));
  }, [dispatch, id, filterValue]);
  /* -------------------------------- Pagination-------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(6);

  const totalPages = allExStu?.courseTests
    ? Math.ceil(allExStu?.courseTests?.length / parseInt(numberOfPages))
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
              ? 'bg-blue-700 text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 text-black rounded-md cursor-pointer'
          } p-2 px-4 mx-1`}
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
            className="bg-blue-800  cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !allExStu?.courseTests?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={
              currentPage === totalPages || !allExStu?.courseTests?.length
            }
            onClick={() => setCurrentPage(currentPage + 1)}
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
        <title>Exams</title>
        <meta name="description" content="Exams page" />
        <meta name="keywords" content="Exams, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="bg-white dark:bg-gray-900 p-5 pt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-white w-1/4 dark:bg-gray-800 dark:text-gray-400 shadow-lg rounded-lg p-6">
            <input
              type="text"
              name="examName"
              placeholder="Enter Exam name"
              value={filterValue.examName}
              onChange={handleFilterChange}
              className="w-full p-2 rounded-md border border-gray-300 ring-0 focus:border-gray-300 dark:bg-gray-700  dark:ring-0 dark:focus:border-gray-600 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {allExStu?.courseTests?.length > 0 ? (
              allExStu.courseTests.slice(start, end).map((test) => (
                <div
                  key={test._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
                >
                  <ExamUiSt test={test} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-10 text-gray-500">
                No exams available.
              </div>
            )}
          </div>
          {allExStu?.courseTests?.length > 0 && (
            <div className="flex  items-center justify-center  my-10 gap-10 ">
              <div className="flex items-center">
                <span className=" me-2 dark:text-white">Show:</span>
              </div>
              {renderPagination()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
