import  { useEffect, useState } from 'react'
import { allCategoriesForUser, filterCategoriesForAllUser } from '../../../redux/category/category.slice';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesStudent from './CategoriesStudent';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png'

export default function AllCategoriesStudent() {
  const [filterValues, setFilterValues] = useState({
    categoryName: '',
    subCategory: '',
  });
  const { isLoading, ctgUser } = useSelector(state => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategoriesForUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterCategoriesForAllUser(filterValues));
    
  }, [filterValues, dispatch]);

  const handleFilterChange = (e) => {
    setFilterValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  //^ --------------------------------  Pagination Category -------------------------------- 
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(20);
  
  const totalPages = ctgUser?.categories ? Math.ceil(ctgUser.categories.length / parseInt(numberOfPages)) : 1;
  
  const handleClick = (page) => {
    setCurrentPage(page);
  };
  
  const start = (currentPage - 1) * parseInt(numberOfPages);
  const end = start + parseInt(numberOfPages);

  
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li className={` ${currentPage === i ? 'bg-blue-500 dark:bg-blue-700 text-white rounded-md cursor-pointer' : 'outline-double outline-blue-500 dark:outline-blue-700 text-black rounded-md cursor-pointer'} p-2 px-4 mx-1`} key={i} onClick={() => handleClick(i)}>
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-700 dark:hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !ctgUser?.categories?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-700 dark:hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !ctgUser?.categories?.length}
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
        <title>Categories</title>
        <meta name="description" content="Categories page" />
        <meta name="keywords" content="Categories, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='py-28 bg-white dark:bg-gray-900'>
      <div className='max-w-screen-xl  mx-auto '>
        <div >
          <div className=" flex flex-wrap gap-4 max-w-4xl">
            {['categoryName', 'subCategory'].map((filter, index) => (
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
                    <label htmlFor={`filter${filter}`} className="flex items-center gap-2">
                      <input
                        type='text'
                        id={`filter${filter}`}
                        placeholder={filter.toLowerCase()}
                        name={filter}
                        value={filterValues[filter]}
                        onChange={handleFilterChange}
                        className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-white shadow-sm sm:text-sm"
                      />
                    </label>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 my-10'>
            {isLoading ? (
              <LoadingBetweenPage />
            ) : ctgUser?.categories?.length > 0 ? (
              ctgUser.categories.slice(start, end).map((item) => (
                <CategoriesStudent key={item._id} data={item} />
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
              <h2 className="text-2xl font-semibold mt-4 text-gray-600">No Categories Available</h2>
              <p className="text-gray-500 mt-2">It looks like there are no Categories available at the moment. Please check back later or explore other sections of our site.</p>
              <Link to="/" className="mt-6 text-gray-900 font-bold hover:underline bg-blue-100 p-4 rounded-md shadow-md">
                  Back to Home
              </Link>
              </div>
          )
            }
        </div>
        <div className="flex  items-center justify-center  my-10 gap-10 ">
              <div className="flex items-center">
                <span className="me-2 dark:text-white">Show:</span>
                <select onChange={(e)=> setNumberOfPages(e.target.value)} className=' shadow-md  focus:ring-0 rounded-md bg-gray-100 border-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white outline-none' style={{width:'130px'}}>
                  <option value="20">20 Rows</option>
                  <option value="25">25 Rows</option>
                  <option value="30">30 Rows</option>
                  <option value="35">25 Rows</option>
                </select>
              </div>
              {renderPagination()}
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
