import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  courseDetail,
  watchLesson,
} from '../../../../redux/courses/courses.slice';
import LoadingBetweenPage from '../../../../components/LoadingBetweenPage/LoadingBetweenPage';
import { toast } from 'react-toastify';
import { sendRequstBuyCourse } from '../../../../redux/student/student.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';

export default function CourseDetailsStudent() {
  const { isLoading, courseDtl, watchLess } = useSelector(
    (state) => state.courses
  );
  const { isLogin } = useSelector((state) => state.students);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const sendRequstToBuyingCourse = async (id) => {

    const res = await dispatch(sendRequstBuyCourse(id));
    if (res.payload.success) {
      navigate('/requestStudent');
      toast.success(res.payload.message);
    } else {
      toast.info(res.payload.message);
      toast.warning('You must login');
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(courseDetail(id));
    }
    if (id && isLogin) {
      dispatch(watchLesson(id));
    }
  }, [dispatch, id, isLogin]);

  if (isLoading) {
    return <LoadingBetweenPage />;
  }
  if (!courseDtl || !courseDtl.course) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-gray-600">
          Course details not available. Please try again later.
        </p>
      </div>
    );
  }

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const handleCloseOverlay = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Course Details</title>
        <meta name="description" content="course details page" />
        <meta name="keywords" content="course details, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-16 mt-20">
          {/* Banner Section */}
          <section className="relative bg-gray-900 rounded-lg overflow-hidden dark:bg-gray-800">
            <img
              src={
                courseDtl.course.coursePicture?.secure_url ||
                'placeholder-image-url'
              }
              alt={courseDtl.course.courseName}
              className="w-full  object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <h1 className="text-4xl font-bold capitalize">
                {courseDtl.course.courseName}
              </h1>
              <p className="mt-4 text-lg font-light">
                {courseDtl.course.courseDescription}
              </p>
              <div className="flex gap-4 mt-6">
                {watchLess?.message ==
                  'the user can access the data of course now' && isLogin ? (
                  ''
                ) : (
                  <>
                    {isLogin && (
                      <div
                        onClick={() =>
                          sendRequstToBuyingCourse(courseDtl.course._id)
                        }
                        className="inline-block cursor-pointer bg-yellow-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-yellow-600 transition-colors dark:bg-yellow-400 dark:hover:bg-yellow-500"
                      >
                        Enroll Now
                      </div>
                    )}
                  </>
                )}
                <Link
                  to={`/sections/${courseDtl.course._id}`}
                  className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-yellow-600 transition-colors dark:bg-yellow-400 dark:hover:bg-yellow-500"
                >
                  Lessons
                </Link>
              </div>
            </div>
          </section>

          {/* Course Details Section */}
          <section className="mt-12 bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100">
            <div className="lg:flex lg:justify-between">
              {/* Course Information */}
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Course Details</h2>
                <p className="text-gray-800 dark:text-gray-300 text-lg mb-2">
                  Instructor:{' '}
                  <span className="font-semibold">
                    {courseDtl.course.teachedBy || 'Unknown'}
                  </span>
                </p>
                <p className="text-gray-800 dark:text-gray-300 text-lg mb-2">
                  Price:{' '}
                  <span className="font-semibold">
                    {Number(courseDtl.course.coursePrice)
                      ? `${Number(courseDtl.course.coursePrice)} EGP`
                      : 'Free'}
                  </span>
                </p>
                <p className="text-gray-800 dark:text-gray-300 text-lg mb-4">
                  Duration:{' '}
                  <span className="font-semibold">
                    {courseDtl.course.courseHours || 'N/A'} hours
                  </span>
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                  What You'll Learn
                </h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-400">
                  {courseDtl?.course.whatWillYouLearn?.map((item) => (
                    <li key={item._id} className="mb-2">
                      {item.objective || 'No objective available'}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor Overview */}
              <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
                <h2 className="text-3xl font-bold mb-4">Instructor Overview</h2>
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/InstructorDetails/${courseDtl.course.instructor.id}`}
                  >
                    <img
                      alt={courseDtl.course.teachedBy}
                      src={
                        courseDtl.course.instructor.profilePicture.secure_url
                      }
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    />
                  </Link>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Teached By
                    </p>
                    <p className="text-lg font-semibold">
                      {courseDtl.course.teachedBy}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {courseDtl.course.instructor?.introductionPerson ||
                    'No introduction available'}
                </p>
              </div>
            </div>

            {/* Accessible Videos */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-4">
                Introduction Course Videos
              </h2>
              <div className="flex gap-4 flex-wrap ">
                {courseDtl.course.accesibleByAnyOne?.videoUrl?.map(
                  (video, index) => (
                    <div
                      key={video.urlId}
                      className="relative  bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800"
                    >
                      <button
                        onClick={() =>
                          handleVideoClick(video.url.split('v=')[1])
                        }
                        className="w-full p-4  bg-black bg-opacity-60 flex items-center justify-center"
                      >
                        <p>
                          {
                            courseDtl.course.accesibleByAnyOne.describtion?.[
                              index
                            ]?.describtionContent
                          }
                        </p>
                        <svg
                          className="w-16 h-16 text-white dark:text-yellow-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 10l-6 6M14 10l-6-6M14 10h-6"
                          ></path>
                        </svg>
                      </button>
                      {selectedVideo === video.url.split('v=')[1] && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                          <div className="relative w-full max-w-3xl bg-white rounded-lg overflow-hidden dark:bg-gray-900">
                            <button
                              onClick={handleCloseOverlay}
                              className="absolute top-2 right-2 text-white bg-black rounded-full p-2"
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                            </button>
                            <iframe
                              src={`https://www.youtube.com/embed/${
                                video.url.includes('v=')
                                  ? video.url.split('v=')[1].split('&')[0] // Extract video ID only
                                  : video.url.split('/').pop()
                              }${
                                video.url.includes('list=')
                                  ? `?list=${video.url.split('list=')[1]}`
                                  : ''
                              }`} // Add playlist if present
                              title={
                                courseDtl.course.accesibleByAnyOne
                                  .describtion?.[index]?.describtionContent ||
                                'Video'
                              }
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-96"
                            ></iframe>
                            <p className="p-4 text-gray-700 dark:text-gray-300">
                              {
                                courseDtl.course.accesibleByAnyOne
                                  .describtion?.[index]?.describtionContent
                              }
                            </p>
                            <p className="bg-red-600 text-red-600 border-l-4 border-red-600 bg-opacity-50 p-4">
                              {' '}
                              when there is problem in video, you can watch in{' '}
                              <a
                                className="text-red-600 underline"
                                href={video.url}
                                target="_blank"
                              >
                                youtube
                              </a>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
