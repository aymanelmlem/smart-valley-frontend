import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card} from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, profileEmp } from '../../redux/instructor/instructorSlice';
import { persistor } from '../../redux/store';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import { jwtDecode } from 'jwt-decode';

export default function NavbarDas({ togleSideBar, setHiddenSideBar, hiddenSideBar }) {
  const { getProfile,purcase,employeeToken } = useSelector((state) => state.instructor);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [navbarLogo, setNavbarLogo] = useState(logo);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark'); 
  const dispatch = useDispatch();
  const [purcaseCount,setPurcaseCount]=useState(localStorage.getItem("purcase") || 0)
  localStorage.setItem("purcase",purcase?.requests?.length)
  
  let data=''
  if(employeeToken){
    data=jwtDecode(employeeToken);    
  }
  useEffect(() => {
    
    if (purcase?.requests?.length !== undefined && purcase?.requests?.length !== null) {
      localStorage.setItem("purcase", purcase?.requests?.length);
      setPurcaseCount(purcase?.requests?.length);     
    }

  }, [purcase?.requests?.length]);

  const toggleList = () => setToggleMenu((prev) => !prev);

  const hiddenSide = () => setHiddenSideBar((prev) => !prev);

  const toggleDark = () => {
    const newDarkMode = !dark;
    setDark(newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light'); 
  };

  const logOut = () => {
    dispatch(logout());
    persistor.purge();
    window.location.href = '/login-employee';
  };
  setTimeout(() => {
    logOut();
  }, 3 * 24 * 60 * 60 * 1000);
  useEffect(() => {
    if(employeeToken){
      dispatch(profileEmp());
    }
  }, [dispatch,employeeToken]);

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    dark?setNavbarLogo(logo):setNavbarLogo(logo2)

  }, [dark]);

  return (
    <header className={`shadow-md z-40 py-3 ${dark ? 'dark:bg-gray-900' : 'bg-white'} transition-colors`}>
      <nav className="container m-auto px-5 lg:px-20">
        <div className='flex items-center gap-4 justify-between relative'>
            <Link to="/panel" className='w-32 flex items-center'>
              <img
                src={navbarLogo}
                className='w-full transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-6'
                alt="Edumatek Prime"
              />
            </Link>
          
          <div className='flex items-center gap-4 ms-auto'>
            <button onClick={toggleDark} className="text-gray-600 dark:text-gray-300">
              {dark ? (
                <i className="fa-solid fa-sun text-2xl"></i>
              ) : (
                <i className="fa-solid fa-moon text-2xl"></i>
              )}
            </button>
            <div className='w-14 h-14 bg-gray-300 dark:bg-gray-800 rounded-full'>
              <img
                onClick={toggleList}
                src={getProfile?.user?.profilePicture?.secure_url } 
                className='w-14 h-14 p-1 rounded-full cursor-pointer'
                alt="Profile"
              />
            </div>
            <div className="absolute top-0 mt-20 end-0">
              {toggleMenu && (
                <div className=' w-[300px] dark:bg-gray-800 dark:text-gray-200 '>
                <Card className="max-w-sm">
                  <div className="flex flex-col items-center pb-10">
                    <Link to="/panel/setting"  className='h-20 w-20 bg-gray-100 dark:bg-gray-800 rounded-full '>
                        <img src={getProfile?.user?.profilePicture?.secure_url  } className=' rounded-full w-20 h-20 ' alt="profile" />
                    </Link>
                    <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white mt-2">{getProfile?.user?.name}</h5>
                    <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">{getProfile?.user?.role}</h5>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                      <Link
                        to="/panel/setting"                           
                        className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                      >
                        Profile
                      </Link>
                      <div
                    onClick={logOut}
                    className="inline-flex items-center rounded-lg cursor-pointer border border-red-700 bg-red-600 px-4 py-2 text-center text-sm font-medium  text-red-700 dark:text-red-600 hover:bg-red-300 focus:outline-none focus:ring-4 focus:ring-red-200 bg-opacity-50 dark:bg-opacity-50 dark:border-red-600 dark:bg-red-800  dark:hover:border-red-700 hover:bg-opacity-50 dark:hover:bg-opacity-50 dark:hover:bg-red-700 dark:focus:ring-red-700"
                      >
                        Sign out
                      </div>
                    </div>
                  </div>
                </Card>
            </div>
              )}
              
            </div>
          </div>
          <div
            className='bg-gray-100 dark:bg-gray-700 p-3 cursor-pointer rounded-lg text-rose-600 block md:hidden'
            onClick={hiddenSide}
          >
            <i className={`fa-solid fa-${hiddenSideBar ? 'eye' : 'eye-slash'}`}></i>
          </div>
        </div>
      </nav>
    </header>
  );
}
