import React, { useState } from 'react';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { fileLessonFun } from '../../../../../redux/courses/courses.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';

export default function DeleteFileLesson() {
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const courseId = searchParams.get('courseId');
  const lessonId = searchParams.get('lessonId');
  const fileId = searchParams.get('fileId');
  const file = searchParams.get('file');
  let [fileIdArr,setFileIdArr] = useState(fileId ? fileId.split(',') : []);
  let [fileArr,setFileArr] =useState( file ? file.split(',') : []);
  const [idsOfFiles, setIdsOfFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCheckboxChange = (id) => {
    if (idsOfFiles.includes(id)) {
      setIdsOfFiles(idsOfFiles.filter((item) => item !== id));
    } else {
      setIdsOfFiles([...idsOfFiles, id]);
    }
  };

  const sendUpdates = async () => {
    try {
      const response = await dispatch(
        fileLessonFun({
          id: lessonId,
          value: {
            idsOfFiles: JSON.stringify(idsOfFiles),
            course: courseId,
            section: sectionId,
          },
          flag: 'delete',
        })
      );
      if (response.payload.success) {
        toast.success(response.payload.message);
        setIdsOfFiles([]);
        setFileArr((prev) => prev.filter((_, index) => !idsOfFiles.includes(fileIdArr[index])));
        setFileIdArr((prev) => prev.filter((id) => !idsOfFiles.includes(id)));

      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error('An error occurred while deleting files.');
    }
  };

  const totalPages = fileIdArr ? Math.ceil(fileIdArr.length / numberOfPages) : 1;
  const start = (currentPage - 1) * numberOfPages;
  const end = start + numberOfPages;

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          className={` ${
            currentPage === i
              ? 'bg-blue-700 text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 text-black dark:text-white rounded-md cursor-pointer'
          } p-2 px-4 mx-1`}
          key={i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !fileIdArr.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !fileIdArr.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Delete File Lessons</title>
        <meta name="description" content="Delete file lessons page" />
        <meta
          name="keywords"
          content="Delete file lessons, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection title="Delete File" subTitle="Files" link="Delete File" />
        <div className="p-6 flex flex-col items-center justify-center mt-10">
          <div className="w-full overflow-x-auto  p-10 shadow-sm bg-white dark:bg-gray-950 rounded-md">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 dark:bg-gray-900">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                    Select
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                    File Name
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                    File ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {fileIdArr.slice(start, end).map((id,) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                      <input
                        type="checkbox"
                        id={id}
                        aria-label={`Select file ${fileArr[fileIdArr.indexOf(id)] || id}`}
                        checked={idsOfFiles.includes(id)}
                        onChange={() => handleCheckboxChange(id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">
                      {fileArr[fileIdArr.indexOf(id)] || 'Unknown'}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">
                      {id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center my-10 gap-10">
              {renderPagination()}
            </div>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-fit"
              disabled={isLoading || idsOfFiles.length === 0}
            >
              {isLoading ? (
                <p className="animate-bounce">Deleting Files...</p>
              ) : (
                'Delete  Files'
              )}
            </button>
            {showConfirmModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to delete the selected files?
                  </h2>
                  <div className="flex justify-end gap-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={() => {
                        setShowConfirmModal(false);
                        sendUpdates();
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                      onClick={() => setShowConfirmModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}