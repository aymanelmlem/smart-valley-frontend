import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { updateWhatYouLearn } from '../../../../../redux/courses/courses.slice';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function AddObjective() {
    const [inputValue, setInputValue] = useState('');
    const [whatWillYouLearn, setWhatWillYouLearn] = useState([]);
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("courseId");
    const { isLoading } = useSelector((state) => state.courses);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addItem = () => {
        if (inputValue.trim() === '') return;

        const newArray = [...whatWillYouLearn, inputValue];
        setWhatWillYouLearn(newArray);
        setInputValue('');
    };

    const removeItem = (item) => {
        const updatedArray = whatWillYouLearn.filter(i => i !== item);
        setWhatWillYouLearn(updatedArray);
    };

    const sendUpdates = async () => {
        try {
            const response = await dispatch(
                updateWhatYouLearn({
                    id: courseId,
                    value: { whatWillYouLearn: JSON.stringify(whatWillYouLearn) },
                    status: "add"
                })
            );
            if (response.payload.success) {
                toast.success(response.payload.message);
                setInputValue('')
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
        <title>Add Objectives</title>
        <meta name="description" content="Add Objectives Introduction page" />
        <meta name="keywords" content="Add Objectives Introduction, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
        <div className='max-w-screen-xl mx-auto'>
            <HeadSection title="Add Objective course" subTitle="Objective" link="Add Objective" />
            <div className="p-6 flex flex-col items-center justify-center mt-10">
                <div className="w-full md:w-2/3 p-10 shadow-sm bg-white dark:bg-gray-900 rounded-md">
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="flex-grow p-2 border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:placeholder:text-blue-900 dark:focus:placeholder:text-gray-400 focus:ring-0 focus:border-blue-500"
                            placeholder="Enter objective"
                        />
                        <button
                            onClick={addItem}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-400"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="mt-4">
                        {whatWillYouLearn.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-white dark:bg-gray-700 dark:text-gray-300 p-2 mb-2 rounded-md shadow-sm"
                            >
                                <span>{item}</span>
                                <button
                                    onClick={() => removeItem(item)}
                                    className="ml-2 bg-red-700 focus:outline-red-900 dark:focus:outline-red-700 focus:outline-offset-2 focus:outline-double text-white py-2 px-4 rounded-md hover:bg-red-800"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={sendUpdates}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-400 text-center w-fit"
                        disabled={isLoading || whatWillYouLearn.length === 0} // Disable button if loading or array is empty
                    >
                        {isLoading ? (
                            <p className='animate-bounce'>Adding objective...</p>
                        ) : (
                            "Add Objective"
                        )}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}
