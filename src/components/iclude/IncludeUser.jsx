import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function IncludeUser() {
  const { t } = useTranslation();
 
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-wrap justify-center gap-8">
          <div  className=" bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] transform transition hover:scale-105">
            <div className="p-8 flex flex-col items-center text-center">
              <i className="fa-solid fa-person-chalkboard text-5xl text-blue-600 dark:text-blue-400 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{t("Become Ins")}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">
                {t("introduction Ins")}
              </p>
              <Link
                to="/signup-employee"
                className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
              >
                {t("JOIN AS INSTRUCTOR")}
              </Link>
            </div>
          </div>

          <div  className=" bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] transform transition hover:scale-105">
            <div className="p-8 flex flex-col items-center text-center">
              <i className="fa-solid fa-chalkboard-user text-5xl text-green-600 dark:text-green-400 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{t("Become Student")}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">
                {t("introduction Student")}
              </p>
              <Link
                to="/student-signup"
                className="inline-block bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition duration-300"
              >
                {t("JOIN AS STUDENT")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
