import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RequestsEmp,
  RequestsEmpFilter,
} from '../../../redux/instructor/instructorSlice';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import StopModel from '../../../components/stopModel/StopModel';
import HeadSection from '../../../components/headSection/HeadSection';
import { TextInput } from 'flowbite-react';
import man from '../../../assets/man.png';
import EvaluteRequest from '../../../components/EveluateRequestModal/EvaluteRequest';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function Requests() {
  const { isLoading, requests } = useSelector((state) => state.instructor);
  const [showGrid, setShowGrid] = useState('grid');
  const [activeInsId, setActiveInsId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '',
    state: '',
    date: '',
  });

  const handleToggle = (id) => {
    setActiveInsId(activeInsId === id ? null : id);
  };

  const toggleGrid = (view) => {
    setShowGrid(view);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RequestsEmp());
  }, [dispatch]);

  function handleFilterChange(e) {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    dispatch(RequestsEmpFilter(filterValues));
  }

  /* -------------------------------- Pagination -------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(6);
  const totalPages = Math.ceil(
    (requests?.requests?.length || 0) / parseInt(numberOfPages)
  );

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
          className={` ${currentPage === i ? '' : ''} p-2 px-4 mx-1`}
          key={i}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className={` m-0 p-0 list-unstyled flex`}>
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || requests?.requests?.length === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={
              currentPage === totalPages || requests?.requests?.length === 0
            }
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
        <title>Requests</title>
        <meta name="description" content="Request page" />
        <meta name="keywords" content="Request, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="container m-auto">
        <HeadSection
          to="/panel/requests"
          title="All Requests"
          subTitle="Requests"
          link="All Requests"
        />
        <div className="flex gap-3 mt-5">
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
        <form
          onSubmit={handleFilterSubmit}
          className="mt-5 flex gap-3 justify-start flex-wrap"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filterValues?.name}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
          <TextInput
            type="date"
            name="date"
            placeholder="Date"
            value={filterValues?.date}
            onChange={handleFilterChange}
          />
          <select
            name="state"
            value={filterValues?.state}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
            <option value="" disabled>
              State
            </option>
            <option value="underRevising">Under Revising</option>
            <option value="notInQueue">Not InQueue</option>
            <option value="initiallyAccepted">Initially Accepted</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
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
            ) : requests &&
              requests.requests &&
              requests.requests.length > 0 ? (
              requests.requests.slice(start, end).map((req) => (
                <div
                  key={req._id}
                  className="relative w-full bg-white dark:bg-gray-900 p-5 shadow-md rounded-md md:w-[calc((100%/2)-1.25rem)] lg:w-[calc((100%/3)-1.25rem)]"
                >
                  <div className="w-14 h-14 bg-gray-300 dark:bg-gray-800 rounded-full m-auto">
                    <img
                      className="w-14 h-14 rounded-full p-1"
                      src={req?.profilePicture?.secure_url || man}
                      alt="request"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="text-gray-800 dark:text-gray-200">
                      {req?.name}
                    </h3>
                  </div>
                  <div className="mt-3 divide-y py-2">
                    <p>
                      <span className="text-sm text-blue-800 font-semibold">
                        Phone:{' '}
                      </span>
                      <span className="font-bold text-sm">{req?.phone}</span>
                    </p>
                    <p>
                      <span className="text-sm text-blue-800 font-semibold">
                        Email:{' '}
                      </span>
                      <span className="font-bold text-sm">{req?.email}</span>
                    </p>
                    <p>
                      <span className="text-sm text-blue-800 font-semibold">
                        Address:{' '}
                      </span>
                      <span className="font-bold text-sm">{req?.address}</span>
                    </p>
                    <p>
                      <span className="text-sm text-blue-800 font-semibold">
                        Job:{' '}
                      </span>
                      <span className="font-bold text-sm">{req?.job}</span>
                    </p>
                    <p>
                      <span className="text-sm text-blue-800 font-semibold">
                        Role:{' '}
                      </span>
                      <span className="font-bold text-sm">{req?.role}</span>
                    </p>
                    <p>
                      <span className="text-sm text-blue-800 font-semibold">
                        Subjects:{' '}
                      </span>
                      <span className="font-bold text-sm">{req?.subjects}</span>
                    </p>
                    <p>
                      <span className="text-sm text-blue-800 font-semibold">
                        State:{' '}
                      </span>
                      <span className="font-bold text-sm">
                        {req.state === 'underRevising'
                          ? 'Under Revising'
                          : req.state === 'notInQueue'
                          ? 'Not InQueue'
                          : req.state === 'initiallyAccepted'
                          ? 'Initially Accepted'
                          : req.state === 'accepted'
                          ? 'Accepted'
                          : req.state === 'rejected'
                          ? 'Rejected'
                          : ''}
                      </span>
                    </p>
                  </div>
                  <i
                    className="fa-solid fa-ellipsis px-2 py-1 rounded-md shadow-md absolute top-3 bg-gray-100 dark:bg-gray-800  right-3  text-2xl cursor-pointer text-gray-600 dark:text-white"
                    onClick={() => handleToggle(req._id)}
                  ></i>
                  {activeInsId === req._id && (
                    <div className="absolute top-10 right-5 bg-gray-50 dark:bg-gray-700 shadow-md p-2 rounded-md">
                      <ul>
                        <li
                          onClick={() => setOpenModal(true)}
                          className="text-sm cursor-pointer hover:bg-gray-100 p-2"
                        >
                          <i className="fa-solid fa-edit text-blue-700"></i>{' '}
                          Evaluate Request
                        </li>
                      </ul>
                      {openModal && (
                        <EvaluteRequest
                          id={req._id}
                          show={openModal}
                          close={() => setOpenModal(false)}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 p-10 rounded-md shadow-md m-auto">
                <p className="text-gray-800 dark:text-gray-200">
                  There are no Requests currently available
                </p>
              </div>
            )
          ) : (
            <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
              <table className="w-full text-sm text-left rtl:text-right dark:bg-gray-800 dark:text-gray-200">
                <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-200">
                  <tr>
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
                      Subjects
                    </th>
                    <th scope="col" className="px-6 py-3">
                      State
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <LoadingBetweenPage />
                  ) : requests &&
                    requests.requests &&
                    requests.requests.length > 0 ? (
                    requests.requests.slice(start, end).map((req) => (
                      <tr
                        key={req._id}
                        className="bg-white dark:bg-gray-900  hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-3">{req?.name}</td>
                        <td className="px-6 py-3">{req?.phone}</td>
                        <td className="px-6 py-3">{req?.email}</td>
                        <td className="px-6 py-3">{req?.address}</td>
                        <td className="px-6 py-3">{req?.job}</td>
                        <td className="px-6 py-3">{req?.role}</td>
                        <td className="px-6 py-3">{req?.subjects}</td>
                        <td className="px-6 py-3">
                          {req.state === 'underRevising'
                            ? 'Under Revising'
                            : req.state === 'notInQueue'
                            ? 'Not InQueue'
                            : req.state === 'initiallyAccepted'
                            ? 'Initially Accepted'
                            : req.state === 'accepted'
                            ? 'Accepted'
                            : req.state === 'rejected'
                            ? 'Rejected'
                            : ''}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleToggle(req._id)}
                          >
                            Edit
                          </button>
                        </td>
                        {activeInsId === req._id && (
                          <div className=" absolute top-0 right-32  bg-gray-50 shadow-md p-2 rounded-md">
                            <ul>
                              <li
                                onClick={() => setOpenModal(true)}
                                className="text-sm cursor-pointer hover:bg-gray-100 p-2"
                              >
                                <i className="fa-solid fa-edit text-blue-700"></i>{' '}
                                Evalute Request
                              </li>
                            </ul>
                            {openModal && (
                              <EvaluteRequest
                                id={req._id}
                                show={openModal}
                                close={() => setOpenModal(false)}
                              />
                            )}
                          </div>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white dark:bg-gray-800 p-10 text-gray-800 dark:text-gray-200 text-center">
                      <td colSpan={9} className="p-4">
                        There are no Requests currently available
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
      {openModal && <StopModel setOpenModal={setOpenModal} />}
    </>
  );
}
