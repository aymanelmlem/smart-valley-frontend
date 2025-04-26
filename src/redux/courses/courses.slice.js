import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

export const addCourses=createAsyncThunk("Addcourses/post",async(value)=>{
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        
        const response=await axios.post(`${BASE_URL}/employees/instructors/courses/addCouse`,value,{headers})
        
        return response?.data;
    } catch (error) {
        return error
    }
})
export const courseInstructor=createAsyncThunk("courseIns/get",async()=>{
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response=await axios.get(`${BASE_URL}/employees/instructors/courses/getMyCourses`,{headers})
        
        return response?.data
    } catch (error) {
        return error
    }
})
export const filterCourses=createAsyncThunk("filterCourses",async(filter)=>{
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response=await axios.get(`${BASE_URL}/employees/instructors/courses/getMyCourses`,{
            headers,
            params:filter,
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const updateCourse=createAsyncThunk("UpdateCourse/patch",async({id,value})=>{
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response=await axios.patch(`${BASE_URL}/employees/instructors/courses/updateCourse/${id}`,value,{headers})
        
        return response?.data;
    } catch (error) {
        return error
    }
})
export const updateAccesibleByAnyOne=createAsyncThunk("updateAccesibleByAnyOne/patch",async({id,value,status})=>{
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response=await axios.patch(`${BASE_URL}/employees/instructors/courses/updateCourse/${id}?accesibleByAnyOne=${status}`,value,{headers})
        return response?.data;
    } catch (error) {
        return error
    }
})
export const updateWhatYouLearn = createAsyncThunk(
    "updateWhatYouLearn/patch",
    async ({ id, value, status }, { rejectWithValue }) => {
        try {
            const headers = {
                token: localStorage.getItem("TokenEmployee"),
                "Content-Type": "application/json"
            };
            const response = await axios.patch(
                `${BASE_URL}/employees/instructors/courses/updateCourse/${id}?whatWillYouLearn=${status}`,
                value,
                { headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({ success: false, message: error.response?.data?.message || error.message });
        }
    }
);
export const courseDetail = createAsyncThunk("courseDetails/get", async (id ) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories/getOnlyOneCourse/${id}`);
        
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const deleteCourse = createAsyncThunk("deleteCourse/delete", async ({ id }) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.delete(`${BASE_URL}/employees/instructors/courses/deleteCourse/${id}`, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const addSection = createAsyncThunk("addSection/post", async (value) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.post(`${BASE_URL}/employees/instructors/courses/sections/addSection`,value, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const featchSection = createAsyncThunk("featchSection/get", async (id ) => {
    try {
        const response = await axios.get(`${BASE_URL}/employees/instructors/courses/sections/getSectionsOfSpCourse/${id}`);
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const deleteSection = createAsyncThunk("deleteSection/delete", async (id ) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.delete(`${BASE_URL}/employees/instructors/courses/sections/deleteSection/${id}`,{
            headers
        });
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const updateSection = createAsyncThunk("updateSection/patch", async ({id,value}) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.patch(`${BASE_URL}/employees/instructors/courses/sections/updateSection/${id}`,value, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const objectiveEdit = createAsyncThunk("objectiveEdit/patch", async ({id,value,flag}) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.patch(`${BASE_URL}/employees/instructors/courses/sections/updateSection/${id}?objective=${flag}`,value, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const addLesson = createAsyncThunk("addLesson/post", async ({id,value}) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.post(`${BASE_URL}/employees/instructors/courses/sections/lessons/addLesson/${id}`,value, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const deleteLesson = createAsyncThunk("deleteLesson/delete", async (id ) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.delete(`${BASE_URL}/employees/instructors/courses/sections/lessons/deleteLesson/${id}`,{
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const updateLesson = createAsyncThunk("updateLesson/update", async ({id,value} ) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.patch(`${BASE_URL}/employees/instructors/courses/sections/lessons/updateLesson/${id}`,value,{
            headers
        });
        return response?.data;
    } catch (error) {        
        return error;
    }
});
export const addRequiredLink = createAsyncThunk("addRequiredLink/patch", async ({id,value,flag}) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.patch(`${BASE_URL}/employees/instructors/courses/sections/lessons/updateLesson/${id}?requiredLinksOptions=${flag}`,value, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const videoLessonFun = createAsyncThunk("videoLessonFun/patch", async ({id,value,flag}) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.patch(`${BASE_URL}/employees/instructors/courses/sections/lessons/updateLesson/${id}?videoOtpions=${flag}`,value, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const fileLessonFun = createAsyncThunk("fileLessonFun/patch", async ({id,value,flag}) => {
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        const response = await axios.patch(`${BASE_URL}/employees/instructors/courses/sections/lessons/updateLesson/${id}?filesOptions=${flag}`,value, {
            headers
        });
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const getAllCoursesByCategories = createAsyncThunk("getAllCoursesByCategories/get", async (id ) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories/getAllCoursesWithAllFiltsersOptions?category=${id}`);
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const filterAllCoursesByCategories=createAsyncThunk("filterAllCoursesByCategories",async(filter)=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getAllCoursesWithAllFiltsersOptions`,{
            params:filter,
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const getCoursesBySubCategories = createAsyncThunk("getCoursesBySubCategories/get", async (id ) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories/getAllCoursesWithAllFiltsersOptions?subCategory=${id}`);
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const filterAllCoursesBySubCategories=createAsyncThunk("filterAllCoursesBySubCategories",async(filter)=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getAllCoursesWithAllFiltsersOptions`,{
            params:filter,
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const getAllCourses = createAsyncThunk("allCourses/get", async ( ) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories/getAllCoursesWithAllFiltsersOptions`);
        
        return response?.data;
    } catch (error) {
       
        return error;
    }
});
export const filterAllCourses=createAsyncThunk("filterAllCourses",async(filter)=>{
    
    try {
        const response=await axios.get(`${BASE_URL}/categories/getAllCoursesWithAllFiltsersOptions`,{
            params:filter,
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const watchLesson = createAsyncThunk("watchLesson/get", async (id ) => {
    try {
        const headers={
            token:localStorage.getItem("tokenStudent")
        }
        const response = await axios.get(`${BASE_URL}/users/watchCourseMedia/${id}`,{headers});
        return response?.data;
    } catch (error) {
        return error;
    }
});
export const getAllCoursesPaid = createAsyncThunk("getAllCoursesPaid/get", async ( ) => {
    try {
        const headers={
            token:localStorage.getItem("tokenStudent")
        }
        const response = await axios.get(`${BASE_URL}/users/getCoursesWithoutYouBuyWithPayState`,{headers});
        
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const filterAllCoursesPaid=createAsyncThunk("filterAllCoursesPaid",async(filter)=>{
    try {
        const headers={
            token:localStorage.getItem("tokenStudent")
        }
        const response=await axios.get(`${BASE_URL}/users/getCoursesWithoutYouBuyWithPayState`,{
            params:filter,
            headers
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const getAllCoursesPaidCategory = createAsyncThunk("getAllCoursesPaidCategory/get", async ( id) => {
    try {
        const headers={
            token:localStorage.getItem("tokenStudent")
        }
        const response = await axios.get(`${BASE_URL}/users/getCoursesWithoutYouBuyWithPayState?category=${id}`,{headers});
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const getAllCoursesPaidSubCategory = createAsyncThunk("getAllCoursesPaidSubCategory/get", async ( id) => {
    try {
        const headers={
            token:localStorage.getItem("tokenStudent")
        }
        const response = await axios.get(`${BASE_URL}/users/getCoursesWithoutYouBuyWithPayState?subCategory=${id}`,{headers});
        return response?.data;
    } catch (error) {
        
        return error;
    }
});
export const filterAllCoursesPaidBySubCategories=createAsyncThunk("filterAllCoursesPaidBySubCategories",async(filter)=>{
    try {
        const headers={
            token:localStorage.getItem("tokenStudent")
        }
        const response=await axios.get(`${BASE_URL}/users/getCoursesWithoutYouBuyWithPayState`,{
            params:filter,
            headers
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const filterAllCoursesPaidByCategories=createAsyncThunk("filterAllCoursesPaidByCategories",async(filter)=>{
    try {
        const headers={
            token:localStorage.getItem("tokenStudent")
        }
        const response=await axios.get(`${BASE_URL}/users/getCoursesWithoutYouBuyWithPayState`,{
            params:filter,
            headers
        })       
        return response.data;
    } catch (error) {
        return error
    }
})


const initialState={
    isLoading:false,
    addcourses:null,
    courseIns:null,
    updateCrs:null,
    updateAccess:null,
    updateLearn:null,
    deleteCrs:null,
    courseDtl:null,
    addSec:null,
    getSection:null,
    deleteSec:null,
    updateSec:null,
    objEdit:null,
    addLess:null,
    deleteLess:null,
    updateLess:null,
    addRequireLink:null,
    videoLess:null,
    fileLess:null,
    getCourseByCtg:null,
    getCourseBySubCtg:null,
    allcourse:null,
    watchLess:null,
    coursePaid:null,
}
export const coursesSlice=createSlice({
    name:"courses",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addCourses.fulfilled,(state,action)=>{
            state.addcourses=action.payload;
            state.isLoading=false
        })
        builder.addCase(addCourses.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(addCourses.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(courseInstructor.fulfilled,(state,action)=>{
            state.courseIns=action.payload;
            state.isLoading=false
        })
        builder.addCase(courseInstructor.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(courseInstructor.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(filterCourses.fulfilled,(state,action)=>{
            state.courseIns=action.payload;
            state.isLoading=false
        })
        builder.addCase(filterCourses.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(filterCourses.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(updateCourse.fulfilled,(state,action)=>{
            state.updateCrs=action.payload;
            state.isLoading=false
        })
        builder.addCase(updateCourse.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(updateCourse.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(updateAccesibleByAnyOne.fulfilled,(state,action)=>{
            state.updateAccess=action.payload;
            state.isLoading=false
        })
        builder.addCase(updateAccesibleByAnyOne.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(updateAccesibleByAnyOne.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(courseDetail.fulfilled,(state,action)=>{
            state.courseDtl=action.payload;
            state.isLoading=false
        })
        builder.addCase(courseDetail.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(courseDetail.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(deleteCourse.fulfilled,(state,action)=>{
            state.deleteCrs=action.payload;
            state.isLoading=false
        })
        builder.addCase(deleteCourse.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(deleteCourse.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(updateWhatYouLearn.fulfilled, (state, action) => {
            state.updateLearn = action.payload;
            state.isLoading = false;
        });
        builder.addCase(updateWhatYouLearn.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(updateWhatYouLearn.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(addSection.fulfilled, (state, action) => {
            state.addSec = action.payload;
            state.isLoading = false;
        });
        builder.addCase(addSection.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(addSection.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(featchSection.fulfilled, (state, action) => {
            state.getSection = action.payload;
            state.isLoading = false;
        });
        builder.addCase(featchSection.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(featchSection.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(deleteSection.fulfilled, (state, action) => {
            state.deleteSec = action.payload;
            state.isLoading = false;
        });
        builder.addCase(deleteSection.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(deleteSection.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(updateSection.fulfilled, (state, action) => {
            state.updateSec = action.payload;
            state.isLoading = false;
        });
        builder.addCase(updateSection.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(updateSection.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(objectiveEdit.fulfilled, (state, action) => {
            state.objEdit = action.payload;
            state.isLoading = false;
        });
        builder.addCase(objectiveEdit.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(objectiveEdit.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(addLesson.fulfilled, (state, action) => {
            state.addLess = action.payload;
            state.isLoading = false;
        });
        builder.addCase(addLesson.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(addLesson.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(deleteLesson.fulfilled, (state, action) => {
            state.deleteLess = action.payload;
            state.isLoading = false;
        });
        builder.addCase(deleteLesson.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(deleteLesson.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(updateLesson.fulfilled, (state, action) => {
            state.updateLess = action.payload;
            state.isLoading = false;
        });
        builder.addCase(updateLesson.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(updateLesson.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(addRequiredLink.fulfilled, (state, action) => {
            state.addRequireLink = action.payload;
            state.isLoading = false;
        });
        builder.addCase(addRequiredLink.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(addRequiredLink.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(videoLessonFun.fulfilled, (state, action) => {
            state.videoLess = action.payload;
            state.isLoading = false;
        });
        builder.addCase(videoLessonFun.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(videoLessonFun.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(fileLessonFun.fulfilled, (state, action) => {
            state.fileLess = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fileLessonFun.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(fileLessonFun.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllCoursesByCategories.fulfilled, (state, action) => {
            state.getCourseByCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllCoursesByCategories.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(getAllCoursesByCategories.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(filterAllCoursesByCategories.fulfilled, (state, action) => {
            state.getCourseByCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(filterAllCoursesByCategories.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(filterAllCoursesByCategories.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getCoursesBySubCategories.fulfilled, (state, action) => {
            state.getCourseBySubCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getCoursesBySubCategories.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(getCoursesBySubCategories.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(filterAllCoursesBySubCategories.fulfilled, (state, action) => {
            state.getCourseBySubCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(filterAllCoursesBySubCategories.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(filterAllCoursesBySubCategories.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.allcourse = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllCourses.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(getAllCourses.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(filterAllCourses.fulfilled, (state, action) => {
            state.allcourse = action.payload;
            state.isLoading = false;
        });
        builder.addCase(filterAllCourses.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(filterAllCourses.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(watchLesson.fulfilled, (state, action) => {
            state.watchLess = action.payload;
            state.isLoading = false;
        });
        builder.addCase(watchLesson.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(watchLesson.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllCoursesPaid.fulfilled, (state, action) => {
            state.allcourse = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllCoursesPaid.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(getAllCoursesPaid.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllCoursesPaidCategory.fulfilled, (state, action) => {
            state.getCourseByCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllCoursesPaidCategory.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(getAllCoursesPaidCategory.pending,(state,action)=>{
            state.isLoading=true;
        })
        
        builder.addCase(getAllCoursesPaidSubCategory.fulfilled, (state, action) => {
            state.getCourseBySubCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllCoursesPaidSubCategory.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(getAllCoursesPaidSubCategory.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(filterAllCoursesPaidBySubCategories.fulfilled, (state, action) => {
            state.getCourseBySubCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(filterAllCoursesPaidBySubCategories.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(filterAllCoursesPaidBySubCategories.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(filterAllCoursesPaidByCategories.fulfilled, (state, action) => {
            state.getCourseByCtg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(filterAllCoursesPaidByCategories.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(filterAllCoursesPaidByCategories.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(filterAllCoursesPaid.fulfilled, (state, action) => {
            state.allcourse = action.payload;
            state.isLoading = false;
        });
        builder.addCase(filterAllCoursesPaid.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(filterAllCoursesPaid.pending,(state,action)=>{
            state.isLoading=true;
        })
    }
})

export let coursesSliceReducer=coursesSlice.reducer