import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import HeadSection from '../../../../components/headSection/HeadSection';
import { updateAccesibleByAnyOne } from '../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
const validationSchema = yup.object().shape({
  videoUrls: yup.array().of(yup.string().url('Invalid URL')),
  descriptionIds: yup
    .array()
    .of(yup.string().min(5, 'Description must be at least 5 characters long')),
});

export default function AddVideo() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const { isLoading } = useSelector((state) => state.courses);

  const formik = useFormik({
    initialValues: {
      videoUrls: [],
      descriptionIds: [],
      newVideoUrl: '',
      newDescription: '',
    },
    validationSchema,
    onSubmit: async () => {
      const jsonData = {
        accesibleByAnyOne: JSON.stringify({
          videoUrl: formik.values.videoUrls,
          describtion: formik.values.descriptionIds,
        }),
      };

      try {
        const response = await dispatch(
          updateAccesibleByAnyOne({
            id: courseId,
            value: jsonData,
            status: 'add',
          })
        );
        if (response?.payload?.success) {
          toast.success(response.payload.message);
          formik.resetForm();
        } else {
          toast.error(response.payload.message);
        }
      } catch (error) {
        toast.error('An error occurred while adding the video');
      }
    },
  });

  const addNewVideoUrl = () => {
    const { newVideoUrl, videoUrls } = formik.values;
    if (newVideoUrl.trim() === '') {
      formik.setFieldError('newVideoUrl', 'Video URL cannot be empty');
      return;
    }
    if (!yup.string().url().isValidSync(newVideoUrl)) {
      formik.setFieldError('newVideoUrl', 'Invalid URL');
      return;
    }
    formik.setFieldValue('videoUrls', [...videoUrls, newVideoUrl.trim()]);
    formik.setFieldValue('newVideoUrl', '');
    formik.setFieldError('newVideoUrl', ''); 
  };

  const addNewDescription = () => {
    const { newDescription, descriptionIds } = formik.values;
    if (newDescription.trim() === '') {
      formik.setFieldError('newDescription', 'Description cannot be empty');
      return;
    }
    if (newDescription.length < 5) {
      formik.setFieldError(
        'newDescription',
        'Description must be at least 5 characters long'
      );
      return;
    }
    formik.setFieldValue('descriptionIds', [
      ...descriptionIds,
      newDescription.trim(),
    ]);
    formik.setFieldValue('newDescription', '');
    formik.setFieldError('newDescription', ''); // Clear error if any
  };

  const removeVideoUrl = (index) => {
    const { videoUrls } = formik.values;
    formik.setFieldValue(
      'videoUrls',
      videoUrls.filter((_, i) => i !== index)
    );
  };

  const removeDescription = (index) => {
    const { descriptionIds } = formik.values;
    formik.setFieldValue(
      'descriptionIds',
      descriptionIds.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Videos Introduction</title>
        <meta name="description" content="Add Vedios Introduction page" />
        <meta
          name="keywords"
          content="Add Vedios Introduction, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl mx-auto">
        <HeadSection
          title="Add Video"
          subTitle="Video Url"
          link="Add Video Url"
        />
        <div className="flex justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full md:w-2/3 p-4 bg-white dark:bg-gray-900 shadow-md rounded-md mt-10"
          >
            <div className="mb-4">
              <label
                htmlFor="newVideoUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Video URL:
              </label>
              <div className="flex mt-1">
                <input
                  type="text"
                  id="newVideoUrl"
                  value={formik.values.newVideoUrl}
                  onChange={(e) =>
                    formik.setFieldValue('newVideoUrl', e.target.value)
                  }
                  className={`flex-1 border ${
                    formik.errors.newVideoUrl
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  } rounded-md py-2 px-3 text-gray-900 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={addNewVideoUrl}
                  className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Video URL
                </button>
              </div>
              {formik.errors.newVideoUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.newVideoUrl}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="newDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Description:
              </label>
              <div className="flex mt-1">
                <input
                  type="text"
                  id="newDescription"
                  value={formik.values.newDescription}
                  onChange={(e) =>
                    formik.setFieldValue('newDescription', e.target.value)
                  }
                  className={`flex-1 border ${
                    formik.errors.newDescription
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  } rounded-md py-2 px-3 text-gray-900 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={addNewDescription}
                  className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Description
                </button>
              </div>
              {formik.errors.newDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.newDescription}
                </p>
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                Video URLs:
              </h3>
              <ul className="mt-2 list-disc list-inside pl-4 flex flex-col gap-3">
                {formik.values.videoUrls.map((url, index) => (
                  <li
                    key={index}
                    className="text-blue-600 dark:text-blue-300  p-2 rounded-md bg-blue-100 dark:bg-blue-800  flex justify-between items-center"
                  >
                    {url}
                    <button
                      type="button"
                      onClick={() => removeVideoUrl(index)}
                      className="ml-2 bg-red-600 text-white py-1 px-2 rounded-md shadow-sm hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                Descriptions:
              </h3>
              <ul className="mt-2 list-disc list-inside pl-4 flex flex-col gap-3">
                {formik.values.descriptionIds.map((description, index) => (
                  <li
                    key={index}
                    className=" text-blue-600 dark:text-blue-300  p-2 rounded-md bg-blue-100 dark:bg-blue-800  flex justify-between items-center"
                  >
                    {description}
                    <button
                      type="button"
                      onClick={() => removeDescription(index)}
                      className="ml-2 bg-red-600 text-white py-1 px-2 rounded-md shadow-sm hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={!formik.dirty && formik.isValid}
                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? (
                  <p className="animate-bounce">Add Video....</p>
                ) : (
                  'Add Video'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
