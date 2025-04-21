import React from 'react';
import InputField from '../Input/InputField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPinCode, setEmployeeToken } from '../../redux/instructor/instructorSlice';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function LoginPinCode() {
    const { email, password, isLoading } = useSelector(state => state.instructor);
    const dispatch = useDispatch();

    async function loginPinCode(values) {
        const response = await dispatch(loginWithPinCode(values));
        if(response?.payload.message == "logged In Sucessfully"){
            localStorage.setItem("TokenEmployee",`ahmed__${response.payload.token}`)
            const Token=localStorage.getItem("TokenEmployee")
            dispatch(setEmployeeToken(Token))
            window.location.href="/panel";
        }else{
            toast.error(response?.payload.message)
        }
    }

    const validationSchema = yup.object({
        pinCode: yup.string().length(8, "The code must be 8 characters").required("The code is required")
    });

    const formik = useFormik({
        initialValues: {
            email: email || "",
            password: password || "",
            pinCode: ""
        },
        onSubmit: loginPinCode,
        validationSchema,
    });

    return (
        <div className='h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800'>
            <form onSubmit={formik.handleSubmit} className='bg-white shadow-md  p-10 rounded-md w-full sm:w-1/2 space-y-5'>
                <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.pinCode}
                    name="pinCode"
                    inputType="text"
                    type="input"
                    title={formik.errors.pinCode && formik.touched.pinCode ? `${formik.errors.pinCode}` : "Pin Code"}
                    styleSpan={formik.errors.pinCode && formik.touched.pinCode ? "text-red-600" : "text-gray-600"}
                    placeholder={formik.errors.pinCode && formik.touched.pinCode ? `${formik.errors.pinCode}` : "00 00 00 00"}
                    inputStyle={formik.errors.pinCode && formik.touched.pinCode ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.pinCode && formik.touched.pinCode ? "bug" : "code"}
                    iconStyle={formik.errors.pinCode && formik.touched.pinCode ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                />
                {
                    isLoading
                        ? <button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                        : <button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg'>Login</button>
                }
                <div className='flex justify-end'>
                    <Link to="/ForgetPinCode" className='text-blue-700 hover:text-blue-600 underline duration-300 transition-all'>Forget Pin Code ?</Link>
                </div>
            </form>
        </div>
    );
}
