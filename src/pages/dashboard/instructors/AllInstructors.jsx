import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allInstructors,
  filterInstructor,
} from '../../../redux/instructor/instructorSlice';
import HeadSection from '../../../components/headSection/HeadSection';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { Link } from 'react-router-dom';
import man from '../../../assets/man.png';
import StopModel from '../../../components/stopModel/StopModel';
import PayModel from '../../../components/payModal/PayModel';
import EvaluateFinalRequest from '../../../components/EvaluateFinalRequest/EvaluateFinalRequest';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function AllInstructors() {
  const { isLoading, allIns } = useSelector((state) => state.instructor);
  const [openModal, setOpenModal] = useState(false);
  const [openModalPaying, setOpenModalPaying] = useState(false);
  const [openModalEv, setOpenModalEv] = useState(false);
  const dispatch = useDispatch();
  const [activeInsId, setActiveInsId] = useState(null);
  const [showGrid, setShowGrid] = useState('grid');
  const [employeeModel, setEmployeeModel] = useState(null);
  const [filterValues, setFilterValues] = useState({
    name: '',
    email: '',
    phone: '',
    stoppedBySuperAdmin: '',
    payState: '',
    role: 'instructor',
  });

  useEffect(() => {
    dispatch(allInstructors());
  }, [dispatch]);

  const toggleGrid = (view) => {
    setShowGrid(view);
  };

  const handleToggle = (id) => {
    setActiveInsId(activeInsId === id ? null : id);
  };

  function handleFilterChange(e) {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    dispatch(filterInstructor(filterValues));
  }
  function handleShowModel(data) {
    setEmployeeModel(data);
  }
  function handleHiddenModel() {
    setEmployeeModel(null);
  }
  /* -------------------------------- Pagination-------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(4);

  const totalPages = allIns?.employees
    ? Math.ceil(allIns?.employees.length / parseInt(numberOfPages))
    : 1;

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * parseInt(numberOfPages);
  const end = start + parseInt(numberOfPages);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          className={` ${
            currentPage === i
              ? 'bg-blue-700 text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 text-black rounded-md cursor-pointer'
          } p-2 px-4 mx-1`}
          key={i}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800  cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !allIns?.employees?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !allIns.employees?.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Instructors</title>
        <meta name="description" content="Instructors page" />
        <meta name="keywords" content="Instructors, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto ">
        <HeadSection
          title="All instructors"
          subTitle="instructors"
          link="All instructors"
        />
        <div>
          <div className="flex gap-3 justify-between flex-wrap mt-5">
            <div className="flex gap-3">
              <button
                onClick={() => toggleGrid('list')}
                className={
                  showGrid == 'list'
                    ? `bg-blue-700 p-2 text-white font-semibold rounded-md dark:bg-blue-600`
                    : 'bg-gray-700 p-2 text-white font-semibold rounded-md dark:bg-gray-950'
                }
              >
                List View
              </button>
              <button
                onClick={() => toggleGrid('grid')}
                className={
                  showGrid == 'grid'
                    ? `bg-blue-700 p-2 text-white font-semibold rounded-md dark:bg-blue-600`
                    : 'bg-gray-700 p-2 text-white font-semibold rounded-md dark:bg-gray-950'
                }
              >
                Grid View
              </button>
            </div>
            <Link
              to="/panel/addInstructor"
              className="bg-blue-700 p-2 text-white font-semibold rounded-md hover:bg-transparent dark:hover:text-white hover:text-blue-950 hover:outline-double hover:outline-blue-900 duration-300 transition"
            >
              Add Instructor
            </Link>
          </div>
          <form
            onSubmit={handleFilterSubmit}
            className="mt-5 flex gap-3 justify-start flex-wrap"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filterValues.name}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={filterValues.email}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={filterValues.phone}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
            <select
              name="stoppedBySuperAdmin"
              value={filterValues.stoppedBySuperAdmin}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="" disabled>
                Status
              </option>
              <option value="true">Stopped</option>
              <option value="false">Active</option>
            </select>
            <select
              name="payState"
              value={filterValues.payState}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="" disabled>
                Paying
              </option>
              <option value="true">Paid</option>
              <option value="false">Un Paid</option>
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
          <div className="flex flex-wrap w-full gap-5 mt-10 container m-auto">
            {showGrid === 'grid' ? (
              isLoading ? (
                <LoadingBetweenPage />
              ) : allIns && allIns?.employees?.length > 0 ? (
                <>
                  {allIns?.employees.slice(start, end).map((mng) => (
                    <div
                      key={mng._id}
                      className="relative w-full bg-white dark:bg-gray-900 p-5 shadow-md rounded-md md:w-[calc((100%/2)-1.25rem)] lg:w-[calc((100%/3)-1.25rem)] "
                    >
                      <div className="w-14 h-14 bg-gray-300 dark:bg-gray-800 rounded-full m-auto">
                        <img
                          className="w-14 h-14 rounded-full p-1"
                          src={
                            mng?.profilePicture.secure_url
                              ? mng.profilePicture.secure_url
                              : man
                          }
                          alt="instructor"
                        />
                      </div>
                      <div className="text-center mt-2">
                        <h3 className="text-gray-800 dark:text-gray-200">
                          {mng?.name}
                        </h3>
                      </div>
                      <div className="mt-3 divide-y py-2">
                        <p>
                          <span className="text-sm text-blue-600  font-semibold">
                            Phone:{' '}
                          </span>
                          <span className="font-bold text-sm dark:text-gray-200">
                            {mng?.phone}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm text-blue-600 font-semibold">
                            Email:{' '}
                          </span>
                          <span className="font-bold text-sm dark:text-gray-200">
                            {mng?.email}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm text-blue-600 font-semibold">
                            Address:{' '}
                          </span>
                          <span className="font-bold text-sm dark:text-gray-200">
                            {mng?.address}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm text-blue-600 font-semibold">
                            Job:{' '}
                          </span>
                          <span className="font-bold text-sm dark:text-gray-200">
                            {mng?.job}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm text-blue-600 font-semibold">
                            Role:{' '}
                          </span>
                          <span className="font-bold text-sm dark:text-gray-200">
                            {mng?.role}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm text-blue-600 font-semibold">
                            Status Employee:{' '}
                          </span>
                          <span className="font-bold text-sm dark:text-gray-200">
                            {mng?.stoppedBySuperAdmin ? (
                              <span className="text-red-600">Stopped</span>
                            ) : (
                              <span className="text-green-800 dark:text-green-400">
                                Active
                              </span>
                            )}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm text-blue-600 font-semibold">
                            Email Status:{' '}
                          </span>
                          <span className="font-bold text-sm dark:text-gray-200">
                            {mng?.isActivated ? (
                              <span className="text-green-400">Activated</span>
                            ) : (
                              <span className="text-red-600">
                                Not Activated
                              </span>
                            )}
                          </span>
                        </p>
                      </div>
                      <i
                        className="fa-solid fa-ellipsis px-2 py-1 rounded-md shadow-md absolute top-3 bg-gray-100 dark:bg-gray-800  right-3  text-2xl cursor-pointer text-gray-600 dark:text-white"
                        onClick={() => handleToggle(mng._id)}
                      ></i>
                      {activeInsId === mng._id && (
                        <div className="absolute top-10 right-5 bg-gray-50 dark:bg-gray-700 shadow-md p-2 rounded-md">
                          <ul>
                            <li
                              onClick={() => handleShowModel(mng)}
                              className="text-sm cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 p-2"
                            >
                              <i className="fa-solid fa-eye text-orange-600 dark:text-orange-500"></i>{' '}
                              show instructor Details
                            </li>
                            <li
                              onClick={() => setOpenModal(true)}
                              className="text-sm cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 p-2"
                            >
                              <i className="fa-solid fa-user-slash text-blue-700 dark:text-blue-600"></i>{' '}
                              Stop Ins
                            </li>
                            <li
                              onClick={() => setOpenModalPaying(true)}
                              className="text-sm cursor-pointer rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 p-2"
                            >
                              <i className="fa-solid fa-money-check-dollar text-green-700 dark:text-green-400"></i>{' '}
                              Paying
                            </li>
                            <li
                              onClick={() => setOpenModalEv(true)}
                              className="text-sm cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 p-2"
                            >
                              <i className="fa-solid fa-edit text-cyan-800 dark:text-cyan-600"></i>{' '}
                              Evaluate Ins
                            </li>
                          </ul>
                          {openModal && (
                            <StopModel
                              id={mng._id}
                              show={openModal}
                              close={() => setOpenModal(false)}
                            />
                          )}
                          {openModalPaying && (
                            <PayModel
                              id={mng._id}
                              show={openModalPaying}
                              close={() => setOpenModalPaying(false)}
                            />
                          )}
                          {openModalEv && (
                            <EvaluateFinalRequest
                              id={mng._id}
                              show={openModalEv}
                              close={() => setOpenModalEv(false)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-10 rounded-md shadow-md m-auto">
                  <p className="text-gray-800 dark:text-gray-200">
                    There are no instructors currently available
                  </p>
                </div>
              )
            ) : (
              <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left rtl:text-right dark:bg-gray-800 dark:text-gray-200">
                  <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Photo
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Job
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="9">
                          <LoadingBetweenPage />
                        </td>
                      </tr>
                    ) : allIns && allIns?.employees?.length > 0 ? (
                      <>
                        {allIns?.employees.slice(start, end).map((mng) => (
                          <tr
                            key={mng._id}
                            className="bg-white dark:bg-gray-900  hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="px-6 py-4">
                              <div className="w-14 h-14 bg-gray-300 dark:bg-gray-800 rounded-full m-auto">
                                <img
                                  className="w-14 h-14 rounded-full p-1"
                                  src={
                                    mng?.profilePicture.secure_url
                                      ? mng.profilePicture.secure_url
                                      : man
                                  }
                                  alt="instructor"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 font-bold">{mng?.name}</td>
                            <td className="px-6 py-4">{mng?.phone}</td>
                            <td className="px-6 py-4">{mng?.email}</td>
                            <td className="px-6 py-4">{mng?.address}</td>
                            <td className="px-6 py-4">{mng?.job}</td>
                            <td className="px-6 py-4">{mng?.role}</td>
                            <td className="px-6 py-4">
                              {mng?.stoppedBySuperAdmin ? (
                                <span className="text-green-500">Stopped</span>
                              ) : (
                                <span className="text-green-600 dark:text-green-400">
                                  Active
                                </span>
                              )}
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <i
                                  className="fa-solid fa-ellipsis text-xl m-auto text-gray-800 dark:text-gray-100 cursor-pointer"
                                  onClick={() => handleToggle(mng._id)}
                                ></i>
                                {activeInsId === mng._id && (
                                  <div className="bg-gray-50  dark:bg-gray-700 shadow-md p-2 rounded-md ">
                                    <ul>
                                      <li
                                        onClick={() => handleShowModel(mng)}
                                        className="text-sm cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 p-2"
                                      >
                                        <i className="fa-solid fa-eye text-orange-600 dark:text-orange-500"></i>{' '}
                                        Details
                                      </li>
                                      <li
                                        onClick={() => setOpenModal(true)}
                                        className="text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2"
                                      >
                                        <i className="fa-solid fa-user-slash text-blue-700"></i>{' '}
                                        Stop Ins
                                      </li>
                                      <li
                                        onClick={() => setOpenModalPaying(true)}
                                        className="text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2"
                                      >
                                        <i className="fa-solid fa-money-check-dollar text-green-700"></i>{' '}
                                        Paying
                                      </li>
                                      <li
                                        onClick={() => setOpenModalEv(true)}
                                        className="text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2"
                                      >
                                        <i className="fa-solid fa-edit text-cyan-800"></i>{' '}
                                        Evaluate Ins
                                      </li>
                                    </ul>
                                    {openModal && (
                                      <StopModel
                                        id={mng._id}
                                        show={openModal}
                                        close={() => setOpenModal(false)}
                                      />
                                    )}
                                    {openModalPaying && (
                                      <PayModel
                                        id={mng._id}
                                        show={openModalPaying}
                                        close={() => setOpenModalPaying(false)}
                                      />
                                    )}
                                    {openModalEv && (
                                      <EvaluateFinalRequest
                                        id={mng._id}
                                        show={openModalEv}
                                        close={() => setOpenModalEv(false)}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="bg-white dark:bg-gray-800 p-10 text-gray-800 dark:text-gray-200 text-center"
                        >
                          There are no instructors currently available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex  items-center justify-center  my-10 gap-10 ">
            <div className="flex items-center">
              <span className=" me-2 dark:text-white">Show:</span>
              <select
                onChange={(e) => setNumberOfPages(e.target.value)}
                className=" shadow-md border-0 focus:ring-0 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-white p-3"
                style={{ width: '130px' }}
              >
                <option value="6">6 Rows</option>
                <option value="12">12 Rows</option>
                <option value="20">20 Rows</option>
                <option value="50">50 Rows</option>
              </select>
            </div>
            {renderPagination()}
          </div>
        </div>

        {employeeModel && (
          <div className="fixed inset-0 overflow-y-scroll  bg-gray-400 bg-opacity-50 dark:bg-black dark:bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white  dark:bg-gray-900 rounded-lg shadow-lg grid grid-cols-6 max-w-screen-lg ">
              {/* Left Section (CV and Image) */}
              <a
                href={employeeModel.profileResume.secure_url}
                title="show cv"
                target="_blank"
                className=" col-span-6 md:col-span-3 p-6 flex flex-col items-center"
              >
                <h1 className="text-2xl font-semibold dark:text-white mb-4">
                  CV - {employeeModel.name}
                </h1>
                <img
                  src={employeeModel.profileResume.secure_url}
                  className="rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 p-3 max-w-full"
                  alt={`instructor-${employeeModel.name}`}
                />
              </a>

              {/* Right Section (Details) */}
              <div className=" col-span-6 md:col-span-3 p-6 relative">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden">
                    <img
                      src={employeeModel.profilePicture.secure_url}
                      className="w-full h-full object-cover"
                      alt={`instructor-${employeeModel.name}`}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-center md:text-start dark:text-white">
                      {employeeModel.name}
                    </p>
                    <p className="text-sm text-gray-800 text-center md:text-start dark:text-gray-400">
                      {employeeModel.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-center md:text-start">
                  <p className="dark:text-gray-400 text-gray-700">
                    <strong>Phone:</strong> {employeeModel.phone}
                  </p>
                  <p className="dark:text-gray-400 text-gray-700">
                    <strong>Address:</strong> {employeeModel.address}
                  </p>
                  <p className="dark:text-gray-400 text-gray-700">
                    <strong>Job:</strong> {employeeModel.job}
                  </p>
                </div>

                <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mt-4 text-center">
                  <p className="dark:text-gray-300 text-gray-700">
                    {employeeModel.introductionPerson}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="dark:text-gray-400 text-gray-700">
                    <strong>Pay Status:</strong>
                    {employeeModel.payState ? (
                      <span className="ml-2 px-3 py-1 bg-teal-500 text-white rounded-full text-sm">
                        Paid
                      </span>
                    ) : (
                      <span className="ml-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                        Unpaid
                      </span>
                    )}
                  </p>

                  <p className="dark:text-gray-400 text-gray-700">
                    <strong>Status:</strong>
                    {!employeeModel.stoppedBySuperAdmin ? (
                      <span className="ml-2 px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="ml-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                        Stopped
                      </span>
                    )}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleHiddenModel}
                  className="absolute top-0 right-0 m-4 bg-red-700 bg-opacity-50 dark:bg-red-700 dark:bg-opacity-50 h-8 w-8 rounded-full text-red-700 hover:text-red-600 dark:text-red-600 dark:hover:text-red-700"
                >
                  <i className="fa-solid fa-x text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
