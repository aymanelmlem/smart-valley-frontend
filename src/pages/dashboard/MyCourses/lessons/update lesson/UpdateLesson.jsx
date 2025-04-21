import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../../../../../components/Input/InputField';
import { updateLesson } from '../../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function UpdateLesson() {
    const { isLoading } = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const courseId = searchParams.get("courseId")
    const lessonId = searchParams.get("lessonId")

    const lessonName = searchParams.get("lessonName")
    const lessonDescription = searchParams.get("lessonDescription")
    const lessonTime = searchParams.get("lessonTime")
    const whatWillYouLeanAfterThisLesson = searchParams.get("whatWillYouLeanAfterThisLesson")
    const validationSchema = yup.object({
        lessonName: yup
            .string()
            .min(3, "Lesson Name must be at least 3 characters"),
        lessonDescribtion: yup
            .string()
            .min(10, "Description must be at least 10 characters"),
        whatWillYouLeanAfterThisLesson: yup
            .string()
            .min(10, "Learning objectives must be at least 10 characters"),
        timeOfLesson: yup.string()
            .matches(/^\d{2}:\d{2}:\d{2}$/, 'Time format should be HH:MM:SS'),
    });

    const handleSubmit = async (value) => {
        const response=await dispatch(updateLesson({id:lessonId,value}))
        if (response?.payload?.success) {
            toast.success(response.payload.message);
            formik.resetForm();
        } else {
            toast.error(response.payload.message );
        }
    };
    

    const formik = useFormik({
        initialValues: {
            lessonName,
            lessonDescribtion:lessonDescription,
            whatWillYouLeanAfterThisLesson,
            section: sectionId,
            course:courseId,
            timeOfLesson:lessonTime,
        },
        validationSchema,
        onSubmit: handleSubmit,
    });
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Lessons</title>
        <meta name="description" content="Edit Lessons page" />
        <meta
          name="keywords"
          content="Edit Lessons, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='max-w-screen-xl mx-auto'>
        <HeadSection  title="Edit Lesson" subTitle="Lessons" link="Edit Lessons"/>
        <div className='dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg'>
        <h3 className='text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5'>Basic Info</h3>
        <form className='space-y-5 py-10' onSubmit={formik.handleSubmit}>
            <div className='flex gap-5 items-center flex-wrap xl:flex-nowrap'>
                <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lessonName}
                name="lessonName"
                inputType="text"
                type="input"
                title={formik.errors.lessonName && formik.touched.lessonName ?  `${formik.errors.lessonName}`   : "Lesson Name"}
                styleSpan={formik.errors.lessonName && formik.touched.lessonName ? "text-red-600" : "text-gray-600"}
                placeholder={formik.errors.lessonName && formik.touched.lessonName ? `${formik.errors.lessonName}` : "Lesson Name"}
                inputStyle={formik.errors.lessonName && formik.touched.lessonName ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                icon={formik.errors.lessonName && formik.touched.lessonName ? "bug" : "book"}
                iconStyle={formik.errors.lessonName && formik.touched.lessonName ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                />
                <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.timeOfLesson}
                name="timeOfLesson"
                inputType="text"
                type="input"
                title={formik.errors.timeOfLesson && formik.touched.timeOfLesson ? `${formik.errors.timeOfLesson}` : "Expected Time to finish lesson"}
                styleSpan={formik.errors.timeOfLesson && formik.touched.timeOfLesson ? "text-red-600" : "text-gray-600"}
                placeholder={formik.errors.timeOfLesson && formik.touched.timeOfLesson ? `${formik.errors.timeOfLesson}` : "Time Of Lesson"}
                inputStyle={formik.errors.timeOfLesson && formik.touched.timeOfLesson ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                icon={formik.errors.timeOfLesson && formik.touched.timeOfLesson ? "bug" : "clock"}
                iconStyle={formik.errors.timeOfLesson && formik.touched.timeOfLesson ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                />
            </div>
            <div className='flex gap-5 items-center flex-wrap xl:flex-nowrap'>
                <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.whatWillYouLeanAfterThisLesson}
                name="whatWillYouLeanAfterThisLesson"
                inputType="text"
                type="textarea"
                title={formik.errors.whatWillYouLeanAfterThisLesson && formik.touched.whatWillYouLeanAfterThisLesson ? `${formik.errors.whatWillYouLeanAfterThisLesson}` : "what Will You Learn in Lesson"}
                styleSpan={formik.errors.whatWillYouLeanAfterThisLesson && formik.touched.whatWillYouLeanAfterThisLesson ? "text-red-600" : "text-gray-600"}
                placeholder={formik.errors.whatWillYouLeanAfterThisLesson && formik.touched.whatWillYouLeanAfterThisLesson ? `${formik.errors.whatWillYouLeanAfterThisLesson}` : "what Will You Learn in Lesson"}
                inputStyle={formik.errors.whatWillYouLeanAfterThisLesson && formik.touched.whatWillYouLeanAfterThisLesson ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                icon={formik.errors.whatWillYouLeanAfterThisLesson && formik.touched.whatWillYouLeanAfterThisLesson ? "bug" : "person-chalkboard"}
                iconStyle={formik.errors.whatWillYouLeanAfterThisLesson && formik.touched.whatWillYouLeanAfterThisLesson ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                />
                <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lessonDescribtion}
                name="lessonDescribtion"
                inputType="text"
                type="textarea"
                title={formik.errors.lessonDescribtion && formik.touched.lessonDescribtion ? `${formik.errors.lessonDescribtion}` : "Description"}
                styleSpan={formik.errors.lessonDescribtion && formik.touched.lessonDescribtion ? "text-red-600" : "text-gray-600"}
                placeholder={formik.errors.lessonDescribtion && formik.touched.lessonDescribtion ? `${formik.errors.lessonDescribtion}` : "Description"}
                inputStyle={formik.errors.lessonDescribtion && formik.touched.lessonDescribtion ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                icon={formik.errors.lessonDescribtion && formik.touched.lessonDescribtion ? "bug" : "arrow-up-a-z"}
                iconStyle={formik.errors.lessonDescribtion && formik.touched.lessonDescribtion ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                />

            </div>
            <div className='flex justify-end'>
            {
                    isLoading?<button type="submit" className='bg-blue-800 text-white p-4 rounded-md  hover:outline-blue-700' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                    :<button type="submit" className='bg-blue-800 dark:hover:text-white text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold'>
                    Edit Lesson
                    </button>
                }

            </div>
        </form>
      </div>
    </div>
    </>
  )
}
