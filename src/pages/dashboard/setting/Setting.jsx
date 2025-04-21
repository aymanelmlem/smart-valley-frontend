import { useEffect, useState } from 'react';
import InputField from '../../../components/Input/InputField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  profileEmp,
  socialLinkEmp,
  updateDataEmp,
  updatePasswordEmp,
  updateProfileEmp,
} from '../../../redux/instructor/instructorSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
import { jwtDecode } from 'jwt-decode';
export default function Setting() {
  const { getProfile, isLoading, employeeToken } = useSelector(
    (state) => state.instructor
  );
  const [typeEmp, setTypeEmp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [togglePassword, setTogglePassword] = useState({
    password: false,
    newPass: false,
    rePass: false,
  });
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [toggleGroup, setToggleGroup] = useState('password');

  function togglePass(field) {
    setTogglePassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  }

  async function updatePassword(values) {
    setIsLoadingPassword(true);
    const response = await dispatch(updatePasswordEmp(values));
    setIsLoadingPassword(false);
    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      dispatch(profileEmp());
      navigate('/login-employee');
      localStorage.removeItem('TokenEmployee');
      formik.resetForm();
    } else {
      toast.error(response?.payload?.message);
    }
  }

  async function updateUserData(values) {
    setIsLoadingUserData(true);
    const response = await dispatch(updateDataEmp(values));
    setIsLoadingUserData(false);
    if (response.payload.success) {
      toast.success(response?.payload?.message);
      dispatch(profileEmp());
      formikData.resetForm();
    } else {
      toast.error(response?.payload?.message);
    }
  }

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(10, 'The password must be more than or equal to 10 characters')
      .required('The password is required'),
    newPass: yup
      .string()
      .min(10, 'The New password must be more than or equal to 10 characters')
      .required('The New password is required'),
    rePass: yup
      .string()
      .oneOf([yup.ref('newPass'), null], 'Passwords must match')
      .required('The password confirmation is required'),
  });

  const validationUserData = yup.object({
    name: yup
      .string()
      .min(3, 'The name must be more than or equal to 3 characters'),
    job: yup
      .string()
      .min(3, 'The name must be more than or equal to 3 characters'),
    introductionPerson: yup
      .string()
      .min(10, 'The Introduction must be more than or equal to 10 characters'),
    phone: yup
      .string()
      .matches(
        /^01[0125][0-9]{8}$/,
        'Please enter a valid Egyptian phone number'
      ),
    address: yup
      .string()
      .min(10, 'The address must be more than or equal to 10 characters'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPass: '',
      rePass: '',
    },
    validationSchema,
    onSubmit: updatePassword,
  });

  const formikData = useFormik({
    initialValues: {
      name: '',
      job: '',
      introductionPerson: '',
      phone: '',
      address: '',
    },
    onSubmit: (values) => {
      const { name, job, introductionPerson, phone, address } = values;
      if (name) {
        updateUserData({ name });
      }
      if (job) {
        updateUserData({ job });
      }
      if (introductionPerson) {
        updateUserData({ introductionPerson });
      }
      if (phone) {
        updateUserData({ phone });
      }
      if (address) {
        updateUserData({ address });
      }
    },
    validationSchema: validationUserData,
  });

  const formikProfile = useFormik({
    initialValues: {
      profilePicture: null,
    },
    onSubmit: async (values) => {
      setIsLoadingProfile(true);
      const formData = new FormData();
      if (values.profilePicture) {
        formData.append('profilePicture', values.profilePicture);
      } else {
        toast.error('No file selected');
        setIsLoadingProfile(false);
        return;
      }

      try {
        const response = await dispatch(updateProfileEmp(formData)).unwrap();
        setIsLoadingProfile(false);
        if (response.success) {
          toast.success(response.message);
          dispatch(profileEmp());
          formikProfile.resetForm();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        setIsLoadingProfile(false);
        toast.error(error.message || 'An error occurred');
      }
    },
  });
  const validSocialLink = (platform) => {
    return yup
      .string()
      .url('Must be a valid URL')
      .test(
        'is-valid-url',
        `Link must start with a valid ${platform} URL`,
        (value) => {
          if (!value) return true;
          const patterns = {
            facebook: /^(http|https):\/\/(www\.)?facebook\.com\/.+/,
            github: /^(http|https):\/\/(www\.)?github\.com\/.+/,
            youtube: /^(http|https):\/\/(www\.)?youtube\.com\/.+/,
            linkedin: /^(http|https):\/\/(www\.)?linkedin\.com\/.+/,
          };
          return patterns[platform].test(value);
        }
      );
  };
  const validationSocialLink = yup.object().shape({
    facebook: yup.object().shape({
      link: validSocialLink('facebook'),
    }),
    github: yup.object().shape({
      link: validSocialLink('github'),
    }),
    youtube: yup.object().shape({
      link: validSocialLink('youtube'),
    }),
    linkedin: yup.object().shape({
      link: validSocialLink('linkedin'),
    }),
  });

  const formikSocialLink = useFormik({
    initialValues: {
      facebook: { link: '', removeOrNot: false },
      github: { link: '', removeOrNot: false },
      youtube: { link: '', removeOrNot: false },
      linkedin: { link: '', removeOrNot: false },
    },
    validationSchema: validationSocialLink,
    onSubmit: async (values) => {
      const { facebook, linkedin, youtube, github } = values;

      const socialLinks = {};

      if (facebook.link) {
        socialLinks.facebook = { link: facebook.link };
      }
      if (linkedin.link) {
        socialLinks.linkedin = { link: linkedin.link };
      }
      if (youtube.link) {
        socialLinks.youtube = { link: youtube.link };
      }
      if (github.link) {
        socialLinks.github = { link: github.link };
      }


      if (Object.keys(socialLinks).length > 0) {
        await socialLinkFun(socialLinks);
      } else {
        toast.error('No social links to update.');
      }
    },
  });
  async function socialLinkFun(values) {
    const response = await dispatch(socialLinkEmp({ values }));

    if (response.payload.message === 'the user data is updated sucessfully') {
      toast.success(response?.payload?.message);

      formikSocialLink.resetForm();
    } else {
      toast.error(response?.payload?.message);
    }
  }
  const handleChangeFile = (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      formikProfile.setFieldValue('profilePicture', files[0]);
    }
  };
  useEffect(() => {
    dispatch(profileEmp());
  }, [dispatch]);

  useEffect(() => {
    if (employeeToken) {
      const data = jwtDecode(employeeToken);
      setTypeEmp(data);
    }
  }, [employeeToken]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Setting</title>
        <meta name="description" content="Setting page" />
        <meta name="keywords" content="Setting, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <div className="min-h-screen flex flex-col items-center py-10 ">
          <div className="bg-white dark:bg-gray-900  rounded-xl shadow-lg w-full p-8">
            <form
              onSubmit={formikProfile.handleSubmit}
              className="flex flex-col md:flex-row items-center justify-between border-b pb-6 mb-6 border-gray-300 dark:border-gray-700"
            >
              <div className="flex items-center mb-6 md:mb-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-300">
                  {isLoading ? (
                    <div className="flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-40 dark:bg-opacity-40 dark:bg-gray-600">
                      <Spinner color="info" aria-label="Info spinner example" />
                    </div>
                  ) : (
                    <img
                      src={getProfile?.user?.profilePicture?.secure_url}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  )}
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                  >
                    <i className="fas fa-camera"></i>
                    <input
                      id="file-upload"
                      type="file"
                      name="profilePicture"
                      className="sr-only"
                      onChange={handleChangeFile}
                    />
                  </label>
                </div>
                <div className="ml-6 text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {getProfile?.user?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {getProfile?.user?.role}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className={`bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 ${
                  isLoadingProfile
                    ? 'bg-gray-400 bg-opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={isLoadingProfile}
              >
                {isLoadingProfile ? (
                  'Updating...'
                ) : (
                  <>
                    <i className="fas fa-edit"></i> Edit
                  </>
                )}
              </button>
            </form>
            <div className="inline-flex flex-wrap rounded-lg border border-gray-100 bg-gray-100 p-1 mb-4 dark:border-gray-700 dark:bg-gray-800">
              {/* security */}
              <button
                onClick={() => setToggleGroup('password')}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm hover:text-gray-700 
                    ${
                      toggleGroup === 'password'
                        ? 'text-blue-700 bg-white shadow-sm dark:bg-gray-700 dark:text-blue-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }
                    focus:relative`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 text-blue-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
                Security
              </button>
              {/* data */}
              <button
                onClick={() => setToggleGroup('dataUser')}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative 
                    ${
                      toggleGroup === 'dataUser'
                        ? 'text-blue-700 bg-white shadow-sm dark:bg-gray-700 dark:text-blue-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 text-blue-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Data
              </button>
              {/* social */}
              {typeEmp.role === 'admin' ? (
                ''
              ) : (
                <button
                  onClick={() => setToggleGroup('social')}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm hover:text-gray-700 focus:relative 
                    ${
                      toggleGroup === 'social'
                        ? 'text-blue-800 bg-white shadow-sm dark:bg-gray-700 dark:text-blue-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4 text-blue-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  Social Link
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {toggleGroup == 'password' && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">
                    Change Password
                  </h3>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <InputField
                      iconRight={togglePassword.password ? 'eye' : 'eye-slash'}
                      iconRightStyle="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer"
                      onClick={() => togglePass('password')}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                      type="input"
                      inputType={togglePassword.password ? 'text' : 'password'}
                      title={
                        formik.errors.password && formik.touched.password
                          ? `${formik.errors.password}`
                          : 'Current Password'
                      }
                      styleSpan={
                        formik.errors.password && formik.touched.password
                          ? 'text-red-600 mb-2'
                          : 'text-gray-600 dark:text-gray-300 mb-2'
                      }
                      placeholder={
                        formik.errors.password && formik.touched.password
                          ? `${formik.errors.password}`
                          : 'Current Password'
                      }
                      inputStyle={
                        formik.errors.password && formik.touched.password
                          ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                          : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                      }
                      icon={
                        formik.errors.password && formik.touched.password
                          ? 'bug'
                          : 'lock'
                      }
                      iconStyle={
                        formik.errors.password && formik.touched.password
                          ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                      }
                    />
                    <InputField
                      iconRight={togglePassword.newPass ? 'eye' : 'eye-slash'}
                      iconRightStyle="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => togglePass('newPass')}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.newPass}
                      name="newPass"
                      type="input"
                      inputType={togglePassword.newPass ? 'text' : 'password'}
                      title={
                        formik.errors.newPass && formik.touched.newPass
                          ? `${formik.errors.newPass}`
                          : 'New Password'
                      }
                      styleSpan={
                        formik.errors.newPass && formik.touched.newPass
                          ? 'text-red-600 mb-2'
                          : 'text-gray-600 dark:text-gray-300 mb-2'
                      }
                      placeholder={
                        formik.errors.newPass && formik.touched.newPass
                          ? `${formik.errors.newPass}`
                          : 'New Password'
                      }
                      inputStyle={
                        formik.errors.newPass && formik.touched.newPass
                          ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                          : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                      }
                      icon={
                        formik.errors.newPass && formik.touched.newPass
                          ? 'bug'
                          : 'lock'
                      }
                      iconStyle={
                        formik.errors.newPass && formik.touched.newPass
                          ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                      }
                    />
                    <InputField
                      iconRight={togglePassword.rePass ? 'eye' : 'eye-slash'}
                      iconRightStyle="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => togglePass('rePass')}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.rePass}
                      name="rePass"
                      type="input"
                      inputType={togglePassword.rePass ? 'text' : 'password'}
                      title={
                        formik.errors.rePass && formik.touched.rePass
                          ? `${formik.errors.rePass}`
                          : 'Confirm Password'
                      }
                      styleSpan={
                        formik.errors.rePass && formik.touched.rePass
                          ? 'text-red-600 mb-2'
                          : 'text-gray-600 dark:text-gray-300 mb-2'
                      }
                      placeholder={
                        formik.errors.rePass && formik.touched.rePass
                          ? `${formik.errors.rePass}`
                          : 'Confirm Password'
                      }
                      inputStyle={
                        formik.errors.rePass && formik.touched.rePass
                          ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                          : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                      }
                      icon={
                        formik.errors.rePass && formik.touched.rePass
                          ? 'bug'
                          : 'lock'
                      }
                      iconStyle={
                        formik.errors.rePass && formik.touched.rePass
                          ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                      }
                    />
                    <button
                      type="submit"
                      disabled={isLoadingPassword}
                      className={`w-full py-2 px-4 rounded-lg ${
                        isLoadingPassword
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700'
                      } text-white`}
                    >
                      {isLoadingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              )}
              {toggleGroup == 'dataUser' && (
                <div className="bg-gray-50 dark:bg-gray-800  rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Update Information
                  </h3>
                  <form
                    onSubmit={formikData.handleSubmit}
                    className="space-y-4"
                  >
                    <InputField
                      onBlur={formikData.handleBlur}
                      onChange={formikData.handleChange}
                      value={formikData.values.name}
                      name="name"
                      type="input"
                      title={
                        formikData.errors.name && formikData.touched.name
                          ? `${formikData.errors.name}`
                          : 'Name'
                      }
                      styleSpan={
                        formikData.errors.name && formikData.touched.name
                          ? 'text-red-600 mb-2'
                          : 'text-gray-600 dark:text-gray-300 mb-2'
                      }
                      placeholder={
                        formikData.errors.name && formikData.touched.name
                          ? `${formikData.errors.name}`
                          : 'Name'
                      }
                      inputStyle={
                        formikData.errors.name && formikData.touched.name
                          ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                          : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                      }
                      icon={
                        formikData.errors.name && formikData.touched.name
                          ? 'bug'
                          : 'user'
                      }
                      iconStyle={
                        formikData.errors.name && formikData.touched.name
                          ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                      }
                    />
                    <InputField
                      onBlur={formikData.handleBlur}
                      onChange={formikData.handleChange}
                      value={formikData.values.job}
                      name="job"
                      type="input"
                      title={
                        formikData.errors.job && formikData.touched.job
                          ? `${formikData.errors.job}`
                          : 'Job'
                      }
                      styleSpan={
                        formikData.errors.job && formikData.touched.job
                          ? 'text-red-600 mb-2'
                          : 'text-gray-600 dark:text-gray-300 mb-2'
                      }
                      placeholder={
                        formikData.errors.job && formikData.touched.job
                          ? `${formikData.errors.job}`
                          : 'Job'
                      }
                      inputStyle={
                        formikData.errors.job && formikData.touched.job
                          ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                          : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                      }
                      icon={
                        formikData.errors.job && formikData.touched.job
                          ? 'bug'
                          : 'briefcase'
                      }
                      iconStyle={
                        formikData.errors.job && formikData.touched.job
                          ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                      }
                    />
                    <InputField
                      onBlur={formikData.handleBlur}
                      onChange={formikData.handleChange}
                      value={formikData.values.address}
                      name="address"
                      type="input"
                      title={
                        formikData.errors.address && formikData.touched.address
                          ? `${formikData.errors.address}`
                          : 'Address'
                      }
                      styleSpan={
                        formikData.errors.address && formikData.touched.address
                          ? 'text-red-600 mb-2'
                          : 'text-gray-600 dark:text-gray-300 mb-2'
                      }
                      placeholder={
                        formikData.errors.address && formikData.touched.address
                          ? `${formikData.errors.address}`
                          : 'Address'
                      }
                      inputStyle={
                        formikData.errors.address && formikData.touched.address
                          ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                          : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                      }
                      icon={
                        formikData.errors.address && formikData.touched.address
                          ? 'bug'
                          : 'location-dot'
                      }
                      iconStyle={
                        formikData.errors.address && formikData.touched.address
                          ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                      }
                    />
                    <InputField
                      onBlur={formikData.handleBlur}
                      onChange={formikData.handleChange}
                      value={formikData.values.phone}
                      name="phone"
                      type="input"
                      title={
                        formikData.errors.phone && formikData.touched.phone
                          ? `${formikData.errors.phone}`
                          : 'Phone'
                      }
                      styleSpan={
                        formikData.errors.phone && formikData.touched.phone
                          ? 'text-red-600 mb-2'
                          : 'text-gray-600 dark:text-gray-300 mb-2'
                      }
                      placeholder={
                        formikData.errors.phone && formikData.touched.phone
                          ? `${formikData.errors.phone}`
                          : 'Phone'
                      }
                      inputStyle={
                        formikData.errors.phone && formikData.touched.phone
                          ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                          : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                      }
                      icon={
                        formikData.errors.phone && formikData.touched.phone
                          ? 'bug'
                          : 'phone'
                      }
                      iconStyle={
                        formikData.errors.phone && formikData.touched.phone
                          ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                          : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                      }
                    />
                    {typeEmp.role === 'admin' ||
                    typeEmp.role === 'superAdmin' ? (
                      ''
                    ) : (
                      <InputField
                        onBlur={formikData.handleBlur}
                        onChange={formikData.handleChange}
                        value={formikData.values.introductionPerson}
                        name="introductionPerson"
                        type="textarea"
                        title={
                          formikData.errors.introductionPerson &&
                          formikData.touched.introductionPerson
                            ? `${formikData.errors.introductionPerson}`
                            : 'My intoduction'
                        }
                        styleSpan={
                          formikData.errors.introductionPerson &&
                          formikData.touched.introductionPerson
                            ? 'text-red-600 mb-2'
                            : 'text-gray-600 dark:text-gray-300 mb-2'
                        }
                        placeholder={
                          formikData.errors.introductionPerson &&
                          formikData.touched.introductionPerson
                            ? `${formikData.errors.introductionPerson}`
                            : 'My intoduction'
                        }
                        inputStyle={
                          formikData.errors.introductionPerson &&
                          formikData.touched.introductionPerson
                            ? 'w-full border border-red-500 bg-red-600 bg-opacity-50 rounded-lg p-4 pl-12 placeholder-red-500'
                            : 'w-full dark:bg-gray-700  border border-gray-300 ring-0  dark:text-gray-300 bg-white rounded-lg p-4 pl-12 placeholder-gray-500 dark:placeholder-gray-300'
                        }
                        icon={
                          formikData.errors.introductionPerson &&
                          formikData.touched.introductionPerson
                            ? 'bug'
                            : 'check'
                        }
                        iconStyle={
                          formikData.errors.introductionPerson &&
                          formikData.touched.introductionPerson
                            ? 'absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500'
                            : 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300'
                        }
                      />
                    )}
                    <button
                      type="submit"
                      disabled={isLoadingUserData}
                      className={`w-full py-2 px-4 rounded-lg ${
                        isLoadingUserData
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700'
                      } text-white`}
                    >
                      {isLoadingUserData ? 'Updating...' : 'Update Information'}
                    </button>
                  </form>
                </div>
              )}
              {toggleGroup == 'social' && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">
                    Social Link
                  </h3>
                  <form
                    onSubmit={formikSocialLink.handleSubmit}
                    className="space-y-4"
                  >
                    {/* Facebook */}
                    <div className="relative">
                      <label htmlFor="Facebook" className="sr-only">
                        {' '}
                        Facebook{' '}
                      </label>
                      <input
                        value={formikSocialLink.values.facebook.link}
                        name="facebook.link"
                        onChange={formikSocialLink.handleChange}
                        onBlur={formikSocialLink.handleBlur}
                        type="text"
                        id="Facebook"
                        placeholder="Facebook"
                        className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 py-2.5 pe-10 shadow-sm sm:text-sm"
                      />
                      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <i className="fa-brands fa-square-facebook text-blue-600"></i>
                        </button>
                      </span>
                      
                    </div>
                    {formikSocialLink.touched.facebook?.link &&
                      formikSocialLink.errors.facebook?.link && (
                        <div className="text-red-600 text-sm">
                          {formikSocialLink.errors.facebook.link}
                        </div>
                      )}

                    {/* LinkedIn */}
                    <div className="relative">
                      <label htmlFor="linkedin" className="sr-only">
                        {' '}
                        LinkedIn{' '}
                      </label>
                      <input
                        value={formikSocialLink.values.linkedin.link}
                        name="linkedin.link"
                        onChange={formikSocialLink.handleChange}
                        onBlur={formikSocialLink.handleBlur}
                        type="text"
                        id="linkedin"
                        placeholder="LinkedIn"
                        className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 py-2.5 pe-10 shadow-sm sm:text-sm"
                      />
                      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <i className="fa-brands fa-linkedin text-sky-600"></i>
                        </button>
                      </span>
                    </div>
                    {formikSocialLink.touched.linkedin?.link &&
                      formikSocialLink.errors.linkedin?.link && (
                        <div className="text-red-600 text-sm">
                          {formikSocialLink.errors.linkedin.link}
                        </div>
                      )}

                    {/* YouTube */}
                    <div className="relative">
                      <label htmlFor="youtube" className="sr-only">
                        {' '}
                        YouTube{' '}
                      </label>
                      <input
                        value={formikSocialLink.values.youtube.link}
                        name="youtube.link"
                        onChange={formikSocialLink.handleChange}
                        onBlur={formikSocialLink.handleBlur}
                        type="text"
                        id="youtube"
                        placeholder="YouTube"
                        className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 py-2.5 pe-10 shadow-sm sm:text-sm"
                      />
                      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <i className="fa-brands fa-youtube text-red-600"></i>
                        </button>
                      </span>
                    </div>
                    {formikSocialLink.touched.youtube?.link &&
                      formikSocialLink.errors.youtube?.link && (
                        <div className="text-red-600 text-sm">
                          {formikSocialLink.errors.youtube.link}
                        </div>
                      )}

                    {/* GitHub */}
                    <div className="relative">
                      <label htmlFor="github" className="sr-only">
                        {' '}
                        GitHub{' '}
                      </label>
                      <input
                        value={formikSocialLink.values.github.link}
                        name="github.link"
                        onChange={formikSocialLink.handleChange}
                        onBlur={formikSocialLink.handleBlur}
                        type="text"
                        id="github"
                        placeholder="GitHub"
                        className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 py-2.5 pe-10 shadow-sm sm:text-sm"
                      />
                      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <i className="fa-brands fa-github text-gray-500"></i>
                        </button>
                      </span>
                    </div>
                    {formikSocialLink.touched.github?.link &&
                      formikSocialLink.errors.github?.link && (
                        <div className="text-red-600 text-sm">
                          {formikSocialLink.errors.github.link}
                        </div>
                      )}

                    <button
                      type="submit"
                      className={`w-full py-2 px-4 rounded-lg bg-blue-600 dark:bg-blue-400 hover:bg-blue-700 text-white`}
                    >
                      {isLoadingPassword ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              )}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Information User
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <label htmlFor="email" className="sr-only">
                      {' '}
                      Email{' '}
                    </label>
                    <input
                      type="text"
                      id="email"
                      disabled
                      placeholder={getProfile?.user?.email}
                      className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />
                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                      <button
                        type="button"
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <i className="fa-solid fa-at dark:text-gray-300"></i>
                      </button>
                    </span>
                  </div>
                  <div className="relative">
                    <label htmlFor="phone" className="sr-only">
                      {' '}
                      phone{' '}
                    </label>
                    <input
                      disabled
                      type="text"
                      id="phone"
                      placeholder={getProfile?.user?.phone}
                      className="w-full rounded-md dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />
                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                      <button
                        type="button"
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <i className="fa-solid fa-square-phone dark:text-gray-300"></i>
                      </button>
                    </span>
                  </div>
                  <div className="relative">
                    <label htmlFor="address" className="sr-only">
                      {' '}
                      Address{' '}
                    </label>
                    <input
                      disabled
                      type="text"
                      id="address"
                      placeholder={getProfile?.user?.address}
                      className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />
                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                      <button
                        type="button"
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <i className="fa-solid fa-location-dot dark:text-gray-300"></i>
                      </button>
                    </span>
                  </div>

                  <div className="relative">
                    <label htmlFor="pinCode" className="sr-only">
                      {' '}
                      PinCode{' '}
                    </label>
                    <input
                      disabled
                      type="text"
                      id="pinCode"
                      placeholder={getProfile?.user?.pinCode}
                      className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-gray-800 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />
                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                      <button
                        type="button"
                        className="text-gray-600  hover:text-gray-700"
                      >
                        <i className="fa-solid fa-code dark:text-gray-300"></i>
                      </button>
                    </span>
                  </div>

                  {typeEmp.role === 'admin' ? (
                    ''
                  ) : (
                    <div className="mt-4 flex justify-center md:justify-start gap-6">
                      {getProfile?.user?.profileLinks?.facebook?.link && (
                        <a
                          href={getProfile?.user.profileLinks.facebook.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors duration-300"
                        >
                          <i className="fa-brands fa-square-facebook text-2xl"></i>
                        </a>
                      )}
                      {getProfile?.user?.profileLinks?.linkedin?.link && (
                        <a
                          href={getProfile?.user.profileLinks.linkedin.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-colors duration-300"
                        >
                          <i className="fa-brands fa-linkedin text-2xl"></i>
                        </a>
                      )}
                      {getProfile?.user?.profileLinks?.github?.link && (
                        <a
                          href={getProfile?.user.profileLinks.github.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 dark:text-gray-400 hover:text-gray-700 transition-colors duration-300"
                        >
                          <i className="fa-brands fa-github-square text-2xl"></i>
                        </a>
                      )}
                      {getProfile?.user?.profileLinks?.youtube?.link && (
                        <a
                          href={getProfile?.user.profileLinks.youtube.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                          <i className="fa-brands fa-youtube text-2xl"></i>
                        </a>
                      )}
                    </div>
                  )}
                  {getProfile?.user?.stoppedBySuperAdmin && (
                    <div className=" flex justify-center items-center dark:bg-red-600 dark:bg-opacity-50 bg-red-200 h-36 rounded-md border border-red-500 shadow-sm shadow-red-500">
                      <p className="text-red-600 dark:text-red-400 font-bold">
                        Your account is suspended. Contact the administration
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
