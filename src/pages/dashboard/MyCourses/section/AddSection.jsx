import  { useState } from 'react'
import HeadSection from '../../../../components/headSection/HeadSection'
import InputField from '../../../../components/Input/InputField'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { addSection } from '../../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function AddSection() {
  const { isLoading } = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [objectiveFromSectionInput, setobjectiveFromSectionInput] = useState("");

  const validationSchema = yup.object({
    sectionName: yup.string().min(1).max(200).required('Section name is required'),
    sectionDescribtion: yup.string().required('Description  are required'),
    objectiveFromSection: yup
    .array()
    .of(yup.string().min(1, 'Objective cannot be empty').required('Each objective is required'))
    .min(1, 'At least one objective is required')
    .required('Objectives are required'),
  });
  
  async function addSections(value){
    const res=await dispatch(addSection(value));
    if (res?.payload?.success) {
      toast.success(res.payload.message);
      formik.resetForm();
    } else {
      toast.error(res.payload.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      sectionName:"",
      sectionDescribtion:"",
      course:courseId,
      objectiveFromSection:[]
    },
    validationSchema,
    onSubmit: addSections,
  });

  const handleAddobjectiveFromSection = () => {
    if (objectiveFromSectionInput.trim() !== "") {
      formik.setFieldValue('objectiveFromSection', [...formik.values.objectiveFromSection, objectiveFromSectionInput]);
      setobjectiveFromSectionInput("");  
    }
  };

  const handleRemoveobjectiveFromSection = (indexToRemove) => {
    const updatedSubCategories = formik.values.objectiveFromSection.filter((_, index) => index !== indexToRemove);
    formik.setFieldValue('objectiveFromSection', updatedSubCategories);
  };

  const handleEditobjectiveFromSection = (indexToEdit, newValue) => {
    const updatedSubCategories = formik.values.objectiveFromSection.map((objectiveFromSection, index) => 
      index === indexToEdit ? newValue : objectiveFromSection
    );
    formik.setFieldValue('objectiveFromSection', updatedSubCategories);
  };


  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Add section</title>
        <meta name="description" content="Add section Introduction page" />
        <meta
          name="keywords"
          content="Add section, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='max-w-screen-xl m-auto'> 
      <HeadSection  title="Add Section" subTitle="Sections" link="Add Section"/>
      <div className='dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg relative  overflow-hidden'>
      <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45"></div>
      <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45"></div>
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
            <div className="flex gap-5 justify-center flex-wrap xl:flex-nowrap">
            
            <InputField
              onBlur={() => {}}
              onChange={(e) => setobjectiveFromSectionInput(e.target.value)}
              value={objectiveFromSectionInput}
              name="objectiveFromSectionInput"
              inputType="text"
              type="input"
              title={formik.errors.objectiveFromSection && formik.touched.objectiveFromSection ?formik.errors.objectiveFromSection:"Objectives"}
              styleSpan={formik.errors.objectiveFromSection && formik.touched.objectiveFromSection?"text-red-600":"text-gray-600" }
              placeholder={formik.errors.objectiveFromSection && formik.touched.objectiveFromSection ? `${formik.errors.objectiveFromSection}` : "Objectives"}
              inputStyle={formik.errors.objectiveFromSection && formik.touched.objectiveFromSection ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
              icon={formik.errors.objectiveFromSection && formik.touched.objectiveFromSection ? "bug" : "layer-group"}
              iconStyle={formik.errors.objectiveFromSection && formik.touched.objectiveFromSection ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
            />

            <button type="button" onClick={handleAddobjectiveFromSection} className='bg-blue-600 text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700'>
              Add objective
            </button>
          </div>
          {/* Display Added Subcategories */}
          <ul className="mt-4">
            {formik.values.objectiveFromSection.map((objectiveFromSection, index) => (
              <li key={index} className="p-2 bg-gray-100 dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center">
                <input
                  type="text"
                  value={objectiveFromSection}
                  onChange={(e) => handleEditobjectiveFromSection(index, e.target.value)}
                  className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:focus:border-gray-400 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 bg-white text-gray-800 placeholder-gray-500"
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveobjectiveFromSection(index)} 
                  className="bg-red-700 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className='flex justify-end'>
          {
                  isLoading?<button type="submit" className='bg-blue-800 text-white p-4 rounded-md  hover:outline-blue-700' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                  :<button type="submit" className='bg-blue-800 dark:hover:text-white text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold'>
                  Add Section
                </button>

                }
            
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
