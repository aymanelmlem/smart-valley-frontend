import React from 'react';
import { Link } from 'react-router-dom';

export default function HeadSection({ title, subTitle, link, to }) {
  return (
    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg overflow-hidden transition duration-300">
      <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45"></div>
      <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-md text-gray-600 dark:text-gray-300">{subTitle}</p>
        <Link
          to={to}
          className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition duration-300"
        >
          {link}
        </Link>
      </div>
    </div>
  );
}
