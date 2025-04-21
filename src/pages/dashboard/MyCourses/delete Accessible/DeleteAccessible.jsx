import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../components/headSection/HeadSection';
import { updateAccesibleByAnyOne } from '../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function DeleteAccessible() {
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

  const [UrlId, setUrlId] = useState('');
  const [descriptionId, setDescriptionId] = useState('');
  const { isLoading } = useSelector((state) => state.courses);

  const selectedUrl = UrlId
    ? (() => {
        const originalUrl = urlArr[urlIdArr.indexOf(UrlId)];
        const videoIdRegex =
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^?&/]+)/;
        const match = originalUrl.match(videoIdRegex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
      })()
    : null;

  async function deleteAccess() {
    if (!UrlId || !descriptionId) {
      toast.error('You should select vedio and description');
      return;
    }

    const jsonData = {
      accesibleByAnyOne: JSON.stringify({
        urlId: UrlId,
        describtionId: descriptionId,
      }),
    };
    const response = await dispatch(
      updateAccesibleByAnyOne({
        id: courseId,
        value: jsonData,
        status: 'delete',
      })
    );

    if (response?.payload?.success) {
      toast.success(response.payload.message);
      setUrlId('');
      setDescriptionId('');
    } else {
      toast.error(response.payload.message);
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Delete Videos Introduction</title>
        <meta name="description" content="Delete Vedios Introduction page" />
        <meta
          name="keywords"
          content="Delete Vedios Introduction, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl mx-auto">
        <HeadSection
          title="Delete Video Introduction"
          subTitle="Video Url"
          link="Delete Video Url"
        />
        {/* Form for Deleting Video */}
        <div className="flex justify-center py-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col bg-white dark:bg-gray-900 p-10 rounded-md shadow-md space-y-4 w-full md:w-2/3"
          >
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="urlId"
                className="font-semibold text-gray-800 dark:text-gray-300"
              >
                URL ID:
              </label>
              <select
                id="urlId"
                value={UrlId}
                onChange={(e) => setUrlId(e.target.value)}
                className="rounded-md focus:ring-0 bg-transparent pl-4 focus:border-gray-400 dark:bg-gray-800 dark:text-white"
              >
                <option value="" disabled>
                  Select URL ID
                </option>
                {urlIdArr.map((urlId, index) => (
                  <option
                    className="text-black dark:text-white"
                    key={urlId}
                    value={urlId}
                  >
                    {urlId} - {urlArr[index]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="desId"
                className="font-semibold text-gray-800 dark:text-gray-300"
              >
                Description ID:
              </label>
              <select
                id="desId"
                value={descriptionId}
                onChange={(e) => setDescriptionId(e.target.value)}
                className="rounded-md focus:ring-0 bg-transparent pl-4 focus:border-gray-400 dark:bg-gray-800 dark:text-white"
              >
                <option value="" disabled>
                  Select Description ID
                </option>
                {describtionIdArr.map((desId, index) => (
                  <option
                    className="text-black dark:text-white"
                    key={desId}
                    value={desId}
                  >
                    {desId} - {describtionContentArr[index]}
                  </option>
                ))}
              </select>
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
            <button
              onClick={deleteAccess}
              className="bg-blue-600 text-center w-52 p-2 rounded-md text-white hover:outline-double font-semibold hover:outline-blue-700 hover:bg-transparent hover:text-blue-950 shadow-md duration-300 ease-out"
            >
              {isLoading ? (
                <p className="animate-pulse">Delete...</p>
              ) : (
                'Delete'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
