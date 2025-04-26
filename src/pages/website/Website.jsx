import React from 'react'
import Navbar from '../../components/NavbarWebsite/Navbar'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Website() {
  return (
    <>
      <Navbar/>
      <div className='dark:bg-gray-900'>
            <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
