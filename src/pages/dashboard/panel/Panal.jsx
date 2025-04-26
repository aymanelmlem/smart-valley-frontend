import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardInstructor, dashboardSuperAdmin, profileEmp } from '../../../redux/instructor/instructorSlice';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function Panal() {
  const [showPanel, setShowPanel] = useState(false);
  const dispatch = useDispatch();
  const [fadeOut, setFadeOut] = useState(false);
  const { getProfile, employeeToken, dashboard } = useSelector((state) => state.instructor);
  let data = '';

  if (employeeToken) {
    data = jwtDecode(employeeToken);
  }

  useEffect(() => {
    setShowPanel(true);
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    const hideTimer = setTimeout(() => {
      setShowPanel(false);
      setFadeOut(false);
    }, 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    dispatch(profileEmp());
  }, [dispatch]);

  useEffect(() => {
    if (data.role === 'superAdmin') {
      dispatch(dashboardSuperAdmin());
    }else{
      dispatch(dashboardInstructor());
    }
  }, [dispatch, data.role]);
  
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <meta name="description" content="Dashboard  page" />
        <meta name="keywords" content="Dashboard , elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl m-auto px-4 mt-8">
      {showPanel && (
        <div
          className={`${
            fadeOut ? 'opacity-0 transition-opacity duration-1000' : 'opacity-100'
          } dark:bg-teal-500 bg-teal-700 text-white py-4 px-6 rounded-md shadow-md mb-6 transition-opacity duration-1000`}
        >
          <p>Welcome back! {getProfile?.user?.name} You have successfully logged in.</p>
        </div>
      )}
      {data.role === "superAdmin"&&
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Card for Students */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Students</h3>
            <p className="text-4xl font-bold">{dashboard?.students}</p>
          </div>

          {/* Card for Teachers */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Teachers</h3>
            <p className="text-4xl font-bold">{dashboard?.ins}</p>
          </div>

          {/* Card for Courses */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
            <p className="text-4xl font-bold">{dashboard?.courses}</p>
          </div>

          {/* Card for Categories */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Categories</h3>
            <p className="text-4xl font-bold">{dashboard?.categroeis}</p>
          </div>

          {/* Card for SubCategories */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Total SubCategories</h3>
            <p className="text-4xl font-bold">{dashboard?.subCategories}</p>
          </div>

          {/* Card for Instructor Requests */}
          <div className="bg-gradient-to-r from-red-400 to-red-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Instructor Requests</h3>
            <p className="text-4xl font-bold">{dashboard?.requestInsThatNowExists}</p>
          </div>

          {/* Card for Student Requests */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Student Requests</h3>
            <p className="text-4xl font-bold">{dashboard?.allReqyestsStudents}</p>
          </div>

          {/* Card for Unpaid Instructors */}
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Instructors Not Paid</h3>
            <p className="text-4xl font-bold">{dashboard?.numberOfInsNotPayedCosts}</p>
          </div>

          {/* Card for Stopped Instructors */}
          <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Stopped Instructors</h3>
            <p className="text-4xl font-bold">{dashboard?.numberOfInsThatStoppedBySuperAdmin}</p>
          </div>

          {/* Card for Student Buy Requests */}
          <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">New Student Buy Requests</h3>
            <p className="text-4xl font-bold">{dashboard?.requestsStudentsToBuyCoursesThatAlreadyNew}</p>
          </div>
        </div>
        
      }
      {data.role === "instructor"&&
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {/* Card for Courses */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
            <p className="text-4xl font-bold">{dashboard?.courses}</p>
          </div>
            
            {/* Card for New Students Wanting to Subscribe */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">New Students Want to Subscribe</h3>
            <p className="text-4xl font-bold">{dashboard?.newStucentsWantToSubscribe}</p>
          </div>
          
          {/* Card for Students Already in Your Courses */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-2">Students in Your Courses</h3>
            <p className="text-4xl font-bold">{dashboard?.studentsThatAlreadyInYourCourses}</p>
          </div>

        {/* Card for Interested Students/Users */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold mb-2">Interested Students/Users</h3>
          <p className="text-4xl font-bold">{dashboard?.studentsOrUsersThatInterestedAboutYorCourses}</p>
        </div>
        {/* Card for Free Courses */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold mb-2">Free Courses Presented</h3>
          <p className="text-4xl font-bold">{dashboard?.coursesFreeThatYouPresent}</p>
        </div>
      </div>
      }
    </div>
    </>
  );
}
