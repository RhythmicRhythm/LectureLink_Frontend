import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authReducer from "./Slices/authSlice";
import courseReducer from "./Slices/coursesSlice";
import { authApi } from "./apis/authApi";
import { coursesApi } from "./apis/courseApi";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedCourseReducer = persistReducer(persistConfig, courseReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    course: courseReducer,
    [authApi.reducerPath]: authApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, coursesApi.middleware),
});

export const persistor = persistStore(store);
