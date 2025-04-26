import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

import { BASE_URL } from "../../utils/api";


export const signupStudent = createAsyncThunk(
    'signupStudent',
    async (value) => {
      try {
        const response = await axios.post(`${BASE_URL}/users/signUpForusers`, value);
        return response.data;
      } catch (error) {
        throw Error(error.message);
      }
    }
);
export const loginStudent = createAsyncThunk(
    'loginStudent',
    async (value) => {
      try {
        const response = await axios.post(`${BASE_URL}/users/login`, value);
        return response.data;
      } catch (error) {
        throw Error(error.message);
      }
    }
);
export const forgetPasswordStudent = createAsyncThunk(
    'forgetPasswordStudent',
    async (value) => {
      try {
        const response = await axios.patch(`${BASE_URL}/users/forgetPassFirstStage`, value);
        return response.data;
      } catch (error) {
        throw Error(error.message);
      }
    }
);
export const resetPasswordStudent = createAsyncThunk(
  'resetPasswordStudent',
  async (value) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/makePassForForgetPass`, value);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const updateUserData = createAsyncThunk(
  'updateUserData',
  async (value) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }
    
    try {
      const response = await axios.patch(`${BASE_URL}/users/updateUserData`, value,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const userProfileData = createAsyncThunk(
  'userProfileData',
  async () => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/users/getProfileData`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const logOutStudent = createAsyncThunk(
  'logOutUser',
  async () => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }
    
    try {
      const response = await axios.get(`${BASE_URL}/users/logOutUser`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const addOrDeleteCart = createAsyncThunk(
  'addOrDeleteCart',
  async (id) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }
    
    try {
      const response = await axios.patch(`${BASE_URL}/users/updateUserCart/${id}`,{},{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const addCourseInCartDatabase = createAsyncThunk(
  'addCourseInCartDatabase',
  async ({value}) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.patch(`${BASE_URL}/users/handleUsersLogInNowForChart`,value,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const addOrdeleteCourseFromWhilist=createAsyncThunk("addOrdeleteCourseFromWhilist",async (id) => {
  const headers={
    token:localStorage.getItem("tokenStudent")
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/users/handleLikes/${id}`,{headers});
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
})
export const addCourseInWhishlistDatabase = createAsyncThunk(
  'addCourseInWhishlistDatabase',
  async ({value}) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.patch(`${BASE_URL}/users/LikesForWhoJoinNow`,value,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const getMyCart = createAsyncThunk(
  'getMyCart',
  async () => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/users/getMyCart`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const getMyLikes = createAsyncThunk(
  'getMyLikes',
  async () => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/users/getLikesCourses`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const sendRequstBuyCourse=createAsyncThunk(
  'sendRequstBuyCourse',
  async (id) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.post(`${BASE_URL}/users/subscriber/subscribeOnSpCourse/${id}`,{},{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const showRequstBuyCourse=createAsyncThunk(
  'showRequstBuyCourse',
  async () => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/users/subscriber/getMyRequets`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const deleteRequstBuyCourse=createAsyncThunk(
  'deleteRequstBuyCourse',
  async (id) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.delete(`${BASE_URL}/users/subscriber/deleteSpRequestOnSpourse/${id}`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const myListOfCourses = createAsyncThunk(
  'myListOfCourses',
  async () => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/users/getMyListsOfCoursesICanWatch`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const allExamStudent = createAsyncThunk(
  'allExamStudent',
  async (id) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/tests/getCorseTests/${id}?examName=`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const filterExamStudent = createAsyncThunk(
  'filterExamStudent',
  async ({filter,id}) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/tests/getCorseTests/${id}`,{headers,params:filter});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const examStudentDetail = createAsyncThunk(
  'examStudentDetail',
  async (id) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/users/tests/getTestDataToStd/${id}`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const examStudentResult = createAsyncThunk(
  'examStudentResult',
  async (id) => {
    const headers={
      token:localStorage.getItem("tokenStudent")
    }    
    try {
      const response = await axios.get(`${BASE_URL}/users/tests/getTestResultToStd/${id}`,{headers});
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
const initialState={
    isLoading:false,
    studentToken:localStorage.getItem("tokenStudent"),
    isLogin:localStorage.getItem("tokenStudent"),
    singUp:"",
    login:"",
    forgetPass:"",
    resetPass:"",
    userData:"",
    profile:"",
    logoutStu:"",
    cart:"",
    cartDatabase:"",
    getcart:"",
    addOrRemoveWhilist:"",
    likeDatabase:"",
    getlike:"",
    sendBuyingCourses:null,
    getBuyingCourses:null,
    deleteBuyingCourses:null,
    myList:"",
    allExStu:null,
    examDetail:null,
    examRes:null,
}

export const StudentSlice=createSlice({
    name:"student",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.isLogin=action.payload
        },
        setStudentToken:(state,action)=>{
            state.studentToken=action.payload
        },
        logoutStudent:(state,action)=>{
            localStorage.removeItem("tokenStudent");
            state.studentToken=null;
            state.isLogin=null;
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(signupStudent.fulfilled,(state,action)=>{
            state.singUp=action.payload;
            state.isLoading=false
        })
        builder.addCase(signupStudent.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(signupStudent.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(loginStudent.fulfilled,(state,action)=>{
            state.login=action.payload;
            state.isLoading=false
        })
        builder.addCase(loginStudent.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(loginStudent.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(forgetPasswordStudent.fulfilled,(state,action)=>{
            state.forgetPass=action.payload;
            state.isLoading=false
        })
        builder.addCase(forgetPasswordStudent.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(forgetPasswordStudent.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(resetPasswordStudent.fulfilled,(state,action)=>{
          state.resetPass=action.payload;
          state.isLoading=false
      })
      builder.addCase(resetPasswordStudent.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(resetPasswordStudent.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(updateUserData.fulfilled,(state,action)=>{
          state.userData=action.payload;
          state.isLoading=false
      })
      builder.addCase(updateUserData.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(updateUserData.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(userProfileData.fulfilled,(state,action)=>{
        state.profile=action.payload;
        state.isLoading=false
      })
      builder.addCase(userProfileData.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(userProfileData.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(logOutStudent.fulfilled,(state,action)=>{
        state.logoutStu=action.payload;
        state.isLoading=false
      })
      builder.addCase(logOutStudent.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(logOutStudent.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(addOrDeleteCart.fulfilled,(state,action)=>{
        state.cart=action.payload;
        state.isLoading=false
      })
      builder.addCase(addOrDeleteCart.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(addOrDeleteCart.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(addCourseInCartDatabase.fulfilled,(state,action)=>{
        state.cartDatabase=action.payload;
        state.isLoading=false
      })
      builder.addCase(addCourseInCartDatabase.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(addCourseInCartDatabase.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(getMyCart.fulfilled,(state,action)=>{
        state.getcart=action.payload;
        state.isLoading=false
      })
      builder.addCase(getMyCart.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(getMyCart.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(addOrdeleteCourseFromWhilist.fulfilled,(state,action)=>{
        state.likeDatabase=action.payload;
        state.isLoading=false
      })
      builder.addCase(addOrdeleteCourseFromWhilist.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(addOrdeleteCourseFromWhilist.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(getMyLikes.fulfilled,(state,action)=>{
        state.getlike=action.payload;
        state.isLoading=false
      })
      builder.addCase(getMyLikes.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(getMyLikes.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(sendRequstBuyCourse.fulfilled,(state,action)=>{
        state.sendBuyingCourses=action.payload;
        state.isLoading=false
      })
      builder.addCase(sendRequstBuyCourse.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(sendRequstBuyCourse.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(showRequstBuyCourse.fulfilled,(state,action)=>{
        state.getBuyingCourses=action.payload;
        state.isLoading=false
      })
      builder.addCase(showRequstBuyCourse.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(showRequstBuyCourse.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(deleteRequstBuyCourse.fulfilled,(state,action)=>{
        state.deleteBuyingCourses=action.payload;
        state.isLoading=false
      })
      builder.addCase(deleteRequstBuyCourse.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(deleteRequstBuyCourse.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(myListOfCourses.fulfilled,(state,action)=>{
        state.myList=action.payload;
        state.isLoading=false
      })
      builder.addCase(myListOfCourses.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(myListOfCourses.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(allExamStudent.fulfilled,(state,action)=>{
        state.allExStu=action.payload;
        state.isLoading=false
      })
      builder.addCase(allExamStudent.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(allExamStudent.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(filterExamStudent.fulfilled,(state,action)=>{
        state.allExStu=action.payload;
        state.isLoading=false
      })
      builder.addCase(filterExamStudent.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(filterExamStudent.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(examStudentDetail.fulfilled,(state,action)=>{
        state.examDetail=action.payload;
        state.isLoading=false
      })
      builder.addCase(examStudentDetail.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(examStudentDetail.pending,(state,action)=>{
          state.isLoading=true
      })
      builder.addCase(examStudentResult.fulfilled,(state,action)=>{
        state.examRes=action.payload;
        state.isLoading=false
      })
      builder.addCase(examStudentResult.rejected,(state,action)=>{
          state.isLoading=false
      })
      builder.addCase(examStudentResult.pending,(state,action)=>{
          state.isLoading=true
      })
  }    
})



export let studentSliceReducer=StudentSlice.reducer;

export let {setLogin,setStudentToken,logoutStudent}=StudentSlice.actions