import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allExamIns, filterExamIns } from '../../../redux/instructor/instructorSlice';
import TestUi from './TestUi';
import HeadSection from '../../../components/headSection/HeadSection';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function AllExamIns() {
  const { allEx,isLoading } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();
  const [filterValues, setFilterValues] = useState({
    examName: '',
  });
  useEffect(() => {
    dispatch(allExamIns());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value
    });
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(filterExamIns({filter:filterValues}));
  }
  /* -------------------------------- Pagination-------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);

  const totalPages = allEx?.tests
    ? Math.ceil(allEx?.tests.length / parseInt(numberOfPages))
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
            disabled={currentPage === 1 || !allEx?.tests?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !allEx?.tests?.length}
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
        <meta name="description" content="Exams for instructor page" />
        <meta name="keywords" content="Exams for instructor, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl mx-auto p-4">
      <HeadSection title="All Exams" subTitle="Exams" link="All Exams" />
      <form onSubmit={handleFilterSubmit} className="mt-5 flex gap-3 justify-start flex-wrap">
          <input type="text" name="examName" placeholder="Exam Name" value={filterValues.examName} onChange={handleFilterChange}    className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"/>
          
          <button type="submit" className="bg-blue-600 p-2 text-white font-semibold rounded-md">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse text-lg"></i> : "Filter"}
          </button>
        </form>
      <div className="overflow-x-auto mt-8 rounded-md">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-lg shadow-lg border-separate border-spacing-0">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Exam Name</th>
              <th className="px-6 py-4">Accepting Answers</th>
              <th className="px-6 py-4">Auto-correct</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allEx?.tests?.length > 0 ? (
              allEx.tests.slice(start, end).map((test) => <TestUi key={test._id} test={test} />)
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No exams available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex  items-center justify-center  my-10 gap-10 ">
        <div className="flex items-center">
          <span className=" me-2 dark:text-white">Show:</span>
          <select
            onChange={(e) => setNumberOfPages(e.target.value)}
            className=" shadow-md border-0 focus:ring-0 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-white p-3"
            style={{ width: '130px' }}
          >
            <option value="10">10 Rows</option>
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
