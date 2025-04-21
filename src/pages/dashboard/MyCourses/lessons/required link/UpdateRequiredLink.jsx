import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import InputField from '../../../../../components/Input/InputField';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { addRequiredLink } from '../../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function UpdateRequiredLink() {
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [newLink, setNewLink] = useState({ id: '', link: '', desc: '' });
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const courseId = searchParams.get('courseId');
  const lessonId = searchParams.get('lessonId');
  const linkId = searchParams.get('linkId');
  const link = searchParams.get('link');
  let linkIdArr = linkId ? linkId.split(',') : [];
  let linkArr = link ? link.split(',') : [];
  const [UrlId, setUrlId] = useState('');

  const selectedUrl = UrlId
    ? (() => {
        const originalUrl = linkArr[linkIdArr.indexOf(UrlId)];
        const videoIdRegex =
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^?&/]+)/;
        const match = originalUrl.match(videoIdRegex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
      })()
    : null;
  const validationSchema = yup.object({
    requiredLinks: yup.array().of(
      yup.object({
        link: yup.string().url('Invalid link'),
        desc: yup.string(),
      })
    ),
  });

  const handleSubmit = async (value) => {
    if (formik.values.requiredLinks.length == 0) {
      toast.error('Please select at least one link ');
      return;
    }
    const formData = new FormData();

    // Serialize the entire requiredLinks array as a JSON string
    formData.append('requiredLinks', JSON.stringify(value.requiredLinks));

    formData.append('course', value.course);
    formData.append('section', value.section);

    const response = await dispatch(
      addRequiredLink({ id: lessonId, value: formData, flag: 'update' })
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
      requiredLinks: [],
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  // Handling requiredLinks
  const handleAddLink = () => {
    if (
      newLink.link.trim() !== '' &&
      newLink.desc.trim() !== '' &&
      newLink.id.trim() !== ''
    ) {
      formik.setFieldValue('requiredLinks', [
        ...formik.values.requiredLinks,
        newLink,
      ]);
      setNewLink({ id: '', link: '', desc: '' });
    }
  };

  const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = formik.values.requiredLinks.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue('requiredLinks', updatedLinks);
  };

  const handleEditLink = (indexToEdit, newValue) => {
    const updatedLinks = formik.values.requiredLinks.map((link, index) =>
      index === indexToEdit ? newValue : link
    );
    formik.setFieldValue('requiredLinks', updatedLinks);
  };
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Update Required Link</title>
        <meta name="description" content="Update Required Link page" />
        <meta
          name="keywords"
          content="Update Required Link, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="container mx-auto">
        <HeadSection
          title="update Required Link Tools"
          subTitle="Required Link"
          link="update Required Link"
        />
       
        <div className="dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg">
          <h3 className="text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5">
            Basic Info
          </h3>
          <form className="space-y-5 py-10" onSubmit={formik.handleSubmit}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
                <div>
                  <label
                    htmlFor="desId"
                    className="font-semibold text-gray-800 dark:text-gray-300"
                  >
                    Required Link Id:
                  </label>
                  <select
                    id="desId"
                    value={newLink.id}
                    onChange={(e) => {
                      setNewLink({ ...newLink, id: e.target.value });
                      setUrlId(e.target.value);
                    }}
                    className="w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  >
                    <option value="" disabled>
                      Select Required link ID
                    </option>
                    {linkIdArr.map((desId, index) => (
                      <option
                        className="text-black dark:text-white"
                        key={desId}
                        value={desId}
                      >
                        {desId} - {linkArr[index]}
                      </option>
                    ))}
                  </select>
                </div>

                <InputField
                  onChange={(e) =>
                    setNewLink({ ...newLink, link: e.target.value })
                  }
                  value={newLink.link}
                  name="link"
                  inputType="input"
                  type="input"
                  title="New Link Tools Setup"
                  placeholder="Enter new link"
                  inputStyle="w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  icon="video"
                  iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <InputField
                  onChange={(e) =>
                    setNewLink({ ...newLink, desc: e.target.value })
                  }
                  value={newLink.desc}
                  name="desc"
                  inputType="input"
                  type="input"
                  title="New Description Tools Setup "
                  placeholder="Enter new description"
                  inputStyle="w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  icon="pencil"
                  iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />

                <button
                  type="button"
                  onClick={handleAddLink}
                  className="bg-blue-600  text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700"
                >
                  Add Link
                </button>
              </div>

              <ul className="mt-4">
                {formik.values.requiredLinks.map((content, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-50 shadow-md rounded-md mb-2 flex flex-col gap-2 dark:bg-gray-800 dark:shadow-md"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor={`link-${index}`}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Link
                        </label>
                        <input
                          id={`link-${index}`}
                          type="text"
                          value={content.link}
                          onChange={(e) =>
                            handleEditLink(index, {
                              ...content,
                              link: e.target.value,
                            })
                          }
                          className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                          placeholder="Enter link"
                        />
                      </div>
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
                          className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                          placeholder="Enter ID"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`desc-${index}`}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Description
                        </label>
                        <input
                          id={`desc-${index}`}
                          type="text"
                          value={content.desc}
                          onChange={(e) =>
                            handleEditLink(index, {
                              ...content,
                              desc: e.target.value,
                            })
                          }
                          className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                          placeholder="Enter description"
                        />
                      </div>
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {formik.errors.requiredLinks &&
                      formik.errors.requiredLinks[index] && (
                        <div className="text-red-600 text-sm mt-2">
                          {formik.errors.requiredLinks[index].link && (
                            <div>{formik.errors.requiredLinks[index].link}</div>
                          )}
                          {formik.errors.requiredLinks[index].desc && (
                            <div>{formik.errors.requiredLinks[index].desc}</div>
                          )}
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </div>
            {selectedUrl && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-300">
                  Selected Video:
                </h3>
                <iframe
                  src={selectedUrl}
                  title="Selected Video"
                  className="w-full h-64 mt-2 rounded-md shadow-md"
                  allowFullScreen
                ></iframe>
              </div>
            )}
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
                  Edit Required Link
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
