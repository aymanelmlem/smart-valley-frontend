import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import { data } from 'autoprefixer';

export const signupInstructor = createAsyncThunk(
  'signupInstructor',
  async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/employees/instructors/addRequestInstructor`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const activeAccountEmployee = createAsyncThunk(
  'ActiveAccountEmp',
  async (value) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/employees/activeAccEmpAAddedByAdmin`,
        value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const loginWithoutPinCode = createAsyncThunk(
  'loginWithoutPincode',
  async (value) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/employees/loginAsEmployee`,
        value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const forgetPasswordEmp = createAsyncThunk(
  'ForgetPasswordEmp',
  async (value) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/employees/forgetPass`,
        value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const resetPasswordEmp = createAsyncThunk(
  'restPasswordEmp',
  async (value) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/employees/getCodeToConfirmForgetPass`,
        value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const loginWithPinCode = createAsyncThunk(
  'LoginPinCode',
  async (value) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/employees/loginByPinCodeForEmp`,
        value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const forgetPinCodeEmp = createAsyncThunk(
  'ForgetPinCode',
  async (value) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/employees/forgetPinCode`,
        value
      );

      return response?.data;
    } catch (error) {
      return data;
    }
  }
);
export const addManager = createAsyncThunk('AddManger', async (value) => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.post(
      `${BASE_URL}/employees/addNewEmployee`,
      value,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
export const addInstructor = createAsyncThunk(
  'AddInstructor',
  async (value) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.post(
        `${BASE_URL}/employees/addNewEmployee`,
        value,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const allManager = createAsyncThunk('allManager', async () => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.get(
      `${BASE_URL}/employees/getEmployeessForSuperAdmin?role=admin`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
export const filterEmployee = createAsyncThunk(
  'FilterEmp',
  async (filterCriteria) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/getEmployeessForSuperAdmin`,
        {
          headers,
          params: filterCriteria,
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const allInstructors = createAsyncThunk('allInstructors', async () => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.get(
      `${BASE_URL}/employees/getEmployeessForSuperAdmin?role=instructor`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
export const filterInstructor = createAsyncThunk(
  'filterInstructor',
  async (filterCriteria) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/getEmployeessForSuperAdmin`,
        {
          headers,
          params: filterCriteria,
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const updatePasswordEmp = createAsyncThunk(
  'UpdatePasswordEmp',
  async (value) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/updatePass`,
        value,
        { headers }
      );
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);
export const updateDataEmp = createAsyncThunk(
  'updateDataEmp',
  async (value) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/updateEmployeeData`,
        value,
        { headers }
      );
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);
export const updateProfileEmp = createAsyncThunk(
  'updateProfileEmp/get',
  async (value) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/updateEmployeeData?profilePicture=`,
        value,
        { headers }
      );
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);
export const stopEmployee = createAsyncThunk(
  'StopEmployee',
  async ({ value, id }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/updateEmployeeStopState/${id}`,
        value,
        { headers }
      );
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const PayingEmployee = createAsyncThunk(
  'payingEmp',
  async ({ value, id }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/updatePayStateForEMplyee/${id}`,
        value,
        { headers }
      );
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const RequestsEmp = createAsyncThunk('RequestsEmp', async () => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.get(`${BASE_URL}/employees/getAllRequests`, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
});
export const RequestsEmpFilter = createAsyncThunk(
  'RequestsEmpFilter',
  async (filterCriteria) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(`${BASE_URL}/employees/getAllRequests`, {
        headers,
        params: filterCriteria,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const EvaluateRequest = createAsyncThunk(
  'EvaluateRequest',
  async ({ value, id }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/evaluateRequest/${id}`,
        value,
        { headers }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const evaluateFinalRequest = createAsyncThunk(
  'EvaluateFinalRequest',
  async ({ value, id }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/evaluateRequest/${id}`,
        value,
        { headers }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const resultRequest = createAsyncThunk('resultRequest', async () => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.get(
      `${BASE_URL}/employees/instructors/getRequestResult`,
      { headers }
    );

    return response.data;
  } catch (error) {
    return error;
  }
});
export const cancleRequest = createAsyncThunk('CancleRequest', async () => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.delete(
      `${BASE_URL}/employees/instructors/deleteMyAccount`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});

export const profileEmp = createAsyncThunk('profile/get', async () => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.get(
      `${BASE_URL}/employees/getProfileOfEmployee`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
export const InstructorDetailCourse = createAsyncThunk(
  'InstructorDetailCourse/get',
  async ({ id }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employees/instructors/getSpInsAboutSpCourse/${id}`
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const purcaseCourseIns = createAsyncThunk(
  'purcaseCourseIns/get',
  async () => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/instructors/getAllRequetsToBuyCourse`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const purcaseProcessing = createAsyncThunk(
  'purcaseProceesing',
  async ({ value, id }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/instructors/evaluateRequestOfStudent/${id}`,
        value,
        { headers }
      );
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const allInstructorForStudent = createAsyncThunk(
  'allInstructor/get',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/getAllInstrcuctors`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const filterPurcaseCourseIns = createAsyncThunk(
  'filterPurcaseCourseIns/get',
  async (filter) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };

      const response = await axios.get(
        `${BASE_URL}/employees/instructors/getAllRequetsToBuyCourse`,
        {
          headers,
          params: filter,
        }
      );


      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const watchLessonIns = createAsyncThunk(
  'watchLessonIns/get',
  async (id) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/watchVideoCourses/${id}`,
        { headers }
      );
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);
export const socialLinkEmp = createAsyncThunk(
  'socialLinkEmp',
  async ({ values }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.patch(
        `${BASE_URL}/employees/updateProfileLinksForEmployees`,
        values,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const dashboardSuperAdmin = createAsyncThunk(
  'dashboardSuperAdmin/get',
  async () => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/getDashboarsdForSupeAdmin`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const dashboardInstructor = createAsyncThunk(
  'dashboardInstructor/get',
  async () => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/instructors/getInsDahboard`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const createExam = createAsyncThunk(
  'createExam/post',
  async ({ id, value }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.post(
        `${BASE_URL}/employees/instructors/test/makeTest/${id}`,
        value,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const allExamIns = createAsyncThunk('allExamIns/get', async () => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.get(
      `${BASE_URL}/employees/instructors/test/getTestsForIns`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
export const filterExamIns = createAsyncThunk(
  'filterExamIns/get',
  async ({filter}) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/instructors/test/getTestsForIns`,
        { headers, params: filter }
      );
      
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const examInsDetails = createAsyncThunk(
  'ExamInsDetails/get',
  async (id) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/instructors/test/getSpecefiecDataOfTestForIns/${id}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteExam = createAsyncThunk('deleteExam/delete', async (id) => {
  try {
    const headers = {
      token: localStorage.getItem('TokenEmployee'),
    };
    const response = await axios.delete(
      `${BASE_URL}/employees/instructors/test/deleteTest/${id}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});

export const examCollection = createAsyncThunk(
  'examCollection/get',
  async (id) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/instructors/test/getResultsForSpecefiecTestsForTheIns/${id}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const filterExamCollection = createAsyncThunk(
  'filterExamCollection',
  async ({ filterCriteria, id }) => {
    try {
      const headers = {
        token: localStorage.getItem('TokenEmployee'),
      };
      const response = await axios.get(
        `${BASE_URL}/employees/instructors/test/getResultsForSpecefiecTestsForTheIns/${id}`,
        {
          headers,
          params: filterCriteria,
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const initialState = {
  employeeToken: localStorage.getItem('TokenEmployee'),
  singnIns: null,
  activeAccountEmp: null,
  loginWithOutCode: null,
  loginPinCode: null,
  isLoading: false,
  forgetPass: null,
  resetPass: null,
  email: '',
  password: '',
  forgetPinCode: '',
  manager: null,
  Ins: null,
  allMng: null,
  allIns: null,
  updatePass: null,
  updateUserData: null,
  stopEmp: null,
  payEmp: null,
  requests: null,
  evaluateReq: null,
  evaluateFinalReq: null,
  resultReq: null,
  cancleReq: null,
  profile: null,
  getProfile: null,
  instDetailCourse: null,
  purcase: '',
  purcaseProcess: '',
  allInstStudent: '',
  watchLessIns: null,
  social: '',
  dashboard: null,
  createEx: null,
  allEx: null,
  exDetail: null,
  deleteEx: null,
  collectionEx: null,
};
export const instructorSlice = createSlice({
  name: 'Instructor',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.email = '';
      state.password = '';
      localStorage.removeItem('TokenEmployee');
      state.employeeToken = null;
      state.loginPinCode = null;
      state.loginWithOutCode = null;
    },
    setEmployeeToken: (state, action) => {
      state.employeeToken = action.payload;
    },
    setEmployeeEmail: (state, action) => {
      state.email = action.payload;
    },
    setEmployeePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupInstructor.fulfilled, (state, action) => {
      state.singnIns = action.payload;
      state.isLoading = false;
    });
    builder.addCase(signupInstructor.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signupInstructor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(activeAccountEmployee.fulfilled, (state, action) => {
      state.activeAccountEmp = action.payload;
      state.isLoading = false;
    });
    builder.addCase(activeAccountEmployee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(activeAccountEmployee.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(loginWithoutPinCode.fulfilled, (state, action) => {
      state.loginWithOutCode = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginWithoutPinCode.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginWithoutPinCode.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(forgetPasswordEmp.fulfilled, (state, action) => {
      state.forgetPass = action.payload;
      state.isLoading = false;
    });
    builder.addCase(forgetPasswordEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgetPasswordEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(resetPasswordEmp.fulfilled, (state, action) => {
      state.resetPass = action.payload;
      state.isLoading = false;
    });
    builder.addCase(resetPasswordEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPasswordEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(loginWithPinCode.fulfilled, (state, action) => {
      state.loginPinCode = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginWithPinCode.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginWithPinCode.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(forgetPinCodeEmp.fulfilled, (state, action) => {
      state.forgetPinCode = action.payload;
      state.isLoading = false;
    });
    builder.addCase(forgetPinCodeEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgetPinCodeEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addManager.fulfilled, (state, action) => {
      state.manager = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addManager.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addManager.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addInstructor.fulfilled, (state, action) => {
      state.Ins = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addInstructor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addInstructor.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(allManager.fulfilled, (state, action) => {
      state.allMng = action.payload;
      state.isLoading = false;
    });
    builder.addCase(allManager.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allManager.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(filterEmployee.fulfilled, (state, action) => {
      state.allMng = action.payload;
      state.isLoading = false;
    });
    builder.addCase(filterEmployee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(filterEmployee.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(allInstructors.fulfilled, (state, action) => {
      state.allIns = action.payload;
      state.isLoading = false;
    });
    builder.addCase(allInstructors.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allInstructors.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(filterInstructor.fulfilled, (state, action) => {
      state.allIns = action.payload;
      state.isLoading = false;
    });
    builder.addCase(filterInstructor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(filterInstructor.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updatePasswordEmp.fulfilled, (state, action) => {
      state.updatePass = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updatePasswordEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePasswordEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateDataEmp.fulfilled, (state, action) => {
      state.updateUserData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateDataEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateDataEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(stopEmployee.fulfilled, (state, action) => {
      state.stopEmp = action.payload;
      state.isLoading = false;
    });
    builder.addCase(stopEmployee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(stopEmployee.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(PayingEmployee.fulfilled, (state, action) => {
      state.payEmp = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PayingEmployee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(PayingEmployee.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(RequestsEmp.fulfilled, (state, action) => {
      state.requests = action.payload;
      state.isLoading = false;
    });
    builder.addCase(RequestsEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RequestsEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(RequestsEmpFilter.fulfilled, (state, action) => {
      state.requests = action.payload;
      state.isLoading = false;
    });
    builder.addCase(RequestsEmpFilter.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RequestsEmpFilter.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(EvaluateRequest.fulfilled, (state, action) => {
      state.evaluateReq = action.payload;
      state.isLoading = false;
    });
    builder.addCase(EvaluateRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(EvaluateRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(evaluateFinalRequest.fulfilled, (state, action) => {
      state.evaluateFinalReq = action.payload;
      state.isLoading = false;
    });
    builder.addCase(evaluateFinalRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(evaluateFinalRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(resultRequest.fulfilled, (state, action) => {
      state.resultReq = action.payload;
      state.isLoading = false;
    });
    builder.addCase(resultRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resultRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(cancleRequest.fulfilled, (state, action) => {
      state.cancleReq = action.payload;
      state.isLoading = false;
    });
    builder.addCase(cancleRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(cancleRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateProfileEmp.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateProfileEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(profileEmp.fulfilled, (state, action) => {
      state.getProfile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(profileEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(profileEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(InstructorDetailCourse.fulfilled, (state, action) => {
      state.instDetailCourse = action.payload;
      state.isLoading = false;
    });
    builder.addCase(InstructorDetailCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(InstructorDetailCourse.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(purcaseCourseIns.fulfilled, (state, action) => {
      state.purcase = action.payload;
      state.isLoading = false;
    });
    builder.addCase(purcaseCourseIns.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(purcaseCourseIns.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(purcaseProcessing.fulfilled, (state, action) => {
      state.purcaseProcess = action.payload;
      state.isLoading = false;
    });
    builder.addCase(purcaseProcessing.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(purcaseProcessing.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(allInstructorForStudent.fulfilled, (state, action) => {
      state.allInstStudent = action.payload;
      state.isLoading = false;
    });
    builder.addCase(allInstructorForStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allInstructorForStudent.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(filterPurcaseCourseIns.fulfilled, (state, action) => {
      state.purcase = action.payload;
      state.isLoading = false;
    });
    builder.addCase(filterPurcaseCourseIns.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(filterPurcaseCourseIns.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(watchLessonIns.fulfilled, (state, action) => {
      state.watchLessIns = action.payload;
      state.isLoading = false;
    });
    builder.addCase(watchLessonIns.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(watchLessonIns.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(socialLinkEmp.fulfilled, (state, action) => {
      state.social = action.payload;
      state.isLoading = false;
    });
    builder.addCase(socialLinkEmp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(socialLinkEmp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(dashboardSuperAdmin.fulfilled, (state, action) => {
      state.dashboard = action.payload;
      state.isLoading = false;
    });
    builder.addCase(dashboardSuperAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(dashboardSuperAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(dashboardInstructor.fulfilled, (state, action) => {
      state.dashboard = action.payload;
      state.isLoading = false;
    });
    builder.addCase(dashboardInstructor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(dashboardInstructor.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createExam.fulfilled, (state, action) => {
      state.createEx = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createExam.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createExam.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(allExamIns.fulfilled, (state, action) => {
      state.allEx = action.payload;
      state.isLoading = false;
    });
    builder.addCase(allExamIns.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allExamIns.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(filterExamIns.fulfilled, (state, action) => {
      state.allEx = action.payload;
      state.isLoading = false;
    });
    builder.addCase(filterExamIns.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(filterExamIns.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(examInsDetails.fulfilled, (state, action) => {
      state.exDetail = action.payload;
      state.isLoading = false;
    });
    builder.addCase(examInsDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(examInsDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteExam.fulfilled, (state, action) => {
      state.deleteEx = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteExam.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteExam.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(examCollection.fulfilled, (state, action) => {
      state.collectionEx = action.payload;
      state.isLoading = false;
    });
    builder.addCase(examCollection.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(examCollection.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(filterExamCollection.fulfilled, (state, action) => {
      state.collectionEx = action.payload;
      state.isLoading = false;
    });
    builder.addCase(filterExamCollection.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(filterExamCollection.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export let instructorSliceReducer = instructorSlice.reducer;

export let { setEmployeeToken, setEmployeeEmail, setEmployeePassword, logout } =
  instructorSlice.actions;
