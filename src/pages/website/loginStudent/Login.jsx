import { useFormik } from 'formik';
import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  loginStudent,
  setLogin,
  setStudentToken,
} from '../../../redux/student/student.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png'
export default function Login() {
  const { isLoading } = useSelector((state) => state.students);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
 
  const validationSchema = yup.object({
    userEmail: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(value) {
    const response = await dispatch(loginStudent(value));
    
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      localStorage.setItem('tokenStudent', `ahmed__${response.payload.token}`);      
      dispatch(setLogin(`ahmed__${response.payload.token}`));
      dispatch(setStudentToken(`ahmed__${response.payload.token}`));
      navigate('/courses');
    } else {
      toast.error(response.payload.message);
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>login</title>
        <meta name="description" content="Login page" />
        <meta name="keywords" content="login, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />                
      </Helmet>
      <div className="py-28 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-3xl">
              Start Learning Today
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300">
              Join thousands of students and instructors using our platform to
              enhance their skills and achieve their educational goals.
            </p>

            <form
              onSubmit={formik.handleSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-800 dark:shadow-none"
            >
              <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-200">
                Sign in to your account
              </p>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className={
                      formik.errors.userEmail && formik.touched.userEmail
                        ? 'w-full placeholder:text-red-400 rounded-lg border-red-200 bg-red-600 dark:bg-red-600 bg-opacity-50 dark:bg-opacity-50 dark:border-red-600 p-4 pe-12 text-sm shadow-sm dark:text-white'
                        : 'w-full rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-700 p-4 pe-12 text-sm shadow-sm dark:text-white'
                    }
                    placeholder="Enter your email"
                    name="userEmail"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userEmail}
                  />
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400 dark:text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
                {formik.errors.userEmail && formik.touched.userEmail ? (
                  <p className="text-red-600 text-sm mt-2">
                    {formik.errors.userEmail}
                  </p>
                ) : (
                  ''
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'password' : 'text'}
                    className={
                      formik.errors.password && formik.touched.password
                        ? 'w-full rounded-lg placeholder:text-red-400 border-red-200 bg-red-600 dark:bg-red-600 bg-opacity-50 dark:bg-opacity-50 dark:border-red-600 p-4 pe-12 text-sm shadow-sm dark:text-white'
                        : 'w-full rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-700 p-4 pe-12 text-sm shadow-sm dark:text-white'
                    }
                    placeholder="Enter your password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    {showPassword ? (
                      <svg
                        onClick={togglePassword}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 cursor-pointer text-gray-400 dark:text-gray-300"
                      >
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                      </svg>
                    ) : (
                      <svg
                        onClick={togglePassword}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 cursor-pointer text-gray-400 dark:text-gray-300"
                      >
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path
                          fill-rule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-red-600 text-sm mt-2">
                    {formik.errors.password}
                  </p>
                ) : (
                  ''
                )}
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 dark:bg-indigo-500 px-5 py-3 text-sm font-medium text-white"
              >
                {isLoading ? (
                  <p className="animate-bounce">Sign in</p>
                ) : (
                  'Sign in'
                )}
              </button>

              <div className="flex justify-between">
                <p className="flex gap-3 items-center text-sm text-gray-500 dark:text-gray-300">
                  Don't have an account?
                  <Link
                    className="underline text-indigo-600 dark:text-indigo-400"
                    to="/student-signup"
                  >
                    Sign up
                  </Link>
                </p>
                <Link
                  className="underline text-indigo-600 dark:text-indigo-400"
                  to="/student-forgetPassword"
                >
                  forget Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
