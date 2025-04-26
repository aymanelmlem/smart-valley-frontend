import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  courseDetail,
  deleteLesson,
  deleteSection,
  featchSection,
} from '../../../../../redux/courses/courses.slice';
import LoadingBetweenPage from '../../../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { toast } from 'react-toastify';
import { watchLessonIns } from '../../../../../redux/instructor/instructorSlice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function AllSection() {
  const { isLoading, getSection, courseDtl } = useSelector(
    (state) => state.courses
  );
  const { watchLessIns } = useSelector((state) => state.instructor);

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(null);
  const [urlVedio, setUrlVedio] = useState(null);
  useEffect(() => {
    if (courseId) {
      dispatch(featchSection(courseId));
      dispatch(courseDetail(courseId));
      dispatch(watchLessonIns(courseId));
    }
  }, [dispatch, courseId]);

  const removeSection = async (id) => {
    const response = await dispatch(deleteSection(id));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      dispatch(featchSection(courseId));
    } else {
      toast.error(response.payload.message);
    }
  };

  const handleWatchVideo = (url) => {

    let videoSrc;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('v=')
        ? url.split('v=')[1].split('&')[0]
        : url.split('/').pop();
      videoSrc = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      videoSrc = `https://player.vimeo.com/video/${videoId}`;
    } else {
      videoSrc = url; // Use URL directly for other video types
    }
    setSelectedVideo(videoSrc);
  };

  const handleToggle = (id) => {
    setToggleMenu(toggleMenu === id ? null : id);
  };

  const removeLesson = async (id) => {
    const response = await dispatch(deleteLesson(id));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      dispatch(featchSection(courseId));
    } else {
      toast.error(response.payload.message);
    }
  };
  if (isLoading) {
    return <LoadingBetweenPage />;
  }
  if (!getSection || !getSection.sections) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-gray-600">
          Section not available. Please try again later.
        </p>
      </div>
    );
  }

  const FileIcon = ({ url }) => {
    const getFileExtension = (url) => {
      return url.split('.').pop();
    };

    const fileExtension = getFileExtension(url);

    switch (fileExtension) {
      case 'pdf':
        return <i className="fa-solid fa-file-pdf text-teal-600"></i>;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <i className="fa-solid fa-file-image text-teal-600"></i>;
      case 'doc':
      case 'docx':
        return <i className="fa-solid fa-file-word text-teal-600"></i>;
      case 'xls':
      case 'xlsx':
        return <i className="fa-solid fa-file-excel text-teal-600"></i>;
      default:
        return <i className="fa-solid fa-file text-teal-600"></i>;
    }
  };
 
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> lessosns</title>
        <meta name="description" content="lessosns page" />
        <meta name="keywords" content=" lessosns, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      {getSection?.sections.length > 0 ? (
        <div className="max-w-screen-xl mx-auto ">
          {selectedVideo && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800">
                <button
                  className="absolute top-2 right-2 text-white bg-black dark:bg-gray-600 h-10 w-10 rounded-full p-2"
                  onClick={() => setSelectedVideo(null)}
                >
                  &times;
                </button>
                <iframe
                  width="100%"
                  height="500"
                  src={selectedVideo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="bg-red-600 text-red-600 border-l-4 border-red-600 bg-opacity-50 p-4">
                  {' '}
                  when there is problem in video, you can watch in{' '}
                  <a
                    className="text-red-600 underline"
                    href={urlVedio}
                    target="_blank"
                  >
                    youtube
                  </a>
                </p>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Side: Course Info */}
              <div className="flex flex-col space-y-6 w-full md:w-2/3">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
                  {courseDtl?.course.courseName}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {courseDtl?.course.courseDescription}
                </p>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Teached By:
                  </span>{' '}
                  {courseDtl?.course.teachedBy}
                </div>
              </div>

              {/* Right Side: Image and Price */}
              <div className="w-full md:w-80 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={courseDtl?.course?.coursePicture?.secure_url}
                    alt={courseDtl?.course?.courseName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {courseDtl.course.coursePrice} EGP
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {courseDtl.course.courseHours} h
                </p>

                {/* Video Links */}
                <div className="mt-6 space-y-4">
                  {courseDtl.course.accesibleByAnyOne?.videoUrl?.map(
                    (video, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <i className="fa-solid fa-video text-blue-500 dark:text-blue-400"></i>
                        <a
                          href="#"
                          onClick={() => handleWatchVideo(video.url)}
                          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500"
                        >
                          {courseDtl?.course.accesibleByAnyOne?.describtion[
                            index
                          ]?.describtionContent.slice(0, 25)}
                        </a>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl mb-5 mt-5 font-bold text-gray-900 dark:text-gray-100">
            Course content
          </h2>
          {getSection?.sections.map((sec) => (
            <Fragment key={sec._id}>
              <div className="divide-y divide-gray-100 dark:divide-gray-700 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 my-10 shadow-md">
                <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 dark:text-gray-100 relative">
                    <div className="flex gap-6 items-center justify-between  w-full ">
                      <div className="flex gap-6 items-center">
                        <span className="relative size-5 shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          {sec.sectionName}
                        </h3>
                      </div>
                      <h4 className="text-sm font-medium pr-4 text-gray-900 dark:text-gray-300">
                        {sec.lessons.length} Lectures
                      </h4>
                    </div>
                    <p
                      onClick={() => handleToggle(sec._id)}
                      className="bg-gray-100  dark:bg-gray-800 p-2 w-7 h-7 rounded-md flex justify-center items-center"
                    >
                      <i className="fa-solid fa-ellipsis-vertical "></i>
                    </p>
                    <div className="absolute right-0 mb-10 z-30">
                      {toggleMenu === sec._id && (
                        <div className="w-48 absolute right-11  dark:bg-gray-800   bg-gray-50 shadow-md p-2 rounded-md mb-10">
                          <ul>
                            <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-red-500 text-red-700 font-bold">
                              <button
                                className="flex items-center gap-1"
                                onClick={() => removeSection(sec._id)}
                              >
                                <p>Delete Section</p>
                              </button>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-blue-500 text-blue-800 font-bold">
                              <Link
                                to={`/panel/updateSection?courseId=${courseId}&sectionId=${
                                  sec._id
                                }&sectionName=${encodeURIComponent(
                                  sec.sectionName
                                )}&sectionDescribtion=${encodeURIComponent(
                                  sec.sectionDescribtion
                                )}`}
                              >
                                update Section
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-green-500 text-green-800 font-bold">
                              <Link
                                to={`/panel/addObjectiveSection?sectionId=${sec._id}`}
                              >
                                Add objective
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-red-500 text-red-800 font-bold">
                              <Link
                                to={`/panel/deleteObjectiveSection?sectionId=${
                                  sec._id
                                }&objective=${encodeURIComponent(
                                  sec.objectiveFromSection.map(
                                    (obj) => obj.objective
                                  )
                                )}&objectiveId=${encodeURIComponent(
                                  sec.objectiveFromSection.map(
                                    (obj) => obj.objectiveId
                                  )
                                )}`}
                              >
                                Delete objective
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-purple-500 text-purple-800 font-bold">
                              <Link
                                to={`/panel/updateObjectiveSection?sectionId=${
                                  sec._id
                                }&objective=${encodeURIComponent(
                                  sec.objectiveFromSection.map(
                                    (obj) => obj.objective
                                  )
                                )}&objectiveId=${encodeURIComponent(
                                  sec.objectiveFromSection.map(
                                    (obj) => obj.objectiveId
                                  )
                                )}`}
                              >
                                Update objective
                              </Link>
                            </li>
                            <li className="text-sm cursor-pointer hover:bg-gray-100  dark:hover:bg-gray-700   duration-300 transition ease-in  p-2 dark:text-teal-500 text-teal-800 font-boldd">
                              <Link
                                to={`/panel/addLesson?sectionId=${sec._id}&courseId=${courseId}`}
                              >
                                Add Lesson
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
                    {sec.sectionDescribtion}
                  </p>
                  <h4 className="mt-4 text-xl text-gray-900 dark:text-gray-100">
                    Objective Section
                  </h4>
                  <div className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300 flex flex-wrap gap-4">
                    {sec?.objectiveFromSection.map((obj, index) => (
                      <span
                        key={index}
                        className="border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md py-2 px-10 text-sm text-gray-900 dark:text-gray-100"
                      >
                        {obj.objective}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5">
                    {sec?.lessons.map((les, index) => (
                      <div
                        key={les._id}
                        className="border border-gray-200 p-4 dark:border-gray-700 rounded-lg mb-6  bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="flex justify-between items-center relative">
                          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Lesson {index + 1}
                          </h2>
                          <p
                            onClick={() => handleToggle(les._id)}
                            className="bg-gray-100 dark:bg-gray-900 p-2 w-7 h-7 rounded-md flex justify-center items-center cursor-pointer"
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </p>
                          {toggleMenu === les._id && (
                            <div className=" absolute right-6 top-5 bg-gray-50 dark:bg-gray-900 shadow-md p-2 rounded-md mb-10">
                              <ul>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-red-500 text-red-700 font-bold  ">
                                  <button
                                    onClick={() => removeLesson(les._id)}
                                    className=" flex items-center gap-3 "
                                  >
                                    <i className="fa-solid fa-ban text-rose-600"></i>
                                    <p className="text-rose-600">
                                      Remove Lesson
                                    </p>
                                  </button>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-blue-500 text-blue-700 font-bold ">
                                  <Link
                                    to={`/panel/updateLesson?sectionId=${
                                      sec._id
                                    }&courseId=${courseId}&lessonId=${
                                      les._id
                                    }&lessonName=${encodeURIComponent(
                                      les.lessonName
                                    )}&lessonDescription=${encodeURIComponent(
                                      les.lessonDescribtion
                                    )}&lessonTime=${
                                      les.timeOfLesson
                                    }&whatWillYouLeanAfterThisLesson=${
                                      les.whatWillYouLeanAfterThisLesson
                                    }&`}
                                    className=" flex items-center gap-3"
                                  >
                                    <i className="fa-solid fa-square-pen text-blue-600"></i>
                                    <p className="text-blue-600">Edit Lesson</p>
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-sky-500 text-sky-700 font-bold  ">
                                  <Link
                                    to={`/panel/addRequiredLink?sectionId=${sec._id}&courseId=${courseId}&lessonId=${les._id}`}
                                    className="flex items-center gap-3"
                                  >
                                    <i className="fa-solid fa-square-plus text-sky-600"></i>
                                    <p className="text-sky-600">
                                      Add Required Link
                                    </p>
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-purple-500 text-purple-700 font-bold  ">
                                  <Link
                                    to={`/panel/updateRequiredLink?sectionId=${
                                      sec._id
                                    }&courseId=${courseId}&lessonId=${
                                      les._id
                                    }&linkId=${les.otherRequiredLinks.map(
                                      (link) => link.linkId
                                    )}&link=${les.otherRequiredLinks.map(
                                      (link) => link.link
                                    )}&description=${les.otherRequiredLinks.map(
                                      (link) => link.Describtion
                                    )}`}
                                    className="flex items-center gap-3  "
                                  >
                                    <i className="fa-solid fa-square-pen text-purple-600"></i>
                                    <p className="text-purple-600">
                                      Edit Required Link
                                    </p>
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-red-500 text-red-700 font-bold ">
                                  <Link
                                    to={`/panel/deleteRequiredLink?sectionId=${
                                      sec._id
                                    }&courseId=${courseId}&lessonId=${
                                      les._id
                                    }&linkId=${les.otherRequiredLinks.map(
                                      (link) => link.linkId
                                    )}&link=${les.otherRequiredLinks.map(
                                      (link) => link.link
                                    )}&description=${les.otherRequiredLinks.map(
                                      (link) => link.Describtion
                                    )}`}
                                    className="flex items-center gap-3  "
                                  >
                                    <i className="fa-solid fa-ban text-red-600"></i>
                                    <p className="text-red-600">
                                      Remove Required Link
                                    </p>
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-blue-500 text-blue-700 font-bold  ">
                                  <Link
                                    to={`/panel/addVideoLesson?sectionId=${sec._id}&courseId=${courseId}&lessonId=${les._id}`}
                                    className="flex items-center gap-3"
                                  >
                                    <i className="fa-solid fa-square-plus text-blue-600"></i>
                                    <p className="text-blue-600">
                                      Add Video Lesson
                                    </p>
                                  </Link>
                                </li>

                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-red-500 text-red-700 font-bold  ">
                                  <Link
                                    to={`/panel/deleteVideoLesson?sectionId=${
                                      sec._id
                                    }&courseId=${courseId}&lessonId=${
                                      les._id
                                    }&videoUrl=${les.videos.map(
                                      (vid) => vid.videoUrl
                                    )}&videoId=${les.videos.map(
                                      (vid) => vid.videoId
                                    )}`}
                                    className="flex items-center gap-3 "
                                  >
                                    <i className="fa-solid fa-ban text-red-600"></i>
                                    <p className="text-red-600">
                                      Delete Video Lesson
                                    </p>
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-amber-500 text-amber-700 font-bold  ">
                                  <Link
                                    to={`/panel/addFileLesson?sectionId=${sec._id}&courseId=${courseId}&lessonId=${les._id}`}
                                    className="flex items-center gap-3 "
                                  >
                                    <i className="fa-solid fa-square-plus text-amber-600"></i>
                                    <p className="text-amber-600">
                                      Add File Lesson
                                    </p>
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-teal-500 text-teal-700 font-bold  ">
                                  <Link
                                    to={`/panel/updateFileLesson?sectionId=${
                                      sec._id
                                    }&courseId=${courseId}&lessonId=${
                                      les._id
                                    }&fileId=${les.pdfs.map((file) =>
                                      encodeURIComponent(file.UploadedId)
                                    )}&file=${les.pdfs.map((file) =>
                                      encodeURIComponent(file.uploadText)
                                    )}`}
                                    className="flex items-center gap-3 "
                                  >
                                    <i className="fa-solid fa-square-pen text-teal-600"></i>
                                    <p className="text-teal-600">
                                      Update File Lesson
                                    </p>
                                  </Link>
                                </li>
                                <li className="text-sm cursor-pointer duration-300 transition ease-in hover:bg-gray-100  dark:hover:bg-gray-700   p-2 dark:text-fuchsia-500 text-fuchsia-700 font-bold  ">
                                  <Link
                                    to={`/panel/deleteFileLesson?sectionId=${
                                      sec._id
                                    }&courseId=${courseId}&lessonId=${
                                      les._id
                                    }&fileId=${les.pdfs.map((file) =>
                                      encodeURIComponent(file.UploadedId)
                                    )}&file=${les.pdfs.map((file) =>
                                      encodeURIComponent(file.uploadText)
                                    )}`}
                                    className="flex items-center gap-3 "
                                  >
                                    <i className="fa-solid fa-ban text-fuchsia-600"></i>
                                    <p className="text-fuchsia-600">
                                      Delete File Lesson
                                    </p>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="dark:text-white">
                            Expected Time to finish Lesson{' '}
                          </h3>
                          <p className="text-sm text-blue-500">
                            {les.timeOfLesson}
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {les.lessonName}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                            {les.lessonDescribtion}
                          </p>
                        </div>
                        <div className="mt-4">
                          <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                            What You Will Learn:
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            {les?.whatWillYouLeanAfterThisLesson}
                          </p>
                        </div>
                        <div className="mt-4">
                          {watchLessIns?.message ==
                          'this user can access the course data' ? (
                            <>
                              {les.videos.length > 0 && (
                                <div>
                                  <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                    Videos
                                  </h5>
                                  {les.videos.map((vid, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-3 mb-3 p-4 border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900 rounded-lg"
                                    >
                                      <i className="fa-regular fa-circle-play text-purple-600 dark:text-purple-400"></i>
                                      <a
                                        href="#"
                                        onClick={() => {
                                          handleWatchVideo(vid.videoUrl);
                                          setUrlVedio(vid.videoUrl);
                                        }}
                                        className="underline text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition duration-300"
                                      >
                                        {les.lessonName} - {index + 1}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {les.videos.length > 0 && (
                                <div>
                                  <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                    Videos
                                  </h5>
                                  {les.videos.map((vid, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-3 mb-3 p-4 border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900 rounded-lg"
                                    >
                                      <i className="fa-regular fa-circle-play text-purple-600 dark:text-purple-400"></i>
                                      <div className="underline text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition duration-300">
                                        Watch Video -{index + 1}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        {watchLessIns?.message ==
                        'this user can access the course data' ? (
                          <>
                            {les.otherRequiredLinks.length > 0 && (
                              <div className="mt-6">
                                <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                  Required Tools
                                </h5>
                                <div className="space-y-3">
                                  {les.otherRequiredLinks.map((req) => (
                                    <div
                                      key={req.id}
                                      className="flex items-center gap-3 p-4 border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 rounded-lg"
                                    >
                                      <i className="fa-solid fa-triangle-exclamation text-blue-600 dark:text-blue-400"></i>
                                      <a
                                        href={req.link}
                                        target="_blank"
                                        className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-300"
                                      >
                                        {req.Describtion}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {les?.otherRequiredLinks.length > 0 && (
                              <div className="mt-6">
                                <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                  Required Tools
                                </h5>
                                <div className="space-y-3">
                                  {les.otherRequiredLinks.map((req) => (
                                    <div
                                      key={req.id}
                                      className="flex items-center gap-3 p-4 border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 rounded-lg"
                                    >
                                      <i className="fa-solid fa-triangle-exclamation text-blue-600 dark:text-blue-400"></i>
                                      <div className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-300">
                                        {req.Describtion}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {watchLessIns?.message ==
                        'this user can access the course data' ? (
                          <>
                            {les.pdfs.length > 0 && (
                              <div className="mt-6">
                                <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                  Lesson Files
                                </h5>
                                <div className="space-y-3">
                                  {les.pdfs.map((pdf) => (
                                    <div
                                      key={pdf.id}
                                      className={`lex items-center gap-3 p-4 border border-teal-200 dark:border-teal-700 bg-blue-50 dark:bg-teal-900 rounded-lg`}
                                    >
                                      <FileIcon url={pdf.secure_url} />
                                      <a
                                        href={pdf.secure_url}
                                        target="_blank"
                                        className="underline ml-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition duration-300"
                                      >
                                        {pdf.uploadText}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {les?.pdfs.length > 0 && (
                              <div className="mt-6">
                                <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                  Lesson Files
                                </h5>
                                <div className="space-y-3">
                                  {les.pdfs.map((pdf) => (
                                    <div
                                      key={pdf.id}
                                      className={`lex items-center gap-3 p-4 border border-teal-200 dark:border-teal-700 bg-teal-50 dark:bg-teal-900 rounded-lg`}
                                    >
                                      <FileIcon url={pdf.secure_url} />
                                      <div className="underline ml-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition duration-300">
                                        {pdf.uploadText}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        <p className="flex justify-center items-center p-32 dark:text-white">
          No Lessons at the Moment
        </p>
      )}
    </>
  );
}
