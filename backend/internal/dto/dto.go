package dto

// ── Interview ─────────────────────────────────────────────────────────────────

type CreateInterviewRequest struct {
	JobPosition   string `json:"jobPosition"   binding:"required"`
	JobDesc       string `json:"jobDesc"       binding:"required"`
	JobExperience string `json:"jobExperience" binding:"required"`
}

// ── Question ──────────────────────────────────────────────────────────────────

type CreateQuestionRequest struct {
	JobPosition   string `json:"jobPosition"   binding:"required"`
	JobDesc       string `json:"jobDesc"       binding:"required"`
	JobExperience string `json:"jobExperience" binding:"required"`
	TypeQuestion  string `json:"typeQuestion"  binding:"required"`
	Company       string `json:"company"       binding:"required"`
}

// ── Answer ────────────────────────────────────────────────────────────────────

// UpsertAnswerRequest accepts either a pre-transcribed text answer or raw
// base64-encoded audio. If AudioBase64 is provided the backend transcribes it
// via Gemini before generating feedback.
type UpsertAnswerRequest struct {
	Question      string `json:"question"      binding:"required"`
	CorrectAns    string `json:"correctAns"`
	UserAns       string `json:"userAns"`
	AudioBase64   string `json:"audioBase64"`
	AudioMimeType string `json:"audioMimeType"`
}

// ── Newsletter (contact form) ─────────────────────────────────────────────────

type NewsletterRequest struct {
	NewName    string `json:"newName"    binding:"required"`
	NewEmail   string `json:"newEmail"   binding:"required"`
	NewMessage string `json:"newMessage" binding:"required"`
}

// ── Generic ───────────────────────────────────────────────────────────────────

type ErrorResponse struct {
	Error string `json:"error"`
}

type MessageResponse struct {
	Message string `json:"message"`
}
