import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addCourseInCartDatabase,
  addCourseInWhishlistDatabase,
  addOrDeleteCart,
  addOrdeleteCourseFromWhilist,
  getMyCart,
  getMyLikes,
} from '../../../../../redux/student/student.slice';
import { toast } from 'react-toastify';

export default function CourseCategory({ data, state }) {
  const { isLogin } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [courseIds, setCourseIds] = useState({ cousresIds: [] });
  const [courseIdsLikes, setCourseIdsLikes] = useState({ cousresIds: [] });
  const navigate = useNavigate();
  const [showCartIcon, setShowCartIcon] = useState(() => {
    return localStorage.getItem(`cartMessage_${data._id}`) || '';
  });
  const [showLikesIcon, setShowLikesIcon] = useState(() => {
    return localStorage.getItem(`likesMessage_${data._id}`) || '';
  });

  const handleCart = async (id) => {
    const response = await dispatch(addOrDeleteCart(id));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      setShowCartIcon(response.payload.message);
      setCourseIds(id);
      localStorage.setItem(`cartMessage_${id}`, response.payload.message);
      dispatch(getMyCart());
      dispatch(addCourseInCartDatabase({ value: courseIds }));
    } else {
      toast.error(response.payload.message);
    }
  };
  const handleWhilsit = async (id) => {
    const response = await dispatch(addOrdeleteCourseFromWhilist(id));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      setShowLikesIcon(response.payload.message);
      setCourseIdsLikes(id);
      dispatch(addCourseInWhishlistDatabase({ value: courseIdsLikes }));
      dispatch(getMyLikes());
      localStorage.setItem(`likesMessage_${id}`, response.payload.message);
    } else {
      toast.error(response.payload.message);
    }
  };

  useEffect(() => {
    const storedMessage = localStorage.getItem(`cartMessage_${data._id}`);
    if (storedMessage) {
      setShowCartIcon(storedMessage);
    }
  }, [data._id]);

  useEffect(() => {
    const storedMessage = localStorage.getItem(`likesMessage_${data._id}`);
    if (storedMessage) {
      setShowLikesIcon(storedMessage);
    }
  }, [data._id]);
  return (
    <div className="block rounded-lg bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-800 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/CourseDetailsStudent/${data.id}`}>
        <img
          alt={data.courseName}
          src={data.coursePicture.secure_url}
          className="h-56 w-full rounded-t-lg object-cover"
        />
        <div className="p-4">
          <p className="text-sm t font-bold text-gray-900 dark:text-gray-200 capitalize">
            {data.courseName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">
            {data.courseDescription}
          </p>

         

          <div className="mt-4 flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full">
              <img
                alt={data.courseName}
                src={data.instructor.profilePicture.secure_url}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-100">
                Teached By
              </p>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {data.teachedBy}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-700 dark:text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
              <div>
                <p className="text-gray-500 dark:text-gray-100">Price</p>
                <p className="font-medium dark:text-gray-200">
                  {data.coursePrice} EGP
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-700 dark:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div>
                <p className="text-gray-500 dark:text-gray-100">Hours</p>
                <p className="font-medium dark:text-gray-200">
                  {data.courseHours} h
                </p>
              </div>
            </div>
          </div>
          {state && isLogin ? (
            state == 'not buyed' ? (
              <div className="mt-6 flex justify-between">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCart(data.id);
                  }}
                  aria-label="Add to Cart"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {showCartIcon ===
                  'the course is added successfully to the cart' ? (
                    <>
                      <i className="fa-solid text-lg  fa-cart-shopping text-indigo-600 dark:text-indigo-700 "></i>
                    </>
                  ) : (
                    <i className="fa-solid text-lg fa-cart-shopping "></i>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleWhilsit(data.id);
                  }}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {showLikesIcon ===
                  'The course has been added to your likes list successfully.' ? (
                    <>
                      <i className="fa-solid text-lg text-red-600 dark:text-red-700 fa-heart"></i>
                    </>
                  ) : (
                    <i className="fa-regular text-lg  fa-heart"></i>
                  )}
                </button>
              </div>
            ) : state ==
              'you make request to buy this course contact with the owner of this course' ? (
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/requestStudent');
                  }}
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-md shadow-md bg-blue-600 hover:bg-blue-700 group mt-5"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-75 group-hover:from-blue-600 group-hover:to-blue-800"></span>
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-full bg-white opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative flex items-center gap-2">
                    <i className="fa-solid fa-check-circle"></i>
                    Complete Purchase
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/sections/${data._id}`);
                  }}
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-md shadow-md bg-blue-600 hover:bg-blue-700 group mt-5"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-75 group-hover:from-blue-600 group-hover:to-blue-800"></span>
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-full bg-white opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative flex items-center gap-2">
                    <i className="fa-solid fa-arrow-right"></i>
                    Go to course
                  </span>
                </button>
              </div>
            )
          ) : (
            ''
          )}
        </div>
      </Link>
    </div>
  );
}
