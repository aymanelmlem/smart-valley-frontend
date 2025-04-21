import React, { useState } from 'react';
import { addRequiredLink } from '../../../../../redux/courses/courses.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function DeleteRequired() {
    const { isLoading } = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId");
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonId");
    const linkId = searchParams.get("linkId");
    const description = searchParams.get('description');
    
    let linkIdArr = linkId ? linkId.split(',') : [];
    let descriptionArr = description ? description.split(',') : [];

    const [selectedLinkId, setSelectedLinkId] = useState('');
    const [requiredLinks, setrequiredLinks] = useState([]);
    
    // Handle select change
    const handleSelectChange = (e) => {
        setSelectedLinkId(e.target.value);
    };

    const addItem = () => {
        if (selectedLinkId.trim() === '') return;

        // Check if item is already added
        if (requiredLinks.includes(selectedLinkId)) {
            toast.error('This item is already added.');
            return;
        }

        const newArray = [...requiredLinks, selectedLinkId];
        setrequiredLinks(newArray);
        setSelectedLinkId('');
    };

    const removeItem = (item) => {
        const updatedArray = requiredLinks.filter(i => i !== item);
        setrequiredLinks(updatedArray);
    };

    const sendUpdates = async () => {
        try {
            const response = await dispatch(
                addRequiredLink({
                    id: lessonId,
                    value: { 
                        requiredLinks: JSON.stringify(requiredLinks),
                        course: courseId,
                        section: sectionId
                    },
                    flag: "delete"
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
        <title>Delete Required Link</title>
        <meta name="description" content="Delete Required Link page" />
        <meta
          name="keywords"
          content="Delete Required Link, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
        <div className='max-w-screen-xl m-auto'>
            <HeadSection title="Delete Required Link" subTitle="Required Link" link="Delete Required Link" />
            <div className="p-6 flex flex-col items-center justify-center mt-10">
                <div className="w-full md:w-2/3 p-10 shadow-sm bg-white dark:bg-gray-900 rounded-md">
                    <div className="flex items-center mb-4">
                        <select
                            value={selectedLinkId}
                            onChange={handleSelectChange}
                            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
                        >
                            <option value="">Select Required Link Id</option>
                            {linkIdArr.map((id, index) => (
                                <option key={index} value={id}>{`${id} - ${descriptionArr[index] || 'No description'}`}</option>
                            ))}
                        </select>
                        <button
                            onClick={addItem}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="mt-4">
                        {requiredLinks.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 mb-2 rounded-md shadow-sm"
                            >
                                <span className="text-gray-800 dark:text-gray-200">{item}</span>
                                <button
                                    onClick={() => removeItem(item)}
                                    className="ml-2 bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={sendUpdates}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center w-fit"
                        disabled={isLoading || requiredLinks.length === 0}
                    >
                        {isLoading ? (
                            <p className='animate-bounce'>Delete Required Link...</p>
                        ) : (
                            "Delete Required Link"
                        )}
                    </button>
                </div>
            </div>
        </div>
        </>

    );
}
