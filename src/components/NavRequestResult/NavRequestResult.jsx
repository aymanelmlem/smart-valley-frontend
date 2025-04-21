import { ListGroup } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, resultRequest } from '../../redux/instructor/instructorSlice';
import { HiOutlineLogout } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import { persistor } from '../../redux/store';

export default function NavRequestResult() {
  let [toggleMenu, setToggleMenu] = useState(false);
  let dispatch = useDispatch();
  const { resultReq, employeeToken } = useSelector((state) => state.instructor);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('themeUser') === 'dark'
  );
  const [navbarLogo, setNavbarLogo] = useState(logo);
  function toggleList() {
    setToggleMenu(!toggleMenu);
  }
  const logOut = () => {
    dispatch(logout());
    persistor.purge();
    window.location.href = '/login-employee';
  };
  setTimeout(() => {
    logOut();
  }, 3 * 24 * 60 * 60 * 1000);
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };
  useEffect(() => {
    if (employeeToken) {

      dispatch(resultRequest());
    }
  }, [dispatch, employeeToken]);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    darkMode ? setNavbarLogo(logo) : setNavbarLogo(logo2);
  }, [darkMode]);
  return (
    <>
      <header className="shadow-md bg-white dark:bg-gray-900">
        <nav className="container m-auto py-3  px-5 lg:px-20 ">
          <div className="flex items-center gap-4 justify-between relative">
            <Link to="/" className="w-36 flex items-center">
              <img
                src={navbarLogo}
                className="w-full transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-6 rounded-sm"
                alt="Edumatek Prime"
              />
            </Link>
            <div className="flex justify-center items-center gap-4 ms-auto">
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-300"
              >
                {darkMode ? (
                  <i className="fa-solid fa-sun text-2xl 0"></i>
                ) : (
                  <i className="fa-solid fa-moon text-2xl"></i>
                )}
              </button>
              {resultReq?.message ===
              'you must pay the cost first then contact with the superAdmin to continue using the service' ? (
                ''
              ) : (
                <div className="w-14 h-14">
                  <img
                    src={resultReq?.requestData?.profilePicture?.secure_url}
                    className="w-14 h-14 rounded-full"
                    alt=""
                  />
                </div>
              )}
              <i
                className="fa-solid fa-caret-down text-xl cursor-pointer dark:text-white"
                onClick={toggleList}
              ></i>
              <div className="absolute top-0 mt-20 end-0 ">
                {toggleMenu ? (
                  <ListGroup className="w-48 p-4 shadow-md divide-y ">
                    <ListGroup.Item
                      onClick={logOut}
                      className="flex items-center text-gray-700 dark:text-white  "
                    >
                      <HiOutlineLogout className="mr-2" />
                      Logout
                    </ListGroup.Item>
                  </ListGroup>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
