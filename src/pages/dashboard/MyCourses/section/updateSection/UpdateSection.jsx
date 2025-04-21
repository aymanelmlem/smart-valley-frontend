import React from 'react'
import HeadSection from '../../../../../components/headSection/HeadSection';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputField from '../../../../../components/Input/InputField';
import { updateSection } from '../../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function UpdateSection() {
    const { isLoading } = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get('courseId');  
    const sectionId = searchParams.get('sectionId');  
    const sectionName=searchParams.get('sectionName')
    const sectionDescribtion=searchParams.get('sectionDescribtion');
    const validationSchema = yup.object({
      sectionName: yup.string().min(1).max(200),
      sectionDescribtion: yup.string(),
    });

    const editSection = async (value) => {
        const res = await dispatch(updateSection({id:sectionId,value}));
        if (res?.payload?.success) {
          toast.success(res.payload.message);
          formik.setValues({
            sectionName: value.sectionName,
            sectionDescribtion: value.sectionDescribtion,
            course: courseId,
          });
        } else {
          toast.error(res.payload.message);
        }
      };
      
    const formik = useFormik({
      initialValues: {
        sectionName,
        sectionDescribtion,
        course:courseId,
      },
      validationSchema,
      onSubmit: editSection,
    });
    return (
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit section</title>
        <meta name="description" content="Edit section page" />
        <meta
          name="keywords"
          content="Edit section, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className='container mx-auto'> 
        <HeadSection  title="Edit Section" subTitle="Sections" link="Sdit Section"/>
  
        <div className='dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg'>
          <h3 className='text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5'>Basic Info</h3>
          <form className='space-y-5 py-10' onSubmit={formik.handleSubmit}>
            <div className='flex gap-5 items-center flex-wrap xl:flex-nowrap'>
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sectionName}
                name="sectionName"
                inputType="text"
                type="input"
                title={formik.errors.sectionName && formik.touched.sectionName ? `${formik.errors.sectionName}` : "Section Name"}
                styleSpan={formik.errors.sectionName && formik.touched.sectionName ? "text-red-600" : "text-gray-600"}
                placeholder={formik.errors.sectionName && formik.touched.sectionName ? `${formik.errors.sectionName}` : "Section Name"}
                inputStyle={formik.errors.sectionName && formik.touched.sectionName ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                icon={formik.errors.sectionName && formik.touched.sectionName ? "bug" : "book"}
                iconStyle={formik.errors.sectionName && formik.touched.sectionName ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
              />
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sectionDescribtion}
                name="sectionDescribtion"
                inputType="text"
                type="textarea"
                title={formik.errors.sectionDescribtion && formik.touched.sectionDescribtion ? `${formik.errors.sectionDescribtion}` : "Describtion"}
                styleSpan={formik.errors.sectionDescribtion && formik.touched.sectionDescribtion ? "text-red-600" : "text-gray-600"}
                
                placeholder={formik.errors.sectionDescribtion && formik.touched.sectionDescribtion ? `${formik.errors.sectionDescribtion}` : "Describtion"}
                inputStyle={formik.errors.sectionDescribtion && formik.touched.sectionDescribtion ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                icon={formik.errors.sectionDescribtion && formik.touched.sectionDescribtion ? "bug" : "spell-check"}
                iconStyle={formik.errors.sectionDescribtion && formik.touched.sectionDescribtion ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
              />
            </div>
            <div className='flex justify-end'>
            {
                    isLoading?<button type="submit" className='bg-blue-800 text-white p-4 rounded-md  hover:outline-blue-700' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                    :<button type="submit" className='bg-blue-800 dark:hover:text-white text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold'>
                    Edit Section
                  </button>
  
                  }
              
            </div>
          </form>
        </div>
      </div>
      </>
    )
}
