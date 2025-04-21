import HeadSection from '../../../../components/headSection/HeadSection';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../../../../components/Input/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addManager } from '../../../../redux/instructor/instructorSlice';
import { toast } from 'react-toastify';
import InputUpload from '../../../../components/uploadInput/InputUpload';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function AddManager() {
  const { isLoading } = useSelector((state) => state.instructor);
  const dispatch = useDispatch();

  const addMng = async (value) => {
    const formData = new FormData();
    for (const key in value) {
      formData.append(key, value[key]);
    }
    const response = await dispatch(addManager(formData));
    if (response.payload.success == false) {
      toast.error(response.payload.message);
    } else {
      toast.success(response.payload.message);
      formik.resetForm();
    }
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(10, 'The name must be more than or equal to 10 characters')
      .required('The name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('The email is required'),
    phone: yup
      .string()
      .matches(/^(010|011|015|012)[0-9]{8,9}$/, 'Invalid phone number')
      .required('The phone number is required'),
    address: yup
      .string()
      .min(10, 'The address must be more than or equal to 10 characters')
      .required('The address is required'),
    profilePicture: yup
      .mixed()
      .required('Profile picture is required')
      .test(
        'fileFormat',
        'Unsupported file format. Supported formats are webp, jpeg, png',
        (value) => {
          if (value) {
            return ['image/jpeg', 'image/png', 'image/webp'].includes(
              value.type
            );
          }
          return true;
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'admin',
      profilePicture: null,
    },
    validationSchema,
    onSubmit: addMng,
  });
  const handleChangeFile = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      formik.setFieldValue(name, files[0]);
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Manager</title>
        <meta name="description" content="Add Manager page" />
        <meta name="keywords" content="Add Manager, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection
          to="/panel/addManager"
          title="Add Managers"
          subTitle="Managers"
          link="Add Manager"
        />

        <div className="relative  overflow-hidden dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg">
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45"></div>
          <h3 className="text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5">
            Basic Info
          </h3>
          <form className="space-y-5 py-10" onSubmit={formik.handleSubmit}>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                inputType="text"
                type="input"
                title={
                  formik.errors.name && formik.touched.name
                    ? `${formik.errors.name}`
                    : 'Name'
                }
                styleSpan={
                  formik.errors.name && formik.touched.name
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.name && formik.touched.name
                    ? `${formik.errors.name}`
                    : 'Name'
                }
                inputStyle={
                  formik.errors.name && formik.touched.name
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.name && formik.touched.name ? 'bug' : 'user'
                }
                iconStyle={
                  formik.errors.name && formik.touched.name
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
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
            </div>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                name="phone"
                inputType="text"
                type="input"
                title={
                  formik.errors.phone && formik.touched.phone
                    ? `${formik.errors.phone}`
                    : 'Phone number'
                }
                styleSpan={
                  formik.errors.phone && formik.touched.phone
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.phone && formik.touched.phone
                    ? `${formik.errors.phone}`
                    : '+00 0342 0453 34'
                }
                inputStyle={
                  formik.errors.phone && formik.touched.phone
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.phone && formik.touched.phone ? 'bug' : 'phone'
                }
                iconStyle={
                  formik.errors.phone && formik.touched.phone
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
                name="address"
                inputType="text"
                type="input"
                title={
                  formik.errors.address && formik.touched.address
                    ? `${formik.errors.address}`
                    : 'Address'
                }
                styleSpan={
                  formik.errors.address && formik.touched.address
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.address && formik.touched.address
                    ? `${formik.errors.address}`
                    : 'Country City Governorate'
                }
                inputStyle={
                  formik.errors.address && formik.touched.address
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.address && formik.touched.address
                    ? 'bug'
                    : 'map-marker-alt'
                }
                iconStyle={
                  formik.errors.address && formik.touched.address
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
            </div>
            <InputUpload
              onChange={handleChangeFile}
              onBlur={formik.handleBlur}
              value={formik.values.profilePicture}
              name="profilePicture"
              title={
                formik.errors.profilePicture && formik.touched.profilePicture
                  ? `${formik.errors.profilePicture}`
                  : formik.values.profilePicture
                  ? 'Profile Picture uploaded'
                  : 'Click to upload Profile Picture'
              }
              paraStyle={
                formik.errors.profilePicture && formik.touched.profilePicture
                  ? 'mb-2 text-sm text-red-500'
                  : 'mb-2 text-sm text-gray-500'
              }
              labelStyle={
                formik.errors.profilePicture && formik.touched.profilePicture
                  ? 'flex dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 flex-col items-center justify-center w-full h-64 border-2 border-red-300 border-dashed rounded-lg cursor-pointer bg-red-100'
                  : 'flex flex-col items-center justify-center w-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100'
              }
              subTitle="PNG, JPG, webp"
            />
            <div className="flex justify-end">
              {isLoading ? (
                <button
                  type="submit"
                  className="bg-blue-800 text-white p-4 rounded-md  hover:outline-blue-700"
                  disabled
                >
                  <i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-800 dark:hover:text-white text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold"
                >
                  Add Manager
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
