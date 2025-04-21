import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 dark:border-gray-700 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:pt-16">
          
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Our Services</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <p className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Personalized Tutoring </p>
              </li>
              <li>
                <p className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Interactive Courses </p>
              </li>
              <li>
                <p className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Skill Development </p>
              </li>
              <li>
                <p className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Certification Programs </p>
              </li>
              <li>
                <p className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Career Counseling </p>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">About Us</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Our Mission </Link>
              </li>
              <li>
                <p className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Meet the Team </p>
              </li>
              <li>
                <p className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Success Stories </p>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Links</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link to="" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Home </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> About </Link>
              </li>
              <li>
                <Link to="/contact"className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Contact us </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Courses </Link>
              </li>
              <li>
                <Link to="/instructor" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Instructors </Link>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="flex justify-between items-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024. Educational Platform. All rights reserved.</p>
          <div className="space-x-4">
            <a href="https://facebook.com" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75">
            <i className="fa-brands fa-square-facebook text-2xl"></i>
            </a>
            
            <a href="https://linkedin.com" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75">
            <i className="fa-brands fa-linkedin text-2xl"></i>
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
