import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { instructorSliceReducer } from "./instructor/instructorSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { categorySliceReducer } from "./category/category.slice";
import { coursesSliceReducer } from "./courses/courses.slice";
import { studentSliceReducer } from "./student/student.slice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    instructor: instructorSliceReducer,
    category:categorySliceReducer,
    courses:coursesSliceReducer,
    students:studentSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
