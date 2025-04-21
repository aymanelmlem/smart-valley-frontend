import  { Suspense, lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import LoadingBetweenPage from './components/LoadingBetweenPage/LoadingBetweenPage';
import Setting from './pages/dashboard/setting/Setting';
import Requests from './pages/dashboard/Requests/Requests';
import ProtectedRouteAdmin from './components/protectedRoute/ProtectedRouteAdmin';
import InstructorProtectedRoute from './components/protectedRoute/InstructorProtectedRoute';
import Category from './pages/dashboard/category/Category';
import CoursesIns from './pages/dashboard/courses/CoursesIns';
import MyCourses from './pages/dashboard/MyCourses/MyCourses';
import DeleteCategory from './pages/dashboard/category/deleteCategory/DeleteCategory';
import UpdateSubCategory from './pages/dashboard/category/updateSubCategory/UpdateSubCategory';
import MyCategories from './pages/dashboard/category/MyCategories/MyCategories';
import AllCategories from './pages/dashboard/category/AllCategory/AllCategories';
import UpdateCourse from './pages/dashboard/MyCourses/update course/UpdateCourse';
import UpdateVideo from './pages/dashboard/MyCourses/update video/UpdateVideo';
import CourseDetails from './pages/dashboard/MyCourses/courseDetails/CourseDetails';
import WhatYouLearn from './pages/dashboard/MyCourses/what you learn/WhatYouLearn';
import DeleteAccessible from './pages/dashboard/MyCourses/delete Accessible/DeleteAccessible';
import AddVideo from './pages/dashboard/MyCourses/add video/AddVideo';
import AddObjective from './pages/dashboard/MyCourses/what you learn/add what you learn/AddObjective';
import DeleteObjective from './pages/dashboard/MyCourses/what you learn/delete what you learn/DeleteObjective';
import AddSection from './pages/dashboard/MyCourses/section/AddSection';
import AllSection from './pages/dashboard/MyCourses/section/allSection/AllSection';
import UpdateSection from './pages/dashboard/MyCourses/section/updateSection/UpdateSection';
import AddObjectiveSection from './pages/dashboard/MyCourses/section/addObjective/AddObjectiveSection';
import DeleteObjectiveSection from './pages/dashboard/MyCourses/section/delete objective/DeleteObjectiveSection';
import UpdateObjectiveSection from './pages/dashboard/MyCourses/section/updateObjective/UpdateObjectiveSection';
import AddLesson from './pages/dashboard/MyCourses/lessons/AddLesson';
import UpdateLesson from './pages/dashboard/MyCourses/lessons/update lesson/UpdateLesson';
import AddRequiredLink from './pages/dashboard/MyCourses/lessons/required link/AddRequiredLink';
import UpdateRequiredLink from './pages/dashboard/MyCourses/lessons/required link/UpdateRequiredLink';
import DeleteRequired from './pages/dashboard/MyCourses/lessons/required link/DeleteRequired';
import AddVideoLesson from './pages/dashboard/MyCourses/lessons/video/AddVideoLesson';
import DeleteVideoLesson from './pages/dashboard/MyCourses/lessons/video/DeleteVideoLesson';
import AddFileLesson from './pages/dashboard/MyCourses/lessons/file lesson/AddFileLesson';
import PageNotFound from './pages/page not found/PageNotFound';
import CoursesByCategories from './pages/website/courses/course By category/CoursesByCategories';
import AllCategoriesStudent from './pages/website/categories/AllCategoriesStudent';
import CoursesBySubCategory from './pages/website/subCategory/CoursesBySubCategory';
import CourseDetailsStudent from './pages/website/courses/course Details/CourseDetailsStudent';
import InstructorDetails from './pages/website/Instructor Details/InstructorDetails';
import UpdateFileLesson from './pages/dashboard/MyCourses/lessons/file lesson/UpdateFileLesson';
import DeleteFileLesson from './pages/dashboard/MyCourses/lessons/file lesson/DeleteFileLesson';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import SectionStudent from './pages/website/section/SectionStudent';
import Profile from './pages/website/profile/Profile';
import Cart from './pages/website/cart/Cart';
import Faviroute from './pages/website/faviroute/Faviroute';
import RequestStudentCourse from './pages/website/RequestStudent/RequestStudentCourse';
import Purcase from './pages/dashboard/purcase/Purcase';
import MyLearning from './pages/website/My learning/MyLearning';
import ProtectedRouteStudent from './components/protectedRoute/ProtectedRouteStudent';
import Exams from './pages/dashboard/exams/Exams';
import CreateExam from './pages/dashboard/exams/CreateExam';
import AllExamIns from './pages/dashboard/exams/AllExamIns';
import ExamDetails from './pages/dashboard/exams/ExamDetails';
import ExamsStudent from './pages/website/ExamStudent/ExamsStudent';
import ExamDetailsStu from './pages/website/ExamStudent/ExamDetailsStu';
import ExamResult from './pages/website/ExamStudent/ExamResult';
import ExamCorrection from './pages/dashboard/exams/ExamCorrection';

const Website = lazy(() => import('./pages/website/Website'));
const About = lazy(() => import('./pages/website/About/About'));
const Courses = lazy(() => import('./pages/website/courses/Courses'));
const Instructor = lazy(() => import('./pages/website/instructor/Instructor'));
const Login = lazy(() => import('./pages/website/loginStudent/Login'));
const Signup = lazy(() => import('./pages/website/SignupStudent/Signup'));
const ForgetPassword = lazy(() => import('./pages/website/forgetPasswordStudent/ForgetPassword'));
const Home = lazy(() => import('./pages/website/Home/Home'));
const Contact = lazy(() => import('./pages/website/Contact/Contact'));
const LoginEmp = lazy(() => import('./pages/dashboard/login/LoginEmp'));
const SignUpEmp = lazy(() => import('./pages/dashboard/Signup/SignUpEmp'));
const ForgetPassEmp = lazy(() => import('./pages/dashboard/ForgetPassword/ForgetPassEmp'));
const Layout = lazy(() => import('./components/Layout/Layout'));
const Panal = lazy(() => import('./pages/dashboard/panel/Panal'));
const ActiveAcount = lazy(() => import('./pages/dashboard/activeAccount/ActiveAcount'));
const RequestResult = lazy(() => import('./pages/dashboard/Reuest-Result/RequestResult'));
const InstructorWithOutPinCodeProtectedRoute = lazy(() => import('./components/protectedRoute/InstructorWithOutPinCodeProtectedRoute'));
const LoginPinCode = lazy(() => import('./components/LoginPinCode/LoginPinCode'));
const ForgetPinCode = lazy(() => import('./components/forgetPinCode/ForgetPinCode'));
const AllInstructors = lazy(() => import('./pages/dashboard/instructors/AllInstructors'));
const ProtectedRouteAdminAndSuperAdmin = lazy(() => import('./components/protectedRoute/ProtectedRouteAdminAndSuperAdmin'));
const AddInstructors = lazy(() => import('./pages/dashboard/instructors/add instructor/AddInstructors'));
const AddManager = lazy(() => import('./pages/dashboard/manager/add manager/AddManager'));
const ProtectedRouteSuperAdmin = lazy(() => import('./components/protectedRoute/ProtectedRouteSuperAdmin'));
const AllManager = lazy(() => import('./pages/dashboard/manager/AllManager'));

function App() {
  const routes = createBrowserRouter([
    {
      path: "/", element: <Suspense fallback={<LoadingBetweenPage />}><Website /></Suspense>, children: [
        { index: true, element: <Suspense fallback={<LoadingBetweenPage />}><Home /></Suspense> },
        { path: "about", element: <Suspense fallback={<LoadingBetweenPage />}><About /></Suspense> },
        { path: "contact", element: <Suspense fallback={<LoadingBetweenPage />}><Contact /></Suspense> },
        { path: "courses", element: <Suspense fallback={<LoadingBetweenPage />}><Courses /></Suspense> },
        { path: "instructor", element: <Suspense fallback={<LoadingBetweenPage />}><Instructor /></Suspense> },
        { path: "student-login", element: <Suspense fallback={<LoadingBetweenPage />}><Login /></Suspense> },
        { path: "student-signup", element: <Suspense fallback={<LoadingBetweenPage />}><Signup /></Suspense> },
        { path: "student-forgetPassword", element: <Suspense fallback={<LoadingBetweenPage />}><ForgetPassword /></Suspense> },
        { path: "CoursesByCategories/:categoryId", element: <Suspense fallback={<LoadingBetweenPage />}><CoursesByCategories /></Suspense> },
        { path: "CoursesBySubCategories/:subcategoryId", element: <Suspense fallback={<LoadingBetweenPage />}><CoursesBySubCategory /></Suspense> },
        { path: "categories", element: <Suspense fallback={<LoadingBetweenPage />}><AllCategoriesStudent /></Suspense> },
        { path: "CourseDetailsStudent/:id", element: <Suspense fallback={<LoadingBetweenPage />}><CourseDetailsStudent /></Suspense> },
        { path: "InstructorDetails/:id", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorDetails /></Suspense> },
        { path: "sections/:courseId", element: <Suspense fallback={<LoadingBetweenPage />}><SectionStudent /></Suspense> },
        { path: "profile", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteStudent><Profile /></ProtectedRouteStudent></Suspense> },
        { path: "cart", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteStudent><Cart /></ProtectedRouteStudent></Suspense> },
        { path: "favourite", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteStudent><Faviroute /></ProtectedRouteStudent></Suspense> },
        { path: "requestStudent", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteStudent><RequestStudentCourse /></ProtectedRouteStudent></Suspense> },
        { path: "myLearning", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteStudent><MyLearning /></ProtectedRouteStudent></Suspense> },
        { path: "allexam/:id", element: <Suspense fallback={<LoadingBetweenPage />}><ExamsStudent/></Suspense> },
        { path: "examDetailsStudent/:id", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteStudent><ExamDetailsStu/></ProtectedRouteStudent></Suspense> },
        { path: "exam-result/:id", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteStudent><ExamResult/></ProtectedRouteStudent></Suspense> },
      
      ]
    },
    {
      path: "/panel", element: <Suspense fallback={<LoadingBetweenPage />}><Layout /></Suspense>, children: [
        { index: true, element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdminAndSuperAdmin><Panal /></ProtectedRouteAdminAndSuperAdmin></Suspense> },
        { path: "instructors", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteSuperAdmin><AllInstructors /></ProtectedRouteSuperAdmin></Suspense> },
        { path: "addInstructor", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteSuperAdmin><AddInstructors /></ProtectedRouteSuperAdmin></Suspense> },
        { path: "addManager", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteSuperAdmin><AddManager /></ProtectedRouteSuperAdmin></Suspense> },
        { path: "managers", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteSuperAdmin><AllManager /></ProtectedRouteSuperAdmin></Suspense> },
        { path: "requests", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdmin><Requests /></ProtectedRouteAdmin></Suspense> },
        { path: "category", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><Category /></InstructorProtectedRoute></Suspense> },
        { path: "myCategory", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><MyCategories /></InstructorProtectedRoute></Suspense> },
        { path: "allCategories", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AllCategories /></InstructorProtectedRoute></Suspense> },
        { path: "courses", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><CoursesIns /></InstructorProtectedRoute></Suspense> },
        { path: "mycourses", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><MyCourses /></InstructorProtectedRoute></Suspense> },
        { path: "delsubcategory", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><DeleteCategory /></InstructorProtectedRoute></Suspense> },
        { path: "updateSubCategory", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateSubCategory /></InstructorProtectedRoute></Suspense> },
        { path: "updateCourse", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateCourse /></InstructorProtectedRoute></Suspense> },
        { path: "updateVideo", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateVideo /></InstructorProtectedRoute></Suspense> },
        { path: "DeleteAccesible", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><DeleteAccessible /></InstructorProtectedRoute></Suspense> },
        { path: "addVideo", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddVideo /></InstructorProtectedRoute></Suspense> },
        { path: "updatewhatyouLearn", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><WhatYouLearn /></InstructorProtectedRoute></Suspense> },
        { path: "addwhatyouLearn", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddObjective /></InstructorProtectedRoute></Suspense> },
        { path: "deletewhatyouLearn", element: <Suspense fallbaعck={<LoadingBetweenPage />}><InstructorProtectedRoute><DeleteObjective /></InstructorProtectedRoute></Suspense> },
        { path: "courseDetails/:id", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><CourseDetails /></InstructorProtectedRoute></Suspense> },
        { path: "addSection", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddSection /></InstructorProtectedRoute></Suspense> },
        { path: "sections/:courseId", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AllSection /></InstructorProtectedRoute></Suspense> },
        { path: "updateSection", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateSection /></InstructorProtectedRoute></Suspense> },
        { path: "addObjectiveSection", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddObjectiveSection /></InstructorProtectedRoute></Suspense> },
        { path: "deleteObjectiveSection", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><DeleteObjectiveSection /></InstructorProtectedRoute></Suspense> },
        { path: "updateObjectiveSection", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateObjectiveSection /></InstructorProtectedRoute></Suspense> },
        { path: "addLesson", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddLesson /></InstructorProtectedRoute></Suspense> },
        { path: "updateLesson", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateLesson /></InstructorProtectedRoute></Suspense> },
        { path: "addRequiredLink", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddRequiredLink /></InstructorProtectedRoute></Suspense> },
        { path: "updateRequiredLink", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateRequiredLink /></InstructorProtectedRoute></Suspense> },
        { path: "deleteRequiredLink", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><DeleteRequired /></InstructorProtectedRoute></Suspense> },
        { path: "addVideoLesson", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddVideoLesson /></InstructorProtectedRoute></Suspense> },
        { path: "deleteVideoLesson", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><DeleteVideoLesson /></InstructorProtectedRoute></Suspense> },
        { path: "addFileLesson", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><AddFileLesson /></InstructorProtectedRoute></Suspense> },
        { path: "updateFileLesson", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><UpdateFileLesson /></InstructorProtectedRoute></Suspense> },
        { path: "deleteFileLesson", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><DeleteFileLesson /></InstructorProtectedRoute></Suspense> },
        { path: "setting", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdminAndSuperAdmin><Setting /></ProtectedRouteAdminAndSuperAdmin></Suspense> },
        { path: "purcase", element: <Suspense fallback={<LoadingBetweenPage />}><InstructorProtectedRoute><Purcase /></InstructorProtectedRoute></Suspense> },
        { path: "exams", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdminAndSuperAdmin><Exams /></ProtectedRouteAdminAndSuperAdmin></Suspense> },
        { path: "createExams/:id", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdminAndSuperAdmin><CreateExam /></ProtectedRouteAdminAndSuperAdmin></Suspense> },
        { path: "allexams", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdminAndSuperAdmin><AllExamIns /></ProtectedRouteAdminAndSuperAdmin></Suspense> },
        { path: "examDetails/:id", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdminAndSuperAdmin><ExamDetails /></ProtectedRouteAdminAndSuperAdmin></Suspense> },
        { path: "examCorrection/:id", element: <Suspense fallback={<LoadingBetweenPage />}><ProtectedRouteAdminAndSuperAdmin><ExamCorrection /></ProtectedRouteAdminAndSuperAdmin></Suspense> },


      ]
    },
    { path: "login-employee", element: <Suspense fallback={<LoadingBetweenPage />}><LoginEmp /></Suspense> },
    { path: "activeAcount-employee", element: <Suspense fallback={<LoadingBetweenPage />}><ActiveAcount /></Suspense> },
    { path: "signup-employee", element: <Suspense fallback={<LoadingBetweenPage />}><SignUpEmp /></Suspense> },
    { path: "forgetPassword-employee", element: <Suspense fallback={<LoadingBetweenPage />}><ForgetPassEmp /></Suspense> },
    {
      path: "requestResult-employee", element: <Suspense fallback={<LoadingBetweenPage />}>
        <InstructorWithOutPinCodeProtectedRoute >
          <RequestResult />
        </InstructorWithOutPinCodeProtectedRoute>
      </Suspense>
    },
    { path: "pinCode-employee", element: <Suspense fallback={<LoadingBetweenPage />}><LoginPinCode /></Suspense> },
    { path: "ForgetPinCode", element: <Suspense fallback={<LoadingBetweenPage />}><ForgetPinCode /></Suspense> },
    { path: "*", element: <Suspense fallback={<LoadingBetweenPage />}><PageNotFound /></Suspense> },

  ]);

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  
  return (
    
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
