import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  courseInstructor,
  deleteCourse,
  filterCourses,
} from '../../../redux/courses/courses.slice';
import HeadSection from '../../../components/headSection/HeadSection';
import LoadingBetweenPage from '../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MyCourses() {
  const { isLoading, courseIns } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [showGrid, setShowGrid] = useState('grid');
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleGrid = (view) => {
    setShowGrid(view);
  };
  const [filterValues, setFilterValues] = useState({
    courseName: '',
    coursePrice: '',
  });
  async function deleteCourses(id) {
    const response = await dispatch(deleteCourse({ id }));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      dispatch(courseInstructor());
    } else {
      toast.error(response.payload.message);
    }
  }

  const handleFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleToggle = (id) => {
    setToggleMenu(toggleMenu === id ? null : id);
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(filterCourses(filterValues));
  };
  useEffect(() => {
    dispatch(courseInstructor());
  }, [dispatch]);
  /* -------------------------------- Pagination -------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(4);

  const totalPages = courseIns?.courses
    ? Math.ceil(courseIns.courses.length / parseInt(numberOfPages))
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
              ? 'bg-blue-700  text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 text-gray-800 dark:text-white rounded-md cursor-pointer'
          }  p-2 px-4 mx-1`}
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
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md dark:text-white"
            disabled={currentPage === 1 || !courseIns?.courses?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md dark:text-white"
            disabled={currentPage === totalPages || !courseIns?.courses?.length}
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
      <div className="max-w-screen-xl m-auto">
        <HeadSection
          to="/panel/mycourses"
          title="My Courses"
          subTitle="courses"
          link="My Courses"
        />
        <div className="mt-6 p-6 shadow-md rounded-md text-blue-800 dark:text-blue-500  font-bold bg-white dark:bg-gray-900 w-fit">
          Number of Courses: {courseIns?.numberCourses}
        </div>
        <div className="flex gap-3 pt-10 ">
          <button
            onClick={() => toggleGrid('list')}
            className={`p-2 text-white font-semibold rounded-md ${
              showGrid == 'list'
                ? 'bg-blue-700 dark:bg-blue-600'
                : 'bg-gray-700 dark:bg-gray-950'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => toggleGrid('grid')}
            className={`p-2 text-white font-semibold rounded-md ${
              showGrid == 'grid'
                ? 'bg-blue-700 dark:bg-blue-600'
                : 'bg-gray-700 dark:bg-gray-950'
            }`}
          >
            Grid View
          </button>
        </div>
        <form
          onSubmit={handleFilterSubmit}
          className="mt-5 flex gap-3 justify-start flex-wrap pb-10 px-10 md:px-0"
        >
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={filterValues.courseName}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
          <input
            type="text"
            name="coursePrice"
            placeholder=" Course Price"
            value={filterValues.coursePrice}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
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
        {showGrid === 'grid' ? (
          <div className={courseIns?.courses?.length > 0?"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-3 ":"w-full"}>
            {isLoading ? (
              <LoadingBetweenPage />
            ) : courseIns?.courses?.length > 0 ? (
              courseIns.courses.slice(start, end).map((item) => (
                <div
                  key={item._id}
                  className="shadow-md relative bg-white dark:bg-gray-900 overflow-hidden rounded-md w-full"
                >
                  <div>
                    <img
                      src={item.coursePicture.secure_url}
                      alt="category"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className=" text-gray-800 dark:text-white capitalize">
                      <p>{item.courseName.replace(/"/g, '')}</p>
                    </div>
                    <Link
                      to={`/panel/courseDetails/${item._id}`}
                      className="bg-blue-800  absolute top-0 right-0  m-2  p-2 px-4  rounded-md shadow-md text-white text-sm"
                    >
                      <i className="fa-solid fa-eye text-xl cursor-pointer hover:animate-bounce"></i>
                    </Link>
                    <span className="dark:text-gray-500 font-semibold text-sm ">
                      <span className="dark:text-white ">Instructor:</span>{' '}
                      {item.teachedBy}
                    </span>
                    
                    <p className="text-sm text-gray-500 font-semibold mt-3 line-clamp-4 overflow-hidden  text-ellipsis ">
                      {item?.courseDescription}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-gray-800 dark:text-white mt-2">
                        {Number(item.coursePrice) ? (
                          <p>{Number(item.coursePrice)}EGP</p>
                        ) : (
                          'free'
                        )}{' '}
                      </p>
                      <p className="text-gray-800 dark:text-white mt-2">
                        {Number(item.courseHours)}{' '}
                        <i className="fa-regular fa-clock"></i>
                      </p>
                    </div>
                    <div className="bg-purple-700 absolute top-0 left-0 p-3 text-white shadow-xl m-2 rounded-lg cursor-pointer">
                      <p
                        onClick={() => handleToggle(item._id)}
                        className="hover:animate-bounce"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </p>
                      {toggleMenu === item._id && (
                        <div className="absolute top-14 w-48   bg-gray-50 dark:bg-gray-900 shadow-md p-2 rounded-md">
                          <ul>
                            <li
                              onClick={() => deleteCourses(item._id)}
                              className="text-sm cursor-pointer rounded-md hover:bg-gray-100 p-2 dark:hover:bg-gray-600 dark:text-red-500 duration-300 transition text-red-700 font-bold"
                            >
                              Delete Course
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-600 dark:text-lime-500 text-lime-700 font-bold duration-300 transition">
                              <Link
                                to={`/panel/updateCourse?courseId=${
                                  item._id
                                }&courseName=${encodeURIComponent(
                                  item.courseName
                                )}&coursePrice=${encodeURIComponent(
                                  item.coursePrice
                                )}&courseHours=${encodeURIComponent(
                                  item.courseHours
                                )}&courseDescription=${encodeURIComponent(
                                  item.courseDescription
                                )}&teachedBy=${encodeURIComponent(
                                  item.teachedBy
                                )}`}
                              >
                                Edit Course
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-600 dark:text-yellow-500 text-yellow-700 font-bold duration-300 transition">
                              <Link
                                to={`/panel/addVideo?courseId=${
                                  item._id
                                }&descriptionContent=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionContent
                                  )
                                )}&descriptionId=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionId
                                  )
                                )}&url=${item.accesibleByAnyOne.videoUrl.map(
                                  (vid) => vid.url
                                )}&urlId=${encodeURIComponent(
                                  item.accesibleByAnyOne.videoUrl.map(
                                    (vid) => vid.urlId
                                  )
                                )}`}
                              >
                                Add video Intro
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-600 dark:text-purple-500 text-purple-700 font-bold duration-300 transition">
                              <Link
                                to={`/panel/updateVideo?courseId=${
                                  item._id
                                }&descriptionContent=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionContent
                                  )
                                )}&descriptionId=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionId
                                  )
                                )}&url=${item.accesibleByAnyOne.videoUrl.map(
                                  (vid) => vid.url
                                )}&urlId=${encodeURIComponent(
                                  item.accesibleByAnyOne.videoUrl.map(
                                    (vid) => vid.urlId
                                  )
                                )}`}
                              >
                                Edit video Intro
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-600 dark:text-teal-500 text-teal-700 font-bold duration-300 transition">
                              <Link
                                to={`/panel/DeleteAccesible?courseId=${
                                  item._id
                                }&descriptionContent=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionContent
                                  )
                                )}&descriptionId=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionId
                                  )
                                )}&url=${item.accesibleByAnyOne.videoUrl.map(
                                  (vid) => vid.url
                                )}&urlId=${encodeURIComponent(
                                  item.accesibleByAnyOne.videoUrl.map(
                                    (vid) => vid.urlId
                                  )
                                )}`}
                              >
                                Delete video Intro
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-600 dark:text-sky-500 text-skey-700 font-bold duration-300 transition">
                              <Link
                                to={`/panel/addwhatyouLearn?courseId=${item._id}`}
                              >
                                Add objective
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-600 dark:text-orange-500 text-orange-700 font-bold duration-300 transition">
                              <Link
                                to={`/panel/updatewhatyouLearn?courseId=${
                                  item._id
                                }&objective=${encodeURIComponent(
                                  item.whatWillYouLearn.map(
                                    (item) => item.objective
                                  )
                                )}&learnId=${encodeURIComponent(
                                  item.whatWillYouLearn.map((item) => item.id)
                                )}`}
                              >
                                Edit objective
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-600 dark:text-red-500 text-red-700 font-bold duration-300 transition">
                              <Link
                                to={`/panel/deletewhatyouLearn?courseId=${
                                  item._id
                                }&objective=${encodeURIComponent(
                                  item.whatWillYouLearn.map(
                                    (item) => item.objective
                                  )
                                )}&learnId=${encodeURIComponent(
                                  item.whatWillYouLearn.map((item) => item.id)
                                )}`}
                              >
                                Delete objective
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <Link
                        to={`/panel/addSection?courseId=${item._id}`}
                        className="bg-blue-800 dark:hover:text-white cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white text-sm"
                      >
                        Add Section
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-900 p-10 rounded-md shadow-md m-auto text-center">
                <p>There are no courses currently available</p>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left rtl:text-right dark:bg-gray-800 dark:text-gray-200">
              <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Course Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    instructor
                  </th>
                  
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    hours
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <LoadingBetweenPage />
                ) : courseIns?.courses?.length > 0 ? (
                  courseIns.courses.slice(start, end).map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white   dark:bg-gray-900   dark:hover:bg-gray-600 hover:bg-gray-50 relative"
                    >
                      <td className="px-6 py-4">
                        <Link to={`/panel/courseDetails/${item._id}`}>
                          <img
                            src={item.coursePicture.secure_url}
                            alt="category"
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4">{item.courseName}</td>
                      <td className="px-6 py-4">{item.teachedBy}</td>
                      
                      <td className="px-6 py-4">{item.coursePrice} EGP</td>
                      <td className="px-6 py-4">
                        {item.courseHours}{' '}
                        <i className="fa-regular fa-clock"></i>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <i
                          onClick={() => handleToggle(item._id)}
                          className="fa-solid fa-ellipsis-vertical bg-gray-100 dark:bg-gray-800 py-3 px-4 rounded-md shadow-md cursor-pointer"
                        ></i>
                        <Link to={`/panel/courseDetails/${item._id}`}>
                          <i className="fa-solid fa-eye  cursor-pointer hover:animate-bounce bg-gray-100 dark:bg-gray-800 py-3 px-4 rounded-md shadow-md "></i>
                        </Link>
                      </td>

                      {toggleMenu === item._id && (
                        <div className="absolute right-32 top-10 z-20  dark:bg-gray-800   bg-gray-50 shadow-md p-2 rounded-md">
                          <ul>
                            <li
                              onClick={() => deleteCourses(item._id)}
                              className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-red-500 text-red-700 font-bold"
                            >
                              Delete Course
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 rounded-md  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-lime-500 text-lime-800 font-bold">
                              <Link
                                to={`/panel/updateCourse?courseId=${
                                  item._id
                                }&courseName=${encodeURIComponent(
                                  item.courseName
                                )}&coursePrice=${encodeURIComponent(
                                  item.coursePrice
                                )}&courseHours=${encodeURIComponent(
                                  item.courseHours
                                )}&courseDescription=${encodeURIComponent(
                                  item.courseDescription
                                )}&teachedBy=${encodeURIComponent(
                                  item.teachedBy
                                )}`}
                              >
                                Edit Course
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 rounded-md  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-yellow-500 text-yellow-800 font-bold">
                              <Link
                                to={`/panel/addVideo?courseId=${
                                  item._id
                                }&descriptionContent=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionContent
                                  )
                                )}&descriptionId=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionId
                                  )
                                )}&url=${item.accesibleByAnyOne.videoUrl.map(
                                  (vid) => vid.url
                                )}&urlId=${encodeURIComponent(
                                  item.accesibleByAnyOne.videoUrl.map(
                                    (vid) => vid.urlId
                                  )
                                )}`}
                              >
                                Add video Intro
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 rounded-md  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-purple-500 text-purple-800 font-bold">
                              <Link
                                to={`/panel/updateVideo?courseId=${
                                  item._id
                                }&descriptionContent=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionContent
                                  )
                                )}&descriptionId=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionId
                                  )
                                )}&url=${item.accesibleByAnyOne.videoUrl.map(
                                  (vid) => vid.url
                                )}&urlId=${encodeURIComponent(
                                  item.accesibleByAnyOne.videoUrl.map(
                                    (vid) => vid.urlId
                                  )
                                )}`}
                              >
                                Edit video Intro
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 rounded-md  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-teal-500 text-teal-800 font-bold">
                              <Link
                                to={`/panel/DeleteAccesible?courseId=${
                                  item._id
                                }&descriptionContent=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionContent
                                  )
                                )}&descriptionId=${encodeURIComponent(
                                  item.accesibleByAnyOne.describtion.map(
                                    (des) => des.describtionId
                                  )
                                )}&url=${item.accesibleByAnyOne.videoUrl.map(
                                  (vid) => vid.url
                                )}&urlId=${encodeURIComponent(
                                  item.accesibleByAnyOne.videoUrl.map(
                                    (vid) => vid.urlId
                                  )
                                )}`}
                              >
                                Delete video Intro
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 rounded-md  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-sky-500 text-sky-800 font-bold">
                              <Link
                                to={`/panel/addwhatyouLearn?courseId=${item._id}`}
                              >
                                Add objective
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 rounded-md  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-green-500 text-green-800 font-bold">
                              <Link
                                to={`/panel/updatewhatyouLearn?courseId=${
                                  item._id
                                }&objective=${encodeURIComponent(
                                  item.whatWillYouLearn.map(
                                    (item) => item.objective
                                  )
                                )}&learnId=${encodeURIComponent(
                                  item.whatWillYouLearn.map((item) => item.id)
                                )}`}
                              >
                                Edit objective
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100 rounded-md  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-rose-500 text-rose-800 font-bold">
                              <Link
                                to={`/panel/deletewhatyouLearn?courseId=${
                                  item._id
                                }&objective=${encodeURIComponent(
                                  item.whatWillYouLearn.map(
                                    (item) => item.objective
                                  )
                                )}&learnId=${encodeURIComponent(
                                  item.whatWillYouLearn.map((item) => item.id)
                                )}`}
                              >
                                Delete objective
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className=" bg-white  dark:bg-gray-900 p-10 text-center rounded-md shadow-md m-auto"
                    >
                      There are no courses currently available
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
          <span className="me-2 dark:text-white">Show:</span>
          <select
            onChange={(e) => setNumberOfPages(e.target.value)}
            className=" shadow-md border-0 focus:ring-0 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-white p-3 "
            style={{ width: '130px' }}
          >
            <option value="4">4 Rows</option>
            <option value="12">12 Rows</option>
            <option value="20">20 Rows</option>
            <option value="50">50 Rows</option>
          </select>
        </div>
        {renderPagination()}
      </div>
    </>
  );
}
