import { useState } from 'react';
import HeadSection from '../../../components/headSection/HeadSection';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createExam } from '../../../redux/instructor/instructorSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function CreateExam() {
  const { isLoading } = useSelector((state) => state.instructor);
  const { id } = useParams();

  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([
    {
      question: '',
      questionPhoto: '',
      questionMarks: 0,
      questionsChooses: [{ chooseNumber: 'a', choose: '' }],
      questionAnswer: [{ choose: '' }],
    },
  ]);
  const validationSchema = yup.object({
    testName: yup.string().required('Exam name is required'),
    testQuestions: yup
      .array()
      .of(
        yup.object({
          question: yup.string().required('Question is required'),
          questionMarks: yup
            .number()
            .min(1, 'Marks must be greater than 0')
            .required('Marks are required'),
          questionsChooses: yup
            .array()
            .of(
              yup.object({
                chooseNumber: yup.string().nullable(), // اجعلها اختيارية
                choose: yup.string().nullable(), // اجعلها اختيارية
              })
            )
            .notRequired(), // اجعل المصفوفة نفسها غير مطلوبة
          questionAnswer: yup
            .array()
            .of(
              yup.object({
                choose: yup.string().nullable(), // اجعلها اختيارية
              })
            )
            .notRequired(), // اجعل المصفوفة نفسها غير مطلوبة
        })
      )
      .min(1, 'You must provide at least one question') // تأكد من وجود سؤال واحد على الأقل
      .required('Questions are required'),
  });
  

  const formik = useFormik({
    initialValues: {
      testName: '',
      testQuestions: questions,
    },
    validationSchema,
    onSubmit: async (values) => {
      const { testName, testQuestions } = values;
    
      // تجهيز جميع الأسئلة دفعة واحدة
      const formattedQuestions = testQuestions.map((que) => {
        const {
          question,
          questionAnswer,
          questionPhoto,
          questionMarks,
          questionsChooses,
        } = que;
    
        return {
          question,
          questionMarks,
          ...(questionPhoto && { questionPhoto }),
          ...(questionsChooses && questionsChooses.filter((choose) => choose.choose).length > 0 && {
            questionsChooses: questionsChooses.filter((choose) => choose.choose),
          }),
          ...(questionAnswer && questionAnswer.filter((answer) => answer.choose).length > 0 && {
            questionAnswer: questionAnswer.filter((answer) => answer.choose),
          }),
        };
      });
    
      const testPayload = {
        testName,
        testQuestions: formattedQuestions,
      };
    
      // إرسال الطلب
      await createTest(testPayload);
    }
  });
  
  async function createTest(payload) {
    const response = await dispatch(createExam({ id, value: payload }));
    if (response.payload.message === 'the test is maked sucessfully') {
      toast.success(response?.payload?.message);
    } else {
      
      toast.error(response?.payload?.message);
    }
  }

  const handleTestNameChange = (e) => {
    formik.setFieldValue('testName', e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;

    // Update state and Formik
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const handleChooseChange = (questionIndex, chooseIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionsChooses[chooseIndex][name] = value;

    // Update state and Formik
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionAnswer[answerIndex][name] = value;

    // Update state and Formik
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      questionPhoto: '',
      questionMarks: 0,
      questionsChooses: [{ chooseNumber: 'a', choose: '' }],
      questionAnswer: [{ choose: '' }],
    };
    const updatedQuestions = [...questions, newQuestion];

    // Update state and Formik
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const addChoose = (index) => {
    const updatedQuestions = [...questions];
    const newChooseNumber = String.fromCharCode(
      97 + updatedQuestions[index].questionsChooses.length
    ); // Generate next letter (a, b, c, etc.)
    updatedQuestions[index].questionsChooses.push({
      chooseNumber: newChooseNumber,
      choose: '',
    });
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const removeChoose = (questionIndex, chooseIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionsChooses = updatedQuestions[
      questionIndex
    ].questionsChooses.filter((_, i) => i !== chooseIndex);
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const addAnswer = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionAnswer.push({ choose: '' });
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionAnswer = updatedQuestions[
      questionIndex
    ].questionAnswer.filter((_, i) => i !== answerIndex);
    setQuestions(updatedQuestions);
    formik.setFieldValue('testQuestions', updatedQuestions);
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Create Exam</title>
        <meta name="description" content="Create Exam page" />
        <meta name="keywords" content="Create Exam, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl mx-auto">
      <HeadSection title="Create Exams" subTitle="Exams" link="Create Exams" />
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-5 relative  overflow-hidden">
        <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45"></div>
        <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45"></div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="testName"
              className="block text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Exam Name
            </label>
            <input
              id="testName"
              name="testName"
              type="text"
              value={formik.values.testName}
              onChange={handleTestNameChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            {formik.touched.testName && formik.errors.testName && (
              <p className="text-red-500 mt-1">{formik.errors.testName}</p>
            )}
          </div>

          {/* Render questions dynamically */}
          {questions.map((question, index) => (
            <div key={index} className="mb-6 border-b border-gray-300 pb-6">
              <label
                htmlFor={`testQuestions[${index}].question`}
                className="block text-lg font-semibold text-gray-700 dark:text-gray-300"
              >
                Question
              </label>
              <input
                id={`testQuestions[${index}].question`}
                name="question"
                type="text"
                value={formik.values.testQuestions[index].question}
                onChange={(e) => handleQuestionChange(index, e)}
                onBlur={formik.handleBlur}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
              {formik.touched.testQuestions?.[index]?.question &&
                formik.errors.testQuestions?.[index]?.question && (
                  <p className="text-red-500 mt-1">
                    {formik.errors.testQuestions[index].question}
                  </p>
                )}
              <label
                htmlFor={`testQuestions[${index}].questionPhoto`}
                className="block mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300"
              >
                Question Photo URL (optional)
              </label>
              <input
                id={`testQuestions[${index}].questionPhoto`}
                name="questionPhoto"
                type="text"
                value={formik.values.testQuestions[index].questionPhoto}
                onChange={(e) => handleQuestionChange(index, e)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />

              <label
                htmlFor={`testQuestions[${index}].questionMarks`}
                className="block mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300"
              >
                Marks
              </label>
              <input
                id={`testQuestions[${index}].questionMarks`}
                name="questionMarks"
                type="number"
                value={formik.values.testQuestions[index].questionMarks}
                onChange={(e) => handleQuestionChange(index, e)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
              {formik.touched.testQuestions?.[index]?.questionMarks &&
                formik.errors.testQuestions?.[index]?.questionMarks && (
                  <p className="text-red-500 mt-1">
                    {formik.errors.testQuestions[index].questionMarks}
                  </p>
                )}
              {/* Render multiple choices */}
              {question.questionsChooses.map((choose, chooseIndex) => (
                <div
                  key={chooseIndex}
                  className="flex items-center space-x-4 mt-4"
                >
                  <input
                    name="chooseNumber"
                    type="text"
                    value={choose.chooseNumber}
                    onChange={(e) => handleChooseChange(index, chooseIndex, e)}
                    placeholder="Choose number (a, b, c, etc.)"
                    className="p-3 border border-gray-300 rounded-lg w-16 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  />
                  <input
                    name="choose"
                    type="text"
                    value={choose.choose}
                    onChange={(e) => handleChooseChange(index, chooseIndex, e)}
                    placeholder="Choice text"
                    className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  />
                  {formik.touched.testQuestions?.[index]?.questionsChooses?.[
                    chooseIndex
                  ]?.choose &&
                    formik.errors.testQuestions?.[index]?.questionsChooses?.[
                      chooseIndex
                    ]?.choose && (
                      <p className="text-red-500 mt-1">
                        {
                          formik.errors.testQuestions[index].questionsChooses[
                            chooseIndex
                          ].choose
                        }
                      </p>
                    )}
                  <button
                    type="button"
                    onClick={() => removeChoose(index, chooseIndex)}
                    className="mt-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Remove Choice
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addChoose(index)}
                className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Add Choice
              </button>

              {/* Render answers dynamically */}
              {question.questionAnswer.map((answer, answerIndex) => (
                <div key={answerIndex} className="mt-4">
                  <label
                    htmlFor={`testQuestions[${index}].questionAnswer[${answerIndex}].choose`}
                    className="block text-lg font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Answer
                  </label>
                  <input
                    id={`testQuestions[${index}].questionAnswer[${answerIndex}].choose`}
                    name="choose"
                    type="text"
                    value={answer.choose}
                    onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  />
                  {formik.touched.testQuestions?.[index]?.questionAnswer?.[
                    answerIndex
                  ]?.choose &&
                    formik.errors.testQuestions?.[index]?.questionAnswer?.[
                      answerIndex
                    ]?.choose && (
                      <p className="text-red-500 mt-1">
                        {
                          formik.errors.testQuestions[index].questionAnswer[
                            answerIndex
                          ].choose
                        }
                      </p>
                    )}
                  <button
                    type="button"
                    onClick={() => removeAnswer(index, answerIndex)}
                    className="mt-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Remove Answer
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAnswer(index)}
                className="mt-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Add Answer
              </button>

              {/* Remove Question Button */}
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="mt-4 ms-4 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Remove Question
              </button>
            </div>
          ))}

          {/* Add New Question Button */}
          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="mt-6 bg-green-600 ms-4 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            {isLoading ? 'Creating Exam...' : 'Create Exam'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
