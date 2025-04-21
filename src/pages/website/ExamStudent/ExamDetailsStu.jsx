import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { examStudentDetail } from '../../../redux/student/student.slice';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
import { useTranslation } from 'react-i18next';
export default function ExamDetailsStu() {
  const { examDetail } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const autoCorrect = searchParams.get('Autto-correct');
  const [answers, setAnswers] = useState([]);
  const [isSubmit, setSubmit] = useState(false);
  useEffect(() => {
    dispatch(examStudentDetail(id));
  }, [dispatch, id]);

  const handleAnswerChange = (questionId, value, type) => {

    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        if (type === 'radio') {
          updatedAnswers[existingAnswerIndex].answersOfThisQuestionsChooses = [
            value,
          ];
        } else if (type === 'checkbox') {
          const currentChoices =
            updatedAnswers[existingAnswerIndex].answersOfThisQuestionsChooses ||
            [];
          if (currentChoices.includes(value)) {
            updatedAnswers[existingAnswerIndex].answersOfThisQuestionsChooses =
              currentChoices.filter((choice) => choice !== value);
          } else {
            updatedAnswers[existingAnswerIndex].answersOfThisQuestionsChooses =
              [...currentChoices, value];
          }
        } else if (type === 'text') {
          updatedAnswers[existingAnswerIndex].answerOfQuestionNotMcq = value;
        }
        return updatedAnswers;
      }

      const newAnswer =
        type === 'text'
          ? { questionId, answerOfQuestionNotMcq: value }
          : { questionId, answersOfThisQuestionsChooses: [value] };
      return [...prevAnswers, newAnswer];
    });
  };

  const handleSubmit = async (e) => {
    setSubmit(true);
    

    const headers = {
      token: localStorage.getItem('tokenStudent'),
    };
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/users/tests/solveTheTest/${id}`,
        {
          eachQuestion: answers,
        },
        { headers }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/exam-result/${id}?Auto-correct?${autoCorrect}`);
      } else {
        toast.error(response.data.message);

        if (
          response.data.message ===
          "you can't take this test again because you are already take this before"
        ) {
          navigate(`/exam-result/${id}?Auto-correct?${autoCorrect}`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting the exam.');
    }
  };

  if (!examDetail) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
            Loading exam details...
          </p>
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500"></div>
        </div>
      </div>
    );
  }


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
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-24">
        {examDetail.takenThisTestBfore && (
          <div className="bg-white text-center w-72 m-auto dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold dark:text-white">{t('taken the exam')}</p>
            <button
              onClick={() =>
                navigate(`/exam-result/${id}?Auto-correct?${autoCorrect}`)
              }
              className="mt-4 bg-green-500 dark:bg-green-700 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 dark:hover:bg-green-800 transition-all duration-300"
            >
              {t('show result')}
            </button>
          </div>
        )}

        <div className="max-w-4xl mx-auto mt-5  bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900  dark:text-gray-100">
                {examDetail?.testData?.testName}
              </h1>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500"
              >
                Back
              </button>
            </div>
            <div className="mt-6">
              {examDetail?.testData?.testQuestions.length > 0 ? (
                examDetail?.testData?.testQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-md shadow-sm transition hover:shadow-lg"
                  >
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {question.question} {question.question.includes("?")?"":"?"}
                    </p>
                    {question.questionPhoto && (
                      <img
                        src={question.questionPhoto}
                        alt="Question"
                        className="mt-2 max-w-full h-auto rounded-md border border-gray-300"
                      />
                    )}
                    <div className="mt-4">
                      <ul className="mt-2 space-y-2">
                        {question.questionsChooses?.map((choice) => (
                          <li
                            key={choice.id}
                            className="flex items-center space-x-2"
                          >
                            {question.questionAnswer.length === 1 ? (
                              <input
                                type="radio"
                                name={question.questionId}
                                id={choice.id}
                                value={choice.choose}
                                onChange={() =>
                                  handleAnswerChange(
                                    question.questionId,
                                    choice.chooseId,
                                    'radio'
                                  )
                                }
                                className="form-radio"
                              />
                            ) : (
                              <input
                                type="checkbox"
                                name={question.questionId}
                                id={choice.id}
                                value={choice.choose}
                                onChange={() =>
                                  handleAnswerChange(
                                    question.questionId,
                                    choice.chooseId,
                                    'checkbox'
                                  )
                                }
                                className="form-checkbox"
                              />
                            )}
                            <label
                              htmlFor={choice.id}
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {choice.choose}
                            </label>
                          </li>
                        ))}
                      </ul>
                      {question.questionsChooses.length === 0 && (
                        <textarea
                          placeholder="Write your answer here"
                          onChange={(e) =>
                            handleAnswerChange(
                              question.questionId,
                              e.target.value,
                              'text'
                            )
                          }
                          className="w-full dark:bg-gray-800 dark:text-white px-4 py-2 text-sm border border-gray-300 rounded-md"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  No questions available.
                </p>
              )}
            </div>
            <button
              disabled={answers.length === 0}
              type="submit"
              className={`mt-6 px-6 py-2 rounded-lg shadow ${
                answers.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
              aria-disabled={answers.length === 0}
            >
              Submit
            </button>
            {isSubmit && answers.length === 0 && (
              <p className="mt-2 text-red-600">
                You should solve the exam and submit your answers.
              </p>
            )}{' '}
          </form>
        </div>
      </div>
    </>
  );
}
