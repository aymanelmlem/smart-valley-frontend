import { useState } from 'react';
import InputField from '../../../../components/Input/InputField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import HeadSection from '../../../../components/headSection/HeadSection';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addLesson } from '../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function AddLesson() {
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const courseId = searchParams.get('courseId');
  const [videosInput, setVideosInput] = useState('');
  const [uploadTextInput, setUploadTextInput] = useState('');
  const [newLink, setNewLink] = useState({ link: '', Describtion: '' });
  const [showInput, setShowInput] = useState({
    requiredLink: false,
    videoLesson: false,
    pdf: false,
  });

  const toggleInput = (inputKey) => {
    setShowInput((prevState) => ({
      ...prevState,
      [inputKey]: !prevState[inputKey],
    }));
  };
  const validationSchema = yup.object({
    lessonName: yup
      .string()
      .required('Lesson Name is required')
      .min(3, 'Lesson Name must be at least 3 characters'),
    lessonDescribtion: yup
      .string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters'),
    whatWillYouLeanAfterThisLesson: yup
      .string()
      .required('Please provide what Will You Lean This Lesson')
      .min(10, 'what Will You Lean This Lesson must be at least 10 characters'),
    timeOfLesson: yup
      .string()
      .required('Time of lesson is required')
      .matches(/^\d{2}:\d{2}:\d{2}$/, 'Time format should be HH:MM:SS'),

    videos: yup.array().of(yup.string().url('Please provide a valid URL')),

    otherRequiredLinks: yup.array().of(
      yup.object({
        link: yup.string().url('Invalid link'),
        Describtion: yup.string(),
      })
    ),
    uploadText: yup.array().of(yup.string()),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === 'uploadText') {
        formData.append(key, JSON.stringify(values[key]));
      } else if (key === 'file2') {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      } else if (key === 'otherRequiredLinks') {
        if (values[key] && values[key].length > 0) {
          formData.append(key, JSON.stringify(values[key]));
        }
      } else if (key === 'videos') {
        if (values[key] && values[key].length > 0) {
          formData.append(key, JSON.stringify(values[key]));
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      const response = await dispatch(
        addLesson({ id: courseId, value: formData })
      );

      if (response?.payload?.success) {
        toast.success(response.payload.message);
        formik.resetForm();
      } else {
        toast.error(
          typeof response.payload.message === 'string'
            ? response.payload.message
            : 'An unknown error occurred'
        );
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
    }
  };

  const formik = useFormik({
    initialValues: {
      lessonName: '',
      lessonDescribtion: '',
      whatWillYouLeanAfterThisLesson: '',
      section: sectionId,
      timeOfLesson: '',
      videos: [],
      otherRequiredLinks: [],
      uploadText: [],
      file2: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Handling Videos
  const handleAddVideoUrl = () => {
    if (videosInput.trim() !== '') {
      formik.setFieldValue('videos', [...formik.values.videos, videosInput]);
      formik.setFieldTouched('videos', true);
      setVideosInput('');
    }
  };

  const handleRemoveVideoUrl = (indexToRemove) => {
    const updatedVideo = formik.values.videos.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue('videos', updatedVideo);
  };

  const handleEditVideoUrl = (indexToEdit, newValue) => {
    const updatedVideo = formik.values.videos.map((content, index) =>
      index === indexToEdit ? newValue : content
    );
    formik.setFieldValue('videos', updatedVideo);
  };

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

  // Handling otherRequiredLinks
  const handleAddLink = () => {
    if (newLink.link.trim() !== '' && newLink.Describtion.trim() !== '') {
      formik.setFieldValue('otherRequiredLinks', [
        ...formik.values.otherRequiredLinks,
        newLink,
      ]);
      setNewLink({ link: '', Describtion: '' });
    }
  };

  const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = formik.values.otherRequiredLinks.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue('otherRequiredLinks', updatedLinks);
  };

  const handleEditLink = (indexToEdit, newValue) => {
    const updatedLinks = formik.values.otherRequiredLinks.map((link, index) =>
      index === indexToEdit ? newValue : link
    );
    formik.setFieldValue('otherRequiredLinks', updatedLinks);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Lessons</title>
        <meta name="description" content="Add Lessons page" />
        <meta name="keywords" content="Add Lessons, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection title="Add Lesson" subTitle="Lessons" link="Add Lessons" />

        <div className="dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg relative  overflow-hidden">
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45"></div>
          <h3 className="text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5">
            Basic Info
          </h3>
          <form className="space-y-5 py-10" onSubmit={formik.handleSubmit}>
            <div className="flex gap-5 items-center flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lessonName}
                name="lessonName"
                inputType="text"
                type="input"
                title={
                  formik.errors.lessonName && formik.touched.lessonName
                    ? `${formik.errors.lessonName}`
                    : 'Lesson Name'
                }
                styleSpan={
                  formik.errors.lessonName && formik.touched.lessonName
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.lessonName && formik.touched.lessonName
                    ? `${formik.errors.lessonName}`
                    : 'Lesson Name'
                }
                inputStyle={
                  formik.errors.lessonName && formik.touched.lessonName
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.lessonName && formik.touched.lessonName
                    ? 'bug'
                    : 'book'
                }
                iconStyle={
                  formik.errors.lessonName && formik.touched.lessonName
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.timeOfLesson}
                name="timeOfLesson"
                inputType="text"
                type="input"
                title={
                  formik.errors.timeOfLesson && formik.touched.timeOfLesson
                    ? `${formik.errors.timeOfLesson}`
                    : 'Expected Time to finish lesson'
                }
                styleSpan={
                  formik.errors.timeOfLesson && formik.touched.timeOfLesson
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.timeOfLesson && formik.touched.timeOfLesson
                    ? `${formik.errors.timeOfLesson}`
                    : 'Time Of Lesson'
                }
                inputStyle={
                  formik.errors.timeOfLesson && formik.touched.timeOfLesson
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.timeOfLesson && formik.touched.timeOfLesson
                    ? 'bug'
                    : 'clock'
                }
                iconStyle={
                  formik.errors.timeOfLesson && formik.touched.timeOfLesson
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
            </div>
            <div className="flex gap-5 items-center flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.whatWillYouLeanAfterThisLesson}
                name="whatWillYouLeanAfterThisLesson"
                inputType="text"
                type="textarea"
                title={
                  formik.errors.whatWillYouLeanAfterThisLesson &&
                  formik.touched.whatWillYouLeanAfterThisLesson
                    ? `${formik.errors.whatWillYouLeanAfterThisLesson}`
                    : 'what Will You Learn in Lesson'
                }
                styleSpan={
                  formik.errors.whatWillYouLeanAfterThisLesson &&
                  formik.touched.whatWillYouLeanAfterThisLesson
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.whatWillYouLeanAfterThisLesson &&
                  formik.touched.whatWillYouLeanAfterThisLesson
                    ? `${formik.errors.whatWillYouLeanAfterThisLesson}`
                    : 'what Will You Learn in Lesson'
                }
                inputStyle={
                  formik.errors.whatWillYouLeanAfterThisLesson &&
                  formik.touched.whatWillYouLeanAfterThisLesson
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.whatWillYouLeanAfterThisLesson &&
                  formik.touched.whatWillYouLeanAfterThisLesson
                    ? 'bug'
                    : 'person-chalkboard'
                }
                iconStyle={
                  formik.errors.whatWillYouLeanAfterThisLesson &&
                  formik.touched.whatWillYouLeanAfterThisLesson
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lessonDescribtion}
                name="lessonDescribtion"
                inputType="text"
                type="textarea"
                title={
                  formik.errors.lessonDescribtion &&
                  formik.touched.lessonDescribtion
                    ? `${formik.errors.lessonDescribtion}`
                    : 'Description'
                }
                styleSpan={
                  formik.errors.lessonDescribtion &&
                  formik.touched.lessonDescribtion
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.lessonDescribtion &&
                  formik.touched.lessonDescribtion
                    ? `${formik.errors.lessonDescribtion}`
                    : 'Description'
                }
                inputStyle={
                  formik.errors.lessonDescribtion &&
                  formik.touched.lessonDescribtion
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.lessonDescribtion &&
                  formik.touched.lessonDescribtion
                    ? 'bug'
                    : 'arrow-up-a-z'
                }
                iconStyle={
                  formik.errors.lessonDescribtion &&
                  formik.touched.lessonDescribtion
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
            </div>
            {/* Video Lesson Url */}
            <div>
              <div className="flex items-center gap-3">
                <span>Add Video Lesson</span>
                <label
                  htmlFor="videoLessonToggle"
                  className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500"
                >
                  <input
                    type="checkbox"
                    id="videoLessonToggle"
                    className="peer sr-only"
                    checked={showInput.videoLesson}
                    onChange={() => toggleInput('videoLesson')}
                  />
                  <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-blue-600">
                    <svg
                      data-unchecked-icon
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-4 ${
                        showInput.videoLesson ? 'hidden' : ''
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <svg
                      data-checked-icon
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-4 ${
                        showInput.videoLesson ? '' : 'hidden'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              {showInput.videoLesson && (
                <div>
                  <div className="flex gap-5 justify-center flex-wrap xl:flex-nowrap mt-4">
                    <InputField
                      onChange={(e) => setVideosInput(e.target.value)}
                      value={videosInput}
                      name="videos"
                      inputType="input"
                      type="input"
                      title={
                        formik.errors.videos && formik.touched.videos
                          ? `${formik.errors.videos}`
                          : 'Video Lesson Url'
                      }
                      styleSpan={
                        formik.errors.videos && formik.touched.videos
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }
                      placeholder="Enter videos link"
                      inputStyle={
                        formik.errors.videos && formik.touched.videos
                          ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                          : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                      }
                      icon={
                        formik.errors.videos && formik.touched.videos
                          ? 'bug'
                          : 'video'
                      }
                      iconStyle={
                        formik.errors.videos && formik.touched.videos
                          ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                      }
                    />
                    <button
                      type="button"
                      onClick={handleAddVideoUrl}
                      className="bg-blue-600 text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="mt-4">
                    {formik.values.videos.map((content, index) => (
                      <li
                        key={index}
                        className="p-2 bg-gray-100 dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center"
                      >
                        <input
                          type="text"
                          value={content}
                          onChange={(e) =>
                            handleEditVideoUrl(index, e.target.value)
                          }
                          className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:focus:border-gray-400 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 bg-white text-gray-800 placeholder-gray-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveVideoUrl(index)}
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Video Setup Tools */}
            <div>
              <div className="flex items-center gap-3">
                <span>Add Link Setup Tools</span>
                <label
                  htmlFor="requiredLinkToggle"
                  className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500"
                >
                  <input
                    type="checkbox"
                    id="requiredLinkToggle"
                    className="peer sr-only"
                    checked={showInput.requiredLink}
                    onChange={() => toggleInput('requiredLink')}
                  />
                  <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-blue-600">
                    <svg
                      data-unchecked-icon
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-4 ${
                        showInput.requiredLink ? 'hidden' : ''
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <svg
                      data-checked-icon
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-4 ${
                        showInput.requiredLink ? '' : 'hidden'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              {showInput.requiredLink && (
                <div>
                  <div className="flex gap-5 justify-center flex-wrap xl:flex-nowrap mt-4">
                    <InputField
                      onChange={(e) =>
                        setNewLink({ ...newLink, link: e.target.value })
                      }
                      value={newLink.link}
                      name="link"
                      inputType="input"
                      type="input"
                      title="Link Tools Setup (document or video)"
                      placeholder="Enter link"
                      inputStyle="w-full focus:ring-0 shadow-md dark:border dark:border-gray-700 rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                      icon="video"
                      iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <InputField
                      onChange={(e) =>
                        setNewLink({ ...newLink, Describtion: e.target.value })
                      }
                      value={newLink.Describtion}
                      name="Describtion"
                      inputType="input"
                      type="input"
                      title="Description Tools Setup (document or video) "
                      placeholder="Enter description"
                      inputStyle="w-full focus:ring-0 shadow-md dark:border dark:border-gray-700 rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                      icon="pencil"
                      iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="bg-blue-600 text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700"
                    >
                      Add Link
                    </button>
                  </div>

                  <ul className="mt-4">
                    {formik.values.otherRequiredLinks.map((content, index) => (
                      <li
                        key={index}
                        className="p-2 bg-gray-100 dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center"
                      >
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={content.link}
                            onChange={(e) =>
                              handleEditLink(index, {
                                ...content,
                                link: e.target.value,
                              })
                            }
                            className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:focus:border-gray-400 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 bg-white text-gray-800 placeholder-gray-500"
                          />
                          <input
                            type="text"
                            value={content.Describtion}
                            onChange={(e) =>
                              handleEditLink(index, {
                                ...content,
                                Describtion: e.target.value,
                              })
                            }
                            className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:focus:border-gray-400 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 bg-white text-gray-800 placeholder-gray-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(index)}
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                        {formik.errors.otherRequiredLinks &&
                          formik.errors.otherRequiredLinks[index] && (
                            <div className="text-red-600 text-sm mt-2">
                              {formik.errors.otherRequiredLinks[index].link && (
                                <div>
                                  {formik.errors.otherRequiredLinks[index].link}
                                </div>
                              )}
                              {formik.errors.otherRequiredLinks[index]
                                .Describtion && (
                                <div>
                                  {
                                    formik.errors.otherRequiredLinks[index]
                                      .Describtion
                                  }
                                </div>
                              )}
                            </div>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* File */}

            <div>
              <div className="flex items-center gap-3">
                <span>Add File Lesson</span>
                <label
                  htmlFor="pdfToggle"
                  className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500"
                >
                  <input
                    type="checkbox"
                    id="pdfToggle"
                    className="peer sr-only"
                    checked={showInput.pdf}
                    onChange={() => toggleInput('pdf')}
                  />
                  <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-blue-600">
                    <svg
                      data-unchecked-icon
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-4 ${showInput.pdf ? 'hidden' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <svg
                      data-checked-icon
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-4 ${showInput.pdf ? '' : 'hidden'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              {showInput.pdf && (
                <div className="mt-4">
                  <input
                    type="file"
                    name="file2"
                    onChange={(e) =>
                      formik.setFieldValue('file2', e.currentTarget.files[0])
                    }
                    className={`w-full focus:ring-0 shadow-md dark:border  rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500 ${
                      formik.errors.file2
                        ? 'border-red-500 text-red-800'
                        : 'text-gray-800'
                    }`}
                  />
                  {formik.errors.file2 && (
                    <div className="text-red-600 text-sm mt-2">
                      {formik.errors.file2}
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
                    <ul className="mt-4">
                      {formik.values.uploadText.map((content, index) => (
                        <li
                          key={index}
                          className="p-2 bg-gray-100 dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center"
                        >
                          <input
                            type="text"
                            value={content}
                            onChange={(e) =>
                              handleEditUploadText(index, e.target.value)
                            }
                            className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:focus:border-gray-400 dark:border-gray-500 dark:bg-gray-700  dark:text-gray-300 bg-white text-gray-800 placeholder-gray-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveUploadText(index)}
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
                  className="bg-blue-800 dark:hover:text-white text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold"
                >
                  Add Lesson
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
