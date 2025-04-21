import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteRequstBuyCourse,
  showRequstBuyCourse,
} from '../../../redux/student/student.slice';
import { FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';

export default function RequestStudentCourse() {
  const { getBuyingCourses } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [selectedRequest, setSelectedRequest] = useState(null);
  useEffect(() => {
    dispatch(showRequstBuyCourse());
  }, [dispatch]);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };
  const deleteRequest = async (id) => {
    const response = await dispatch(deleteRequstBuyCourse(id));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      dispatch(showRequstBuyCourse());
    } else {
      toast.error(response.payload.message);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Purcases</title>
        <meta name="description" content="Purcases page" />
        <meta name="keywords" content="Purcases, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="dark:bg-gray-900 bg-gray-100 min-h-screen py-28 transition-all duration-500">
        <div className="max-w-screen-xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            Course Purchase Requests
          </h1>

          {getBuyingCourses?.requests &&
          getBuyingCourses.requests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getBuyingCourses.requests.map((request) => (
                <div
                  key={request._id}
                  className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="dark:bg-gray-700  rounded-md bg-gray-50">
                    {/* Course Image */}
                    <img
                      src={request.courseId.coursePicture.secure_url}
                      alt={request.courseId.courseName}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    {/* Course Details */}
                    <div className="flex-grow px-3">
                      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                        {request.courseId.courseName}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        {request.courseId.courseDescription}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200 flex items-center mb-2">
                        <FaClock className="mr-2" />{' '}
                        {request.courseId.courseHours} h
                      </p>
                      <p className="text-gray-800 dark:text-gray-200 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                          />
                        </svg>
                        {request.courseId.coursePrice} EGP
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        {request.state === 'noActionTaken' && (
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              request.state === 'noActionTaken' &&
                              'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-900'
                            }`}
                          >
                            {request.state === 'noActionTaken' &&
                              'No Action Taken'}
                          </span>
                        )}
                        {request.state === 'notSeenYet' && (
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              request.state === 'notSeenYet' &&
                              'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-900'
                            }`}
                          >
                            {request.state === 'notSeenYet' && 'not Seen Yet'}
                          </span>
                        )}
                        {request.state === 'payed' && (
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              request.state === 'payed' &&
                              'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-900'
                            }`}
                          >
                            {request.state === 'payed' && 'payed'}
                          </span>
                        )}
                        {request.state === 'notPayed' && (
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              request.state === 'notPayed' &&
                              'bg-rose-100 text-rose-700 dark:bg-rose-200 dark:text-rose-900'
                            }`}
                          >
                            {request.state === 'notPayed' && 'un Payed'}
                          </span>
                        )}
                        {request.state === 'rejectedRequest' && (
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              request.state === 'rejectedRequest' &&
                              'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-900'
                            }`}
                          >
                            {request.state === 'rejectedRequest' &&
                              'rejected purcase'}
                          </span>
                        )}
                        {request.state === 'paused' && (
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              request.state === 'paused' &&
                              'bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
                            }`}
                          >
                            {request.state === 'paused' && 'paused'}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-3 flex justify-between p-3">
                      <button
                        className="bg-blue-500 dark:bg-blue-600 text-blue-700 dark:text-blue-300 bg-opacity-50 dark:bg-opacity-50 hover:bg-blue-600  font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
                        onClick={() => handleViewDetails(request)}
                      >
                        View Details
                      </button>
                      {request.state === 'payed' ? (
                        ''
                      ) : (
                        <button
                          onClick={() => deleteRequest(request.id)}
                          className="bg-red-500 dark:bg-red-600 bg-opacity-50 dark:bg-opacity-50 hover:bg-red-600 text-red-700 dark:text-red-500 font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                          Remove Request
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No course purchase requests available.
            </p>
          )}
        </div>
        {selectedRequest && (
          <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white mt-10 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {selectedRequest.courseId.courseName} - Details
              </h2>

              {/* Course Details */}
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {selectedRequest.courseId.courseDescription}
                </p>
                <div className="flex justify-between text-gray-800 dark:text-gray-200 mb-4">
                  <p>Duration: {selectedRequest.courseId.courseHours} hours</p>
                  <p>Price: {selectedRequest.courseId.coursePrice} EGP</p>
                </div>
              </div>

              {/* What Will You Learn */}
              <div className="mb-6">
                <h3 className="dark:text-gray-400 text-lg font-semibold mb-2">
                  What will you Learn
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {selectedRequest.courseId.whatWillYouLearn.map(
                    (learn, index) => (
                      <p
                        key={index}
                        className="text-gray-700 dark:text-gray-300 p-2 rounded-md mt-2 shadow bg-gray-400 dark:bg-gray-900"
                      >
                        {learn.objective}
                      </p>
                    )
                  )}
                </div>
              </div>

              {/* Instructor Details */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <img
                  src={
                    selectedRequest.courseId.instructor.profilePicture
                      .secure_url
                  }
                  alt={selectedRequest.courseId.instructor.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Instructor Details
                  </h3>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {selectedRequest.courseId.instructor.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {selectedRequest.courseId.instructor.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Contact:{' '}
                    {selectedRequest.courseId.instructor.phone ||
                      'No contact info available.'}
                  </p>
                </div>
              </div>

              {/* Note for course purchase */}
              <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-md border border-yellow-300 dark:border-yellow-600">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Note: To purchase the course, please contact the instructor at
                  the phone number {selectedRequest.courseId.instructor.phone}.
                </p>
              </div>

              <button
                className="mt-6 bg-red-500 bg-opacity-50 dark:bg-red-600 dark:text-red-400 dark:bg-opacity-50 text-red-600 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-600 hover:bg-opacity-70"
                onClick={handleCloseDetails}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
