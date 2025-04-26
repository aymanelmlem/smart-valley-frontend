import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOrDeleteCart,
  getMyCart,
  sendRequstBuyCourse,
} from '../../../redux/student/student.slice';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';

export default function Cart() {
  const { isLoading, getcart } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteCourse = async (id) => {
    const response = await dispatch(addOrDeleteCart(id));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      localStorage.setItem(`cartMessage_${id}`, response.payload.message);
      dispatch(getMyCart());
    } else {
      toast.error(response.payload.message);
    }
  };
  const sendRequstToBuyingCourse = async (id) => {
    const res = await dispatch(sendRequstBuyCourse(id));
    if (res.payload.success) {
      navigate('/requestStudent');
      toast.success(res.payload.message);
      deleteCourse(id);
    } else {
      toast.info(res.payload.message);
    }
  };
  useEffect(() => {
    dispatch(getMyCart());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <meta name="description" content="cart page" />
        <meta name="keywords" content="cart, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="py-28 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {getcart.cartNumbers} courses in cart
          </h1>
          {isLoading ? (
            <LoadingBetweenPage />
          ) : (
            <div>
              {getcart?.userCart?.cart?.length > 0 ? (
                <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                      <th className="text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                        Course
                      </th>
                      
                      <th className="text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                        Duration
                      </th>
                      <th className="text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                        Instructor
                      </th>
                      <th className="text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                        Price
                      </th>
                      <th className="text-center px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getcart?.userCart?.cart.map((course) => (
                      <tr
                        key={course._id}
                        className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              alt={course.courseName}
                              src={course.coursePicture.secure_url}
                              className="w-16 h-16 rounded-md object-cover mr-4"
                            />
                            <span className="font-bold text-gray-800 dark:text-gray-100">
                              {course.courseName}
                            </span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {course.courseHours} hours
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {course.teachedBy}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {course.coursePrice} EGP
                        </td>
                        <td className="px-6 py-4 text-center ">
                          <button
                            onClick={() => sendRequstToBuyingCourse(course.id)}
                            className="text-sm bg-gray-500 bg-opacity-50 dark:bg-opacity-40 font-bold dark:bg-blue-600 p-2 rounded-md text-blue-600 dark:text-blue-300 hover:underline"
                          >
                            Buy course
                          </button>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="text-sm ms-2 bg-red-500 bg-opacity-50 font-bold dark:bg-red-600 dark:bg-opacity-50 p-2 rounded-md text-red-500 dark:text-red-500 hover:underline "
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-300 py-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-16 h-16 mb-4 text-gray-500 dark:text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h11L17 13M9 16a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
                <h2 className="text-xl font-semibold mb-2">Your Cart is Empty</h2>
                <p className="text-center mb-4">
                  Explore courses and add them to your cart to start learning.
                </p>
                <Link to="/courses" className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                  Browse Courses
                </Link>
              </div>
              
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
