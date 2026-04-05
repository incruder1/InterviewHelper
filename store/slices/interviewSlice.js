import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/utils/api";

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchInterviews = createAsyncThunk(
  "interviews/fetchAll",
  async (token) => {
    return await api.listInterviews(token);
  }
);

export const fetchInterview = createAsyncThunk(
  "interviews/fetchOne",
  async ({ token, mockId }) => {
    return await api.getInterview(token, mockId);
  }
);

export const createInterview = createAsyncThunk(
  "interviews/create",
  async ({ token, data }) => {
    return await api.createInterview(token, data);
  }
);

export const fetchAnswers = createAsyncThunk(
  "interviews/fetchAnswers",
  async ({ token, mockId }) => {
    return await api.listAnswers(token, mockId);
  }
);

export const submitAnswer = createAsyncThunk(
  "interviews/submitAnswer",
  async ({ token, mockId, data }) => {
    return await api.upsertAnswer(token, mockId, data);
  }
);

export const deleteInterview = createAsyncThunk(
  "interviews/delete",
  async ({ token, mockId }) => {
    return await api.deleteInterview(token, mockId);
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const interviewSlice = createSlice({
  name: "interviews",
  initialState: {
    list: [],
    listStatus: "idle", // idle | loading | succeeded | failed
    current: null,
    currentStatus: "idle",
    answers: [],
    answersStatus: "idle",
    createStatus: "idle",
    submitAnswerStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
      state.currentStatus = "idle";
      state.answers = [];
      state.answersStatus = "idle";
    },
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
    },
    resetSubmitAnswerStatus: (state) => {
      state.submitAnswerStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchInterviews
      .addCase(fetchInterviews.pending, (state) => {
        state.listStatus = "loading";
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.error.message;
      })
      // fetchInterview
      .addCase(fetchInterview.pending, (state) => {
        state.currentStatus = "loading";
      })
      .addCase(fetchInterview.fulfilled, (state, action) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchInterview.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.error.message;
      })
      // createInterview
      .addCase(createInterview.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createInterview.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.unshift(action.payload);
      })
      .addCase(createInterview.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      })
      // fetchAnswers
      .addCase(fetchAnswers.pending, (state) => {
        state.answersStatus = "loading";
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.answersStatus = "succeeded";
        state.answers = action.payload;
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.answersStatus = "failed";
        state.error = action.error.message;
      })
      // submitAnswer
      .addCase(submitAnswer.pending, (state) => {
        state.submitAnswerStatus = "loading";
      })
      .addCase(submitAnswer.fulfilled, (state) => {
        state.submitAnswerStatus = "succeeded";
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.submitAnswerStatus = "failed";
        state.error = action.error.message;
      })
      // deleteInterview
      .addCase(deleteInterview.fulfilled, (state, action) => {
        const deletedMockId = action.meta.arg.mockId;
        state.list = state.list.filter((i) => i.mockId !== deletedMockId);
      });
  },
});

export const { clearCurrent, resetCreateStatus, resetSubmitAnswerStatus } =
  interviewSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────

export const selectInterviews = (state) => state.interviews.list;
export const selectInterviewsStatus = (state) => state.interviews.listStatus;
export const selectCurrentInterview = (state) => state.interviews.current;
export const selectCurrentInterviewStatus = (state) => state.interviews.currentStatus;
export const selectAnswers = (state) => state.interviews.answers;
export const selectAnswersStatus = (state) => state.interviews.answersStatus;
export const selectCreateStatus = (state) => state.interviews.createStatus;
export const selectSubmitAnswerStatus = (state) => state.interviews.submitAnswerStatus;

export default interviewSlice.reducer;
