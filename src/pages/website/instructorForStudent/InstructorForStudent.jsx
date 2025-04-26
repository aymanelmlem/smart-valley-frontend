import React from 'react'
import { Link } from 'react-router-dom';

export default function InstructorForStudent({data}) {
    
  return (
    <Link
            to={`/InstructorDetails/${data.id}`}
            className="relative block overflow-hidden my-10 rounded-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800"
        >
        <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
        >

        </span>
        <div className="sm:flex items-center  sm:justify-between sm:gap-4">
            <div className="hidden sm:block sm:shrink-0">
                <img
                    alt={`Instructor-${data?.name}`}
                    src={data?.profilePicture.secure_url}
                    className="size-16 rounded-lg object-cover shadow-sm"
                />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-xl">
                    {data?.name}
                </h3>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-500 ">
                    {data?.job}
                </h3>
            </div>
            
        </div>
            <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    {data?.introductionPerson}
                </p>
            </div>
            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-xs font-medium text-gray-600 dark:text-gray-400">{data?.subjects}</dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-300">subjects</dd>
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-xs font-medium text-gray-600 dark:text-gray-400">{new Date(data.createdAt).toLocaleDateString()}</dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-300">Date of Joining</dd>
                </div>
            </dl>
    </Link>
  )
}
