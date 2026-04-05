import { configureStore } from "@reduxjs/toolkit";
import interviewReducer from "./slices/interviewSlice";
import questionReducer from "./slices/questionSlice";

export const store = configureStore({
  reducer: {
    interviews: interviewReducer,
    questions: questionReducer,
  },
});
