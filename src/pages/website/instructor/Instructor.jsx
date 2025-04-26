import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { allInstructorForStudent } from '../../../redux/instructor/instructorSlice'
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage'
import InstructorForStudent from '../instructorForStudent/InstructorForStudent'
import { Helmet } from 'react-helmet'
import favIcon from '../../../assets/favicon.png'

export default function Instructor() {
  const {t,i18n}=useTranslation()
  const { isLoading, allInstStudent } = useSelector(state => state.instructor);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(allInstructorForStudent())
    
  },[dispatch])
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(20);
  const totalPages = allInstStudent?.isntcrutors ? Math.ceil(allInstStudent?.isntcrutors.length / numberOfPages) : 1;
  const start = (currentPage - 1) * numberOfPages;
  const end = start + numberOfPages;

  const handlePageChange = (page) => setCurrentPage(page);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`p-2 px-4 mx-1 ${currentPage === i ? 'bg-blue-700  dark:bg-blue-500 text-white rounded-md cursor-pointer' : 'outline-double dark:text-white outline-blue-700 dark:outline-blue-500 text-black rounded-md cursor-pointer'}`}
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
            disabled={currentPage === 1 || !allInstStudent?.isntcrutors?.length}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-700 dark:hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !allInstStudent?.isntcrutors?.length}
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
        <title>instructors</title>
        <meta name="description" content="instructors page" />
        <meta name="keywords" content="instructors, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <section className='bg-learning h-[500px] bg-no-repeat bg-cover bg-center  bg-fixed'>
        <div className=" text-center flex flex-col items-center justify-center  bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-60 h-full">
          <h3 className='sm:text-7xl text-4xl font-semibold text-gray-900 dark:text-white animate__backInDown animate__animated animate__delay-1/2s'>{t("instructor")}</h3>
          <span className=' mt-10 flex gap-10 items-center'>
            <Link to="/" className='text-lg md:text-xl text-gray-900 dark:text-white transition duration-300 px-4 py-2 animate__backInUp animate__animated animate__delay-1/2s'>{t("home")}</Link> 
            <span className='text-xl text-white font-semibold'> | </span>
            <Link to="/instructor" className='text-lg md:text-xl text-blue-500 dark:text-blue-700  font-bold   px-4 py-2 animate__backInDown animate__animated animate__delay-1/2s'>{t("instructor")}</Link>
          </span>
        </div>
      </section>
      <section className='instructor bg-gray-50 py-10 dark:bg-gray-900 dark:text-white selection:bg-blue-400 selection:bg-opacity-30'>
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
            <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
              {isLoading ? (
            <LoadingBetweenPage />
          ) : allInstStudent?.isntcrutors?.length > 0 ? (
            allInstStudent?.isntcrutors?.slice(start, end).map((item) => (
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l7.5 7.5L19.5 12M12 4.5v15" />
              </svg>
              <h2 className="text-2xl font-semibold mt-4 text-gray-600 dark:text-gray-300">No Instructors Available</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                It looks like there are no Instructors available at the moment. Please check back later or explore other sections of our site.
              </p>
              <Link to="/" className="mt-6 text-gray-900 dark:text-white font-bold hover:underline bg-blue-100 dark:bg-blue-800 p-4 rounded-md shadow-md">
                Back to Home
              </Link>
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
      </section>
      <div
          className="flex flex-col items-center gap-4  bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between"
        >
        <strong className="text-xl text-white sm:text-xl">Join Us as an Instructor!</strong>
          <Link
            to="/login-employee"
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
          >
            <span className="text-sm font-medium"> Let's Get Started </span>

            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
      </div>
    </>
  )
}
