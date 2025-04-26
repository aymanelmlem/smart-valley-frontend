import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import SubCategory from '../../pages/website/subCategory/SubCategory';
import { FaSearch } from 'react-icons/fa';
import SearchCourses from '../../pages/website/courses/SearchCourse/SearchCourses';
import { Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyCart,
  getMyLikes,
  logOutStudent,
  logoutStudent,
  userProfileData,
} from '../../redux/student/student.slice';
const LanguageDropdown = ({
  isOpen,
  toggleDropdown,
  handleLanguageChange,
  currentLang,
  t,
}) => (
  <div className="relative">
    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
      <button
        onClick={toggleDropdown}
        className="border-e px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
      >
        {t(currentLang)}
      </button>
      <button
        onClick={toggleDropdown}
        className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
      >
        <span className="sr-only">{t('menu')}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>

    {isOpen && (
      <div
        className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
      >
        <div className="p-2">
          <button
            onClick={() => handleLanguageChange('en')}
            className="block w-full rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            {t('english')}
          </button>
          <button
            onClick={() => handleLanguageChange('ar')}
            className="block w-full rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            {t('arabic')}
          </button>
        </div>
      </div>
    )}
  </div>
);

const SearchInput = ({
  showSearch,
  toggleSearch,
  handleChange,
  t,
  search,
  setSearch,
}) => (
  <div className="">
    <FaSearch
      onClick={toggleSearch}
      className={`text-2xl cursor-pointer transition-all duration-300 text-gray-900 dark:text-white`}
    />
    {showSearch && (
      <div className="">
        <div className="absolute right-10 md:right-32 top-16 mt-8 w-64 bg-white dark:bg-gray-800 dark:border-gray-700 border border-gray-200 rounded-md shadow-md p-4 transition-transform duration-300 ease-in-out transform">
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={search}
            className="w-full px-3 py-2 border rounded-md dark:text-gray-500 focus:outline-none text-gray-950 dark:bg-gray-900"
            onChange={handleChange}
          />
        </div>
        {search && <SearchCourses search={search} setSearch={setSearch} />}
      </div>
    )}
  </div>
);

