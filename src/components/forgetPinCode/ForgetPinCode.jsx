import { useFormik } from 'formik';
import React from 'react'
import * as yup from 'yup';
import InputField from '../Input/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPinCodeEmp } from '../../redux/instructor/instructorSlice';
import { toast } from 'react-toastify';

export default function ForgetPinCode() {
    const { isLoading } = useSelector(state => state.instructor);
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        email: yup.string().email("Invalid email format").required("The email is required"),
    });
    const handleForgetPinCode =async(value)=>{
        const response=await dispatch(forgetPinCodeEmp(value))
        if(response.payload.message == "Cannot read properties of null (reading 'role')"){
            toast.error("email is not found")
        }else if(response.payload.message ==  "as an instructor you have not pinCode until you been accepted"){
            toast.error("instructor you have not pinCode until you been accepted")
        }else{
            toast.success(response.payload.message)
            window.open("https://mail.google.com/", "_blank");
            setTimeout(()=>{
                window.location.href="/pinCode-employee"
            },6000)
        }
        
    }
    const formik = useFormik({
        initialValues: {
            email:"",
        },
        onSubmit: handleForgetPinCode,
        validationSchema,
    });

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Forget pin code </title>
        <meta name="description" content="Forget pin code page" />
        <meta
          name="keywords"
          content="Forget pin code, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
        <div className='h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800'>
            <form onSubmit={formik.handleSubmit} className='bg-white dark:bg-gray-900 shadow-md  p-10 rounded-md w-full sm:w-1/2 space-y-5'>
                <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                    inputType="email"
                    type="input"
                    title={formik.errors.email && formik.touched.email?`${formik.errors.email}`:"Email address"}
                    styleSpan={formik.errors.email && formik.touched.email?"text-red-600":"text-gray-600"}
                    placeholder={formik.errors.email && formik.touched.email?`${formik.errors.email}`:"@gmail.com"}
                    inputStyle={formik.errors.email && formik.touched.email ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.email && formik.touched.email?"bug":"envelope"}
                    iconStyle={formik.errors.email && formik.touched.email?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    
                />     
                {
                    isLoading
                        ? <button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                        : <button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg'>Send</button>
                }
            </form>
        </div>
    </>
  )
}
