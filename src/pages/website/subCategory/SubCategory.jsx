import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSubCategory, filterAllSubCategory } from '../../../redux/category/category.slice';
import { Link } from 'react-router-dom';

export default function SubCategory() {
    const { isLoading, subCtg } = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [filterValues, setFilterValues] = useState({
        subCategoryName: '',
    });

    useEffect(() => {
      dispatch(allSubCategory()); 
    }, [dispatch]);

    useEffect(() => {
        if (filterValues.subCategoryName) {
            dispatch(filterAllSubCategory(filterValues));
        } else {
            dispatch(allSubCategory());
        }
    }, [filterValues, dispatch]);

    const handleFilterChange = (e) => {
        setFilterValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    };

    const displayData = filterValues.subCategoryName ? subCtg?.results : subCtg?.results?.slice(0, 3);

    return (
        <div className='p-4 w-[250px] md:w-[536px] bg-white dark:bg-gray-800 shadow-md absolute top-full right-0 mt-5 rounded-md'>
            <div className="relative">
                <label htmlFor="subCategoryName" className="sr-only">Subcategory Name</label>
                <input
                    type="text"
                    id="subCategoryName"
                    name='subCategoryName'
                    placeholder="Search for..."
                    className="w-full rounded-md border-gray-200 dark:placeholder:text-white dark:caret-white dark:border-gray-600  dark:bg-gray-700 py-2.5 pe-10 shadow-sm sm:text-sm"
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleFilterChange}
                    value={filterValues.subCategoryName}
                />
                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" className="text-gray-600 dark:text-white hover:text-gray-700">
                        <span className="sr-only">Search</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3'>
                {isLoading ? (
                    <div className='animate-pulse flex justify-center items-center'>Loading...</div>
                ) : displayData && displayData.length > 0 ? (
                    displayData.map((sub, index) => (
                        <Link
                            to={`/CoursesBySubCategories/${sub.subCategoryId}`}
                            className='flex justify-center text-sm font-bold bg-gray-100 dark:bg-gray-700 px-10 py-2 rounded-full'
                            key={index}
                        >
                            {sub.subCategoryName}
                        </Link>
                    ))
                ) : (
                    "No subcategory now"
                )}
            </div>
        </div>
    );
}
