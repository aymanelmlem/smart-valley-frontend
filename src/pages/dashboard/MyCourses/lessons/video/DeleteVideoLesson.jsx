import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { videoLessonFun } from '../../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function DeleteVideoLesson() {
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const courseId = searchParams.get('courseId');
  const lessonId = searchParams.get('lessonId');
  const videoUrl = searchParams.get('videoUrl');
  const videoId = searchParams.get('videoId');
  let videoUrlArr = videoUrl ? videoUrl.split(',') : [];
  let videoIdArr = videoId ? videoId.split(',') : [];
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [videosChanges, setvideosChanges] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(''); // State to handle the currently selected video for display

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : '';
  };

  // Handling videosChanges
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedVideoId(selectedId);
    const videoUrl = videoUrlArr.find((url) => url.includes(selectedId));
    if (videoUrl) {
      setCurrentVideo(getEmbedUrl(videoUrl));
    }
  };

  const addItem = () => {
    if (selectedVideoId.trim() === '') return;

    const newArray = [...videosChanges, selectedVideoId];
    setvideosChanges(newArray);
    setSelectedVideoId(''); // Reset selection after adding
    const videoUrl = videoUrlArr.find((url) => url.includes(selectedVideoId));
    if (videoUrl) {
      setCurrentVideo(getEmbedUrl(videoUrl)); // Automatically open the selected video
    }
  };

  const removeItem = (item) => {
    const updatedArray = videosChanges.filter((i) => i !== item);
    setvideosChanges(updatedArray);
  };

  const sendUpdates = async () => {
    try {
      const response = await dispatch(
        videoLessonFun({
          id: lessonId,
          value: {
            videosChanges: JSON.stringify(videosChanges),
            course: courseId,
            section: sectionId,
          },
          flag: 'delete',
        })
      );
      if (response.payload.success) {
        toast.success(response.payload.message);
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating objectives.');
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Delete Video lessosns</title>
        <meta name="description" content="Delete Video lessosns page" />
        <meta
          name="keywords"
          content="Delete Video lessosns, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection
          title="Delete Video"
          subTitle="Video"
          link="Delete Video"
        />
        <h2 className="mb-4 mt-6 text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Video Url:
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          {videoUrlArr.map((url, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideo(getEmbedUrl(url))}
              className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
            >
              Show Video - {videoIdArr[index]}
            </button>
          ))}
        </div>
        {currentVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl h-[500px]">
              <iframe
                width="100%"
                height="100%"
                src={currentVideo}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded"
              ></iframe>
              <button
                onClick={() => setCurrentVideo('')}
                className="absolute top-4 right-4 bg-red-500 dark:bg-red-600 text-white p-2 rounded-full hover:bg-red-600 dark:hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="p-6 flex flex-col items-center justify-center mt-10">
          <div className="w-full md:w-2/3 p-10 shadow-sm bg-white dark:bg-gray-900 rounded-md">
            <div className="flex items-center mb-4">
              <select
                value={selectedVideoId}
                onChange={handleSelectChange}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:placeholder:text-blue-900 focus:ring-0 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select Video ID</option>
                {videoIdArr.map((id, index) => (
                  <option key={index} value={id}>
                    {id} - {videoUrlArr[index]}
                  </option>
                ))}
              </select>
              <button
                onClick={addItem}
                className="ml-2 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <ul className="mt-4">
              {videosChanges.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 mb-2 rounded-md shadow-sm"
                >
                  <span className="text-gray-800 dark:text-gray-200">
                    {item}
                  </span>
                  <button
                    onClick={() => removeItem(item)}
                    className="ml-2 bg-red-700 dark:bg-red-600 focus:outline-red-900 focus:outline-offset-2 focus:outline-double text-white py-2 px-4 rounded-md hover:bg-red-800 dark:hover:bg-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={sendUpdates}
              className="mt-4 bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 text-center w-fit"
              disabled={isLoading || videosChanges.length === 0}
            >
              {isLoading ? (
                <p className="animate-bounce">Delete Video ...</p>
              ) : (
                'Delete Required Link'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
