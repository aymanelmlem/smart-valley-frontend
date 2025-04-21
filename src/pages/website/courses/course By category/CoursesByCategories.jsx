import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBetweenPage from '../../../../components/LoadingBetweenPage/LoadingBetweenPage';
import CourseCategory from './courseCategory/CourseCategory';
import { filterAllCoursesByCategories, filterAllCoursesPaidByCategories, getAllCoursesByCategories, getAllCoursesPaidCategory } from '../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png'

export default function CoursesByCourses() {
  const { isLoading, getCourseByCtg } = useSelector(state => state.courses);
  const { isLogin} = useSelector(state => state.students);
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [filterValues, setFilterValues] = useState({
    courseName: '',
    coursePrice: '',
    courseHours: '',
    category: categoryId,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(12);

  useEffect(() => {
    if(isLogin){
      dispatch(getAllCoursesPaidCategory(categoryId))
    }else{
      dispatch(getAllCoursesByCategories(categoryId));
    }
    
  }, [dispatch, categoryId,isLogin]);

  useEffect(() => {
    if(isLogin){
      dispatch(filterAllCoursesPaidByCategories(filterValues));
    }else{
      dispatch(filterAllCoursesByCategories(filterValues));
    }
  }, [filterValues, dispatch,isLogin]);

  const handleFilterChange = (e) => {
    setFilterValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const totalPages = getCourseByCtg?.courses ? Math.ceil(getCourseByCtg?.courses.length / numberOfPages) : 1;
  const start = (currentPage - 1) * numberOfPages;
  const end = start + numberOfPages;

  const handlePageChange = (page) => setCurrentPage(page);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`p-2 px-4 mx-1 ${currentPage === i ? 'bg-blue-700 dark:bg-blue-500 text-white rounded-md cursor-pointer' : 'outline-double outline-blue-700 dark:outline-blue-500 text-black rounded-md cursor-pointer'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-700 dark:hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !getCourseByCtg?.courses?.length}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-700 dark:hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !getCourseByCtg?.courses?.length}
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
        <title>Courses By categories</title>
        <meta name="description" content="Courses page" />
        <meta name="keywords" content="Courses, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='py-28 dark:bg-gray-900 bg-white'>
      <div className='max-w-screen-xl  mx-auto dark:bg-gray-900 bg-white'>
        <div className="my-10 flex flex-wrap gap-4 max-w-4xl px-5">
          {['Price', 'Course name', 'Course Hours'].map((filter, index) => (
            <details
              key={index}
              className="flex-1 min-w-[150px] max-w-xs overflow-hidden rounded border border-gray-300 dark:border-gray-700  [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className="flex cursor-pointer items-center justify-between gap-2 bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white transition"
              >
                <span className="text-sm font-medium">{filter}</span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <label htmlFor={`course${filter.replace(' ', '')}`} className="flex items-center gap-2">
                    {filter === 'Price' && <span className="text-sm text-gray-600 dark:text-white">EGP</span>}
                    <input
                      type='text'
                      id={`course${filter.replace(' ', '')}`}
                      placeholder={filter.toLowerCase()}
                      name={filter === 'Price' ? 'coursePrice' : filter === 'Course name' ? 'courseName' : 'courseHours'}
                      value={filterValues[filter === 'Price' ? 'coursePrice' : filter === 'Course name' ? 'courseName' : 'courseHours']}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border-gray-200 dark:border-gray-600 dark:placeholder:text-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm sm:text-sm"
                    />
                  </label>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-10 px-5'>
          {isLoading ? (
            <LoadingBetweenPage />
          ) : getCourseByCtg?.courses?.length > 0 ? (
            isLogin?
            getCourseByCtg?.courses?.slice(start, end).map((item, index) => {
              const state = getCourseByCtg?.stateArray && index < getCourseByCtg.stateArray.length ? getCourseByCtg.stateArray[index] : null;
            
              return (
                <CourseCategory 
                  key={item._id} 
                  data={item}  
                  state={state} 
                />
              );
            })
            :getCourseByCtg.courses.slice(start, end).map((item) => (
              <CourseCategory key={item._id} data={item} />
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l7.5 7.5L19.5 12M12 4.5v15" />
              </svg>
              <h2 className="text-2xl font-semibold mt-4 text-gray-600 dark:text-gray-300">No Courses Available</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                It looks like there are no courses available at the moment. Please check back later or explore other sections of our site.
              </p>
              <Link to="/" className="mt-6 text-gray-900 dark:text-white font-bold hover:underline bg-blue-100 dark:bg-blue-800 p-4 rounded-md shadow-md">
                Back to Home
              </Link>
            </div>
          )}
        </div>
        {getCourseByCtg?.courses?.length > 0 && (
          <div className="flex items-center justify-center gap-10 mt-5 mb-10">
            <div className="flex items-center">
              <span className="mr-2 dark:text-white">Show:</span>
              <select 
                onChange={(e) => setNumberOfPages(parseInt(e.target.value, 10))} 
                value={numberOfPages} 
                className='shadow-md  focus:ring-0 rounded-md bg-gray-100 border-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white outline-none' 
                style={{ width: '130px' }}
              >
                <option value="12">12 Rows</option>
                <option value="20">20 Rows</option>
                <option value="30">30 Rows</option>
                <option value="50">50 Rows</option>
              </select>
            </div>
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
