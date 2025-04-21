import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { profileEmp } from '../../redux/instructor/instructorSlice';

export default function Sidebar({ togleSideBar, setTogleSideBar }) {
  const { employeeToken,getProfile } = useSelector(state => state.instructor);
  const dispatch = useDispatch();
  let data=''
  if(employeeToken){
    data=jwtDecode(employeeToken);    
  }
  const [toggleSections, setToggleSections] = useState({
    managers: false,
    instructors: false,
    topics:false,
  });

  function toggleSide() {
    setTogleSideBar(!togleSideBar);
  }

  function handleToggleSection(section) {
    setToggleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  }
  


  useEffect(() => {
    dispatch(profileEmp());
  }, [dispatch]);

  
  return (
    <>
      <aside className={`shadow-md h-screen  dark:bg-gray-900  ${togleSideBar ? 'w-56' : 'w-20'} transition-all duration-300 bg-white z-50`}>
        <div className="p-5 flex items-center flex-col relative">
          <div className='mt-10 flex items-center gap-3'>
            <Link to="/panel/setting" className={`${togleSideBar ? 'block' : 'hidden'} transition-opacity duration-300  w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-800 `}>
              <img
                src={getProfile?.user?.profilePicture?.secure_url } 
                className='w-14 h-14 p-1 rounded-full cursor-pointer'
                alt="Profile"
              />
            </Link>
            {togleSideBar?
            <div className='dark:text-gray-400 text-gray-900'>
                <h3 className='capitalize '>{getProfile?.user?.name.slice(0,13)}</h3>
                <p className='capitalize text-sm dark:text-gray-300'>{getProfile?.user?.role}</p>
            </div>:""
            }
          </div>
          <div className="mt-9">
            <ul className="text-lg space-y-5 text-gray-800">
              {(data.role === "instructor" || data.role === "superAdmin")&&
              <SidebarLink
                to="/panel"
                iconClass="fa-solid fa-gauge text-rose-500"
                label="Dashboard"
                togleSideBar={togleSideBar}
              />
              }
              {data.role === 'superAdmin' && (
                <>
                  <SidebarLink
                    to="/panel/managers"
                    iconClass="fa-solid fa-people-roof text-teal-500"
                    label="Managers"
                    togleSideBar={togleSideBar}
                    icon={!toggleSections.managers ? "caret-right" : "sort-down"}
                    onClick={() => handleToggleSection('managers')}
                  />
                  {toggleSections.managers && (
                    <ul className={`bg-gray-100 dark:text-white dark:bg-gray-800 p-4 rounded-md transition-transform duration-300 ${toggleSections.managers ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                      <li>
                        <NavLink
                          to="/panel/addManager"
                          className={({ isActive }) =>
                            isActive
                              ? `${togleSideBar ? 'border-rose-950 border-b' : 'bg-rose-200 p-2 rounded-lg'} text-sm flex gap-2`
                              : 'text-sm flex gap-2'
                          }
                        >
                          <i className="fa-solid fa-user-plus text-pink-800"></i>
                          {togleSideBar ? "Add Manager" : ""}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                  <SidebarLink
                    to="/panel/instructors"
                    iconClass="fa-solid fa-person-chalkboard text-fuchsia-500"
                    label="Instructors"
                    togleSideBar={togleSideBar}
                    icon={!toggleSections.instructors ? "caret-right" : "sort-down"}
                    onClick={() => handleToggleSection('instructors')}
                  />
                  {toggleSections.instructors && (
                    <ul className={`bg-gray-100 dark:text-white dark:bg-gray-800 flex flex-col justify-center items-center p-4 rounded-md transition-transform duration-300 ${toggleSections.instructors ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                      <li>
                        <NavLink
                          to="/panel/addInstructor"
                          className={({ isActive }) =>
                            isActive
                              ? `${togleSideBar ? 'border-rose-950 border-b' : 'bg-rose-200 p-2 rounded-lg'} text-sm flex gap-2`
                              : 'text-sm flex gap-2'
                          }
                        >
                          <i className="fa-solid fa-user-plus text-pink-800"></i>
                          {togleSideBar ? "Add Instructor" : ""}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}

              {data.role === "admin" && (
                <SidebarLink
                  to="/panel/requests"
                  iconClass="fa-solid fa-bell text-teal-600"
                  label="Requests"
                  togleSideBar={togleSideBar}
                />
              )}

              {(data.role === "instructor" || data.role === "superAdmin") && (
                <>
                  <SidebarLink
                    to="/panel/category"
                    iconClass="fa-solid fa-book-open text-lime-500"
                    label="Topics"
                    togleSideBar={togleSideBar}
                    icon={!toggleSections.topics ? "caret-right" : "sort-down"}
                    onClick={() => handleToggleSection('topics')}
                  />
                  {toggleSections.topics && (
                    <ul className={`bg-gray-100 dark:text-white dark:bg-gray-800 flex space-y-4 flex-col justify-center items-center p-4 rounded-md transition-transform duration-300 ${toggleSections.topics ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                      <li>
                        <NavLink
                          to="/panel/allCategories"
                          className={({ isActive }) =>
                            isActive
                              ? `${togleSideBar ? 'bg-gray-300 dark:bg-gray-700 dark:text-white duration-300 transition ease-in p-2 text-gray-800 font-bold rounded-md' : 'bg-gray-300 dark:bg-gray-700 dark:text-white duration-300 transition ease-in p-2 text-gray-800 font-bold rounded-md'} p-2 text-sm flex gap-2`
                              : 'text-sm flex gap-2'
                          }
                        >
                          <i className="fa-solid fa-layer-group text-teal-800 dark:text-teal-500"></i>
                          {togleSideBar ? "All Categories" : ""}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/panel/myCategory"
                          className={({ isActive }) =>
                            isActive
                              ? `${togleSideBar ? 'bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md duration-300 transition ease-in p-2 text-gray-800 font-bold' : 'bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md duration-300 transition ease-in p-2 text-gray-800 font-bold'} p-2 text-sm flex gap-2`
                              : 'text-sm flex gap-2'
                          }
                        >
                          <i className="fa-brands fa-discourse text-pink-600 dark:text-pink-500"></i>
                          {togleSideBar ? "My Categories" : ""}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/panel/mycourses"
                          className={({ isActive }) =>
                            isActive
                              ? `${togleSideBar ? 'bg-gray-300 dark:bg-gray-700 dark:text-white duration-300 transition ease-in p-2 text-gray-800 font-bold rounded-md' : 'bg-gray-300 duration-300 transition ease-in dark:bg-gray-700 dark:text-white p-2 text-gray-800 font-bold rounded-md'} p-2 text-sm flex gap-2`
                              : 'text-sm flex gap-2'
                          }
                        >
                          <i className="fa-solid fa-book text-orange-600 dark:text-orange-500"></i>
                          {togleSideBar ? "My courses" : ""}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                  <SidebarLink
                    to="/panel/purcase"
                    iconClass="fa-solid fa-cart-shopping text-orange-500"
                    label="Purcase"
                    togleSideBar={togleSideBar}
                  />
                  <SidebarLink
                    to="/panel/exams"
                    iconClass="fa-solid fa-file-pen text-lime-300"
                    label="Exams"
                    togleSideBar={togleSideBar}
                  />
                </>
              )}

              <SidebarLink
                to="/panel/setting"
                iconClass="fa-solid fa-sliders text-rose-500"
                label="Setting"
                togleSideBar={togleSideBar}
              />
            </ul>
          </div>
          <div className="absolute top-0 right-0 text-xl  dark:bg-gray-800 bg-gray-100 cursor-pointer text-gray-800 dark:text-white px-3 py-2 hover:animate-pulse rounded-bl-md" onClick={toggleSide}>
            <i className={`fa-solid ${togleSideBar ? 'fa-arrow-left' : 'fa-arrow-right'} transition-transform duration-300 text-xl`}></i>
          </div>
        </div>
      </aside>

    </>
  );
}

function SidebarLink({ to, iconClass, label, togleSideBar, icon, onClick }) {
  return (
    <li className="flex items-center gap-3 group">
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-2 justify-center text-gray-800 bg-gray-300 dark:bg-gray-800 shadow-sm dark:text-white p-2 rounded-md transition-all duration-300'
            : 'flex items-center gap-2 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-300'
        }
      >
        <i className={`${iconClass} text-lg transition-transform duration-300 group-hover:scale-110`}></i>
        <span className={`${togleSideBar ? 'block ' : ' hidden '} transition-opacity duration-500`}>
          {label}
        </span>
      </NavLink>
      {onClick && (
        <i
          className={`fa-solid fa-${icon} cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-all duration-300`}
          onClick={onClick}
        ></i>
      )}
    </li>

  );
}
