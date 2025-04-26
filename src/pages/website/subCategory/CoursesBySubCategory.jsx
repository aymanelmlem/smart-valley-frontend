import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterAllCoursesBySubCategories, filterAllCoursesPaidBySubCategories, getAllCoursesPaidSubCategory, getCoursesBySubCategories } from '../../../redux/courses/courses.slice';
import { Link, useParams } from 'react-router-dom';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import CourseCategory from '../courses/course By category/courseCategory/CourseCategory';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png'

export default function CoursesBySubCategory() {
    const { isLoading, getCourseBySubCtg } = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const { isLogin} = useSelector(state => state.students);
    const {subcategoryId}=useParams()
    const [filterValues, setFilterValues] = useState({
      courseName: '',
      coursePrice: '',
      courseHours: '',
      subCategory: subcategoryId,
    });
    useEffect(()=>{
      if(isLogin){
        dispatch(getAllCoursesPaidSubCategory(subcategoryId))
      }else{

        dispatch(getCoursesBySubCategories(subcategoryId))
      }
        
    },[dispatch,subcategoryId,isLogin])
    
    
    
      const [currentPage, setCurrentPage] = useState(1);
      const [numberOfPages, setNumberOfPages] = useState(12);
        
      useEffect(() => {
        if(isLogin){
          dispatch(filterAllCoursesPaidBySubCategories(filterValues));
        }else{
          dispatch(filterAllCoursesBySubCategories(filterValues));
        }
      }, [filterValues, dispatch,isLogin]);
    
      const handleFilterChange = (e) => {
        setFilterValues(prevValues => ({
          ...prevValues,
          [e.target.name]: e.target.value,
        }));
      };
    
      const totalPages = getCourseBySubCtg?.courses ? Math.ceil(getCourseBySubCtg?.courses.length / numberOfPages) : 1;
      const start = (currentPage - 1) * numberOfPages;
      const end = start + numberOfPages;
    
      const handlePageChange = (page) => setCurrentPage(page);
    
      const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <li
              key={i}
              className={`p-2 px-4 mx-1 ${currentPage === i ? 'bg-blue-700 text-white rounded-md cursor-pointer' : 'outline-double outline-blue-700 text-black rounded-md cursor-pointer'}`}
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
                className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
                disabled={currentPage === 1 || !getCourseBySubCtg?.courses?.length}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
            </li>
            {pageNumbers}
            <li>
              <button
                className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
                disabled={currentPage === totalPages || !getCourseBySubCtg?.courses?.length}
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
        <title>Courses By subcategory</title>
        <meta name="description" content="Courses page" />
        <meta name="keywords" content="Courses, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
  <div className='py-28 bg-white dark:bg-gray-900'>
    <div className='max-w-screen-xl  mx-auto '>
      <div className="my-10 flex flex-wrap gap-4 max-w-4xl">
        {['Price', 'Course name', 'Course Hours'].map((filter, index) => (
          <details
            key={index}
            className="flex-1 min-w-[150px] max-w-xs overflow-hidden rounded border border-gray-300 dark:text-gray-800 [&_summary::-webkit-details-marker]:hidden"
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
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <label htmlFor={`course${filter.replace(' ', '')}`} className="flex items-center gap-2">
                  {filter === 'Price' && <span className="text-sm text-gray-600">EGP</span>}
                  <input
                    type='text'
                    id={`course${filter.replace(' ', '')}`}
                    placeholder={filter.toLowerCase()}
                    name={filter === 'Price' ? 'coursePrice' : filter === 'Course name' ? 'courseName' : 'courseHours'}
                    value={filterValues[filter === 'Price' ? 'coursePrice' : filter === 'Course name' ? 'courseName' : 'courseHours']}
                    onChange={handleFilterChange}
                    className="w-full dark:text-gray-400 rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-white shadow-sm sm:text-sm"
                    />
                </label>
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10'>
        {isLoading ? (
          <LoadingBetweenPage />
        ) : getCourseBySubCtg?.courses?.length > 0 ? (
          isLogin?
          getCourseBySubCtg?.courses?.slice(start, end).map((item, index) => {
            const state = getCourseBySubCtg?.stateArray && index < getCourseBySubCtg.stateArray.length ? getCourseBySubCtg.stateArray[index] : null;
          
            return (
              <CourseCategory 
                key={item._id} 
                data={item}  
                state={state} 
              />
            );
          })
          :
          getCourseBySubCtg.courses.slice(start, end).map((item) => (
            <CourseCategory key={item._id} data={item} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
            <svg
              className="w-24 h-24 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l7.5 7.5L19.5 12M12 4.5v15" />
            </svg>
            <h2 className="text-2xl font-semibold mt-4 text-gray-600">No Courses Available</h2>
            <p className="text-gray-500 mt-2">It looks like there are no courses available at the moment. Please check back later or explore other sections of our site.</p>
            <Link to="/" className="mt-6 text-gray-900 font-bold hover:underline bg-blue-100 p-4 rounded-md shadow-md">
              Back to Home
            </Link>
          </div>
        )}
      </div>
      {getCourseBySubCtg?.courses?.length > 0 && (
        <div className="flex items-center justify-center gap-10 mt-5 mb-10">
          <div className="flex items-center">
            <span className="me-1">Show:</span>
            <select onChange={(e) => setNumberOfPages(parseInt(e.target.value, 10))} value={numberOfPages} className='shadow-md border-0 focus:ring-0 rounded-md bg-blue-50 outline-double outline-blue-700' style={{ width: '130px' }}>
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
)
}
