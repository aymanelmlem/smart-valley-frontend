import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import HeadSection from '../../../../../components/headSection/HeadSection';
import { useFormik } from 'formik';
import * as yup from "yup"
import InputField from '../../../../../components/Input/InputField';
import { toast } from 'react-toastify';
import { videoLessonFun } from '../../../../../redux/courses/courses.slice';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../../assets/favicon.png';
export default function   AddVideoLesson() {
    const { isLoading } = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const courseId = searchParams.get("courseId")
    const lessonId = searchParams.get("lessonId")
    const [videosChangesInput, setvideosChangesInput] = useState("");

    const validationSchema = yup.object({
        videosChanges: yup
            .array()
            .of(yup.string().url("Please provide a valid URL"))
    });
    const handleSubmit = async (value) => {
        
        if(value.videosChanges.length === 0){
            toast.error('At least one video URL is required');
            return;
        }
        const formData = new FormData();
    
        formData.append("videosChanges", JSON.stringify(value.videosChanges));
    
        formData.append("course", value.course);
        formData.append("section", value.section);
    
        const response = await dispatch(videoLessonFun({ id: lessonId, value: formData, flag: "add" }));
        if (response?.payload?.success) {
            toast.success(response.payload.message);
            formik.resetForm();
        } else {
            toast.error(response.payload.message);
        }
    };
    const formik = useFormik({
        initialValues: {
            course:courseId,
            section: sectionId,
            videosChanges: [],
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleAddVideoUrl = () => {
        if (videosChangesInput.trim() !== "") {
            formik.setFieldValue('videosChanges', [
                ...formik.values.videosChanges,
                videosChangesInput
            ]);
            formik.setFieldTouched('videosChanges', true); 
            setvideosChangesInput("");
        }
    };
    

    const handleRemoveVideoUrl = (indexToRemove) => {
        const updatedVideo = formik.values.videosChanges.filter((_, index) => index !== indexToRemove);
        formik.setFieldValue('videosChanges', updatedVideo);
    };

    const handleEditVideoUrl = (indexToEdit, newValue) => {
        const updatedVideo = formik.values.videosChanges.map((content, index) =>
          index === indexToEdit ? newValue : content
        );
        formik.setFieldValue('videosChanges', updatedVideo);
    };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Add videos Lesson</title>
        <meta name="description" content="Add videos Lesson page" />
        <meta
          name="keywords"
          content="Add videos Lesson, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='container mx-auto'> 
        <HeadSection  title="Add Video Lesson" subTitle="Video Lesson" link="Add Video Lesson"/>
        <div className='dark:bg-gray-900 mt-10 p-10 shadow-md rounded-lg'>
            <h3 className='text-blue-700  dark:text-blue-600 text-2xl font-semibold my-5'>Basic Info</h3>
            <form className='space-y-5 py-10' onSubmit={formik.handleSubmit}>
                <div >
                                <div className="flex gap-5 justify-center flex-wrap xl:flex-nowrap mt-4">
                                    <InputField
                                    onChange={(e) => setvideosChangesInput(e.target.value)}
                                    value={videosChangesInput}
                                    name="videosChanges"
                                    inputType="input"
                                    type="input"
                                    title={formik.errors.videosChanges && formik.touched.videosChanges ? `${formik.errors.videosChanges}` : "Video Lesson Url"}
                                    styleSpan={formik.errors.videosChanges && formik.touched.videosChanges ? "text-red-600" : "text-gray-600"}
                                    placeholder="Enter videos link"
                                    inputStyle={formik.errors.videosChanges && formik.touched.videosChanges ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                                    icon={formik.errors.videosChanges && formik.touched.videosChanges ? "bug" : "video"}
                                    iconStyle={formik.errors.videosChanges && formik.touched.videosChanges ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                                    
                                    />
                                    <button type="button" onClick={handleAddVideoUrl} className='bg-blue-600 text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700'>
                                    Add 
                                    </button>
                                </div>
                                <ul className="mt-4">
                                    {formik.values.videosChanges.map((content, index) => (
                                        <li key={index} className="p-2 bg-white dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center">
                                            <input
                                                type="text"
                                                value={content}
                                                onChange={(e) => handleEditVideoUrl(index, e.target.value)}
                                                className="focus:ring-0 shadow-md rounded-lg focus:outline-none focus:border-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500"
                                                placeholder="Enter video URL"
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveVideoUrl(index)} 
                                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                </div>
            <div className='flex justify-end'>
            {
                isLoading?<button type="submit" className='bg-blue-800 text-white p-4 rounded-md  hover:outline-blue-700' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                :<button type="submit" className='bg-blue-800 text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent duration-300 transition-all hover:text-blue-900 hover:font-semibold'>
                    Add Video
                </button>
            }
            </div>
            </form>
        </div>
    </div>
</>  )
}
