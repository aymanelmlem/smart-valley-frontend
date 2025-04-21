import  { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../components/headSection/HeadSection';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateWhatYouLearn } from '../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function WhatYouLearn() {
  const [searchParams] = useSearchParams();
  const objective = searchParams.get('objective');
  const learnId = searchParams.get('learnId');
  const courseId = searchParams.get('courseId');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.courses);
  let objectiveArr = objective ? objective.split(',') : [];
  let learnIdArr = learnId ? learnId.split(',') : [];
  const [ids, setIds] = useState([]); // حفظ IDs كـ array فارغ
  const [objectives, setObjectives] = useState(['']);

  const handleAddObjective = () => {
    setObjectives([...objectives, '']);
  };

  const handleRemoveObjective = (index) => {
    const newObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(newObjectives);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const whatWillYouLearn = JSON.stringify({
      id: ids.filter((id) => id.trim() !== ''), // تصفية IDs الفارغة
      objective: objectives.filter((obj) => obj.trim() !== ''),
    });

    const response = await dispatch(
      updateWhatYouLearn({
        id: courseId,
        value: { whatWillYouLearn },
        status: 'update',
      })
    );

    if (response.payload?.success) {
      toast.success(response.payload.message);
    } else {
      toast.error(response.payload.message);
    }
  };

  const handleCheckboxChange = (id) => {
    setIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id); // إزالة ID من القائمة
      } else {
        return [...prevIds, id]; // إضافة ID إلى القائمة
      }
    });
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Edit objectives</title>
        <meta name="description" content="Edit objectives page" />
        <meta
          name="keywords"
          content="Edit objectives, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <HeadSection
        title="Edit Objective"
        subTitle="Objective"
        link="Edit Objective"
      />
      
      <div className="flex justify-center mt-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-3xl"
        >
          {/* Objectives Section */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 dark:text-gray-300">
              Objectives:
            </label>
            <div className='flex items-center gap-5 flex-wrap'>
              {learnIdArr.map((obtId, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    value={obtId}
                    checked={ids.includes(obtId)}
                    onChange={() => handleCheckboxChange(obtId)}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-lg dark:text-gray-300">
                    {objectiveArr[index] && (
                      <span className="ml-2">{objectiveArr[index]}</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* New Objectives Section */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 dark:text-gray-300">
              New Objectives:
            </label>
            <div className="space-y-4 ">
              {objectives.map((objective, index) => (
                <div key={index} className="flex  items-center space-x-3">
                  <input
                    placeholder="Enter new objective"
                    type="text"
                    value={objective}
                    onChange={(e) => {
                      const newObjectives = [...objectives];
                      newObjectives[index] = e.target.value;
                      setObjectives(newObjectives);
                    }}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md p-3 focus:ring-0 focus:border-blue-500"
                    required
                  />
                  {objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(index)}
                      className="text-red-600 bg-red-600 bg-opacity-50 hover:bg-red-500 hover:bg-opacity-55 py-2 px-4 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddObjective}
                className=" flex bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Add Objective
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || objectives.length === 0}
            className=" bg-blue-800 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
