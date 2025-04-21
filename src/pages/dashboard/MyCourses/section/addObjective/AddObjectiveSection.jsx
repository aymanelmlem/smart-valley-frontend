import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { objectiveEdit } from '../../../../../redux/courses/courses.slice';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function AddObjectiveSection() {
  const [inputValue, setInputValue] = useState('');
  const [objectiveFromSection, setobjectiveFromSection] = useState([]);
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');

  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() === '') return;

    const newArray = [...objectiveFromSection, inputValue];
    setobjectiveFromSection(newArray);
    setInputValue('');
  };

  const removeItem = (item) => {
    const updatedArray = objectiveFromSection.filter((i) => i !== item);
    setobjectiveFromSection(updatedArray);
  };

  const sendUpdates = async () => {
    try {
      const response = await dispatch(
        objectiveEdit({
          id: sectionId,
          value: { objectiveFromSection: objectiveFromSection },
          flag: 'add',
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
        <title>Add Objectives Section</title>
        <meta name="description" content="Add Objectives section Introduction page" />
        <meta
          name="keywords"
          content="Add Objectives section Introduction, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl mx-auto">
        <HeadSection
          title="Add Objective section"
          subTitle="Objective"
          link="Add Objective section"
        />
        <div className="p-6 flex flex-col items-center justify-center mt-10">
          <div className="w-full md:w-2/3 p-10 shadow-sm bg-white dark:bg-gray-900 rounded-md">
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Enter objective"
              />
              <button
                onClick={addItem}
                className="ml-2 bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul className="mt-4">
              {objectiveFromSection.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 mb-2 rounded-md shadow-sm dark:text-white"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeItem(item)}
                    className="ml-2 bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 focus:outline-red-900 focus:outline-offset-2 focus:outline-double text-white py-2 px-4 rounded-md hover:bg-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={sendUpdates}
              className="mt-4 bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-600 text-center w-fit"
              disabled={isLoading || objectiveFromSection.length === 0}
            >
              {isLoading ? (
                <p className="animate-bounce dark:text-white">
                  Adding objective...
                </p>
              ) : (
                'Add Objective'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
