import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { examStudentResult } from '../../../redux/student/student.slice';
import { MdPendingActions, MdCheckCircle } from 'react-icons/md'; // Icons for better design

export default function ExamResult() {
  const { examRes } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(examStudentResult(id));
  }, [dispatch, id]);

  if (!examRes) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
            Loading exam details...
          </p>
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500 border-solid"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Exam Result</title>
        <meta name="description" content="Exam Result page" />
        <meta name="keywords" content="Exam Result, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        {examRes?.result?.abilityToseen === 'underMarking' ? (
          <div className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <MdPendingActions className="text-6xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Exam Under Review
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please check back later to see your results.
            </p>
            <div className="mt-4">
              <Link
                to="/myLearning"
                className=" px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                My Courses
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center p-20 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <MdCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Your Mark
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-xl font-bold">
              {examRes?.result?.studentMarks}
            </p>
            <div className='mt-4 '>
              <Link
                to="/myLearning"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                My Courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
