import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { objectiveEdit } from '../../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function UpdateObjectiveSection() {
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');
  const objective = searchParams.get('objective');
  const objectiveId = searchParams.get('objectiveId');

  // تحويل القيم القادمة من URL إلى مصفوفات
  let objectiveArr = objective ? objective.split(',') : [];
  let objectiveIdArr = objectiveId ? objectiveId.split(',') : [];

  const [inputValue, setInputValue] = useState('');
  const [selectedId, setSelectedId] = useState(''); // لتخزين المعرف المختار
  const [objectiveFromSection, setobjectiveFromSection] = useState([]);

  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRadioChange = (id) => {
    setSelectedId(id); // تغيير القيمة المختارة بناءً على الـ radio button
  };

  const addItem = () => {
    if (inputValue.trim() === '' || selectedId.trim() === '') return;

    const newObjective = { id: selectedId, newObjective: inputValue };
    setobjectiveFromSection([...objectiveFromSection, newObjective]);
    setInputValue('');
    setSelectedId('');
  };

  const removeItem = (item) => {
    const updatedArray = objectiveFromSection.filter((i) => i.id !== item.id);
    setobjectiveFromSection(updatedArray);
  };

  const sendUpdates = async () => {
    try {
      const response = await dispatch(
        objectiveEdit({
          id: sectionId,
          value: { objectiveFromSection: objectiveFromSection },
          flag: 'update',
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
        <title>Edit objective section</title>
        <meta name="description" content="Edit objective section  page" />
        <meta
          name="keywords"
          content="Edit objective section , elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl mx-auto">
        <HeadSection
          title="Update Objective"
          subTitle="Objective"
          link="Update Objective"
        />

        <h2 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Objective:
        </h2>
        <div className="flex flex-wrap gap-4 mb-6">
          {objectiveIdArr.map((obtId, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-900 p-3 mt-4 rounded-md"
            >
              <input
                type="radio"
                id={obtId}
                name="objective" // لتجميعهم معًا
                checked={selectedId === obtId}
                onChange={() => handleRadioChange(obtId)}
                className="mr-2"
              />
              <label
                htmlFor={obtId}
                className="text-gray-900 dark:text-gray-100"
              >
                {objectiveArr[index]}
              </label>
            </div>
          ))}
        </div>

        <div className="p-6 flex flex-col items-center justify-center mt-10">
          <div className="w-full md:w-2/3 p-10 shadow-sm bg-white rounded-md dark:bg-gray-900">
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:placeholder:text-blue-900 focus:ring-0 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter New Objective"
              />
              <button
                onClick={addItem}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul className="mt-4">
              {objectiveFromSection.map((item, index) => {
                const objectiveText =
                  objectiveArr[objectiveIdArr.indexOf(item.id)] ||
                  'Unknown Objective';
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-white p-2 mb-2 rounded-md shadow-sm dark:bg-gray-800"
                  >
                    <span className="text-gray-900 dark:text-gray-100">
                      {objectiveText}: {item.newObjective}
                    </span>
                    <button
                      onClick={() => removeItem(item)}
                      className="ml-2 bg-red-700 focus:outline-red-900 focus:outline-offset-2 focus:outline-double text-white py-2 px-4 rounded-md hover:bg-red-800"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={sendUpdates}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center w-fit"
              disabled={isLoading || objectiveFromSection.length === 0}
            >
              {isLoading ? (
                <p className="animate-bounce">Updating objective...</p>
              ) : (
                'Update Objective'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
