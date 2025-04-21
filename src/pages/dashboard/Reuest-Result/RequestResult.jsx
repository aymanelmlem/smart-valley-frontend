import { useEffect, useState } from 'react';
import NavRequestResult from '../../../components/NavRequestResult/NavRequestResult';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancleRequest,
  resultRequest,
} from '../../../redux/instructor/instructorSlice';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function RequestResult() {
  const { resultReq, employeeToken } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalCancle, setShowModalCancle] = useState(false);
  async function deleteAccount() {
    const response = await dispatch(cancleRequest());
    if (response.payload.success) {
      window.location.href = '/login-employee';
      localStorage.removeItem('TokenEmployee');
    } else {
      toast.error(response.payload.message);
    }
  }
  useEffect(() => {
    if (employeeToken) {
      dispatch(resultRequest());
    }
  }, [dispatch, employeeToken]);
  if (
    resultReq?.message ===
    'you must pay the cost first then contact with the superAdmin to continue using the service'
  ) {
    return (
      <>
        <NavRequestResult />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-6 transition">
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 text-center max-w-lg transition">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Important Warning
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You must pay the fees first, then contact the senior supervisor to
              continue using the service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-gray-800 dark:text-gray-300">
              Phone:{' '}
              <a href="tel:01550001663" className="font-semibold">
                01550001663
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Requests result</title>
        <meta name="description" content="Request page" />
        <meta name="keywords" content="Request, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
        <NavRequestResult />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end">
            <button
              onClick={() => setShowModalCancle(true)}
              className="bg-red-600 font-semibold p-2 px-12 mb-5 text-white rounded-md hover:text-red-800 hover:bg-transparent hover:outline-double hover:outline-red-800 duration-300 transition-all dark:hover:text-red-300 dark:hover:outline-red-300"
            >
              Cancel Request
            </button>
          </div>
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="col-span-1 lg:col-span-2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                Hello,{' '}
                <span className="text-teal-500">
                  Mr. {resultReq?.requestData?.name}
                </span>
              </h2>
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Hope you have a great day!
              </p>
              {resultReq && (
                <div className="max-w-4xl mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <img
                        src={resultReq?.requestData?.profilePicture?.secure_url}
                        alt={resultReq?.requestData?.name}
                        className="w-32 h-32 object-cover rounded-full border-4 border-teal-500 dark:border-teal-300"
                      />
                      <div className="ml-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {resultReq?.requestData?.name}
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">
                          {resultReq?.requestData?.role || 'No bio available.'}
                        </p>
                      </div>
                    </div>
                    <div className="md:mt-0 text-sm space-y-3">
                      <p className="text-gray-600 dark:text-gray-300">
                        <strong>Email:</strong> {resultReq?.requestData?.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <strong>Phone:</strong> {resultReq?.requestData?.phone}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <strong>Location:</strong>{' '}
                        {resultReq?.requestData?.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-1 flex flex-col space-y-4 lg:space-y-6 p-6">
              {resultReq && resultReq?.requestData?.state === 'accepted' && (
                <div className="bg-teal-50 dark:bg-teal-900 border border-teal-200 dark:border-teal-700 rounded-lg p-6 flex flex-col items-center h-full justify-center ">
                  <h1 className="text-xl font-semibold text-teal-600 dark:text-teal-300">
                    🎉 Congratulations!
                  </h1>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    You have been accepted as an Instructor.
                  </p>
                  <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                    Check your email for your unique PIN code to access your
                    dashboard. Your Pin Code is <span className='text-red-500 dark:text-red-700'>({resultReq?.requestData?.pinCode})</span>
                  </p>

                  <Link
                    to="/pinCode-employee"
                    className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-800 transition"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}

              {resultReq && resultReq?.requestData?.state === 'rejected' && (
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6 flex flex-col items-center h-full justify-center ">
                  <h1 className="text-xl font-semibold text-red-600 dark:text-red-300">
                    😔 Unfortunately
                  </h1>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Your application was not accepted as an Instructor.
                  </p>
                  <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                    Please review the feedback and try again later.
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition"
                  >
                    View Feedback
                  </button>
                </div>
              )}

              {resultReq &&
                resultReq?.requestData?.state === 'underRevising' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 flex flex-col items-center h-full justify-center ">
                    <h1 className="text-xl font-semibold text-yellow-600 dark:text-yellow-300">
                      🔄 Under Review
                    </h1>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Your application is currently under review.
                    </p>
                    <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                      We will notify you once a decision has been made.
                    </p>
                  </div>
                )}

              {resultReq &&
                resultReq?.requestData?.state === 'initiallyAccepted' && (
                  <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 flex flex-col items-center h-full justify-center ">
                    <h1 className="text-xl font-semibold text-blue-600 dark:text-blue-300">
                      ✅ Initial Acceptance
                    </h1>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Your application has been initially accepted.
                    </p>
                    <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                      We are awaiting final approval. We will keep you updated.
                    </p>
                  </div>
                )}

              {showModal && (
                <div>
                  <Modal
                    className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 m-auto "
                    show={showModal}
                    onClose={() => setShowModal(false)}
                  >
                    <Modal.Header>Feedback</Modal.Header>
                    <Modal.Body>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {resultReq?.requestData.reasonOfReject ||
                            'No feedback provided.'}
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              )}

              {showModalCancle && (
                <div>
                  <Modal
                    show={showModalCancle}
                    size="md"
                    onClose={() => setShowModalCancle(false)}
                    popup
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Do you want to cancel your application?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button
                            className="bg-red-800 focus:outline-double focus:outline-red-600 focus:ring-0 dark:bg-red-700"
                            onClick={deleteAccount}
                          >
                            Yes, I'm sure
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => setShowModalCancle(false)}
                          >
                            No, cancel
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
