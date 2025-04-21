import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterPurcaseCourseIns,
  purcaseCourseIns,
} from '../../../redux/instructor/instructorSlice';
import HeadSection from '../../../components/headSection/HeadSection';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import PurcaseModel from '../../../components/purcaseModel/PurcaseModel';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function Purcase() {
  const { isLoading, purcase } = useSelector((state) => state.instructor);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    userName: '',
    state: '',
  });
  const dispatch = useDispatch();
  const [showPurcaeModel, setShowPurcaseModel] = useState(null);
  useEffect(() => {
    dispatch(purcaseCourseIns());
  }, [dispatch]);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <LoadingBetweenPage />
      </div>
    );
  }
  const handleShowPurcaseModel = (id) => {
    setShowPurcaseModel(id);
  };

  const handleClosePurcaseModel = () => {
    setShowPurcaseModel(null);
  };
  const handleFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();

    dispatch(filterPurcaseCourseIns(filterValues));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Purcase</title>
        <meta name="description" content="Purcase page" />
        <meta name="keywords" content="Purcase , elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto px-4">
        <HeadSection
          title="All Purchases"
          subTitle="Purchase"
          link="All Purchases"
        />
        <form
          onSubmit={handleFilterSubmit}
          className="mt-5 flex gap-3 justify-start flex-wrap"
        >
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={filterValues.userName}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
          />
          <select
            name="state"
            value={filterValues.state}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="" disabled>
              state
            </option>
            <option value="payed">paid</option>
            <option value="noActionTaken">No Action Taken</option>
            <option value="notSeenYet">Not Seen Yet</option>
            <option value="notPayed">unpaud</option>
            <option value="rejectedRequest">Rejected Request</option>
            <option value="paused">paused</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 p-2 text-white font-semibold rounded-md"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse text-lg"></i>
            ) : (
              'Filter'
            )}
          </button>
        </form>
        {purcase?.requests?.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {purcase?.requests?.map((request) => (
              <div
                key={request._id}
                className="border relative rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={request.subscribeId.profilePicture.secure_url}
                    alt={`${request.subscribeId.userName}'s profile`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold dark:text-white">
                      {request.subscribeId.userName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {request.subscribeId.userEmail}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Phone: {request.subscribeId.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <img
                    src={request.courseId.coursePicture.secure_url}
                    alt={`${request.courseId.courseName} cover`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                    {request.courseId.courseName}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {request.courseId.courseDescription}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hours: {request.courseId.courseHours}h
                    </p>
                    <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                      {request.courseId.coursePrice} EGP
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Instructor: {request.courseId.teachedBy}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {request.state === 'noActionTaken' && (
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        request.state === 'noActionTaken' &&
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-900'
                      }`}
                    >
                      {request.state === 'noActionTaken' && 'No Action Taken'}
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
                  <button
                    className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => handleViewDetails(request)}
                  >
                    View Details
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Date of Purchase:{' '}
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
                <div
                  onClick={() => handleShowPurcaseModel(request._id)}
                  className="absolute bg-gray-200 dark:bg-gray-900 rounded-md shadow-md cursor-pointer p-2 px-5 top-3 right-3"
                >
                  <i className="fa-solid dark:text-white fa-ellipsis-vertical"></i>
                </div>

                {showPurcaeModel === request._id && (
                  <PurcaseModel
                    course={request.courseId.courseName}
                    id={request._id}
                    show={true}
                    close={handleClosePurcaseModel}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center  w-full py-20">
            <p className="text-gray-950 text-center dark:text-gray-400">
              No Purcases Now
            </p>
          </div>
        )}

        {isModalOpen && selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Purchase Details
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Course Name: {selectedRequest.courseId.courseName}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Price: {selectedRequest.courseId.coursePrice} EGP
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Instructor: {selectedRequest.courseId.teachedBy}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Purchased By: {selectedRequest.subscribeId.userName}
              </p>
              <p className="text-sm text-rose-600 dark:text-rose-400">
                Email: {selectedRequest.subscribeId.userEmail}
              </p>
              <p className="text-sm text-lime-600 dark:text-lime-400">
                Phone: {selectedRequest.subscribeId.phoneNumber}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Date of Purchase:{' '}
                {new Date(selectedRequest.createdAt).toLocaleDateString()}
              </p>
              <button
                className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded mt-4 hover:bg-red-700 transition"
                onClick={handleCloseModal}
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
