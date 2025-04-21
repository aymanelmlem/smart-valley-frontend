import { useEffect } from 'react';
import { examInsDetails } from '../../../redux/instructor/instructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import HeadSection from '../../../components/headSection/HeadSection';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function ExamDetails() {
  const { exDetail } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(examInsDetails(id));
  }, [dispatch, id]);

  if (!exDetail?.test) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-700 dark:text-gray-300">
        Loading exam details...
      </div>
    );
  }

  const { test } = exDetail;

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Exam Details</title>
        <meta name="description" content="Exam Details page" />
        <meta name="keywords" content="Exam Details, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl mx-auto p-10">
      <HeadSection title="Exam Details" subTitle="Exams" link="Exam Details" />
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mt-8">
        {test.testName}
      </h1>

      {/* Course Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
        {/* Course Card */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden ">
          <img
            src={test.forCourse.coursePicture.secure_url}
            alt={test.forCourse.courseName}
            className="w-full h-60 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {test.forCourse.courseName}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Instructor:</strong> {test.forCourse.teachedBy}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Price:</strong> ${test.forCourse.coursePrice}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Hours:</strong> {test.forCourse.courseHours}
            </p>
          </div>
        </div>
        {/* Test Information Card */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 relative">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Exam Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Accepting Answers:</strong>{' '}
            <span
              className={`${
                test.acceptAnwers
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {test.acceptAnwers ? 'Yes' : 'No'}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Auto-correct:</strong>{' '}
            <span
              className={`${
                test.autoCorrectOrNot
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {test.autoCorrectOrNot ? 'Yes' : 'No'}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Created At:</strong>{' '}
            {new Intl.DateTimeFormat('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(test.createdAt))}
          </p>
          <Link to={`/panel/examCorrection/${test.id}`} className='bg-blue-600 bg-opacity-50 text-white hover:bg-opacity-60 transition duration-300  absolute right-0 bottom-0 m-5 p-3 rounded-md'>Exam correction</Link>
        </div>
      </div>
      {/* Test Questions */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          Exam Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {test.testQuestions?.map((question, index) => (
            <div
              key={question.questionId}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md  overflow-hidden"
            >
              <div className="bg-blue-700 bg-opacity-50 text-white px-4 py-3">
                <h3 className="text-lg font-bold">Question {index + 1}</h3>
              </div>

              <div className="p-6">
                <h4 className="text-gray-800 dark:text-gray-100 text-lg font-semibold mb-3">
                  {question.question}
                </h4>

                {question.questionPhoto && (
                  <div className="mb-4">
                    <img
                      onClick={() => window.open(question?.questionPhoto)}
                      src={question?.questionPhoto}
                      alt={`Question ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-sm cursor-pointer"
                    />
                  </div>
                )}

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Marks:</strong> {question.questionMarks}
                </p>

                <div className="space-y-3 mb-4">
                  {question.questionsChooses.map((choice) => (
                    <div
                      key={choice.chooseId}
                      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                    >
                      <span className="w-8 h-8 flex items-center justify-center font-bold text-blue-700 bg-blue-100 dark:bg-blue-900 text-sm rounded-full">
                        {choice.chooseNumber.toUpperCase()}
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">
                        {choice.choose}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h4 className="text-green-600 dark:text-green-400 font-semibold text-sm mb-2">
                    Correct Answer:
                  </h4>
                  <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                    {question.questionAnswer.map((answer) => (
                      <li key={answer.answerId}>{answer.choose}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
