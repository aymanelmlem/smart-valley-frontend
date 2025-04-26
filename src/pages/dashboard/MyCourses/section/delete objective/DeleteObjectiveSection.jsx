import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { objectiveEdit } from '../../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';

export default function DeleteObjectiveSection() {
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const objective = searchParams.get('objective');
  const objectiveId = searchParams.get('objectiveId');
  let [objectiveArr, setObjectiveArr] = useState(objective ? objective.split(',') : []);
  let [objectiveIdArr, setObjectiveIdArr] = useState(objectiveId ? objectiveId.split(',') : []);

  const [selectedObjectives, setSelectedObjectives] = useState([]);
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const handleCheckboxChange = (objectiveId) => {
    setSelectedObjectives((prevSelected) => {
      if (prevSelected.includes(objectiveId)) {
        return prevSelected.filter((id) => id !== objectiveId);
      } else {
        return [...prevSelected, objectiveId];
      }
    });
  };

  const sendUpdates = async () => {
    try {
      const response = await dispatch(
        objectiveEdit({
          id: sectionId,
          value: { objectiveFromSection: selectedObjectives },
          flag: 'delete',
        })
      );

      if (response.payload.success) {
        // تحديث القوائم بعد الحذف
        setObjectiveArr((prev) => prev.filter((_, index) => !selectedObjectives.includes(objectiveIdArr[index])));
        setObjectiveIdArr((prev) => prev.filter((id) => !selectedObjectives.includes(id)));

        // إعادة تعيين الأهداف المختارة
        setSelectedObjectives([]);

        toast.success(response.payload.message);
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating objectives.');
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);

  const totalPages = objectiveIdArr
    ? Math.ceil(objectiveIdArr?.length / parseInt(numberOfPages))
    : 1;

  const handleClick = (page) => {
    setCurrentPage(page);
  };
  
  const start = (currentPage - 1) * parseInt(numberOfPages);
  const end = start + parseInt(numberOfPages);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          className={`${
            currentPage === i
              ? 'bg-blue-700 text-white rounded-md cursor-pointer'
              : 'outline-double outline-blue-700 text-black rounded-md cursor-pointer'
          } p-2 px-4 mx-1`}
          key={i}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <ul className="m-0 p-0 list-unstyled flex">
        <li>
          <button
            className="bg-blue-800  cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === 1 || !objectiveIdArr?.length}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            className="bg-blue-800 cursor-pointer duration-300 transition-all hover:text-blue-900 dark:hover:text-blue-600 hover:bg-transparent hover:outline-double hover:outline-blue-800 p-2 px-4 mx-1 rounded-md shadow-md text-white"
            disabled={currentPage === totalPages || !objectiveIdArr?.length}
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
        <title>Delete Objectives Section</title>
        <meta name="description" content="Delete Objectives section Introduction page" />
        <meta name="keywords" content="Delete Objectives section Introduction, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection
          title="Delete Objective Section"
          subTitle="Objective"
          link="Delete Objective"
        />
        <div className="p-6 flex flex-col items-center justify-center mt-10">
          <div className="w-full overflow-x-auto  p-10 shadow-sm bg-white dark:bg-gray-950 rounded-md ">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Select Objectives to Delete:
            </h3>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 dark:bg-gray-900 ">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left dark:text-white">Select</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left dark:text-white">Objective</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left dark:text-white">ObjectiveId</th>

                </tr>
              </thead>
              <tbody>
                {objectiveIdArr.slice(start, end).map((obtId, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                      <input
                        type="checkbox"
                        id={obtId}
                        checked={selectedObjectives.includes(obtId)}
                        onChange={() => handleCheckboxChange(obtId)}
                        disabled={isLoading || objectiveIdArr.length === 0}
                        className='w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600'
                      />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2 dark:text-white">
                      <label htmlFor={obtId}>{objectiveArr[objectiveIdArr.indexOf(obtId)] || 'Unknown'}</label>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2 dark:text-white">
                      <label htmlFor={obtId}>{obtId}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center my-10 gap-10">
              {renderPagination()}
            </div>
            <button
              onClick={sendUpdates}
              className="mt-4 bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-600 text-center w-fit"
              disabled={isLoading || selectedObjectives.length === 0}
            >
              {isLoading ? (
                <p className="animate-bounce dark:text-white">Deleting objective...</p>
              ) : (
                'Delete Objectives'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
