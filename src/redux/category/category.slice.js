import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

export const addCategories=createAsyncThunk("AddCategory",async(value)=>{
    try {
        const headers={
            token:localStorage.getItem("TokenEmployee")
        }
        
        const response=await axios.post(`${BASE_URL}/categories/addCatgory`,value,{headers})
        
        return response.data;
    } catch (error) {
        return error
    }
})
export const allCategories=createAsyncThunk("allCategories/instructor",async(id)=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getCategories?addedBy=${id}`)
        
        return response.data;
    } catch (error) {
        return error
    }
})
export const filterCategories=createAsyncThunk("filterCategories",async({filter,id})=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getCategories?addedBy=${id}`,{
            params:filter,
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const allCategoriesForUser=createAsyncThunk("allCategories",async()=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getCategories`)
        return response.data;
    } catch (error) {
        return error
    }
})
export const filterCategoriesForAllUser=createAsyncThunk("filterCategoriesForAllUser",async(filter)=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getCategories`,{
            params:filter,
        })       
        return response.data;
    } catch (error) {
        return error
    }
})
export const deleteCategory=createAsyncThunk("deleteCategory",async(id)=>{
    const headers={
        token:localStorage.getItem("TokenEmployee")
    }
    
    try {
        const response=await axios.delete(`${BASE_URL}/categories/deleteCategory/${id}`,{headers})

        return response.data
    } catch (error) {
        return error
    }
})
export const updateCategoryName = createAsyncThunk("updateCategoryName", async ({ id, value }, { rejectWithValue }) => {
    try {
        const headers = {
            token: localStorage.getItem("TokenEmployee"),
        };
        const response = await axios.patch(`${BASE_URL}/categories/updateCatgery/${id}`, value, { headers });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const updateSupCategory = createAsyncThunk(
    "updateSubCategory",
    async ({ id, value, status }, { rejectWithValue }) => {
        try {
            const headers = {
                token: localStorage.getItem("TokenEmployee"),
            };
            const response = await axios.patch(`${BASE_URL}/categories/updateCatgery/${id}?subcatgeorySelect=${status}`, value, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateImageCategory = createAsyncThunk(
    "updateSubCategory",
    async ({ id, value, status }, { rejectWithValue }) => {
        try {
            const headers = {
                token: localStorage.getItem("TokenEmployee"),
            };
            const response = await axios.patch(`${BASE_URL}/categories/updateCatgery/66c1ec0325b28e129497a54a?profilePictureSelect=${value}`, value, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const allSubCategory=createAsyncThunk("allSubCategory",async()=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getSubCategory`)
        
        return response.data;
    } catch (error) {
        return error
    }
})
export const filterAllSubCategory=createAsyncThunk("filterAllSubCategory",async(filter)=>{
    try {
        const response=await axios.get(`${BASE_URL}/categories/getSubCategory`,{
            params:filter,
        })       
        return response.data;
    } catch (error) {
        return error
    }
})

const initialState={
    isLoading:false,
    addCategory:null,
    allCtg:[],
    deletectg:null,
    uptCtgName:null,
    uptsubName:null,
    ctgUser:null,
    subCtg:null,
}
export const categorySlice=createSlice({
    name:"category",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addCategories.fulfilled,(state,action)=>{
            state.addCategory=action.payload;
            state.isLoading=false
        })
        builder.addCase(addCategories.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(addCategories.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(allCategories.fulfilled,(state,action)=>{
            state.allCtg=action.payload;
            state.isLoading=false
        })
        builder.addCase(allCategories.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(allCategories.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(filterCategories.fulfilled,(state,action)=>{
            state.allCtg=action.payload;
            state.isLoading=false
        })
        builder.addCase(filterCategories.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(filterCategories.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(deleteCategory.fulfilled,(state,action)=>{
            state.deletectg=action.payload;
            state.isLoading=false
        })
        builder.addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(deleteCategory.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(updateCategoryName.fulfilled,(state,action)=>{
            state.uptCtgName=action.payload;
            state.isLoading=false
        })
        builder.addCase(updateCategoryName.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(updateCategoryName.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(updateSupCategory.fulfilled,(state,action)=>{
            state.uptsubName=action.payload;
            state.isLoading=false
        })
        builder.addCase(updateSupCategory.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(updateSupCategory.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(allCategoriesForUser.fulfilled,(state,action)=>{
            state.ctgUser=action.payload;
            state.isLoading=false
        })
        builder.addCase(allCategoriesForUser.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(allCategoriesForUser.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(filterCategoriesForAllUser.fulfilled,(state,action)=>{
            state.ctgUser=action.payload;
            state.isLoading=false
        })
        builder.addCase(filterCategoriesForAllUser.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(filterCategoriesForAllUser.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(allSubCategory.fulfilled,(state,action)=>{
            state.subCtg=action.payload;
            state.isLoading=false
        })
        builder.addCase(allSubCategory.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(allSubCategory.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(filterAllSubCategory.fulfilled,(state,action)=>{
            state.subCtg=action.payload;
            state.isLoading=false
        })
        builder.addCase(filterAllSubCategory.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(filterAllSubCategory.pending,(state,action)=>{
            state.isLoading=true
        })
    }
})

export let categorySliceReducer=categorySlice.reducer