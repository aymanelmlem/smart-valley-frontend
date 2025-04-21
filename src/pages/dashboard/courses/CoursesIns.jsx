import { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import HeadSection from '../../../components/headSection/HeadSection';
import InputField from '../../../components/Input/InputField';
import InputUpload from '../../../components/uploadInput/InputUpload';
import {  useSearchParams} from 'react-router-dom';
import { addCourses } from '../../../redux/courses/courses.slice';
import { toast } from 'react-toastify';
import { getRandomColor } from '../../../utils/api';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function CoursesIns() {
  const { isLoading } = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [contentLearnInput, setContentLearnInput] = useState("");
  const subcategory = searchParams.get('subcategory');
  const subcategoryId = searchParams.get('subcategoryId');
  let subCategoryArr = subcategory ? subcategory.split(',') : [];
  let subCategoryIdArr = subcategoryId ? subcategoryId.split(',') : [];

  const validationSchema = yup.object({
    courseName: yup.string().min(1).max(200).required('Course name is required'),
    courseHours: yup.string().required('Course hours are required'),
    coursePrice: yup.string().required('Course price is required'),
    courseDescription: yup.string().min(10,"Description must be at least 10 characters long").max(1200).required('Course description is required'),
    accesibleByAnyOne: yup.object({
      videoUrl: yup.array().of(yup.string().url("Invalid URL")),
      description: yup.array().of(yup.string().min(5, "Description must be at least 5 characters long"))
    }),
    whatWillYouLearn: yup.array().of(yup.string().min(1, 'Learning outcomes cannot be empty').required('Each Learning outcomes is required')).min(1, 'At least one Learning outcomes is required').required('Learning outcomes are required'),
    teachedBy: yup.string().min(5,"Theacher name must be at least 5 characters long").max(60).required('Instructor name is required'),
    coursePicture: yup.mixed().required("Course picture is required").test('fileFormat', 'Unsupported file format', (value) => {
      if (value) {
        return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
      }
      return false;
    }),
  });
  

  const formik = useFormik({
    initialValues: {
      courseName: "",
      courseHours: "",
      coursePrice: "",
      courseDescription: "",
      accesibleByAnyOne: { videoUrl: [], description: [] },
      whatWillYouLearn: [],
      subCategory: subCategoryIdArr[0],
      teachedBy: "",
      category: category,
      coursePicture: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'whatWillYouLearn') {
          formData.append(key, JSON.stringify(values[key]));
        } else if (key === 'coursePicture') {
          if (values[key]) {
            formData.append(key, values[key]);
          }
        } else if (key === 'accesibleByAnyOne') {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      });

      try {
        const response = await dispatch(addCourses(formData));
        if (response?.payload?.success) {
          toast.success(response.payload.message);
          formik.resetForm();
        } else {
          toast.error(response.payload.message);
        }
      } catch (error) {
        console.error("Error:", error.message); 
        toast.error("An error occurred while submitting the form.");
      }
    }
  });

  const handleChangeFile = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      formik.setFieldValue(name, files[0]);
    }
  };

  const handleAddContentLearn = () => {
    if (contentLearnInput.trim() !== "") {
      formik.setFieldValue('whatWillYouLearn', [
        ...formik.values.whatWillYouLearn,
        contentLearnInput
      ]);
      setContentLearnInput("");  
    }
  };

  const handleRemoveContentLearn = (indexToRemove) => {
    const updatedContentLearn = formik.values.whatWillYouLearn.filter((_, index) => index !== indexToRemove);
    formik.setFieldValue('whatWillYouLearn', updatedContentLearn);
  };

  const handleEditContentLearn = (indexToEdit, newValue) => {
    const updatedContentLearn = formik.values.whatWillYouLearn.map((content, index) =>
      index === indexToEdit ? newValue : content
    );
    formik.setFieldValue('whatWillYouLearn', updatedContentLearn);
  };

  const handleAddVideoUrl = () => {
    if (newVideoUrl) {
      formik.validateField("accesibleByAnyOne.videoUrl").then(() => {
        const isValidUrl = yup.string().url().isValidSync(newVideoUrl);
        if (isValidUrl) {
          if (!formik.values.accesibleByAnyOne.videoUrl.includes(newVideoUrl)) {
            formik.setFieldValue("accesibleByAnyOne.videoUrl", [...formik.values.accesibleByAnyOne.videoUrl, newVideoUrl]);
            setNewVideoUrl("");
          } else {
            formik.setFieldError("accesibleByAnyOne.videoUrl", "This URL already exists.");
          }
        } else {
          formik.setFieldError("accesibleByAnyOne.videoUrl", "Invalid URL.");
        }
      });
    } else {
      formik.setFieldError("accesibleByAnyOne.videoUrl", "Video URL cannot be empty.");
    }
  };

  const handleRemoveVideoUrl = (index) => {
    const newVideoUrls = formik.values.accesibleByAnyOne.videoUrl.filter((_, i) => i !== index);
    formik.setFieldValue("accesibleByAnyOne.videoUrl", newVideoUrls);
  };

  const handleAddDescription = () => {
    if (newDescription) {
      formik.validateField("accesibleByAnyOne.description").then(() => {
        if (!formik.values.accesibleByAnyOne.description.includes(newDescription)) {
          formik.setFieldValue("accesibleByAnyOne.description", [...formik.values.accesibleByAnyOne.description, newDescription]);
          setNewDescription("");
        } else {
          formik.setFieldError("accesibleByAnyOne.description", "This description already exists.");
        }
      });
    } else {
      formik.setFieldError("accesibleByAnyOne.description", "Description cannot be empty.");
    }
  };

  const handleRemoveDescription = (index) => {
    const newDescriptions = formik.values.accesibleByAnyOne.description.filter((_, i) => i !== index);
    formik.setFieldValue("accesibleByAnyOne.description", newDescriptions);
  };
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Add courses</title>
        <meta name="description" content="Add courses page" />
        <meta name="keywords" content="Add courses elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='max-w-screen-xl m-auto'> 
      <HeadSection  title="Add Courses" subTitle="Courses" link="Add Courses"/>

      <div className='relative  overflow-hidden dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg'>
      <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45"></div>
      <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45"></div>
        <h3 className='text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5'>Basic Info</h3>
        <form className='space-y-5 py-10' onSubmit={formik.handleSubmit}>
          <div className='flex gap-5 items-center flex-wrap xl:flex-nowrap'>
            <InputField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.courseName}
              name="courseName"
              inputType="text"
              type="input"
              title={formik.errors.courseName && formik.touched.courseName ? `${formik.errors.courseName}` : "Course Name"}
              styleSpan={formik.errors.courseName && formik.touched.courseName ? "text-red-600" : "text-gray-600"}
              placeholder={formik.errors.courseName && formik.touched.courseName ? `${formik.errors.courseName}` : "Course Name"}
              inputStyle={formik.errors.courseName && formik.touched.courseName ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
              icon={formik.errors.courseName && formik.touched.courseName ? "bug" : "book"}
              iconStyle={formik.errors.courseName && formik.touched.courseName ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
            />
            <InputField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.courseHours}
              name="courseHours"
              inputType="text"
              type="input"
              title={formik.errors.courseHours && formik.touched.courseHours ? `${formik.errors.courseHours}` : "Course Hours"}
              styleSpan={formik.errors.courseHours && formik.touched.courseHours ? "text-red-600" : "text-gray-600"}
              placeholder={formik.errors.courseHours && formik.touched.courseHours ? `${formik.errors.courseHours}` : "Course Hours"}
              inputStyle={formik.errors.courseHours && formik.touched.courseHours ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
              icon={formik.errors.courseHours && formik.touched.courseHours ? "bug" : "clock"}
              iconStyle={formik.errors.courseHours && formik.touched.courseHours ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
            />
          </div>
          <label className='flex gap-10 flex-wrap item-center xl:flex-nowrap py-3'>
            {/* Input Field */}
            <div className='flex-1'>
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.teachedBy}
                name="teachedBy"
                type="input"
                title={formik.errors.teachedBy && formik.touched.teachedBy ? `${formik.errors.teachedBy}` : "Instructor Name"}
                styleSpan={formik.errors.teachedBy && formik.touched.teachedBy ? "text-red-600" : "text-gray-600"}
                placeholder={formik.errors.teachedBy && formik.touched.teachedBy ? `${formik.errors.teachedBy}` : "Instructor Name"}
                inputStyle={formik.errors.teachedBy && formik.touched.teachedBy? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                icon={formik.errors.teachedBy && formik.touched.teachedBy ? "bug" : "user"}
                iconStyle={formik.errors.teachedBy && formik.touched.teachedBy
                  ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500"
                  : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
              />
            </div>

            {/* Select Field */}
            <div className='flex-1'>
              <label htmlFor="subCategory" className="block text-sm font-medium text-gray-900 dark:text-gray-600"> subCategory </label>
              <select
                  name="subCategory"
                  id="subCategory"
                  onChange={formik.handleChange}
                  className={formik.errors.subCategory && formik.touched.subCategory ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                >
                  {subCategoryArr.map((sub, index) => (
                    <option key={index} value={subCategoryIdArr[index]}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          </label>
          <div className='flex gap-5 items-center flex-wrap xl:flex-nowrap'>
            <InputField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.coursePrice}
              name="coursePrice"
              inputType="text"
              type="input"
              title={formik.errors.coursePrice && formik.touched.coursePrice ? `${formik.errors.coursePrice}` : "Price"}
              styleSpan={formik.errors.coursePrice && formik.touched.coursePrice ? "text-red-600" : "text-gray-600"}
              placeholder={formik.errors.coursePrice && formik.touched.coursePrice ? `${formik.errors.coursePrice}` : "Price"}
              inputStyle={formik.errors.coursePrice && formik.touched.coursePrice ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
              icon={formik.errors.coursePrice && formik.touched.coursePrice ? "bug" : "dollar"}
              iconStyle={formik.errors.coursePrice && formik.touched.coursePrice ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
            />
            <InputField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.courseDescription}
              name="courseDescription"
              inputType="text"
              type="textarea"
              title={formik.errors.courseDescription && formik.touched.courseDescription ? `${formik.errors.courseDescription}` : "Description"}
              styleSpan={formik.errors.courseDescription && formik.touched.courseDescription ? "text-red-600" : "text-gray-600"}
              placeholder={formik.errors.courseDescription && formik.touched.courseDescription ? `${formik.errors.courseDescription}` : "Description"}
              inputStyle={formik.errors.courseDescription && formik.touched.courseDescription ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
              icon={formik.errors.courseDescription && formik.touched.courseDescription ? "bug" : "arrow-up-a-z"}
              iconStyle={formik.errors.courseDescription && formik.touched.courseDescription ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
            />

          </div>
              {/* Vedio and description */}
              <div className='flex gap-3 flex-wrap justify-between'>
                <div className="">
                  <label htmlFor="videoUrl">
                    {formik.errors.accesibleByAnyOne?.videoUrl ? formik.errors.accesibleByAnyOne.videoUrl : "Enter Video URL"}
                  </label>
                  <input
                    type="text"
                    id="videoUrl"
                    name="videoUrl"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    onBlur={formik.handleBlur}
                    placeholder={formik.errors.accesibleByAnyOne?.videoUrl ? formik.errors.accesibleByAnyOne.videoUrl : "Enter Video URL"}
                    className={formik.errors.accesibleByAnyOne?.videoUrl ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                  />
                  <button type="button" onClick={handleAddVideoUrl} className="ml-2 p-2 bg-blue-500 text-white rounded-lg m-2">Add Video URL</button>
                  <ul className="list-disc mt-4 ml-5">
                    {formik.values.accesibleByAnyOne.videoUrl.map((url, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className='p-2 rounded-md' style={{
                                    borderColor: getRandomColor(), 
                                    borderWidth: '2px', 
                                    borderStyle: 'solid',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                  }}>{url}</span>
                        <button type="button" onClick={() => handleRemoveVideoUrl(index)} className="text-red-500">Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <label htmlFor="description">
                    {formik.errors.accesibleByAnyOne?.description ? formik.errors.accesibleByAnyOne.description : "Enter Description Video"}
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    onBlur={formik.handleBlur}
                    placeholder={formik.errors.accesibleByAnyOne?.description ? formik.errors.accesibleByAnyOne.description : "Enter Description Video"}
                    className={formik.errors.accesibleByAnyOne?.description ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                  />
                  <button type="button" onClick={handleAddDescription} className="ml-2 m-2 p-2 bg-blue-500 text-white rounded-lg">Add Description</button>
                  <ul className="list-disc mt-4 ml-5">
                    {formik.values.accesibleByAnyOne.description.map((desc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className='p-2 rounded-md' style={{
                                    borderColor: getRandomColor(), 
                                    borderWidth: '2px', 
                                    borderStyle: 'solid',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                  }}>{desc}</span>
                        <button type="button" onClick={() => handleRemoveDescription(index)} className="text-red-500">Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            <div className="flex gap-5 justify-center flex-wrap xl:flex-nowrap">
            <InputField
              onChange={(e) => setContentLearnInput(e.target.value)}
              value={contentLearnInput}
              name="whatWillYouLearn"
              inputType="input"
              type="input"
              title={formik.errors.whatWillYouLearn && formik.touched.whatWillYouLearn ? `${formik.errors.whatWillYouLearn}` : "what Will You Learn?"}
              styleSpan={formik.errors.whatWillYouLearn && formik.touched.whatWillYouLearn ? "text-red-600" : "text-gray-600"}
              placeholder="Enter content learn and press add"
              inputStyle={formik.errors.whatWillYouLearn && formik.touched.whatWillYouLearn ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
              icon={formik.errors.whatWillYouLearn && formik.touched.whatWillYouLearn ? "bug" : "clock"}
              iconStyle={formik.errors.whatWillYouLearn && formik.touched.whatWillYouLearn ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
            />
            <button type="button" onClick={handleAddContentLearn} className='bg-blue-600 text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700'>
              Add 
            </button>
            </div>
              <ul className="mt-4">
            {formik.values.whatWillYouLearn.map((content, index) => (
              <li key={index} className="p-2 bg-gray-100 dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => handleEditContentLearn(index, e.target.value)}
                  className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-gray-500 border-gray-300 dark:focus:border-gray-400 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 bg-white text-gray-800 placeholder-gray-500"
                />
                
                <button 
                  type="button" 
                  onClick={() => handleRemoveContentLearn(index)} 
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
              </ul>
            
          
                <InputUpload
                        onChange={handleChangeFile}
                        name="coursePicture"
                        labelStyle={formik.errors.coursePicture && formik.touched.coursePicture?"flex dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 flex-col items-center justify-center w-full h-64 border-2 border-red-300 border-dashed rounded-lg cursor-pointer bg-red-100":"flex flex-col items-center justify-center w-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"}
                        title={formik.errors.coursePicture && formik.touched.coursePicture ? `${formik.errors.coursePicture}` : "Course Picture"}
                        placeholder={formik.errors.coursePicture && formik.touched.coursePicture ? `${formik.errors.coursePicture}` : "Upload course picture"}
                        inputStyle={formik.errors.coursePicture && formik.touched.coursePicture ? "w-full shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500 border-gray-300 bg-white text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                        icon={formik.errors.coursePicture && formik.touched.coursePicture ? "bug" : "image"}
                        iconStyle={formik.errors.coursePicture && formik.touched.coursePicture ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                        paraStyle={formik.errors.coursePicture && formik.touched.coursePicture?"mb-2 text-sm text-red-500":"mb-2 text-sm text-gray-500"}
                        subTitle="PNG, JPG, webp"
                />
          <div className='flex justify-end'>
          {
                  isLoading?<button type="submit" className='bg-blue-800 text-white p-4 rounded-md  hover:outline-blue-700' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                  :<button type="submit" className='bg-blue-800 dark:hover:text-white text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold'>
                  Add Course
                </button>

                }
            
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
