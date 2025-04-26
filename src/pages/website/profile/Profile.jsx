import { useEffect, useState } from 'react';
import { FileInput, Label, Spinner } from 'flowbite-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  updateUserData,
  userProfileData,
} from '../../../redux/student/student.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png'

export default function Profile() {
  const [toggleProfile, setToggleProfile] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const { isLoading, profile } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const validationSchemaUser = yup.object({
    userAge: yup.number().min(9, 'You must be at least 9 years old'),
    phoneNumber: yup
      .string()
      .matches(/^(010|011|012|015)\d{8}$/, 'Phone number is not valid'),
  });
  const validationSchemaPass = yup.object({
    oldPass: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('New Password is required'),
    rePass: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const formikUser = useFormik({
    initialValues: {
      userAge: profile.userData.userAge,
      phoneNumber: profile.userData.phoneNumber,
    },
    validationSchema: validationSchemaUser,
    onSubmit: async (value) => {
      const response = await dispatch(updateUserData(value));
      if (response?.payload?.success) {
        toast.success(response.payload.message);
        dispatch(userProfileData());
      } else {
        toast.error(response.payload.message);
      }
    },
  });
  const formikPassword = useFormik({
    initialValues: {
      oldPass: '',
      password: '',
      rePass: '',
    },
    validationSchema: validationSchemaPass,
    onSubmit: async (value) => {
      const response = await dispatch(updateUserData(value));
      if (response?.payload?.success) {
        toast.success(response.payload.message);
        dispatch(userProfileData());
      } else {
        toast.error(response.payload.message);
      }
    },
  });
  const formikPhoto = useFormik({
    initialValues: {
      photo: null,
    },
    onSubmit: async (value) => {
      const formData = new FormData();
      setIsLoadingProfile(true);
      if (value.photo) {
        formData.append('photo', value.photo);
      } else {
        toast.error('No file selected');
        setIsLoadingProfile(false);
        return;
      }

      const response = await dispatch(updateUserData(formData));
      if (response?.payload?.success) {
        setIsLoadingProfile(false);
        toast.success(response.payload.message);
        dispatch(userProfileData());
      } else {
        setIsLoadingProfile(false);
        toast.error(response.payload.message);
      }
    },
  });
  useEffect(() => {
    dispatch(userProfileData());
  }, [dispatch]);
  const handleImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      formikPhoto.setFieldValue('photo', files[0]);
    }
  };
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>My Profile</title>
        <meta name="description" content="My Profile page" />
        <meta name="keywords" content="My Profile, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="py-28 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 p-4 flex flex-col shadow rounded-md items-center md:col-span-4 bg-gray-100 dark:text-white dark:bg-gray-800 ">
              <div className="h-28 w-28  bg-gray-200 dark:bg-gray-900 rounded-full ">
                {isLoadingProfile ? (
                  <div className="flex justify-center items-center w-full h-full rounded-full p-2 bg-gray-800 bg-opacity-50">
                    <Spinner color="info" aria-label="Info spinner example" />
                  </div>
                ) : (
                  <img
                    src={profile?.userData?.profilePicture?.secure_url}
                    className="h-28 w-28 rounded-full p-2"
                    alt="profile"
                  />
                )}
              </div>
              <div>
                <p>{profile?.userData?.userName}</p>
              </div>
              <div className="space-y-3 mt-8 ">
                <button
                  onClick={() => setToggleProfile('user')}
                  className={`${
                    toggleProfile == 'user'
                      ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-950 duration-300 transition ease-linear dark:hover:bg-gray-950 py-2 w-52 rounded-md flex items-center justify-center gap-2'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 duration-300 transition ease-linear dark:hover:bg-gray-950 py-2 w-52 rounded-md flex items-center justify-center gap-2'
                  }`}
                >
                  <i className="fa-regular fa-user"></i>{' '}
                  <span className="mt-1">Profile</span>
                </button>
                <button
                  onClick={() => setToggleProfile('photo')}
                  className={`${
                    toggleProfile == 'photo'
                      ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-950 duration-300 transition ease-linear dark:hover:bg-gray-950 py-2 w-52 rounded-md flex items-center justify-center gap-2'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 duration-300 transition ease-linear dark:hover:bg-gray-950 py-2 w-52 rounded-md flex items-center justify-center gap-2'
                  }`}
                >
                  <i className="fa-regular fa-image"></i>{' '}
                  <span className="mt-1">Photo</span>
                </button>
                <button
                  onClick={() => setToggleProfile('security')}
                  className={`${
                    toggleProfile == 'security'
                      ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-950 duration-300 transition ease-linear dark:hover:bg-gray-950 py-2 w-52 rounded-md flex items-center justify-center gap-2'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 duration-300 transition ease-linear dark:hover:bg-gray-950 py-2 w-52 rounded-md flex items-center justify-center gap-2'
                  }`}
                >
                  <i className="fa-solid fa-shield"></i>{' '}
                  <span className="mt-1">Account Security</span>
                </button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 flex-col p-4 shadow rounded-md items-center  bg-gray-100 dark:text-white dark:bg-gray-800 ">
              {toggleProfile == 'user' && (
                <form
                  onSubmit={formikUser.handleSubmit}
                  action=""
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="email" className="text-sm p-1">
                      Email
                    </label>
                    <div className="w-full rounded-md mt-1 border p-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm">
                      {profile?.userData?.userEmail}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm p-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={formikUser.values.phoneNumber}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                      name="phoneNumber"
                      id="phone"
                      placeholder="phone"
                      className="w-full rounded-md mt-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
                    />
                    {formikUser.errors.phoneNumber &&
                    formikUser.touched.phoneNumber ? (
                      <p className="text-red-600 text-sm mt-2">
                        {formikUser.errors.phoneNumber}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>

                  <div>
                    <label htmlFor="Age" className="text-sm p-1">
                      Age
                    </label>
                    <input
                      type="text"
                      id="Age"
                      value={formikUser.values.userAge}
                      onBlur={formikUser.handleBlur}
                      onChange={formikUser.handleChange}
                      name="userAge"
                      placeholder="Age"
                      className="w-full rounded-md mt-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
                    />
                    {formikUser.errors.userAge && formikUser.touched.userAge ? (
                      <p className="text-red-600 text-sm mt-2">
                        {formikUser.errors.userAge}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-linear dark:bg-blue-700 dark:hover:bg-blue-800 mt-5 w-32 p-2 rounded">
                      {isLoading ? (
                        <p className="animate-pulse">Edit Data</p>
                      ) : (
                        'Edit Data'
                      )}
                    </button>
                  </div>
                </form>
              )}
              {toggleProfile == 'security' && (
                <form
                  onSubmit={formikPassword.handleSubmit}
                  action=""
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="password" className="text-sm p-1">
                      Old Password
                    </label>
                    <div className="relative">
                      <input
                        name="oldPass"
                        onChange={formikPassword.handleChange}
                        onBlur={formikPassword.handleBlur}
                        value={formikPassword.values.oldPass}
                        type={showPassword ? 'password' : 'text'}
                        id="password"
                        placeholder="password"
                        className="w-full rounded-md mt-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
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
                    {formikPassword.errors.oldPass &&
                    formikPassword.touched.oldPass ? (
                      <p className="text-red-600 text-sm mt-2">
                        {formikPassword.errors.oldPass}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="text-sm p-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        onChange={formikPassword.handleChange}
                        onBlur={formikPassword.handleBlur}
                        value={formikPassword.values.password}
                        type={showPassword ? 'password' : 'text'}
                        id="newPassword"
                        placeholder="Enter new Password"
                        className="w-full rounded-md mt-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
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
                    {formikPassword.errors.password &&
                    formikPassword.touched.password ? (
                      <p className="text-red-600 text-sm mt-2">
                        {formikPassword.errors.password}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    <label htmlFor="conNewPassword" className="text-sm p-1">
                      Confirm new Password
                    </label>
                    <div className="relative">
                      <input
                        name="rePass"
                        onChange={formikPassword.handleChange}
                        onBlur={formikPassword.handleBlur}
                        value={formikPassword.values.rePass}
                        type={showPassword ? 'password' : 'text'}
                        id="conNewPassword"
                        placeholder="Enter confirm new Password"
                        className="w-full rounded-md mt-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
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
                    {formikPassword.errors.rePass &&
                    formikPassword.touched.rePass ? (
                      <p className="text-red-600 text-sm mt-2">
                        {formikPassword.errors.rePass}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-linear dark:bg-blue-700 dark:hover:bg-blue-800 mt-5 w-32 p-2 rounded">
                      {isLoading ? (
                        <p className="animate-pulse">Edit Password</p>
                      ) : (
                        'Edit Password'
                      )}
                    </button>
                  </div>
                </form>
              )}
              {toggleProfile === 'photo' && (
                <form onSubmit={formikPhoto.handleSubmit} action="">
                  <div className="flex w-full items-center justify-center">
                    <Label
                      htmlFor="dropzone-file"
                      className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formikPhoto.values.photo
                            ? formikPhoto.values.photo.name
                            : 'No file selected'}
                        </p>
                      </div>
                      <FileInput
                        onChange={handleImage}
                        id="dropzone-file"
                        className="hidden"
                      />
                    </Label>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-linear dark:bg-blue-700 dark:hover:bg-blue-800 mt-5 w-32 p-2 rounded ${
                        isLoadingProfile ? 'opacity-50' : ''
                      }`}
                      disabled={isLoadingProfile}
                    >
                      {isLoadingProfile ? 'Uploading...' : 'Edit Photo'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
