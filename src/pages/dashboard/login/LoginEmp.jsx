import  {  useState } from 'react'
import loginPhoto from "../../../assets/Instruction2.jpg"
import { Link } from 'react-router-dom'
import InputField from '../../../components/Input/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { loginWithoutPinCode, setEmployeeEmail, setEmployeePassword, setEmployeeToken } from '../../../redux/instructor/instructorSlice';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function LoginEmp() {
  const {isLoading } = useSelector(state => state.instructor);
  const [togglePassword,setTogglePassword]=useState(false)
  function togglePass(){
    setTogglePassword(!togglePassword)
  }
  const dispatch = useDispatch();
  async function login(value){
    const response =await dispatch(loginWithoutPinCode(value))
    if (response.payload?.success==false) {
      toast.error(response.payload?.message);
    } else {
      toast.success(response.payload?.message);
      if(response.payload.message === "successfully enter your private pinCode"){
        dispatch(setEmployeeEmail(formik.values.email))
        dispatch(setEmployeePassword(formik.values.password))
        window.location.href="/pinCode-employee"
      }else{
        if(response.payload.loggedForAccepted==1){
          dispatch(setEmployeeEmail(formik.values.email))
          dispatch(setEmployeePassword(formik.values.password))
          window.location.href="/pinCode-employee"

        }else{
            localStorage.setItem("TokenEmployee",`ahmed__${response.payload.token}`)
            const Token=localStorage.getItem("TokenEmployee")
            dispatch(setEmployeeToken(Token))
            dispatch(setEmployeeEmail(formik.values.email))
            dispatch(setEmployeePassword(formik.values.password))
            window.location.href="/requestResult-employee"

        }
                  
      }
    }

  }
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("The email is required"),
    password: yup.string().min(5, "The password must be more than or equal to 10 characters").required("The password is required"),
  })
  const formik=useFormik({
    initialValues:{
      email: "",
      password: "",
    },
    onSubmit:login,
    validationSchema
  })
  
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Login Instructor</title>
        <meta name="description" content="Login Instructor page" />
        <meta name="keywords" content="Login Instructor, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='bg-gray-100 dark:bg-gray-800  min-h-screen flex items-center justify-center'>
      <div className="flex flex-wrap flex-row-reverse md:flex-nowrap items-center w-full">
        <div className='w-full xl:w-1/2 lg:flex self-start hidden'>
          <img src={loginPhoto} className='w-full rounded-md' alt="signup" />
        </div>
        <div className='w-full xl:w-1/2 p-3 md:p-10'>
          <div className='bg-white dark:bg-gray-900  p-10 rounded-lg shadow-lg'>
            <h1 className='text-gray-800 text-2xl dark:text-gray-300 mb-6'>Hi there, ....</h1>
            <p className='text-gray-600 dark:text-gray-500 mb-6'>Get Started with Appointments.</p>
            <form action="" className='flex flex-col space-y-4' onSubmit={formik.handleSubmit}>
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
                  <InputField
                        iconRight={togglePassword?"eye":"eye-slash"}
                        iconRightStyle={"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                        onClick={togglePass}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        name="password"
                        type="input"
                        inputType={togglePassword?"text":"password"}
                        title={formik.errors.password && formik.touched.password?`${formik.errors.password}`:"Password"}
                        styleSpan={formik.errors.password && formik.touched.password?"text-red-600":"text-gray-600"}
                        placeholder={formik.errors.password && formik.touched.password?`${formik.errors.password}`:"Password"}
                        inputStyle={formik.errors.password && formik.touched.password ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                        icon={formik.errors.password && formik.touched.password?"bug":"lock"}
                        iconStyle={formik.errors.password && formik.touched.password?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                      />  
                      {
                  isLoading?<button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-lg"></i></button>
                  :<button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg'>Login</button>
                }            
              
              <div className=' text-gray-600 flex justify-between'>
                <p className='text-gray-900 dark:text-gray-600'>Already have an account? <Link to="/signup-employee" className='text-blue-700 hover:text-blue-600 underline duration-300 transition-all'>signup</Link></p>
                <Link to="/forgetPassword-employee" className='text-blue-700 hover:text-blue-600 underline duration-300 transition-all'>Forget password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
