import { Link } from "react-router-dom";

export default function ExamUiSt({ test }) {
    
  return (
    <div className="  p-4 mb-6  ">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        <Link to={`/examDetailsStudent/${test.id}?Autto-correct=${test.autoCorrectOrNot}`} className="text-blue-600 dark:text-blue-400 hover:underline capitalize">
          {test.testName}
        </Link>
      </h3>
      <div className="mt-4 text-gray-700 dark:text-gray-300">
        <p>
          <strong>Accepting Answers: </strong>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              test.acceptAnwers
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
            }`}
          >
            {test.acceptAnwers ? 'Yes' : 'No'}
          </span>
        </p>
        <p>
          <strong>Auto-correct: </strong>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              test.autoCorrectOrNot
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
            }`}
          >
            {test.autoCorrectOrNot ? 'Yes' : 'No'}
          </span>
        </p>
        <p>
          <strong>Created At: </strong>
          {new Intl.DateTimeFormat('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(test?.createdAt))}
        </p>
      </div>

    </div>
  );
}
