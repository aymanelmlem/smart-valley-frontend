import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterAllCourses } from '../../../../redux/courses/courses.slice';

export default function SearchCourses({ search, setSearch }) {
    const { isLoading, allcourse } = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState({
        courseName: search,
    });

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            dispatch(filterAllCourses(filterValue));
        }, 300); 

        return () => clearTimeout(debounceTimeout);
    }, [filterValue, dispatch]);

    useEffect(() => {
        setFilterValue({ courseName: search });
    }, [search]);

    const handleLinkClick = () => {
        setSearch(''); 
    };

    return (
        <div className='absolute right-1 md:right-5 top-32 mt-12 rounded-md p-3 bg-white dark:bg-gray-800 w-full md:w-auto overflow-x-auto scroll-snap-x'>
            {isLoading ? (
                <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-snap-align-start">
                    {allcourse?.courses?.length > 0 ? (
                        allcourse?.courses?.map((course) => (
                            <Link
                                to={`/CourseDetailsStudent/${course.id}`}
                                key={course._id}
                                className="flex flex-row bg-white dark:bg-gray-900 transition border border-gray-800 dark:border-gray-600 hover:text-gray-950 dark:hover:text-gray-300 hover:shadow-xl rounded-md"
                                onClick={handleLinkClick}
                            >
                                <div className="hidden sm:block sm:basis-56 shadow">
                                    <img
                                        alt={course.courseName}
                                        src={course.coursePicture.secure_url}
                                        className="aspect-square h-full w-full object-cover rounded-l-md"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                                    <div>
                                        <h3 className="font-bold uppercase text-gray-900 dark:text-gray-100">
                                            {course.courseName}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
                                            {course.courseDescription}
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-700 dark:text-gray-400">
                                            <i className="fa-solid fa-tag mr-2"></i>
                                            {course.coursePrice} Egp
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-700 dark:text-gray-400">
                                            <i className="fa-solid fa-clock mr-2"></i>
                                            {course.courseHours} h
                                        </p>
                                    </div>
                                    <div className='flex gap-4 items-center mt-4'>
                                        <div className='w-12 h-12 rounded-full'>
                                            <img
                                                alt={course.teachedBy}
                                                src={course.instructor.profilePicture.secure_url}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-100">Taught By</p>
                                            <span className='text-sm font-semibold text-gray-800 dark:text-gray-100'>{course.teachedBy}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className='text-gray-800 dark:text-gray-500 w-full text-center'>No courses available matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
}
