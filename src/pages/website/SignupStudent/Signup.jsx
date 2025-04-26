import { useFormik } from 'formik';
import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signupStudent } from '../../../redux/student/student.slice';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png'

export default function Signup() {
  const { isLoading } = useSelector((state) => state.students);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (value) => {
    const response = await dispatch(signupStudent(value));
    if (response?.payload?.success) {
      toast.success(response.payload.message);
      navigate('/student-login');
      formik.resetForm();
    } else {
      toast.error(response.payload.message);
    }
  };
  const validationSchema = yup.object({
    userName: yup.string().required('User Name is required'),
    userEmail: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    rePassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    userAge: yup
      .number()
      .min(9, 'You must be at least 9 years old')
      .required('Age is required'),
    phoneNumber: yup
      .string()
      .matches(/^(010|011|012|015)\d{8}$/, 'Phone number is not valid')
      .required('Phone number is required'),
  });
  const formik = useFormik({
    initialValues: {
      userName: '',
      userEmail: '',
      password: '',
      rePassword: '',
      userAge: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>signup</title>
        <meta name="description" content="singup page" />
        <meta name="keywords" content="signup, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 mt-10">
          <section className="bg-white dark:bg-gray-900">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
              <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                <img
                  alt="Educational Background"
                  src="https://plus.unsplash.com/premium_vector-1725522711251-8df86fad1a9e?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </aside>

              <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                <div className="max-w-xl lg:max-w-3xl">
                  <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                    Join Our Learning Community
                  </h1>

                  <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-300">
                    Ready to start your learning journey?
                  </p>

                  <form
                    onSubmit={formik.handleSubmit}
                    action="#"
                    className="mt-8 grid grid-cols-6 gap-6"
                  >
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="userName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        name
                      </label>
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        className={
                          formik.errors.userName && formik.touched.userName
                            ? 'placeholder:text-red-600 mt-1 w-full rounded-md border-red-600 dark:border-red-600  bg-red-600 bg-opacity-50  text-sm  shadow-sm'
                            : 'mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm'
                        }
                        placeholder="John"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                      />
                      {formik.errors.userName && formik.touched.userName ? (
                        <p className="text-red-600 text-sm mt-2">
                          {formik.errors.userName}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="userEmail"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Email
                      </label>

                      <input
                        type="text"
                        id="userEmail"
                        name="userEmail"
                        className={
                          formik.errors.userEmail && formik.touched.userEmail
                            ? 'mt-1 w-full rounded-md border-red-600 placeholder:text-red-600 dark:border-red-600  bg-red-600 bg-opacity-50  text-sm  shadow-sm'
                            : 'mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm'
                        }
                        placeholder="ex@gmail.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userEmail}
                      />
                      {formik.errors.userEmail && formik.touched.userEmail ? (
                        <p className="text-red-600 text-sm mt-2">
                          {formik.errors.userEmail}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        phone
                      </label>

                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className={
                          formik.errors.phoneNumber &&
                          formik.touched.phoneNumber
                            ? 'mt-1 w-full placeholder:text-red-600 rounded-md border-red-600 dark:border-red-600  bg-red-600 bg-opacity-50  text-sm  shadow-sm'
                            : 'mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm'
                        }
                        placeholder="Your phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                      />
                      {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber ? (
                        <p className="text-red-600 text-sm mt-2">
                          {formik.errors.phoneNumber}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="userAge"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Age
                      </label>

                      <input
                        type="text"
                        id="userAge"
                        name="userAge"
                        className={
                          formik.errors.userAge && formik.touched.userAge
                            ? 'mt-1 w-full placeholder:text-red-600 rounded-md border-red-600 dark:border-red-600  bg-red-600 bg-opacity-50  text-sm  shadow-sm'
                            : 'mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm'
                        }
                        placeholder="your Age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userAge}
                      />
                      {formik.errors.userAge && formik.touched.userAge ? (
                        <p className="text-red-600 text-sm mt-2">
                          {formik.errors.userAge}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'password' : 'text'}
                          id="Password"
                          name="password"
                          className={
                            formik.errors.password && formik.touched.password
                              ? 'mt-1 placeholder:text-red-600 w-full rounded-md border-red-600 dark:border-red-600  bg-red-600 bg-opacity-50  text-sm  shadow-sm'
                              : 'mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm'
                          }
                          placeholder="********"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        <div>
                          {showPassword ? (
                            <svg
                              onClick={togglePassword}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5 absolute top-3 dark:text-white right-2"
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
                              className="size-5 absolute top-3 dark:text-white right-2"
                            >
                              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              <path
                                fill-rule="evenodd"
                                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {formik.errors.password && formik.touched.password ? (
                        <p className="text-red-600 text-sm mt-2">
                          {formik.errors.password}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="rePassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'password' : 'text'}
                          id="rePassword"
                          name="rePassword"
                          className={
                            formik.errors.password && formik.touched.password
                              ? 'mt-1 placeholder:text-red-600 w-full rounded-md border-red-600 dark:border-red-600  bg-red-600 bg-opacity-50  text-sm  shadow-sm'
                              : 'mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm'
                          }
                          placeholder="********"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.rePassword}
                        />
                        <div>
                          {showPassword ? (
                            <svg
                              onClick={togglePassword}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5 absolute top-3 dark:text-white right-2"
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
                              className="size-5 absolute top-3 dark:text-white right-2"
                            >
                              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              <path
                                fill-rule="evenodd"
                                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {formik.errors.rePassword && formik.touched.password ? (
                        <p className="text-red-600 text-sm mt-2">
                          {formik.errors.rePassword}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:border-blue-500 dark:bg-blue-500 dark:text-white dark:hover:bg-transparent dark:hover:text-blue-500">
                        {isLoading ? (
                          <p className="animate-bounce">Create Account</p>
                        ) : (
                          'Create Account'
                        )}
                      </button>

                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 sm:mt-0">
                        Already have an account?
                        <Link
                          to="/student-login"
                          className="text-gray-700 dark:text-gray-400 underline"
                        >
                          {' '}
                          Log in
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
