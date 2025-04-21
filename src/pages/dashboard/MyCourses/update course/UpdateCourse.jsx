import React from 'react';
import HeadSection from '../../../../components/headSection/HeadSection';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../../../../components/Input/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCourse } from '../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function UpdateCourse() {
  const { isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get('courseName');
  const courseHours = searchParams.get('courseHours');
  const coursePrice = searchParams.get('coursePrice');
  const courseDescription = searchParams.get('courseDescription');
  const teachedBy = searchParams.get('teachedBy');
  const courseId = searchParams.get('courseId');
  const validationSchema = yup.object({
    courseName: yup
      .string()
      .min(10, 'The course name must be at least 10 characters long')
      .required('Course name is required'),
    courseHours: yup.string().required('Course hours are required'),
    coursePrice: yup
      .string()
      .required('Course price is required')
      .test(
        'is-free-or-number',
        'Course price must be "free" or a number',
        (value) =>
          value === 'free' || (!isNaN(value) && !isNaN(parseFloat(value)))
      ),
    courseDescription: yup
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .required('Course description is required'),
    teachedBy: yup
      .string()
      .min(10, 'Instructor info must be at least 10 characters long')
      .required('Instructor info is required'),
  });
  const updateCourses = async (value) => {
    const res = await dispatch(updateCourse({ value, id: courseId }));
    if (res?.payload?.success) {
      toast.success(res.payload.message);
      formik.resetForm();
    } else {
      toast.error(res.payload.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      courseName,
      courseHours,
      coursePrice,
      courseDescription,
      teachedBy,
    },
    validationSchema,
    onSubmit: updateCourses,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Courses</title>
        <meta name="description" content="Edit courses Introduction page" />
        <meta
          name="keywords"
          content="Edit Courses Introduction, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection
          to="/panel/updateCourse"
          title="Update Courses"
          subTitle="Courses"
          link="Update Courses"
        />
        <div className="dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg">
          <h3 className="text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5">
            Basic Info
          </h3>
          <form className="space-y-5 py-10" onSubmit={formik.handleSubmit}>
            <div className="flex gap-5 items-center flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.courseName}
                name="courseName"
                inputType="text"
                type="input"
                title={
                  formik.errors.courseName && formik.touched.courseName
                    ? `${formik.errors.courseName}`
                    : 'Course Name'
                }
                styleSpan={
                  formik.errors.courseName && formik.touched.courseName
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.courseName && formik.touched.courseName
                    ? `${formik.errors.courseName}`
                    : 'Course Name'
                }
                inputStyle={
                  formik.errors.courseName && formik.touched.courseName
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.courseName && formik.touched.courseName
                    ? 'bug'
                    : 'book'
                }
                iconStyle={
                  formik.errors.courseName && formik.touched.courseName
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.courseHours}
                name="courseHours"
                inputType="text"
                type="input"
                title={
                  formik.errors.courseHours && formik.touched.courseHours
                    ? `${formik.errors.courseHours}`
                    : 'Course Hours'
                }
                styleSpan={
                  formik.errors.courseHours && formik.touched.courseHours
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.courseHours && formik.touched.courseHours
                    ? `${formik.errors.courseHours}`
                    : 'Course Hours'
                }
                inputStyle={
                  formik.errors.courseHours && formik.touched.courseHours
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.courseHours && formik.touched.courseHours
                    ? 'bug'
                    : 'clock'
                }
                iconStyle={
                  formik.errors.courseHours && formik.touched.courseHours
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
            </div>
            <div className="flex gap-5 items-center flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.coursePrice}
                name="coursePrice"
                inputType="text"
                type="input"
                title={
                  formik.errors.coursePrice && formik.touched.coursePrice
                    ? `${formik.errors.coursePrice}`
                    : 'Price'
                }
                styleSpan={
                  formik.errors.coursePrice && formik.touched.coursePrice
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.coursePrice && formik.touched.coursePrice
                    ? `${formik.errors.coursePrice}`
                    : 'Price'
                }
                inputStyle={
                  formik.errors.coursePrice && formik.touched.coursePrice
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.coursePrice && formik.touched.coursePrice
                    ? 'bug'
                    : 'dollar'
                }
                iconStyle={
                  formik.errors.coursePrice && formik.touched.coursePrice
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.teachedBy}
                name="teachedBy"
                type="input"
                title={
                  formik.errors.teachedBy && formik.touched.teachedBy
                    ? `${formik.errors.teachedBy}`
                    : 'Instructor Name'
                }
                styleSpan={
                  formik.errors.teachedBy && formik.touched.teachedBy
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.teachedBy && formik.touched.teachedBy
                    ? `${formik.errors.teachedBy}`
                    : 'Instructor Name'
                }
                inputStyle={
                  formik.errors.teachedBy && formik.touched.teachedBy
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.teachedBy && formik.touched.teachedBy
                    ? 'bug'
                    : 'user'
                }
                iconStyle={
                  formik.errors.teachedBy && formik.touched.teachedBy
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
            </div>
            <InputField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.courseDescription}
              name="courseDescription"
              inputType="text"
              type="textarea"
              title={
                formik.errors.courseDescription &&
                formik.touched.courseDescription
                  ? `${formik.errors.courseDescription}`
                  : 'Description'
              }
              styleSpan={
                formik.errors.courseDescription &&
                formik.touched.courseDescription
                  ? 'text-red-600'
                  : 'text-gray-600'
              }
              placeholder={
                formik.errors.courseDescription &&
                formik.touched.courseDescription
                  ? `${formik.errors.courseDescription}`
                  : 'Description'
              }
              inputStyle={
                formik.errors.courseDescription &&
                formik.touched.courseDescription
                  ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                  : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
              }
              icon={
                formik.errors.courseDescription &&
                formik.touched.courseDescription
                  ? 'bug'
                  : 'arrow-up-a-z'
              }
              iconStyle={
                formik.errors.courseDescription &&
                formik.touched.courseDescription
                  ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                  : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
              }
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
                  className="bg-blue-800 text-white  dark:text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold"
                >
                  update Course
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
