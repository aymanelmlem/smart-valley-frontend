import  {   useState } from 'react'
import forgetPhoto from "../../../assets/Forgot password2.jpg"
import { Link } from 'react-router-dom'
import InputField from '../../../components/Input/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";
import { forgetPasswordEmp, resetPasswordEmp } from '../../../redux/instructor/instructorSlice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function ForgetPassEmp() {
  const { isLoading,forgetPass } = useSelector(state => state.instructor);
  const [togglePassword,setTogglePassword]=useState(false)
  const dispatch = useDispatch();
  function togglePass(){
    setTogglePassword(!togglePassword)
  }
  function togglePass2(){
    setTogglePassword(!togglePassword)
  }
  
  const forgetPassword = async (values) => {
    try {
      const response = await dispatch(forgetPasswordEmp(values));
      if (response.payload.success ==false) {
        toast.error(response.payload.message);
      } else {
        toast.success(response.payload.message);
        window.open("https://mail.google.com/", "_blank");
      }
    } catch (error) {
      toast.error("An error occurred while sending the reset code.");
    }
  };
  
  const resetPassword=async (value)=>{
    try {
      const response=await dispatch(resetPasswordEmp(value));

    if (response.payload.success ==false) {
      toast.error(response.payload.message);
    } else {
      toast.success(response.payload.message);
      resetFormik.resetForm()
    }
    } catch (error) {
      toast.error("An error occurred while sending the reset code.");
    }
    

  }
  const emailSchema = yup.object({
    email: yup.string().email("Invalid email format").required("The email is required"),
  })
  const resetSchema = yup.object({
    email: yup.string().email("Invalid email format").required("The email is required"),
    resetCode: yup.string().length(8, "The code must be 8 characters").required("The code is required"),
    pass: yup.string().min(10, "The password must be more than or equal to 10 characters").required("The password is required"),
    rePass: yup.string().oneOf([yup.ref('pass'), null], "Passwords must match").required("The password confirmation is required")
  });
  const formik=useFormik({
    initialValues:{
      email: "",
    },
    onSubmit:forgetPassword,
    validationSchema:emailSchema,
  })
  const resetFormik = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
      pass: "",
      rePass: ""
    },
    onSubmit: resetPassword,
    validationSchema: resetSchema
});
  
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
        <meta name="description" content="Forget Password page" />
        <meta name="keywords" content="Forget Password, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
     <div className='bg-gray-100 dark:bg-gray-800  min-h-screen flex items-center justify-center '>
      <div className="flex flex-wrap  flex-row-reverse md:flex-nowrap items-center w-full bg-white dark:bg-gray-900  shadow-lg rounded-xl overflow-hidden scale-90">
        <div className='w-full xl:w-1/2 lg:flex self-start hidden'>
          <img src={forgetPhoto} className='w-full' alt="signup" />
        </div>
        <div className='w-full xl:w-1/2 p-3 md:p-10'>
          <div className='p-4 md:p-0'>
            <h1 className='text-gray-800 text-2xl mb-6 dark:text-gray-300'>Forget Password</h1>
            <p className='text-gray-700 dark:text-gray-500 mb-6'>If you've forgotten your password, don't worry! You can easily reset it by following these steps:</p>
                  {
                    forgetPass?.message === "the reset code is sending sucessfully to your mail check you gmail"?<>
                  <form action="" className='flex flex-col space-y-4' onSubmit={resetFormik.handleSubmit}>
                        <InputField
                    onBlur={resetFormik.handleBlur}
                    onChange={resetFormik.handleChange}
                    value={resetFormik.values.email}
                    name="email"
                    inputType="email"
                    type="input"
                    title={resetFormik.errors.email && resetFormik.touched.email?`${resetFormik.errors.email}`:"Email address"}
                    styleSpan={resetFormik.errors.email && resetFormik.touched.email?"text-red-600":"text-gray-600"}
                    placeholder={resetFormik.errors.email && resetFormik.touched.email?`${resetFormik.errors.email}`:"@gmail.com"}
                    inputStyle={resetFormik.errors.email && resetFormik.touched.email ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={resetFormik.errors.email && resetFormik.touched.email?"bug":"envelope"}
                    iconStyle={resetFormik.errors.email && resetFormik.touched.email?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                  />
                  <InputField
                      onBlur={resetFormik.handleBlur}
                      onChange={resetFormik.handleChange}
                      value={resetFormik.values.resetCode}
                      name="resetCode"
                      inputType="text"
                      type="input"
                      title={resetFormik.errors.resetCode && resetFormik.touched.resetCode?`${resetFormik.errors.resetCode}`:"code"}
                      styleSpan={resetFormik.errors.resetCode && resetFormik.touched.resetCode?"text-red-600":"text-gray-600"}
                      placeholder={resetFormik.errors.resetCode && resetFormik.touched.resetCode?`${resetFormik.errors.resetCode}`:"00 00 00 00"}
                      inputStyle={resetFormik.errors.resetCode && resetFormik.touched.resetCode ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                      icon={resetFormik.errors.resetCode && resetFormik.touched.resetCode?"bug":"code"}
                      iconStyle={resetFormik.errors.resetCode && resetFormik.touched.resetCode?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                  />
                  <InputField
                    iconRight={togglePassword?"eye":"eye-slash"}
                    iconRightStyle={"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    onClick={togglePass}
                    onBlur={resetFormik.handleBlur}
                    onChange={resetFormik.handleChange}
                    value={resetFormik.values.pass}
                    name="pass"
                    type="input"
                    inputType={togglePassword?"text":"password"}
                    title={resetFormik.errors.pass && resetFormik.touched.pass?`${resetFormik.errors.pass}`:"Password"}
                    styleSpan={resetFormik.errors.pass && resetFormik.touched.pass?"text-red-600":"text-gray-600"}
                    placeholder={resetFormik.errors.pass && resetFormik.touched.pass?`${resetFormik.errors.pass}`:"Password"}
                    inputStyle={resetFormik.errors.pass && resetFormik.touched.pass ?"w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={resetFormik.errors.pass && resetFormik.touched.pass?"bug":"lock"}
                    iconStyle={resetFormik.errors.pass && resetFormik.touched.pass?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    
                    />
                    <InputField
                    iconRight={togglePassword?"eye":"eye-slash"}
                    iconRightStyle={"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    onClick={togglePass2}
                    onBlur={resetFormik.handleBlur}
                    onChange={resetFormik.handleChange}
                    value={resetFormik.values.rePass}
                    name="rePass"
                    type="input"
                    inputType={togglePassword?"text":"password"}
                    title={resetFormik.errors.rePass && resetFormik.touched.rePass?`${resetFormik.errors.rePass}`:"Confirm Password"}
                    styleSpan={resetFormik.errors.rePass && resetFormik.touched.rePass?"text-red-600":"text-gray-600"}
                    placeholder={resetFormik.errors.rePass && resetFormik.touched.rePass?`${resetFormik.errors.rePass}`:"Password"}
                    inputStyle={resetFormik.errors.rePass && resetFormik.touched.rePass ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={resetFormik.errors.rePass && resetFormik.touched.rePass?"bug":"lock"}
                    iconStyle={resetFormik.errors.rePass && resetFormik.touched.rePass?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    
                    />
                    {
                  isLoading?<button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                  :<button type="submit" className='w-44 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg'>Reset password</button>
                    }  
              
                    </form>

                    </>  :<>
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
                  {
                  isLoading?<button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i></button>
                  :<button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg'>Send</button>
                    }  
                  </form>

                  </>
                  }              

              <div className=' text-gray-900 dark:text-gray-600 flex justify-end mt-4'>
                 <Link to="/login-employee" className='text-blue-700 hover:text-blue-600 underline  duration-300 transition'>Login <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
          </div>
        </div>
      </div>
    </div>
</>
  )
}
