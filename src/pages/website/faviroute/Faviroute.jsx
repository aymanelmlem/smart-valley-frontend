import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourseInCartDatabase,
  addOrDeleteCart,
  addOrdeleteCourseFromWhilist,
  getMyCart,
  getMyLikes,
} from '../../../redux/student/student.slice';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
import { Link } from 'react-router-dom';

export default function Faviroute() {
  const { isLoading, getlike } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [courseIds, setCourseIds] = useState({ cousresIds: [] });
  const deleteCourse = async (id) => {
    const response = await dispatch(addOrdeleteCourseFromWhilist(id));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      dispatch(getMyLikes());
      localStorage.setItem(`likesMessage_${id}`, response.payload.message);
    } else {
      toast.error(response.payload.message);
    }
  };

  const handleCart = async (id) => {
    const response = await dispatch(addOrDeleteCart(id));
    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      setCourseIds(id);
      localStorage.setItem(`cartMessage_${id}`, response?.payload?.message);
      dispatch(getMyCart());
      dispatch(addCourseInCartDatabase({ value: courseIds }));
      deleteCourse(id);
    } else {
      toast.error(response.payload.message);
    }
  };
  useEffect(() => {
    dispatch(getMyLikes());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Faviroute</title>
        <meta name="description" content="Faviroute page" />
        <meta name="keywords" content="Faviroute, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="py-28 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {getlike.numberLikes} courses in Favorites
          </h1>
          {isLoading ? (
            <LoadingBetweenPage />
          ) : (
            <div>
              {getlike?.likes?.length > 0 ? (
                <table className="w-full text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="p-4 text-gray-800 dark:text-gray-100">
                        Image
                      </th>
                      <th className="p-4 text-gray-800 dark:text-gray-100">
                        Course
                      </th>

                      <th className="p-4 text-gray-800 dark:text-gray-100">
                        Duration
                      </th>
                      <th className="p-4 text-gray-800 dark:text-gray-100">
                        Instructor
                      </th>
                      <th className="p-4 text-gray-800 dark:text-gray-100">
                        Price
                      </th>
                      <th className="p-4 text-gray-800 dark:text-gray-100">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getlike?.likes?.map((course, index) => (
                      <tr
                        key={course._id}
                        className={`border-b ${
                          index % 2 === 0
                            ? 'bg-gray-50 dark:bg-gray-900'
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                      >
                        <td className="p-4">
                          <img
                            alt={course.courseName}
                            src={course.coursePicture.secure_url}
                            className="w-24 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-100">
                          {course.courseName}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          {course.courseHours} hours
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          {course.teachedBy}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          {course.coursePrice} EGP
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleCart(course.id)}
                            className="text-sm me-2 bg-gray-500 bg-opacity-50 dark:bg-opacity-40 font-bold dark:bg-blue-600 p-2 rounded-md text-blue-600 dark:text-blue-300 hover:underline"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="text-sm  bg-red-500 bg-opacity-50 font-bold dark:bg-red-600 dark:bg-opacity-50 p-2 rounded-md text-red-500 dark:text-red-500 hover:underline "
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
                      d="M5.121 19a2.007 2.007 0 01-1.414-.586A2 2 0 013 17.12V9.12a2.007 2.007 0 01.586-1.415L11.29 3.12a2 2 0 012.42 0l7.704 4.586a2.007 2.007 0 01.586 1.415v8a2 2 0 01-.586 1.414 2.007 2.007 0 01-1.414.586H5.121z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold mb-2">
                    Your Favorites is Empty
                  </h2>
                  <p className="text-center mb-4">
                    Explore courses and add them to your Favorites.
                  </p>
                  <Link
                    to="/courses"
                    className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
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
