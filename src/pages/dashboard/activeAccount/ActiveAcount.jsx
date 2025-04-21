import { useFormik } from 'formik';
import InputField from '../../../components/Input/InputField';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { activeAccountEmployee } from '../../../redux/instructor/instructorSlice';
import { toast } from 'react-toastify';
import Steper from '../../../components/Steper/Steper';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function ActiveAcount() {
  const { isLoading } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();
  async function activeAccount(value) {
    const response = await dispatch(activeAccountEmployee(value));
    if (response?.payload.success === false) {
      toast.error(response?.payload.message);
    } else {
      toast.success(response?.payload.message);
      setTimeout(() => {
        window.location.href = '/login-employee';
      }, 3000);
    }
  }
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('The email is required'),
    code: yup
      .string()
      .length(8, 'The code must be 8 characters')
      .required('The code is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    onSubmit: activeAccount,
    validationSchema,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Activate account</title>
        <meta name="description" content="Activate Account page" />
        <meta name="keywords" content="Activate Account, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="bg-gray-600 dark:bg-gray-800 bg-opacity-10 fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center ">
        <Steper stepStyle={'bg-green-200'} icon={'check'} />
        <div className="w-full h-full flex justify-center items-center">
          <div className="p-4 w-full max-w-md">
            <div className={`bg-white dark:bg-gray-900 rounded-lg shadow `}>
              <div className="p-4 md:p-5">
                <form
                  action=""
                  className="space-y-3"
                  onSubmit={formik.handleSubmit}
                >
                  <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                    inputType="email"
                    type="input"
                    title={
                      formik.errors.email && formik.touched.email
                        ? `${formik.errors.email}`
                        : 'Email address'
                    }
                    styleSpan={
                      formik.errors.email && formik.touched.email
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }
                    placeholder={
                      formik.errors.email && formik.touched.email
                        ? `${formik.errors.email}`
                        : '@gmail.com'
                    }
                    inputStyle={
                      formik.errors.email && formik.touched.email
                        ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                        : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                    }
                    icon={
                      formik.errors.email && formik.touched.email
                        ? 'bug'
                        : 'envelope'
                    }
                    iconStyle={
                      formik.errors.email && formik.touched.email
                        ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                        : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                    }
                  />
                  <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.code}
                    name="code"
                    inputType="text"
                    type="input"
                    title={
                      formik.errors.code && formik.touched.code
                        ? `${formik.errors.code}`
                        : 'code'
                    }
                    styleSpan={
                      formik.errors.code && formik.touched.code
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }
                    placeholder={
                      formik.errors.code && formik.touched.code
                        ? `${formik.errors.code}`
                        : '00 00 00 00'
                    }
                    inputStyle={
                      formik.errors.code && formik.touched.code
                        ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                        : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                    }
                    icon={
                      formik.errors.code && formik.touched.code ? 'bug' : 'code'
                    }
                    iconStyle={
                      formik.errors.code && formik.touched.code
                        ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                        : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                    }
                  />
                  <label className="flex justify-center">
                    {isLoading ? (
                      <button
                        type="submit"
                        className="w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg"
                        disabled
                      >
                        <i className="fa-solid fa-spinner fa-spin-pulse text-2xl"></i>
                      </button>
                    ) : (
                      <button className="w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg">
                        Active
                      </button>
                    )}
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
