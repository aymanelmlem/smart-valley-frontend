import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  courseDetail,
  featchSection,
  watchLesson,
} from '../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import {
  addCourseInCartDatabase,
  addCourseInWhishlistDatabase,
  addOrDeleteCart,
  addOrdeleteCourseFromWhilist,
  getMyCart,
  getMyLikes,
} from '../../../redux/student/student.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';

export default function SectionStudent() {
  const { isLoading, getSection, watchLess, courseDtl } = useSelector(
    (state) => state.courses
  );
  const { isLogin } = useSelector((state) => state.students);
  const requiredLinksLength = getSection?.sections
    ?.map((req) => req.lessons.map((les) => les?.otherRequiredLinks?.length))
    .flat();
  const totalRequiredLinks = requiredLinksLength?.reduce(
    (acc, length) => acc + length,
    0
  );
  const fileLength = getSection?.sections
    ?.map((req) => req.lessons.map((les) => les?.pdfs?.length))
    .flat();
  const totalFileLength = fileLength?.reduce((acc, length) => acc + length, 0);
  const videoLength = getSection?.sections
    ?.map((req) => req.lessons.map((les) => les?.videos?.length))
    .flat();
  const totalvideoLength = videoLength?.reduce(
    (acc, length) => acc + length,
    0
  );
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseIds, setCourseIds] = useState({ cousresIds: [] });
  const [courseIdsLikes, setCourseIdsLikes] = useState({ cousresIds: [] });
  const [showCartIcon, setShowCartIcon] = useState(() => {
    return localStorage.getItem(`cartMessage_${courseId}`) || '';
  });
  const [showLikesIcon, setShowLikesIcon] = useState(() => {
    return localStorage.getItem(`likesMessage_${courseId}`) || '';
  });
    const [urlVedio, setUrlVedio] = useState(null);
  
  useEffect(() => {
    if (courseId) {
      dispatch(featchSection(courseId));
      dispatch(courseDetail(courseId));
    }
    if (courseId && isLogin) {
      dispatch(watchLesson(courseId));
    }
  }, [dispatch, courseId, isLogin]);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!getSection) {
    return <div>No course data available</div>;
  }
  const FileIcon = ({ url }) => {
    const getFileExtension = (url) => {
      return url.split('.').pop();
    };

    const fileExtension = getFileExtension(url);

    switch (fileExtension) {
      case 'pdf':
        return <i className="fa-solid fa-file-pdf text-blue-600"></i>;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <i className="fa-solid fa-file-image text-blue-600"></i>;
      case 'doc':
      case 'docx':
        return <i className="fa-solid fa-file-word text-blue-600"></i>;
      case 'xls':
      case 'xlsx':
        return <i className="fa-solid fa-file-excel text-blue-600"></i>;
      default:
        return <i className="fa-solid fa-file text-blue-600"></i>;
    }
  };
  const handleCart = async (id) => {
    const response = await dispatch(addOrDeleteCart(id));
    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      setShowCartIcon(response?.payload?.message);
      setCourseIds(id);
      localStorage.setItem(`cartMessage_${id}`, response?.payload?.message);
      dispatch(getMyCart());
      dispatch(addCourseInCartDatabase({ value: courseIds }));
    } else {
      toast.error(response.payload.message);
    }
  };
  const handleWhilsit = async (id) => {
    const response = await dispatch(addOrdeleteCourseFromWhilist(id));
    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      setShowLikesIcon(response?.payload?.message);
      setCourseIdsLikes(id);
      dispatch(addCourseInWhishlistDatabase({ value: courseIdsLikes }));
      dispatch(getMyLikes());
      localStorage.setItem(`likesMessage_${id}`, response.payload.message);
    } else {
      toast.error(response.payload.message);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lessons</title>
        <meta name="description" content="Lessons page" />
        <meta name="keywords" content="Lessons, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      {getSection?.sections?.length > 0 ? (
        <div className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl mx-auto py-24 px-5 lg:px-28">
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

            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left Side: Course Info */}
                <div className="flex flex-col space-y-6 w-full md:w-2/3">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
                    {courseDtl?.course.courseName}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {courseDtl?.course.courseDescription}
                  </p>
                  <div className="flex flex-col gap-5">
                    <Link
                      to={`/InstructorDetails/${courseDtl?.course?.instructor}`}
                      className="dark:text-white text-gray-900"
                    >
                      Teached By{' '}
                      <span className="text-blue-600 dark:text-blue-300 underline">
                        {courseDtl.course.teachedBy}
                      </span>
                    </Link>
                    {watchLess?.message ==
                      'the user can access the data of course now' && (
                      <Link
                        className="text-white  bg-blue-700 bg-opacity-70 dark:bg-opacity-50 p-3 rounded-md w-fit hover:bg-blue-800 hover:bg-opacity-55 transition duration-300"
                        to={`/allexam/${courseDtl.course._id}`}
                      >
                        Exam Course
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Side: Image and Price */}
                <div className="w-full md:w-80 bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
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

            <h2 className="text-2xl mb-5 pt-5 md:pt-32 font-bold text-gray-900 dark:text-gray-100">
              Course content
            </h2>
            <div className="flex flex-row-reverse flex-wrap gap-5  items-start  ">
              <div className="flex-1">
                {getSection?.sections?.map((sec) => (
                  <Fragment key={sec?._id}>
                    <div className="divide-y  divide-gray-100 dark:divide-gray-700 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 mb-4 shadow-md">
                      <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 dark:text-gray-100 relative">
                          <div className="flex gap-6 items-center justify-between w-full">
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
                              {sec?.lessons?.length} Lectures
                            </h4>
                          </div>
                        </summary>
                        <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
                          {sec?.sectionDescribtion}
                        </p>
                        <h4 className="mt-4 text-xl text-gray-900 dark:text-gray-100">
                          Objective Section
                        </h4>
                        <div className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300 flex flex-wrap gap-4">
                          {sec.objectiveFromSection.map((obj, index) => (
                            <span
                              key={index}
                              className="border border-teal-400 dark:border-teal-600 bg-teal-100 dark:bg-teal-900 rounded-md shadow-md py-2 px-10 text-sm text-gray-900 dark:text-gray-100"
                            >
                              {obj.objective}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5">
                          {sec.lessons.map((les, index) => (
                            <div
                              key={les._id}
                              className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg mb-6 bg-white dark:bg-gray-800"
                            >
                              <div className="flex justify-between items-center relative">
                                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                  Lesson {index + 1}
                                </h2>
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
                                  {les.whatWillYouLeanAfterThisLesson}
                                </p>
                              </div>
                              <div className="mt-4">
                                {watchLess?.message ==
                                  'the user can access the data of course now' &&
                                isLogin ? (
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
                                              onClick={() =>{
                                                handleWatchVideo(
                                                  vid.videoUrl,
                                                  les._id
                                                )
                                                setUrlVedio(vid.videoUrl)
                                              }
                                              }
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
                                              Watch Video - {index + 1}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                              {watchLess?.message ==
                                'the user can access the data of course now' &&
                              isLogin ? (
                                <>
                                  {les.otherRequiredLinks.length > 0 && (
                                    <div className="mt-6">
                                      <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                        Required Tools
                                      </h5>
                                      <div className="space-y-3">
                                        {les.otherRequiredLinks.map(
                                          (req, index) => (
                                            <div
                                              key={req.id}
                                              className="flex items-center gap-3 p-4 border border-teal-200 dark:border-teal-700 bg-teal-50 dark:bg-teal-900 rounded-lg"
                                            >
                                              <i className="fa-solid fa-triangle-exclamation text-teal-600 dark:text-teal-400"></i>
                                              <a
                                                href={req.link}
                                                target="_blank"
                                                className="underline text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition duration-300"
                                              >
                                                {req.Describtion}
                                              </a>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="mt-6">
                                  <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                    Required Tools
                                  </h5>
                                  <div className="space-y-3">
                                    {les.otherRequiredLinks.map((req) => (
                                      <div
                                        key={req.id}
                                        className="flex items-center gap-3 p-4 border border-teal-200 dark:border-teal-700 bg-teal-50 dark:bg-teal-900 rounded-lg"
                                      >
                                        <i className="fa-solid fa-triangle-exclamation text-teal-600 dark:text-teal-400"></i>
                                        <div className="underline text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition duration-300">
                                          {req.Describtion}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {watchLess?.message ==
                                'the user can access the data of course now' &&
                              isLogin ? (
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
                                            className={`flex items-center gap-3 p-4 border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 rounded-lg`}
                                          >
                                            <FileIcon url={pdf.secure_url} />
                                            <a
                                              href={pdf.secure_url}
                                              target="_blank"
                                              className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-300"
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
                                  {les.pdfs.length > 0 && (
                                    <div className="mt-6">
                                      <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                        Lesson Files
                                      </h5>
                                      <div className="space-y-3">
                                        {les.pdfs.map((pdf) => (
                                          <div
                                            key={pdf.id}
                                            className={`flex items-center gap-3 p-4 border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 rounded-lg`}
                                          >
                                            <FileIcon url={pdf.secure_url} />
                                            <div className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-300">
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
              <div className="bg-gray-50   dark:bg-gray-800 p-4 rounded-md shadow-lg">
                <h3 className="text-gray-900 font-semibold dark:text-white text-lg">
                  This Course Includes
                </h3>

                {/* Required Tools Section */}
                {totalRequiredLinks > 0 && (
                  <div className="flex gap-3 items-center mt-3">
                    <i className="fa-solid fa-gear text-gray-900 dark:text-gray-200"></i>
                    <p className="text-gray-800 dark:text-gray-400 text-sm">
                      {totalRequiredLinks > 0
                        ? `${totalRequiredLinks} required tools to download`
                        : ''}
                    </p>
                  </div>
                )}

                {/* Video Lessons Section */}
                {totalvideoLength > 0 && (
                  <div className="flex gap-3 items-center mt-3">
                    <i className="fa-regular fa-circle-play text-gray-900 dark:text-gray-200"></i>
                    <p className="text-gray-800 dark:text-gray-400 text-sm">
                      {totalvideoLength > 0
                        ? `${totalvideoLength} video lessons`
                        : ''}
                    </p>
                  </div>
                )}

                {/* Articles Section */}
                {totalFileLength > 0 && (
                  <div className="flex gap-3 items-center mt-3">
                    <i className="fa-regular fa-newspaper text-gray-900 dark:text-gray-200"></i>
                    <p className="text-gray-800 dark:text-gray-400 text-sm">
                      {totalFileLength > 0 ? `${totalFileLength} articles` : ''}
                    </p>
                  </div>
                )}

                {/* Certificate Section */}
                <div className="flex gap-3 items-center mt-3">
                  <i className="fa-solid fa-trophy text-gray-900 dark:text-gray-200"></i>
                  <p className="text-gray-800 dark:text-gray-400 text-sm">
                    Certificate of completion
                  </p>
                </div>

                {/* Action Buttons */}
                {watchLess?.message ==
                'the user can access the data of course now' ? (
                  ''
                ) : (
                  <>
                    {isLogin && (
                      <div className="mt-4 flex gap-4">
                        <button
                          onClick={() => handleCart(courseId)}
                          className="bg-blue-500 dark:bg-blue-700 text-white p-2 rounded-md flex-1 hover:bg-blue-600 dark:hover:bg-blue-600 transition duration-200"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleWhilsit(courseId)}
                          className="bg-gray-300 dark:bg-gray-700 text-white px-3 rounded-md flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
                        >
                          {showLikesIcon ===
                          'The course has been added to your likes list successfully.' ? (
                            <>
                              <i className="fa-solid text-lg text-red-600 dark:text-red-700 fa-heart"></i>
                            </>
                          ) : (
                            <i className="fa-regular text-lg  fa-heart"></i>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-32 text-gray-800 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-16 h-16 mb-4 text-gray-600 dark:text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0c-3.866 0-7 3.134-7 7v4h14v-4c0-3.866-3.134-7-7-7z"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No Lessons Available</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Please check back later to see newly added lessons.
          </p>
          <Link
            to="/courses"
            className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </>
  );
}
