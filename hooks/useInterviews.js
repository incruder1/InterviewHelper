"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/nextjs";
import {
  fetchInterviews,
  fetchInterview,
  fetchAnswers,
  createInterview,
  submitAnswer,
  clearCurrent,
  resetCreateStatus,
  resetSubmitAnswerStatus,
  selectInterviews,
  selectInterviewsStatus,
  selectCurrentInterview,
  selectCurrentInterviewStatus,
  selectAnswers,
  selectAnswersStatus,
  selectCreateStatus,
  selectSubmitAnswerStatus,
} from "@/store/slices/interviewSlice";
import { toast } from "sonner";

/**
 * Hook to fetch and cache the interview list.
 * Only fetches on first mount (or if idle).
 */
export function useInterviewList() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const list = useSelector(selectInterviews);
  const status = useSelector(selectInterviewsStatus);

  useEffect(() => {
    if (status === "idle") {
      getToken().then((token) => dispatch(fetchInterviews(token)));
    }
  }, [status, dispatch, getToken]);

  return { list, isLoading: status === "loading" || status === "idle" };
}

/**
 * Hook to fetch a single interview by mockId.
 */
export function useInterview(mockId) {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const current = useSelector(selectCurrentInterview);
  const status = useSelector(selectCurrentInterviewStatus);

  useEffect(() => {
    if (mockId) {
      getToken().then((token) => dispatch(fetchInterview({ token, mockId })));
    }
    return () => dispatch(clearCurrent());
  }, [mockId, dispatch, getToken]);

  return { interview: current, isLoading: status === "loading" || status === "idle" };
}

/**
 * Hook for creating a new interview.
 */
export function useCreateInterview() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const status = useSelector(selectCreateStatus);

  const create = async (data) => {
    const token = await getToken();
    const result = await dispatch(createInterview({ token, data })).unwrap().catch((error) => {
      toast.error(error.message);
      throw error;
    });
    return result;
  };

  const reset = () => dispatch(resetCreateStatus());

  return { create, isLoading: status === "loading", reset };
}

/**
 * Hook to fetch answers for an interview.
 */
export function useAnswers(mockId) {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const answers = useSelector(selectAnswers);
  const status = useSelector(selectAnswersStatus);

  useEffect(() => {
    if (mockId) {
      getToken().then((token) => dispatch(fetchAnswers({ token, mockId })));
    }
  }, [mockId, dispatch, getToken]);

  return { answers, isLoading: status === "loading" || status === "idle" };
}

/**
 * Hook for submitting an answer.
 */
export function useSubmitAnswer() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const status = useSelector(selectSubmitAnswerStatus);

  const submit = async (mockId, data) => {
    const token = await getToken();
    return await dispatch(submitAnswer({ token, mockId, data })).unwrap();
  };

  const reset = () => dispatch(resetSubmitAnswerStatus());

  return { submit, isLoading: status === "loading", reset };
}
