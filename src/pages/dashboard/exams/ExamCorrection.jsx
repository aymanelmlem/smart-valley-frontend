import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  examCollection,
  filterExamCollection,
} from '../../../redux/instructor/instructorSlice';
import HeadSection from '../../../components/headSection/HeadSection';
import { BASE_URL } from '../../../utils/api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function ExamCorrection() {
  const { collectionEx, isLoading } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [filterValues, setFilterValues] = useState({
    finalResult: 'true',
  });
  const [essayResults, setEssayResults] = useState([]);
  const [loadingApi, setLoadingApi] = useState(false);
  const [resultId, setResultId] = useState('');
  useEffect(() => {
    dispatch(examCollection(id));
  }, [dispatch, id]);

  if (!collectionEx) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  const { results, numberOfStdTakeTest } = collectionEx;

  const handleFilterChange = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(filterExamCollection({ filterCriteria: filterValues, id }));
  };

  const handleEssayResultChange = (questionId, state) => {
    setEssayResults((prev) => {
      const updatedResults = prev.filter(
        (item) => item.questionId !== questionId
      );
      return [...updatedResults, { questionId, state }];
    });
  };

  const handleSubmitApi = async () => {
    setLoadingApi(true);
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/instructors/test/updateResultByIns/${resultId}`,
        { resultsOfEssayQuestions: essayResults },
        { headers }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating results:', error);
      toast.error('An error occurred while updating results.');
    } finally {
      setLoadingApi(false);
    }
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Review Exam</title>
        <meta name="description" content="Review Exam page" />
        <meta name="keywords" content="Review Exam, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl mx-auto p-10">
        <HeadSection
          title="Exam Correction"
          subTitle="Exams"
          link="Exam Correction"
        />
        <form
          onSubmit={handleFilterSubmit}
          className="mt-5 flex gap-3 justify-start flex-wrap"
        >
          <select
            name="finalResult"
            value={filterValues.finalResult}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="" disabled>
              Status
            </option>
            <option value="true">Review</option>
            <option value="false">Not Review</option>
          </select>
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
        {/* Number of students who took the test */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-900 shadow rounded-lg mt-5">
          <p className="text-lg font-semibold">
            Number of Students Took the Test:{' '}
            <span className="text-blue-600 dark:text-blue-400">
              {numberOfStdTakeTest}
            </span>
          </p>
        </div>
        {/* Result Exam */}
        {results?.length > 0 ? (
          results.map((result) => (
            <div
              key={result.id}
              className="mb-8 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Student Name:{' '}
                <span className="text-xl text-blue-600">
                  {result?.student.user.userName}
                </span>{' '}
              </h2>
              <div className="mb-4">
                <p className="font-semibold text-xl">
                  Test Name:{' '}
                  <span className="text-lg capitalize text-blue-600 dark:text-blue-500">
                    {result.test.testName}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-xl">
                  Total Marks:{' '}
                  <span className="text-lg text-blue-600 dark:text-blue-500">
                    {result.totalMarksOfTest}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">
                  Student Marks:{' '}
                  <span className="text-lg text-blue-600 dark:text-blue-500">
                    {result.studentMarks}
                  </span>
                </p>
              </div>
              <h3 className="text-lg font-semibold mb-3">Questions:</h3>
              {result?.restOfQuestions.map((question, index) => (
                <div
                  key={question.questionId}
                  className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  <p className="font-semibold ">
                    Question Mark: {question.mark}
                  </p>
                  <p className="font-semibold">Question:</p>
                  <p className="mt-3">
                    Q<sub>{index + 1}</sub>: {question.question}
                  </p>
                  <p>Student Answer : {question.studentAnswer}</p>
                  <select
                    onChange={(e) => {
                      handleEssayResultChange(
                        question.questionId,
                        e.target.value
                      );
                      setResultId(result.id);
                    }}
                    className="mt-2 p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  >
                    <option value="">Select State</option>
                    <option value="trueQuestion">Correct</option>
                    <option value="falseQuestion">Incorrect</option>
                  </select>
                  {result.abilityToseen == 'marked' ? (
                    <p className="bg-green-600 bg-opacity-50 mt-4 p-4 rounded-md border border-green-500">
                      The exam has been previously reviewed
                    </p>
                  ) : (
                    <p className="bg-red-600 bg-opacity-50 mt-4 p-4 rounded-md border border-red-500">
                      The exam has not been reviewed yet
                    </p>
                  )}
                </div>
              ))}
              <button
                onClick={handleSubmitApi}
                className="mt-5 bg-blue-600 text-white p-3 rounded-md font-semibold"
                disabled={loadingApi}
              >
                {loadingApi ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  'Collection Exam'
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-lg">
            No results available for this exam.
          </div>
        )}
      </div>
    </>
  );
}
