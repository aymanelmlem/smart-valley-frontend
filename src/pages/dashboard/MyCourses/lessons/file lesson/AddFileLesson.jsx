import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../../components/headSection/HeadSection';
import InputField from '../../../../../components/Input/InputField';
import { fileLessonFun } from '../../../../../redux/courses/courses.slice';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function AddFileLesson() {
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const courseId = searchParams.get('courseId');
  const lessonId = searchParams.get('lessonId');
  const [uploadTextInput, setUploadTextInput] = useState('');

  // Validation schema with custom file validation
  const validationSchema = yup.object({
    uploadText: yup
      .array()
      .of(yup.string())
      .required('Description is required'),
    file: yup
      .mixed()
      .required('A file is required')
      .test('fileType', 'Unsupported file format', (value) => {
        return (
          value &&
          [
            'image/png',
            'image/jpeg',
            'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ].includes(value.type)
        );
      }),
  });

  const handleSubmit = async (value) => {
    const formData = new FormData();
    formData.append('uploadText', JSON.stringify(value.uploadText));
    formData.append('file', value.file);
    formData.append('course', value.course);
    formData.append('section', value.section);

    const response = await dispatch(
      fileLessonFun({ id: lessonId, value: formData, flag: 'add' })
    );

    if (response?.payload?.success) {
      toast.success(response.payload.message);
      formik.resetForm();
    } else {
      toast.error(response.payload.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      course: courseId,
      section: sectionId,
      uploadText: [],
      file: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Handling UploadText
  const handleUploadText = () => {
    if (uploadTextInput.trim() !== '') {
      formik.setFieldValue('uploadText', [
        ...formik.values.uploadText,
        uploadTextInput,
      ]);
      setUploadTextInput('');
    }
  };

  const handleRemoveUploadText = (indexToRemove) => {
    const updateduploadText = formik.values.uploadText.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue('uploadText', updateduploadText);
  };

  const handleEditUploadText = (indexToEdit, newValue) => {
    const updatedUploadText = formik.values.uploadText.map((content, index) =>
      index === indexToEdit ? newValue : content
    );
    formik.setFieldValue('uploadText', updatedUploadText);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add file lesson</title>
        <meta name="description" content="Add file lesson page" />
        <meta name="keywords" content="Add file lesson, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl mx-auto">
        <HeadSection
          title="Add File Lesson"
          subTitle="File Lesson"
          link="Add File Lesson"
        />
        <div className="dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg">
          <h3 className="text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5">
            Basic Info
          </h3>
          <form className="space-y-5 py-10" onSubmit={formik.handleSubmit}>
            <div>
              <div className="mt-4">
                <input
                  type="file"
                  name="file"
                  onChange={(e) =>
                    formik.setFieldValue('file', e.currentTarget.files[0])
                  }
                  className={`w-full shadow-md rounded-lg p-3 mt-2 focus:outline-none border-gray-300 bg-white dark:bg-gray-800 ${
                    formik.errors.file
                      ? 'border-red-500 text-red-800'
                      : 'text-gray-800'
                  }`}
                />
                {formik.errors.file && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.file}
                  </div>
                )}
                <div className="mt-5">
                  <div className="flex gap-5 justify-center flex-wrap xl:flex-nowrap">
                    <InputField
                      onChange={(e) => setUploadTextInput(e.target.value)}
                      value={uploadTextInput}
                      name="uploadText"
                      inputType="input"
                      type="input"
                      title={
                        formik.errors.uploadText && formik.touched.uploadText
                          ? `${formik.errors.uploadText}`
                          : 'file description'
                      }
                      styleSpan={
                        formik.errors.uploadText && formik.touched.uploadText
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }
                      placeholder="Enter file description"
                      inputStyle={
                        formik.errors.uploadText && formik.touched.uploadText
                          ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                          : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                      }
                      icon={
                        formik.errors.uploadText && formik.touched.uploadText
                          ? 'bug'
                          : 'file-lines'
                      }
                      iconStyle={
                        formik.errors.uploadText && formik.touched.uploadText
                          ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                      }
                    />

                    <button
                      type="button"
                      onClick={handleUploadText}
                      className="bg-blue-600 text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  {formik.errors.uploadText && (
                    <div className="text-red-600 text-sm mt-2">
                      {formik.errors.uploadText}
                    </div>
                  )}
                  <ul className="mt-4">
                    {formik.values.uploadText.map((content, index) => (
                      <li
                        key={index}
                        className="p-2 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center"
                      >
                        <input
                          type="text"
                          value={content}
                          onChange={(e) =>
                            handleEditUploadText(index, e.target.value)
                          }
                          className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="Enter description"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveUploadText(index)}
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition duration-200"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              {isLoading ? (
                <button
                  type="submit"
                  className="bg-blue-800 text-white p-4 rounded-md  hover:outline-blue-700"
                  disabled
                >
                  <i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-800 text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold"
                >
                  Add File Lesson
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
