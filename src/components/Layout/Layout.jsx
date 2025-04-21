import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import NavbarDas from '../NavbarDash/NavbarDas';

export default function Layout() {
  let [togleSideBar, setTogleSideBar] = useState(true);
  let [hiddenSideBar, setHiddenSideBar] = useState(true);

  return (
    <>
      <div className="flex h-screen ">
        {
          hiddenSideBar?<div className={`fixed top-0 left-0 h-screen transition-all duration-300 ${togleSideBar ? 'w-56' : 'w-20'}`}>
          <Sidebar togleSideBar={togleSideBar} setTogleSideBar={setTogleSideBar} />
        </div>:""
        }
        <div className={`flex-grow flex flex-col min-h-screen transition-all overflow-y-auto duration-500 ${togleSideBar ? 'ml-56' :hiddenSideBar?"ml-20":'m-0'}`}>
          <NavbarDas togleSideBar={togleSideBar} hiddenSideBar={hiddenSideBar} setHiddenSideBar={setHiddenSideBar} />
          <div className="flex-grow p-8 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