export default function Navbar() {
  const { isLogin, profile, getcart, getlike } = useSelector(
    (state) => state.students
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [showNav, setShowNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navbarLogo, setNavbarLogo] = useState(logo);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenuUser, setShowMenuUser] = useState(false);
  const [showCardSearch, setShowCardSearch] = useState('');
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [cartCount, setCartCount] = useState(localStorage.getItem('cart'));
  const [likeCount, setLikeCount] = useState(localStorage.getItem('like'));
  localStorage.setItem('cart', getcart.cartNumbers);
  localStorage.setItem('like', getlike.numberLikes);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );
  const [menuState, setMenuState] = useState({
    showMenu: false,
    showMenuSecond: false,
    showMenuThird: false,
  });
  const toggleUser = () => {
    setShowMenuUser(!showMenuUser);
  };
  const menuRef = useRef(null);
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setIsOpen(false);
  };
  const handleChangeCard = (e) => {
    setShowCardSearch(e.target.value);
  };
  const toggleMenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };
  const logout = () => {
    dispatch(logOutStudent());
    dispatch(logoutStudent());
    navigate('/student-login');
  };
  const toggleNav = () => setShowNav((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };
  useEffect(() => {
    if (isLogin) {
      dispatch(userProfileData());
      dispatch(getMyCart());
      dispatch(getMyLikes());
    }
  }, [dispatch, isLogin]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuState({
          showMenu: false,
          showMenuSecond: false,
          showMenuThird: false,
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (getcart.cartNumbers !== undefined && getcart.cartNumbers !== null) {
      localStorage.setItem('cart', getcart.cartNumbers);
      setCartCount(getcart.cartNumbers);
    }
    if (getlike.numberLikes !== undefined && getlike.numberLikes !== null) {
      localStorage.setItem('like', getlike.numberLikes);
      setLikeCount(getlike.numberLikes);
    }
  }, [getcart.cartNumbers, getlike.numberLikes]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    darkMode ? setNavbarLogo(logo) : setNavbarLogo(logo2);
  }, [darkMode]);
  setTimeout(() => {
    logout();
  }, 3 * 24 * 60 * 60 * 1000);
  return (
    <header
      className={`fixed top-0 w-full shadow-md z-50 py-5 bg-white dark:bg-gray-900`}
    >
      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex justify-between gap-3 items-center">
        {/* Logo */}
        <Link to="/" className="w-36 flex items-center">
          <img
            src={navbarLogo}
            className="w-full transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-6 rounded-sm"
            alt="Edumatek Prime"
          />
        </Link>
        <div className="flex gap-5 items-center lg:hidden">
          {/* Dark Mode Toggle */}
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
          <SearchInput
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleChange={handleChangeCard}
            t={t}
            search={showCardSearch}
          />
          {isLogin !== null ? (
            <div className="relative  lg:hidden">
              <div
                onClick={toggleUser}
                className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer"
              >
                <img
                  src={profile?.userData?.profilePicture?.secure_url}
                  className="h-12 w-12 rounded-full"
                  alt="profile"
                />
              </div>
              {showMenuUser && (
                <div className="absolute right-0 w-[300px] top-12">
                  <Card className="max-w-sm">
                    <div className="flex flex-col items-center pb-10">
                      <Link
                        to="/profile"
                        className="h-12 w-12 bg-gray-200 dark:bg-gray-900 rounded-full "
                      >
                        <img
                          src={profile?.userData?.profilePicture?.secure_url}
                          className="h-12 w-12 rounded-full"
                          alt="profile"
                        />
                      </Link>
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mt-2">
                        {profile?.userData?.userName}
                      </h5>
                      <div className="mt-4 flex space-x-3 lg:mt-6">
                        <Link
                          to="/profile"
                          className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                          Profile
                        </Link>
                        <div
                          onClick={logout}
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
          ) : (
            ''
          )}
          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <i
              onClick={toggleNav}
              aria-label="Toggle navigation menu"
              className={`fa-solid ${
                showNav ? 'fa-xmark' : 'fa-bars'
              } dark:text-white text-3xl cursor-pointer transition-all duration-300`}
            ></i>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-col lg:flex-row items-center bg-white dark:bg-gray-900 lg:static absolute   w-full p-6 lg:p-0 top-20 transition-all duration-500 ease-in-out ${
            showNav ? 'right-0' : '-right-full'
          }`}
        >
          <ul className="flex flex-col lg:flex-row items-center gap-5 lg:ms-auto text-gray-900 dark:text-white">
            {['/', '/about', '/instructor', '/contact'].map((path, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-lg text-blue-500 font-bold  capitalize'
                      : `text-lg hover:text-blue-500  transition-all capitalize duration-300 `
                  }
                >
                  {t(path.split('/')[1] || 'home')}
                </NavLink>
              </li>
            ))}
            {isLogin && (
              <li>
                <NavLink
                  to="/myLearning"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-lg text-blue-500 font-bold capitalize'
                      : 'text-lg hover:text-blue-500 transition-all capitalize duration-300'
                  }
                >
                  {t('myLearning')}
                </NavLink>
              </li>
            )}
            <li className="relative" ref={menuRef}>
              <div
                onClick={() => toggleMenu('showMenu')}
                className={`text-lg cursor-pointer hover:border-b-2 transition-all duration-300 ${
                  menuState.showMenu
                    ? 'text-blue-500 border-b-2 border-gray-900'
                    : ''
                }`}
              >
                {t('topics')}
              </div>
              {menuState.showMenu && (
                <div className="bg-white dark:bg-gray-800 absolute top-full left-0 mt-2 rounded-md shadow-md p-4 z-10">
                  <div className="flex gap-2 flex-wrap md:flex-nowrap ">
                    <NavLink
                      to="/courses"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-lg text-blue-500   dark:text-blue-700 font-bold  rounded-full p-2  bg-gray-50 dark:bg-gray-700 '
                          : `text-lg text-gray-900 dark:text-white   p-2 rounded-full transition-all duration-300 block `
                      }
                    >
                      {t('courses')}
                    </NavLink>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu('showMenuSecond');
                      }}
                      className={`cursor-pointer text-lg  dark:text-white   p-2 rounded-full transition-all duration-300 block relative ${
                        menuState.showMenuSecond
                          ? 'text-blue-500 dark:text-blue-700 font-bold text-lg  border-gray-900  bg-gray-50 dark:bg-gray-700 rounded-full text-center   p-2 flex justify-center items-center'
                          : ''
                      }`}
                    >
                      {t('more')}
                      {menuState.showMenuSecond && (
                        <div className="bg-white dark:bg-gray-800 absolute top-full left-0 mt-2 rounded-md shadow-md p-4">
                          <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                              isActive
                                ? 'text-sm  border-gray-900 text-blue-600 bg-gray-50 dark:bg-gray-700 rounded-full text-center dark:text-blue-700 font-bold  p-2 block'
                                : `text-sm text-gray-900 dark:text-white  p-2 rounded-full transition-all duration-300 text-center block `
                            }
                          >
                            {t('categories')}
                          </NavLink>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu('showMenuThird');
                            }}
                            className={`mt-3 text-center cursor-pointer text-sm   dark:text-white p-2 rounded-full transition-all duration-300 block relative ${
                              menuState.showMenuThird
                                ? 'text-blue-500 dark:text-blue-700 bg-gray-50 dark:bg-gray-700   font-bold'
                                : ''
                            }`}
                          >
                            {t('subcategories')}
                            {menuState.showMenuThird && (
                              <div className="w-full">
                                <SubCategory />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>

          {/* Language Dropdown and Buttons */}
          <div className="flex items-center gap-5 ms-auto flex-col lg:flex-row">
            <div className="flex items-center  gap-4 ">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-300 hidden lg:block"
              >
                {darkMode ? (
                  <i className="fa-solid fa-sun text-2xl"></i>
                ) : (
                  <i className="fa-solid fa-moon text-2xl"></i>
                )}
              </button>
              {isLogin && (
                <>
                  <Link
                    to="/favorute"
                    className="flex gap-3 items-center h-10 w-10  text-lg relative"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 dark:text-white"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <p className="text-white absolute text-sm bg-red-500 rounded-full w-5 h-5 top-0 right-0 flex items-center justify-center">
                      {likeCount ?? 0}
                    </p>
                  </Link>
                  <Link
                    className="flex gap-3 items-center h-10 w-10  text-lg relative  "
                    to="/cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6  dark:text-white"
                    >
                      <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                    <p className="text-white  absolute text-sm bg-fuchsia-500 rounded-full w-5 h-5 top-0 right-0 flex items-center justify-center">
                      {cartCount ?? 0}
                    </p>
                  </Link>
                </>
              )}
            </div>
            <LanguageDropdown
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
              handleLanguageChange={handleLanguageChange}
              currentLang={currentLang}
              t={t}
            />
            {isLogin == null ? (
              <Link
                to="/student-login"
                className={`rounded-md px-5 py-2.5 text-sm font-medium text-white bg-blue-500 dark:bg-blue-700`}
              >
                {t('login')}
              </Link>
            ) : (
              ''
            )}
            {isLogin == null ? (
              <Link
                to="/student-signup"
                className={`rounded-md  px-5 py-2.5 text-sm font-medium flex items-center gap-2 text-gray-900 dark:text-white  border-2 border-blue-600 dark:border-blue-700`}
              >
                {t('signup')}
              </Link>
            ) : (
              ''
            )}
            <div className="hidden lg:block">
              <SearchInput
                showSearch={showSearch}
                toggleSearch={toggleSearch}
                handleChange={handleChangeCard}
                t={t}
                search={showCardSearch}
              />
            </div>
            {isLogin !== null ? (
              <div className="relative hidden lg:block">
                <div
                  onClick={toggleUser}
                  className="h-12 w-12 bg-gray-200 dark:bg-gray-900 rounded-full cursor-pointer"
                >
                  <img
                    src={profile?.userData?.profilePicture?.secure_url}
                    className="w-12 h-12 rounded-full"
                    alt="profile"
                  />
                </div>
                {showMenuUser && (
                  <div className="absolute right-0 w-[300px] top-12">
                    <Card className="max-w-sm">
                      <div className="flex flex-col items-center pb-10">
                        <Link
                          to="/profile"
                          className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full "
                        >
                          <img
                            src={profile?.userData?.profilePicture?.secure_url}
                            className="h-16 w-16 rounded-full"
                            alt="profile"
                          />
                        </Link>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mt-2">
                          {profile?.userData?.userName}
                        </h5>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                          <Link
                            to="/profile"
                            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                          >
                            Profile
                          </Link>
                          <div
                            onClick={logout}
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
            ) : (
              ''
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
