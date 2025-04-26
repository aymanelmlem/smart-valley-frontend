import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../components/headSection/HeadSection';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateAccesibleByAnyOne } from '../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function UpdateVideo() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const url = searchParams.get('url');
  const urlId = searchParams.get('urlId');
  const describtionContent = searchParams.get('descriptionContent');
  const describtionId = searchParams.get('descriptionId');
  const courseId = searchParams.get('courseId');

  let urlArr = url ? url.split(',') : [];
  let urlIdArr = urlId ? urlId.split(',') : [];
  let describtionContentArr = describtionContent
    ? describtionContent.split(',')
    : [];
  let describtionIdArr = describtionId ? describtionId.split(',') : [];
  const { isLoading } = useSelector((state) => state.courses);
  const [UrlId, setUrlId] = useState('');
  const selectedUrl = UrlId
    ? (() => {
        const originalUrl = urlArr[urlIdArr.indexOf(UrlId)];
        const videoIdRegex =
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^?&/]+)/;
        const match = originalUrl.match(videoIdRegex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
      })()
    : null;

  const formik = useFormik({
    initialValues: {
      videoUrlId: '',
      videoUrl: '',
      describtionId: '',
      describtionContent: '',
    },
    validationSchema: Yup.object({
      videoUrlId: Yup.string().required('Video URL Id is required'),
      videoUrl: Yup.string()
        .url('Invalid URL format')
        .required('Video URL is required'),
      describtionId: Yup.string().required('Describtion Id is required'),
      describtionContent: Yup.string().required(
        'Describtion Content is required'
      ),
    }),
    onSubmit: async (values) => {
      try {
        const jsonData = {
          accesibleByAnyOne: JSON.stringify({
            videoUrl: {
              urlId: values.videoUrlId,
              url: values.videoUrl,
            },
            describtion: {
              describtionId: values.describtionId,
              describtionContent: values.describtionContent,
            },
          }),
        };

        const res = await dispatch(
          updateAccesibleByAnyOne({
            value: jsonData,
            id: courseId,
            status: 'update',
          })
        );


        if (res?.payload?.success) {
          toast.success(res.payload.message);
          formik.resetForm();
        } else {
          toast.error(res.payload.message);
        }
      } catch (error) {
        toast.error('An error occurred while updating.');
      }
    },
  });

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Videos Introduction</title>
        <meta name="description" content="Edit Vedios Introduction page" />
        <meta name="keywords" content="Edit Vedios Introduction, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl m-auto">
      <HeadSection
        to="/panel/updateVideo"
        title="Update Video"
        subTitle="Video Url"
        link="Update Video Url"
      />
      {/* Form for Updating Video Details */}
      <form
        className="flex flex-col bg-white dark:bg-gray-900 p-10 my-10 rounded-md shadow-md space-y-4"
        onSubmit={formik.handleSubmit}
      >
        {/* Select for Video URL ID with Value */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="videoUrlId"
            className="font-semibold text-teal-500 dark:text-teal-400"
          >
            Select Video Url Id
          </label>
          <select
            id="videoUrlId"
            name="videoUrlId"
            className="rounded-md focus:ring-0 bg-transparent dark:bg-gray-800 dark:text-gray-300 pl-4 focus:border-gray-400"
            value={formik.values.videoUrlId}
            onChange={(e) => {
              formik.handleChange(e);
              setUrlId(e.target.value);
            }}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select url ID
            </option>

            {urlIdArr.map((id, index) => (
              <option key={id} value={id}>
                {id} - {urlArr[index]}
              </option>
            ))}
          </select>
          {formik.touched.videoUrlId && formik.errors.videoUrlId && (
            <div className="text-red-500">{formik.errors.videoUrlId}</div>
          )}
        </div>

        {/* Input for Video URL */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="videoUrl"
            className="font-semibold text-orange-500 dark:text-orange-400"
          >
            New Video Url (Introduction course)
          </label>
          <input
            id="videoUrl"
            placeholder="Video Url"
            className="rounded-md focus:ring-0 bg-transparent dark:bg-gray-800 dark:text-gray-300 pl-4 focus:border-gray-400"
            type="text"
            name="videoUrl"
            value={formik.values.videoUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.videoUrl && formik.errors.videoUrl && (
            <div className="text-red-500">{formik.errors.videoUrl}</div>
          )}
        </div>

        {/* Select for Description ID with Value */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="describtionId"
            className="font-semibold text-pink-500 dark:text-pink-400"
          >
            Select Description Id
          </label>
          <select
            id="describtionId"
            name="describtionId"
            className="rounded-md focus:ring-0 bg-transparent dark:bg-gray-800 dark:text-gray-300 pl-4 focus:border-gray-400"
            value={formik.values.describtionId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select description ID
            </option>
            {describtionIdArr.map((id, index) => (
              <option key={id} value={id}>
                {id} - {describtionContentArr[index]}
              </option>
            ))}
          </select>
          {formik.touched.describtionId && formik.errors.describtionId && (
            <div className="text-red-500">{formik.errors.describtionId}</div>
          )}
        </div>

        {/* Input for Description Content */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="describtionContent"
            className="font-semibold text-amber-500 dark:text-amber-400"
          >
            New Description
          </label>
          <input
            id="describtionContent"
            placeholder="Description"
            className="rounded-md focus:ring-0 bg-transparent dark:bg-gray-800 dark:text-gray-300 pl-4 focus:border-gray-400"
            type="text"
            name="describtionContent"
            value={formik.values.describtionContent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.describtionContent &&
            formik.errors.describtionContent && (
              <div className="text-red-500">
                {formik.errors.describtionContent}
              </div>
            )}
        </div>

        {/* Display the selected video iframe */}
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

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 dark:bg-blue-800 text-center w-52 p-2 rounded-md text-white hover:outline-double font-semibold hover:outline-blue-700 hover:bg-transparent hover:text-blue-950 dark:hover:text-white shadow-md duration-300 ease-out">
            {isLoading ? <p className="animate-pulse">Update...</p> : 'Update'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
