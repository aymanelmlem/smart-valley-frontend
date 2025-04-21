import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allCategories,
  deleteCategory,
  filterCategories,
  updateCategoryName,
  updateSupCategory,
} from '../../../../redux/category/category.slice';
import { Link } from 'react-router-dom';
import LoadingBetweenPage from '../../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import HeadSection from '../../../../components/headSection/HeadSection';

import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';

export default function MyCategories() {
  const { isLoading, allCtg } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [showGrid, setShowGrid] = useState('grid');
  const [inputValue, setInputValue] = useState({ categoryName: '' });
  const [subInputValue, setSubInputValue] = useState({ subCategory: [] });

  const [toggeleInput, setToggleInput] = useState({
    categoryInput: false,
    supcategory: false,
  });

  let data = '';

  const [filterValues, setFilterValues] = useState({
    categoryName: '',
    subCategory: '',
  });
  const [toggleMenu, setToggleMenu] = useState(false);
  const [subtoggleMenu, setSubToggleMenu] = useState(false);
  const [subCategory, setSubcategory] = useState(null);
  const [subCategoryModel, setSubcategoryModel] = useState(false);
  const { employeeToken } = useSelector((state) => state.instructor);

  if (employeeToken) {
    data = jwtDecode(employeeToken);
  }
  const toggleInputItem = (input) => {
    setToggleInput((prevState) => ({
      ...prevState,
      [input]: !prevState[input],
    }));
  };
  const updateCategory = async (id, value) => {
    const res = await dispatch(updateCategoryName({ id, value }));
    if (res.payload?.success) {
      toast.success(res.payload.message);
      dispatch(allCategories(data._id));
    } else {
      toast.error(res.payload?.message || 'Update failed');
    }
  };
  const addFromSubCtg = async (id, value, status = 'add') => {
    const formData = new FormData();
    formData.append('subCategory', JSON.stringify(value.subCategory));
    const res = await dispatch(
      updateSupCategory({ id, value: formData, status })
    );

    if (res.payload?.success) {
      toast.success(res.payload.message);
      dispatch(allCategories(data._id));
    } else {
      toast.error(res.payload?.message || 'Update failed');
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value.split(',').map((item) => item.trim());
    setSubInputValue({ subCategory: newValue });
  };

  const handleToggle = (id) => {
    setToggleMenu(toggleMenu === id ? null : id);
  };
  const handleToggleSub = (id) => {
    setSubToggleMenu(subtoggleMenu === id ? null : id);
  };
  const toggleGrid = (view) => {
    setShowGrid(view);
  };

  useEffect(() => {
    dispatch(allCategories(data._id));
  }, [dispatch, data._id]);

  async function deleteCtg(id) {
    const res = await dispatch(deleteCategory(id));
    if (res.payload.success) {
      toast.success(res.payload.message);
      dispatch(allCategories(data._id));
    } else {
      toast.info(res.payload.message);
    }
  }
  const handleFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(filterCategories({ filter: filterValues, id: data._id }));
  };
  const handleShowSubCategoryModel = (data) => {
    setSubcategory(data);
    setSubcategoryModel(!subCategoryModel);
  };
  /* -------------------------------- Pagination -------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(4);

  const totalPages = allCtg?.categories
    ? Math.ceil(allCtg.categories.length / parseInt(numberOfPages))
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
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !allCtg?.categories?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !allCtg?.categories?.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    );
  };
  /* -------------------------------- Pagination subCategory -------------------------------- */
  const [currentPageSub, setCurrentPageSub] = useState(1);
  const [numberOfPagesSub, setNumberOfPagesSub] = useState(5);

  const totalPagesSub = subCategory
    ? Math.ceil(subCategory.length / parseInt(numberOfPagesSub))
    : 1;

  const handleClickSub = (page) => {
    setCurrentPageSub(page);
  };

  const startSub = (currentPageSub - 1) * parseInt(numberOfPagesSub);
  const endSub = startSub + parseInt(numberOfPagesSub);

  const renderPaginationSub = () => {
    const pageNumbersSub = [];
    for (let i = 1; i <= totalPagesSub; i++) {
      pageNumbersSub.push(
        <li
          className={` ${
            currentPageSub === i
              ? 'bg-blue-700 text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 text-black rounded-md cursor-pointer'
          } p-2 px-4 mx-1`}
          key={i}
          onClick={() => handleClickSub(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPageSub === 1 || !subCategory?.length}
            onClick={() => setCurrentPageSub(currentPageSub - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbersSub}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPageSub === totalPagesSub || !subCategory?.length}
            onClick={() => setCurrentPageSub(currentPageSub + 1)}
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
        <title>My Categories</title>
        <meta name="description" content="My Categories page" />
        <meta name="keywords" content="My Categories, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection
          to="/panel/myCategory"
          title="My Categories"
          subTitle="My Categories"
          link="My Categories"
        />
        <div className="flex gap-3 pt-10 px-10 md:px-0">
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
            name="categoryName"
            placeholder="categoryName"
            value={filterValues.categoryName}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
          <input
            type="text"
            name="subCategory"
            placeholder="subCategory"
            value={filterValues.subCategory}
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
        <div>
          {showGrid === 'grid' ? (
            <div
              className={
                allCtg?.categories?.length > 0
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-3 '
                  : 'w-full'
              }
            >
              {isLoading ? (
                <LoadingBetweenPage />
              ) : allCtg?.categories?.length > 0 ? (
                allCtg.categories.slice(start, end).map((item) => (
                  <div
                    key={item._id}
                    className="shadow-md relative bg-white dark:bg-gray-900 overflow-hidden rounded-md w-full"
                  >
                    <div>
                      <img
                        src={item.categoryPicture.secure_url}
                        alt="category"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="pb-4">
                      <p className="text-sm px-4 pt-4 capitalize">
                        Added By : {item.addedBy.name}
                      </p>
                      <div className="p-4">
                        <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-sm">
                          Subcategories:
                        </h3>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {item.subCategory.slice(0, 3).map((sub) => (
                            <li
                              key={sub.subCategoryId}
                              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-lg text-xs"
                            >
                              {sub.subCategoryName}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        <p>{item.categoryName.replace(/"/g, '')}</p>
                      </div>
                      <div className="bg-purple-700 absolute top-0 left-0 p-3 text-white shadow-xl m-5 rounded-lg cursor-pointer">
                        <p onClick={() => handleToggle(item._id)}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </p>
                        {toggleMenu === item._id && (
                          <div className="absolute top-14 w-48 dark:bg-gray-700   bg-gray-50 shadow-md p-2 rounded-md">
                            <ul>
                              {data?.role == 'superAdmin' && (
                                <li
                                  onClick={() => deleteCtg(item._id)}
                                  className="text-sm cursor-pointer hover:bg-gray-100 p-2 dark:hover:bg-gray-600 dark:text-red-500 text-red-700 font-bold"
                                >
                                  Delete category
                                </li>
                              )}
                              <li
                                onClick={() => toggleInputItem('categoryInput')}
                                className="text-sm dark:hover:bg-gray-600 cursor-pointer hover:bg-teal-100 p-2 dark:text-teal-400 text-teal-600 font-bold"
                              >
                                Edit category
                              </li>
                              <li
                                onClick={() => toggleInputItem('supcategory')}
                                className="text-sm dark:hover:bg-gray-600 cursor-pointer hover:bg-orange-100 p-2 dark:text-orange-400 text-orange-600 font-bold"
                              >
                                Add SubCategory
                              </li>
                              <li className="text-sm cursor-pointer dark:hover:bg-gray-600 hover:bg-rose-100 p-2 text-rose-600 dark:text-rose-400 font-bold">
                                <Link
                                  to={`/panel/delsubcategory?categoryId=${
                                    item._id
                                  }&subCategory=${encodeURIComponent(
                                    item.subCategory
                                      .map((sub) => sub.subCategoryName)
                                      .join(',')
                                  )}&subCategoryId=${encodeURIComponent(
                                    item.subCategory
                                      .map((sub) => sub.subCategoryId)
                                      .join(',')
                                  )}`}
                                >
                                  Delete SubCategory
                                </Link>
                              </li>
                              <li className="text-sm cursor-pointer dark:hover:bg-gray-600 hover:bg-lime-100 p-2 text-lime-800 dark:text-lime-400 font-bold">
                                <Link
                                  to={`/panel/updateSubCategory?categoryId=${
                                    item._id
                                  }&subCategory=${encodeURIComponent(
                                    item.subCategory
                                      .map((sub) => sub.subCategoryName)
                                      .join(',')
                                  )}&subCategoryId=${encodeURIComponent(
                                    item.subCategory
                                      .map((sub) => sub.subCategoryId)
                                      .join(',')
                                  )}`}
                                >
                                  Edit SubCategory
                                </Link>
                              </li>
                              {toggeleInput.categoryInput && (
                                <form className=" fixed text-black dark:bg-gray-900 dark:text-white   top-24 right-10    w-[500px]  bg-purple-50  p-3 shadow-md rounded-md z-10 ">
                                  <div>
                                    <label htmlFor="category">
                                      Category Name
                                    </label>
                                    <input
                                      type="text"
                                      id="category"
                                      name="categoryName"
                                      value={inputValue.categoryName}
                                      placeholder={item.categoryName.replace(
                                        /"/g,
                                        ''
                                      )}
                                      onChange={(e) =>
                                        setInputValue({
                                          categoryName: e.target.value,
                                        })
                                      }
                                      className="w-full focus:ring-0 dark:bg-gray-800 dark:text-white shadow-md rounded-lg p-3  mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                                    />
                                  </div>
                                  <button
                                    onClick={() =>
                                      updateCategory(item._id, inputValue)
                                    }
                                    className="bg-purple-500 py-2 rounded-md px-10 mt-3   text-white"
                                  >
                                    Edit
                                  </button>
                                </form>
                              )}
                              {toggeleInput.supcategory && (
                                <form className=" fixed dark:bg-gray-900 dark:text-white  text-black  top-24 right-10    w-[500px]  bg-purple-50  p-3 shadow-md rounded-md z-10">
                                  <div>
                                    <label htmlFor="subCategory">
                                      SubCategory Name
                                    </label>
                                    <input
                                      type="text"
                                      id="subCategory"
                                      name="subCategory"
                                      placeholder="SubCategory Nam"
                                      value={subInputValue.subCategory.join(
                                        ', '
                                      )}
                                      onChange={handleChange}
                                      className="w-full dark:bg-gray-800 dark:text-white focus:ring-0 shadow-md rounded-lg p-3 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addFromSubCtg(
                                        item._id,
                                        subInputValue,
                                        'add'
                                      )
                                    }
                                    className="bg-purple-500 py-2 rounded-md px-10 text-white mt-2"
                                  >
                                    Edit
                                  </button>
                                </form>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-center items-center">
                        <Link
                          to={`/panel/courses?category=${
                            item._id
                          }&subcategoryId=${
                            item.subCategory.length > 0
                              ? item.subCategory.map((sub) =>
                                  encodeURIComponent(sub.subCategoryId)
                                )
                              : ''
                          }&subcategory=${
                            item.subCategory.length > 0
                              ? item.subCategory.map((sub) =>
                                  encodeURIComponent(sub.subCategoryName)
                                )
                              : ''
                          }`}
                          className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white text-sm"
                        >
                          Add Course
                        </Link>
                        <button
                          onClick={() =>
                            handleShowSubCategoryModel(item.subCategory)
                          }
                          className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-white hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white text-sm"
                        >
                          subCategory
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white text-center dark:bg-gray-900 p-10 text-gray-900 dark:text-gray-200  rounded-md shadow-md m-auto">
                  <p>There are no categories currently available</p>
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
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subcategories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <LoadingBetweenPage />
                  ) : allCtg?.categories?.length > 0 ? (
                    allCtg.categories.slice(start, end).map((item) => (
                      <tr
                        key={item._id}
                        className="bg-white dark:bg-gray-900  hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={item.categoryPicture.secure_url}
                            alt="category"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="dark:bg-gray-800 bg-gray-700 px-3 py-1 rounded-md">
                              {item.categoryName.replace(/"/g, '')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 flex flex-wrap gap-2 relative ">
                          {item.subCategory.slice(0, 3).map((sub) => (
                            <span
                              onClick={() => handleToggleSub(sub._id)}
                              key={sub._id}
                              className=" cursor-pointer dark:bg-gray-800 bg-gray-700 px-3 py-1 rounded-md"
                            >
                              {sub.subCategoryName}
                            </span>
                          ))}
                        </td>
                        <td className="px-6 py-4 relative">
                          <i
                            onClick={() => handleToggle(item._id)}
                            className="fa-solid fa-ellipsis-vertical cursor-pointer text-xl"
                          ></i>
                          {toggleMenu === item._id && (
                            <div className="absolute bg-gray-50 dark:bg-gray-800  top-14  shadow-md p-2 w-48  rounded-md z-10 -translate-x-28 ">
                              <ul>
                                {data.role == 'superAdmin' ? (
                                  <li
                                    onClick={() => deleteCtg(item._id)}
                                    className="text-sm cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100 p-2 text-red-700 font-bold"
                                  >
                                    Delete category
                                  </li>
                                ) : (
                                  ''
                                )}
                                <li className="text-sm dark:hover:bg-gray-700 cursor-pointer hover:bg-teal-100 p-2 text-green-600 font-bold">
                                  <Link
                                    to={`/panel/courses?category=${
                                      item._id
                                    }&subcategoryId=${
                                      item.subCategory.length > 0
                                        ? item.subCategory.map((sub) =>
                                            encodeURIComponent(
                                              sub.subCategoryId
                                            )
                                          )
                                        : ''
                                    }&subcategory=${
                                      item.subCategory.length > 0
                                        ? item.subCategory.map((sub) =>
                                            encodeURIComponent(
                                              sub.subCategoryName
                                            )
                                          )
                                        : ''
                                    }`}
                                  >
                                    Add Course
                                  </Link>
                                </li>
                                <li
                                  onClick={() =>
                                    toggleInputItem('categoryInput')
                                  }
                                  className="text-sm dark:hover:bg-gray-700 cursor-pointer hover:bg-teal-100 p-2 text-teal-600 font-bold"
                                >
                                  Edit category
                                </li>
                                <li
                                  onClick={() => toggleInputItem('supcategory')}
                                  className="text-sm  dark:hover:bg-gray-700 cursor-pointer hover:bg-orange-100 p-2 text-orange-600 font-bold"
                                >
                                  Add SubCategory
                                </li>
                                <li className="text-sm cursor-pointer hover:bg-rose-100 p-2 dark:hover:bg-gray-700 text-rose-600 font-bold">
                                  <Link
                                    to={`/panel/delsubcategory?categoryId=${
                                      item._id
                                    }&subCategory=${encodeURIComponent(
                                      item.subCategory
                                        .map((sub) => sub.subCategoryName)
                                        .join(',')
                                    )}&subCategoryId=${encodeURIComponent(
                                      item.subCategory
                                        .map((sub) => sub.subCategoryId)
                                        .join(',')
                                    )}`}
                                  >
                                    Delete SubCategory
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer hover:bg-lime-100 p-2 dark:hover:bg-gray-700 text-lime-800 font-bold">
                                  <Link
                                    to={`/panel/updateSubCategory?categoryId=${
                                      item._id
                                    }&subCategory=${encodeURIComponent(
                                      item.subCategory
                                        .map((sub) => sub.subCategoryName)
                                        .join(',')
                                    )}&subCategoryId=${encodeURIComponent(
                                      item.subCategory
                                        .map((sub) => sub.subCategoryId)
                                        .join(',')
                                    )}`}
                                  >
                                    Edit SubCategory
                                  </Link>
                                </li>
                                {toggeleInput.categoryInput && (
                                  <form className="z-20 bg-gray-200 dark:text-white dark:bg-gray-800 grid w-[500px] gap-4 absolute -left-full top-0 transform -translate-x-full mt-4 -translate-y-24  p-3 shadow-md rounded-md">
                                    <div>
                                      <label htmlFor="category">
                                        Category Name
                                      </label>
                                      <input
                                        type="text"
                                        id="category"
                                        name="categoryName"
                                        value={inputValue.categoryName}
                                        placeholder={item.categoryName.replace(
                                          /"/g,
                                          ''
                                        )}
                                        onChange={(e) =>
                                          setInputValue({
                                            categoryName: e.target.value,
                                          })
                                        }
                                        className="w-full  focus:ring-0 shadow-md rounded-lg p-3  mt-2 focus:outline-none bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-gray-500 border-gray-300    placeholder-gray-500"
                                      />
                                    </div>
                                    <button
                                      onClick={() =>
                                        updateCategory(item._id, inputValue)
                                      }
                                      className="bg-purple-500 py-2 rounded-md px-10 text-white"
                                    >
                                      Edit
                                    </button>
                                  </form>
                                )}
                                {toggeleInput.supcategory && (
                                  <form className="z-20 grid bg-gray-200 dark:text-white dark:bg-gray-800 w-[500px] gap-4 absolute -left-full top-0 transform -translate-x-full mt-4 -translate-y-24  p-3 shadow-md rounded-md">
                                    <div>
                                      <label htmlFor="subCategory">
                                        SubCategory Name
                                      </label>
                                      <input
                                        type="text"
                                        id="subCategory"
                                        name="subCategory"
                                        placeholder="subCategory Name"
                                        value={subInputValue.subCategory.join(
                                          ', '
                                        )}
                                        onChange={handleChange}
                                        className="w-full focus:ring-0 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300  placeholder-gray-500"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        addFromSubCtg(
                                          item._id,
                                          subInputValue,
                                          'add'
                                        )
                                      }
                                      className="bg-purple-500 py-2 rounded-md px-10 text-white"
                                    >
                                      Edit
                                    </button>
                                  </form>
                                )}
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-10">
                        <div className="bg-white dark:bg-gray-900 text-center  text-gray-900 dark:text-gray-200 p-10 rounded-md shadow-md m-auto">
                          <p>There are no categories currently available</p>
                        </div>
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
        {subCategoryModel && (
          <div className="bg-black fixed inset-0 z-40 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white relative dark:bg-gray-900 p-4 rounded-md w-full max-w-3xl">
              <table className="w-full border-collapse border border-gray-200 dark:border-gray-800">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-800">
                      Subcategory Name
                    </th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-800">
                      Subcategory ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subCategory.slice(startSub, endSub).map((sub, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
                    >
                      <td className="px-4 py-2 border border-gray-200 dark:border-gray-800">
                        {sub.subCategoryName}
                      </td>
                      <td className="px-4 py-2 border border-gray-200 dark:border-gray-800">
                        {sub.subCategoryId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setSubcategoryModel(false)}
                  className="bg-red-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in"
                >
                  Close
                </button>
              </div>
              <div className="flex  items-center justify-center flex-wrap   my-10 gap-10 ">
                {renderPaginationSub()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
