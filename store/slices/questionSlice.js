import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/utils/api";

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchQuestions = createAsyncThunk(
  "questions/fetchAll",
  async (token) => {
    return await api.listQuestions(token);
  }
);

export const createQuestion = createAsyncThunk(
  "questions/create",
  async ({ token, data }) => {
    return await api.createQuestion(token, data);
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    list: [],
    listStatus: "idle", // idle | loading | succeeded | failed
    createStatus: "idle",
    error: null,
  },
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchQuestions
      .addCase(fetchQuestions.pending, (state) => {
        state.listStatus = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.error.message;
      })
      // createQuestion
      .addCase(createQuestion.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.unshift(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetCreateStatus } = questionSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────

export const selectQuestions = (state) => state.questions.list;
export const selectQuestionsStatus = (state) => state.questions.listStatus;
export const selectQuestionCreateStatus = (state) => state.questions.createStatus;

export default questionSlice.reducer;
