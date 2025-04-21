import  {  useState } from 'react';
import signupPhoto from "../../../assets/Instruction.jpg";
import { Link } from 'react-router-dom';
import InputField from '../../../components/Input/InputField';
import InputUpload from '../../../components/uploadInput/InputUpload';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { signupInstructor } from '../../../redux/instructor/instructorSlice';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function SignUpEmp() {
  const { isLoading } = useSelector(state => state.instructor);
  const dispatch = useDispatch();
  const [togglePassword,setTogglePassword]=useState(false)
  function togglePass(){
    setTogglePassword(!togglePassword)
  }

  const signup = async(values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    const res =await dispatch(signupInstructor(formData));
    if(res.payload.success){
      toast.success(res.payload.message)
      window.location.href="/activeAcount-employee"
    }else{      
      toast.error(res.payload.message)
    }
    
  };

  const validationSchema = yup.object({
    name: yup.string().min(10, "The name must be more than or equal to 10 characters").required("The name is required"),
    email: yup.string().email("Invalid email format").required("The email is required"),
    phone: yup.string().matches(/^(010|011|015|012)[0-9]{8,9}$/, "Invalid phone number").required("The phone number is required"),
    address: yup.string().min(10, "The address must be more than or equal to 10 characters").required("The address is required"),
    job: yup.string().min(5, "The job title must be more than or equal to 5 characters").required("The job is required"),
    password: yup.string().min(10, "The password must be more than or equal to 10 characters").required("The password is required"),
    subjects: yup.string().min(10, "The subjects must be more than or equal to 10 characters").required("The subjects are required"),
    introductionPerson: yup.string().min(10, "The introduction must be more than or equal to 10 characters").required("The introduction is required"),
    profilePicture: yup.mixed()
      .required("Profile picture is required")
      .test('fileFormat', 'Unsupported file format. Supported formats are webp, jpeg, png', (value) => {
        if (value) {
          return ['image/jpeg', 'image/png','image/webp'].includes(value.type);
        }
        return true;
      }),
      
    resume: yup.mixed()
      .required("Resume is required")
      .test('fileFormat', 'Unsupported file format. Supported formats are webp, jpeg, png', (value) => {
        if (value) {
          return ['image/jpeg', 'image/png','image/webp'].includes(value.type);
        }
        return true;
      }),
      
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      job: "",
      password: "",
      subjects: "",
      introductionPerson: "",
      profilePicture: null,
      resume: null,
    },
    validationSchema,
    onSubmit: signup,
  });

  const handleChangeFile = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      formik.setFieldValue(name, files[0]);
    }
  };


  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Signup</title>
        <meta name="description" content="signup page" />
        <meta name="keywords" content="signup, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
    <div className='bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col items-center justify-center'>
      <div className="flex flex-wrap flex-row-reverse md:flex-nowrap items-center w-full">
        <div className='w-full xl:w-1/2 lg:flex self-start hidden '>
          <img src={signupPhoto} className='w-full rounded-md' alt="signup" />
        </div>
        <div className='w-full xl:w-1/2 p-5 md:p-10'>
          <div className='bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg'>
            <h1 className='text-gray-800 dark:text-gray-300 text-2xl mb-6'>Hi there, ....</h1>
            <p className='text-gray-600 dark:text-gray-500 mb-6'>Get Started with Appointments.</p>
            <form action="" className='flex flex-col space-y-4' onSubmit={formik.handleSubmit}>
                <label className='flex gap-5 flex-wrap xl:flex-nowrap '>
                    <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name="name"
                    inputType="text"
                    type="input"
                    title={formik.errors.name && formik.touched.name?`${formik.errors.name}`:"Name"}
                    styleSpan={formik.errors.name && formik.touched.name?"text-red-600":"text-gray-600"}
                    placeholder={formik.errors.name && formik.touched.name?`${formik.errors.name}`:"Name"}
                    inputStyle={formik.errors.name && formik.touched.name ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.name && formik.touched.name?"bug":"user"}
                    iconStyle={formik.errors.name && formik.touched.name?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    />
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
                </label>
                <label className='flex gap-5 flex-wrap xl:flex-nowrap '>
                    <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    name="phone"
                    inputType="text"
                    type="input"
                    title={formik.errors.phone && formik.touched.phone?`${formik.errors.phone}`:"Phone number"}
                    styleSpan={formik.errors.phone && formik.touched.phone?"text-red-600":"text-gray-600"}
                    placeholder={formik.errors.phone && formik.touched.phone?`${formik.errors.phone}`:"+00 0342 0453 34"}
                    inputStyle={formik.errors.phone && formik.touched.phone ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.phone && formik.touched.phone?"bug":"phone"}
                    iconStyle={formik.errors.phone && formik.touched.phone?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    />
                    <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    name="address"
                    inputType="text"
                    type="input"
                    title={formik.errors.address && formik.touched.address?`${formik.errors.address}`:"Address"}
                    styleSpan={formik.errors.address && formik.touched.address?"text-red-600":"text-gray-600"}
                    placeholder={formik.errors.address && formik.touched.address?`${formik.errors.address}`:"Country City Governorate"}
                    inputStyle={formik.errors.address && formik.touched.address ?"w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.address && formik.touched.address?"bug":"map-marker-alt"}
                    iconStyle={formik.errors.address && formik.touched.address?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    />
                </label>
                <label className='flex gap-5 flex-wrap xl:flex-nowrap '>
                    <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.job}
                    name="job"
                    type="input"
                    inputType="text"
                    title={formik.errors.job && formik.touched.job?`${formik.errors.job}`:"Job"}
                    styleSpan={formik.errors.job && formik.touched.job?"text-red-600":"text-gray-600"}
                    placeholder={formik.errors.job && formik.touched.job?`${formik.errors.job}`:"Job"}
                    inputStyle={formik.errors.job && formik.touched.job ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.job && formik.touched.job?"bug":"briefcase"}
                    iconStyle={formik.errors.job && formik.touched.job?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    
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
                </label>
                <label className='flex gap-5 flex-wrap xl:flex-nowrap '>
                    <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.subjects}
                    name="subjects"
                    type="textarea"
                    title={formik.errors.subjects && formik.touched.subjects?`${formik.errors.subjects}`:"Subjects"}
                    styleSpan={formik.errors.subjects && formik.touched.subjects?"text-red-600":"text-gray-600"}
                    placeholder={formik.errors.subjects && formik.touched.subjects?`${formik.errors.subjects}`:"What subjects will you teach?"}
                    inputStyle={formik.errors.subjects && formik.touched.subjects ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.subjects && formik.touched.subjects?"bug":"book"}
                    iconStyle={formik.errors.subjects && formik.touched.subjects?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    />
                    <InputField
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.introductionPerson}
                    name="introductionPerson"
                    type="textarea"
                    title={formik.errors.introductionPerson && formik.touched.introductionPerson?`${formik.errors.introductionPerson}`:"Introduce yourself"}
                    styleSpan={formik.errors.introductionPerson && formik.touched.introductionPerson?"text-red-600":"text-gray-600"}
                    placeholder={formik.errors.introductionPerson && formik.touched.introductionPerson?`${formik.errors.introductionPerson}`:"What distinguishes you to accept the job?"}
                    inputStyle={formik.errors.introductionPerson && formik.touched.introductionPerson ? "w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500  bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500" : "w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"}
                    icon={formik.errors.introductionPerson && formik.touched.introductionPerson?"bug":"info-circle"}
                    iconStyle={formik.errors.introductionPerson && formik.touched.introductionPerson?"absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500":"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"}
                    />
                </label>
                <label className='flex gap-10 flex-wrap xl:flex-nowrap py-3 '>
                    <InputUpload
                    onChange={handleChangeFile}
                    onBlur={formik.handleBlur}
                    value={formik.values.profilePicture}
                    name="profilePicture"
                    title={
                        formik.errors.profilePicture && formik.touched.profilePicture
                        ? `${formik.errors.profilePicture}`
                        : formik.values.profilePicture
                        ? "Profile Picture uploaded"
                        : "Click to upload Profile Picture"
                    }                    
                    paraStyle={formik.errors.profilePicture && formik.touched.profilePicture?"mb-2 text-sm text-red-500":"mb-2 text-sm text-gray-500"}
                    labelStyle={formik.errors.profilePicture && formik.touched.profilePicture?"flex dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 flex-col items-center justify-center w-full h-64 border-2 border-red-300 border-dashed rounded-lg cursor-pointer bg-red-100":"flex flex-col items-center justify-center w-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"}
                    subTitle="PNG, JPG, webp"
                    />
                    <InputUpload
                    onChange={handleChangeFile}
                    onBlur={formik.handleBlur}
                    value={formik.values.resume}
                    name="resume"
                    labelStyle={formik.errors.resume && formik.touched.resume?"flex dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 flex-col items-center justify-center w-full h-64 border-2 border-red-300 border-dashed rounded-lg cursor-pointer bg-red-100":"flex flex-col items-center justify-center w-full dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"}
                    title={
                        formik.errors.resume && formik.touched.resume
                        ? `${formik.errors.resume}`
                        : formik.values.resume
                        ? "Resume uploaded"
                        : "Click to upload Resume"
                    }                  
                    paraStyle={formik.errors.resume && formik.touched.resume?"mb-2 text-sm text-red-500":"mb-2 text-sm text-gray-500"}
                    subTitle="PNG, JPG, webp"
                    />
                </label>
                {
                  isLoading?<button type="submit" className='w-24 ms-auto bg-opacity-50 border-blue-900 bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lgg' disabled><i className="fa-solid fa-spinner fa-spin-pulse text-2xl"></i></button>
                  :<button type="submit" className='w-24 ms-auto bg-opacity-80 border-blue-900 bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 border dark:hover:bg-blue-700 dark:text-white dark:bg-opacity-50  duration-500 transition-all p-3 rounded-lg'>Sign Up</button>

                }
                <div className='text-gray-900 dark:text-gray-600'>
                    Already have an account? <Link to="/login-employee" className='text-blue-700 hover:text-blue-600 underline'>Login</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
