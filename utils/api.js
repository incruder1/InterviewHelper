/**
 * Thin wrapper around the Go backend API.
 * All methods require a Clerk JWT token obtained from `useAuth().getToken()`.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function request(path, token, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const body = await res.json();
      message = body.error || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

// ── Interviews ────────────────────────────────────────────────────────────────

export const createInterview = (token, data) =>
  request("/interviews", token, { method: "POST", body: JSON.stringify(data) });

export const listInterviews = (token) =>
  request("/interviews", token);

export const getInterview = (token, mockId) =>
  request(`/interviews/${mockId}`, token);

export const deleteInterview = (token, mockId) =>
  request(`/interviews/${mockId}`, token, { method: "DELETE" });
// ── Answers ───────────────────────────────────────────────────────────────────

export const upsertAnswer = (token, mockId, data) =>
  request(`/interviews/${mockId}/answers`, token, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const listAnswers = (token, mockId) =>
  request(`/interviews/${mockId}/answers`, token);

// ── Questions ─────────────────────────────────────────────────────────────────

export const createQuestion = (token, data) =>
  request("/questions", token, { method: "POST", body: JSON.stringify(data) });

export const listQuestions = (token) =>
  request("/questions", token);

// ── Newsletter / contact form (public, no token) ───────────────────────────

export const submitNewsletter = (data) =>
  request("/newsletter", null, { method: "POST", body: JSON.stringify(data) });
