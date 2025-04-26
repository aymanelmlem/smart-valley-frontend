import { Link } from 'react-router-dom';
import { allExamIns, deleteExam } from '../../../redux/instructor/instructorSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function TestUi({ test }) {
  const dispatch = useDispatch();

  async function deleteExams(id) {
    const response = await dispatch(deleteExam(id));
    if (response.payload.message === 'the test is deleted successfully') {
      toast.success(response.payload.message);
      dispatch(allExamIns());
    } else {
      toast.error(response.payload.message);
    }
  }

  return (
    <tr className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
      <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
        <Link to={`/panel/examDetails/${test.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
          {test.testName}
        </Link>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            test.acceptAnwers
              ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
              : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
          }`}
        >
          {test.acceptAnwers ? 'Yes' : 'No'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            test.autoCorrectOrNot
              ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
              : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
          }`}
        >
          {test.autoCorrectOrNot ? 'Yes' : 'No'}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
        {new Intl.DateTimeFormat('en-us', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(test?.createdAt))}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteExams(test._id);
          }}
          className="bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
