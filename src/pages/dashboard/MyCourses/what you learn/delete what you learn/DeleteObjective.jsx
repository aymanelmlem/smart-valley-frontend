import axios from 'axios';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../../../utils/api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function DeleteObjective() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchParams] = useSearchParams();
  const objective = searchParams.get("objective");
  const learnId = searchParams.get("learnId");
  const courseId = searchParams.get("courseId");
  const { isLoading } = useSelector((state) => state.courses);

  let objectiveArr = objective ? objective.split(',') : [];
  let learnIdArr = learnId ? learnId.split(',') : [];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, value]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter(item => item !== value));
    }
  };

  const sendUpdates = async () => {
    const response = await axios.patch(
      `${BASE_URL}/employees/instructors/courses/updateCourse/${courseId}?whatWillYouLearn=delete`,
      {
        whatWillYouLearn: JSON.stringify(checkedItems),
      },
      {
        headers: {
          'token': localStorage.getItem("TokenEmployee"),
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Delete Objectives</title>
        <meta name="description" content="Delete Objectives page" />
        <meta
          name="keywords"
          content="Delete Objectives, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className="max-w-screen-xl mx-auto">
      <HeadSection title="Delete Objective" subTitle="Objective" link="Delete Objective" />

        <div className="flex justify-center mt-7 ">
          <div className="bg-white rounded-md shadow-md dark:bg-gray-900  p-10 w-full md:w-2/3 flex flex-col">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Select Objectives to Delete:</h3>
            <div className="mb-6 flex gap-5">
              {learnIdArr.map((obtId, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={obtId}
                    checked={checkedItems.includes(obtId)}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5"
                  />
                  <span className="text-lg dark:text-white">{objectiveArr[index]}</span>
                </div>
              ))}
            </div>

            <button
              onClick={sendUpdates}
              className="mt-4 bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-800 py-2 px-4 rounded-md hover:bg-blue-600 text-center w-fit"
              disabled={checkedItems.length === 0}
            >
              {isLoading ? (
                <p className="animate-bounce dark:text-white">Deleting objectives...</p>
              ) : (
                "Delete Objectives"
              )}
            </button>
          </div>
        </div>
    </div>
    </>
  );
}
