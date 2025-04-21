import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesStudent from './CategoriesStudent';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { allCategoriesForUser } from '../../../redux/category/category.slice';
import HeadSectionHome from '../../../components/headSectionHome/HeadSectionHome';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function MainSectionCategory() {
  const { isLoading, ctgUser } = useSelector(state => state.category);
  const dispatch = useDispatch();
  const {t}=useTranslation()
  
  useEffect(() => {
    dispatch(allCategoriesForUser());

  }, [dispatch]);

  //^ --------------------------------  Pagination Category -------------------------------- 
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(8);
  
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
        <li className={` ${currentPage === i ? 'bg-blue-700 text-white rounded-md cursor-pointer' : 'outline-double outline-blue-700 text-black rounded-md cursor-pointer'} p-2 px-4 mx-1`} key={i} onClick={() => handleClick(i)}>
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !ctgUser?.categories?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
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
    <section className='topic  selection:bg-blue-400 selection:bg-opacity-30 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
    <HeadSectionHome title={t("Popular Categories")} text={t("keep caegory")}/>      
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
          <Link to="/" className="mt-6 text-gray-900 font-bold hover:underline bg-blue-600 p-4 rounded-md shadow-md">
              Back to Home
          </Link>
          </div>
      )
        }
    </div>
    </div>
    {ctgUser?.categories?.length > 0?<>
      <div className="flex  items-center justify-center  gap-10 ">
        {renderPagination()}
      </div>
    </>:""}
</section>  )
}
