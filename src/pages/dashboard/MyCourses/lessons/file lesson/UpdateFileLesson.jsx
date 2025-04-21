import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../../components/headSection/HeadSection';
import InputField from '../../../../../components/Input/InputField';
import { toast } from 'react-toastify';
import { fileLessonFun } from '../../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function UpdateFileLesson() {
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const courseId = searchParams.get('courseId');
  const lessonId = searchParams.get('lessonId');
  const fileId = searchParams.get('fileId');
  const file = searchParams.get('file');
  let fileIdArr = fileId ? fileId.split(',') : [];
  let fileArr = file ? file.split(',') : [];
  const [newLink, setNewLink] = useState({ id: '', newDescribtion: '' });
  const handleSubmit = async (value) => {
    if (value.pdfsUpdate.length === 0) {
      toast.error('Please provide a pdfs update file name and description');
      return;
    }
    const formData = new FormData();

    formData.append('pdfsUpdate', JSON.stringify(value.pdfsUpdate));
    formData.append('course', value.course);
    formData.append('section', value.section);
    formData.append('fileUpload', value.fileUpload);

    const response = await dispatch(
      fileLessonFun({ id: lessonId, value: formData, flag: 'update' })
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
      pdfsUpdate: [],
      fileUpload: null,
    },
    onSubmit: handleSubmit,
  });
  // Handling pdfsUpdate
  const handleAddLink = () => {
    if (newLink.newDescribtion.trim() !== '' && newLink.id.trim() !== '') {
      formik.setFieldValue('pdfsUpdate', [
        ...formik.values.pdfsUpdate,
        newLink,
      ]);
      setNewLink({ id: '', newDescribtion: '' });
    }
  };

  const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = formik.values.pdfsUpdate.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue('pdfsUpdate', updatedLinks);
  };

  const handleEditLink = (indexToEdit, newValue) => {
    const updatedLinks = formik.values.pdfsUpdate.map((link, index) =>
      index === indexToEdit ? newValue : link
    );
    formik.setFieldValue('pdfsUpdate', updatedLinks);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update file lessosns</title>
        <meta name="description" content="update file lessosns page" />
        <meta
          name="keywords"
          content="update file lessosns, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="container mx-auto">
        <HeadSection title="Update File" subTitle="Files" link="Update File" />

        <div className="dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg">
          <h3 className="text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5">
            Basic Info
          </h3>
          <form className="space-y-5 py-10" onSubmit={formik.handleSubmit}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3   gap-4 ">
                <div className="">
                  <label
                    htmlFor="File ID"
                    className="font-semibold text-gray-800 dark:text-gray-300"
                  >
                    File ID:
                  </label>
                  <select
                    id="File ID"
                    value={newLink.id}
                    onChange={(e) =>
                      setNewLink({ ...newLink, id: e.target.value })
                    }
                    className="w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  >
                    <option value="" disabled>
                      Select File ID
                    </option>
                    {fileIdArr.map((urlId, index) => (
                      <option
                        className="text-black dark:text-white"
                        key={urlId}
                        value={urlId}
                      >
                        {urlId} - {fileArr[index]}
                      </option>
                    ))}
                  </select>
                </div>

                <InputField
                  onChange={(e) =>
                    setNewLink({ ...newLink, newDescribtion: e.target.value })
                  }
                  value={newLink.newDescribtion}
                  name="newDescribtion"
                  inputType="input"
                  type="input"
                  title="File Description"
                  placeholder="Enter new File Description"
                  inputStyle="w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  icon="font"
                  iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="text-center bg-blue-600  text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700"
                >
                  Add File
                </button>
              </div>
              <ul className="mt-4">
                {formik.values.pdfsUpdate.map((content, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md mb-2 flex flex-col gap-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor={`linkId-${index}`}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          ID
                        </label>
                        <input
                          id={`linkId-${index}`}
                          type="text"
                          value={content.id}
                          onChange={(e) =>
                            handleEditLink(index, {
                              ...content,
                              id: e.target.value,
                            })
                          }
                          className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor={`desc-${index}`}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          New Description
                        </label>
                        <input
                          id={`desc-${index}`}
                          type="text"
                          value={content.newDescribtion}
                          onChange={(e) =>
                            handleEditLink(index, {
                              ...content,
                              newDescribtion: e.target.value,
                            })
                          }
                          className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>

                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 dark:hover:bg-red-700 transition duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {formik.errors.pdfsUpdate &&
                      formik.errors.pdfsUpdate[index] && (
                        <div className="text-red-600 text-sm mt-2">
                          {formik.errors.pdfsUpdate[index].link && (
                            <div>{formik.errors.pdfsUpdate[index].link}</div>
                          )}
                          {formik.errors.pdfsUpdate[index].desc && (
                            <div>{formik.errors.pdfsUpdate[index].desc}</div>
                          )}
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="file"
              name="fileUpload"
              onChange={(e) =>
                formik.setFieldValue('fileUpload', e.currentTarget.files[0])
              }
              className={`w-full shadow-md rounded-lg p-3 mt-2 dark:bg-gray-800 focus:outline-none border-gray-300 bg-white ${
                formik.errors.file
                  ? 'border-red-500 text-red-800'
                  : 'text-gray-800'
              }`}
            />
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
                  className="bg-blue-800 dark:hover:text-white text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold"
                >
                  Edit File
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
