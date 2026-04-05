"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/nextjs";
import {
  fetchQuestions,
  createQuestion,
  resetCreateStatus,
  selectQuestions,
  selectQuestionsStatus,
  selectQuestionCreateStatus,
} from "@/store/slices/questionSlice";

/**
 * Hook to fetch and cache the question list.
 */
export function useQuestionList() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const list = useSelector(selectQuestions);
  const status = useSelector(selectQuestionsStatus);

  useEffect(() => {
    if (status === "idle") {
      getToken().then((token) => dispatch(fetchQuestions(token)));
    }
  }, [status, dispatch, getToken]);

  return { list, isLoading: status === "loading" || status === "idle" };
}

/**
 * Hook for creating a new question set.
 */
export function useCreateQuestion() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const status = useSelector(selectQuestionCreateStatus);

  const create = async (data) => {
    const token = await getToken();
    return await dispatch(createQuestion({ token, data })).unwrap();
  };

  const reset = () => dispatch(resetCreateStatus());

  return { create, isLoading: status === "loading", reset };
}
